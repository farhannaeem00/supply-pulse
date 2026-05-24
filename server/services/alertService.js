const cron     = require('node-cron');
const Supplier = require('../models/Supplier');
const { scoreAllSuppliers } = require('./riskScorer');

// ─── Start Scheduler ──────────────────────────────────
const startScheduler = (io) => {
  console.log('⏰ Risk score scheduler started');

  // Run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('🔄 Auto-refreshing all supplier scores...');

    try {
      // Get all unique user IDs
      const users = await Supplier.distinct('userId');

      for (const userId of users) {
        await scoreAllSuppliers(userId, io);
      }

      console.log('✅ Auto-refresh complete');
    } catch (error) {
      console.error(`❌ Scheduler error: ${error.message}`);
    }
  });
};

// ─── Send Risk Alert via Socket ───────────────────────
const sendRiskAlert = (io, supplier, oldScore, newScore) => {
  if (!io) return;

  const scoreDiff = oldScore - newScore;

  // Only alert if score dropped significantly
  if (scoreDiff >= 20) {
    io.emit('risk:alert', {
      supplierId:   supplier._id,
      supplierName: supplier.name,
      country:      supplier.country,
      oldScore,
      newScore,
      riskLevel:    supplier.riskLevel,
      message:      `⚠️ ${supplier.name} risk score dropped from ${oldScore} to ${newScore}`,
    });

    console.log(`🚨 Alert sent for ${supplier.name}`);
  }
};

module.exports = { startScheduler, sendRiskAlert };