import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    try{

        // Get the token from authorization header 
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({ success: false, message: 'Not authorized, no token'});
        }

        const token = authHeader.split(' ')[1];

        // Verify the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user to req, excluding password
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({ success: false, message: 'User no longer exists' });
        }

        req.user = user;
        next();

    }catch(error){
        return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

