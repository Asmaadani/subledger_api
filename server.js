require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();
const app = express();

// Middleware de base
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes

console.log('Chargement des routes...');
app.use('/api/auth', require('./routes/authRoutes'));
console.log('authRoutes chargé');


// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Route de base
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur SubLedger API' });
});

// 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});


app.use((err, req, res, next) => {
    console.error('Erreur:', err);
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});