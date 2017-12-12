var app=angular.module("app");app.controller("AppController",function($rootScope,$scope,$state,$ionicViewSwitcher,$location){$rootScope.routerInclude=function(url){return $scope.currState=$state,-1!=$scope.currState.current.name.indexOf(url)?!0:!1},$scope.changePage=function(route){$location.path(route).replace()}}),app.controller("LoginController",function($rootScope,$scope,$state,$stateParams,$ionicViewSwitcher,$myHttpService){$stateParams.url&&($scope.showTip=!0,$scope.tips="请先验证您的手机号"),$scope.user={},$scope.first=!0,$scope.sendButtonText="重新获取",$scope.sendStatus=!0,$scope.sendCode=function(){$myHttpService.post("api/user/queryUserByPhone",{phone:$scope.user.mobile},function(data){console.log(data)})}}).controller("SelectLocationController",function($rootScope,$scope,$state,$myLocationService,$ionicScrollDelegate){var param=$state.params.params,map=null,status=$state.params.status;$scope.address=$rootScope[param],$scope.poilist=[],$scope.address?$myLocationService.getPoisByKeyword($scope.address.name,function(data){for(var tempArray=[],i=0,len=data.length;len>i;i++)void 0!=data[i].location&&""!=data[i].location&&tempArray.push(data[i]);$ionicScrollDelegate.scrollTo(0,0,!0),$scope.poilist=tempArray,$scope.poilist.length>0&&($scope.poilist[0].active=!0),$scope.$apply()}):$myLocationService.getCurrentPosition(function(data){data.length>0&&(map.setCenter(data[0].location),$scope.poilist=data,$scope.poilist.length>0&&($scope.poilist[0].active=!0,$scope.address={name:$scope.poilist[0].name,lngLat:$scope.poilist[0].location.getLng()+","+$scope.poilist[0].location.getLat()}),$scope.$apply(),1==status&&($rootScope[param]=$scope.address))});var map=new AMap.Map("J_map_canvas",{zoom:17,animateEnable:!1,center:void 0==$scope.address?[0,0]:$scope.address.lngLat.split(",")});AMap.plugin(["AMap.ToolBar"],function(){map.addControl(new AMap.ToolBar)}),AMap.event.addListener(map,"dragend",function(){$myLocationService.getPoisByLngLat(map.getCenter(),function(data){$scope.poilist=data,$scope.poilist.length>0&&($scope.poilist[0].active=!0,$scope.address={name:$scope.poilist[0].name,lngLat:$scope.poilist[0].location.getLng()+","+$scope.poilist[0].location.getLat()}),$ionicScrollDelegate.scrollTo(0,0,!0),$scope.$apply()})}),$scope.cancel=function(){window.history.back(-1)},$scope.active=function(item,index){for(var i=0,len=$scope.poilist.length;len>i;i++)index==i?($scope.poilist[i].active=!0,$scope.address={name:item.name,lngLat:item.location.getLng()+","+item.location.getLat()}):$scope.poilist[i].active=!1;map.setCenter(item.location)},$scope.save=function(){$rootScope[param]=$scope.address,window.history.back(-1)},$scope.openSelectAddress=function(){$state.go("select_address",{params:param})}}).controller("SelectAddressController",function($rootScope,$scope,$state,$myLocationService,$ionicScrollDelegate){var param=$state.params.params;$scope.keyword={text:""},$scope.poilist=[],$scope.search=function(){$myLocationService.getPoisByKeyword($scope.keyword.text,function(data){for(var tempArray=[],i=0,len=data.length;len>i;i++)void 0!=data[i].location&&""!=data[i].location&&tempArray.push(data[i]);$ionicScrollDelegate.scrollTo(0,0,!0),$scope.poilist=tempArray,$scope.$apply()})},$scope.cancel=function(){window.history.back(-1)},$scope.active=function(item){$rootScope[param]={name:item.name,address:item.address,lngLat:item.location.getLng()+","+item.location.getLat()},window.setTimeout(function(){window.history.back(-1)},0)}}).controller("CreateRouteController",function($rootScope,$scope,$state,$myLocationService,$location,$myHttpService){if($scope.schedule={onDutyTitle:"上班时间",onDutyTime:new Date(2001,0,1,9,0,0),offDutyTitle:"下班时间",offDutyTime:new Date(2001,0,1,18,0,0)},$rootScope.departAddressCreate){var data=$rootScope.departAddressCreate;$scope.schedule.depart=data.name,$scope.schedule.departLngLat=data.lngLat}else $myLocationService.getCurrentPosition(function(data){if(data.length>0){var data=data[0];$rootScope.departAddressCreate={name:data.name,lngLat:data.location.lng+","+data.location.lat},$scope.schedule.depart=data.name,$scope.schedule.departLngLat=data.location.lng+","+data.location.lat,$scope.$apply()}else $scope.schedule.depart="无法获取你的位置",$scope.schedule.departLngLat="0,0",$scope.$apply()});if($rootScope.arriveAddressCreate){var data=$rootScope.arriveAddressCreate;$scope.schedule.arrive=data.name,$scope.schedule.arriveLngLat=data.lngLat,console.log($scope.schedule.arrive)}$scope.selectLocation=function(params,status){$state.go("select_location",{params:params,status:status})},$scope.save=function(){var data={phone:$rootScope.session.user.userInfo.phone,getonaddr:$scope.schedule.depart,getonlgt:$scope.schedule.departLngLat.split(",")[0],getonlat:$scope.schedule.departLngLat.split(",")[1],getoffaddr:$scope.schedule.arrive,getofflgt:$scope.schedule.arriveLngLat.split(",")[0],getofflat:$scope.schedule.arriveLngLat.split(",")[1],startworktime:$scope.schedule.onDutyTime.getTime(),endworktime:$scope.schedule.offDutyTime.getTime()};$myHttpService.post("api/applyBusline/applyBusline",data,function(){$location.path("/create_route_success").replace()})},$scope.exchangePosition=function(){var tempArrive=$scope.schedule.depart,tempArriveLngLat=$scope.schedule.departLngLat;$scope.schedule.depart=$scope.schedule.arrive,$scope.schedule.departLngLat=$scope.schedule.arriveLngLat,$scope.schedule.arrive=tempArrive,$scope.schedule.arriveLngLat=tempArriveLngLat,$rootScope.departAddressCreate={name:$scope.schedule.depart,lngLat:$scope.schedule.departLngLat},$rootScope.arriveAddressCreate={name:$scope.schedule.arrive,lngLat:$scope.schedule.arriveLngLat}}}).controller("ScheduleWillOpenController",function($rootScope,$scope,$state,$myHttpService,$ionicScrollDelegate){$scope.scheduleList=[],$scope.offset=0,$scope.pagesize=20,$scope.totalnum=0,$scope.showMoreBtn=!1,$scope.getData=function(){$myHttpService.post("api/busline/queryCycleBuslines",{runstatus:0,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.totalnum=data.totalnum,$scope.showMoreBtn=$scope.totalnum-($scope.offset+$scope.pagesize)>0?!0:!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})},$scope.getData(),$scope.refresh=function(){$scope.offset=0,$myHttpService.postNoLoad("api/busline/queryCycleBuslines",{runstatus:0,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.totalnum=data.totalnum,$scope.showMoreBtn=$scope.totalnum-($scope.offset+$scope.pagesize)>0?!0:!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0),layer.msg("刷新成功")})},$scope.goToScheduleDetail=function(item){$state.go("schedule.detail",{bsid:item.bsid,mode:1})},$scope.getMoreData=function(){$scope.offset=$scope.offset+$scope.pagesize,$myHttpService.post("api/busline/queryCycleBuslines",{runstatus:0,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.totalnum=data.totalnum,$scope.showMoreBtn=$scope.totalnum-($scope.offset+$scope.pagesize)>0?!0:!1,$scope.scheduleList=$scope.scheduleList.concat(data.cycleBuslineSchedules),window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})}}).controller("ScheduleOpenedController",function($rootScope,$scope,$state,$myHttpService,$ionicScrollDelegate){$scope.scheduleList=[],$scope.offset=0,$scope.pagesize=20,$scope.totalnum=0,$scope.showMoreBtn=!1,$scope.getData=function(){$myHttpService.post("api/busline/queryCycleBuslines",{offset:$scope.offset,pagesize:$scope.pagesize,company:"2017092210022499480058"},function(data){console.log("关于已开通路线:"+JSON.stringify(data)),$scope.totalnum=data.totalnum,$scope.showMoreBtn=$scope.totalnum-($scope.offset+$scope.pagesize)>0?!0:!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})},$scope.getData(),$scope.refresh=function(){$scope.offset=0,$myHttpService.postNoLoad("api/busline/queryCycleBuslines",{offset:$scope.offset,pagesize:$scope.pagesize,company:"2017092210022499480058"},function(data){$scope.totalnum=data.totalnum,$scope.showMoreBtn=$scope.totalnum-($scope.offset+$scope.pagesize)>0?!0:!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0),layer.msg("刷新成功")})},$scope.goToScheduleDetail=function(item){var stopStationobj={bsid:item.bsid};$state.go("schedule.detail",{stopStationobj:JSON.stringify(stopStationobj)})},$scope.getMoreData=function(){$scope.offset=$scope.offset+$scope.pagesize,$myHttpService.post("api/busline/queryCycleBuslines",{runstatus:1,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.totalnum=data.totalnum,$scope.showMoreBtn=$scope.totalnum-($scope.offset+$scope.pagesize)>0?!0:!1,$scope.scheduleList=$scope.scheduleList.concat(data.cycleBuslineSchedules),window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})}}).controller("SignUpSuccessController",function($scope,$location,$state,$ionicLoading,$myHttpService){var wxConfig={};$scope.tipStatus=!1,$myHttpService.post("api/utils/getWechatJsSign",{currenturl:window.location.href.split("#")[0]},function(data){wxConfig={debug:!1,appId:data.appId,timestamp:data.timestamp,nonceStr:data.nonceStr,signature:data.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]},wx.config(wxConfig),wx.ready(function(){})}),$scope.share=function(){$scope.tipStatus=!0}}).controller("TicketMonthController",function($rootScope,$scope,$myHttpService){$scope.scheduleList=[],$scope.requestStatus=!1,$myHttpService.post("api/ticket/queryTicketsList",{userid:$rootScope.session.user.userInfo.userid},function(data){$scope.requestStatus=!0,$scope.scheduleList=data.tickets})}).controller("IUserController",function($rootScope,$scope,$location,$state,$myHttpService){$scope.user={},$scope.tempUser={},$myHttpService.post("api/user/queryUserinfo",{userid:$rootScope.session.user.userInfo.userid},function(data){$scope.user=data.user}),$scope.editMode=!1,$scope.editButtonText="编辑",$scope.edit=function(){0==$scope.editMode?($scope.tempUser=$scope.user,$scope.editMode=!$scope.editMode,$scope.editButtonText="保存"):($scope.editMode=!$scope.editMode,$scope.editButtonText="编辑",$myHttpService.post("api/user/modifyUserInfo",$scope.tempUser,function(){$scope.user=$scope.tempUser,layer.msg("修改成功")}))}}).controller("TicketStoreController",function($rootScope,$scope,$interval,$myHttpService){$scope.cardInfo={barcode:0x1b69b4ba630f350,refreshTime:15,refreshStatus:!0},$myHttpService.post("api/user/queryUserBarcode",{userid:$rootScope.session.user.userInfo.userid},function(data){$scope.cardInfo.balance=data.user.balance,$scope.cardInfo.barcode=data.user.barcode,$scope.cardInfo.refreshStatus=!1}),$interval(function(){$scope.cardInfo.refreshTime--,0==$scope.cardInfo.refreshTime&&0==$scope.cardInfo.refreshStatus&&($scope.cardInfo.refreshStatus=!0,$myHttpService.postNoLoad("api/user/queryUserBarcode",{userid:$rootScope.session.user.userInfo.userid},function(data){$scope.cardInfo.balance=data.user.balance,$scope.cardInfo.barcode=data.user.barcode,$scope.cardInfo.refreshStatus=!1,$scope.cardInfo.refreshTime=15}))},1e3)}).controller("TicketDetailController",function($rootScope,$scope,$interval,$myHttpService,$stateParams){$scope.ticket={},$scope.barcode=0,$scope.requestStatus=!1,$scope.cardInfo={refreshTime:9e3,refreshStatus:!0},$myHttpService.post("api/ticket/queryTicketInfo",{ticketid:$stateParams.ticketid},function(data){$scope.requestStatus=!0,$scope.ticket=data.ticket,$scope.barcode=data.barcode,$scope.cardInfo.refreshStatus=!1,$scope.ticket.startDate=new Date(data.ticket.startdate),$scope.ticket.endDate=new Date(data.ticket.enddate),$scope.tickettype=data.tickettype}),$interval(function(){$stateParams.ticketid&&($scope.cardInfo.refreshTime--,0==$scope.cardInfo.refreshTime&&0==$scope.cardInfo.refreshStatus&&($scope.cardInfo.refreshStatus=!0,$myHttpService.postNoLoad("api/ticket/queryTicketInfo",{ticketid:$stateParams.ticketid},function(data){$scope.ticket=data.ticket,$scope.barcode=data.barcode,$scope.ticket.startDate=new Date(data.ticket.startdate),$scope.ticket.endDate=new Date(data.ticket.enddate),$scope.cardInfo.refreshStatus=!1,$scope.cardInfo.refreshTime=9e3})))},1e3)}).controller("PayOrderListController",function($rootScope,$scope,$myHttpService,$ionicScrollDelegate){$scope.offset=0,$scope.pagesize=5,$scope.showMoreBtn=!1,$scope.orderList=[],$myHttpService.post("api/recharge/queryRechargeOrders",{userid:$rootScope.session.user.userInfo.userid,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.showMoreBtn=data.rechargeOrders.length-$scope.pagesize==0?!0:!1,$scope.orderList=data.rechargeOrders}),$scope.getMoreData=function(){$scope.offset=$scope.offset+$scope.pagesize,$myHttpService.post("api/recharge/queryRechargeOrders",{userid:$rootScope.session.user.userInfo.userid,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.showMoreBtn=data.rechargeOrders.length-$scope.pagesize==0?!0:!1,$scope.orderList=$scope.orderList.concat(data.rechargeOrders),$ionicScrollDelegate.resize()})},$scope.refresh=function(){$scope.offset=0,$myHttpService.postNoLoad("api/recharge/queryRechargeOrders",{userid:$rootScope.session.user.userInfo.userid,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.showMoreBtn=data.rechargeOrders.length-$scope.pagesize==0?!0:!1,$scope.$broadcast("scroll.refreshComplete"),$scope.orderList=data.rechargeOrders,layer.msg("刷新成功")})}}).controller("TicketRechargeController",function($rootScope,$scope,$myHttpService,$location){$scope.user={rechargeNum:""},$scope.recharge=function(){$myHttpService.post("api/recharge/rebillUserBalance",{userid:$rootScope.session.user.userInfo.userid,openid:$rootScope.session.user.userInfo.openid,chargefee:$scope.user.rechargeNum},function(data){function onBridgeReady(){WeixinJSBridge.invoke("getBrandWCPayRequest",data,function(res){"get_brand_wcpay_request:ok"==res.err_msg?$myHttpService.post("api/recharge/verifyWxorderStatus",{rechargeid:data.rechargeid},function(){alert("您本次成功充值了"+$scope.user.rechargeNum+"元"),$location.url("/ticket/store").replace()},function(){alert("支付失败，请联系客服处理。")}):alert("get_brand_wcpay_request:cancel"==res.err_msg?"你取消了本次支付":"支付失败，请联系客服处理。")})}"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",onBridgeReady,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",onBridgeReady)):onBridgeReady()})}}).controller("ScheduleTicketPaySuccess",function($rootScope,$scope,$location,$state,$stateParams){$scope.orderInfoList=JSON.parse($stateParams.orderList),$scope.showTicket=function(){$location.url("/ticket/month").replace()}}).controller("TicketRecharge2Controller",function($rootScope,$scope,$state,$stateParams,$myHttpService,$location){$scope.rechargeCouponList=[],$scope.agreeStatus=!0,$scope.agreeStatusChange=function(){$scope.agreeStatus=!$scope.agreeStatus},$scope.orderInfo={rcid:"",payType:0,payMoney:0,couponMoney:0};var oldIndex=0;$myHttpService.post("api/rechargeCoupon/queryRechargeCouponList",{offset:0,pagesize:10},function(data){$scope.rechargeCouponList=data.rechargeCoupons,data.rechargeCoupons.length>0&&($scope.orderInfo={rcid:data.rechargeCoupons[0].rcid,payMoney:data.rechargeCoupons[0].paymoney,couponMoney:data.rechargeCoupons[0].couponMoney,rechargeMoney:data.rechargeCoupons[0].rechargeMoney,hasCoupon:data.rechargeCoupons[0].hascoupon,isActive:data.rechargeCoupons[0].isactive,payType:0},$scope.rechargeCouponList[0].active=!0)}),$scope.changeCoupon=function(item,index){$scope.rechargeCouponList[oldIndex].active=!1,item.active=!0,oldIndex=index,$scope.orderInfo={rcid:item.rcid,payMoney:item.paymoney,couponMoney:item.couponMoney,rechargeMoney:item.rechargeMoney,hasCoupon:item.hascoupon,isActive:item.isactive,payType:0}},$scope.recharge=function(){$myHttpService.post("api/recharge/rebillUserBalanceCoupon",{userid:$rootScope.session.user.userInfo.userid,openid:$rootScope.session.user.openId,rcid:$scope.orderInfo.rcid},function(data){function onBridgeReady(){WeixinJSBridge.invoke("getBrandWCPayRequest",data,function(res){"get_brand_wcpay_request:ok"==res.err_msg?$myHttpService.post("api/recharge/verifyWxorderStatus",{rechargeid:data.rechargeid},function(){alert("您本次成功充值了"+$scope.orderInfo.rechargeMoney+"元"),$location.url("/ticket/store").replace()},function(){alert("支付失败，请联系客服处理。")}):alert("get_brand_wcpay_request:cancel"==res.err_msg?"你取消了本次支付":"支付失败，请联系客服处理。")})}"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",onBridgeReady,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",onBridgeReady)):onBridgeReady()})}}).controller("BusPositionController",["$scope",function(){var lineArr=[],map=new AMap.Map("J_map_canvas",{resizeEnable:!0,center:[116.397428,39.90923],zoom:17});marker=new AMap.Marker({map:map,position:[116.397428,39.90923],icon:"http://webapi.amap.com/images/car.png",offset:new AMap.Pixel(-26,-13),autoRotation:!0});var lngX=116.397428,latY=39.90923;lineArr.push([lngX,latY]);for(var i=1;4>i;i++)lngX+=.05*Math.random(),latY+=i%2?1e-4*Math.random():.06*Math.random(),lineArr.push([lngX,latY]);new AMap.Polyline({map:map,path:lineArr,strokeOpacity:0});marker.moveAlong(lineArr,500),marker.pauseMove(),marker.resumeMove()}]);