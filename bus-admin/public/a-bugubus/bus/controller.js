/**
 * @author 周快
 * @date 2016-10-13
 * @version 1.0.0
 * @descriptions 针对排班管理的控制器
 */
app.controller('BusEditController',function($tableListService,$rootScope,$scope,$http,$state,$localStorage,$stateParams,$myHttpService,$timeout){
    $scope.editMode = !!$stateParams.id;
    if($scope.editMode){//编辑模式
        //检测有没有ID，判断当前是添加还是编辑，共用一套模板
        var options={
            searchFormId:'J_search_form',
            size: '9999',
            listUrl:'api/unit/queryUnitlistByKeyword',
            multiTable: 'companyList',
            callback: function(){
                $scope.bus = {
                    carid:$stateParams.id
                };
                //获取车辆详情
                $myHttpService.post("api/car/queryCarinfo.htm",$scope.bus,function(data){
                    $scope.bus = data.carinfo;
                });
            }
        };
        $tableListService.init($scope, options);
        $tableListService.get();
        $scope.submit = function(){
            //提交表单到服务器地址
            $myHttpService.post("api/car/updateCarinfo.htm",$scope.bus,function(data){
                layer.msg("修改成功！",{offset: '100px'})
                $timeout(function(){
                    $state.go('app.bus.list');
                },1000)
            });
        };
        $scope.delete=function(item){
            layer.confirm('您确定要删除吗？', {icon: 3, title:'提示'},function(){
                $myHttpService.post("api/car/deleteCarinfo.htm",item,function(){
                    layer.msg("删除成功！",{offset: '100px'});
                    window.setTimeout(function(){
                        $state.go("app.bus.list",{},{reload: true});
                    },1000);
                });
            },function(index){
                layer.close(index);
            });

        }
    }else{ //添加模式
        var options={
            searchFormId:'J_search_form',
            size: '9999',
            listUrl:'api/unit/queryUnitlistByKeyword',
            multiTable: 'companyList'
        };
        $tableListService.init($scope, options);
        $tableListService.get();
        $scope.bus = {
            cartype:0
        };
        //防止网络环境糟糕时，表单重复提交
        $scope.submiting = false;
        //当前页面的错误
        //提交添加司机的表单
        $scope.submit = function(){
            $scope.submiting = true;
            //提交表单到服务器地址
            
            if($scope.bus.cartype == '0'){
                $scope.bus.seatnum = 46
            }else if($scope.bus.cartype == '1'){
                $scope.bus.seatnum = 32
            }else if($scope.bus.cartype == '2'){
                $scope.bus.seatnum = 19
            }else if($scope.bus.cartype == '3'){
                $scope.bus.seatnum = 13
            }
            // console.log($scope.bus)
            $myHttpService.post("api/car/insertCarinfo.htm",$scope.bus,function(data){
                $scope.submiting = false;
                layer.msg("添加成功！",{offset: '100px'});
                $state.go("app.bus.add",{},{reload:true});
            },function(){
                $scope.submiting = false;
            });
        }

    }

});
/**
 * 线路列表控制器
 */
app.controller('BusListController',function($rootScope,$scope,$http,$state,$localStorage,$stateParams,$filter,$tableListService,$myHttpService){
    //全选
    var selected = false;
    $scope.selectAll = function(){
        selected = !selected;
        angular.forEach($scope.content,function(item){
            item.selected = selected;
        });
    }
    //搜索分页选项
    var options = {
        searchFormId:"J_search_form",
        listUrl:"api/car/queryCarlistByKeyword.htm"
    };
    $scope.delete=function(item){
        layer.confirm('您确定要删除吗？', {icon: 3, title:'提示'},function(){
            $myHttpService.post("api/car/deleteCarinfo.htm",item,function(){
                layer.msg("删除成功！",{offset: '100px'});
                window.setTimeout(function(){
                    $state.go("app.bus.list",{},{reload: true});
                },1000);
            });
        },function(index){
            layer.close(index);
        });

    }
    $tableListService.init($scope, options);
    $tableListService.get();
    // console.log($scope);
});
app.controller('BusPositionController', function($scope, $rootScope,$stateParams,$http,$myHttpService) {
    //根据车辆的id获取位置信息，先判断obd状态，如果obd状态为不正常，先唤醒obd，在获取位置信息
    var carId = $stateParams.carId;
    var timing = 0;
    var map = new AMap.Map('J_map_canvas', {
        resizeEnable: true,
        zoom:11,
    });
    var marker = new AMap.Marker({
    });
    marker.setMap(map);
    function carPosition(){
        timing = 5000;
        $myHttpService.post("api/car/queryCarCurrLocation",{carid: carId},function(data){
            marker.setPosition(new AMap.LngLat(data.carinfo.currlon,data.carinfo.currlat));
        });
    }
    carPosition();
    var timer = setInterval(carPosition,5000);
    $scope.$on('$destroy',function() {
       clearInterval(timer);
    });
})
