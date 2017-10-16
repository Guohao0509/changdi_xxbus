var app=angular.module("app");app.controller("AppController",function($rootScope,$scope,$state,$ionicViewSwitcher,$location){$rootScope.routerInclude=function(url){return $scope.currState=$state,-1!=$scope.currState.current.name.indexOf(url)},$scope.changePage=function(route){$location.path(route).replace()}}),app.controller("LoginController",function($rootScope,$scope,$state,$stateParams,$ionicViewSwitcher,$myHttpService,$location){$stateParams.url&&($scope.showTip=!0,$scope.tips="请先验证您的手机号"),$scope.user={},$scope.first=!0,$scope.sendButtonText="重新获取",$scope.sendStatus=!0,$scope.sendCode=function(){$myHttpService.post("api/user/queryUserByPhone",{phone:$scope.user.mobile},function(data){data.user.userid&&nextLogin()}),nextLogin=function(haveUser){var checkcode=$scope.user.mobile%$scope.user.mobile.toString().substr(1,3);console.log($scope.user.mobile),$myHttpService.post("api/utils/sendAuthcode",{phone:$scope.user.mobile,servicename:"WechatUserLogin",checkcode:checkcode},function(data){layer.msg("短信验证码发送成功！"),$scope.first=!1,$scope.sendStatus=!1;var count=60;$scope.sendButtonText=count+"s后获取";var timer=window.setInterval(function(){count>0?(count--,$scope.sendButtonText=count+"s后获取",$scope.$apply()):($scope.sendStatus=!0,$scope.sendButtonText="重新获取",$scope.$apply(),window.clearInterval(timer))},1e3)})}},$scope.next=function(){$myHttpService.post("auth/login",{phone:$scope.user.mobile,authcode:$scope.user.authcode,openid:$rootScope.session.user.openId},function(data){$rootScope.session.user.userInfo=data.user,$stateParams.url?(console.log($stateParams.url),$location.url($stateParams.url).replace()):$location.url("/app/buy").replace()})}}),app.controller("IUserController",function($rootScope,$scope,$location,$state,$myHttpService){$scope.user={},$scope.tempUser={},console.log($rootScope.session.user.userInfo.userid),$myHttpService.post("api/user/queryUserinfo",{userid:$rootScope.session.user.userInfo.userid},function(data){$scope.user=data.user,console.log(data)}),$scope.editMode=!1,$scope.editButtonText="编辑",$scope.edit=function(){0==$scope.editMode?($scope.tempUser=$scope.user,$scope.editMode=!$scope.editMode,$scope.editButtonText="保存"):($scope.editMode=!$scope.editMode,$scope.editButtonText="编辑",$myHttpService.post("api/user/modifyUserInfo",$scope.tempUser,function(data){$scope.user=$scope.tempUser,layer.msg("修改成功")}))}}),app.controller("ScheduleDetailController",function($ionicPopup,$window,$rootScope,$scope,$stateParams,$location,$state,$ionicLoading,$myHttpService,$interval){$scope.mode=$stateParams.mode;var map=null,drving=null;$scope.goSchedule={},$scope.goLine={},$scope.backLine={},$scope.stopStationobj=JSON.parse($stateParams.stopStationobj),$scope.init=function(){for(var addprice=0,p=parseInt($scope.stopStationobj.startIndex)+1;p<=$scope.stopStationobj.endIndex;p++)addprice+=$scope.stopStationobj.stopstation[p].price;$scope.addprice=addprice;for(var addtime=0,m=parseInt($scope.stopStationobj.startIndex)+1;m<=$scope.stopStationobj.endIndex;m++)addtime+=$scope.stopStationobj.stopstation[m].driverTime;$scope.addtime=addtime},$scope.init(),$scope.expandStatus=!1;var MapOperation={clearMap:function(){map.clearMap()},addMarkers:function(buslines){for(var i=0,len=buslines.length;i<len;i++){var text="<div class='marker station-marker'>"+i+"</div>";0==i?text="<div class='marker start-marker'>起</div>":i==len-1&&(text="<div class='marker stop-marker'>终</div>");new AMap.Marker({map:map,position:new AMap.LngLat(buslines[i].lng,buslines[i].lat),content:text,extData:buslines[i],draggable:!1})}},addPolyline:function(polyline){(polyline=new AMap.Polyline({path:polyline,strokeColor:"#3366FF",strokeOpacity:1,strokeWeight:5,strokeStyle:"solid",strokeDasharray:[10,5]})).setMap(map),map.setFitView()},drivingSearch:function(stations){$ionicLoading.show();var len=stations.length;if(len>1){for(var startPoint=new AMap.LngLat(stations[0].stalongitude,stations[0].stalatitude),endPoint=new AMap.LngLat(stations[len-1].stalongitude,stations[len-1].stalatitude),waypoints=[],i=1;i<len-1;i++)waypoints.push(new AMap.LngLat(stations[i].stalongitude,stations[i].stalatitude));drving.search(startPoint,endPoint,{waypoints:waypoints},function(){$ionicLoading.hide(),map.setFitView()})}else alert("读取线路数据出错")}};$ionicLoading.show(),$myHttpService.post("api/busline/queryCycleBusScheduleInfo",{bsid:$scope.stopStationobj.bsid},function(data){$scope.busSchedule=data.busSchedule,$scope.busStations=data.busStations,console.log($scope.busStations),map=new AMap.Map("J_map_canvas",{zoom:14,animateEnable:!1,jogEnable:!1,center:[114.530266,30.498785]}),AMap.plugin(["AMap.ToolBar"],function(){map.addControl(new AMap.ToolBar({offset:new AMap.Pixel(10,150)}))}),drving=new AMap.Driving({map:map}),MapOperation.drivingSearch($scope.busStations)});$interval(function(){$myHttpService.postNoLoad("api/busline/queryCarLocation",{carid:$scope.busSchedule.carid},function(data){if(console.log(data),marker)marker.setPosition($scope.lnglat.split(","));else var marker=new AMap.Marker({map:map,position:[data.car.currlon,data.car.currlat],content:"<div class='bus-image marker '></div>",draggable:!1})})},1e4),$scope.baoming=function(){if(void 0==$rootScope.session.user.userInfo){var url=encodeURIComponent("/schedule/detail?bsid="+$scope.stopStationobj.bsid+"&mode=1");$location.url("/auth/login?url="+url)}else $myHttpService.post("api/userEnrollBusline/userEnrollBusline",{userid:$rootScope.session.user.userInfo.userid,phone:$rootScope.session.user.userInfo.phone,lineid:$scope.busSchedule.lineid,bsid:$scope.busSchedule.bsid},function(data){$location.url("/signup_success?bsid="+$scope.stopStationobj.bsid)})},$scope.oldIndex=0,$scope.oldIndexs=0,$scope.expand=function(){$scope.expandStatus=!$scope.expandStatus,1==$scope.expandStatus?map.panBy(0,140):map.panBy(0,-140)},$scope.RideactiveStations=function(index){$scope.busStations[$scope.oldIndex].active=!1,$scope.busStations[index].active=!0,$scope.oldIndex=index,map.setZoom(18),map.setCenter([$scope.busStations[index].stalongitude,$scope.busStations[index].stalatitude]),map.panBy(0,140)},$scope.$watch("stopStationobj.startIndex",function(newstartIndex,oldstartIndex){($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex||$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex)&&($scope.stopStationobj.startIndex=oldstartIndex,$scope.init())}),$scope.$watch("stopStationobj.endIndex",function(newstartIndex,oldstartIndex){($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex||$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex)&&($scope.stopStationobj.endIndex=oldstartIndex,$scope.init())}),$scope.selectstartadd=function(){$scope.stopStationobj.stopstation[$scope.stopStationobj.startIndex];$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex?layer.msg("起始位置不能超过终点位置"):$scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex&&layer.msg("选择的地点信息不能相同"),$scope.init()},$scope.selectendadd=function(){$scope.stopStationobj.stopstation[$scope.stopStationobj.endIndex],parseInt($scope.stopStationobj.endIndex);$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex?layer.msg("终点位置不能早于起始位置"):$scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex&&layer.msg("选择的地点信息不能相同"),$scope.init()},$scope.showLocation=function(item){var dest=item.stalongitude+","+item.stalatitude,destName=item.stationname;window.location.href="http://m.amap.com/navi/?start=&dest="+dest+"&destName="+destName+"&naviBy=bus&key=1a5cdec55ebac9dbd85652429f54d4d1"}}),app.controller("ScheduleOpenedController",function($rootScope,$scope,$state,$myHttpService,$ionicScrollDelegate){$scope.scheduleList=[],$scope.offset=0,$scope.pagesize=20,$scope.totalnum=0,$scope.showMoreBtn=!1,$scope.getData=function(){$myHttpService.post("api/busline/queryCycleBuslines",{offset:$scope.offset,pagesize:$scope.pagesize,company:"2017092210022499480058"},function(data){console.log("关于已开通路线:"+JSON.stringify(data)),$scope.totalnum=data.totalnum,$scope.totalnum-($scope.offset+$scope.pagesize)>0?$scope.showMoreBtn=!0:$scope.showMoreBtn=!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})},$scope.getData(),$scope.refresh=function(){$scope.offset=0,$myHttpService.postNoLoad("api/busline/queryCycleBuslines",{offset:$scope.offset,pagesize:$scope.pagesize,company:"2017092210022499480058"},function(data){$scope.totalnum=data.totalnum,$scope.totalnum-($scope.offset+$scope.pagesize)>0?$scope.showMoreBtn=!0:$scope.showMoreBtn=!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0),layer.msg("刷新成功")})},$scope.goToScheduleDetail=function(item){var stopStationobj={bsid:item.bsid};$state.go("schedule.detail",{stopStationobj:JSON.stringify(stopStationobj)})},$scope.getMoreData=function(){$scope.offset=$scope.offset+$scope.pagesize,$myHttpService.post("api/busline/queryCycleBuslines",{runstatus:1,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.totalnum=data.totalnum,$scope.totalnum-($scope.offset+$scope.pagesize)>0?$scope.showMoreBtn=!0:$scope.showMoreBtn=!1,$scope.scheduleList=$scope.scheduleList.concat(data.cycleBuslineSchedules),window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})}});