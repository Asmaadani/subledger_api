const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validate, subscriptionSchema } = require('../validation/schemas');
const {createSubscription,getSubscriptions,getSubscriptionById,updateSubscription,deleteSubscription} = require('../controllers/subscriptionController');

router.use(protect);


router.route('/')
    .post(validate(subscriptionSchema), createSubscription)
    .get(getSubscriptions);

router.route('/:id')
    .get(getSubscriptionById)
    .put(validate(subscriptionSchema), updateSubscription)
    .delete(deleteSubscription);

module.exports = router;