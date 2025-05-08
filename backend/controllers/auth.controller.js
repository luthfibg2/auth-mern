import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../email/emails.js";

export const signup = async (req, res) => {

    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }

        const userAlreadyExists = await User.findOne({email});
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000 // 1 day
        });

        await user.save();

        // jwt token

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(400).json({ success: false, error: 'Invalid password' });
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log('Error logging in', error);
        res.status(400).json({ success: false, error: error.message });
    }
}
export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}

export const verifyEmail = async (req, res) => {
    // code e.g 123456
    const { code } = req.body;

    try {
        const user = await User.findOne({ 
            verificationToken: code,
            verificationTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid verification code' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;

        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log('Error verifying email', error);
        res.status(400).json({ success: false, error: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }

        // generate random reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = resetTokenExpires;
        await user.save();

        // send email reset password
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: 'Password reset email sent successfully'
        });

    } catch (error) {
        console.log('Error sending password reset email', error);
        res.status(400).json({ success: false, error: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if(!user) {
            return res.status(400).json({success: false, message: 'Invalid or expire reset token'});
        }

        // update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (err) {
        console.log('Error resetting password', err);
        res.status(400).json({ success: false, error: err.message });
    }
}

export const authCheck = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (err) {
        console.log('Error checking auth', err);
        return res.status(400).json({ success: false, error: err.message });
    }
}