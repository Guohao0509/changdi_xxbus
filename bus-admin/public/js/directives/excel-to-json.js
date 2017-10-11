angular.module('app.directives').directive('excelToJson', [function() {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			sendJson: '&',
		},
		templateUrl: '../../tpl/blocks/excel-to-json.html',
		controller: function($scope) {
		},
		link: function(scope, element, attrs) {
			var wb;//读取完成的数据
            function importf(obj) {//导入
                if(!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.readAsArrayBuffer(f);
                reader.onload = function(e) {
                    var data = e.target.result;
                    var wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                        type: 'base64'
                    });
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
					var json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
					scope.sendJson({data:json})
                };
            }
            function fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
			}
			
			var excel_upload=document.getElementById('excel_upload');
			excel_upload.onchange=function(e){
				importf(e.target);
			};
		}
	}
}]);