app.controller('companyListController', ['$scope','$http','$myHttpService','$tableListService','$state', function($scope,$http,$myHttpService,$tableListService,$state) {
	var options={
        searchFormId:'J_search_form',
        listUrl:'api/unit/queryUnitlistByKeyword',
    };
    $tableListService.init($scope, options);
    $tableListService.get();
    // console.log($scope);
    $scope.delete = function(unitid){
		layer.confirm('您确定要删除吗？', {icon: 3, title:'提示'},function(){
			var reqParam = {
				unitid: unitid,
			}
            $myHttpService.post("api/unit/deleteUnit",reqParam,function(){
                layer.msg("删除成功！",{offset: '100px'})
                $state.go("app.company.list",{},{reload: true});
            });
        },function(index){
            layer.close(index);
        });
	}
}])
app.controller('addCompanyController', ['$scope','$myHttpService', '$state','md5', '$stateParams',function($scope, $myHttpService, $state,md5,$stateParams) {
	$scope.submit  = function() {
		var reqParam = {
			unitName: $scope.unitName,
		}
        $myHttpService.post('api/unit/insertUnit', reqParam, function(data){
            // console.log(data)
            layer.msg(data.msg,{offset: '100px'});
            $state.go('app.company.add',{},{reload: true});
        }, function(){
        })
	}
}])