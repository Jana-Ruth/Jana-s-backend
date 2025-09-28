const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, fullName, password, profilePic, phoneNumber, role } = req.body;

        const payload = { 
            ...(email && { email }),
            ...(fullName && { fullName }),
            ...(password && { password }),
            ...(profilePic && { profilePic }),
            ...(phoneNumber && { phoneNumber }),
            ...(role && { role }),
        };

        // Update user details and return the updated document
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            payload,
            { new: true } // This option returns the modified document
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        res.json({
            data: updatedUser, // Now it should return the updated user document
            message: "User Updated",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
