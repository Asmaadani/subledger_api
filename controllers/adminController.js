const User = require('../models/User');
const Subscription = require('../models/Subscription');

// @desc    Obtenir tous les utilisateurs
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => { 
    try {
        const users = await User.find().select('-password');
        res.json({ users });
    } catch (error) {
        next(error);  
    }
};

// @desc    Obtenir toutes les statistiques
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res, next) => { 
    try {
        const totalUsers = await User.countDocuments();
        const totalSubscriptions = await Subscription.countDocuments();
        const totalMonthlyRevenue = await Subscription.aggregate([
            { $match: { billingCycle: 'monthly' } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);

        res.json({
            stats: {
                totalUsers,
                totalSubscriptions,
                totalMonthlyRevenue: totalMonthlyRevenue[0]?.total || 0
            }
        });
    } catch (error) {
        next(error);  
    }
};

module.exports = {
    getAllUsers,
    getStats
};