const express = require('express');
const Story = require('../models/Story');
const auth = require('../middleware/auth');
const router = express.Router();

// Submit a story
router.post('/', async (req, res) => {
  try {
    const story = new Story(req.body);
    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get approved stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all stories (Admin only)
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve story (Admin only)
router.patch('/:id/approve', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    res.json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;