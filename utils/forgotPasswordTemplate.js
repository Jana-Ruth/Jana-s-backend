const forgotPasswordTemplate = ({ fullName, otp }) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p style="font-size: 16px;">Dear ${fullName},</p>
            
            <p style="font-size: 16px;">
                You have requested a password reset. Please use the following OTP code to reset your password:
            </p>
            
            <div style="background: #f8e71c; font-size: 24px; padding: 15px; text-align: center; font-weight: bold; color: #333; border-radius: 8px;">
                ${otp}
            </div>
            
            <p style="font-size: 16px; margin-top: 15px;">
                This OTP is valid for 1 hour. Please enter it on the ShopMaster website to proceed with resetting your password.
            </p>
            
            <br />
            <p style="font-size: 16px;">Thank you,</p>
            <p style="font-size: 16px; font-weight: bold;">ShopMaster Support Team</p>
        </div>
    `;
};

module.exports = forgotPasswordTemplate;
