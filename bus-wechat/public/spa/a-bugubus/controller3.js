var app = angular.module('app');
app.controller('AppController',function($rootScope,$scope,$state,$ionicViewSwitcher,$location){
    $rootScope.routerInclude = function(url){
        /*
        //ui-router自带的include有坑，在进行json对象序列化时，序列化出来的对象，name和url均为空
        //如下代码可以进行检测
        $scope.currState = $state;
        console.log("This one have some objects: ");
        console.log('by reference:', $scope.currState);
        console.log('by value:', JSON.parse(JSON.stringify($scope.currState)));

        console.log("But when I want to access name its empty: ");
        $timeout(function() {
            console.log($state.current.name);
        });

        //use this instead:
        $scope.$watch('currState.current.name', function(newValue, oldValue) {
            console.log(newValue);
        });
         */
        $scope.currState = $state;
        if($scope.currState.current.name.indexOf(url)!=-1){
            return true;
        }
        return false;
    }
    $scope.changePage = function(route){
        //为了防止浏览器留下历史记录
        $location.path(route).replace();
    }
});

app.controller('LoginController',function($rootScope,$scope,$state,$stateParams,$ionicViewSwitcher,$myHttpService,$location){

    $myHttpService.post("api/unit/queryUnitNameList",{},function(data){
        $scope.companys = data.units;
        console.log(data.units)
    },function(e){
        console.log(e)
    })

    if($stateParams.url){
        $scope.showTip =true;
        $scope.tips = "请先验证您的手机号";
    }
    //定义用户对象
    $scope.user = {};
    //标记是否开启第一步
    $scope.first = true;
    $scope.sendButtonText = "重新获取",
        $scope.sendStatus =true;
    $scope.sendCode = function(){
        //对参数做预处理
        // $myHttpService.post("api/user/queryUserByPhone",{
        //     phone: $scope.user.mobile
        // },function(data){
        //     if(!!data.user.userid){
        //         nextLogin();
        //     }
        // })
        nextLogin = function(haveUser){
            var checkcode = $scope.user.mobile%($scope.user.mobile.toString().substr(1,3));
            // console.log($scope.user.mobile);
            $myHttpService.post("api/utils/sendAuthcode", {
                phone:$scope.user.mobile,
                servicename:"WechatUserLogin",
                checkcode:checkcode
            },function(data){
                layer.msg("短信验证码发送成功！");
                $scope.first = false;
                $scope.sendStatus = false;
                var count = 60;
                $scope.sendButtonText = count+"s后获取";
                var timer = window.setInterval(function(){
                    if(count>0){
                        count--;
                        $scope.sendButtonText = count+"s后获取";
                        $scope.$apply();
                    }else{
                        $scope.sendStatus = true;
                        $scope.sendButtonText = "重新获取";
                        $scope.$apply();
                        window.clearInterval(timer);
                    }
                },1000);
            });
        }
        nextLogin();
    }

    $scope.next= function(){
        console.log($scope.user.selectedComp)
        $myHttpService.post("auth/login",{
            phone:$scope.user.mobile,
            authcode:$scope.user.authcode,
            openid:$rootScope.session.user.openId,
            company:$scope.user.selectedComp
        },function(data){
            //登录成功，更新session
            $rootScope.session.user.userInfo = data.user;
            //登录后检查重定向路径，重定向到登陆前的路径
            if($stateParams.url){
                // console.log($stateParams.url);
                $location.url($stateParams.url).replace();
            }else{
                $location.url("/app/buy").replace();
            }
        });
    }
});

