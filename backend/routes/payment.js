const express = require('express');
const cors = require('cors');
const router = express.Router();


const { 
    processPayment,
    sendStripeApi
} = require('../controllers/paymentController');

const { isAuthenticatedUser } =require('../middlewares/auth');

router.route('/payment/process').post(isAuthenticatedUser, cors(), processPayment);
router.route('/stripeapi').get(sendStripeApi);


module.exports = router;