const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { validate, registerSchema, loginSchema } = require('../validation/schemas');
const { protect } = require('../middleware/auth');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', protect, getProfile);

module.exports = router;