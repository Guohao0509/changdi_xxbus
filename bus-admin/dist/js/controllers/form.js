"use strict";app.controller("FormDemoCtrl",["$scope",function($scope){$scope.notBlackListed=function(value){var blacklist=["bad@domain.com","verybad@domain.com"];return-1===blacklist.indexOf(value)},$scope.val=15;var updateModel=function(val){$scope.$apply(function(){$scope.val=val})};angular.element("#slider").on("slideStop",function(data){updateModel(data.value)}),$scope.select2Number=[{text:"First",value:"One"},{text:"Second",value:"Two"},{text:"Third",value:"Three"}],$scope.list_of_string=["tag1","tag2"],$scope.select2Options={multiple:!0,simple_tags:!0,tags:["tag1","tag2","tag3","tag4"]},angular.element("#LinkInput").bind("click",function(event){event.stopPropagation()})}]);