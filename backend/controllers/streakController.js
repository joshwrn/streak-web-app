const asyncHandler = require('express-async-handler');

const Streak = require('../models/streakModel');
// @desc    Get streaks
// @route   GET /ap/goals
// @access  Private
const getStreaks = asyncHandler(async (req, res) => {
  const streaks = await Streak.find({ user: req.user.id });
  res.status(200).json(streaks);
});

// @desc    Set streaks
// @route   GET /ap/goals
// @access  Private
const setStreaks = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const streak = await Streak.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(200).json(streak);
});

// @desc    Update Streak
// @route   GET /api/goals
// @access  Private
const updateStreak = asyncHandler(async (req, res) => {
  const streak = await Streak.findById(req.params.id);

  if (!streak) {
    res.status(400);
    throw new Error('Streak not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (streak.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedStreak = await Streak.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedStreak);
});

// @desc    Delete Streak
// @route   GET /api/goals
// @access  Private
const deleteStreak = asyncHandler(async (req, res) => {
  const streak = await Streak.findByIdAndDelete(req.params.id);

  if (!streak) {
    res.status(400);
    throw new Error('Streak not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (streak.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await streak.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getStreaks,
  setStreaks,
  updateStreak,
  deleteStreak,
};
