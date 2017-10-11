angular.module('app', [
        'ionic',
        'ion-datetime-picker',
        'ngAnimate'
    ])
.run(function($rootScope,$ionicPlatform,$ionicPickerI18n,$rootScope,$location,$state) {
        //初始化页面相关的配置信息
    $rootScope.session = {
        user:window.global.config.user
    }
    $ionicPlatform.ready(function() {
        /**
         * date time picker选择器国际化
         * @type {string[]}
         */
        $ionicPickerI18n.weekdays = ["日", "一", "二", "三", "四", "五", "六"];
        $ionicPickerI18n.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        $ionicPickerI18n.ok = "确认";
        $ionicPickerI18n.cancel = "取消";
        $ionicPickerI18n.okClass = "button-positive";
        $ionicPickerI18n.cancelClass = "button-stable";

    });
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            if((toState.name.indexOf("schedule")!=-1
                ||toState.name.indexOf("i.")!=-1)
                &&$rootScope.session.user.userInfo==undefined){
                event.preventDefault();//取消默认跳转行为
                //截取字符串
                var url = "/"+toState.name.replace('.','/');
                if(toStateParams){
                    var paramStr = "",i=0;
                    for(var key in toStateParams){
                        var value=toStateParams[key];
                        i>0&&value!=undefined?paramStr+= "&":'';
                        value!=undefined?paramStr+=key+"="+value:'';
                        i++;
                    }
                    if(paramStr!=""){
                        url = encodeURIComponent(url+="?"+paramStr);
                    }else{
                        url = encodeURIComponent(url);
                    }
                }
                $state.go("auth.login",{url:url},{location:'replace'});
                /*window.setTimeout(function(){
                    $state.go("auth.login",{url:url},{location:'replace'});
                    //$location.url("/auth/login?url="+url).replace();
                },0);*/
            }
             //console.log(toState.name);
        });
})
.config(
    function ($stateProvider,   $urlRouterProvider) {
        var basePath = "a-bugubus/";
        $urlRouterProvider
            .otherwise('/schedule_opened');
        $stateProvider
            .state('auth',{
                abstract: true,
                url:'/auth',
                template: '<div ui-view class="fadeInUp animated"></div>',
            })
            .state('auth.login',{
                //跳转到用户登录页面
                url:'/login?url',
                templateUrl:basePath+'tpl/login.html',
            })
            
            //已开通班次列表
            .state('schedule_opened',{
                url:'/schedule_opened',
                templateUrl:basePath+'tpl/schedule-opened.html'
            })
           
            //班次主目录
            .state('schedule',{
                abstract: true,
                url:'/schedule',
                template:'<div ui-view class="fadeInUp animated"></div>',
            })
            //班次详情

            //url:'/detail?bsid&mode&chargingtype&staddr&edaddr&stoplist',
            .state('schedule.detail',{
                //我的用户主目录 ids 表示需要在地图上显示的多个班次ID, buyMode表示是否显示购买按钮,0表示显示，1表示不显示
                url:'/detail?stopStationobj',
                templateUrl:basePath+'tpl/schedule-detail2.html',
            })
            //班次详情
            
            //我的界面账户信息二级页面
            .state('i',{
                //我的用户主目录
                abstract: true,
                url:'/i',
                template:'<div ui-view class="fadeInUp animated"></div>',
            })
            //账户信息
            .state('i.user',{
                //我的用户主目录
                url:'/user',
                templateUrl:basePath+'tpl/i-user.html',
            })
    }
)
