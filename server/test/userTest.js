const chai = require('chai'),
    should = chai.should(),
    app = require('../app'),
    chaihttp = require('chai-http'),
    mongoose = require('mongoose')

chai.use(chaihttp)
mongoose.set('useFindAndModify', false)


after(function (done) {
    mongoose.connect('mongodb://localhost:27017/Ecommers', {
        useNewUrlParser: true
    }, function () {
        mongoose.connection.db.dropDatabase()
        done()
    })
})



// ============================= add product  ==============================================================

let productId = ''
describe('add Product', function () {
    it('should return new Product object', function (done) {
        chai.request(app).post('/product/add').send({
                nama: 'buku',
                harga: 1000,
                detai: 'barang tidak mudah pecah..................'
            })
            .then(function (response) {
                response.should.have.status(201)
                productId = response
                done()
            })
            .catch(function (err) {
                console.log(err)
            })
    })
})

// ============================= all product  ==============================================================




describe('all Product', function () {
    it('should return new Product object', function (done) {
        chai.request(app).get('/product/all').send({})
            .then(function (response) {
                response.should.have.status(200)

                done()
            })
            .catch(function (err) {
                console.log(err)
            })
    })
})



describe('Delete Product', function () {
    it('should return object', function (done) {
        chai.request(app).delete(`/product/delete/${productId}`)
            .then(function (response) {
                response.should.have.status(200)
                done()
            })
            .catch(function (err) {
                console.log(err)
            })
    })
})

let token = ''
describe('Login User', function () {
    it('should return User object', function () {
        chai.request(app).post('/user/login').send({
                email: 'budi@mail.com',
                password: '123'
            })
            .then(function (response) {
                response.should.have.status(200)
                token = response.token
                // done()/
            })
            .catch(function (err) {
                console.log(err)
            })
    })
})



// let productId = ''
describe(' Product', function () {
    describe('sukses', function () {
        it('should return new Product object', function (done) {
            chai.request(app)
                .post('/product/add')
                .send({
                    nama: 'buku',
                    harga: 1000,
                    detai: 'barang tidak mudah pecah..................',
                    url: 'google.com',
                    tag: 'rumah tangga'
                })
                .end(function (err, res) {
                    err.should.not.exist(err)
                    res.should.be.have.status(201)
                    res.should.be.an('object')
                    res.body.nama.should.be.equal('buku')

                    done()
                })
        })
    })
})

// ===============================================ROLE

describe('ROLE CEK EROR', function () {
    it('should return  Users object', function (done) {
        chai.request(app)

            .post('/user/role')

            .set({
                token: 'huhllol34k3lj'
            })
            .then(function (response) {
                response.should.have.status(200)

                done()
            })
            .catch(function (err) {
                console.log(err)
            })
    })
})