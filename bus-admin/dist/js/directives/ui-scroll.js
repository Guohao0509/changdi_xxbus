angular.module("app").directive("uiScroll",["$location","$anchorScroll",function($location,$anchorScroll){return{restrict:"AC",link:function(scope,el,attr){el.on("click",function(){$location.hash(attr.uiScroll),$anchorScroll()})}}}]);