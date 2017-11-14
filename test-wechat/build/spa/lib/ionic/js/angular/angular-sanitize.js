!function(window,angular,undefined){"use strict";function sanitizeText(chars){var buf=[];return htmlSanitizeWriter(buf,angular.noop).chars(chars),buf.join("")}function toMap(str,lowercaseKeys){var i,obj={},items=str.split(",");for(i=0;i<items.length;i++)obj[lowercaseKeys?angular.lowercase(items[i]):items[i]]=!0;return obj}function htmlParser(html,handler){null===html||html===undefined?html="":"string"!=typeof html&&(html=""+html),inertBodyElement.innerHTML=html;var mXSSAttempts=5;do{if(0===mXSSAttempts)throw $sanitizeMinErr("uinput","Failed to sanitize html because the input is unstable");mXSSAttempts--,document.documentMode<=11&&stripCustomNsAttrs(inertBodyElement),html=inertBodyElement.innerHTML,inertBodyElement.innerHTML=html}while(html!==inertBodyElement.innerHTML);for(var node=inertBodyElement.firstChild;node;){switch(node.nodeType){case 1:handler.start(node.nodeName.toLowerCase(),attrToMap(node.attributes));break;case 3:handler.chars(node.textContent)}var nextNode;if(!((nextNode=node.firstChild)||(1==node.nodeType&&handler.end(node.nodeName.toLowerCase()),nextNode=node.nextSibling)))for(;null==nextNode&&(node=node.parentNode)!==inertBodyElement;)nextNode=node.nextSibling,1==node.nodeType&&handler.end(node.nodeName.toLowerCase());node=nextNode}for(;node=inertBodyElement.firstChild;)inertBodyElement.removeChild(node)}function attrToMap(attrs){for(var map={},i=0,ii=attrs.length;i<ii;i++){var attr=attrs[i];map[attr.name]=attr.value}return map}function encodeEntities(value){return value.replace(/&/g,"&amp;").replace(SURROGATE_PAIR_REGEXP,function(value){return"&#"+(1024*(value.charCodeAt(0)-55296)+(value.charCodeAt(1)-56320)+65536)+";"}).replace(NON_ALPHANUMERIC_REGEXP,function(value){return"&#"+value.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function htmlSanitizeWriter(buf,uriValidator){var ignoreCurrentElement=!1,out=angular.bind(buf,buf.push);return{start:function(tag,attrs){tag=angular.lowercase(tag),!ignoreCurrentElement&&blockedElements[tag]&&(ignoreCurrentElement=tag),ignoreCurrentElement||!0!==validElements[tag]||(out("<"),out(tag),angular.forEach(attrs,function(value,key){var lkey=angular.lowercase(key),isImage="img"===tag&&"src"===lkey||"background"===lkey;!0!==validAttrs[lkey]||!0===uriAttrs[lkey]&&!uriValidator(value,isImage)||(out(" "),out(key),out('="'),out(encodeEntities(value)),out('"'))}),out(">"))},end:function(tag){tag=angular.lowercase(tag),ignoreCurrentElement||!0!==validElements[tag]||!0===voidElements[tag]||(out("</"),out(tag),out(">")),tag==ignoreCurrentElement&&(ignoreCurrentElement=!1)},chars:function(chars){ignoreCurrentElement||out(encodeEntities(chars))}}}function stripCustomNsAttrs(node){if(node.nodeType===Node.ELEMENT_NODE)for(var attrs=node.attributes,i=0,l=attrs.length;i<l;i++){var attrNode=attrs[i],attrName=attrNode.name.toLowerCase();"xmlns:ns1"!==attrName&&0!==attrName.indexOf("ns1:")||(node.removeAttributeNode(attrNode),i--,l--)}var nextNode=node.firstChild;nextNode&&stripCustomNsAttrs(nextNode),(nextNode=node.nextSibling)&&stripCustomNsAttrs(nextNode)}var inertBodyElement,$sanitizeMinErr=angular.$$minErr("$sanitize"),SURROGATE_PAIR_REGEXP=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,NON_ALPHANUMERIC_REGEXP=/([^\#-~ |!])/g,voidElements=toMap("area,br,col,hr,img,wbr"),optionalEndTagBlockElements=toMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),optionalEndTagInlineElements=toMap("rp,rt"),optionalEndTagElements=angular.extend({},optionalEndTagInlineElements,optionalEndTagBlockElements),blockElements=angular.extend({},optionalEndTagBlockElements,toMap("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),inlineElements=angular.extend({},optionalEndTagInlineElements,toMap("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),svgElements=toMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),blockedElements=toMap("script,style"),validElements=angular.extend({},voidElements,blockElements,inlineElements,optionalEndTagElements),uriAttrs=toMap("background,cite,href,longdesc,src,xlink:href"),htmlAttrs=toMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),svgAttrs=toMap("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",!0),validAttrs=angular.extend({},uriAttrs,svgAttrs,htmlAttrs);!function(window){var doc;if(!window.document||!window.document.implementation)throw $sanitizeMinErr("noinert","Can't create an inert html document");var bodyElements=((doc=window.document.implementation.createHTMLDocument("inert")).documentElement||doc.getDocumentElement()).getElementsByTagName("body");if(1===bodyElements.length)inertBodyElement=bodyElements[0];else{var html=doc.createElement("html");inertBodyElement=doc.createElement("body"),html.appendChild(inertBodyElement),doc.appendChild(html)}}(window),angular.module("ngSanitize",[]).provider("$sanitize",function(){var svgEnabled=!1;this.$get=["$$sanitizeUri",function($$sanitizeUri){return svgEnabled&&angular.extend(validElements,svgElements),function(html){var buf=[];return htmlParser(html,htmlSanitizeWriter(buf,function(uri,isImage){return!/^unsafe:/.test($$sanitizeUri(uri,isImage))})),buf.join("")}}],this.enableSvg=function(enableSvg){return angular.isDefined(enableSvg)?(svgEnabled=enableSvg,this):svgEnabled}}),angular.module("ngSanitize").filter("linky",["$sanitize",function($sanitize){var LINKY_URL_REGEXP=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,MAILTO_REGEXP=/^mailto:/i,linkyMinErr=angular.$$minErr("linky"),isString=angular.isString;return function(text,target,attributes){function addText(text){text&&html.push(sanitizeText(text))}if(null==text||""===text)return text;if(!isString(text))throw linkyMinErr("notstring","Expected string but received: {0}",text);for(var match,url,i,raw=text,html=[];match=raw.match(LINKY_URL_REGEXP);)url=match[0],match[2]||match[4]||(url=(match[3]?"http://":"mailto:")+url),i=match.index,addText(raw.substr(0,i)),function(url,text){var key;if(html.push("<a "),angular.isFunction(attributes)&&(attributes=attributes(url)),angular.isObject(attributes))for(key in attributes)html.push(key+'="'+attributes[key]+'" ');else attributes={};!angular.isDefined(target)||"target"in attributes||html.push('target="',target,'" '),html.push('href="',url.replace(/"/g,"&quot;"),'">'),addText(text),html.push("</a>")}(url,match[0].replace(MAILTO_REGEXP,"")),raw=raw.substring(i+match[0].length);return addText(raw),$sanitize(html.join(""))}}])}(window,window.angular);