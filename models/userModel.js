const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : [true, "Provide name"]
    }, 
    email : {
        type : String,
        unique : true,
        required : [true, "Provide email"],
    },
    password : String,
    profilePic : {
       type: String,
       default : ""
    },
    phoneNumber: {
        type: Number,
        unique : true,
        required : [true, "Provide phone number"],
    },
    verify_email : {
        type: Boolean,
        default : false
    },
    address_details : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'address'
        }   
    ],
    shopping_cart : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'addToCart'
        }   
    ],
    orderHistory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'order'
        }   
    ],

    forgot_password_otp : {
        type : String,
        default : null

    },
    forgot_password_expiry : {
        type : Date,
        default : ""
    },
    role : {
        type : String,
        enum : ["ADMIN", "GENERAL"],
        default : "GENERAL"
    }
}, {
     timestamps : true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel