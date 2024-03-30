var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');

//導入express的第三方cors中間件 >> 解決跨域問題
const cors = require('cors');
const apiRouter = require('./routes/api');
//導入 express-session
const session = require('express-session');
const MongoStore = require('connect-mongo');
//導入配置項
const {DBHOST,DBPORT,DBNAME}=require('./config/config');

const DB_URL = process.env.atlas_URL;

dotenv.config()

var app = express();

//設置 session 中間件
app.use(session({
  name: 'sid', //設置 cookie的name,默認值是: connect.sid
  secret: 'secretsecret', //參與加密的字符串(又稱簽名) 加鹽
  saveUninitialized: false, //是否為每次請求都設置一個cookie用來存儲session的id
  resave: true, //是否在每次請求時重新保存 session 
  store: MongoStore.create({
    mongoUrl: DB_URL //數據庫連接配置
  }),
  cookie: {

    httpOnly: true, //開啟後 前端無法通過 js操作
    maxAge: 1000 * 60 * 60 * 24 * 7 //控制sessionID的過期時間
  },
}))


/*
一般來說，應該將 CORS 配置放在所有 app.use() 之前，
這樣可以確保在任何路由處理之前就能夠應用 CORS 設置。
這樣可以防止跨域請求的問題。
*/ 

//設置方法一: 使用自訂義的 cors 中間件
/*
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin','localhost:3000');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Metjod-Override, Content-Type, Accept'  
  );
  next();
})
*/
//設置方法二: 使用 cors 函數
// 請確保這個 cors 函數在其他路由之前使用，並在 session 中間件之後
app.use(
  cors({
    origin: 'https://fang-ting-chen.github.io',
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: ['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept'],
    credentials: true,

  })
);


// view engine setup 設置模板引擎 ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());  //設置解析 JSON 格式請求體的全局中間件
app.use(express.urlencoded({ extended: false }));  //設置解析 querystring 格式請求體的全局中間件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//路由規則設置
app.use('/api', apiRouter); //設置路由規則:設置路由前綴

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
