const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    pens: [
        {
            name: String,
            qty: Number,
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
const FinishedOrder = mongoose.model('FinishedOrder', orderSchema);
module.exports = {
    Order: Order,
    FinishedOrder: FinishedOrder
}