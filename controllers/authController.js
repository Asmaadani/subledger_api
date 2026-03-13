const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Inscription d'un utilisateur
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {  
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Créer l'utilisateur
        const user = await User.create({
            name,
            email,
            password
        });

        // Générer le token
        const token = generateToken(user._id);
        console.log('token created',token);
        
        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        // Passer l'erreur au middleware d'erreurs
        next(error);
    }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {  // Ajout de next
    try {
       const { email, password } = req.body;
console.log(req.body);        
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer le token
        const token = generateToken(user._id);

        res.json({
            message: 'Connexion réussie',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        // Passer l'erreur au middleware d'erreurs
        next(error);
    }
};

// @desc    Obtenir le profil de l'utilisateur connecté
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res, next) => {  // Ajout de next
    try {
        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        });
    } catch (error) {
        // Passer l'erreur au middleware d'erreurs
        next(error);
    }
};

module.exports = { register, login, getProfile };
