const {Schema, model} = require('mongoose')

const addToCartModel = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    Quantity : {
        type:Number,
        default:1
    }

},
    {
        timestamps: true
    });

module.exports = model("addToCart", addToCartModel);

