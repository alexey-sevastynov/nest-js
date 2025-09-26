export function verificationEmailHtml(verificationLink: string) {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2>Hello!</h2>
        <p>Thank you for signing up. To complete your registration and start using your account, please confirm your email address by clicking the button below.</p>
        <p style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
               ">
               Confirm Your Account
            </a>
        </p>
        <p>If the button above does not work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;"><a href="${verificationLink}">${verificationLink}</a></p>
        <p>Welcome aboard! We’re excited to have you with us.</p>
        <p>Best regards,<br/>The Resend Team</p>
    </div>
    `;
}

export function resetPasswordEmailHtml(resetLink: string) {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #4CAF50;">Reset Your Password</h2>
        <p>You (or someone else) requested a password reset for your account.</p>
        <p>Click the button below to set a new password. This link is valid for 15 minutes.</p>
        
        <p style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
               ">
               Reset Password
            </a>
        </p>

        <p>If the button above does not work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;"><a href="${resetLink}">${resetLink}</a></p>

        <p>If you did not request this change, you can safely ignore this email.</p>

        <p>Best regards,<br/>The Support Team</p>
    </div>
    `;
}
