const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    /*
        category: [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    
    */
    category: String,
    productImage: [],
    description: String,
    stock : {
        type : Number,
        default : null
    },
    productVideo : String,
    price: Number,
    sellingPrice: Number,
    publish : {
        type : Boolean,
        default : true
    }
}, {
    timestamps : true
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel