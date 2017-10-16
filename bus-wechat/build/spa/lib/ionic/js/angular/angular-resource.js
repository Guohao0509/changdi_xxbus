!function(window,angular,undefined){"use strict";function isValidDottedPath(path){return null!=path&&""!==path&&"hasOwnProperty"!==path&&MEMBER_NAME_REGEX.test("."+path)}function lookupDottedPath(obj,path){if(!isValidDottedPath(path))throw $resourceMinErr("badmember",'Dotted member path "@{0}" is invalid.',path);for(var keys=path.split("."),i=0,ii=keys.length;i<ii&&angular.isDefined(obj);i++){var key=keys[i];obj=null!==obj?obj[key]:undefined}return obj}function shallowClearAndCopy(src,dst){dst=dst||{},angular.forEach(dst,function(value,key){delete dst[key]});for(var key in src)!src.hasOwnProperty(key)||"$"===key.charAt(0)&&"$"===key.charAt(1)||(dst[key]=src[key]);return dst}var $resourceMinErr=angular.$$minErr("$resource"),MEMBER_NAME_REGEX=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;angular.module("ngResource",["ng"]).provider("$resource",function(){var PROTOCOL_AND_DOMAIN_REGEX=/^https?:\/\/[^\/]*/,provider=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},delete:{method:"DELETE"}}},this.$get=["$http","$log","$q","$timeout",function($http,$log,$q,$timeout){function encodeUriSegment(val){return encodeUriQuery(val,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function encodeUriQuery(val,pctEncodeSpaces){return encodeURIComponent(val).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,pctEncodeSpaces?"%20":"+")}function Route(template,defaults){this.template=template,this.defaults=extend({},provider.defaults,defaults),this.urlParams={}}function resourceFactory(url,paramDefaults,actions,options){function extractParams(data,actionParams){var ids={};return actionParams=extend({},paramDefaults,actionParams),forEach(actionParams,function(value,key){isFunction(value)&&(value=value()),ids[key]=value&&value.charAt&&"@"==value.charAt(0)?lookupDottedPath(data,value.substr(1)):value}),ids}function defaultResponseInterceptor(response){return response.resource}function Resource(value){shallowClearAndCopy(value||{},this)}var route=new Route(url,options);return actions=extend({},provider.defaults.actions,actions),Resource.prototype.toJSON=function(){var data=extend({},this);return delete data.$promise,delete data.$resolved,data},forEach(actions,function(action,name){var hasBody=/^(POST|PUT|PATCH)$/i.test(action.method),numericTimeout=action.timeout,cancellable=angular.isDefined(action.cancellable)?action.cancellable:options&&angular.isDefined(options.cancellable)?options.cancellable:provider.defaults.cancellable;numericTimeout&&!angular.isNumber(numericTimeout)&&($log.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."),delete action.timeout,numericTimeout=null),Resource[name]=function(a1,a2,a3,a4){var data,success,error,params={};switch(arguments.length){case 4:error=a4,success=a3;case 3:case 2:if(!isFunction(a2)){params=a1,data=a2,success=a3;break}if(isFunction(a1)){success=a1,error=a2;break}success=a2,error=a3;case 1:isFunction(a1)?success=a1:hasBody?data=a1:params=a1;break;case 0:break;default:throw $resourceMinErr("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var timeoutDeferred,numericTimeoutPromise,isInstanceCall=this instanceof Resource,value=isInstanceCall?data:action.isArray?[]:new Resource(data),httpConfig={},responseInterceptor=action.interceptor&&action.interceptor.response||defaultResponseInterceptor,responseErrorInterceptor=action.interceptor&&action.interceptor.responseError||undefined;forEach(action,function(value,key){switch(key){default:httpConfig[key]=copy(value);break;case"params":case"isArray":case"interceptor":case"cancellable":}}),!isInstanceCall&&cancellable&&(timeoutDeferred=$q.defer(),httpConfig.timeout=timeoutDeferred.promise,numericTimeout&&(numericTimeoutPromise=$timeout(timeoutDeferred.resolve,numericTimeout))),hasBody&&(httpConfig.data=data),route.setUrlParams(httpConfig,extend({},extractParams(data,action.params||{}),params),action.url);var promise=$http(httpConfig).then(function(response){var data=response.data;if(data){if(angular.isArray(data)!==!!action.isArray)throw $resourceMinErr("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",name,action.isArray?"array":"object",angular.isArray(data)?"array":"object",httpConfig.method,httpConfig.url);if(action.isArray)value.length=0,forEach(data,function(item){"object"==typeof item?value.push(new Resource(item)):value.push(item)});else{var promise=value.$promise;shallowClearAndCopy(data,value),value.$promise=promise}}return response.resource=value,response},function(response){return(error||noop)(response),$q.reject(response)});return promise.finally(function(){value.$resolved=!0,!isInstanceCall&&cancellable&&(value.$cancelRequest=angular.noop,$timeout.cancel(numericTimeoutPromise),timeoutDeferred=numericTimeoutPromise=httpConfig.timeout=null)}),promise=promise.then(function(response){var value=responseInterceptor(response);return(success||noop)(value,response.headers),value},responseErrorInterceptor),isInstanceCall?promise:(value.$promise=promise,value.$resolved=!1,cancellable&&(value.$cancelRequest=timeoutDeferred.resolve),value)},Resource.prototype["$"+name]=function(params,success,error){isFunction(params)&&(error=success,success=params,params={});var result=Resource[name].call(this,params,this,success,error);return result.$promise||result}}),Resource.bind=function(additionalParamDefaults){return resourceFactory(url,extend({},paramDefaults,additionalParamDefaults),actions)},Resource}var noop=angular.noop,forEach=angular.forEach,extend=angular.extend,copy=angular.copy,isFunction=angular.isFunction;return Route.prototype={setUrlParams:function(config,params,actionUrl){var val,encodedVal,self=this,url=actionUrl||self.template,protocolAndDomain="",urlParams=self.urlParams={};forEach(url.split(/\W/),function(param){if("hasOwnProperty"===param)throw $resourceMinErr("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(param)&&param&&new RegExp("(^|[^\\\\]):"+param+"(\\W|$)").test(url)&&(urlParams[param]={isQueryParamValue:new RegExp("\\?.*=:"+param+"(?:\\W|$)").test(url)})}),url=url.replace(/\\:/g,":"),url=url.replace(PROTOCOL_AND_DOMAIN_REGEX,function(match){return protocolAndDomain=match,""}),params=params||{},forEach(self.urlParams,function(paramInfo,urlParam){val=params.hasOwnProperty(urlParam)?params[urlParam]:self.defaults[urlParam],angular.isDefined(val)&&null!==val?(encodedVal=paramInfo.isQueryParamValue?encodeUriQuery(val,!0):encodeUriSegment(val),url=url.replace(new RegExp(":"+urlParam+"(\\W|$)","g"),function(match,p1){return encodedVal+p1})):url=url.replace(new RegExp("(/?):"+urlParam+"(\\W|$)","g"),function(match,leadingSlashes,tail){return"/"==tail.charAt(0)?tail:leadingSlashes+tail})}),self.defaults.stripTrailingSlashes&&(url=url.replace(/\/+$/,"")||"/"),url=url.replace(/\/\.(?=\w+($|\?))/,"."),config.url=protocolAndDomain+url.replace(/\/\\\./,"/."),forEach(params,function(value,key){self.urlParams[key]||(config.params=config.params||{},config.params[key]=value)})}},resourceFactory}]})}(window,window.angular);