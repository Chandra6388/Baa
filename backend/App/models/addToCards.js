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

},
    {
        timestamps: true
    });

module.exports = model("addToCart", addToCartModel);

