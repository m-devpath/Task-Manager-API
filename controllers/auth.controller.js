import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId}, 
        process.env.JWT_SECRET, 
        {expiresIn: '7d'}
    );
};


// Register Controller 
export const register = async (req, res) => {
    try {

        // Get user input from the request body
        const { name, email, password } = req.body;

        
        // Check if the user already exists (to avoid duplicates)
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ success: false, message: 'User already exists with this email'});
        }
        
        // Create new user 
        const user = await User.create({
            name,
            email, 
            password
        });

        // Generate jwt token for new user 
        const token = generateToken(user._id);

        res.status(201).json({ 
            success: true,
            message: 'User Registered Successfully', 
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ success: false, message: 'Server error during registeration'});
    }
};


// Login Controller 
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find user by email and force include using password 
        const user = await User.findOne({ email }).select('+password');

        // Check if user doesn't exist 
        if(!user){
            return res.status(401).json({success: false, message: 'Invalid Email or Password'});
        }

        // Check if the password matches
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
           return res.status(401).json({success: false, message: 'Invalid Email or Password'});
        }

        //Generate jwt token 
        const token = generateToken(user._id);

        res.status(201).json({ 
            success: true,
            message: 'User Login Successfully', 
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during login'});
    }
};


