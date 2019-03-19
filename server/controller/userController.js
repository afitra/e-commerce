const Model = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt')
class Controller {


    static listcart(req, res) {
        var validation = jwt.verify(req.headers.token)
        Model.find({
                email: validation.email
            })
            .populate('productList')
            .then(function (data) {
                // res.status(201).json(data)
                res.send(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    messege: 'not fond'
                })
            })
    }

    static addproduct(req, res) {
        var validation = jwt.verify(req.headers.token)
        // console.log('kontrollllll');

        return Model.update({
                email: validation.email
            }, {
                $push: {
                    productList: req.body.id
                }
            }, {
                new: true
            })
            .then(function (data) {
                res.status(201).json(data)
                // res.send(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    messege: 'not fond'
                })
            })
    }

    static all(req, res) {

        console.log('allll');

        Model.find({})
            .then(function (data) {
                res.status(200).json(data)
            })

            .catch(function (err) {
                res.status(500)
            })

    }


    static register(req, res) {
        console.log(req.body);

        if (!req.body.email && !req.body.password) {
            throw Error

        } else {
            Model.create(req.body)
                .then(function (data) {
                    res.status(200).json(data)
                })
                .catch(function (err) {
                    res.status(500).json({
                        messege: err.message
                    })
                })
        }

    }


    static login(req, res) {
        // var validation = jwt.verify(req.headers.token)\
        console.log('masok login');
        if (!req.body.email && !req.body.password) {
            throw Error

        } else {
            Model.findOne({
                    email: req.body.email
                })
                .then(function (user) {

                    let validasi = bcrypt.compareSync(req.body.password, user.password);
                    if (validasi == false) {
                        res.status(400).json({
                            message: 'Wrong Email/Password'
                        })
                    } else {
                        let token = jwt.sign({
                            email: user.email
                        })
                        // console.log(token);
                        res.status(200).json({
                            token
                        })
                    }

                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }
    static remove(req, res) {

        Model.findByIdAndDelete(req.params.id)
            .then(function (data) {
                res.send('ok')
                console.log(data);

            })
            .catch(function (err) {
                res.send(err)
            })
    }


}

module.exports = Controller