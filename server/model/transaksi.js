const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const mongodb = require('mongodb')
const transaksiSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    productList: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    price: Number,
    status: String,
    tanggal: Date
})

const Transaksi = mongoose.model('Transaksis', transaksiSchema)
module.exports = Transaksi