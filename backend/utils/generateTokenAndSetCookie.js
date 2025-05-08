import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' }); // 7 day

    res.cookie('token', token, {
        httpOnly: true, // prevent client side access
        secure: process.env.NODE_ENV === 'production', // only work in https
        sameSite: 'strict', // prevent csrf attack
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return token;
}