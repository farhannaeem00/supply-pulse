const Supplier = require('../models/Supplier');
const { scoreAllSuppliers } = require('./riskScorer');

// ── Only run scheduler outside Vercel ────────────────
const startScheduler = (io) => {
  if (process.env.VERCEL === '1') {
    console.log('⚡ Running on Vercel — scheduler disabled');
    return;
  }

  const cron = require('node-cron');
  console.log('⏰ Risk score scheduler started');

  cron.schedule('*/15 * * * *', async () => {
    console.log('🔄 Auto-refreshing all supplier scores...');
    try {
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

const sendRiskAlert = (io, supplier, oldScore, newScore) => {
  if (!io) return;
  const scoreDiff = oldScore - newScore;
  if (scoreDiff >= 20) {
    io.emit('risk:alert', {
      supplierId:   supplier._id,
      supplierName: supplier.name,
      country:      supplier.country,
      oldScore,
      newScore,
      riskLevel:    supplier.riskLevel,
      message: `⚠️ ${supplier.name} risk score dropped from ${oldScore} to ${newScore}`,
    });
    console.log(`🚨 Alert sent for ${supplier.name}`);
  }
};

module.exports = { startScheduler, sendRiskAlert };