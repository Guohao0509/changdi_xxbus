app.controller("BusEditController",function($tableListService,$rootScope,$scope,$http,$state,$localStorage,$stateParams,$myHttpService,$timeout){if($scope.editMode=!!$stateParams.id,$scope.editMode){var options={searchFormId:"J_search_form",size:"9999",listUrl:"api/unit/queryUnitlistByKeyword",multiTable:"companyList",callback:function(){$scope.bus={carid:$stateParams.id},$myHttpService.post("api/car/queryCarinfo.htm",$scope.bus,function(data){$scope.bus=data.carinfo})}};$tableListService.init($scope,options),$tableListService.get(),$scope.submit=function(){$myHttpService.post("api/car/updateCarinfo.htm",$scope.bus,function(){layer.msg("修改成功！",{offset:"100px"}),$timeout(function(){$state.go("app.bus.list")},1e3)})},$scope.delete=function(item){layer.confirm("您确定要删除吗？",{icon:3,title:"提示"},function(){$myHttpService.post("api/car/deleteCarinfo.htm",item,function(){layer.msg("删除成功！",{offset:"100px"}),window.setTimeout(function(){$state.go("app.bus.list",{},{reload:!0})},1e3)})},function(index){layer.close(index)})}}else{var options={searchFormId:"J_search_form",size:"9999",listUrl:"api/unit/queryUnitlistByKeyword",multiTable:"companyList"};$tableListService.init($scope,options),$tableListService.get(),$scope.bus={cartype:0},$scope.submiting=!1,$scope.submit=function(){$scope.submiting=!0,"0"==$scope.bus.cartype?$scope.bus.seatnum=46:"1"==$scope.bus.cartype?$scope.bus.seatnum=32:"2"==$scope.bus.cartype?$scope.bus.seatnum=19:"3"==$scope.bus.cartype&&($scope.bus.seatnum=13),$myHttpService.post("api/car/insertCarinfo.htm",$scope.bus,function(){$scope.submiting=!1,layer.msg("添加成功！",{offset:"100px"}),$state.go("app.bus.add",{},{reload:!0})},function(){$scope.submiting=!1})}}}),app.controller("BusListController",function($rootScope,$scope,$http,$state,$localStorage,$stateParams,$filter,$tableListService,$myHttpService){var selected=!1;$scope.selectAll=function(){selected=!selected,angular.forEach($scope.content,function(item){item.selected=selected})};var options={searchFormId:"J_search_form",listUrl:"api/car/queryCarlistByKeyword.htm"};$scope.delete=function(item){layer.confirm("您确定要删除吗？",{icon:3,title:"提示"},function(){$myHttpService.post("api/car/deleteCarinfo.htm",item,function(){layer.msg("删除成功！",{offset:"100px"}),window.setTimeout(function(){$state.go("app.bus.list",{},{reload:!0})},1e3)})},function(index){layer.close(index)})},$tableListService.init($scope,options),$tableListService.get()}),app.controller("BusPositionController",function($scope,$rootScope,$stateParams,$http,$myHttpService){function carPosition(){timing=5e3,$myHttpService.post("api/car/queryCarCurrLocation",{carid:carId},function(data){marker.setPosition(new AMap.LngLat(data.carinfo.currlon,data.carinfo.currlat))})}var carId=$stateParams.carId,timing=0,map=new AMap.Map("J_map_canvas",{resizeEnable:!0,zoom:11}),marker=new AMap.Marker({});marker.setMap(map),carPosition();var timer=setInterval(carPosition,5e3);$scope.$on("$destroy",function(){clearInterval(timer)})});