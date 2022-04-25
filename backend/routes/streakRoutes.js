const express = require('express');
const router = express.Router();
const {
  setStreaks,
  getStreaks,
  updateStreak,
  deleteStreak,
} = require('../controllers/streakController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getStreaks).post(protect, setStreaks);

router.route('/:id').delete(protect, deleteStreak).put(protect, updateStreak);

module.exports = router;