app.controller('IUserController',function($rootScope,$scope,$location,$state,$myHttpService){
        $scope.user = {};
        $scope.tempUser = {};
        // console.log($rootScope.session.user.userInfo.userid);
        $myHttpService.post("api/user/queryUserinfo",{
            userid:$rootScope.session.user.userInfo.userid
        },function(data){
            // data.user.userid = data.user.userid.slice(0, 4)+"****"+data.user.userid.slice(-4, data.user.userid.length);
            $scope.user = data.user;
        });
        $scope.editMode = false;
        $scope.editButtonText = "编辑";
        $scope.edit = function(){
            if($scope.editMode==false){
                $scope.tempUser = $scope.user;
                $scope.editMode=!$scope.editMode;
                $scope.editButtonText = "保存";
            }else{
                $scope.editMode=!$scope.editMode;
                $scope.editButtonText = "编辑";
                //保存用户信息
                $myHttpService.post("api/user/modifyUserInfo",$scope.tempUser,function(data){
                    $scope.user = $scope.tempUser;
                    layer.msg("修改成功");
                });
            }
        }
});

app.controller('ScheduleDetailController',function($ionicPopup,$window,$rootScope,$scope,$stateParams,$location,$state,$ionicLoading,$myHttpService,$interval){
    //标记是否购买
    $scope.mode = $stateParams.mode;
    //标记当前选中的标签
    // $scope.tabIndex = 0;
    var map = null,drving = null;
    $scope.goSchedule = {};
    // $scope.backSchedule = {};
    $scope.goLine = {};
    $scope.backLine = {};
    //var stopstationList={};
    //获取地址信息
    $scope.stopStationobj=JSON.parse($stateParams.stopStationobj);
    // console.log($scope.stopStationobj)
    // $myHttpService.post("api/busline/queryCycleBusScheduleInfo",{
    //     //bsid:$stateParams.bsid,
    //     bsid:$scope.stopStationobj.bsid,
    // },function(data){
    //     // $scope.busStations = data.busStations
    //     console.log(data);
    //     // MapOperation.addMarkers(data.busStations)
    // },function(){
    //     console.log("api/busline/queryCycleBusScheduleInfo was crash")
    // })
    // $scope.stopStationobj.startIndex="0";
    // // $scope.stopStationobj.endIndex= ($scope.stopStationobj.stopstation.length-1).toString();
    // $scope.addtime=0;
    /*查询票价*/
    $scope.init=function(){
        var addprice=0;
        for(var p =parseInt($scope.stopStationobj.startIndex)+1;p<=$scope.stopStationobj.endIndex;p++){
            addprice=addprice+$scope.stopStationobj.stopstation[p].price;
        }
        $scope.addprice=addprice;

        var addtime=0;
        for(var m=parseInt($scope.stopStationobj.startIndex)+1;m<=$scope.stopStationobj.endIndex;m++){
            addtime=addtime+$scope.stopStationobj.stopstation[m].driverTime;
        }
        $scope.addtime=addtime

    }

    $scope.init();

    //标记展开收起状态
    $scope.expandStatus = false;
    var MapOperation = {
        //清空地图
        clearMap:function(){
            map.clearMap();
        },
        //添加点到地图上面
        addMarkers:function(buslines){
            for(var i = 0,len = buslines.length;i<len;i++){
                var icon;
                if(i==0){
                    icon='http://webapi.amap.com/theme/v1.3/markers/n/start.png';
                }else if(i==len-1){
                    icon='http://webapi.amap.com/theme/v1.3/markers/n/end.png';
                }else if(buslines[i].stationType == 1){
                    icon = 'http://webapi.amap.com/theme/v1.3/markers/n/mid.png';
                }else{
                    continue;
                }
                var marker = new AMap.Marker({
                    map: map,
                    position:new AMap.LngLat(buslines[i].stalongitude,buslines[i].stalatitude),
                    icon:icon,
                    extData:buslines[i],
                    draggable:false
                });
            }
        },
        //添加路线到地图上面
        addPolyline:function(polyline){
            var polyline = new AMap.Polyline({
                path: polyline,         //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeOpacity: 1,       //线透明度
                strokeWeight: 5,        //线宽
                strokeStyle: "solid",   //线样式
                strokeDasharray: [10, 5]//补充线样式
            });
            polyline.setMap(map);
            map.setFitView();
        },
        //调用高德地图进行路线规划
        drivingSearch:function(stations){
            $ionicLoading.show();
            var len = stations.length;
            if(len>1){
                var startPoint = new AMap.LngLat(stations[0].stalongitude,stations[0].stalatitude);
                var endPoint = new AMap.LngLat(stations[len-1].stalongitude,stations[len-1].stalatitude);
                var waypoints = [];
                for(var i=1;i<len-1;i++){
                    waypoints.push(new AMap.LngLat(stations[i].stalongitude,stations[i].stalatitude));
                }
                //绘图
                drving.search(startPoint,endPoint,{waypoints:waypoints},function(){
                    $ionicLoading.hide();
                    //设置地图
                    map.setFitView();
                });
            }else{
                alert("读取线路数据出错");
            }
        }
    }
    $ionicLoading.show();
    $myHttpService.post("api/busline/queryCycleBusScheduleInfo",{
        //bsid:$stateParams.bsid,
        bsid:$scope.stopStationobj.bsid,
    },function(data){
        $scope.busSchedule = data.busSchedule;
        $scope.busStations = data.busStations;
        // console.log($scope.busStations)
        //此处进行网络请求，并创建地图
        map = new AMap.Map("J_map_canvas",{
            zoom:14,
            animateEnable:false,
            jogEnable:false,
            center:[114.530266,30.498785]
        });
        /**
         * 设置地图工具条
         */
        AMap.plugin(['AMap.ToolBar'],
            function(){
                map.addControl(new AMap.ToolBar({
                    offset:new AMap.Pixel(10,150)
                }));
            });
        //设置驾车导航
        drving = new AMap.Driving({
            map: map,
            hideMarkers: true
        });
        //完成数据封装
        //完成地图绘制
        // MapOperation.addMarkers( $scope.goSchedule.line.stations);
        console.log($scope.busStations)
        MapOperation.addMarkers($scope.busStations);
        MapOperation.drivingSearch($scope.busStations);
    });

    /*
     * 每隔10s请求
     * */
    var content="<div class='bus-image marker'></div>";
    var carMmarker;
    var carPosition = function(){
        $myHttpService.postNoLoad('api/busline/queryCarLocation',{carid:$scope.busSchedule.carid},function(data){
            /*接收数据*/
            // console.log(data)
            //alert('lnglat:'+lnglat);
            /*判断marker是否存在*/
            if(!carMmarker){
                //创建一个地图对象
                console.log('marker不存在, new marker')
                var marker = new AMap.Marker({
                    map: map,
                    position:[data.car.currlon,data.car.currlat],
                    content:content,
                    draggable:false
                });
            }else{
                carMmarker.setPosition([data.car.currlon,data.car.currlat]);
            }

        })
    }
    $interval(carPosition,5000);

    $scope.baoming = function(){
        //检查用户的登陆情况，没有登录则跳转到登录页
        if($rootScope.session.user.userInfo==undefined){
            var url = encodeURIComponent("/schedule/detail?bsid="+$scope.stopStationobj.bsid+"&mode=1");
            $location.url("/auth/login?url="+url);
        }else{
            $myHttpService.post("api/userEnrollBusline/userEnrollBusline",{
                userid:$rootScope.session.user.userInfo.userid,
                phone:$rootScope.session.user.userInfo.phone,
                lineid:$scope.busSchedule.lineid,
                bsid:$scope.busSchedule.bsid
            },function(data){
                $location.url("/signup_success?bsid="+$scope.stopStationobj.bsid);
            });
        }
    };
    $scope.oldIndex = 0;
    $scope.oldIndexs=0;
    $scope.expand = function(){
        $scope.expandStatus=! $scope.expandStatus;
        if($scope.expandStatus==true){
            map.panBy(0,140);
        }else{
            map.panBy(0,-140);
        }

    };
    $scope.RideactiveStations = function(index){
        //$scope.busSchedule.departaddr=$scope.busStations[index].stationname;
        //$scope.busSchedule.arriveaddr=$scope.busStations[index-1].stationname;
        $scope.busStations[$scope.oldIndex].active = false;
        $scope.busStations[index].active = true;
        $scope.oldIndex = index;
        map.setZoom(18);
        map.setCenter([$scope.busStations[index].stalongitude,$scope.busStations[index].stalatitude]);
        map.panBy(0,140);
        //console.log(JSON.stringify($scope.busStations[index].stationname));
    };
    //$scope.DebusactiveStations=function(index){
    //    $scope.busSchedule.arriveaddr=$scope.busStations[index].stationname;
    //    $scope.busStations[$scope.oldIndexs].actives = false;
    //    $scope.busStations[index].actives = true;
    //    $scope.oldIndexs = index;
    //    map.setZoom(18);
    //    map.setCenter([$scope.busStations[index].stalongitude,$scope.busStations[index].stalatitude]);
    //    map.panBy(0,140);
    //};

    //console.log($scope.stopStationobj.stopstation[$scope.stopStationobj.startIndex]);

    $scope.$watch('stopStationobj.startIndex',function(newstartIndex,oldstartIndex){
        if($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex || $scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex){
            $scope.stopStationobj.startIndex=oldstartIndex;
            $scope.init();
        }

    });
    $scope.$watch('stopStationobj.endIndex',function(newstartIndex,oldstartIndex){
        if($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex || $scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex){
            $scope.stopStationobj.endIndex=oldstartIndex;
            $scope.init();
        }

    });

    //选择项
    $scope.selectstartadd=function(){
        var startStopStation = $scope.stopStationobj.stopstation[$scope.stopStationobj.startIndex];

        if($scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex){
            layer.msg('起始位置不能超过终点位置');
            //$scope.stopStationobj.startIndex=($scope.stopStationobj.startIndex-1).toString();
        }else if($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex){
            layer.msg('选择的地点信息不能相同');
            //$scope.stopStationobj.startIndex=($scope.stopStationobj.startIndex-1).toString();
        }
        //$scope.startprice=startStopStation.price;

        //var addprice=0;
        //for(var p =parseInt($scope.stopStationobj.startIndex)+1;p<=$scope.stopStationobj.endIndex;p++){
        //
        //    addprice=addprice+$scope.stopStationobj.stopstation[p].price;
        //    console.log(addprice);
        //}
        //$scope.addprice=addprice;
        //var addtime=0;
        //for(var m=parseInt($scope.stopStationobj.startIndex)+1;m<=$scope.stopStationobj.endIndex;m++){
        //    addtime=addtime+$scope.stopStationobj.stopstation[m].driverTime;
        //}
        //$scope.addtime=addtime
        $scope.init();
    };

    $scope.selectendadd=function(){
        var endStopStation = $scope.stopStationobj.stopstation[$scope.stopStationobj.endIndex];
        var  endIndex=parseInt($scope.stopStationobj.endIndex) + 1;
        //console.log(endStopStation);

        if($scope.stopStationobj.startIndex>$scope.stopStationobj.endIndex){
            layer.msg('终点位置不能早于起始位置');
            //$scope.stopStationobj.endIndex=endIndex.toString();

        }else if($scope.stopStationobj.startIndex==$scope.stopStationobj.endIndex){
            layer.msg('选择的地点信息不能相同');
            //$scope.stopStationobj.endIndex=endIndex.toString();
        }
        /*票价*/
        //$scope.endprice=endStopStation.price;
        //var addprice=0;
        //
        //for(var t=parseInt($scope.stopStationobj.startIndex)+1;t<=$scope.stopStationobj.endIndex;t++){
        //    addprice=addprice+ $scope.stopStationobj.stopstation[t].price;
        //
        //}
        //$scope.addprice=addprice;
        //
        //var addtime=0;
        //for(var m=parseInt($scope.stopStationobj.startIndex)+1;m<=$scope.stopStationobj.endIndex;m++){
        //    addtime=addtime+$scope.stopStationobj.stopstation[m].driverTime;
        //}
        //$scope.addtime=addtime
        $scope.init();

    };

    $scope.showLocation = function(item){
        var dest = item.stalongitude+","+item.stalatitude;
        var destName = item.stationname;
        window.location.href = "http://m.amap.com/navi/?start=&dest="+dest+"&destName="+destName+"&naviBy=bus&key=1a5cdec55ebac9dbd85652429f54d4d1";
    };
})

