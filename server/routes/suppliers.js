const express = require('express');
const {
  addSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierNews,
  refreshAllScores,
} = require('../controllers/supplierController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/refresh',    refreshAllScores);
router.post('/',           addSupplier);
router.get('/',            getSuppliers);
router.get('/:id',         getSupplier);
router.put('/:id',         updateSupplier);
router.delete('/:id',      deleteSupplier);
router.get('/:id/news',    getSupplierNews);

module.exports = router;