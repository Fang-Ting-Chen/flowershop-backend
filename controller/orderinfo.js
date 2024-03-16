const OrderInfoModelPromise = require('../models/OrderInfoModel');

//確認訂單，增加訂單信息
exports.addtoorderinfo = async(req, res) =>{
    try{
        const OrderInfoModel = await OrderInfoModelPromise;

        const orderinfo = req.body;

        await OrderInfoModel.create(orderinfo);

        res.sendStatus(200);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }

}