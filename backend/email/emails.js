import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category: "Email Verification"
        })

        console.log('Email sent successfully', response);
    }
    catch (err) {
        console.error(`Error sending verification email: ${err}`);
        throw new Error(`Error sending verification email: ${err}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];

    try {
        const response =await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "89600838-e991-436f-a28f-f486899cafbe",
            template_variables: {
                "company_info_name": "Lunatika",
                "name": name
            }
        });

        console.log('Welcome email sent successfully', response);
    } catch (error) {
        console.log('Error sending welcome email', error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
            category: "Password Reset"
        })
    } catch (err) {
        console.log('Error sending password reset email', err);
        throw new Error(`Error sending password reset email: ${err}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });

        console.log('Password reset email sent successfully', response);
    } catch (err) {
        console.log('Error sending password reset email', err);
        throw new Error(`Error sending password reset email: ${err}`);
    }
}