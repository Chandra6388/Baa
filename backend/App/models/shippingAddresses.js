import { Schema , model} from "mongoose";

const shippingAddressModel = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    address_line_1: {
        type: String,
        required: true
    },
    address_line_2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const shippingAddress = model('shippingAddresses', shippingAddressModel);
export default shippingAddress;