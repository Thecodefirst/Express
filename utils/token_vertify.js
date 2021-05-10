var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

exports.setToken = function(db){
	return new Promise((resolve,reject)=>{
		const token = jwt.sign(db,signkey,{ 
			expiresIn: 60*60*2, //时效7200s = dd token
			algorithm: 'HS256'
		});
		resolve(token);
	})
}

exports.verToken = function(token){
	return new Promise((resolve,reject)=>{
		var info = jwt.verify(token.split(' ')[1],signkey);
		resolve(info);
	})
}