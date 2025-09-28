const verifyEmailTemplate = ({ fullName, url }) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4a4a4a;">Welcome to ShopMaster!</h2>
            <p>Dear ${fullName},</p>    
            <p>Thank you for registering with ShopMaster. We're excited to have you on board!</p>   
            <p>Please confirm your email address by clicking the button below:</p>
            <a href="${url}" style="
                color: white;
                background-color: #007bff;
                padding: 12px 20px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                font-weight: bold;
                text-align: center;
                margin-top: 20px;
            ">
                Verify Email
            </a>
            <p style="margin-top: 30px;">If you did not create this account, please ignore this email.</p>
            <p>Best regards,<br>ShopMaster Team</p>
        </div>
    `;
};

module.exports = verifyEmailTemplate;
