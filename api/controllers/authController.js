import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";


export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;

    // Encrypt password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    
    const user = User({username, email, password: hashedPassword});

    try{
        await user.save();
        res.status(201).json({message: 'User created successfully'});

    }catch(err) {
        next(err);
    }
}


export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user) return next(errorHandler(404, 'User not found'));
        const isMatch = bcryptjs.compareSync(password, user.password);

        if(!isMatch) return next(errorHandler(401, 'Invalid credentials'));
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        // Destructure the password from the user password
        const {password: pass,...userWithoutPassword} = user._doc;

        // Cookie timeout can be set here
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(userWithoutPassword);

    }catch(err) {
        next(err);
    }
}


export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been signed out');
    } catch (err) {
        next(err);
    }
}