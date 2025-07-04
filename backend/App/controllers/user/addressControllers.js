"use strict";
const { default: mongoose } = require('mongoose');
const db = require('../../models');
const addressDB = db.address;

class Address {
    async addAddress(req, res) {
        const { userId, fullname, phone, pinCode, address, city, state,country } = req.body
        if (!userId) {
            return res.send({ status: false, message: "User id is require" })
        }
        if (!fullname) {
            return res.send({ status: false, message: "Full name is require" })
        }
        if (!phone) {
            return res.send({ status: false, message: "Phone number is require" })
        }
        if (!pinCode) {
            return res.send({ status: false, message: "Pin code is require" })
        }
        if (!address) {
            return res.send({ status: false, message: "address is require" })
        }
        if (!city) {
            return res.send({ status: false, message: "city is require" })
        }
        if (!state) {
            return res.send({ status: false, message: "state is require" })
        }
         if (!country) {
            return res.send({ status: false, message: "country is require" })
        }
        try{
            const newAddress = new addressDB({
                 userId, fullname, phone, pinCode, address, city, state,country
            })
            await newAddress.save();
            return res.send({status:true,message:"new address added successfully", data:newAddress})
        }
        catch(error){
            return res.send({status:false, message:"Interal server error pls try again letter",error:error.message})
        }

    }
    async getAddress(req,res){
        const {userId} = req.body;
        if(!userId){
            return res.send({status:false, message:"User ID is require"})
        };
        try{
            const data = await addressDB.find({userId:userId})

            return res.send({status:true, message:"All address find successfully", data: data})

        }
        catch(error){
            return res.send({status:false, message:"Internal server error, pls try again latter", error:error.message})
        }
    }

}


module.exports = new Address();