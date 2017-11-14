//此代理不对用户进行权限校验，通常用于不登录的服务接口
var httpProxy = require('../routes/http-proxy');
var filter = function(req,res,next){
  //获取完整目录名
  var url = req.originalUrl;//var url = req._parsedUrl.pathname;  截取完整目录名
  //截取请求网关后的目录名
  var serviceUrl =url.substring("/spa/api".length,url.length);
  // var busUrl = 'api/busline/queryCycleBuslines';
  // if(req.originalUrl.indexOf(busUrl) != -1){
  //   req.body.company = res.session.user.userInfo.company;
  // }
  httpProxy(serviceUrl,req.body,function(data){
    if(data.code == 0&&data.data.flag == false){
      req.session.user = null;
      res.redirect('/spa/index?return='+req.query.return+'#/'+req.query.return);
    }else{
      res.send(data);
      res.end();
    }
  },function(data){
    res.send(data);
    res.end();
  });
}
module.exports = filter;
