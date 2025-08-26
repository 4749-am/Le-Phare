// backend/scripts/createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Fonction pour détecter la configuration MongoDB
function detectMongoDBConfig() {
  // 1. Chercher dans .env
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    if (process.env.MONGODB_URI) {
      console.log('📁 Configuration trouvée dans .env');
      return process.env.MONGODB_URI;
    }
  }

  // 2. Chercher dans server.js
  const serverPath = path.join(__dirname, '..', 'server.js');
  if (fs.existsSync(serverPath)) {
    const serverContent = fs.readFileSync(serverPath, 'utf8');
    const mongoMatch = serverContent.match(/mongoose\.connect\(['"`]([^'"`]+)['"`]\)/);
    if (mongoMatch) {
      console.log('📁 Configuration trouvée dans server.js');
      return mongoMatch[1];
    }
  }

  // 3. Configuration par défaut
  console.log('⚠️  Aucune configuration trouvée, utilisation de la configuration par défaut');
  return 'mongodb://localhost:27017/le-phare'; // Remplacez 'le-phare' par le nom de votre projet
}

async function createAdmin() {
  try {
    // Détecter automatiquement la configuration
    const MONGODB_URI = detectMongoDBConfig();
    console.log('🔗 Connexion à:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Cache les mots de passe

    // Connexion à MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('ℹ️  Un administrateur existe déjà:', existingAdmin.username);
      console.log('Vous pouvez vous connecter avec cet utilisateur.');
      process.exit(0);
    }

    // Créer l'administrateur
    const admin = new User({
      username: 'admin',
      password: 'admin123', // Sera hashé automatiquement par le pre-save hook
      role: 'admin'
    });

    await admin.save();
    console.log('\n✅ Administrateur créé avec succès !');
    console.log('📋 Informations de connexion :');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  IMPORTANT: Changez le mot de passe après la première connexion !');

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'admin:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Solutions possibles :');
      console.log('   - Vérifiez que MongoDB est démarré');
      console.log('   - Vérifiez l\'adresse de connexion');
      console.log('   - Si vous utilisez MongoDB Atlas, vérifiez vos identifiants');
    }
  } finally {
    // Fermer la connexion
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('🔌 Connexion fermée');
    }
    process.exit(0);
  }
}

// Exécuter le script
createAdmin();