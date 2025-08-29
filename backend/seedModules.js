require('dotenv').config();
const mongoose = require('mongoose');
const Module = require('./models/Module');

const modules = [
  {
    title: 'Introduction',
    description: 'Découvre le fonctionnement de la plateforme et commence ton parcours.',
    content: 'Contenu du module Introduction…',
  },
  {
    title: 'Bases – Niveau 1',
    description: 'Les fondamentaux pour bien démarrer.',
    content: 'Contenu du module Bases – Niveau 1…',
  },
  {
    title: 'Approfondissement – Niveau 2',
    description: 'On va un peu plus loin avec des cas pratiques.',
    content: 'Contenu du module Approfondissement – Niveau 2…',
  },
  {
    title: 'Quiz de validation',
    description: 'Teste tes connaissances avec un quiz rapide.',
    content: 'Contenu du module Quiz…',
  },
];

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI manquant dans .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connecté à MongoDB');

  const reset = process.argv.includes('--reset');

  if (reset) {
    await Module.deleteMany({});
    console.log('🧹 Collection "modules" vidée');
  } else {
    const count = await Module.countDocuments();
    if (count > 0) {
      console.log(`ℹ️ ${count} modules existent déjà. Rien à faire (utilise --reset pour réinitialiser).`);
      await mongoose.disconnect();
      process.exit(0);
    }
  }

  const inserted = await Module.insertMany(modules);
  console.log(`🎉 ${inserted.length} modules insérés :`);
  inserted.forEach((m) => console.log(`   - ${m.title}`));

  await mongoose.disconnect();
  console.log('🔌 Déconnecté de MongoDB');
  process.exit(0);
}

run().catch(async (err) => {
  console.error('❌ Erreur seed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
