/**
 * Created by 静静 on 2017/2/28.
 * 关于用户管理列表控制器
 */

app.controller('userListController',function($rootScope,$scope,$http,$state,$localStorage,$stateParams,$myHttpService,$tableListService,$modal){
    //全选
    // var selected = false;
    // $scope.selectAll = function(){
    //     selected = !selected;
    //     angular.forEach($scope.pageResponse.rows,function(item){
    //         item.selected = selected;
    //     });
    // }
    //搜索分页选项
    var options={
        searchFormId:'J_reg_form',
        listUrl:"api/user/queryUserListByKeword.htm"
    };
    $tableListService.init($scope, options);
    $tableListService.get();
    // console.log($scope);
    //查询注册时间
    $scope.useregtime = {
        opened:false,
        dateOptions:{
            datepickerMode:'day',
            showWeeks: false,
            minMode:'day'
        },
        format:"yyyy-MM-dd",
        clear:function(){
            $scope.regDate = null;
        },
        disabled:function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        },
        toggleMin: function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        },
        open:function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.useregtime.opened = true;
        }
    };

    //清空
    $scope.restData=function(){
        $scope.userid="";
        $scope.regDate="";
    };

    $scope.delete=function(userid){
        layer.confirm('您确定要删除吗？', {icon: 3, title:'提示'},function(){
            $myHttpService.post("api/user/deleteUserinfo",{userid:userid},function(){
                layer.msg("删除成功！",{offset: '100px'})
                $state.go("app.user.user_list",{},{reload: true});
            });
        },function(index){
            layer.close(index);
        });
    }

    //清空
    //$scope.restData=function(){
    //    var $form=$("#restData").closest("form");
    //    var $data = $form.find("[type='text']");
    //    $data.each(function(){
    //        $(this).val("");
    //    })
    //}

    // $scope.openUserDetailModal = function(userid){
    //     var Usermodel = $modal.open({
    //         templateUrl: 'a-bugubus/user/user_detasils.html',
    //         controller: 'UserDetailModalController',
    //         size: 'md',
    //         resolve: {
    //             userid: function () {
    //                 return userid;
    //             }
    //         }
    //     });
    // }
});
/**
 * 用户详情弹窗控制器
 */
// app.controller('UserDetailModalController', ['$scope', '$modalInstance', 'userid','$myHttpService',function($scope, $Usermodel , userid,$myHttpService) {
//     //发起车票ID的查询请求
//     var reqParam = {users:[{username:'郭浩',phone:'13419565191',sex:1,company:'郭浩'},{username:'郭浩',phone:'13419565194',sex:0,company:'郭浩'}]}
//     console.log(JSON.stringify(reqParam));
//     $myHttpService.post("api/user/insertUserInfoList",{data: JSON.stringify(reqParam)},function(data){
//         alert(data);
//     });
//     //车票详情
//     $scope.ok = function () {
//         $Usermodel .close();
//     };
// }]);

/**
 * 用户添加编辑控制器
 */
