const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const { getAllUsers, getStats } = require('../controllers/adminController');

// Toutes les routes nécessitent authentification ET rôle admin
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/stats', getStats);

module.exports = router;