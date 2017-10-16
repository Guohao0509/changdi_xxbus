app.controller("ScheduleEditController",function($rootScope,$scope,$http,$state,$localStorage,$stateParams,$filter,$tableListService,$myHttpService){if($scope.editMode=!!$stateParams.id,$scope.editMode){options={searchFormId:"J_search_form",size:"9999",listUrl:"api/unit/queryUnitlistByKeyword",multiTable:"companyList",callback:function(){$myHttpService.post("api/buslineSchedule/queryBuslineSchedule",{bsid:$stateParams.id},function(data){$scope.stopStationMap=data.buslineSchedulePrices,$scope.schedule=data.buslineSchedule,$scope.route=data.busline,$scope.bus=data.car,$scope.driver=data.driver;var times=$scope.schedule.departtime.split(":");$scope.schedule.departtimetemp=new Date(2001,1,1,times[0],times[1],0);var times2=$scope.schedule.arrivetime.split(":");$scope.schedule.arrivetimetemp=new Date(2001,1,1,times2[0],times2[1],0)})}};$tableListService.init($scope,options),$tableListService.get()}else{var options={searchFormId:"J_search_form",size:"9999",listUrl:"api/unit/queryUnitlistByKeyword",multiTable:"companyList"};$tableListService.init($scope,options),$tableListService.get(),$scope.schedule={bsstatus:0,chargingtype:0,departtimetemp:new Date(2001,1,1,8,0,0),arrivetimetemp:new Date(2001,1,1,9,0,0),backDeparttimetemp:new Date(2001,1,1,18,0,0),backArrivetimetemp:new Date(2001,1,1,17,0,0)},$scope.route={},$scope.driver={},$scope.bus={}}$scope.routeEditMode=!1,$scope.driverEditMode=!1,$scope.busEditMode=!1,$scope.changeRouteToggle=function($rootScope){$scope.driverEditMode=!1,$scope.busEditMode=!1,$scope.routeEditMode=!$scope.routeEditMode,$scope.routeEditMode&&($tableListService.init($scope,{searchFormId:"J_search_form",listUrl:"api/busline/queryBuslineByCompany"}),$tableListService.get())},$scope.changeDriverToggle=function(){$scope.routeEditMode=!1,$scope.busEditMode=!1,$scope.driverEditMode=!$scope.driverEditMode,$scope.driverEditMode&&($tableListService.init($scope,{searchFormId:"J_search_form2",listUrl:"api/driver/queryDriversByCompany"}),$tableListService.get())},$scope.changeBusToggle=function(){$scope.routeEditMode=!1,$scope.driverEditMode=!1,$scope.busEditMode=!$scope.busEditMode,$scope.busEditMode&&($tableListService.init($scope,{searchFormId:"J_search_form3",listUrl:"api/car/queryCarlistByCompany"}),$tableListService.get())},$scope.changeRoute=function(item){$scope.route=item,$scope.routeEditMode=!1,$scope.driverEditMode=!1,$scope.busEditMode=!1},$scope.changeDriver=function(item){$scope.driver=item,$scope.routeEditMode=!1,$scope.driverEditMode=!1,$scope.busEditMode=!1},$scope.changeBus=function(item){$scope.bus=item,$scope.routeEditMode=!1,$scope.driverEditMode=!1,$scope.busEditMode=!1},$scope.$watch("schedule.company",function(){$scope.routeEditMode=!1,$scope.driverEditMode=!1,$scope.busEditMode=!1,$scope.route={},$scope.driver={},$scope.bus={}}),$scope.submit=function(){$scope.schedule.lineid=$scope.route.lineid,$scope.schedule.driverid=$scope.driver.driverid,$scope.schedule.carid=$scope.bus.carid,$scope.schedule.platenum=$scope.bus.platenum,$scope.schedule.departtime=$filter("date")($scope.schedule.departtimetemp,"HH:mm"),$scope.schedule.arrivetime=$filter("date")($scope.schedule.arrivetimetemp,"HH:mm"),$scope.editMode?$myHttpService.post("api/buslineSchedule/updateBuslineSchedule.htm",$scope.schedule,function(data){layer.msg("修改成功！",{offset:"100px"}),$state.go("app.schedule.list",{},{reload:!0})}):$myHttpService.post("api/buslineSchedule/insertBuslineSchedule.htm",$scope.schedule,function(data){layer.msg("添加成功！",{offset:"100px"}),$state.go("app.schedule.add",{},{reload:!0})})}}),app.controller("ScheduleListController",function($rootScope,$scope,$http,$state,$localStorage,$stateParams,$filter,$tableListService,$myHttpService){var selected=!1;$scope.selectAll=function(){selected=!selected,angular.forEach($scope.content,function(item){item.selected=selected})};var options={searchFormId:"J_search_form",listUrl:"api/buslineSchedule/queryBuslineScheduleByKeyword.htm",callback:function(scope,data){console.log(data)}};$tableListService.init($scope,options),$tableListService.get(),$scope.delete=function(item){layer.confirm("您确定要删除吗？",{icon:3,title:"提示"},function(){$myHttpService.post("api/buslineSchedule/deleteBuslineSchedule.htm",item,function(){$state.go("app.schedule.list",{},{reload:!0}),layer.msg("删除成功！",{offset:"100px"})})},function(index){layer.close(index)})}});