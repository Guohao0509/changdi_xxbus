app.controller("BusPositionController",["$scope",function(){var map=new AMap.Map("J_map_canvas",{resizeEnable:!0,center:[116.397428,39.90923],zoom:17});marker=new AMap.Marker({map:map,position:[116.397428,39.90923],icon:"http://webapi.amap.com/images/car.png",offset:new AMap.Pixel(-26,-13)})}]);