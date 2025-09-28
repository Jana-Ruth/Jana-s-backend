// controllers/userController.js
const userModel = require("../../models/userModel");

// Fetch specific user by userId
async function getUserById(req, res) {
    try {
        const { userId } = req.params; // Extract userId from request parameters
        console.log("Fetching user with ID:", userId);

        // Find the user by their ID
        const user = await userModel.findById(userId).select('-password'); // Exclude the password from the result

        console.log("userKing", user)
        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        // Respond with the user data
        res.json({
            message: "User fetched successfully",
            data: user,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred while fetching the user",
            error: true,
            success: false
        });
    }
}

module.exports = getUserById;
