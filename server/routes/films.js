const express = require('express');
const Film = require('../models/Film');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all public films
router.get('/', async (req, res) => {
  try {
    const films = await Film.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single film
router.get('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: 'Film not found' });
    }
    res.json(film);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create film (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const film = new Film({
      ...req.body,
      uploadedBy: req.user.id
    });

    const savedFilm = await film.save();
    res.status(201).json(savedFilm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;