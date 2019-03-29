const Model = require('../model/user')
const bcrypt = require('bcrypt');
const Product = require('../model/product')
const jwt = require('../helper/jwt'),
    images = require('../helper/images'),
    transaksi = require('../model/transaksi')
class Controller {


    static unggah(req, res) {
        // var a = images.multer.single('image')
        console.log('.....ini masok');
        let validasi = jwt.verify(req.headers.token)
        // console.log(validasi);
        console.log('ini req.filenya', req.file)
        console.log("masuk sini foto", req.body)
        let obj = {

            name: req.body.title,
            price: req.body.price,
            tag: req.body.tag,
            image: req.file.cloudStoragePublicUrl
        }
        console.log(obj);
        Model.findOne({
                email: validasi.email
            })
            .then(data => {
                if (data.length == 0) {
                    throw Error
                } else {
                    return Product.create(obj)
                }
            })
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    messege: err.message
                })
            })

    }
    static role(req, res) {
        // console.log('--------');

        var validation = jwt.verify(req.headers.token)
        // console.log(validation, 'jjjjjjjjjjj');

        Model.findOne({
                email: validation.email
            })
            .then(data => {
                res.status(200).json(data)
                // console.log(data);

            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })
    }
    static pay(req, res) {
        var validation = jwt.verify(req.headers.token)

        var ID = ''
        // console.log(req.body.data);
        // Model.update({
        //         $set: {
        //             'productList': []
        //         }
        //     })
        Model.findOneAndUpdate({
                email: validation.email
            }, {
                productList: []
            }, {
                new: true
            })
            .then(function (data) {
                // console.log(data, '0000');
                ID = data._id
                return transaksi.create({
                    userId: ID,
                    productList: req.body.data,
                    status: 'on procces',
                    tanggal: new Date()
                })
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
    static deleteList(req, res) {
        // console.log('masuk ini');


        var validation = jwt.verify(req.headers.token)
        console.log(validation);
        console.log(req.body);
        Model.update({
                email: validation.email
            }, {
                $pop: {
                    productList: req.body.index

                }
            })
            .then(data => {
                console.log(data);
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    messege: err.message
                })
            })


    }
    static listcart(req, res) {
        var validation = jwt.verify(req.headers.token)
        Model.find({
                email: validation.email
            })
            .populate('productList')
            .then(function (data) {
                // res.status(201).json(data)
                res.status(200).json(data)
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
        console.log(req.body, 'okokokok');


        Model.update({
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

        // console.log('allll');

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


    static register(req, res) {
        // console.log(req.body);

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
        // console.log(req.body);

        if (req.body.email == undefined || req.body.password == undefined) {
            // console.log('ooooo');
            throw Error

        } else {
            Model.findOne({
                    email: req.body.email
                })
                .then(function (user) {
                    // console.log('masok login');

                    let validasi = bcrypt.compareSync(req.body.password, user.password);
                    if (validasi == false) {
                        res.status(400).json({
                            message: 'Wrong Email/Password'
                        })
                    } else {
                        let token = jwt.sign({
                            email: user.email
                        })
                        res.status(200).json({
                            token,
                            role: user.role
                        })
                    }

                })
                .catch(function (err) {
                    res.status(500).json({
                        messege: err.message
                    })
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