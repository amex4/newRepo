const Product = require('../models/Product');

const addProduct = async (req, res, next) => {
    try {
        const { name, features, price, image } = req.body;
        const newProduct = new Product({ name, features, price, image });
        await newProduct.save();
        res.json({success:true , message: 'Product added successfully.' });
    } catch (err) {
        next(err);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req,res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id : id })
        res.json({product});
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req,res,next) => {
    try {
        const id = req.params.id
        const deletedProduct = await Product.findOneAndDelete({ _id : id})
        if(deletedProduct){
        res.json({deletedProduct , success : true});
        }
        else{
            return res.status(400).json({"message" : "this product is not available"});
        }
    } catch (err) {
        next(err);
    }
} 

const updateProduct = async (req,res,next) => {
    try {
        const id = req.params.id;
        const {features, price, image} = req.body
        const updatedProduct = await Product.findOneAndUpdate(
            {_id : id},
            { $set: { features : features, price : price, image : image} },
        );
        if(updatedProduct){
            res.json(updatedProduct);
        }
        else{
            return res.status(400).json({"message" : "product does not exist"});
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {addProduct, getProducts, getProductById, deleteProduct, updateProduct};
