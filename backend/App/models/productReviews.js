import { Schema, model } from "mongoose";

const productReviewModel = Schema({
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
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const productReview = model('productReviews', productReviewModel);
export default productReview;
