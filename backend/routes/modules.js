const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const Progress = require('../models/Progress');

// Récupérer tous les modules
router.get('/', async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Marquer un module comme complété pour un utilisateur
router.post('/:id/complete', async (req, res) => {
  try {
    const { userId } = req.body; // on récupère depuis frontend
    const moduleId = req.params.id;

    let progress = await Progress.findOne({ userId, moduleId });
    if (!progress) {
      progress = new Progress({ userId, moduleId, completed: true });
    } else {
      progress.completed = true;
      progress.updatedAt = new Date();
    }

    await progress.save();
    res.json({ message: 'Progression enregistrée', progress });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
