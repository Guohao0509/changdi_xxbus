/**
 * @author 郭浩
 * @date 2017-9-27
 * @version 1.0.0
 * @descriptions 司机管理界面的控制器
 */
/**
 * 司机列表控制器
 */
app.controller('DriverListController',function($rootScope,$scope,$http,$state,$localStorage,$tableListService,$myHttpService){
    //全选
    // var selected = false;
    // $scope.selectAll = function(){
    //     selected = !selected;
    //     angular.forEach($scope.pageResponse.drivers,function(item){
    //         item.selected = selected;
    //     });
    // }
    var options = {
        searchFormId:"J_search_form",
        listUrl:"api/driver/queryDriversByKeyword.htm" 
    };
    $tableListService.init($scope, options);
    $tableListService.get();
    $scope.delete=function(item){
        layer.confirm('您确定要删除吗？', {icon: 3, title:'提示'},function(){
            $myHttpService.post("api/driver/deleteDriver.htm",item,function(){
                $state.go("app.driver.list",{},{reload: true});
                layer.msg("删除成功！",{offset: '100px'})
            });
        },function(index){
            layer.close(index);
        });
    }
});

/**
 * 司机编辑控制器
 */
app.controller('DriverEditController',function($tableListService,$rootScope,$scope,$myHttpService,$state,$localStorage,$stateParams,$filter,md5,$timeout){
    $scope.editMode = !!$stateParams.id;//检测有没有ID，判断当前是添加还是编辑，共用一套模板
    $scope.driver = {};
    $scope.driver.company = '0';
    
    if($scope.editMode){//编辑模式
        var options={
            searchFormId:'J_search_form',
            size: '9999',
            listUrl:'api/unit/queryUnitlistByKeyword',
            multiTable: 'companyList',
            callback: function(){
                $scope.driver = {
                        driverid:$stateParams.id
                };
                //获取司机内容
                $myHttpService.post("api/driver/queryDriverInfo.htm",$scope.driver,function(data){
                    $scope.driver = data.driver;
                },function(){
                    $timeout(function(){
                        $state.go('app.driver.list');
                    },3000)
                });
            }
        };
        $tableListService.init($scope, options);
        $tableListService.get();
        
        $scope.submit = function(){
            //提交表单到服务器地址
            console.log($scope.driver);
            $myHttpService.post("api/driver/updateDriverInfo.htm",$scope.driver,function(data){
                layer.msg("修改成功！",{offset: '100px'});
                // $timeout(function(){
                    $state.go('app.driver.list');
                // },1000)
            },function(){
                // $timeout(function(){
                    $state.go('app.driver.list');
                // },1000)
            });
        };
        $scope.delete=function(item){
            layer.confirm('您确定要删除吗？', {icon: 3, title:'提示'},function(){
                $myHttpService.post("api/driver/deleteDriver.htm",item,function(){
                    layer.msg("删除成功！",{offset: '100px'})
                    $state.go("app.driver.list",{},{reload: true});
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
        $scope.driver = {city:"武汉市",sex:"男"};
        //当前页面的错误
        //提交添加司机的表单
        $scope.submit = function(){
            //提交表单到服务器地址
            console.log($scope.driver);
            $myHttpService.post("api/driver/insertDriver.htm",$scope.driver,function(data){
                layer.msg("添加成功！",{offset: '100px'})
                $state.go("app.driver.add",{},{reload:true});
            });
        }
    }
});