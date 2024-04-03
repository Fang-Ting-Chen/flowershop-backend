Demo
===
網站入口: https://fang-ting-chen.github.io/flowershop-frontend/  
前端專案: https://github.com/Fang-Ting-Chen/flowershop-frontend  

專案說明
===

雲端託管
---
* MongoDB Atlas
  MongoDB雲端資料庫服務，儲存用戶、購物車、訂單等資料
* Render
  部署API Server

主要技術
---
* Node.js
* express  
  Node.js的web應用程式開發框架，可以快速建立web應用程式，並且提供Router、Middleware、RESTful API
* express-session  
  Express框架的中間件，用於建立和管理用戶 Session(會話管理)
* Mongoose  
  Node.js 套件，是一個在 Node.js 環境中操作 MongoDB 數據庫的工具
* cors  
  透過 cors 允許網站跨域請求，並設置 credentials 允許攜帶認證資訊(Cookie)
* RESTful API
* md5  
  用於用戶密碼加密

API
--
| base route | routes | HTTP method | feature |
| :--: | :--: | :--: | :--: |
| /api | /register | post | 註冊 |
| /api | /login | post | 登入 |
| /api | /logout | post | 登出 |
| /api | /products | get | 獲取商品數據 |
| /api | /products/:id | patch | 更改商品庫存 |
| /api | /cart | get | 獲取購物車數據 |
| /api | /cart/add | post | 增添數據到購物車 |
| /api | /cart/:id | patch | 更改購物車數據 |
| /api | /cart/:id | delete | 刪除購物車數據 |
| /api | /orderinfo | post | 增加訂單信息 |  

聲明
===
本作品的圖片及內容皆為個人學習使用，無任何商業用途。

