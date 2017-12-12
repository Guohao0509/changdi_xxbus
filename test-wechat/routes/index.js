var express = require('express');
var router = express.Router();
var httpProxy = require('../routes/http-proxy');
/* 取code */

router.get('/testspa/index', function(req, res, next) {
    req.session.user={
       "userInfo":{
           "userid":"2017042117441387506447",
           "phone":"15072311104",
           "sex":"0",
           "userStatus":1,
           "balance":0.0,
           "openid":"osvsPwyTpOn-mgnMqNBUcfguMeFM",
           "talSpendind":0.0,
           "tripCount":0,
           "type":0
       }
    };
    // if(req.session.user==undefined){
    //     //如果没有用户信息，那么重定向来获取用户信息
    //     var wechatUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ac41e44fe015a2d&redirect_uri=MyUrl&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    //     var url = encodeURIComponent("http://chargebus.forku.cn/spa/getUserInfoByCode?return="+req.query.return);
    //     res.redirect(wechatUrl.replace('MyUrl',url));
    // }
    res.render('index',{
        "user":req.session.user,
        "version":"201611062153"
    });
});
module.exports = router;
