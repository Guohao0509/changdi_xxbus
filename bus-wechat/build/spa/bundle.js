!function(){"use strict";angular.module("ion-datetime-picker",["ionic"]).directive("ionDatetimePicker",function(){return{restrict:"AE",require:"ngModel",scope:{modelDate:"=ngModel",title:"=?",subTitle:"=?",buttonOk:"=?",buttonCancel:"=?",monthStep:"=?",hourStep:"=?",minuteStep:"=?",secondStep:"=?",onlyValid:"=?"},controller:["$scope","$ionicPopup","$ionicPickerI18n","$timeout",function(e,t,n,i){function o(e,t){0!==(t=t||0)&&e.setDate(e.getDate()+t),d.year=e.getFullYear(),d.month=e.getMonth(),d.day=e.getDate(),d.hour=e.getHours(),d.minute=e.getMinutes(),d.second=e.getSeconds(),d.date=e}function a(){var t=new Date(e.year,e.month,e.day,e.hour,e.minute,e.second);e.isEnabled(t.getDate(),!0)?o(t):(e.year=d.year,e.month=d.month,e.day=d.day,e.hour=d.hour,e.minute=d.minute,e.second=d.second)}function l(e){var t=new Date(e);return isNaN(t.getTime())&&(t=new Date),t.setHours(0,0,0,0,0),t}e.i18n=n,e.bind={},e.rows=[0,1,2,3,4,5],e.cols=[1,2,3,4,5,6,7],e.weekdays=[0,1,2,3,4,5,6];var d={year:e.year,month:e.month,day:e.day,hour:e.hour,minute:e.minute,second:e.second,date:new Date,getDateWithoutTime:function(){var e=new Date(this.date);return e.setHours(0,0,0,0,0),e}};e.showPopup=function(){t.show({templateUrl:"lib/ion-datetime-picker/src/picker-popup.html",title:e.title||"选择 "+(e.dateEnabled?"日期":"")+(e.dateEnabled&&e.timeEnabled?" 和 ":"")+(e.timeEnabled?"时间":""),subTitle:e.subTitle||"",scope:e,cssClass:"ion-datetime-picker-popup",buttons:[{text:e.buttonOk||e.i18n.ok,type:e.i18n.okClass,onTap:function(){e.commit()}},{text:e.buttonCancel||e.i18n.cancel,type:e.i18n.cancelClass,onTap:function(){i(function(){e.processModel()},200)}}]})},e.prepare=function(){e.mondayFirst&&e.weekdays.push(e.weekdays.shift())},e.processModel=function(){var t=e.modelDate instanceof Date?e.modelDate:new Date;e.year=e.dateEnabled?t.getFullYear():0,e.month=e.dateEnabled?t.getMonth():0,e.day=e.dateEnabled?t.getDate():0,e.hour=e.timeEnabled?t.getHours():0,e.minute=e.timeEnabled?t.getMinutes():0,e.second=e.secondsEnabled?t.getSeconds():0,c()};var c=function(){a();var t=new Date(e.year,e.month,e.day,e.hour,e.minute,e.second);e.dateEnabled&&(e.year=t.getFullYear(),e.month=t.getMonth(),e.day=t.getDate(),e.bind.year=e.year,e.bind.month=e.month,e.firstDay=new Date(e.year,e.month,1).getDay(),e.mondayFirst&&(e.firstDay=(e.firstDay||7)-1),e.daysInMonth=s(e.year,e.month)),e.timeEnabled&&(e.hour=t.getHours(),e.minute=t.getMinutes(),e.second=t.getSeconds(),e.meridiem=e.hour<12?"上午":"下午",e.bind.hour=e.meridiemEnabled?(e.hour%12||12).toString():e.hour.toString(),e.bind.minute=(e.minute<10?"0":"")+e.minute.toString(),e.bind.second=(e.second<10?"0":"")+e.second.toString(),e.bind.meridiem=e.meridiem)},s=function(e,t){return new Date(e,t+1,0).getDate()};e.changeBy=function(t,n){if(+t){if(("hour"===n||"minute"===n)&&-1===t){var i=new Date(e.year,e.month,e.day,e.hour-1,e.minute);0!==e.minute&&"hour"!==n||e.hour!==i.getHours()||e.hour--}e[n]+=+t,"month"!==n&&"year"!==n||(e.day=Math.min(e.day,s(e.year,e.month))),c()}},e.change=function(t){var n=e.bind[t];n&&"meridiem"===t?("AM"===(n=n.toUpperCase())&&"PM"===e.meridiem?e.hour-=12:"PM"===n&&"AM"===e.meridiem&&(e.hour+=12),c()):(+n||0==+n)&&(e[t]=+n,"month"!==t&&"year"!==t||(e.day=Math.min(e.day,s(e.year,e.month))),c())},e.changeDay=function(t){e.day=t,c()},e.isEnabled=function(t,n){if(!e.onlyValid)return!0;var i=new Date(e.year,e.month,t),a=!0;if(e.onlyValid.after){var c=l(e.onlyValid.after);e.onlyValid.inclusive?!(a=i>=c)&&n&&o(c,0):!(a=i>c)&&n&&o(c,1)}else if(e.onlyValid.before){var s=l(e.onlyValid.after);e.onlyValid.inclusive?!(a=s>=i)&&n&&o(s,0):!(a=s>i)&&n&&o(s,-1)}else if(e.onlyValid.between){var r=l(e.onlyValid.between.initial),u=l(e.onlyValid.between.final);e.onlyValid.inclusive?!(a=i>=r&&u>=i)&&n&&(r>i&&o(r,0),i>u&&o(u,0)):!(a=i>r&&u>i)&&n&&(r>=i&&o(r,1),i>=u&&o(u,-1))}else if(e.onlyValid.outside){var r=l(e.onlyValid.outside.initial),u=l(e.onlyValid.outside.final);if(e.onlyValid.inclusive)!(a=r>=i||i>=u)&&n&&(r>=(m=d.getDateWithoutTime())&&o(u,0),m>=u&&o(r,0));else if(!(a=r>i||i>u)&&n){var m=d.getDateWithoutTime();r>m&&o(u,1),m>u&&o(r,-1)}}return a},e.changed=function(){c()},e.dateEnabled&&e.$watch(function(){return(new Date).getDate()},function(){var t=new Date;e.today={day:t.getDate(),month:t.getMonth(),year:t.getFullYear()}})}],link:function(e,t,n,i){e.dateEnabled="date"in n&&"false"!==n.date,e.timeEnabled="time"in n&&"false"!==n.time,!1===e.dateEnabled&&!1===e.timeEnabled&&(e.dateEnabled=e.timeEnabled=!0),e.mondayFirst="mondayFirst"in n&&"false"!==n.mondayFirst,e.secondsEnabled=e.timeEnabled&&"seconds"in n&&"false"!==n.seconds,e.meridiemEnabled=e.timeEnabled&&"amPm"in n&&"false"!==n.amPm,e.monthStep=+e.monthStep||1,e.hourStep=+e.hourStep||1,e.minuteStep=+e.minuteStep||1,e.secondStep=+e.secondStep||1,e.prepare(),i.$render=function(){e.modelDate=i.$viewValue,e.processModel()},e.commit=function(){e.modelDate=new Date(e.year,e.month,e.day,e.hour,e.minute,e.second),i.$setViewValue(e.modelDate)},t.on("click",e.showPopup)}}}),angular.module("ion-datetime-picker").factory("$ionicPickerI18n",["$window",function(e){return{ok:"OK",cancel:"Cancel",okClass:"button-positive",cancelClass:"button-stable",weekdays:e.moment?e.moment.weekdaysMin():["Su","Mo","Tu","We","Th","Fr","Sa"],months:e.moment?e.moment.months():["January","February","March","April","May","June","July","August","September","October","November","December"]}}]),angular.module("ion-datetime-picker").run(["$templateCache",function(e){e.put("lib/ion-datetime-picker/src/picker-popup.html",'<div class="ion-datetime-picker"><div ng-if-start="dateEnabled" class="row month-year"><div class="col col-10 left-arrow"><button type="button" class="button button-small button-positive button-clear icon ion-chevron-left" ng-click="changeBy(-monthStep, \'month\')"></button></div><label class="col col-50 month-input"><div class="item item-input item-select"><select ng-model="bind.month" ng-options="i18n.months.indexOf(month) as month for month in i18n.months" ng-change="change(\'month\')"></select></div></label> <label class="col year-input"><div class="item item-input"><div><input type="number" ng-model="bind.year" min="1900" max="2999" ng-change="change(\'year\')" ng-blur="changed()" required=""></div></div></label><div class="col col-10 right-arrow"><button type="button" class="button button-small button-positive button-clear icon ion-chevron-right" ng-click="changeBy(+monthStep, \'month\')"></button></div></div><div class="row calendar weekdays"><div class="col" ng-repeat="weekday in weekdays"><div class="weekday">{{i18n.weekdays[weekday]}}</div></div></div><div ng-if-end="" class="row calendar days" ng-repeat="y in rows"><div class="col" ng-repeat="x in cols"><div ng-show="(cellDay = y * 7 + x - firstDay) > 0 && cellDay <= daysInMonth" ng-click="changeDay(cellDay)" class="day" ng-class="{ \'disabled\': !isEnabled(cellDay), \'selected\': cellDay === day, \'today\': cellDay === today.day && month === today.month && year === today.year }">{{cellDay}}</div></div></div><div ng-if-start="timeEnabled" class="row time-buttons"><div class="col"></div><div class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-up" ng-click="changeBy(+hourStep, \'hour\')"></button></div><div class="col"></div><div class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-up" ng-click="changeBy(+minuteStep, \'minute\')"></button></div><div ng-if-start="secondsEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-up" ng-click="changeBy(+secondStep, \'second\')"></button></div><div ng-if-start="meridiemEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-up" ng-click="changeBy(+12, \'hour\')"></button></div><div class="col"></div></div><div class="row time"><div class="col"></div><label class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.hour" pattern="0?([01]?[0-9]|2[0-3])" ng-change="change(\'hour\')" ng-blur="changed()" required=""></div></div></label><div class="col colon">:</div><label class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.minute" pattern="0?[0-5]?[0-9]" ng-change="change(\'minute\')" ng-blur="changed()" required=""></div></div></label><div ng-if-start="secondsEnabled" class="col colon">:</div><label ng-if-end="" class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.second" pattern="0?[0-5]?[0-9]" ng-change="change(\'second\')" ng-blur="changed()" required=""></div></div></label><div ng-if-start="meridiemEnabled" class="col"></div><label ng-if-end="" class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.meridiem" pattern="[aApP][mM]" ng-change="change(\'meridiem\')" ng-blur="changed()" required=""></div></div></label><div class="col"></div></div><div ng-if-end="" class="row time-buttons"><div class="col"></div><div class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-down" ng-click="changeBy(-hourStep, \'hour\')"></button></div><div class="col"></div><div class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-down" ng-click="changeBy(-minuteStep, \'minute\')"></button></div><div ng-if-start="secondsEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-down" ng-click="changeBy(-secondStep, \'second\')"></button></div><div ng-if-start="meridiemEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-positive button-clear icon ion-chevron-down" ng-click="changeBy(-12, \'hour\')"></button></div><div class="col"></div></div></div>')}])}();
angular.module("app",["ionic","ion-datetime-picker","ngAnimate"]).run(function($rootScope,$ionicPlatform,$ionicPickerI18n,$rootScope,$location,$state){$rootScope.session={user:window.global.config.user},$ionicPlatform.ready(function(){$ionicPickerI18n.weekdays=["日","一","二","三","四","五","六"],$ionicPickerI18n.months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],$ionicPickerI18n.ok="确认",$ionicPickerI18n.cancel="取消",$ionicPickerI18n.okClass="button-positive",$ionicPickerI18n.cancelClass="button-stable"}),$rootScope.$on("$stateChangeStart",function(event,toState,toStateParams){if((-1!=toState.name.indexOf("schedule")||-1!=toState.name.indexOf("i."))&&void 0==$rootScope.session.user.userInfo){event.preventDefault();var url="/"+toState.name.replace(".","/");if(toStateParams){var paramStr="",i=0;for(var key in toStateParams){var value=toStateParams[key];i>0&&void 0!=value&&(paramStr+="&"),void 0!=value&&(paramStr+=key+"="+value),i++}url=""!=paramStr?encodeURIComponent(url+="?"+paramStr):encodeURIComponent(url)}$state.go("auth.login",{url:url},{location:"replace"})}})}).config(function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/schedule_opened"),$stateProvider.state("auth",{abstract:!0,url:"/auth",template:'<div ui-view class="fadeInUp animated"></div>'}).state("auth.login",{url:"/login?url",templateUrl:"a-bugubus/tpl/login.html"}).state("schedule_opened",{url:"/schedule_opened",templateUrl:"a-bugubus/tpl/schedule-opened.html"}).state("schedule",{abstract:!0,url:"/schedule",template:'<div ui-view class="fadeInUp animated"></div>'}).state("schedule.detail",{url:"/detail?stopStationobj",templateUrl:"a-bugubus/tpl/schedule-detail2.html"}).state("i",{abstract:!0,url:"/i",template:'<div ui-view class="fadeInUp animated"></div>'}).state("i.user",{url:"/user",templateUrl:"a-bugubus/tpl/i-user.html"})});
var app=angular.module("app");app.controller("AppController",function($rootScope,$scope,$state,$ionicViewSwitcher,$location){$rootScope.routerInclude=function(url){return $scope.currState=$state,-1!=$scope.currState.current.name.indexOf(url)},$scope.changePage=function(route){$location.path(route).replace()}}),app.controller("LoginController",function($rootScope,$scope,$state,$stateParams,$ionicViewSwitcher,$myHttpService,$location){$stateParams.url&&($scope.showTip=!0,$scope.tips="请先验证您的手机号"),$scope.user={},$scope.first=!0,$scope.sendButtonText="重新获取",$scope.sendStatus=!0,$scope.sendCode=function(){$myHttpService.post("api/user/queryUserByPhone",{phone:$scope.user.mobile},function(data){data.user.userid&&nextLogin()}),nextLogin=function(haveUser){var checkcode=$scope.user.mobile%$scope.user.mobile.toString().substr(1,3);$myHttpService.post("api/utils/sendAuthcode",{phone:$scope.user.mobile,servicename:"WechatUserLogin",checkcode:checkcode},function(data){layer.msg("短信验证码发送成功！"),$scope.first=!1,$scope.sendStatus=!1;var count=60;$scope.sendButtonText=count+"s后获取";var timer=window.setInterval(function(){count>0?(count--,$scope.sendButtonText=count+"s后获取",$scope.$apply()):($scope.sendStatus=!0,$scope.sendButtonText="重新获取",$scope.$apply(),window.clearInterval(timer))},1e3)})}},$scope.next=function(){$myHttpService.post("auth/login",{phone:$scope.user.mobile,authcode:$scope.user.authcode,openid:$rootScope.session.user.openId},function(data){$rootScope.session.user.userInfo=data.user,$stateParams.url?$location.url($stateParams.url).replace():$location.url("/app/buy").replace()})}}),app.controller("IUserController",function($rootScope,$scope,$location,$state,$myHttpService){$scope.user={},$scope.tempUser={},$myHttpService.post("api/user/queryUserinfo",{userid:$rootScope.session.user.userInfo.userid},function(data){$scope.user=data.user}),$scope.editMode=!1,$scope.editButtonText="编辑",$scope.edit=function(){0==$scope.editMode?($scope.tempUser=$scope.user,$scope.editMode=!$scope.editMode,$scope.editButtonText="保存"):($scope.editMode=!$scope.editMode,$scope.editButtonText="编辑",$myHttpService.post("api/user/modifyUserInfo",$scope.tempUser,function(data){$scope.user=$scope.tempUser,layer.msg("修改成功")}))}}),app.controller("ScheduleDetailController",function($ionicPopup,$window,$rootScope,$scope,$stateParams,$location,$state,$ionicLoading,$myHttpService,$interval){$scope.mode=$stateParams.mode;var map=null,drving=null;$scope.goSchedule={},$scope.goLine={},$scope.backLine={},$scope.stopStationobj=JSON.parse($stateParams.stopStationobj),$scope.init=function(){for(var addprice=0,p=parseInt($scope.stopStationobj.startIndex)+1;p<=$scope.stopStationobj.endIndex;p++)addprice+=$scope.stopStationobj.stopstation[p].price;$scope.addprice=addprice;for(var addtime=0,m=parseInt($scope.stopStationobj.startIndex)+1;m<=$scope.stopStationobj.endIndex;m++)addtime+=$scope.stopStationobj.stopstation[m].driverTime;$scope.addtime=addtime},$scope.init(),$scope.expandStatus=!1;var MapOperation={clearMap:function(){map.clearMap()},addMarkers:function(buslines){for(var i=0,len=buslines.length;i<len;i++){var text="<div class='marker station-marker'>"+i+"</div>";0==i?text="<div class='marker start-marker'>起</div>":i==len-1&&(text="<div class='marker stop-marker'>终</div>");new AMap.Marker({map:map,position:new AMap.LngLat(buslines[i].lng,buslines[i].lat),content:text,extData:buslines[i],draggable:!1})}},addPolyline:function(polyline){(polyline=new AMap.Polyline({path:polyline,strokeColor:"#3366FF",strokeOpacity:1,strokeWeight:5,strokeStyle:"solid",strokeDasharray:[10,5]})).setMap(map),map.setFitView()},drivingSearch:function(stations){$ionicLoading.show();var len=stations.length;if(len>1){for(var startPoint=new AMap.LngLat(stations[0].stalongitude,stations[0].stalatitude),endPoint=new AMap.LngLat(stations[len-1].stalongitude,stations[len-1].stalatitude),waypoints=[],i=1;i<len-1;i++)waypoints.push(new AMap.LngLat(stations[i].stalongitude,stations[i].stalatitude));drving.search(startPoint,endPoint,{waypoints:waypoints},function(){$ionicLoading.hide(),map.setFitView()})}else alert("读取线路数据出错")}};$ionicLoading.show(),$myHttpService.post("api/busline/queryCycleBusScheduleInfo",{bsid:$scope.stopStationobj.bsid},function(data){$scope.busSchedule=data.busSchedule,$scope.busStations=data.busStations,map=new AMap.Map("J_map_canvas",{zoom:14,animateEnable:!1,jogEnable:!1,center:[114.530266,30.498785]}),AMap.plugin(["AMap.ToolBar"],function(){map.addControl(new AMap.ToolBar({offset:new AMap.Pixel(10,150)}))}),drving=new AMap.Driving({map:map}),MapOperation.drivingSearch($scope.busStations)});var carPosition=function(){$myHttpService.postNoLoad("api/busline/queryCarLocation",{carid:$scope.busSchedule.carid},function(data){if(marker)marker.setPosition($scope.lnglat.split(","));else var marker=new AMap.Marker({map:map,position:[data.car.currlon,data.car.currlat],content:"<div class='bus-image marker'></div>",draggable:!1})})};$interval(carPosition,1e4),carPosition(),$scope.baoming=function(){if(void 0==$rootScope.session.user.userInfo){var url=encodeURIComponent("/schedule/detail?bsid="+$scope.stopStationobj.bsid+"&mode=1");$location.url("/auth/login?url="+url)}else $myHttpService.post("api/userEnrollBusline/userEnrollBusline",{userid:$rootScope.session.user.userInfo.userid,phone:$rootScope.session.user.userInfo.phone,lineid:$scope.busSchedule.lineid,bsid:$scope.busSchedule.bsid},function(data){$location.url("/signup_success?bsid="+$scope.stopStationobj.bsid)})},$scope.oldIndex=0,$scope.oldIndexs=0,$scope.expand=function(){$scope.expandStatus=!$scope.expandStatus,1==$scope.expandStatus?map.panBy(0,140):map.panBy(0,-140)},$scope.RideactiveStations=function(index){$scope.busStations[$scope.oldIndex].active=!1,$scope.busStations[index].active=!0,$scope.oldIndex=index,map.setZoom(18),map.setCenter([$scope.busStations[index].stalongitude,$scope.busStations[index].stalatitude]),map.panBy(0,140)},$scope.$watch("stopStationobj.startIndex",function(newstartIndex,oldstartIndex){($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex||$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex)&&($scope.stopStationobj.startIndex=oldstartIndex,$scope.init())}),$scope.$watch("stopStationobj.endIndex",function(newstartIndex,oldstartIndex){($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex||$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex)&&($scope.stopStationobj.endIndex=oldstartIndex,$scope.init())}),$scope.selectstartadd=function(){$scope.stopStationobj.stopstation[$scope.stopStationobj.startIndex];$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex?layer.msg("起始位置不能超过终点位置"):$scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex&&layer.msg("选择的地点信息不能相同"),$scope.init()},$scope.selectendadd=function(){$scope.stopStationobj.stopstation[$scope.stopStationobj.endIndex],parseInt($scope.stopStationobj.endIndex);$scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex?layer.msg("终点位置不能早于起始位置"):$scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex&&layer.msg("选择的地点信息不能相同"),$scope.init()},$scope.showLocation=function(item){var dest=item.stalongitude+","+item.stalatitude,destName=item.stationname;window.location.href="http://m.amap.com/navi/?start=&dest="+dest+"&destName="+destName+"&naviBy=bus&key=1a5cdec55ebac9dbd85652429f54d4d1"}}),app.controller("ScheduleOpenedController",function($rootScope,$scope,$state,$myHttpService,$ionicScrollDelegate){$scope.scheduleList=[],$scope.offset=0,$scope.pagesize=20,$scope.totalnum=0,$scope.showMoreBtn=!1,$scope.getData=function(){$myHttpService.post("api/busline/queryCycleBuslines",{offset:$scope.offset,pagesize:$scope.pagesize,company:"2017092210022499480058"},function(data){$scope.totalnum=data.totalnum,$scope.totalnum-($scope.offset+$scope.pagesize)>0?$scope.showMoreBtn=!0:$scope.showMoreBtn=!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})},$scope.getData(),$scope.refresh=function(){$scope.offset=0,$myHttpService.postNoLoad("api/busline/queryCycleBuslines",{offset:$scope.offset,pagesize:$scope.pagesize,company:"2017092210022499480058"},function(data){$scope.totalnum=data.totalnum,$scope.totalnum-($scope.offset+$scope.pagesize)>0?$scope.showMoreBtn=!0:$scope.showMoreBtn=!1,$scope.$broadcast("scroll.refreshComplete"),$scope.scheduleList=data.cycleBuslineSchedules,window.setTimeout(function(){$ionicScrollDelegate.resize()},0),layer.msg("刷新成功")})},$scope.goToScheduleDetail=function(item){var stopStationobj={bsid:item.bsid};$state.go("schedule.detail",{stopStationobj:JSON.stringify(stopStationobj)})},$scope.getMoreData=function(){$scope.offset=$scope.offset+$scope.pagesize,$myHttpService.post("api/busline/queryCycleBuslines",{runstatus:1,offset:$scope.offset,pagesize:$scope.pagesize},function(data){$scope.totalnum=data.totalnum,$scope.totalnum-($scope.offset+$scope.pagesize)>0?$scope.showMoreBtn=!0:$scope.showMoreBtn=!1,$scope.scheduleList=$scope.scheduleList.concat(data.cycleBuslineSchedules),window.setTimeout(function(){$ionicScrollDelegate.resize()},0)})}});
app.directive("focusAuto",function($document){return{link:function(scope,element,attrs){element[0].id="J_focus_auto_"+(new Date).getTime(),document.body.addEventListener("touchstart",function(e){e.target.id!=element[0].id&&element[0].blur()}),element[0].focus()}}}),app.filter("transfer",function(){return function(input,fieldName){if(void 0!=fieldName)return{sex:{0:"男",1:"女"},ticketStatus:{0:"车票已过期",1:"车票有效"}}[fieldName][input];alert("变量名称不能为空")}}),app.filter("idFilter",function(){return function(input){return input.slice(0,4)+"****"+input.slice(-4,input.length)}}),app.directive("touch",function(){return{link:function($scope,element,attr){var startX,moveX,dom=element[0];dom.addEventListener("touchstart",function(e){dom&&(startX=e.targetTouches[0].pageX)}),dom.addEventListener("touchmove",function(e){var targetMarginLeft=dom.style.marginLeft.replace("px","");moveX=e.changedTouches[0].pageX,targetMarginLeft>=0&&startX-moveX<0||(targetMarginLeft>=-80&&startX-moveX<0?dom.style.marginLeft=-(startX-moveX)-80+"px":targetMarginLeft>-80&&(dom.style.marginLeft=startX-moveX>=80?"-80px":-(startX-moveX)+"px"))}),dom.addEventListener("touchend",function(e){var endX=e.changedTouches[0].pageX;if(startX-endX>30)interval=setInterval(function(){var targetMarginLeft=dom.style.marginLeft.replace("px","");if(targetMarginLeft>-80){var temp=--targetMarginLeft;dom.style.marginLeft=--temp+"px"}else clearInterval(interval),dom.style.marginLeft="-80px"},2);else var interval=setInterval(function(){var targetMarginLeft=dom.style.marginLeft.replace("px","");if(targetMarginLeft<0){var temp=++targetMarginLeft;dom.style.marginLeft=++temp+"px"}else clearInterval(interval),dom.style.marginLeft="0px"},2)})}}});
app.service("$myLocationService",function($ionicLoading){var el=document.createElement("div");el.id="map"+(new Date).getTime(),el.style="width:0;height:0",document.body.appendChild(el);var map,geolocation,geocoder;map=new AMap.Map(el.id,{resizeEnable:!0}),geocoder=new AMap.Geocoder({radius:1e3,city:"027",extensions:"all"}),this.getCurrentPosition=function(callback){map.plugin("AMap.Geolocation",function(){(geolocation=new AMap.Geolocation({enableHighAccuracy:!0,convert:!0})).getCurrentPosition(),AMap.event.addListener(geolocation,"complete",function(data){geocoder.getAddress(data.position,function(status,result){"complete"===status&&"OK"===result.info&&callback(result.regeocode.pois&&result.regeocode.pois.length>0?result.regeocode.pois:[])})}),AMap.event.addListener(geolocation,"error",function(data){alert("您禁止了授权定位信息,若想继续操作请输入地址信息")})})},this.getPoisByLngLat=function(lngLat,callback){geocoder.getAddress(lngLat,function(status,result){"complete"===status&&"OK"===result.info&&callback(result.regeocode.pois&&result.regeocode.pois.length>0?result.regeocode.pois:[])})},this.AddressByKeyword=function(keyword,callback){geocoder.getLocation(keyword,function(status,result){console.log(status),"complete"===status&&"OK"===result.info&&(console.log(result),result.geocodes.pois&&result.regeocode.pois.length)})},this.getPoisByKeyword=function(keyword,callback){AMap.service(["AMap.Autocomplete"],function(){var auto=new AMap.Autocomplete({city:"武汉",datatype:"all"});keyword.length>0&&auto.search(keyword,function(status,result){"complete"==status?callback(result.tips):"no_data"==status&&callback([])})})}}).service("$myHttpService",function($http,$ionicLoading){this.post=function(url,data,success,error){$ionicLoading.show(),$http.post(url,data).success(function(data){if(window.setTimeout(function(){$ionicLoading.hide()},250),0==data.code)success(data.data);else{var errorMsg="";errorMsg=data.data.msg?data.data.msg:data.data,layer?layer.alert(errorMsg):alert(errorMsg),error&&error(data.data)}}).error(function(e){$ionicLoading.hide(),layer?layer.alert(e.message):alert(e.message),error&&error(e)})},this.postNoLoad=function(url,data,success,error){$http.post(url,data).success(function(data){if(0==data.code)success(data.data);else{var errorMsg="";errorMsg=data.data.msg?data.data.msg:data.data,layer?layer.alert(errorMsg):alert(errorMsg),error&&error(data.data)}}).error(function(e){layer?layer.alert(e.message):alert(e.message),error&&error(e)})},this.get=function(url,data,success,error){$ionicLoading.show(),$http.get(url,data).success(function(data){if($ionicLoading.hide(),0==data.code)success(data.data);else{var errorMsg="";errorMsg=data.data.msg?data.data.msg:data.data,layer?layer.alert(errorMsg):alert(errorMsg),error&&error(data.data)}}).error(function(e){$ionicLoading.hide(),layer?layer.alert(e.message):alert(e.message),error&&error(e)})}}).service("$selectCity",function(){this.getCity=function(callback){(new AMap.CitySearch).getLocalCity(function(status,result){"complete"===status&&"OK"===result.info&&callback(result&&result.city?result.city:[])})}});