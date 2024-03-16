// router.js
const UserModelPromise = require('../models/UserModel');
const md5 = require('md5'); //用作加密


//用戶註冊
exports.register =  async(req, res) =>{
    try {
        const UserModel = await UserModelPromise;

        const userdata = {
            ...req.body,
            password: md5(req.body.password) // 使用 md5 加密密码
        };

        const existingUser = await UserModel.findOne(userdata);

        if (!existingUser) {
            //如用戶不存在，則增加新用戶帳密
            await UserModel.create(userdata);
            res.sendStatus(200); // Success
        } else {
            //如用戶存在，則返回錯誤
            res.status(409).send('帳號或密碼已被註冊過'); 
        }

        /*如果不需要向客户端发送任何信息，
        可以簡單地使用 res.end() 或 res.sendStatus() 来結束請求，
        這樣，客户端將收到一个空響應，而不包含任何額外的信息
        */
        
    } catch (error) {
        console.error(error);
        res.status(500).send('註冊失敗，請稍後再試');
    }
}



/* 以下使用 Session */
//用戶登入  
exports.login = async(req, res) =>{
    try {

        const UserModel = await UserModelPromise;
        // 获取用户名和密码
        const { username, password } = req.body;

        // 查询数据库
        const data = await UserModel.findOne({
            username: username,
            password: md5(password)
        });

        // 判断 data
        if (!data) {
            return res.status(401).send('帐号或密码错误');
        }
        //寫入SESSION
        req.session.username = data.username;
        req.session._id = data._id;

        // 登录成功响应
        res.status(200).send('登录成功');
    } catch (error) {
        console.error(error);
        res.status(500).send('登录失败，请稍后再试');
    }
}

//用戶登出
exports.logout = async(req, res) =>{
    req.session.destroy(); //清除伺服器上的會話資料
    res.status(200).send('登出成功');
}