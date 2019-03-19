const router = require('express').Router(),
    userController = require('../controller/userController'),
    productController = require('../controller/productController')



router.post('/product/add', productController.addproduct)
router.get('/product/all', productController.all)
router.delete('/product/delete/:id', productController.remove)


router.post('/user/login', userController.login)
router.post('/user/register', userController.register)
router.get('/user/all', userController.all)
router.delete('/user/delete/:id', userController.remove)
router.patch('/user/add', userController.addproduct)
router.post('/user/list', userController.listcart)




module.exports = router