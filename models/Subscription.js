const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Le prix est requis'],
        min: [0.01, 'Le prix doit être supérieur à 0']
    },
    billingCycle: {
        type: String,
        required: [true, 'Le cycle de facturation est requis'],
        enum: {
            values: ['monthly', 'yearly'],
            message: 'Le cycle doit être monthly ou yearly'
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);