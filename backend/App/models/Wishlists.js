import { Schema , model } from "mongoose";

const wishlistModel = Schema({
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
}, {
    timestamps: true
});
const wishlist = model('wishlists', wishlistModel);
export default wishlist;