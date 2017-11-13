var httpProxy = require('../routes/http-proxy');
var filter = function(req,res,next){
  //检查用户登录情况
  var urlArr = req.originalUrl.split('/');
  if(req.session.user==undefined){
    res.send({"code":401,"data":"权限不足，用户未登录"})
    res.end();
  }else{
    var url = req.originalUrl;
    serviceUrl =req.originalUrl.substring(4,url.length);
    req.body.havePower = req.session.user.havePower;
    httpProxy(serviceUrl,req.body,function(data){
      console.log(req.body)
      res.send(data);
      res.end();
    },function(data){
      res.send(data);
      res.end();
    });
  }
}
module.exports = filter;
