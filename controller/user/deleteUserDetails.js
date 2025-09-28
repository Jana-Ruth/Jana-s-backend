const userModel = require("../../models/userModel");

const deleteUserDetails = async (request, response) => {
    try {
        const { _id } = request.body; // Get _id from the request body

        // Ensure _id is provided
        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false,
            });
        }

        // Attempt to delete the user by _id
        const deleteUser = await userModel.deleteOne({ _id: _id });

        // Check if any user was deleted
        if (deleteUser.deletedCount === 0) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // Return success response
        return response.json({
            message: "User deleted successfully",
            error: false,
            success: true,
            data: deleteUser,
        });
    } catch (error) {
        // Handle errors
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = { deleteUserDetails }; // Export the function
