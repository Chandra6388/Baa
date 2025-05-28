import { Schema , model} from "mongoose";

const discountCouponModel = Schema({
    code: {
        type: String,
        required: true 
    },
    discount: {
        type: Number,
        required: true 
    },
    expiry_date: {
        type: Date,
        required: true 
    },
    is_active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});
const discountCoupon = model('discountCoupons', discountCouponModel);
export default discountCoupon;