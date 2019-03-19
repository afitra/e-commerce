const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/product', {
//     useNewUrlParser: true
// })
const productSchema = new Schema({
    name: String,
    price: Number,
    detail: String,
    url: String,
    tag: String
})

const Product = mongoose.model('Products', productSchema)
module.exports = Product