"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(e,t,r){"use strict";function n(e,t){return R(new(R(function(){},{prototype:e})),t)}function i(e){return N(arguments,function(t){t!==e&&N(t,function(t,r){e.hasOwnProperty(r)||(e[r]=t)})}),e}function a(e,t){var r=[];for(var n in e.path){if(e.path[n]!==t.path[n])break;r.push(e.path[n])}return r}function o(e){if(Object.keys)return Object.keys(e);var r=[];return t.forEach(e,function(e,t){r.push(t)}),r}function u(e,t){if(Array.prototype.indexOf)return e.indexOf(t,Number(arguments[2])||0);var r=e.length>>>0,n=Number(arguments[2])||0;for((n=n<0?Math.ceil(n):Math.floor(n))<0&&(n+=r);n<r;n++)if(n in e&&e[n]===t)return n;return-1}function s(e,t,r,n){var i,s=a(r,n),l={},c=[];for(var f in s)if(s[f].params&&(i=o(s[f].params)).length)for(var p in i)u(c,i[p])>=0||(c.push(i[p]),l[i[p]]=e[i[p]]);return R({},l,t)}function l(e,t,r){if(!r){r=[];for(var n in e)r.push(n)}for(var i=0;i<r.length;i++){var a=r[i];if(e[a]!=t[a])return!1}return!0}function c(e,t){var r={};return N(e,function(e){r[e]=t[e]}),r}function f(e){var t={},r=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var n in e)-1==u(r,n)&&(t[n]=e[n]);return t}function p(e,t){var r=F(e),n=r?[]:{};return N(e,function(e,i){t(e,i)&&(n[r?n.length:i]=e)}),n}function h(e,t){var r=F(e)?[]:{};return N(e,function(e,n){r[n]=t(e,n)}),r}function v(e,t){var n=1,a=2,s={},l=[],c=s,p=R(e.when(s),{$$promises:s,$$values:s});this.study=function(s){function h(e,r){if(g[r]!==a){if(m.push(r),g[r]===n)throw m.splice(0,u(m,r)),new Error("Cyclic dependency: "+m.join(" -> "));if(g[r]=n,V(e))d.push(r,[function(){return t.get(e)}],l);else{var i=t.annotate(e);N(i,function(e){e!==r&&s.hasOwnProperty(e)&&h(s[e],e)}),d.push(r,e,i)}m.pop(),g[r]=a}}function v(e){return M(e)&&e.then&&e.$$promises}if(!M(s))throw new Error("'invocables' must be an object");var $=o(s||{}),d=[],m=[],g={};return N(s,h),s=m=g=null,function(n,a,o){function u(){--w||(y||i(g,a.$$values),h.$$values=g,h.$$promises=h.$$promises||!0,delete h.$$inheritedValues,l.resolve(g))}function s(e){h.$$failure=e,l.reject(e)}if(v(n)&&o===r&&(o=a,a=n,n=null),n){if(!M(n))throw new Error("'locals' must be an object")}else n=c;if(a){if(!v(a))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else a=p;var l=e.defer(),h=l.promise,m=h.$$promises={},g=R({},n),w=1+d.length/3,y=!1;if(k(a.$$failure))return s(a.$$failure),h;a.$$inheritedValues&&i(g,f(a.$$inheritedValues,$)),R(m,a.$$promises),a.$$values?(y=i(g,f(a.$$values,$)),h.$$inheritedValues=f(a.$$values,$),u()):(a.$$inheritedValues&&(h.$$inheritedValues=f(a.$$inheritedValues,$)),a.then(u,s));for(var b=0,E=d.length;b<E;b+=3)n.hasOwnProperty(d[b])?u():function(r,i,a){function l(e){f.reject(e),s(e)}function c(){if(!k(h.$$failure))try{f.resolve(t.invoke(i,o,g)),f.promise.then(function(e){g[r]=e,u()},l)}catch(e){l(e)}}var f=e.defer(),p=0;N(a,function(e){m.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&(p++,m[e].then(function(t){g[e]=t,--p||c()},l))}),p||c(),m[r]=f.promise}(d[b],d[b+1],d[b+2]);return h}},this.resolve=function(e,t,r,n){return this.study(e)(t,r,n)}}function $(e,t,r){this.fromConfig=function(e,t,r){return k(e.template)?this.fromString(e.template,t):k(e.templateUrl)?this.fromUrl(e.templateUrl,t):k(e.templateProvider)?this.fromProvider(e.templateProvider,t,r):null},this.fromString=function(e,t){return I(e)?e(t):e},this.fromUrl=function(r,n){return I(r)&&(r=r(n)),null==r?null:e.get(r,{cache:t,headers:{Accept:"text/html"}}).then(function(e){return e.data})},this.fromProvider=function(e,t,n){return r.invoke(e,null,n||{params:t})}}function d(e,t,i){function a(t,r,n,i){if(d.push(t),v[t])return v[t];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(t))throw new Error("Invalid parameter name '"+t+"' in pattern '"+e+"'");if($[t])throw new Error("Duplicate parameter name '"+t+"' in pattern '"+e+"'");return $[t]=new U.Param(t,r,n,i),$[t]}function o(e,t,r){var n=["",""],i=e.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!t)return i;switch(r){case!1:n=["(",")"];break;case!0:n=["?(",")?"];break;default:n=["("+r+"|",")?"]}return i+n[0]+t+n[1]}function u(r,i){var a,o,u,s,l;return a=r[2]||r[3],l=t.params[a],u=e.substring(p,r.index),o=i?r[4]:r[4]||("*"==r[1]?".*":null),s=U.type(o||"string")||n(U.type("string"),{pattern:new RegExp(o)}),{id:a,regexp:o,segment:u,type:s,cfg:l}}t=R({params:{}},M(t)?t:{});var s,l=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,c=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,f="^",p=0,h=this.segments=[],v=i?i.params:{},$=this.params=i?i.params.$$new():new U.ParamSet,d=[];this.source=e;for(var m,g,w;(s=l.exec(e))&&!((m=u(s,!1)).segment.indexOf("?")>=0);)g=a(m.id,m.type,m.cfg,"path"),f+=o(m.segment,g.type.pattern.source,g.squash),h.push(m.segment),p=l.lastIndex;var y=(w=e.substring(p)).indexOf("?");if(y>=0){var b=this.sourceSearch=w.substring(y);if(w=w.substring(0,y),this.sourcePath=e.substring(0,p+y),b.length>0)for(p=0;s=c.exec(b);)g=a((m=u(s,!0)).id,m.type,m.cfg,"search"),p=l.lastIndex}else this.sourcePath=e,this.sourceSearch="";f+=o(w)+(!1===t.strict?"/?":"")+"$",h.push(w),this.regexp=new RegExp(f,t.caseInsensitive?"i":r),this.prefix=h[0],this.$$paramNames=d}function m(e){R(this,e)}function g(){function e(e){return null!=e?e.toString().replace(/\//g,"%2F"):e}function i(){return{strict:v,caseInsensitive:f}}function a(e){return I(e)||F(e)&&I(e[e.length-1])}function s(){for(;b.length;){var e=b.shift();if(e.pattern)throw new Error("You cannot override a type's .pattern at runtime.");t.extend(w[e.name],c.invoke(e.def))}}function l(e){R(this,e||{})}U=this;var c,f=!1,v=!0,$=!1,w={},y=!0,b=[],E={string:{encode:e,decode:function(e){return null!=e?e.toString().replace(/%2F/g,"/"):e},is:function(e){return this.pattern.test(e)},pattern:/[^/]*/},int:{encode:e,decode:function(e){return parseInt(e,10)},is:function(e){return k(e)&&this.decode(e.toString())===e},pattern:/\d+/},bool:{encode:function(e){return e?1:0},decode:function(e){return 0!==parseInt(e,10)},is:function(e){return!0===e||!1===e},pattern:/0|1/},date:{encode:function(e){return this.is(e)?[e.getFullYear(),("0"+(e.getMonth()+1)).slice(-2),("0"+e.getDate()).slice(-2)].join("-"):r},decode:function(e){if(this.is(e))return e;var t=this.capture.exec(e);return t?new Date(t[1],t[2]-1,t[3]):r},is:function(e){return e instanceof Date&&!isNaN(e.valueOf())},equals:function(e,t){return this.is(e)&&this.is(t)&&e.toISOString()===t.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:t.toJson,decode:t.fromJson,is:t.isObject,equals:t.equals,pattern:/[^/]*/},any:{encode:t.identity,decode:t.identity,is:t.identity,equals:t.equals,pattern:/.*/}};g.$$getDefaultValue=function(e){if(!a(e.value))return e.value;if(!c)throw new Error("Injectable functions cannot be called at configuration time");return c.invoke(e.value)},this.caseInsensitive=function(e){return k(e)&&(f=e),f},this.strictMode=function(e){return k(e)&&(v=e),v},this.defaultSquashPolicy=function(e){if(!k(e))return $;if(!0!==e&&!1!==e&&!V(e))throw new Error("Invalid squash policy: "+e+". Valid policies: false, true, arbitrary-string");return $=e,e},this.compile=function(e,t){return new d(e,R(i(),t))},this.isMatcher=function(e){if(!M(e))return!1;var t=!0;return N(d.prototype,function(r,n){I(r)&&(t=t&&k(e[n])&&I(e[n]))}),t},this.type=function(e,t,r){if(!k(t))return w[e];if(w.hasOwnProperty(e))throw new Error("A type named '"+e+"' has already been defined.");return w[e]=new m(R({name:e},t)),r&&(b.push({name:e,def:r}),y||s()),this},N(E,function(e,t){w[t]=new m(R({name:t},e))}),w=n(w,{}),this.$get=["$injector",function(e){return c=e,y=!1,s(),N(E,function(e,t){w[t]||(w[t]=new m(e))}),this}],this.Param=function(e,t,n,i){function s(){if(!c)throw new Error("Injectable functions cannot be called at configuration time");return c.invoke(n.$$fn)}var l=this;n=function(e){var t=M(e)?o(e):[];return-1===u(t,"value")&&-1===u(t,"type")&&-1===u(t,"squash")&&-1===u(t,"array")&&(e={value:e}),e.$$fn=a(e.value)?e.value:function(){return e.value},e}(n),t=function(t,r,n){if(t.type&&r)throw new Error("Param '"+e+"' has two type configurations.");return r||(t.type?t.type instanceof m?t.type:new m(t.type):"config"===n?w.any:w.string)}(n,t,i);var f=function(){var t={array:"search"===i&&"auto"},r=e.match(/\[\]$/)?{array:!0}:{};return R(t,r,n).array}();"string"!==(t=f?t.$asArray(f,"search"===i):t).name||f||"path"!==i||n.value!==r||(n.value="");var v=n.value!==r,d=function(e,t){var r=e.squash;if(!t||!1===r)return!1;if(!k(r)||null==r)return $;if(!0===r||V(r))return r;throw new Error("Invalid squash policy: '"+r+"'. Valid policies: false, true, or arbitrary string")}(n,v),g=function(e,t,n,i){var a,o,s=[{from:"",to:n||t?r:""},{from:null,to:n||t?r:""}];return a=F(e.replace)?e.replace:[],V(i)&&a.push({from:i,to:r}),o=h(a,function(e){return e.from}),p(s,function(e){return-1===u(o,e.from)}).concat(a)}(n,f,v,d);R(this,{id:e,type:t,location:i,array:f,squash:d,replace:g,isOptional:v,value:function(e){function t(e){return function(t){return t.from===e}}return e=function(e){var r=h(p(l.replace,t(e)),function(e){return e.to});return r.length?r[0]:e}(e),k(e)?l.type.decode(e):s()},dynamic:r,config:n,toString:function(){return"{Param:"+e+" "+t+" squash: '"+d+"' optional: "+v+"}"}})},l.prototype={$$new:function(){return n(this,R(new l,{$$parent:this}))},$$keys:function(){for(var e=[],t=[],r=this,n=o(l.prototype);r;)t.push(r),r=r.$$parent;return t.reverse(),N(t,function(t){N(o(t),function(t){-1===u(e,t)&&-1===u(n,t)&&e.push(t)})}),e},$$values:function(e){var t={},r=this;return N(r.$$keys(),function(n){t[n]=r[n].value(e&&e[n])}),t},$$equals:function(e,t){var r=!0,n=this;return N(n.$$keys(),function(i){var a=e&&e[i],o=t&&t[i];n[i].type.equals(a,o)||(r=!1)}),r},$$validates:function(e){var t,r,n,i=!0,a=this;return N(this.$$keys(),function(o){n=a[o],r=e[o],t=!r&&n.isOptional,i=i&&(t||!!n.type.is(r))}),i},$$parent:r},this.ParamSet=l}function w(e,n){function i(e){var t=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);return null!=t?t[1].replace(/\\(.)/g,"$1"):""}function a(e,t){return e.replace(/\$(\$|\d{1,2})/,function(e,r){return t["$"===r?0:Number(r)]})}function o(e,t,r){if(!r)return!1;var n=e.invoke(t,t,{$match:r});return!k(n)||n}function u(n,i,a,o){function u(e,t,r){return"/"===$?e:t?$.slice(0,-1)+e:r?$.slice(1)+e:e}function p(e){function t(e){var t=e(a,n);return!!t&&(V(t)&&n.replace().url(t),!0)}if(!e||!e.defaultPrevented){var i=v&&n.url()===v;if(v=r,i)return!0;var o,u=l.length;for(o=0;o<u;o++)if(t(l[o]))return;c&&t(c)}}function h(){return s=s||i.$on("$locationChangeSuccess",p)}var v,$=o.baseHref(),d=n.url();return f||h(),{sync:function(){p()},listen:function(){return h()},update:function(e){e?d=n.url():n.url()!==d&&(n.url(d),n.replace())},push:function(e,t,i){n.url(e.format(t||{})),v=i&&i.$$avoidResync?n.url():r,i&&i.replace&&n.replace()},href:function(r,i,a){if(!r.validates(i))return null;var o=e.html5Mode();t.isObject(o)&&(o=o.enabled);var s=r.format(i);if(a=a||{},o||null===s||(s="#"+e.hashPrefix()+s),s=u(s,o,a.absolute),!a.absolute||!s)return s;var l=!o&&s?"/":"",c=n.port();return c=80===c||443===c?"":":"+c,[n.protocol(),"://",n.host(),c,l,s].join("")}}}var s,l=[],c=null,f=!1;this.rule=function(e){if(!I(e))throw new Error("'rule' must be a function");return l.push(e),this},this.otherwise=function(e){if(V(e)){var t=e;e=function(){return t}}else if(!I(e))throw new Error("'rule' must be a function");return c=e,this},this.when=function(e,t){var r,u=V(t);if(V(e)&&(e=n.compile(e)),!u&&!I(t)&&!F(t))throw new Error("invalid 'handler' in when()");var s={matcher:function(e,t){return u&&(r=n.compile(t),t=["$match",function(e){return r.format(e)}]),R(function(r,n){return o(r,t,e.exec(n.path(),n.search()))},{prefix:V(e.prefix)?e.prefix:""})},regex:function(e,t){if(e.global||e.sticky)throw new Error("when() RegExp must not be global or sticky");return u&&(r=t,t=["$match",function(e){return a(r,e)}]),R(function(r,n){return o(r,t,e.exec(n.path()))},{prefix:i(e)})}},l={matcher:n.isMatcher(e),regex:e instanceof RegExp};for(var c in l)if(l[c])return this.rule(s[c](e,t));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(e){e===r&&(e=!0),f=e},this.$get=u,u.$inject=["$location","$rootScope","$injector","$browser"]}function y(e,i){function a(e){return 0===e.indexOf(".")||0===e.indexOf("^")}function f(e,t){if(!e)return r;var n=V(e),i=n?e:e.name;if(a(i)){if(!t)throw new Error("No reference point given for path '"+i+"'");t=f(t);for(var o=i.split("."),u=0,s=o.length,l=t;u<s;u++)if(""!==o[u]||0!==u){if("^"!==o[u])break;if(!l.parent)throw new Error("Path '"+i+"' not valid for state '"+t.name+"'");l=l.parent}else l=t;o=o.slice(u).join("."),i=l.name+(l.name&&o?".":"")+o}var c=E[i];return!c||!n&&(n||c!==e&&c.self!==e)?r:c}function p(e,t){S[e]||(S[e]=[]),S[e].push(t)}function v(e){for(var t=S[e]||[];t.length;)$(t.shift())}function $(t){var r=(t=n(t,{self:t,resolve:t.resolve||{},toString:function(){return this.name}})).name;if(!V(r)||r.indexOf("@")>=0)throw new Error("State must have a valid name");if(E.hasOwnProperty(r))throw new Error("State '"+r+"'' is already defined");var i=-1!==r.indexOf(".")?r.substring(0,r.lastIndexOf(".")):V(t.parent)?t.parent:M(t.parent)&&V(t.parent.name)?t.parent.name:"";if(i&&!E[i])return p(i,t.self);for(var a in P)I(P[a])&&(t[a]=P[a](t,P.$delegates[a]));return E[r]=t,!t[x]&&t.url&&e.when(t.url,["$match","$stateParams",function(e,r){b.$current.navigable==t&&l(e,r)||b.transitionTo(t,e,{inherit:!0,location:!1})}]),v(r),t}function d(e){return e.indexOf("*")>-1}function m(e){var t=e.split("."),r=b.$current.name.split(".");if("**"===t[0]&&(r=r.slice(u(r,t[1]))).unshift("**"),"**"===t[t.length-1]&&(r.splice(u(r,t[t.length-2])+1,Number.MAX_VALUE),r.push("**")),t.length!=r.length)return!1;for(var n=0,i=t.length;n<i;n++)"*"===t[n]&&(r[n]="*");return r.join("")===t.join("")}function g(e,i,a,u,p,v,$,g,S){function P(t,r,n,a){var o=e.$broadcast("$stateNotFound",t,r,n);if(o.defaultPrevented)return $.update(),q;if(!o.retry)return null;if(a.$retry)return $.update(),C;var u=b.transition=i.when(o.retry);return u.then(function(){return u!==b.transition?O:(t.options.$retry=!0,b.transitionTo(t.to,t.toParams,t.options))},function(){return q}),$.update(),u}function j(e,r,n,o,s,l){var f=n?r:c(e.params.$$keys(),r),h={$stateParams:f};s.resolve=p.resolve(e.resolve,h,s.resolve,e);var v=[s.resolve.then(function(e){s.globals=e})];return o&&v.push(o),N(e.views,function(r,n){var i=r.resolve&&r.resolve!==e.resolve?r.resolve:{};i.$template=[function(){return a.load(n,{view:r,locals:h,params:f,notify:l.notify})||""}],v.push(p.resolve(i,h,s.resolve,e).then(function(a){if(I(r.controllerProvider)||F(r.controllerProvider)){var o=t.extend({},i,h);a.$$controller=u.invoke(r.controllerProvider,null,o)}else a.$$controller=r.controller;a.$$state=e,a.$$controllerAs=r.controllerAs,s[n]=a}))}),i.all(v).then(function(e){return s})}var O=i.reject(new Error("transition superseded")),A=i.reject(new Error("transition prevented")),q=i.reject(new Error("transition aborted")),C=i.reject(new Error("transition failed"));return y.locals={resolve:null,globals:{$stateParams:{}}},b={params:{},current:y.self,$current:y,transition:null},b.reload=function(){return b.transitionTo(b.current,v,{reload:!0,inherit:!1,notify:!0})},b.go=function(e,t,r){return b.transitionTo(e,t,R({inherit:!0,relative:b.$current},r))},b.transitionTo=function(t,r,a){r=r||{},a=R({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},a||{});var o,l=b.$current,p=b.params,h=l.path,d=f(t,a.relative);if(!k(d)){var m={to:t,toParams:r,options:a},g=P(m,l.self,p,a);if(g)return g;if(t=m.to,r=m.toParams,a=m.options,d=f(t,a.relative),!k(d)){if(!a.relative)throw new Error("No such state '"+t+"'");throw new Error("Could not resolve '"+t+"' from state '"+a.relative+"'")}}if(d[x])throw new Error("Cannot transition to abstract state '"+t+"'");if(a.inherit&&(r=s(v,r||{},b.$current,d)),!d.params.$$validates(r))return C;r=d.params.$$values(r);var E=(t=d).path,S=0,q=E[S],I=y.locals,V=[];if(!a.reload)for(;q&&q===h[S]&&q.ownParams.$$equals(r,p);)I=V[S]=q.locals,q=E[++S];if(w(t,l,I,a))return!1!==t.self.reloadOnSearch&&$.update(),b.transition=null,i.when(b.current);if(r=c(t.params.$$keys(),r||{}),a.notify&&e.$broadcast("$stateChangeStart",t.self,r,l.self,p).defaultPrevented)return $.update(),A;for(var M=i.when(I),F=S;F<E.length;F++,q=E[F])I=V[F]=n(I),M=j(q,r,q===t,M,I,a);var N=b.transition=M.then(function(){var n,i,o;if(b.transition!==N)return O;for(n=h.length-1;n>=S;n--)(o=h[n]).self.onExit&&u.invoke(o.self.onExit,o.self,o.locals.globals),o.locals=null;for(n=S;n<E.length;n++)(i=E[n]).locals=V[n],i.self.onEnter&&u.invoke(i.self.onEnter,i.self,i.locals.globals);return b.transition!==N?O:(b.$current=t,b.current=t.self,b.params=r,D(b.params,v),b.transition=null,a.location&&t.navigable&&$.push(t.navigable.url,t.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===a.location}),a.notify&&e.$broadcast("$stateChangeSuccess",t.self,r,l.self,p),$.update(!0),b.current)},function(n){return b.transition!==N?O:(b.transition=null,(o=e.$broadcast("$stateChangeError",t.self,r,l.self,p,n)).defaultPrevented||$.update(),i.reject(n))});return N},b.is=function(e,t,n){var i=f(e,(n=R({relative:b.$current},n||{})).relative);return k(i)?b.$current===i&&(!t||l(i.params.$$values(t),v)):r},b.includes=function(e,t,n){if(n=R({relative:b.$current},n||{}),V(e)&&d(e)){if(!m(e))return!1;e=b.$current.name}var i=f(e,n.relative);return k(i)?!!k(b.$current.includes[i.name])&&(!t||l(i.params.$$values(t),v,o(t))):r},b.href=function(e,t,n){var i=f(e,(n=R({lossy:!0,inherit:!0,absolute:!1,relative:b.$current},n||{})).relative);if(!k(i))return null;n.inherit&&(t=s(v,t||{},b.$current,i));var a=i&&n.lossy?i.navigable:i;return a&&a.url!==r&&null!==a.url?$.href(a.url,c(i.params.$$keys(),t||{}),{absolute:n.absolute}):null},b.get=function(e,t){if(0===arguments.length)return h(o(E),function(e){return E[e].self});var r=f(e,t||b.$current);return r&&r.self?r.self:null},b}function w(e,t,r,n){if(e===t&&(r===t.locals&&!n.reload||!1===e.self.reloadOnSearch))return!0}var y,b,E={},S={},x="abstract",P={parent:function(e){if(k(e.parent)&&e.parent)return f(e.parent);var t=/^(.+)\.[^.]+$/.exec(e.name);return t?f(t[1]):y},data:function(e){return e.parent&&e.parent.data&&(e.data=e.self.data=R({},e.parent.data,e.data)),e.data},url:function(e){var t=e.url,r={params:e.params||{}};if(V(t))return"^"==t.charAt(0)?i.compile(t.substring(1),r):(e.parent.navigable||y).url.concat(t,r);if(!t||i.isMatcher(t))return t;throw new Error("Invalid url '"+t+"' in state '"+e+"'")},navigable:function(e){return e.url?e:e.parent?e.parent.navigable:null},ownParams:function(e){var t=e.url&&e.url.params||new U.ParamSet;return N(e.params||{},function(e,r){t[r]||(t[r]=new U.Param(r,null,e,"config"))}),t},params:function(e){return e.parent&&e.parent.params?R(e.parent.params.$$new(),e.ownParams):new U.ParamSet},views:function(e){var t={};return N(k(e.views)?e.views:{"":e},function(r,n){n.indexOf("@")<0&&(n+="@"+e.parent.name),t[n]=r}),t},path:function(e){return e.parent?e.parent.path.concat(e):[]},includes:function(e){var t=e.parent?R({},e.parent.includes):{};return t[e.name]=!0,t},$delegates:{}};(y=$({name:"",url:"^",views:null,abstract:!0})).navigable=null,this.decorator=function(e,t){return V(e)&&!k(t)?P[e]:I(t)&&V(e)?(P[e]&&!P.$delegates[e]&&(P.$delegates[e]=P[e]),P[e]=t,this):this},this.state=function(e,t){return M(e)?t=e:t.name=e,$(t),this},this.$get=g,g.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function b(){function e(e,t){return{load:function(r,n){var i;return(n=R({template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}},n)).view&&(i=t.fromConfig(n.view,n.params,n.locals)),i&&n.notify&&e.$broadcast("$viewContentLoading",n),i}}}this.$get=e,e.$inject=["$rootScope","$templateFactory"]}function E(e,r,n,i){function a(e,t){if(s)return{enter:function(e,t,r){var n=s.enter(e,null,t,r);n&&n.then&&n.then(r)},leave:function(e,t){var r=s.leave(e,t);r&&r.then&&r.then(t)}};if(u){var r=u&&u(t,e);return{enter:function(e,t,n){r.enter(e,null,t),n()},leave:function(e,t){r.leave(e),t()}}}return{enter:function(e,t,r){t.after(e),r()},leave:function(e,t){e.remove(),t()}}}var o=r.has?function(e){return r.has(e)?r.get(e):null}:function(e){try{return r.get(e)}catch(e){return null}},u=o("$animator"),s=o("$animate");return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(r,o,u){return function(r,o,s){function l(){f&&(f.remove(),f=null),h&&(h.$destroy(),h=null),p&&(m.leave(p,function(){f=null}),f=p,p=null)}function c(a){var c,f=x(r,s,o,i),g=f&&e.$current&&e.$current.locals[f];if(a||g!==v){c=r.$new(),v=e.$current.locals[f];var w=u(c,function(e){m.enter(e,o,function(){h&&h.$emit("$viewContentAnimationEnded"),(t.isDefined(d)&&!d||r.$eval(d))&&n(e)}),l()});p=w,(h=c).$emit("$viewContentLoaded"),h.$eval($)}}var f,p,h,v,$=s.onload||"",d=s.autoscroll,m=a(s,r);r.$on("$stateChangeSuccess",function(){c(!1)}),r.$on("$viewContentLoading",function(){c(!1)}),c(!0)}}}}function S(e,t,r,n){return{restrict:"ECA",priority:-400,compile:function(i){var a=i.html();return function(i,o,u){var s=r.$current,l=x(i,u,o,n),c=s&&s.locals[l];if(c){o.data("$uiView",{name:l,state:c.$$state}),o.html(c.$template?c.$template:a);var f=e(o.contents());if(c.$$controller){c.$scope=i;var p=t(c.$$controller,c);c.$$controllerAs&&(i[c.$$controllerAs]=p),o.data("$ngControllerController",p),o.children().data("$ngControllerController",p)}f(i)}}}}}function x(e,t,r,n){var i=n(t.uiView||t.name||"")(e),a=r.inheritedData("$uiView");return i.indexOf("@")>=0?i:i+"@"+(a?a.state.name:"")}function P(e,t){var r,n=e.match(/^\s*({[^}]*})\s*$/);if(n&&(e=t+"("+n[1]+")"),!(r=e.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/))||4!==r.length)throw new Error("Invalid state ref '"+e+"'");return{state:r[1],paramExpr:r[3]||null}}function j(e){var t=e.parent().inheritedData("$uiView");if(t&&t.state&&t.state.name)return t.state}function O(e,r){var n=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(i,a,o,u){var s=P(o.uiSref,e.current.name),l=null,c=j(a)||e.$current,f=null,p="A"===a.prop("tagName"),h="FORM"===a[0].nodeName,v=h?"action":"href",$=!0,d={relative:c,inherit:!0},m=i.$eval(o.uiSrefOpts)||{};t.forEach(n,function(e){e in m&&(d[e]=m[e])});var g=function(r){if(r&&(l=t.copy(r)),$){f=e.href(s.state,l,d);var n=u[1]||u[0];if(n&&n.$$setStateInfo(s.state,l),null===f)return $=!1,!1;o.$set(v,f)}};s.paramExpr&&(i.$watch(s.paramExpr,function(e,t){e!==l&&g(e)},!0),l=t.copy(i.$eval(s.paramExpr))),g(),h||a.bind("click",function(t){if(!((t.which||t.button)>1||t.ctrlKey||t.metaKey||t.shiftKey||a.attr("target"))){var n=r(function(){e.go(s.state,l,d)});t.preventDefault();var i=p&&!f?1:0;t.preventDefault=function(){i--<=0&&r.cancel(n)}}})}}}function A(e,t,r){return{restrict:"A",controller:["$scope","$element","$attrs",function(t,n,i){function a(){o()?n.addClass(l):n.removeClass(l)}function o(){return void 0!==i.uiSrefActiveEq?u&&e.is(u.name,s):u&&e.includes(u.name,s)}var u,s,l;l=r(i.uiSrefActiveEq||i.uiSrefActive||"",!1)(t),this.$$setStateInfo=function(t,r){u=e.get(t,j(n)),s=r,a()},t.$on("$stateChangeSuccess",a)}]}}function q(e){var t=function(t){return e.is(t)};return t.$stateful=!0,t}function C(e){var t=function(t){return e.includes(t)};return t.$stateful=!0,t}var k=t.isDefined,I=t.isFunction,V=t.isString,M=t.isObject,F=t.isArray,N=t.forEach,R=t.extend,D=t.copy;t.module("ui.router.util",["ng"]),t.module("ui.router.router",["ui.router.util"]),t.module("ui.router.state",["ui.router.router","ui.router.util"]),t.module("ui.router",["ui.router.state"]),t.module("ui.router.compat",["ui.router"]),v.$inject=["$q","$injector"],t.module("ui.router.util").service("$resolve",v),$.$inject=["$http","$templateCache","$injector"],t.module("ui.router.util").service("$templateFactory",$);var U;d.prototype.concat=function(e,t){var r={caseInsensitive:U.caseInsensitive(),strict:U.strictMode(),squash:U.defaultSquashPolicy()};return new d(this.sourcePath+e+this.sourceSearch,R(r,t),this)},d.prototype.toString=function(){return this.source},d.prototype.exec=function(e,t){var r=this.regexp.exec(e);if(!r)return null;t=t||{};var n,i,a,o=this.parameters(),u=o.length,s=this.segments.length-1,l={};if(s!==r.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(n=0;n<s;n++){a=o[n];var c=this.params[a],f=r[n+1];for(i=0;i<c.replace;i++)c.replace[i].from===f&&(f=c.replace[i].to);f&&!0===c.array&&(f=function(e){function t(e){return e.split("").reverse().join("")}return h(h(t(e).split(/-(?!\\)/),t),function(e){return e.replace(/\\-/,"-")}).reverse()}(f)),l[a]=c.value(f)}for(;n<u;n++)l[a=o[n]]=this.params[a].value(t[a]);return l},d.prototype.parameters=function(e){return k(e)?this.params[e]||null:this.$$paramNames},d.prototype.validates=function(e){return this.params.$$validates(e)},d.prototype.format=function(e){e=e||{};var t=this.segments,r=this.parameters(),n=this.params;if(!this.validates(e))return null;var i,a=!1,o=t.length-1,u=r.length,s=t[0];for(i=0;i<u;i++){var l=i<o,c=r[i],f=n[c],p=f.value(e[c]),v=f.isOptional&&f.type.equals(f.value(),p),$=!!v&&f.squash,d=f.type.encode(p);if(l){var m=t[i+1];if(!1===$)null!=d&&(F(d)?s+=h(d,function(e){return encodeURIComponent(e).replace(/-/g,function(e){return"%5C%"+e.charCodeAt(0).toString(16).toUpperCase()})}).join("-"):s+=encodeURIComponent(d)),s+=m;else if(!0===$){var g=s.match(/\/$/)?/\/?(.*)/:/(.*)/;s+=m.match(g)[1]}else V($)&&(s+=$+m)}else{if(null==d||v&&!1!==$)continue;F(d)||(d=[d]),d=h(d,encodeURIComponent).join("&"+c+"="),s+=(a?"&":"?")+c+"="+d,a=!0}}return s},m.prototype.is=function(e,t){return!0},m.prototype.encode=function(e,t){return e},m.prototype.decode=function(e,t){return e},m.prototype.equals=function(e,t){return e==t},m.prototype.$subPattern=function(){var e=this.pattern.toString();return e.substr(1,e.length-2)},m.prototype.pattern=/.*/,m.prototype.toString=function(){return"{Type:"+this.name+"}"},m.prototype.$asArray=function(e,t){if(!e)return this;if("auto"===e&&!t)throw new Error("'auto' array mode is for query parameters only");return new function(e,t){function n(e,t){return function(){return e[t].apply(e,arguments)}}function i(e){return F(e)?e:k(e)?[e]:[]}function a(e){switch(e.length){case 0:return r;case 1:return"auto"===t?e[0]:e;default:return e}}function o(e){return!e}function u(e,t){return function(r){var n=h(r=i(r),e);return!0===t?0===p(n,o).length:a(n)}}this.encode=u(n(e,"encode")),this.decode=u(n(e,"decode")),this.is=u(n(e,"is"),!0),this.equals=function(e){return function(t,r){var n=i(t),a=i(r);if(n.length!==a.length)return!1;for(var o=0;o<n.length;o++)if(!e(n[o],a[o]))return!1;return!0}}(n(e,"equals")),this.pattern=e.pattern,this.$arrayMode=t}(this,e)},t.module("ui.router.util").provider("$urlMatcherFactory",g),t.module("ui.router.util").run(["$urlMatcherFactory",function(e){}]),w.$inject=["$locationProvider","$urlMatcherFactoryProvider"],t.module("ui.router.router").provider("$urlRouter",w),y.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],t.module("ui.router.state").value("$stateParams",{}).provider("$state",y),b.$inject=[],t.module("ui.router.state").provider("$view",b),t.module("ui.router.state").provider("$uiViewScroll",function(){var e=!1;this.useAnchorScroll=function(){e=!0},this.$get=["$anchorScroll","$timeout",function(t,r){return e?t:function(e){r(function(){e[0].scrollIntoView()},0,!1)}}]}),E.$inject=["$state","$injector","$uiViewScroll","$interpolate"],S.$inject=["$compile","$controller","$state","$interpolate"],t.module("ui.router.state").directive("uiView",E),t.module("ui.router.state").directive("uiView",S),O.$inject=["$state","$timeout"],A.$inject=["$state","$stateParams","$interpolate"],t.module("ui.router.state").directive("uiSref",O).directive("uiSrefActive",A).directive("uiSrefActiveEq",A),q.$inject=["$state"],C.$inject=["$state"],t.module("ui.router.state").filter("isState",q).filter("includedByState",C)}(window,window.angular);