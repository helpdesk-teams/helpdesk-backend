import {z}from 'zod';

export const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),

    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
