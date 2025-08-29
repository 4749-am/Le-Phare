const express = require('express');
const Progress = require('../models/Progress');

const router = express.Router();

// Récupérer la progression d’un utilisateur
router.get('/:userId', async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur progression' });
  }
});

// Marquer un module comme terminé
router.post('/:userId/:moduleId/complete', async (req, res) => {
  try {
    let progress = await Progress.findOne({
      userId: req.params.userId,
      moduleId: req.params.moduleId
    });

    if (!progress) {
      progress = new Progress({
        userId: req.params.userId,
        moduleId: req.params.moduleId,
        completed: true,
        completedAt: new Date()
      });
    } else {
      progress.completed = true;
      progress.completedAt = new Date();
    }

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur completion' });
  }
});

module.exports = router;
