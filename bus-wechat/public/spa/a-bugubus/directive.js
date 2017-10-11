/**
 * input自动聚焦指令，进入页面时会自动聚焦，触摸其他元素时自动失焦
 * 用法
 * <input type="text" focus-auto>
 */
app.directive('focusAuto', function($document) {
    return {
        link: function(scope, element, attrs) {
            element[0].id = "J_focus_auto_"+new Date().getTime();
            document.body.addEventListener('touchstart',function(e){
                if(e.target.id!=element[0].id){
                    element[0].blur();
                }
            });
            element[0].focus();
        }
    }
});
//=====
//生成条形码指令
//
// app.directive('barcode',function($document){
//     return {
//         link:function(scope,element,attrs){
//             var id = "J_barcode"+new Date().getTime();
//             element[0].id = id;
//             JsBarcode("#"+id,scope.$parent.$eval(attrs.ngModel));
//             scope.$watch(attrs.ngModel,function(newValue,oldValue){
//                 JsBarcode("#"+id,newValue); //重新绘图
//             })
//         }
//     }
// });
// =====
//过滤器，字面量转义输出
//=====
app.filter('transfer',function(){
    return function(input,fieldName){
        if(fieldName==undefined){
            alert("变量名称不能为空");
        }else{
            //定义字面量
            var dict  = {
                sex:{
                    "0":"男",
                    "1":"女"
                },
                ticketStatus:{
                    "0":"车票已过期",
                    "1":"车票有效"
                }
            };
            return dict[fieldName][input];
        }

    }
});
/*滑动*/
app.directive('touch',function(){
    return {
        //startX触摸开始的坐标，moveX滑动的距离,
        link:function($scope,element,attr){
            var startX,
                moveX;
            var dom=element[0];
            dom.addEventListener('touchstart',function(e){
                if(dom){
                    startX= e.targetTouches[0].pageX;
                }

            });
            dom.addEventListener('touchmove',function(e){
                var targetMarginLeft = dom.style.marginLeft.replace('px','');
                moveX = e.changedTouches[0].pageX;
                if(targetMarginLeft>=0&&(startX-moveX)<0){

                }else if(targetMarginLeft>=-80&&(startX-moveX)<0){
                    dom.style.marginLeft=-(startX-moveX)-80+'px';
                }else if(targetMarginLeft>-80){
                    if((startX-moveX)>=80){
                        dom.style.marginLeft=-80+'px';
                    }else{
                        dom.style.marginLeft=-(startX-moveX)+'px';
                    }
                }
            });
            dom.addEventListener('touchend',function(e){
                var endX = e.changedTouches[0].pageX;
                if(startX-endX>30){
                    var interval = setInterval(function(){

                        var targetMarginLeft = dom.style.marginLeft.replace('px','');

                        if(targetMarginLeft>-80){
                            var temp = --targetMarginLeft;
                            dom.style.marginLeft = --temp+'px';
                        }else{
                            clearInterval(interval);
                            dom.style.marginLeft = -80 +'px';
                        }
                    },2)
                }else{
                    var interval = setInterval(function(){
                        var targetMarginLeft = dom.style.marginLeft.replace('px','');
                        if(targetMarginLeft<0){
                            var temp = ++targetMarginLeft;
                            dom.style.marginLeft = ++temp+'px';
                        }else{
                            clearInterval(interval);
                            dom.style.marginLeft = -0 +'px';
                        }
                    },2)
                }
            });

        }
    }
});
/*选星星*/
// app.directive('xinxin',function(){
//     return{
//         link:function($scope,element,attr){
//             var startX;
//             var moveX;
//             var dom=element[0];
//                 dom.addEventListener('touchstart',function(e){
//                     if(dom){
//                         startX= e.targetTouches[0].pageX;

//                     }
//                 });

//         }
//     }
// });


// app.directive('selectcity',function($window){
//     return{
//         restrict:'AE',
//         template:'<div  style="position: absolute;z-index: 4;top: 44px;left: -1px">' +
//         '<i style="position: absolute;left:20px;top:-10px;width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 14px solid #ffffff;"></i>' +
//         '<div style="background-color: #ffffff;border-radius: 4px;min-width: 60px;">贵州市</div>' +
//         '</div>',
//         //{{city.cityname}}
//         replace:true,
//         link:function($scope,element,attr){
//             $scope.city={
//                 cityname:'贵州市'
//             };
//            var dom=element[0];
//             dom.addEventListener('touchend',function(e){
//                 if(dom){
//                     if($scope.city.cityname!=$scope.positionCity){
//                         $scope.check=true;
//                         $scope.positionCity=$scope.city.cityname;
//                         //$window.localStorage.setItem('cityKEY',$scope.city.cityname);
//                     }else{
//                         $scope.check=true;
//                         //$window.localStorage.setItem('cityKEY',$scope.city.cityname);
//                     }
//                 }
//             })

//         }
//     }
// });








