// test-simple.js
const express = require('express');
const app = express();

app.use(express.json());

// Route simple SANS next
app.post('/test-sans-next', async (req, res) => {
    try {
        res.json({ message: 'OK sans next' });
    } catch (error) {
        console.log('Erreur:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route simple AVEC next
app.post('/test-avec-next', async (req, res, next) => {
    try {
        res.json({ message: 'OK avec next' });
    } catch (error) {
        next(error);
    }
});

// Middleware erreur
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(6001, () => {
    console.log('✅ Test server sur port 6001');
});