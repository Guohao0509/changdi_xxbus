angular.module("app",["ionic","ion-datetime-picker","ngAnimate"]).run(function($rootScope,$ionicPlatform,$ionicPickerI18n,$rootScope,$location,$state){$rootScope.session={user:window.global.config.user},$ionicPlatform.ready(function(){$ionicPickerI18n.weekdays=["日","一","二","三","四","五","六"],$ionicPickerI18n.months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],$ionicPickerI18n.ok="确认",$ionicPickerI18n.cancel="取消",$ionicPickerI18n.okClass="button-positive",$ionicPickerI18n.cancelClass="button-stable"}),$rootScope.$on("$stateChangeStart",function(event,toState,toStateParams){if((-1!=toState.name.indexOf("schedule")||-1!=toState.name.indexOf("i."))&&void 0==$rootScope.session.user.userInfo){event.preventDefault();var url="/"+toState.name.replace(".","/");if(toStateParams){var paramStr="",i=0;for(var key in toStateParams){var value=toStateParams[key];i>0&&void 0!=value&&(paramStr+="&"),void 0!=value&&(paramStr+=key+"="+value),i++}url=""!=paramStr?encodeURIComponent(url+="?"+paramStr):encodeURIComponent(url)}$state.go("auth.login",{url:url},{location:"replace"})}})}).config(function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/schedule_opened"),$stateProvider.state("auth",{abstract:!0,url:"/auth",template:'<div ui-view class="fadeInUp animated"></div>'}).state("auth.login",{url:"/login?url",templateUrl:"a-bugubus/tpl/login.html"}).state("schedule_opened",{url:"/schedule_opened",templateUrl:"a-bugubus/tpl/schedule-opened.html"}).state("schedule",{abstract:!0,url:"/schedule",template:'<div ui-view class="fadeInUp animated"></div>'}).state("schedule.detail",{url:"/detail?stopStationobj",templateUrl:"a-bugubus/tpl/schedule-detail2.html"}).state("i",{abstract:!0,url:"/i",template:'<div ui-view class="fadeInUp animated"></div>'}).state("i.user",{url:"/user",templateUrl:"a-bugubus/tpl/i-user.html"})});