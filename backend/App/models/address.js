const { Schema, model } = require('mongoose')
const addressSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    fullname: {
        type: String,
        trim: true,
        default: null,
    },
    phone: {
        type: Number,
        default: null,
        trim: true
    },
    pinCode: {
        type: Number,
        default: null,
        trim: true
    },
    address: {
        type: String,
        default: null,
        trim: true
    },
    city: {
        type: String,
        default: null,
        trim: true
    },
    state: {
        type: String,
        default: null,
        trim: true
    }
},
    {
        timestamps: true
    });

module.exports = model("address", addressSchema);

