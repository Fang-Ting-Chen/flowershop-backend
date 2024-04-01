const ProductsModelPromise = require('../models/ProductsModel');


//獲取商品數據
exports.getproducts = async(req, res) =>{
  try{
    const ProductsModel = await ProductsModelPromise;
    const existingProducts = await ProductsModel.find();
    
     /*//用作刪除商品數據
    if (existingProducts.length >1) {
        // 根据具体需求确认后再执行删除操作
        await ProductsModel.deleteMany({});
        return res.status(200).send('已删除所有产品');
    }*/
    
    
    if (existingProducts.length === 0) {
        const products = await ProductsModel.create([
            { name: "花束7", kind: "fresh flower bouquet", price: 250, stock: 0, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/rose-bouquet1.jpg',code: 1   },
            { name: "花束8", kind: "fresh flower bouquet", price: 150, stock: 100, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/sunflower-bouquet1.jpg',code: 2  },
            { name: "乾燥花束1", kind:"dried flower bouquet", price: 450, stock: 200, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/dried-flower-bouquet1.jpg',code: 3  },
            { name: "乾燥花束2", kind: "dried flower bouquet", price: 350, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/dried-flower-bouquet2.jpg',code: 4 },
            { name: '花束1', kind: "fresh flower bouquet", price: 150, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/flower-bouquet1.jpg',code: 5 },
            { name: '花束2', kind: "fresh flower bouquet", price: 100, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/flower-bouquet2.jpg',code: 6 },
            { name: '花束3', kind: "fresh flower bouquet", price: 350, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/flower-bouquet3.jpg',code: 7 },
            { name: '花束4', kind: "fresh flower bouquet", price: 300, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/flower-bouquet4.jpg',code: 8 },
            { name: '花束5', kind: "fresh flower bouquet", price: 320, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/flower-bouquet5.jpg',code: 9 },
            { name: '花束6', kind: "fresh flower bouquet", price: 250, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/flower-bouquet6.jpg',code: 10 },
            { name: "乾燥花束3", kind: "dried flower bouquet", price: 150, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/dried-flower-bouquet3.jpg',code: 11 },
            { name: "乾燥花束4", kind: "dried flower bouquet", price: 550, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/dried-flower-bouquet4.jpg',code: 12 },
            { name: "乾燥花束5", kind: "dried flower bouquet", price: 650, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/dried-flower-bouquet5.jpg',code: 13 },
            { name: "乾燥花束6", kind: "dried flower bouquet", price: 150, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/dried-flower-bouquet6.jpg',code: 14 },
            { name: "乾燥花束7", kind: "dried flower bouquet", price: 400, stock: 300, url: 'https://fang-ting-chen.github.io/flowershop-fronted/src/assets/images/dried-flower-bouquet7.jpg',code: 15 },
          ]);
            res.status(200).json(products);
    }else{
        res.status(200).json(existingProducts);
    }
    
  }catch (error) {
      console.error(error);
      res.status(500).send('發生錯誤');
  }
}

//更改商品庫存
exports.changestock = async(req, res) =>{
    try{
        const ProductsModel = await ProductsModelPromise;

        const productId = req.params.id;
        const { stock } = req.body;

        if (typeof stock !== 'number' || stock < 0) {
            return res.sendStatus(400);
        }

        const updatedProduct = await ProductsModel.findByIdAndUpdate(
            productId,
            { stock: stock },
            { new: true } //設置為true可以在數據更新後獲取最新的文檔信息，不設置的話，則默認返回更新前的文檔
        );

        res.status(200).json(updatedProduct); // 返回更新后的产品数据
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}
