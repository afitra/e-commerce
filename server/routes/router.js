const router = require('express').Router(),
    userController = require('../controller/userController'),
    productController = require('../controller/productController'),
    transaksiController = require('../controller/transaksiController'),
    images = require('../helper/images'),
    autentic = require('../midleware/autentic'),
    autorize = require('../midleware/autorize')



// console.log(images.cloudStoragePublicUrl, 'testing');
router.get('/product/all', productController.all)
router.patch('/product/edit/:id', autentic, autorize, productController.edit)
router.delete('/product/delete/:id', autentic, autorize, productController.remove)
router.post('/user/role', autentic, userController.role)
router.post('/user/list', autentic, userController.listcart)
router.get('/transaksi/admin', transaksiController.adminAll)
router.get('/transaksi/all', autentic, transaksiController.all)
router.patch('/user/pay', autentic, userController.pay)
router.patch('/user/removelist', autentic, userController.deleteList)
router.post('/transaksi/add', autentic, transaksiController.add)
router.post('/user/uploud', autentic, autorize,
    images.multer.single('image'),
    images.sendUploadToGCS, userController.unggah)
router.post('/user/login', userController.login)
router.post('/user/register', userController.register)

// =============================DUMMY ROutes
router.post('/product/add', productController.addproduct)



router.get('/user/all', userController.all)
router.delete('/user/delete/:id', userController.remove)
router.patch('/user/add', userController.addproduct)
router.delete('/transaksi/delete/:id', transaksiController.remove)


module.exports = router