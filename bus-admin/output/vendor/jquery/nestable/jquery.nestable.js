!function($,window,document,undefined){function Plugin(element,options){this.w=$(window),this.el=$(element),this.options=$.extend({},defaults,options),this.init()}var hasTouch="ontouchstart"in window,hasPointerEvents=function(){var el=document.createElement("div"),docEl=document.documentElement;if(!("pointerEvents"in el.style))return!1;el.style.pointerEvents="auto",el.style.pointerEvents="x",docEl.appendChild(el);var supports=window.getComputedStyle&&"auto"===window.getComputedStyle(el,"").pointerEvents;return docEl.removeChild(el),!!supports}(),eStart=hasTouch?"touchstart":"mousedown",eMove=hasTouch?"touchmove":"mousemove",eEnd=hasTouch?"touchend":"mouseup";eCancel=hasTouch?"touchcancel":"mouseup";var defaults={listNodeName:"ol",itemNodeName:"li",rootClass:"dd",listClass:"dd-list",itemClass:"dd-item",dragClass:"dd-dragel",handleClass:"dd-handle",collapsedClass:"dd-collapsed",placeClass:"dd-placeholder",noDragClass:"dd-nodrag",emptyClass:"dd-empty",expandBtnHTML:'<button data-action="expand" type="button">Expand</button>',collapseBtnHTML:'<button data-action="collapse" type="button">Collapse</button>',group:0,maxDepth:5,threshold:20};Plugin.prototype={init:function(){var list=this;list.reset(),list.el.data("nestable-group",this.options.group),list.placeEl=$('<div class="'+list.options.placeClass+'"/>'),$.each(this.el.find(list.options.itemNodeName),function(k,el){list.setParent($(el))}),list.el.on("click","button",function(e){if(!list.dragEl&&(hasTouch||0===e.button)){var target=$(e.currentTarget),action=target.data("action"),item=target.parent(list.options.itemNodeName);"collapse"===action&&list.collapseItem(item),"expand"===action&&list.expandItem(item)}});var onStartEvent=function(e){var handle=$(e.target);if(!handle.hasClass(list.options.handleClass)){if(handle.closest("."+list.options.noDragClass).length)return;handle=handle.closest("."+list.options.handleClass)}!handle.length||list.dragEl||!hasTouch&&0!==e.button||hasTouch&&1!==e.touches.length||(e.preventDefault(),list.dragStart(hasTouch?e.touches[0]:e))},onMoveEvent=function(e){list.dragEl&&(e.preventDefault(),list.dragMove(hasTouch?e.touches[0]:e))},onEndEvent=function(e){list.dragEl&&(e.preventDefault(),list.dragStop(hasTouch?e.touches[0]:e))};hasTouch?(list.el[0].addEventListener(eStart,onStartEvent,!1),window.addEventListener(eMove,onMoveEvent,!1),window.addEventListener(eEnd,onEndEvent,!1),window.addEventListener(eCancel,onEndEvent,!1)):(list.el.on(eStart,onStartEvent),list.w.on(eMove,onMoveEvent),list.w.on(eEnd,onEndEvent))},serialize:function(){var data,depth=0,list=this;return step=function(level,depth){var array=[],items=level.children(list.options.itemNodeName);return items.each(function(){var li=$(this),item=$.extend({},li.data()),sub=li.children(list.options.listNodeName);sub.length&&(item.children=step(sub,depth+1)),array.push(item)}),array},data=step(list.el.find(list.options.listNodeName).first(),depth)},serialise:function(){return this.serialize()},reset:function(){this.mouse={offsetX:0,offsetY:0,startX:0,startY:0,lastX:0,lastY:0,nowX:0,nowY:0,distX:0,distY:0,dirAx:0,dirX:0,dirY:0,lastDirX:0,lastDirY:0,distAxX:0,distAxY:0},this.moving=!1,this.dragEl=null,this.dragRootEl=null,this.dragDepth=0,this.hasNewRoot=!1,this.pointEl=null},expandItem:function(li){li.removeClass(this.options.collapsedClass),li.children('[data-action="expand"]').hide(),li.children('[data-action="collapse"]').show(),li.children(this.options.listNodeName).show()},collapseItem:function(li){var lists=li.children(this.options.listNodeName);lists.length&&(li.addClass(this.options.collapsedClass),li.children('[data-action="collapse"]').hide(),li.children('[data-action="expand"]').show(),li.children(this.options.listNodeName).hide())},expandAll:function(){var list=this;list.el.find(list.options.itemNodeName).each(function(){list.expandItem($(this))})},collapseAll:function(){var list=this;list.el.find(list.options.itemNodeName).each(function(){list.collapseItem($(this))})},setParent:function(li){li.children(this.options.listNodeName).length&&(li.prepend($(this.options.expandBtnHTML)),li.prepend($(this.options.collapseBtnHTML))),li.children('[data-action="expand"]').hide()},unsetParent:function(li){li.removeClass(this.options.collapsedClass),li.children("[data-action]").remove(),li.children(this.options.listNodeName).remove()},dragStart:function(e){var mouse=this.mouse,target=$(e.target),dragItem=target.closest(this.options.itemNodeName);this.placeEl.css("height",dragItem.height()),mouse.offsetX=e.offsetX!==undefined?e.offsetX:e.pageX-target.offset().left,mouse.offsetY=e.offsetY!==undefined?e.offsetY:e.pageY-target.offset().top,mouse.startX=mouse.lastX=e.pageX,mouse.startY=mouse.lastY=e.pageY,this.dragRootEl=this.el,this.dragEl=$(document.createElement(this.options.listNodeName)).addClass(this.options.listClass+" "+this.options.dragClass),this.dragEl.css("width",dragItem.width()),dragItem.after(this.placeEl),dragItem[0].parentNode.removeChild(dragItem[0]),dragItem.appendTo(this.dragEl),$(document.body).append(this.dragEl),this.dragEl.css({left:e.pageX-mouse.offsetX,top:e.pageY-mouse.offsetY});var i,depth,items=this.dragEl.find(this.options.itemNodeName);for(i=0;i<items.length;i++)depth=$(items[i]).parents(this.options.listNodeName).length,depth>this.dragDepth&&(this.dragDepth=depth)},dragStop:function(){var el=this.dragEl.children(this.options.itemNodeName).first();el[0].parentNode.removeChild(el[0]),this.placeEl.replaceWith(el),this.dragEl.remove(),this.el.trigger("change"),this.hasNewRoot&&this.dragRootEl.trigger("change"),this.reset()},dragMove:function(e){var list,parent,prev,next,depth,opt=this.options,mouse=this.mouse;this.dragEl.css({left:e.pageX-mouse.offsetX,top:e.pageY-mouse.offsetY}),mouse.lastX=mouse.nowX,mouse.lastY=mouse.nowY,mouse.nowX=e.pageX,mouse.nowY=e.pageY,mouse.distX=mouse.nowX-mouse.lastX,mouse.distY=mouse.nowY-mouse.lastY,mouse.lastDirX=mouse.dirX,mouse.lastDirY=mouse.dirY,mouse.dirX=0===mouse.distX?0:mouse.distX>0?1:-1,mouse.dirY=0===mouse.distY?0:mouse.distY>0?1:-1;var newAx=Math.abs(mouse.distX)>Math.abs(mouse.distY)?1:0;if(!mouse.moving)return mouse.dirAx=newAx,void(mouse.moving=!0);mouse.dirAx!==newAx?(mouse.distAxX=0,mouse.distAxY=0):(mouse.distAxX+=Math.abs(mouse.distX),0!==mouse.dirX&&mouse.dirX!==mouse.lastDirX&&(mouse.distAxX=0),mouse.distAxY+=Math.abs(mouse.distY),0!==mouse.dirY&&mouse.dirY!==mouse.lastDirY&&(mouse.distAxY=0)),mouse.dirAx=newAx,mouse.dirAx&&mouse.distAxX>=opt.threshold&&(mouse.distAxX=0,prev=this.placeEl.prev(opt.itemNodeName),mouse.distX>0&&prev.length&&!prev.hasClass(opt.collapsedClass)&&(list=prev.find(opt.listNodeName).last(),depth=this.placeEl.parents(opt.listNodeName).length,depth+this.dragDepth<=opt.maxDepth&&(list.length?(list=prev.children(opt.listNodeName).last(),list.append(this.placeEl)):(list=$("<"+opt.listNodeName+"/>").addClass(opt.listClass),list.append(this.placeEl),prev.append(list),this.setParent(prev)))),mouse.distX<0&&(next=this.placeEl.next(opt.itemNodeName),next.length||(parent=this.placeEl.parent(),this.placeEl.closest(opt.itemNodeName).after(this.placeEl),parent.children().length||this.unsetParent(parent.parent()))));var isEmpty=!1;if(hasPointerEvents||(this.dragEl[0].style.visibility="hidden"),this.pointEl=$(document.elementFromPoint(e.pageX-document.body.scrollLeft,e.pageY-(window.pageYOffset||document.documentElement.scrollTop))),hasPointerEvents||(this.dragEl[0].style.visibility="visible"),this.pointEl.hasClass(opt.handleClass)&&(this.pointEl=this.pointEl.parent(opt.itemNodeName)),this.pointEl.hasClass(opt.emptyClass))isEmpty=!0;else if(!this.pointEl.length||!this.pointEl.hasClass(opt.itemClass))return;var pointElRoot=this.pointEl.closest("."+opt.rootClass),isNewRoot=this.dragRootEl.data("nestable-id")!==pointElRoot.data("nestable-id");if(!mouse.dirAx||isNewRoot||isEmpty){if(isNewRoot&&opt.group!==pointElRoot.data("nestable-group"))return;if(depth=this.dragDepth-1+this.pointEl.parents(opt.listNodeName).length,depth>opt.maxDepth)return;var before=e.pageY<this.pointEl.offset().top+this.pointEl.height()/2;parent=this.placeEl.parent(),isEmpty?(list=$(document.createElement(opt.listNodeName)).addClass(opt.listClass),list.append(this.placeEl),this.pointEl.replaceWith(list)):before?this.pointEl.before(this.placeEl):this.pointEl.after(this.placeEl),parent.children().length||this.unsetParent(parent.parent()),this.dragRootEl.find(opt.itemNodeName).length||this.dragRootEl.append('<div class="'+opt.emptyClass+'"/>'),isNewRoot&&(this.dragRootEl=pointElRoot,this.hasNewRoot=this.el[0]!==this.dragRootEl[0])}}},$.fn.nestable=function(params){var lists=this,retval=this;return lists.each(function(){var plugin=$(this).data("nestable");plugin?"string"==typeof params&&"function"==typeof plugin[params]&&(retval=plugin[params]()):($(this).data("nestable",new Plugin(this,params)),$(this).data("nestable-id",(new Date).getTime()))}),retval||lists}}(window.jQuery||window.Zepto,window,document);