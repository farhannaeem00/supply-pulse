const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    name: {
      type:     String,
      required: [true, 'Supplier name is required'],
      trim:     true,
    },
    country: {
      type:     String,
      required: [true, 'Country is required'],
      trim:     true,
    },
    city: {
      type:    String,
      trim:    true,
      default: '',
    },
    lat: {
      type:     Number,
      required: [true, 'Latitude is required'],
    },
    lng: {
      type:     Number,
      required: [true, 'Longitude is required'],
    },
    category: {
      type:    String,
      trim:    true,
      default: 'General',
    },
    riskScore: {
      type:    Number,
      min:     0,
      max:     100,
      default: 50,
    },
    riskLevel: {
      type:    String,
      enum:    ['secure', 'low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    status: {
      type:    String,
      enum:    ['active', 'at-risk', 'disrupted'],
      default: 'active',
    },
    lastUpdated: {
      type:    Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', supplierSchema);