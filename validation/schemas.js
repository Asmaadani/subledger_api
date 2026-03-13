const Joi = require('joi');

// Schéma de validation pour l'inscription
const registerSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Le nom est requis',
        'any.required': 'Le nom est requis'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email invalide',
        'string.empty': 'L\'email est requis',
        'any.required': 'L\'email est requis'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
        'string.empty': 'Le mot de passe est requis',
        'any.required': 'Le mot de passe est requis'
    })
});

// Schéma de validation pour la connexion
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email invalide',
        'string.empty': 'L\'email est requis',
        'any.required': 'L\'email est requis'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Le mot de passe est requis',
        'any.required': 'Le mot de passe est requis'
    })
});

// Schéma de validation pour les abonnements
const subscriptionSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Le nom est requis',
        'any.required': 'Le nom est requis'
    }),
    price: Joi.number().positive().greater(0).required().messages({
        'number.base': 'Le prix doit être un nombre',
        'number.positive': 'Le prix doit être positif',
        'number.greater': 'Le prix doit être supérieur à 0',
        'any.required': 'Le prix est requis'
    }),
    billingCycle: Joi.string().valid('monthly', 'yearly').required().messages({
        'any.only': 'Le cycle de facturation doit être monthly ou yearly',
        'string.empty': 'Le cycle de facturation est requis',
        'any.required': 'Le cycle de facturation est requis'
    })
});

// Middleware de validation
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });    //pour vérifie req.body selon les règles
        //  { abortEarly: false } = montre TOUTES les erreurs, pas seulement la première
        
        if (error) {
            const errors = error.details.map(detail => detail.message);     //entre dans tableau d'objet d'erreur et montre chaqu'un avec son msg 
            return res.status(400).json({ 
                message: 'Erreur de validation',
                errors 
            });
        }
        next();             //Si pas d'erreur, passe au prochain middleware (le controller)
    };
};

module.exports = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    validate
};