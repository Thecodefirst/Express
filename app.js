var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression')
var log4js = require('log4js');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var db = require('./config/db_system').mysql;

var timeout = require('connect-timeout');
var logger = log4js.getLogger();
var msg = require('./utils/msg');
var login = require('./routes/login');
var report = require('./routes/report');
var index = require('./routes/index');
var personalManagement = require('./routes/personalManagement');
var companyManagement = require('./routes/companyManagement');
var departmentManagement = require('./routes/departmentManagement');
var jobsManagement = require('./routes/jobsManagement');
var attendanceManagement = require('./routes/attendanceManagement');
var app = express();
var filterMapRequest = require('./utils/filterMap').filterListRequest;
var xss = require('xss');
//token
var vertoken = require('./utils/token_vertify.js');
var expressJwt = require('express-jwt');
var secretKey = 'mes_qdhd_mobile_xhykjyxgs';

log4js.configure('./config/log4js.json');

// view engine setup
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

// session
db.schema = {
    tableName: 'user_session',
    columnNames: {
        session_id: 'id',
        expires: 'expires',
        data: 'data'
    }
};
var sessionStore = new MySQLStore(db);
// session
app.use(session({
    secret: 'Dsp_web',         // 用来对session id相关的cookie进行签名
    saveUninitialized: false,  // 是否自动保存未初始化的会话
    resave: true,             // 是否每次都重新保存会话
    cookie: {
        maxAge: 172800000      // 有效期，单位是毫秒
    },
    store: sessionStore
}));

// gzip
app.use(compression())

// timeout
app.use(timeout('60s'));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
  algorithms:['HS256'],
  requestProperty: 'Access_Token',
	secret: secretKey,
  credentialsRequired: false
}).unless({
	path: ['/login/systemLogin']//除了这个地址，其他的URL都需要验证
}));
//身份过期拦截器
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { 
    res.send(msg.successMsg(50008, '', '身份验证已过期，请重新登入'))
  }
})
//解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['Authorization'];
	if(token == undefined){
		return next();
	}else{
		vertoken.verToken(token).then((data)=> {
			req.data = data;
			return next();
		}).catch((error)=>{
			return next();
		})
	}
});

//设置跨域请求头
app.all("*",function(req,res,next){
    //处理cookie信息，如果有，并且不对每次请求都新开一个session
    res.header("Access-Control-Allow-Credentials", "true");
    //设置允许跨域的域名，*代表允许任意域名跨域

    //允许的header类型
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS, HEAD");
    if (req.method.toLowerCase() == 'OPTIONS'){
        res.send(200);  //让options尝试请求快速结束
    }else{
        next();
    }
});
//设置跨域请求头
app.use(log4js.connectLogger(log4js.getLogger('HTTP'), { level: 'auto', format: ':method :url :status :response-time ms' }));
app.use(bodyParser.json({limit: '20mb'}));
app.use(cookieParser());
//XSS预防
app.post("*",function(req,res,next){
  let originalUrl = req.originalUrl;
  let reqBody = req.body;
  if(filterMapRequest.includes(originalUrl)) {
    for ( let [key,val] of Object.entries(reqBody)){
      req.body[key] = xss(val)
    }
    next();
  }else{
    console.log('no filter')
    next();
  }
});
app.use('/public/',express.static('./public/'))
app.use('/index', index);
app.use('/login', login);
app.use('/report', report);
app.use('/personalManagement', personalManagement);
app.use('/companyManagement', companyManagement);
app.use('/departmentManagement', departmentManagement);
app.use('/jobsManagement', jobsManagement);
app.use('/attendanceManagement', attendanceManagement);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	return next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;