app.controller('userEditController',['$scope','$myHttpService','$tableListService','$stateParams','$timeout','$state',function($scope,$myHttpService,$tableListService,$stateParams,$timeout,$state){
    $scope.editMode = !!$stateParams.id;//检测有没有ID，判断当前是添加还是编辑，共用一套模板
    
    if($scope.editMode){//编辑模式
        var options={
            searchFormId:'J_search_form',
            listUrl:'api/unit/queryUnitlistByKeyword',
            size: '9999',
            multiTable: 'companyList',
            callback: function(){
                $myHttpService.post("api/user/queryUserinfo",{userid: $stateParams.id},function(data){
                    $scope.user = data.user
                },function(){
                    $timeout(function(){
                        $state.go('app.user.user_list');
                    },3000)
                });
            }
        };
        $tableListService.init($scope, options);
        $tableListService.get();
       
        $scope.submit = function(){
            var reqParam = {
                userid: $stateParams.id,
                username: $scope.user.username,
                sex: $scope.user.sex,
                company: $scope.user.company,
                phone: $scope.user.phone
            };
            //获取司机内容
            if(!$scope.user.sex){
                reqParam.sex = '0';
            }
            // console.log(reqParam)
            console.log(reqParam)
            $myHttpService.post("api/user/updateUserinfo",reqParam,function(data){
                layer.msg('编辑用户成功');
                $state.go("app.user.user_list",{},{reload: true});
            },function(){
                $timeout(function(){
                    $state.go('app.user.user_list');
                },3000)
            });
        };
        
    }else{ //添加模式
        var options={
            searchFormId:'J_search_form',
            size: '9999',
            listUrl:'api/unit/queryUnitlistByKeyword',
            multiTable: 'companyList'
        };
        $tableListService.init($scope, options);
        $tableListService.get();
        $scope.submit = function(){
            //获取司机内容
            var reqParam = {users:[{
                username: $scope.user.username,
                company: $scope.user.company,
                phone: $scope.user.phone
            }]}
            angular.forEach(reqParam.users,function(ele, index){
                if(!ele.sex){
                    ele.sex = '0';
                }
            })
            $myHttpService.post("api/user/insertUserInfoList",{data: JSON.stringify(reqParam)},function(data){
                layer.msg('添加用户成功');
                $state.go("app.user.user_list",{},{reload: true});
            },function(){
                $timeout(function(){
                    $state.go('app.user.user_list');
                },3000)
            });
        };
    }
}])
app.controller('usersAddController',['$scope','$myHttpService','$tableListService','$timeout','$state',function($scope,$myHttpService,$tableListService,$timeout,$state){
    $scope.users = {}
    $scope.usersData = [];
    var options={
        searchFormId:'J_search_form',
        listUrl:'api/unit/queryUnitlistByKeyword',
        size: '9999',
        multiTable: 'companyList',
    };
    $tableListService.init($scope, options);
    $tableListService.get();
    $scope.$watch('users.company',function(newVal){
        if(!$scope.companyList){
            return;
        }
        angular.forEach($scope.companyList.units,function(item, index){
            if(newVal == item.unitid){
                $scope.companyName = item.unitName
            }
        })
        if($scope.usersData.length > 0){
            $scope.updateCompany();
        }
    })
    $scope.json = function(data){
        data.splice(0, 1)
        $scope.haveErr = false;
        $scope.usersData = []
        usersForm.reset();
        if($scope.users.company == '0'){
            layer.msg('请先选择运营单位');
            $scope.reset()
            return;
        }
        var reg = /^1[3|5|7|8]\d{9}$/;
        for(var i = 0; i < data.length; i++){
            var tmpObj = {};
            tmpObj.company = $scope.users.company
            tmpObj.phone = data[i].phone
            tmpObj.username = data[i].username;
            if(data[i].sex == '男'){
                tmpObj.sex = '0'
            }else if(data[i].sex == '女'){
                tmpObj.sex = '1'
            }else{
                tmpObj.error = true;
                $scope.haveErr = true;
            }
            if(!reg.test(data[i].phone)){
                tmpObj.error = true;
                $scope.haveErr = true;
            }
            $scope.usersData.push(tmpObj);
        }
        
        $scope.$apply();
    }
    $scope.updateCompany = function(){
        var reg = /^1[3|5|7|8]\d{9}$/;
        for(var i = 0; i < $scope.usersData.length; i++){
            $scope.usersData[i].company = $scope.users.company
        }
    }
    $scope.reset = function(){
        usersForm.reset();
        $scope.usersData = []
        $scope.users = {company: '0'}
    }
    $scope.submit = function(){
        // console.log($scope.usersData == null)
        // console.log($scope.haveErr)
        
        if($scope.usersData.length <= 0 || $scope.haveErr){
            layer.msg('您上传的表格数据有误，请修改后重新上传')
            return;
        }
        $scope.submiting = true;
        var reqParam = {
            users: $scope.usersData
        };
        // console.log(JSON.stringify(reqParam))
        $myHttpService.post("api/user/insertUserInfoList",{data: JSON.stringify(reqParam)},function(data){
            layer.msg('添加用户成功');
            $scope.submiting = false;    
        },function(){
            $timeout(function(){
                $state.go('app.user.user_list');
            },3000)
        });
    };
    
}])
