const CartModelPromise = require('../models/CartModel');

//獲取購物車數據
exports.getcart = async(req, res)=>{
    try{
        
        const CartModel = await CartModelPromise;

         /*//用作刪除購物車數據
        const existingCart = await CartModel.find();
        if (existingCart.length >0) {
            await CartModel.deleteMany({});
            return res.status(200).send('已删除所有产品');
        }*/

        const cartData = await CartModel.find(); // 從資料庫中查詢購物車數據
        res.status(200).json(cartData); // 返回購物車數據給前端
    }catch (error) {
        console.error(error);
        res.status(500).send('發生錯誤');
    }
}

//增添數據到購物車
exports.addtocart = async(req, res)=>{
    try{
        const CartModel = await CartModelPromise;
        const item = req.body;

        await CartModel.create(item);
        res.sendStatus(200);
    }catch (error) {
        console.error(error);
        res.status(500).send('發生錯誤');
    }

}

//更改購物車數據
exports.changecart = async(req, res)=>{
    try{
        const CartModel = await CartModelPromise;

        const productId = req.params.id;
        const { number } = req.body;

        const updatedNumber = await CartModel.findByIdAndUpdate(
            productId,
            { number: number },
            { new: true } //設置為true可以在數據更新後獲取最新的文檔信息，不設置的話，則默認返回更新前的文檔
        );

        res.status(200).json(updatedNumber);

    }catch (error) {
        console.error(error);
        res.status(500).send('發生錯誤');
    }

}

//刪除購物車數據
exports.deletecart = async(req, res)=>{
    try{
        const CartModel = await CartModelPromise;
        const productId = req.params.id;

        const deletecart = await CartModel.deleteOne({ _id: productId });
        
        res.status(200).json(deletecart);
        
    }catch (error) {
        console.error(error);
        res.status(500).send('發生錯誤');
    }

}