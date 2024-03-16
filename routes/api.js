const express = require('express');
const router = express.Router();

const user = require('../controller/user');
const products = require('../controller/products');
const cart = require('../controller/cart');
const orderinfo = require('../controller/orderinfo');


//用戶
router.post('/user/register', user.register); //註冊
router.post('/user/login', user.login); //登入
router.post('/user/logout', user.logout); //登出

//商品
router.get('/products', products.getproducts); //獲取商品數據
router.patch('/products/:id', products.changestock); //更改商品庫存

//購物車
router.get('/cart', cart.getcart); //獲取購物車數據
router.post('/cart/add', cart.addtocart); //增添數據到購物車
router.patch('/cart/:id',cart.changecart); //更改購物車數據
router.delete('/cart/:id',cart.deletecart); //刪除購物車數據


//訂單
router.post('/orderinfo', orderinfo.addtoorderinfo); //確認訂單，增加訂單信息

module.exports = router;