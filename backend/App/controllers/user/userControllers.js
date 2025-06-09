"use strict";
const { default: mongoose } = require('mongoose');
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

    async allAddToCartProduct(req, res) {
        const { userId } = req.body
        if (!userId) {
            return res.send({ status: false, message: "User id is require" })
        }
        try {
            const data = await addToCardDB.find({ userId }).sort({ createdAt: -1 });

            return res.send({ status: true, message: "All cart data find successfully", data: data })

        }
        catch (error) {
            return res.send({ status: false, message: "Internal server error", error: error.message })
        }
    }

    async getCartProduct(req, res) {
        const { userId } = req.body
        if (!userId) {
            return res.send({ status: false, message: "User id is require" })
        }
        try {
            const data = await addToCardDB.find({ userId: userId })
            const filterData = await addToCardDB.aggregate([
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    
                }

            ])



            return res.send({ status: true, message: "get all add product", data: data, data1: filterData })

        }
        catch (error) {
            return res.send({ status: false, message: "Internal server error", error: error.message })
        }
    }

    async QuantityIncOrDce(req, res) {
        const { id, Quantity } = req.body;

        if (!id) {
            return res.send({ status: false, message: "Product ID is required" });
        }

        try {
            if (Quantity <= 0) {
                const deletedProduct = await AddToCart.findByIdAndDelete(id);
                if (!deletedProduct) {
                    return res.send({ status: false, message: "Product not found to delete" });
                }

                return res.send({ status: true, message: "Product removed from cart" });
            }

            const updatedProduct = await AddToCart.findByIdAndUpdate(
                id,
                { Quantity: Quantity },
                { new: true }
            );

            if (!updatedProduct) {
                return res.send({ status: false, message: "Product not found in cart" });
            }

            return res.send({ status: true, data: updatedProduct, message: "Quantity updated successfully" });

        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }

}


module.exports = new User();