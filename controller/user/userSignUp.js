const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const sendEmail = require('../../config/sendEmail');
const verifyEmailTemplate = require('../../utils/verifyEmailTemplate');

async function userSignUpController(req, res) {
    try {
        const { email, password, fullName, phoneNumber } = req.body;

        const user = await userModel.findOne({ email });
        if (user) throw new Error("User already exists");

        if (!fullName) throw new Error("Please provide full name");
        if (!phoneNumber) throw new Error("Please provide phone number");
        if (!email) throw new Error("Please provide email");
        if (!password) throw new Error("Please provide password");

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        if (!hashPassword) throw new Error("Password hashing failed");

        const userData = new userModel({
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        });
        const saveUser = await userData.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${saveUser._id}`;
        await sendEmail({
            sendTo: email,
            subject: "Verify your email for ShopMaster",
            html: verifyEmailTemplate({ fullName, url: verifyEmailUrl })
        });


        res.status(200).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User registered successfully"
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
