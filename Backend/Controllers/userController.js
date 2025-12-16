import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import httpStatus from "http-status"
import {User} from "../Models/userModel.js"

const register = async(req, res)=>{
    try{
        const {username, password, name, email} = req.body
        const user = await User.findOne({username: username})
        if(user){
            return res.status(httpStatus.CONFLICT).json({message: "A user with this username already exists. Please try a different username"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            name: name,
            email: email
        })
        const token = jwt.sign({userID: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.status(httpStatus.CREATED).json({message: "User registered successfully...",
            token,
            username: newUser.username
        })
    }
    catch(error){
        console.log('This error occured in registering the user: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "there was some internal server error. Please try again later..."})
    }
}

const login = async (req, res)=>{
    try{
        let {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message: "No user found with the given credentials"})
        }
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })
            return res.status(httpStatus.OK).json({message: "Authentication successfull !!!", 
                token,
                username: user.username
            })
        }
    }
    catch(error){
        console.log("This error occured in authenticating the user : ", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "There was some error in authenticating you at this moment. Please try again after some time"})
    }
}

export {register, login}