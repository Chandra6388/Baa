
const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
    country: {
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


module.exports = mongoose.model("address", addressSchema);




