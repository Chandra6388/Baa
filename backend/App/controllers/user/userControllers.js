"use strict";
const db = require('../../models');
const addToCardDB = db.addToCard1;

class User {
    async AddToCart(req, res) {

        const { userId, ProductId } = req.body
        try {
            if (!userId) {
                return res.send({ status: false, message: "User Id is require" })
            }
            if (!ProductId) {
                return res.send({ status: false, message: "Product Id is require" })
            }

            const isExitProduct = await addToCardDB.findOne({ userId: userId, productId: ProductId })
            if (isExitProduct) {
                return res.send({ status: false, message: "This product is already exit", })
            }

            const newData = new addToCardDB({
                userId,
                productId: ProductId
            })

            await newData.save()

            return res.send({ status: true, message: "New product added  in cart", data: newData })
        }
        catch (error) {
            return res.send({ status: false, message: "Internal server error", error: error.message })
        }

    }
}


module.exports = new User();