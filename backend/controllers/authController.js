
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const { deleteFile } = require('../helper/deleteFile');
const path = require('path');




//siginup user
const signupUser = async (req, res) => {
    try {

        //Express  validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { name, email, password, mobile } = req.body;
        const isExistUser = await userModel.findOne({ email });
        if (isExistUser) {
            return res.status(200).json({
                success: false,
                msg: "Email already registered"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            name,
            email,
            password: hashPassword,
            mobile,
        });
        const userData = await user.save();


        return res.status(200).json({
            success: true,
            msg: "Your Account is created is successfuly",
            data: userData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}





const gernateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "1h" });
    return token;
}


//loin user
const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { password, email } = req.body;
        const userData = await userModel.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password or Email"
            });
        }

        const isMatchPassword = await bcrypt.compare(password, userData.password);
        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password or Email"
            });
        }
        
        const accessToken = await gernateAccessToken({ user: userData });

           
             res.cookie('token', `Bearer ${accessToken }`, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000 
            });


        return res.status(200).json({
            success: true,
            message: "You logined successfully",
            user: userData,
            accessToken: accessToken,
            tokenType: "Bearer"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

//Profile
const userProfile = async (req, res) => {
    try {

        return res.status(200).json({
            success: true,
            message: "User Profile  Data",
            data: req.user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

//update Profile
const updateProfile = async (req, res) => {
    try {
        const { name, mobile } = req.body;

        const data = { name, mobile, }

        const user_id = req.user.user._id;
        if (req.file !== undefined) {
            data.image = 'images/' + req.file.filename;
            const oldUser = await userModel.findOne({ _id: user_id });
            const oldFilePath = path.join(__dirname, '../public/' + oldUser.image);
            deleteFile(oldFilePath);
        }

        const userData = await userModel.findByIdAndUpdate({ _id: user_id }, {
            $set: data
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: "User Data updated successfully",
            data: userData
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//logout
const logout = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['authorization'];
        
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token not provided"
            });
        }

       
        const bearer = token.split(" ");
        const bearerToken = bearer.length === 2 ? bearer[1] : bearer[0];

      
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');

      
        res.clearCookie('token'); 

        return res.status(200).json({
            success: true,
            message: "You are logged out"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    signupUser,
    loginUser,
    userProfile,
    updateProfile,
    logout,
}