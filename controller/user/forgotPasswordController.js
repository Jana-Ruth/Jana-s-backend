const sendEmail = require("../../config/sendEmail")
const userModel = require("../../models/userModel")
const forgotPasswordTemplate = require("../../utils/forgotPasswordTemplate")
const generatedOtp = require("../../utils/generatedOtp")

//forgot password not login
async function forgotPasswordController(request,response) {
    try {
        const { email } = request.body 

        const user = await userModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp()
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr

        const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from ShopMaster",
            html : forgotPasswordTemplate({
                fullName : user.fullName,
                otp : otp
            })
        })

        return response.json({
            message : "check your email",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = forgotPasswordController
