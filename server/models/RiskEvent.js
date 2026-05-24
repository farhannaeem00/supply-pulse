const mongoose = require('mongoose');

const riskEventSchema = new mongoose.Schema(
  {
    supplierId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Supplier',
      required: true,
    },
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    title: {
      type:     String,
      required: true,
      trim:     true,
    },
    description: {
      type:    String,
      default: '',
    },
    source: {
      type:    String,
      default: 'NewsAPI',
    },
    url: {
      type:    String,
      default: '',
    },
    severity: {
      type:    String,
      enum:    ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    country: {
      type:    String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RiskEvent', riskEventSchema);