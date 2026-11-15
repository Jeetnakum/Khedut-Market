const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getDemands, createDemand, updateDemand, deleteDemand } = require('../controllers/demandController');

router.get('/', getDemands);
router.post('/', protect, authorize('trader'), createDemand);
router.put('/:id', protect, authorize('trader'), updateDemand);
router.delete('/:id', protect, authorize('trader'), deleteDemand);

module.exports = router;
