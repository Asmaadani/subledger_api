require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./utils/errorHandler');

connectDB();
const app = express();

// Middleware de base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
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

// Error handler - TOUJOURS EN DERNIER
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});