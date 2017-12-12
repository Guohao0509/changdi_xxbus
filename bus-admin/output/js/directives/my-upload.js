angular.module("app.directives").directive("myUpload",function(FileUploader){var helper={getType:function(name){return"|"+name.slice(name.lastIndexOf(".")+1)+"|"},isImage:function(type,closeMsg){return-1!=="|jpg|png|jpeg|bmp|gif|".indexOf(type.toLowerCase())?!0:closeMsg?void 0:(layer.alert("请确定文件格式为|jpg|png|jpeg|bmp|gif|",{icon:7}),!1)},isDoc:function(type,closeMsg){return-1!=="|doc|docx|txt|".indexOf(type.toLowerCase())?!0:closeMsg?void 0:(layer.alert("请确定文件格式为|doc|docx|txt|",{icon:7}),!1)},isVideo:function(type,closeMsg){return-1!=="|rm|rmvb|avi|mp4|3gp|".indexOf(type.toLowerCase())?!0:closeMsg?void 0:(layer.alert("请确定文件格式为|rm|rmvb|avi|mp4|3gp|",{icon:7}),!1)},isMp3:function(type,closeMsg){return-1!=="|mp3|".indexOf(type.toLowerCase())?!0:closeMsg?void 0:(layer.alert("请确定文件格式为|mp3|",{icon:7}),!1)},isZip:function(type,closeMsg){return-1!=="|zip|rar|".indexOf(type.toLowerCase())?!0:closeMsg?void 0:(layer.alert("请确定文件格式为|zip|rar|",{icon:7}),!1)},uploadImgCheckedPx:function(f,w,h,msg,callback){if(w&&h){var reader=new FileReader;reader.onload=function(){var img=null;img=document.createElement("img"),document.body.appendChild(img),img.style.visibility="hidden",img.src=this.result;var imgwidth=img.naturalWidth,imgheight=img.naturalHeight;imgwidth!=w||imgheight!=h?(document.body.removeChild(img),msg?msg+=">":msg="",layer.confirm(msg+"尺寸建议"+w+"x"+h+"，确定上传吗？",{btn:["确定","取消"],cancel:function(){callback&&callback(!1)}},function(index){layer.close(index),callback&&callback(!0)},function(){callback&&callback(!1)})):callback&&callback(!0)},f&&reader.readAsDataURL(f)}else callback&&callback(!0)}};return{restrict:"E",replace:!0,scope:{filters:"@filters",response:"=response",size:"=size",callback:"@callback",width:"@width",height:"@height",msg:"@msg"},template:'<input type="file"  nv-file-select="" uploader="uploader" filters="{{filters}}" />',link:function(scope,element){element.bind("change",function(changeEvent){scope.$apply(function(){scope.selectedFile=changeEvent.target.files[0];var type=helper.getType(scope.selectedFile.name);helper.isImage(type,!0)?helper.uploadImgCheckedPx(scope.selectedFile,scope.width,scope.height,scope.msg,function(state){state?scope.uploader.uploadAll():scope.uploader.clearQueue()}):scope.uploader.uploadAll()})})},controller:function($scope){var uploader=$scope.uploader=new FileUploader({url:"/Handler/Upload.ashx",autoUpload:!1,removeAfterUpload:!0,queueLimit:1}),showMsg=function(itemSize,maxSize){return itemSize/1024>=maxSize?(layer.alert("文件大小必须小于"+maxSize.toFixed(0)+"KB",{icon:7}),!1):($scope.size=itemSize,!0)};uploader.filters.push({name:"imageFilter",fn:function(item){if(!showMsg(item.size,4096))return!1;var type=helper.getType(item.name);return helper.isImage(type)&&this.queue.length<5}},{name:"docFilter",fn:function(item){if(!showMsg(item.size,3072))return!1;var type=helper.getType(item.name);return helper.isDoc(type)}},{name:"videoFilter",fn:function(item){if(!showMsg(item.size,204800))return!1;var type=helper.getType(item.name);return helper.isVideo(type)}},{name:"mp3Filter",fn:function(item){if(!showMsg(item.size,20480))return!1;var type=helper.getType(item.name);return helper.isMp3(type)}},{name:"zipFilter",fn:function(item){if(!showMsg(item.size,20480))return!1;var type=helper.getType(item.name);return helper.isZip(type)}}),uploader.onWhenAddingFileFailed=function(item,filter,options){console.info("onWhenAddingFileFailed",item,filter,options)},uploader.onAfterAddingFile=function(fileItem){console.info("onAfterAddingFile",fileItem)},uploader.onAfterAddingAll=function(addedFileItems){console.info("onAfterAddingAll",addedFileItems)},uploader.onBeforeUploadItem=function(item){console.info("onBeforeUploadItem",item)},uploader.onProgressItem=function(fileItem,progress){console.info("onProgressItem",fileItem,progress)},uploader.onProgressAll=function(progress){console.info("onProgressAll",progress)},uploader.onSuccessItem=function(fileItem,response,status,headers){console.info("onSuccessItem",fileItem,response,status,headers),-1==response.indexOf("error")?($scope.response=response,$scope.callback&&$scope.$emit($scope.callback,response)):layer.alert(response,{icon:2})},uploader.onErrorItem=function(fileItem,response,status,headers){console.info("onErrorItem",fileItem,response,status,headers)},uploader.onCancelItem=function(fileItem,response,status,headers){console.info("onCancelItem",fileItem,response,status,headers)},uploader.onCompleteItem=function(fileItem,response,status,headers){console.info("onCompleteItem",fileItem,response,status,headers)},uploader.onCompleteAll=function(){console.info("onCompleteAll")}}}});