const Cart = require('../models/Cart');

const addToCart = async (req,res,next) => {
    try {
        if (req.user.role !== 'user'){
            return res.status(403).send("Access Denied")
        }
        const {productId} = req.body;

        let cart = await Cart.findOne({ userId : req.user._id});

        if (cart) {
            cart.products.push(productId);
            await cart.save();
        } else {
            cart = new Cart({ userId: req.user._id, products: [productId] });
            await cart.save();
        }
        res.json({'message' : 'Product added to cart.'});
    } catch (err) {
        next(err);
    }
}

const getCart = async (req, res) => {
    if (req.user.role !== 'user') return res.status(403).send('Access denied.');

    const cart = await Cart.findOne({ userId: req.user._id }).populate('products');
    res.send(cart ? cart.products : []);
};

const checkout = async (req, res) => {
    if (req.user.role !== 'user') return res.status(403).send('Access denied.');

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart || cart.products.length === 0) return res.status(400).json({'message':'Cart is empty.'});

    await Cart.deleteOne({ userId: req.user._id });
    res.json({'message' : 'Checkout successful. Cart cleared.'});
};

module.exports = {addToCart, getCart, checkout};