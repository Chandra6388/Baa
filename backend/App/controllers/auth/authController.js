"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../../models');
const User = db.user;

class Auth {

    async login(req, res) {
        const { email, password } = req.body;
        if(!email) {
            return res.send({status:false, message: "Email is required" });
        }
        if(!password) {
            return res.send({status:false, message: "Password is required" });
        }

        
        const user = await User.find({ email: email });
        if (!user) {
            return res.send({ status: false,  message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.send({ status: false, message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: user[0]._id }, process.env.SECRET, { expiresIn: "1h" });
        const { password: _, ...userWithoutPassword } = user[0].toObject();

        return res.status(200).json({
            status: true,
            message: "Login successful",
            user: userWithoutPassword,
            token: token,
            expiresIn: 3600
        });

 
    }

    async register(req, res) {
        const { fullname , username, email, password, phone , role} = req.body;
        const existingUser = {
            $or : [
                { email: email },
                { username: username },
                { phone: phone }

            ]
        };
        const user = await User.findOne(existingUser);
        if (user) {
            return res.send({ status: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
            phone,
            role: role || "USER",
        });

        try {
            const savedUser = await newUser.save();
            return res.send({ status: true, message: "User registered successfully", user: savedUser });
        } catch (error) {
            return res.send({ message: "Error registering user", error });
        }
    }

    async update(req, res){
        const {userId}= req.body;
        if(!userId){
            return res.status(400).json({status:false, message:"User Id is require"})
        }
        try{

        }
        catch(error){

        }
    }
}


module.exports = new Auth();