const Model = require('../model/product')
const jwt = require('../helper/jwt')

class Controller {


    static edit(req, res) {
        // let validasi = jwt.verify(req.headers.token)
        // console.log(req.body);

        Model.findOneAndUpdate({
                _id: req.body.id
            }, {
                name: req.body.name,
                price: req.body.price,
                tag: req.body.tag
            }, {
                new: true
            })
            .then(data => {
                res.status(200).json(data)
                console.log(data);

            })

            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })

    }


    static addproduct(req, res) {

        // console.log(req.body, 'okokokokoko');
        Model.create(req.body)

            .then(function (data) {
                res.status(201).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })

    }

    static all(req, res) {

        Model.find({})
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })
    }


    static remove(req, res) {
        // console.log('masok siniiiiiiiiiiiiii');
        // console.log(req.params.id);


        Model.findByIdAndDelete(req.params.id)
            .then(function (data) {
                res.status(200).json(data)
                console.log(data);

            })
            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })
    }

}

module.exports = Controller