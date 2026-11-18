import expess from 'express';
import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {userSchema} from '../../validators/authValidator.js';
export const signup = async (req, res) =>  {
    try {
        const{username, email, password} = req.body;

        const { error } = userSchema.safeParse({ username, email, password });
        if (error) {
            return res.status(400).json({ message: error.errors[0].message });
        }

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const hashedPassword= await bcrypt.hash(password, 10);
        const user= new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
        const token = jwt.sign({ userId: user._id }, "louay", { expiresIn: '1h' });
        res.status(201).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
