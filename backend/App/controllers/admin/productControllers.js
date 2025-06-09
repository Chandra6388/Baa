const db = require("../../models");
const CategoryDb = db.category;
const Product = db.product;
const addToCardDB = db.addToCard1;
const mongoose = require('mongoose');


class ProductController {
    async addProduct(req, res) {
        const { name, description, price, categoryId, image_url, offer_price } = req.body;

        console.log(req.body);
        if (!name || !description || !price || !categoryId || !offer_price || image_url.length == 0) {
            return res.send({ status: false, data: [], message: "All fields are required" });
        }

        try {
            const category = await CategoryDb.findById(categoryId);
            if (!category) {
                return res.status(404).json({ status: false, message: "Category not found" });
            }

            const newProduct = new Product({
                name,
                description,
                price,
                image_url,
                offer_price,
                category_id: categoryId
            });

            await newProduct.save();
            return res.send({ status: true, message: "Product added successfully", data: newProduct });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error adding product", error: error.message });
        }
    }

    async getAllProducts(req, res) {
        const { categoryId, userId } = req.body;
        try {
            const products = await Product.aggregate([
                {
                    $match: {
                        category_id: new mongoose.Types.ObjectId(categoryId)
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $lookup: {
                        from: "addToCart",
                        let: { productId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$productId", "$$productId"] },
                                            { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "cartData"
                    }
                },
                {
                    $addFields: {
                        isAddedToCart: { $gt: [{ $size: "$cartData" }, 0] }
                    }
                },
                {
                    $project: {
                        cartData: 0
                    }
                }
            ]);

            console.log("re", req.body)

            if (products.length === 0) {
                return res.send({ status: false, data: [], message: "No products found" });
            }

            return res.send({ status: true, data: products, message: "Products fetched successfully" });

        } catch (error) {
            console.log("Err, ", error)
            return res.status(500).json({
                status: false,
                message: "Error fetching products",
                error: error.message
            });
        }
    }

    async getTopRatedProducts(req, res) {
        const { limit, userId } = req.body

        if (!limit) {
            return res.send({ status: false, data: [], message: "Limit is required" });
        }
        if (!userId) {
            return res.send({ status: false, data: [], message: "User ID is required" });
        }
        try {


            const filterProducts = await Product.aggregate([
                {
                    $lookup: {
                        from: "addtocarts",
                        let: { productId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$productId", "$$productId"] },
                                            { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "cartData"
                    }
                },
                {
                    $addFields: {
                        isAddTocart: { $gt: [{ $size: "$cartData" }, 0] }
                    }
                },
                {
                    $project: {
                        cartData: 0
                    }
                }

            ]).sort({ rating: -1 }).limit(limit);


            if (filterProducts.length === 0) {
                return res.send({ status: false, data: [], message: "No products found" });
            }

            return res.send({ status: true, data: filterProducts, message: "Top rated products fetched successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error fetching top rated products", error: error.message });
        }
    }

    async getProductById(req, res) {
        const { id, userId } = req.body;

        try {

            const filterProducts = await Product.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "addtocarts",
                        let: { productId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$productId", "$$productId"] },
                                            { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "CartData"
                    }

                },
                {
                    $addFields: {
                        isAddTocart: { $gt: [{ $size: "$CartData" }, 0] }
                    }
                },
                {
                    $project: {
                        CartData: 0
                    }
                }

            ])
            if (!filterProducts) {
                return res.send({ status: false, data: [], message: "Product not found" });
            }
            return res.send({ status: true, data: filterProducts, message: "Product fetched successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error fetching product", error: error.message });
        }
    }

    async updateProduct(req, res) {
        const { id, name, description, price, categoryId, image_url } = req.body;

        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.send({ status: false, data: [], message: "Product not found" });
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    name,
                    description,
                    price,
                    image_url,

                    category_id: categoryId
                },
                { new: true }
            );

            return res.send({ status: true, data: updatedProduct, message: "Product updated successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error updating product", error: error.message });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.body;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.send({ status: false, data: [], message: "Product not found" });
            }


            await Product.findByIdAndDelete(id);
            return res.send({ status: true, data: [], message: "Product deleted successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error deleting product", error: error.message });
        }
    }




}
module.exports = new ProductController();

