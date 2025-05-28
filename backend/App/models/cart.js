import { Schema, model } from "mongoose";

const cartModel = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});
const cart = model('carts', cartModel);

export default cart;