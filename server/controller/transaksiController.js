const Model = require('../model/transaksi')
const User = require('../model/user')
const jwt = require('../helper/jwt')
class Controller {

    static add(req, res) {
        var validation = jwt.verify(req.headers.token)
        // console.log('ooooo');
        // console.log(validation);

        var obj = {}
        User.findOne({
                email: validation.email
            })
            .then(data => {
                obj = {
                    userId: data._id,
                    productList: req.body.productList,
                    price: req.body.price,
                    tanggal: new Date()
                }
                if (data.length == 0) {
                    throw Error
                } else {
                    return Model.create(obj)
                }
            })
            .then(data => {

                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }
    static all(req, res) {
        var validation = jwt.verify(req.headers.token)
        console.log(validation);
        var ID = ''
        User.findOne({
                email: validation.email
            })
            .then(data => {
                // console.log(ID);
                // console.log(data, '---');
                // console.log(data);

                ID = data._id
                return Model.find({
                    userId: ID
                })
                // .populate('productList')
            })
            .then(data => {
                res.status(200).json(data)
                console.log(data);

            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }


    static remove(req, res) {
        console.log('masok delete');

        Model.findByIdAndDelete(req.params.id)
            .then(function (data) {
                res.status(200).json(data)
                // console.log(data);

            })
            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })
    }
}
module.exports = Controller