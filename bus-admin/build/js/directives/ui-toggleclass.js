angular.module("app").directive("uiToggleClass",["$timeout","$document",function($timeout,$document){return{restrict:"AC",link:function(scope,el,attr){el.on("click",function(e){function magic(_class,target){for(var patt=new RegExp("\\s"+_class.replace(/\*/g,"[A-Za-z0-9-_]+").split(" ").join("\\s|\\s")+"\\s","g"),cn=" "+$(target)[0].className+" ";patt.test(cn);)cn=cn.replace(patt," ");$(target)[0].className=$.trim(cn)}e.preventDefault();var classes=attr.uiToggleClass.split(","),targets=attr.target&&attr.target.split(",")||Array(el),key=0;angular.forEach(classes,function(_class){var target=targets[targets.length&&key];-1!==_class.indexOf("*")&&magic(_class,target),$(target).toggleClass(_class),key++}),$(el).toggleClass("active")})}}}]);