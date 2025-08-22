const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Ajoutez cette dépendance : npm install jsonwebtoken
const User = require('../models/User');

// Clé secrète pour JWT (à mettre dans vos variables d'environnement)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    
    // Générer un token après inscription
    const token = jwt.sign(
      { userId: user._id, username: user.username }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ 
      message: 'Utilisateur enregistré avec succès',
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }
    
    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    res.json({ 
      message: 'Connexion réussie',
      token, // IMPORTANT: Ajouter le token dans la réponse
      user: { id: user._id, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
