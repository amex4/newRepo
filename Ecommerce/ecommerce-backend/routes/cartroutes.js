const express = require('express');
const router = express.Router();
const {addToCart, getCart, checkout} = require('../controllers/cartController')
const authenticateJWT = require('../middleware/authmiddleware');

router.post('/add', authenticateJWT, addToCart);
router.post('/get', authenticateJWT, getCart);
router.post('/checkout', authenticateJWT, checkout);

module.exports = router;