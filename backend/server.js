const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); 
const moduleRoutes = require('./routes/modules');
const progressRoutes = require('./routes/progress');

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

app.use(express.json());
console.log('Routes d\'authentification montées sur /api/auth');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Serveur Express en cours !');
});

app.use('/api/auth', authRoutes); 


app.use('/api/modules', moduleRoutes);

app.use('/api/progress', progressRoutes);


app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});