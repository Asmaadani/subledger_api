const Subscription = require('../models/Subscription');

// @desc    Créer un abonnement
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = async (req, res, next) => {  
    try {
        const { name, price, billingCycle } = req.body;

        const subscription = await Subscription.create({
            name,
            price,
            billingCycle,
            userId: req.user._id
        });

        res.status(201).json({
            message: 'Abonnement créé avec succès',
            subscription
        });
    } catch (error) {
        next(error);  
    }
};

// @desc    Obtenir tous les abonnements de l'utilisateur
// @route   GET /api/subscriptions
// @access  Private
const getSubscriptions = async (req, res, next) => {  
    try {
        const subscriptions = await Subscription.find({ userId: req.user._id });
        res.json({ subscriptions });
    } catch (error) {
        next(error);  
    }
};

// @desc    Obtenir un abonnement spécifique
// @route   GET /api/subscriptions/:id
// @access  Private
const getSubscriptionById = async (req, res, next) => {  
    try {
        const subscription = await Subscription.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!subscription) {
            return res.status(404).json({ message: 'Abonnement non trouvé' });
        }

        res.json({ subscription });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Abonnement non trouvé' });
        }
        next(error);  
    }
};

// @desc    Modifier un abonnement
// @route   PUT /api/subscriptions/:id
// @access  Private
const updateSubscription = async (req, res, next) => {  
    try {
        const { name, price, billingCycle } = req.body;

        const subscription = await Subscription.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!subscription) {
            return res.status(404).json({ message: 'Abonnement non trouvé' });
        }

        subscription.name = name || subscription.name;
        subscription.price = price || subscription.price;
        subscription.billingCycle = billingCycle || subscription.billingCycle;

        await subscription.save();

        res.json({
            message: 'Abonnement modifié avec succès',
            subscription
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Abonnement non trouvé' });
        }
        next(error);  
    }
};

// @desc    Supprimer un abonnement
// @route   DELETE /api/subscriptions/:id
// @access  Private
const deleteSubscription = async (req, res, next) => {  
    try {
        const subscription = await Subscription.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!subscription) {
            return res.status(404).json({ message: 'Abonnement non trouvé' });
        }

        res.json({ message: 'Abonnement supprimé avec succès' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Abonnement non trouvé' });
        }
        next(error);  
    }
};

module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription
};