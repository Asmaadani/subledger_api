// utils/errorHandler.js
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    console.error('❌ Erreur attrapée:', err);

    let error = { ...err };
    error.message = err.message;

    // Erreur de validation Mongoose
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // Erreur de doublon (email unique)
    if (err.code === 11000) {
        const message = 'Cette valeur existe déjà';
        error = new ErrorResponse(message, 400);
    }

    // Erreur JWT
    if (err.name === 'JsonWebTokenError') {
        const message = 'Token invalide';
        error = new ErrorResponse(message, 401);
    }

    // Erreur token expiré
    if (err.name === 'TokenExpiredError') {
        const message = 'Token expiré';
        error = new ErrorResponse(message, 401);
    }

    // Erreur Cast (ID invalide)
    if (err.name === 'CastError') {
        const message = 'Ressource non trouvée';
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Erreur serveur'
    });
};

module.exports = { errorHandler, ErrorResponse };