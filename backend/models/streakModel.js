const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    task: {
      type: String,
      required: [true, 'Please add text'],
    },
    completed: {
      type: Boolean,
      default: false,
      required: [true, 'Please add completed'],
    },
    streak: {
      type: Number,
      default: 0,
      required: [true, 'Please add streak'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Streak', streakSchema);
