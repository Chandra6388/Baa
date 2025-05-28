import { Schema , model} from "mongoose";

const paymentModel = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    payment_method: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
}, {
    timestamps: true
});

const payment = model('payments', paymentModel);
export default payment;