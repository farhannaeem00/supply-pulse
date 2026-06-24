const Supplier        = require('../models/Supplier');
const RiskEvent       = require('../models/RiskEvent');
const { scoreSupplier, scoreAllSuppliers } = require('../services/riskScorer');

// ─── POST /api/suppliers ──────────────────────────────
const addSupplier = async (req, res) => {
  const { name, country, city, lat, lng, category } = req.body;

  if (!name || !country || !lat || !lng) {
    return res.status(400).json({
      message: 'Please provide name, country, lat and lng'
    });
  }

  const supplier = await Supplier.create({
    userId:   req.user._id,
    name,
    country,
    city:     city     || '',
    lat:      parseFloat(lat),
    lng:      parseFloat(lng),
    category: category || 'General',
  });

  // Score supplier in background
  const io = req.app.get('io');
  scoreSupplier(supplier).then(result => {
    if (result && io) {
      io.emit('supplier:riskUpdated', {
        supplierId: supplier._id,
        ...result,
      });
    }
  });

  // Emit real-time update
  if (io) io.emit('supplier:added', supplier);

  res.status(201).json({
    success: true,
    data:    supplier,
  });
};

// ─── GET /api/suppliers ───────────────────────────────
const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({ userId: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count:   suppliers.length,
    data:    suppliers,
  });
};

// ─── GET /api/suppliers/:id ───────────────────────────
const getSupplier = async (req, res) => {
  const supplier = await Supplier.findOne({
    _id:    req.params.id,
    userId: req.user._id,
  });

  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }

  // Get risk events for this supplier
  const events = await RiskEvent.find({ supplierId: supplier._id })
    .sort({ createdAt: -1 })
    .limit(20);

  res.status(200).json({
    success: true,
    data:    { ...supplier.toObject(), events },
  });
};

// ─── PUT /api/suppliers/:id ───────────────────────────
const updateSupplier = async (req, res) => {
  const { name, country, city, lat, lng, category } = req.body;

  const supplier = await Supplier.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    {
      name,
      country,
      city,
      lat:      lat ? parseFloat(lat) : undefined,
      lng:      lng ? parseFloat(lng) : undefined,
      category,
    },
    { new: true, runValidators: true }
  );

  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }

  // Emit real-time update
  const io = req.app.get('io');
  if (io) io.emit('supplier:updated', supplier);

  res.status(200).json({
    success: true,
    data:    supplier,
  });
};

// ─── DELETE /api/suppliers/:id ────────────────────────
const deleteSupplier = async (req, res) => {
  const supplier = await Supplier.findOneAndDelete({
    _id:    req.params.id,
    userId: req.user._id,
  });

  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }

  // Delete all risk events for this supplier
  await RiskEvent.deleteMany({ supplierId: req.params.id });

  // Emit real-time update
  const io = req.app.get('io');
  if (io) io.emit('supplier:deleted', { id: req.params.id });

  res.status(200).json({
    success: true,
    message: 'Supplier deleted successfully',
  });
};

// ─── GET /api/suppliers/:id/news ──────────────────────
const getSupplierNews = async (req, res) => {
  const supplier = await Supplier.findOne({
    _id:    req.params.id,
    userId: req.user._id,
  });

  if (!supplier) {
    return res.status(404).json({ message: 'Supplier not found' });
  }

  const events = await RiskEvent.find({ supplierId: supplier._id })
    .sort({ createdAt: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    count:   events.length,
    data:    events,
  });
};

// ─── POST /api/suppliers/refresh ─────────────────────
const refreshAllScores = async (req, res) => {
  const io = req.app.get('io');

  res.status(202).json({
    success: true,
    message: 'Risk scores refresh started',
  });

  // Run in background
  scoreAllSuppliers(req.user._id, io);
};

module.exports = {
  addSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierNews,
  refreshAllScores,
};