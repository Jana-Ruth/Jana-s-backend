const mongoose = require("mongoose")

if(!process.env.MONGODB_URL){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
        console.log("Mongodb connect error",err)
        process.exit(1)
    }
}

module.exports = connectDB