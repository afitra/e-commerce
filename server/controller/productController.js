const Model = require('../model/product')
class Controller {

    static addproduct(req, res) {

        console.log(req.body);
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