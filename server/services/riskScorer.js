const { fetchNewsForLocation } = require('./newsService');
const Supplier  = require('../models/Supplier');
const RiskEvent = require('../models/RiskEvent');

// ─── Calculate Risk Score from Articles ───────────────
const calculateRiskScore = (articles) => {
  if (!articles || articles.length === 0) return 75;

  let score = 100;

  for (const article of articles) {
    switch (article.severity) {
      case 'critical': score -= 25; break;
      case 'high':     score -= 15; break;
      case 'medium':   score -= 8;  break;
      case 'low':      score -= 3;  break;
    }
  }

  return Math.max(0, Math.min(100, score));
};

// ─── Get Risk Level from Score ────────────────────────
const getRiskLevel = (score) => {
  if (score >= 80) return 'secure';
  if (score >= 60) return 'low';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'high';
  return 'critical';
};

// ─── Get Status from Risk Level ───────────────────────
const getStatus = (riskLevel) => {
  if (riskLevel === 'critical' || riskLevel === 'high') return 'disrupted';
  if (riskLevel === 'medium') return 'at-risk';
  return 'active';
};

// ─── Score Single Supplier ────────────────────────────
const scoreSupplier = async (supplier) => {
  try {
    console.log(`🔍 Scoring supplier: ${supplier.name}`);

    // Fetch news for supplier location
    const articles = await fetchNewsForLocation(
      supplier.country,
      supplier.city
    );

    // Calculate score
    const riskScore = calculateRiskScore(articles);
    const riskLevel = getRiskLevel(riskScore);
    const status    = getStatus(riskLevel);

    // Save risk events to MongoDB
    if (articles.length > 0) {
      const events = articles
        .filter(a => a.severity !== 'low')
        .map(a => ({
          supplierId:  supplier._id,
          userId:      supplier.userId,
          title:       a.title,
          description: a.description,
          source:      a.source,
          url:         a.url,
          severity:    a.severity,
          country:     supplier.country,
        }));

      if (events.length > 0) {
        // Remove old events for this supplier
        await RiskEvent.deleteMany({ supplierId: supplier._id });
        // Save new events
        await RiskEvent.insertMany(events);
      }
    }

    // Update supplier in MongoDB
    await Supplier.findByIdAndUpdate(supplier._id, {
      riskScore,
      riskLevel,
      status,
      lastUpdated: new Date(),
    });

    console.log(`✅ ${supplier.name}: score=${riskScore} level=${riskLevel}`);

    return { riskScore, riskLevel, status };

  } catch (error) {
    console.error(`❌ Error scoring ${supplier.name}: ${error.message}`);
    return null;
  }
};

// ─── Score All Suppliers for a User ──────────────────
const scoreAllSuppliers = async (userId, io) => {
  try {
    console.log('🔄 Refreshing all supplier scores...');

    const suppliers = await Supplier.find({ userId });

    for (const supplier of suppliers) {
      const result = await scoreSupplier(supplier);

      if (result && io) {
        // Emit real-time update to frontend
        io.emit('supplier:riskUpdated', {
          supplierId: supplier._id,
          ...result,
        });
      }

      // Wait 1 second between requests to avoid API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('✅ All suppliers scored successfully');

  } catch (error) {
    console.error(`❌ Score all failed: ${error.message}`);
  }
};

module.exports = {
  scoreSupplier,
  scoreAllSuppliers,
  getRiskLevel,
  getStatus,
  calculateRiskScore,
};
