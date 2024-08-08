const mongoose = require('mongoose');

const productModel = mongoose.Schema(
    {
        name : {type : String, required : true},
        features : {type: String, required : true},
        price : {type : Number, required : true},
        image : {type : String, required : true}
    }
)

module.exports = mongoose.model('Product',productModel);
