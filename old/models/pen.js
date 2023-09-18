const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const penSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Pen = mongoose.model('Pen', penSchema);
module.exports = Pen;