app.controller('ScheduleOpenedController',function($rootScope,$scope,$state,$myHttpService,$ionicScrollDelegate){
        $scope.scheduleList = [];
        $scope.offset = 0;
        $scope.pagesize = 20;
        $scope.totalnum = 0;
        $scope.showMoreBtn = false;
        $scope.getData = function(){
            $myHttpService.post('api/busline/queryCycleBuslines',{
                offset:$scope.offset,
                pagesize:$scope.pagesize,
                company:window.global.config.user.userInfo.company
            },function(data){
                // console.log("关于已开通路线:"+JSON.stringify(data));
                $scope.totalnum = data.totalnum;
                if($scope.totalnum-($scope.offset+$scope.pagesize)>0){
                    $scope.showMoreBtn  = true;
                }else{
                    $scope.showMoreBtn  = false;
                }
                $scope.$broadcast("scroll.refreshComplete");
                $scope.scheduleList = data.cycleBuslineSchedules;
                window.setTimeout(function(){
                    $ionicScrollDelegate.resize();
                },0);
                //$scope.$apply();
            })
        }
        //初始化页面数据
        $scope.getData();
        $scope.refresh = function(){
            $scope.offset = 0;
            $myHttpService.postNoLoad('api/busline/queryCycleBuslines',{
                offset:$scope.offset,
                pagesize:$scope.pagesize,
                company:window.global.config.user.userInfo.company
            },function(data){
                $scope.totalnum = data.totalnum;
                if($scope.totalnum-($scope.offset+$scope.pagesize)>0){
                    $scope.showMoreBtn  = true;
                }else{
                    $scope.showMoreBtn  = false;
                }
                $scope.$broadcast("scroll.refreshComplete");
                $scope.scheduleList = data.cycleBuslineSchedules;
                window.setTimeout(function(){
                    $ionicScrollDelegate.resize();
                },0);
                layer.msg("刷新成功");
                //$scope.$apply();
            })
        }
        //查询班次详情
        $scope.goToScheduleDetail = function(item){
            // console.log("查看item信息："+JSON.stringify(item));
            // //封装参数
            // var stopstation=[];
            // for(var s=0;s<item.busSchedulePrices.length;s++){
            //     if(s==0){
            //       stopstation.push({
            //           stationname:item.busSchedulePrices[s].top.stationname,
            //           index:0,
            //           price:0,
            //           driverTime:0
            //       })
            //     }
            //     stopstation.push({
            //         stationname:item.busSchedulePrices[s].bottom.stationname,
            //         index:s+1,
            //         price:item.busSchedulePrices[s].price,
            //         driverTime:item.busSchedulePrices[s].driverTime
            //     })
            // }
            // console.log(stopstation);

            var stopStationobj={
                bsid:item.bsid,
                // mode:mode,//0详情，1新线路报名模式,2购买车票
                // staddr:item.departaddr,
                // edaddr:item.arriveaddr,
                // stopstation:stopstation,
            }


            //var stoplist= item.busSchedulePrices;

            //console.log(stoplist);
            $state.go("schedule.detail",{stopStationobj:JSON.stringify(stopStationobj)
                //bsid:item.bsid,
                //mode:mode,//0详情，1新线路报名模式,2购买车票
                //staddr:item.departaddr,
                //edaddr:item.arriveaddr,

            });
        };
        $scope.getMoreData = function(){
            $scope.offset = $scope.offset+$scope.pagesize;
            $myHttpService.post('api/busline/queryCycleBuslines',{
                runstatus:1,
                offset:$scope.offset,
                pagesize:$scope.pagesize
            },function(data){
                $scope.totalnum = data.totalnum;
                if($scope.totalnum-($scope.offset+$scope.pagesize)>0){
                    $scope.showMoreBtn  = true;
                }else{
                    $scope.showMoreBtn  = false;
                }
                $scope.scheduleList = $scope.scheduleList.concat(data.cycleBuslineSchedules);
                window.setTimeout(function(){
                    $ionicScrollDelegate.resize();
                },0);
            })
        }
})