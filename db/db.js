//以下連接mongodb
/**
 * 
 * @param {*} success 數據庫連接成功的回調
 * @param {*} error  數據庫連接失敗的回調
 */
module.exports = function (success,error){
    //判斷 error 為其設置默認值
    if(typeof error !== 'function'){
        error = ()=>{
            console.log('連接失敗');
        }
    }

    //1、安裝 mongoose
    //2、導入 mongoose
    const mongoose = require('mongoose');

    const dotenv = require('dotenv');
    dotenv.config();

    //導入 配置文件
    const {DBHOST,DBPORT,DBNAME} = require('../config/config.js');
    
    const DB_URL = process.env.atlas_URL;

    //設置 strictQuery 為 true (可設可不設)
    //strictQuery選項設為true來強制執行嚴格的查詢檢查
    mongoose.set('strictQuery',true);

    //3、連接 mongodb 服務                           數據庫名稱
    //mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    //4、設置回調
    //設置連接回調官方建議用 once 而不是 on，因為once事件回調只執行一次
    //設置連接成功的回調  once一次  事件回調函數只執行一次
    mongoose.connection.once('open',()=>{
        success();
    });

    //設置連接錯誤的回調
    mongoose.connection.once('error',()=>{
        error();
    });

    //設置連接關閉的回調
    mongoose.connection.once('close',()=>{
        console.log('連接關閉');
    });

}