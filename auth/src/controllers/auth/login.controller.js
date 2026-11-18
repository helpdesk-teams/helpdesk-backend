import express from 'express';
import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {userSchema} from '../../validators/authValidator.js';

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const { error } = userSchema.safeParse({ username, password });
        if (error) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, "louay", { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
    