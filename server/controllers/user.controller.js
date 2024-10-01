import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async (req,res) => {
    try {

        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                message : "All fields are required",
                success : false
            })
        }

        const existingUser = await UserModel.findOne({username})

        if(existingUser){
            return res.status(400).json({
                message : "User already exists",
                success : false

            })
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            email,
            password : hashedPassword
        }

        await UserModel.create(newUser);

        return res.status(201).json({
            message : "User created successfully",
            success : true
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "internal server error",
            success : false
        })
    }
};


export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message : "All fields are required",
                success : false
            })
        }

        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(404).json({
                message : "User not found",
                success : false
            })
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched){
            return res.status(400).json({
                message : "invalid credentials",
                success : false
            })
        }


        const token = await jwt.sign({id : user._id}, process.env.JWT_SECRET)

        res.cookie("token", token);
        return res.status(200).json({
            message : 'login successfuly',
            user : {id: user._id, email: user.email, username: user.username},
            success : true
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "internal server error",
            success : false
        })
    }
}

export const logout = async (req,res) => {
    try {
        return res.cookie('token', '').json({
            message: 'logged out',
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "internal server error",
            success : false
        })
    }
}