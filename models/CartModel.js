// 導入 mongoose
const mongoose = require('mongoose');
// 導入數據庫連接模塊
const db = require('../db/db.js');

//由于 mongoose.model 方法是異步的，建議使用 Promise 或回調函數确保在模型準備好之後再導出

const CartModelPromise = new Promise((resolve, reject) => {
    db(()=>{
        //創建文檔的結構對象
        //Schema 是一種描述數據結構的方式，用來設置集合的屬性以及屬性值的類型
        const CartSchema = new mongoose.Schema({
            name: String,
            kind: String,
            price: Number,
            url: String,
            number: Number,
            code: Number
        });
        
        //創建模型對象  對文檔操作的封裝對象  此carts為自訂的集合名
        //model包裝schema，使集合能夠增刪查改
        const CartModel = mongoose.model('carts',CartSchema); 

        // 将 CartModel 暴露出去
        resolve(CartModel);
    });

});

//暴露模型對象
module.exports = CartModelPromise;