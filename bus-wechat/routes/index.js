var express = require('express');
var router = express.Router();
var httpProxy = require('../routes/http-proxy');
/* 取code */
router.get('/', function(req, res, next) {
    res.redirect('/spa/index?');
});
router.get('/spa', function(req, res, next) {
    res.redirect('/spa/index?');
});
router.get('/spa/index', function(req, res, next) {
    // req.session.user={
    //     "userInfo":{
    //         "userid":"2017092515072014303499",
    //         "phone":"13419565194",
    //         "sex":"0",
    //         "userStatus":1,
    //         "balance":0.0,
    //         "openid":"osvsPw-p_EBAoWph2u37LiAIQvTc",
    //         "talSpendind":0.0,
    //         "tripCount":0,
    //         "type":0,
    //         "company":"2017092210022499480058"
    //     }
    // };
    if(req.session.user==undefined){
        //如果没有用户信息，那么重定向来获取用户信息
        var wechatUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6273f7375e3bb46d&redirect_uri=MyUrl&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
        var url = encodeURIComponent("http://bashi.happyev.com/spa/getUserInfoByCode?return="+req.query.return);
        res.redirect(wechatUrl.replace('MyUrl',url));
    }
    res.render('index',{
        "user":req.session.user,
        "version":"201611062153"
    });
});
router.get('/spa/getUserInfoByCode', function(req, res, next) {
    httpProxy("/user/getUserOpenid",{code:req.query.code},function(data){
        var result = JSON.parse(data).data;
        //将用户信息放到session
        req.session.user= {
            openId: result.openid,
            userInfo:result.user
        }

        //拿到用户信息后重定向到主页，之所以带上return，是为了在服务器session丢失的时候，重新刷新页面可以重定向到当前页
        res.redirect('/spa/index?return='+req.query.return+'#/'+req.query.return);
    },function(data){
        res.send(data);
        res.end();
    });
});
module.exports = router;
