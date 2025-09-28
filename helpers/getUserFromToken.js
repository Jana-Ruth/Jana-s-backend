
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Helper function to get user from token
async function getUserFromToken(token) {
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        // Fetch the user using decoded token data
        const user = await userModel.findById(decoded._id).select("-password"); // Exclude password from the result
        return user;
    } catch (error) {
        console.error("Error decoding token:", error.message);
        return null;
    }
}

module.exports = getUserFromToken
