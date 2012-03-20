/*!
  * bean.js - copyright Jacob Thornton 2011
  * https://github.com/fat/bean
  * MIT License
  * special thanks to:
  * dean edwards: http://dean.edwards.name/
  * dperini: https://github.com/dperini/nwevents
  * the entire mootools team: github.com/mootools/mootools-core
  *//*global module:true, define:true*/
!function(a,b,c){typeof module!="undefined"?module.exports=c(a,b):typeof define=="function"&&typeof define.amd=="object"?define(c):b[a]=c(a,b)}("bean",this,function(a,b){var c=window,d=b[a],e=/over|out/,f=/[^\.]*(?=\..*)\.|.*/,g=/\..*/,h="addEventListener",i="attachEvent",j="removeEventListener",k="detachEvent",l=document||{},m=l.documentElement||{},n=m[h],o=n?h:i,p=Array.prototype.slice,q=/click|mouse|menu|drag|drop/i,r=/^touch|^gesture/i,s={one:1},t=function(a,b,c){for(c=0;c<b.length;c++)a[b[c]]=1;return a}({},("click dblclick mouseup mousedown contextmenu mousewheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange error abort scroll "+(n?"show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend message readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ":"")).split(" ")),u=function(){function a(a,b){while((b=b.parentNode)!==null)if(b===a)return!0;return!1}function b(b){var c=b.relatedTarget;return c?c!==this&&c.prefix!=="xul"&&!/document/.test(this.toString())&&!a(this,c):c===null}return{mouseenter:{base:"mouseover",condition:b},mouseleave:{base:"mouseout",condition:b},mousewheel:{base:/Firefox/.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel"}}}(),v=function(){var a="altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "),b=a.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")),c=a.concat("char charCode key keyCode".split(" ")),d=a.concat("touches targetTouches changedTouches scale rotation".split(" ")),f="preventDefault",g=function(a){return function(){a[f]?a[f]():a.returnValue=!1}},h="stopPropagation",i=function(a){return function(){a[h]?a[h]():a.cancelBubble=!0}},j=function(a){return function(){a[f](),a[h](),a.stopped=!0}},k=function(a,b,c){var d,e;for(d=c.length;d--;)e=c[d],!(e in b)&&e in a&&(b[e]=a[e])};return function(n,o){var p={originalEvent:n,isNative:o};if(!n)return p;var s,t=n.type,u=n.target||n.srcElement;p[f]=g(n),p[h]=i(n),p.stop=j(p),p.target=u&&u.nodeType===3?u.parentNode:u;if(o){if(t.indexOf("key")!==-1)s=c,p.keyCode=n.which||n.keyCode;else if(q.test(t)){s=b,p.rightClick=n.which===3||n.button===2,p.pos={x:0,y:0};if(n.pageX||n.pageY)p.clientX=n.pageX,p.clientY=n.pageY;else if(n.clientX||n.clientY)p.clientX=n.clientX+l.body.scrollLeft+m.scrollLeft,p.clientY=n.clientY+l.body.scrollTop+m.scrollTop;e.test(t)&&(p.relatedTarget=n.relatedTarget||n[(t==="mouseover"?"from":"to")+"Element"])}else r.test(t)&&(s=d);k(n,p,s||a)}return p}}(),w=function(a,b){return!n&&!b&&(a===l||a===c)?m:a},x=function(){function a(a,b,c,d,e){this.element=a,this.type=b,this.handler=c,this.original=d,this.namespaces=e,this.custom=u[b],this.isNative=t[b]&&a[o],this.eventType=n||this.isNative?b:"propertychange",this.customType=!n&&!this.isNative&&b,this.target=w(a,this.isNative),this.eventSupport=this.target[o]}return a.prototype={inNamespaces:function(a){var b,c;if(!a)return!0;if(!this.namespaces)return!1;for(b=a.length;b--;)for(c=this.namespaces.length;c--;)if(a[b]===this.namespaces[c])return!0;return!1},matches:function(a,b,c){return this.element===a&&(!b||this.original===b)&&(!c||this.handler===c)}},a}(),y=function(){var a={},b=function(c,d,e,f,g){if(!d||d==="*")for(var h in a)h.charAt(0)==="$"&&b(c,h.substr(1),e,f,g);else{var i=0,j,k=a["$"+d],l=c==="*";if(!k)return;for(j=k.length;i<j;i++)if(l||k[i].matches(c,e,f))if(!g(k[i],k,i,d))return}},c=function(b,c,d){var e,f=a["$"+c];if(f)for(e=f.length;e--;)if(f[e].matches(b,d,null))return!0;return!1},d=function(a,c,d){var e=[];return b(a,c,d,null,function(a){return e.push(a)}),e},e=function(b){return(a["$"+b.type]||(a["$"+b.type]=[])).push(b),b},f=function(c){b(c.element,c.type,null,c.handler,function(b,c,d){return c.splice(d,1),c.length===0&&delete a["$"+b.type],!1})},g=function(){var b,c=[];for(b in a)b.charAt(0)==="$"&&(c=c.concat(a[b]));return c};return{has:c,get:d,put:e,del:f,entries:g}}(),z=n?function(a,b,c,d){a[d?h:j](b,c,!1)}:function(a,b,c,d,e){e&&d&&a["_on"+e]===null&&(a["_on"+e]=0),a[d?i:k]("on"+b,c)},A=function(a,b,d){return function(e){return e=v(e||((this.ownerDocument||this.document||this).parentWindow||c).event,!0),b.apply(a,[e].concat(d))}},B=function(a,b,d,e,f,g){return function(h){if(e?e.apply(this,arguments):n?!0:h&&h.propertyName==="_on"+d||!h)h&&(h=v(h||((this.ownerDocument||this.document||this).parentWindow||c).event,g)),b.apply(a,h&&(!f||f.length===0)?arguments:p.call(arguments,h?0:1).concat(f))}},C=function(a,b,c,d,e){return function(){a(b,c,e),d.apply(this,arguments)}},D=function(a,b,c,d){var e,f,h,i=b&&b.replace(g,""),j=y.get(a,i,c);for(e=0,f=j.length;e<f;e++)j[e].inNamespaces(d)&&((h=j[e]).eventSupport&&z(h.target,h.eventType,h.handler,!1,h.type),y.del(h))},E=function(a,b,c,d,e){var h,i=b.replace(g,""),j=b.replace(f,"").split(".");if(y.has(a,i,c))return a;i==="unload"&&(c=C(D,a,i,c,d)),u[i]&&(u[i].condition&&(c=B(a,c,i,u[i].condition,!0)),i=u[i].base||i),h=y.put(new x(a,i,c,d,j[0]&&j)),h.handler=h.isNative?A(a,h.handler,e):B(a,h.handler,i,!1,e,!1),h.eventSupport&&z(h.target,h.eventType,h.handler,!0,h.customType)},F=function(a,b,c){return function(d){var e,f,g=typeof a=="string"?c(a,this):a;for(e=d.target;e&&e!==this;e=e.parentNode)for(f=g.length;f--;)if(g[f]===e)return b.apply(e,arguments)}},G=function(a,b,c){var d,e,h,i,j,k=D,l=b&&typeof b=="string";if(l&&b.indexOf(" ")>0){b=b.split(" ");for(j=b.length;j--;)G(a,b[j],c);return a}h=l&&b.replace(g,""),h&&u[h]&&(h=u[h].type);if(!b||l){if(i=l&&b.replace(f,""))i=i.split(".");k(a,h,c,i)}else if(typeof b=="function")k(a,null,b);else for(d in b)b.hasOwnProperty(d)&&G(a,d,b[d]);return a},H=function(a,b,c,d,e){var f,g,h,i,j=c,k=c&&typeof c=="string";if(b&&!c&&typeof b=="object")for(f in b)b.hasOwnProperty(f)&&H.apply(this,[a,f,b[f]]);else{i=arguments.length>3?p.call(arguments,3):[],g=(k?c:b).split(" "),k&&(c=F(b,j=d,e))&&(i=p.call(i,1)),this===s&&(c=C(G,a,b,c,j));for(h=g.length;h--;)E(a,g[h],c,j,i)}return a},I=function(){return H.apply(s,arguments)},J=n?function(a,b,d){var e=l.createEvent(a?"HTMLEvents":"UIEvents");e[a?"initEvent":"initUIEvent"](b,!0,!0,c,1),d.dispatchEvent(e)}:function(a,b,c){c=w(c,a),a?c.fireEvent("on"+b,l.createEventObject()):c["_on"+b]++},K=function(a,b,c){var d,e,h,i,j,k=b.split(" ");for(d=k.length;d--;){b=k[d].replace(g,"");if(i=k[d].replace(f,""))i=i.split(".");if(!i&&!c&&a[o])J(t[b],b,a);else{j=y.get(a,b),c=[!1].concat(c);for(e=0,h=j.length;e<h;e++)j[e].inNamespaces(i)&&j[e].handler.apply(a,c)}}return a},L=function(a,b,c){var d=0,e=y.get(b,c),f=e.length;for(;d<f;d++)e[d].original&&H(a,e[d].type,e[d].original);return a},M={add:H,one:I,remove:G,clone:L,fire:K,noConflict:function(){return b[a]=d,this}};if(c[i]){var N=function(){var a,b=y.entries();for(a in b)b[a].type&&b[a].type!=="unload"&&G(b[a].element,b[a].type);c[k]("onunload",N),c.CollectGarbage&&c.CollectGarbage()};c[i]("onunload",N)}return M});
// Underscore.js 1.1.6
// (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){var p=this,C=p._,m={},i=Array.prototype,n=Object.prototype,f=i.slice,D=i.unshift,E=n.toString,l=n.hasOwnProperty,s=i.forEach,t=i.map,u=i.reduce,v=i.reduceRight,w=i.filter,x=i.every,y=i.some,o=i.indexOf,z=i.lastIndexOf;n=Array.isArray;var F=Object.keys,q=Function.prototype.bind,b=function(a){return new j(a)};typeof module!=="undefined"&&module.exports?(module.exports=b,b._=b):p._=b;b.VERSION="1.1.6";var h=b.each=b.forEach=function(a,c,d){if(a!=null)if(s&&a.forEach===s)a.forEach(c,d);else if(b.isNumber(a.length))for(var e=
0,k=a.length;e<k;e++){if(c.call(d,a[e],e,a)===m)break}else for(e in a)if(l.call(a,e)&&c.call(d,a[e],e,a)===m)break};b.map=function(a,c,b){var e=[];if(a==null)return e;if(t&&a.map===t)return a.map(c,b);h(a,function(a,g,G){e[e.length]=c.call(b,a,g,G)});return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var k=d!==void 0;a==null&&(a=[]);if(u&&a.reduce===u)return e&&(c=b.bind(c,e)),k?a.reduce(c,d):a.reduce(c);h(a,function(a,b,f){!k&&b===0?(d=a,k=!0):d=c.call(e,d,a,b,f)});if(!k)throw new TypeError("Reduce of empty array with no initial value");
return d};b.reduceRight=b.foldr=function(a,c,d,e){a==null&&(a=[]);if(v&&a.reduceRight===v)return e&&(c=b.bind(c,e)),d!==void 0?a.reduceRight(c,d):a.reduceRight(c);a=(b.isArray(a)?a.slice():b.toArray(a)).reverse();return b.reduce(a,c,d,e)};b.find=b.detect=function(a,c,b){var e;A(a,function(a,g,f){if(c.call(b,a,g,f))return e=a,!0});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(w&&a.filter===w)return a.filter(c,b);h(a,function(a,g,f){c.call(b,a,g,f)&&(e[e.length]=a)});return e};
b.reject=function(a,c,b){var e=[];if(a==null)return e;h(a,function(a,g,f){c.call(b,a,g,f)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=!0;if(a==null)return e;if(x&&a.every===x)return a.every(c,b);h(a,function(a,g,f){if(!(e=e&&c.call(b,a,g,f)))return m});return e};var A=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=!1;if(a==null)return e;if(y&&a.some===y)return a.some(c,d);h(a,function(a,b,f){if(e=c.call(d,a,b,f))return m});return e};b.include=b.contains=function(a,c){var b=
!1;if(a==null)return b;if(o&&a.indexOf===o)return a.indexOf(c)!=-1;A(a,function(a){if(b=a===c)return!0});return b};b.invoke=function(a,c){var d=f.call(arguments,2);return b.map(a,function(a){return(c.call?c||a:a[c]).apply(a,d)})};b.pluck=function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);var e={computed:-Infinity};h(a,function(a,b,f){b=c?c.call(d,a,b,f):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,
c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);var e={computed:Infinity};h(a,function(a,b,f){b=c?c.call(d,a,b,f):a;b<e.computed&&(e={value:a,computed:b})});return e.value};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(a,b,f){return{value:a,criteria:c.call(d,a,b,f)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}),"value")};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=
function(a){if(!a)return[];if(a.toArray)return a.toArray();if(b.isArray(a))return a;if(b.isArguments(a))return f.call(a);return b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,b,d){return b!=null&&!d?f.call(a,0,b):a[0]};b.rest=b.tail=function(a,b,d){return f.call(a,b==null||d?1:b)};b.last=function(a){return a[a.length-1]};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a){return b.reduce(a,function(a,d){if(b.isArray(d))return a.concat(b.flatten(d));
a[a.length]=d;return a},[])};b.without=function(a){var c=f.call(arguments,1);return b.filter(a,function(a){return!b.include(c,a)})};b.uniq=b.unique=function(a,c){return b.reduce(a,function(a,e,f){if(0==f||(c===!0?b.last(a)!=e:!b.include(a,e)))a[a.length]=e;return a},[])};b.intersect=function(a){var c=f.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.zip=function(){for(var a=f.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),
e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d)return d=b.sortedIndex(a,c),a[d]===c?d:-1;if(o&&a.indexOf===o)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(z&&a.lastIndexOf===z)return a.lastIndexOf(b);for(var d=a.length;d--;)if(a[d]===b)return d;return-1};b.range=function(a,b,d){arguments.length<=1&&(b=a||0,a=0);d=arguments[2]||1;for(var e=Math.max(Math.ceil((b-a)/
d),0),f=0,g=Array(e);f<e;)g[f++]=a,a+=d;return g};b.bind=function(a,b){if(a.bind===q&&q)return q.apply(a,f.call(arguments,1));var d=f.call(arguments,2);return function(){return a.apply(b,d.concat(f.call(arguments)))}};b.bindAll=function(a){var c=f.call(arguments,1);c.length==0&&(c=b.functions(a));h(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var b=c.apply(this,arguments);return l.call(d,b)?d[b]:d[b]=a.apply(this,arguments)}};b.delay=
function(a,b){var d=f.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(f.call(arguments,1)))};var B=function(a,b,d){var e;return function(){var f=this,g=arguments,h=function(){e=null;a.apply(f,g)};d&&clearTimeout(e);if(d||!e)e=setTimeout(h,b)}};b.throttle=function(a,b){return B(a,b,!1)};b.debounce=function(a,b){return B(a,b,!0)};b.once=function(a){var b=!1,d;return function(){if(b)return d;b=!0;return d=a.apply(this,arguments)}};
b.wrap=function(a,b){return function(){var d=[a].concat(f.call(arguments));return b.apply(this,d)}};b.compose=function(){var a=f.call(arguments);return function(){for(var b=f.call(arguments),d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return function(){if(--a<1)return b.apply(this,arguments)}};b.keys=F||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[],d;for(d in a)l.call(a,d)&&(b[b.length]=d);return b};b.values=function(a){return b.map(a,
b.identity)};b.functions=b.methods=function(a){return b.filter(b.keys(a),function(c){return b.isFunction(a[c])}).sort()};b.extend=function(a){h(f.call(arguments,1),function(b){for(var d in b)b[d]!==void 0&&(a[d]=b[d])});return a};b.defaults=function(a){h(f.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,c){if(a===c)return!0;var d=typeof a;if(d!=
typeof c)return!1;if(a==c)return!0;if(!a&&c||a&&!c)return!1;if(a._chain)a=a._wrapped;if(c._chain)c=c._wrapped;if(a.isEqual)return a.isEqual(c);if(b.isDate(a)&&b.isDate(c))return a.getTime()===c.getTime();if(b.isNaN(a)&&b.isNaN(c))return!1;if(b.isRegExp(a)&&b.isRegExp(c))return a.source===c.source&&a.global===c.global&&a.ignoreCase===c.ignoreCase&&a.multiline===c.multiline;if(d!=="object")return!1;if(a.length&&a.length!==c.length)return!1;d=b.keys(a);var e=b.keys(c);if(d.length!=e.length)return!1;
for(var f in a)if(!(f in c)||!b.isEqual(a[f],c[f]))return!1;return!0};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(l.call(a,c))return!1;return!0};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=n||function(a){return E.call(a)==="[object Array]"};b.isArguments=function(a){return!(!a||!l.call(a,"callee"))};b.isFunction=function(a){return!(!a||!a.constructor||!a.call||!a.apply)};b.isString=function(a){return!!(a===""||a&&a.charCodeAt&&a.substr)};
b.isNumber=function(a){return!!(a===0||a&&a.toExponential&&a.toFixed)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===!0||a===!1};b.isDate=function(a){return!(!a||!a.getTimezoneOffset||!a.setUTCFullYear)};b.isRegExp=function(a){return!(!a||!a.test||!a.exec||!(a.ignoreCase||a.ignoreCase===!1))};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.noConflict=function(){p._=C;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=
0;e<a;e++)b.call(d,e)};b.mixin=function(a){h(b.functions(a),function(c){H(c,b[c]=a[c])})};var I=0;b.uniqueId=function(a){var b=I++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g};b.template=function(a,c){var d=b.templateSettings;d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.interpolate,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(d.evaluate||
null,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";d=new Function("obj",d);return c?d(c):d};var j=function(a){this._wrapped=a};b.prototype=j.prototype;var r=function(a,c){return c?b(a).chain():a},H=function(a,c){j.prototype[a]=function(){var a=f.call(arguments);D.call(a,this._wrapped);return r(c.apply(b,a),this._chain)}};b.mixin(b);h(["pop","push","reverse","shift","sort",
"splice","unshift"],function(a){var b=i[a];j.prototype[a]=function(){b.apply(this._wrapped,arguments);return r(this._wrapped,this._chain)}});h(["concat","join","slice"],function(a){var b=i[a];j.prototype[a]=function(){return r(b.apply(this._wrapped,arguments),this._chain)}});j.prototype.chain=function(){this._chain=!0;return this};j.prototype.value=function(){return this._wrapped}})();
/**
 * Flotr2 (c) 2012 Carl Sutherland
 * MIT License
 * Special thanks to:
 * Flotr: http://code.google.com/p/flotr/ (fork)
 * Flot: https://github.com/flot/flot (original fork)
 */
(function(){var a=this,b=this.Flotr,c;c={_:_,bean:bean,version:"0.2.0-alpha",revision:("$Revision: 192 $".match(/(\d+)/)||[null,null])[1],author:["Bas Wenneker","Fabien Ménager"],website:"http://www.solutoire.com",isIphone:/iphone/i.test(navigator.userAgent),isIE:navigator.appVersion.indexOf("MSIE")!=-1?parseFloat(navigator.appVersion.split("MSIE")[1]):!1,graphTypes:{},plugins:{},addType:function(a,b){c.graphTypes[a]=b,c.defaultOptions[a]=b.options||{},c.defaultOptions.defaultType=c.defaultOptions.defaultType||a},addPlugin:function(a,b){c.plugins[a]=b,c.defaultOptions[a]=b.options||{}},draw:function(a,b,d,e){return e=e||c.Graph,new e(a,b,d)},merge:function(a,b){var d,e,f=b||{};for(d in a)e=a[d],e&&typeof e=="object"?e.constructor===Array?f[d]=this._.clone(e):e.constructor!==RegExp&&!this._.isElement(e)?f[d]=c.merge(e,b?b[d]:undefined):f[d]=e:f[d]=e;return f},clone:function(a){return c.merge(a,{})},getTickSize:function(a,b,d,e){var f=(d-b)/a,g=c.getMagnitude(f),h=10,i=f/g;return i<1.5?h=1:i<2.25?h=2:i<3?h=e===0?2:2.5:i<7.5&&(h=5),h*g},defaultTickFormatter:function(a,b){return a+""},defaultTrackFormatter:function(a){return"("+a.x+", "+a.y+")"},engineeringNotation:function(a,b,c){var d=["Y","Z","E","P","T","G","M","k",""],e=["y","z","a","f","p","n","µ","m",""],f=d.length;c=c||1e3,b=Math.pow(10,b||2);if(a===0)return 0;if(a>1)while(f--&&a>=c)a/=c;else{d=e,f=d.length;while(f--&&a<1)a*=c}return Math.round(a*b)/b+d[f]},getMagnitude:function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))},toPixel:function(a){return Math.floor(a)+.5},toRad:function(a){return-a*(Math.PI/180)},floorInBase:function(a,b){return b*Math.floor(a/b)},drawText:function(a,b,d,e,f){if(!a.fillText){a.drawText(b,d,e,f);return}f=this._.extend({size:c.defaultOptions.fontSize,color:"#000000",textAlign:"left",textBaseline:"bottom",weight:1,angle:0},f),a.save(),a.translate(d,e),a.rotate(f.angle),a.fillStyle=f.color,a.font=(f.weight>1?"bold ":"")+f.size*1.3+"px sans-serif",a.textAlign=f.textAlign,a.textBaseline=f.textBaseline,a.fillText(b,0,0),a.restore()},getBestTextAlign:function(a,b){return b=b||{textAlign:"center",textBaseline:"middle"},a+=c.getTextAngleFromAlign(b),Math.abs(Math.cos(a))>.01&&(b.textAlign=Math.cos(a)>0?"right":"left"),Math.abs(Math.sin(a))>.01&&(b.textBaseline=Math.sin(a)>0?"top":"bottom"),b},alignTable:{"right middle":0,"right top":Math.PI/4,"center top":Math.PI/2,"left top":3*(Math.PI/4),"left middle":Math.PI,"left bottom":-3*(Math.PI/4),"center bottom":-Math.PI/2,"right bottom":-Math.PI/4,"center middle":0},getTextAngleFromAlign:function(a){return c.alignTable[a.textAlign+" "+a.textBaseline]||0},noConflict:function(){return a.Flotr=b,this}},a.Flotr=c})(),Flotr.defaultOptions={colors:["#00A8F0","#C0D800","#CB4B4B","#4DA74D","#9440ED"],ieBackgroundColor:"#FFFFFF",title:null,subtitle:null,shadowSize:4,defaultType:null,HtmlText:!0,fontColor:"#545454",fontSize:7.5,resolution:1,parseFloat:!0,xaxis:{ticks:null,minorTicks:null,showLabels:!0,showMinorLabels:!1,labelsAngle:0,title:null,titleAngle:0,noTicks:5,minorTickFreq:null,tickFormatter:Flotr.defaultTickFormatter,tickDecimals:null,min:null,max:null,autoscale:!1,autoscaleMargin:0,color:null,mode:"normal",timeFormat:null,scaling:"linear",base:Math.E,titleAlign:"center",margin:!0},x2axis:{},yaxis:{ticks:null,minorTicks:null,showLabels:!0,showMinorLabels:!1,labelsAngle:0,title:null,titleAngle:90,noTicks:5,minorTickFreq:null,tickFormatter:Flotr.defaultTickFormatter,tickDecimals:null,min:null,max:null,autoscale:!1,autoscaleMargin:0,color:null,scaling:"linear",base:Math.E,titleAlign:"center",margin:!0},y2axis:{titleAngle:270},grid:{color:"#545454",backgroundColor:null,backgroundImage:null,watermarkAlpha:.4,tickColor:"#DDDDDD",labelMargin:3,verticalLines:!0,minorVerticalLines:null,horizontalLines:!0,minorHorizontalLines:null,outlineWidth:1,circular:!1},mouse:{track:!1,trackAll:!1,position:"se",relative:!1,trackFormatter:Flotr.defaultTrackFormatter,margin:5,lineColor:"#FF3F19",trackDecimals:1,sensibility:2,trackY:!0,radius:3,fillColor:null,fillOpacity:.4}},function(){function b(a,b,c,d){this.rgba=["r","g","b","a"];var e=4;while(-1<--e)this[this.rgba[e]]=arguments[e]||(e==3?1:0);this.normalize()}var a=Flotr._,c={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]};b.prototype={scale:function(b,c,d,e){var f=4;while(-1<--f)a.isUndefined(arguments[f])||(this[this.rgba[f]]*=arguments[f]);return this.normalize()},alpha:function(b){return!a.isUndefined(b)&&!a.isNull(b)&&(this.a=b),this.normalize()},clone:function(){return new b(this.r,this.b,this.g,this.a)},limit:function(a,b,c){return Math.max(Math.min(a,c),b)},normalize:function(){var a=this.limit;return this.r=a(parseInt(this.r,10),0,255),this.g=a(parseInt(this.g,10),0,255),this.b=a(parseInt(this.b,10),0,255),this.a=a(this.a,0,1),this},distance:function(a){if(!a)return;a=new b.parse(a);var c=0,d=3;while(-1<--d)c+=Math.abs(this[this.rgba[d]]-a[this.rgba[d]]);return c},toString:function(){return this.a>=1?"rgb("+[this.r,this.g,this.b].join(",")+")":"rgba("+[this.r,this.g,this.b,this.a].join(",")+")"},contrast:function(){var a=1-(.299*this.r+.587*this.g+.114*this.b)/255;return a<.5?"#000000":"#ffffff"}},a.extend(b,{parse:function(a){if(a instanceof b)return a;var d;if(d=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))return new b(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16));if(d=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))return new b(parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10));if(d=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))return new b(parseInt(d[1]+d[1],16),parseInt(d[2]+d[2],16),parseInt(d[3]+d[3],16));if(d=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a))return new b(parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10),parseFloat(d[4]));if(d=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))return new b(parseFloat(d[1])*2.55,parseFloat(d[2])*2.55,parseFloat(d[3])*2.55);if(d=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a))return new b(parseFloat(d[1])*2.55,parseFloat(d[2])*2.55,parseFloat(d[3])*2.55,parseFloat(d[4]));var e=(a+"").replace(/^\s*([\S\s]*?)\s*$/,"$1").toLowerCase();return e=="transparent"?new b(255,255,255,0):(d=c[e])?new b(d[0],d[1],d[2]):new b(0,0,0,0)},processColor:function(c,d){var e=d.opacity;if(!c)return"rgba(0, 0, 0, 0)";if(c instanceof b)return c.alpha(e).toString();if(a.isString(c))return b.parse(c).alpha(e).toString();var f=c.colors?c:{colors:c};if(!d.ctx)return a.isArray(f.colors)?b.parse(a.isArray(f.colors[0])?f.colors[0][1]:f.colors[0]).alpha(e).toString():"rgba(0, 0, 0, 0)";f=a.extend({start:"top",end:"bottom"},f),/top/i.test(f.start)&&(d.x1=0),/left/i.test(f.start)&&(d.y1=0),/bottom/i.test(f.end)&&(d.x2=0),/right/i.test(f.end)&&(d.y2=0);var g,h,i,j=d.ctx.createLinearGradient(d.x1,d.y1,d.x2,d.y2);for(g=0;g<f.colors.length;g++)h=f.colors[g],a.isArray(h)?(i=h[0],h=h[1]):i=g/(f.colors.length-1),j.addColorStop(i,b.parse(h).alpha(e));return j}}),Flotr.Color=b}(),Flotr.Date={format:function(a,b){function d(a){return a+="",a.length==1?"0"+a:a}if(!a)return;var c={h:a.getUTCHours().toString(),H:d(a.getUTCHours()),M:d(a.getUTCMinutes()),S:d(a.getUTCSeconds()),s:a.getUTCMilliseconds(),d:a.getUTCDate().toString(),m:(a.getUTCMonth()+1).toString(),y:a.getUTCFullYear().toString(),b:Flotr.Date.monthNames[a.getUTCMonth()]},e=[],f,g=!1;for(var h=0;h<b.length;++h)f=b.charAt(h),g?(e.push(c[f]||f),g=!1):f=="%"?g=!0:e.push(f);return e.join("")},getFormat:function(a,b){var c=Flotr.Date.timeUnits;return a<c.second?"%h:%M:%S.%s":a<c.minute?"%h:%M:%S":a<c.day?b<2*c.day?"%h:%M":"%b %d %h:%M":a<c.month?"%b %d":a<c.year?b<c.year?"%b":"%b %y":"%y"},formatter:function(a,b){var c=new Date(a);if(b.options.timeFormat)return Flotr.Date.format(c,b.options.timeFormat);var d=b.max-b.min,e=b.tickSize*Flotr.Date.timeUnits[b.tickUnit];return Flotr.Date.format(c,Flotr.Date.getFormat(e,d))},generator:function(a){var b=[],c=new Date(a.min),d=Flotr.Date.timeUnits,e=a.tickSize*d[a.tickUnit];switch(a.tickUnit){case"millisecond":c.setUTCMilliseconds(Flotr.floorInBase(c.getUTCMilliseconds(),a.tickSize));break;case"second":c.setUTCSeconds(Flotr.floorInBase(c.getUTCSeconds(),a.tickSize));break;case"minute":c.setUTCMinutes(Flotr.floorInBase(c.getUTCMinutes(),a.tickSize));break;case"hour":c.setUTCHours(Flotr.floorInBase(c.getUTCHours(),a.tickSize));break;case"month":c.setUTCMonth(Flotr.floorInBase(c.getUTCMonth(),a.tickSize));break;case"year":c.setUTCFullYear(Flotr.floorInBase(c.getUTCFullYear(),a.tickSize))}e>=d.second&&c.setUTCMilliseconds(0),e>=d.minute&&c.setUTCSeconds(0),e>=d.hour&&c.setUTCMinutes(0),e>=d.day&&c.setUTCHours(0),e>=d.day*4&&c.setUTCDate(1),e>=d.year&&c.setUTCMonth(0);var f=0,g=NaN,h;do{h=g,g=c.getTime(),b.push({v:g,label:Flotr.Date.formatter(g,a)});if(a.tickUnit=="month")if(a.tickSize<1){c.setUTCDate(1);var i=c.getTime();c.setUTCMonth(c.getUTCMonth()+1);var j=c.getTime();c.setTime(g+f*d.hour+(j-i)*a.tickSize),f=c.getUTCHours(),c.setUTCHours(0)}else c.setUTCMonth(c.getUTCMonth()+a.tickSize);else a.tickUnit=="year"?c.setUTCFullYear(c.getUTCFullYear()+a.tickSize):c.setTime(g+e)}while(g<a.max&&g!=h);return b},timeUnits:{millisecond:1,second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,year:31556952e3},spec:[[1,"millisecond"],[20,"millisecond"],[50,"millisecond"],[100,"millisecond"],[200,"millisecond"],[500,"millisecond"],[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"],[3,"month"],[6,"month"],[1,"year"]],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},function(){var a=Flotr._;Flotr.DOM={addClass:function(b,c){var d=b.className?b.className:"";if(a.include(d.split(/\s+/g),c))return;b.className=(d?d+" ":"")+c},create:function(a){return document.createElement(a)},node:function(a){var b=Flotr.DOM.create("div"),c;return b.innerHTML=a,c=b.children[0],b.innerHTML="",c},empty:function(a){a.innerHTML=""},hide:function(a){Flotr.DOM.setStyles(a,{display:"none"})},insert:function(b,c){a.isString(c)?b.innerHTML+=c:a.isElement(c)&&b.appendChild(c)},opacity:function(a,b){a.style.opacity=b},position:function(a,b){return a.offsetParent?(b=this.position(a.offsetParent),b.left+=a.offsetLeft,b.top+=a.offsetTop,b):{left:a.offsetLeft||0,top:a.offsetTop||0}},removeClass:function(b,c){var d=b.className?b.className:"";b.className=a.filter(d.split(/\s+/g),function(a){if(a!=c)return!0}).join(" ")},setStyles:function(b,c){a.each(c,function(a,c){b.style[c]=a})},show:function(a){Flotr.DOM.setStyles(a,{display:""})},size:function(a){return{height:a.offsetHeight,width:a.offsetWidth}}}}(),function(){var a=Flotr,b=a.bean;a.EventAdapter={observe:function(a,c,d){return b.add(a,c,d),this},fire:function(a,c,d){return b.fire(a,c,d),typeof Prototype!="undefined"&&Event.fire(a,c,d),this},stopObserving:function(a,c,d){return b.remove(a,c,d),this},eventPointer:function(b){if(!a._.isUndefined(b.touches)&&b.touches.length>0)return{x:b.touches[0].pageX,y:b.touches[0].pageY};if(!a._.isUndefined(b.changedTouches)&&b.changedTouches.length>0)return{x:b.changedTouches[0].pageX,y:b.changedTouches[0].pageY};if(b.pageX||b.pageY)return{x:b.pageX,y:b.pageY};if(b.clientX||b.clientY){var c=document,d=c.body,e=c.documentElement;return{x:b.clientX+d.scrollLeft+e.scrollLeft,y:b.clientY+d.scrollTop+e.scrollTop}}}}}(),function(){var a=Flotr,b=a.DOM,c=a._,d=function(a){this.o=a};d.prototype={dimensions:function(a,b,c,d){return a?this.o.html?this.html(a,this.o.element,c,d):this.canvas(a,b):{width:0,height:0}},canvas:function(b,c){if(!this.o.textEnabled)return;c=c||{};var d=this.measureText(b,c),e=d.width,f=c.size||a.defaultOptions.fontSize,g=c.angle||0,h=Math.cos(g),i=Math.sin(g),j=2,k=6,l;return l={width:Math.abs(h*e)+Math.abs(i*f)+j,height:Math.abs(i*e)+Math.abs(h*f)+k},l},html:function(a,c,d,e){var f=b.create("div");return b.setStyles(f,{position:"absolute",top:"-10000px"}),b.insert(f,'<div style="'+d+'" class="'+e+' flotr-dummy-div">'+a+"</div>"),b.insert(this.o.element,f),b.size(f)},measureText:function(b,d){var e=this.o.ctx,f;return!e.fillText||a.isIphone&&e.measure?{width:e.measure(b,d)}:(d=c.extend({size:a.defaultOptions.fontSize,weight:1,angle:0},d),e.save(),e.font=(d.weight>1?"bold ":"")+d.size*1.3+"px sans-serif",f=e.measureText(b),e.restore(),f)}},Flotr.Text=d}(),function(){var a=Flotr.DOM,b=Flotr.EventAdapter,c=Flotr._,d=Flotr;Graph=function(a,e,f){this._setEl(a),this._initMembers(),this._initPlugins(),b.fire(this.el,"flotr:beforeinit",[this]),this.data=e,this.series=d.Series.getSeries(e),this._initOptions(f),this._initGraphTypes(),this._initCanvas(),this._text=new d.Text({element:this.el,ctx:this.ctx,html:this.options.HtmlText,textEnabled:this.textEnabled}),b.fire(this.el,"flotr:afterconstruct",[this]),this._initEvents(),this.findDataRanges(),this.calculateSpacing(),this.draw(c.bind(function(){b.fire(this.el,"flotr:afterinit",[this])},this))},Graph.prototype={destroy:function(){c.each(this._handles,function(a){b.stopObserving.apply(this,a)}),this._handles=[],this.el.graph=null},_observe:function(a,c,d){return b.observe.apply(this,arguments),this._handles.push(arguments),this},processColor:function(a,b){var e={x1:0,y1:0,x2:this.plotWidth,y2:this.plotHeight,opacity:1,ctx:this.ctx};return c.extend(e,b),d.Color.processColor(a,e)},findDataRanges:function(){var a=this.axes,b,e,f;c.each(this.series,function(a){f=a.getRange(),f&&(b=a.xaxis,e=a.yaxis,b.datamin=Math.min(f.xmin,b.datamin),b.datamax=Math.max(f.xmax,b.datamax),e.datamin=Math.min(f.ymin,e.datamin),e.datamax=Math.max(f.ymax,e.datamax),b.used=b.used||f.xused,e.used=e.used||f.yused)},this),!a.x.used&&!a.x2.used&&(a.x.used=!0),!a.y.used&&!a.y2.used&&(a.y.used=!0),c.each(a,function(a){a.calculateRange()});var g=c.keys(d.graphTypes),h=!1;c.each(this.series,function(a){if(a.hide)return;c.each(g,function(b){a[b]&&a[b].show&&(this.extendRange(b,a),h=!0)},this),h||this.extendRange(this.options.defaultType,a)},this)},extendRange:function(a,b){this[a].extendRange&&this[a].extendRange(b,b.data,b[a],this[a]),this[a].extendYRange&&this[a].extendYRange(b.yaxis,b.data,b[a],this[a]),this[a].extendXRange&&this[a].extendXRange(b.xaxis,b.data,b[a],this[a])},calculateSpacing:function(){var a=this.axes,b=this.options,d=this.series,e=b.grid.labelMargin,f=this._text,g=a.x,h=a.x2,i=a.y,j=a.y2,k=b.grid.outlineWidth,l,m,n,o;c.each(a,function(a){a.calculateTicks(),a.calculateTextDimensions(f,b)}),o=f.dimensions(b.title,{size:b.fontSize*1.5},"font-size:1em;font-weight:bold;","flotr-title"),this.titleHeight=o.height,o=f.dimensions(b.subtitle,{size:b.fontSize},"font-size:smaller;","flotr-subtitle"),this.subtitleHeight=o.height;for(m=0;m<b.length;++m)d[m].points.show&&(k=Math.max(k,d[m].points.radius+d[m].points.lineWidth/2));var p=this.plotOffset;g.options.margin===!1?(p.bottom=0,p.top=0):(p.bottom+=(b.grid.circular?0:g.used&&g.options.showLabels?g.maxLabel.height+e:0)+(g.used&&g.options.title?g.titleSize.height+e:0)+k,p.top+=(b.grid.circular?0:h.used&&h.options.showLabels?h.maxLabel.height+e:0)+(h.used&&h.options.title?h.titleSize.height+e:0)+this.subtitleHeight+this.titleHeight+k),i.options.margin===!1?(p.left=0,p.right=0):(p.left+=(b.grid.circular?0:i.used&&i.options.showLabels?i.maxLabel.width+e:0)+(i.used&&i.options.title?i.titleSize.width+e:0)+k,p.right+=(b.grid.circular?0:j.used&&j.options.showLabels?j.maxLabel.width+e:0)+(j.used&&j.options.title?j.titleSize.width+e:0)+k),p.top=Math.floor(p.top),this.plotWidth=this.canvasWidth-p.left-p.right,this.plotHeight=this.canvasHeight-p.bottom-p.top,g.length=h.length=this.plotWidth,i.length=j.length=this.plotHeight,i.offset=j.offset=this.plotHeight,g.setScale(),h.setScale(),i.setScale(),j.setScale()},draw:function(a){var c=this.ctx,d;b.fire(this.el,"flotr:beforedraw",[this.series,this]);if(this.series.length){c.save(),c.translate(this.plotOffset.left,this.plotOffset.top);for(d=0;d<this.series.length;d++)this.series[d].hide||this.drawSeries(this.series[d]);c.restore(),this.clip()}b.fire(this.el,"flotr:afterdraw",[this.series,this]),a&&a()},drawSeries:function(a){function b(a,b){var c=this.getOptions(a,b);this[b].draw(c)}var e=!1;a=a||this.series,c.each(d.graphTypes,function(c,d){a[d]&&a[d].show&&this[d]&&(e=!0,b.call(this,a,d))},this),e||b.call(this,a,this.options.defaultType)},getOptions:function(a,b){var e=a[b],f=this[b],g={context:this.ctx,width:this.plotWidth,height:this.plotHeight,fontSize:this.options.fontSize,fontColor:this.options.fontColor,textEnabled:this.textEnabled,htmlText:this.options.HtmlText,text:this._text,data:a.data,color:a.color,shadowSize:a.shadowSize,xScale:c.bind(a.xaxis.d2p,a.xaxis),yScale:c.bind(a.yaxis.d2p,a.yaxis)};return g=d.merge(e,g),g.fillStyle=this.processColor(e.fillColor||a.color,{opacity:e.fillOpacity}),g},getEventPosition:function(c){var d=document,e=d.body,f=d.documentElement,g=this.axes,h=this.plotOffset,i=this.lastMousePos,j=b.eventPointer(c),k=j.x-i.pageX,l=j.y-i.pageY,m,n,o;return"ontouchstart"in this.el?(m=a.position(this.overlay),n=j.x-m.left-h.left,o=j.y-m.top-h.top):(m=this.overlay.getBoundingClientRect(),n=c.clientX-m.left-h.left-e.scrollLeft-f.scrollLeft,o=c.clientY-m.top-h.top-e.scrollTop-f.scrollTop),{x:g.x.p2d(n),x2:g.x2.p2d(n),y:g.y.p2d(o),y2:g.y2.p2d(o),relX:n,relY:o,dX:k,dY:l,absX:j.x,absY:j.y}},clickHandler:function(a){if(this.ignoreClick)return this.ignoreClick=!1,this.ignoreClick;b.fire(this.el,"flotr:click",[this.getEventPosition(a),this])},mouseMoveHandler:function(a){var c=this.getEventPosition(a);this.lastMousePos.pageX=c.absX,this.lastMousePos.pageY=c.absY,b.fire(this.el,"flotr:mousemove",[a,c,this])},mouseDownHandler:function(a){if(this.mouseUpHandler)return;this.mouseUpHandler=c.bind(function(a){b.stopObserving(document,"mouseup",this.mouseUpHandler),this.mouseUpHandler=null,b.fire(this.el,"flotr:mouseup",[a,this])},this),b.observe(document,"mouseup",this.mouseUpHandler),b.fire(this.el,"flotr:mousedown",[a,this]),this.ignoreClick=!1},drawTooltip:function(b,c,d,e){var f=this.getMouseTrack(),g="opacity:0.7;background-color:#000;color:#fff;display:none;position:absolute;padding:2px 8px;-moz-border-radius:4px;border-radius:4px;white-space:nowrap;",h=e.position,i=e.margin,j=this.plotOffset;c!==null&&d!==null?(e.relative?(h.charAt(0)=="n"?g+="bottom:"+(i-j.top-d+this.canvasHeight)+"px;top:auto;":h.charAt(0)=="s"&&(g+="top:"+(i+j.top+d)+"px;bottom:auto;"),h.charAt(1)=="e"?g+="left:"+(i+j.left+c)+"px;right:auto;":h.charAt(1)=="w"&&(g+="right:"+(i-j.left-c+this.canvasWidth)+"px;left:auto;")):(h.charAt(0)=="n"?g+="top:"+(i+j.top)+"px;bottom:auto;":h.charAt(0)=="s"&&(g+="bottom:"+(i+j.bottom)+"px;top:auto;"),h.charAt(1)=="e"?g+="right:"+(i+j.right)+"px;left:auto;":h.charAt(1)=="w"&&(g+="left:"+(i+j.left)+"px;right:auto;")),f.style.cssText=g,a.empty(f),a.insert(f,b),a.show(f)):a.hide(f)},clip:function(){var a=this.ctx,b=this.plotOffset,c=this.canvasWidth,e=this.canvasHeight;d.isIE&&d.isIE<9?(a.save(),a.fillStyle=this.processColor(this.options.ieBackgroundColor),a.fillRect(0,0,c,b.top),a.fillRect(0,0,b.left,e),a.fillRect(0,e-b.bottom,c,b.bottom),a.fillRect(c-b.right,0,b.right,e),a.restore()):(a.clearRect(0,0,c,b.top),a.clearRect(0,0,b.left,e),a.clearRect(0,e-b.bottom,c,b.bottom),a.clearRect(c-b.right,0,b.right,e))},_initMembers:function(){this._handles=[],this.lastMousePos={pageX:null,pageY:null},this.plotOffset={left:0,right:0,top:0,bottom:0},this.ignoreClick=!0,this.prevHit=null},_initGraphTypes:function(){c.each(d.graphTypes,function(a,b){this[b]=d.clone(a)},this)},_initEvents:function(){var a=this.el,d,e,f;"ontouchstart"in a?(d=c.bind(function(c){f=!0,b.stopObserving(document,"touchend",d),b.fire(a,"flotr:mouseup",[event,this]),e||this.clickHandler(c)},this),this._observe(this.overlay,"touchstart",c.bind(function(c){e=!1,f=!1,this.ignoreClick=!1,b.fire(a,"flotr:mousedown",[event,this]),this._observe(document,"touchend",d)},this)),this._observe(this.overlay,"touchmove",c.bind(function(c){c.preventDefault(),e=!0;var d=c.touches[0].pageX,g=c.touches[0].pageY,h=this.getEventPosition(c.touches[0]);this.lastMousePos.pageX=d,this.lastMousePos.pageY=g,f||b.fire(a,"flotr:mousemove",[event,h,this])},this))):this._observe(this.overlay,"mousedown",c.bind(this.mouseDownHandler,this))._observe(a,"mousemove",c.bind(this.mouseMoveHandler,this))._observe(this.overlay,"click",c.bind(this.clickHandler,this))._observe(a,"mouseout",function(){b.fire(a,"flotr:mouseout")})},_initCanvas:function(){function k(e,f){return e||(e=a.create("canvas"),typeof FlashCanvas!="undefined"&&typeof e.getContext=="function"&&FlashCanvas.initElement(e),e.className="flotr-"+f,e.style.cssText="position:absolute;left:0px;top:0px;",a.insert(b,e)),c.each(i,function(b,c){a.show(e);if(f=="canvas"&&e.getAttribute(c)===b)return;e.setAttribute(c,b*d.resolution),e.style[c]=b+"px"}),e.context_=null,e}function l(a){window.G_vmlCanvasManager&&window.G_vmlCanvasManager.initElement(a);var b=a.getContext("2d");return window.G_vmlCanvasManager||b.scale(d.resolution,d.resolution),b}var b=this.el,d=this.options,e=b.children,f=[],g,h,i,j;for(h=e.length;h--;)g=e[h],!this.canvas&&g.className==="flotr-canvas"?this.canvas=g:!this.overlay&&g.className==="flotr-overlay"?this.overlay=g:f.push(g);for(h=f.length;h--;)b.removeChild(f[h]);a.setStyles(b,{position:"relative"}),i=a.size(b);if(i.width<=0||i.height<=0||d.resolution<=0)throw"Invalid dimensions for plot, width = "+i.width+", height = "+i.height+", resolution = "+d.resolution;this.canvas=k(this.canvas,"canvas"),this.overlay=k(this.overlay,"overlay"),this.ctx=l(this.canvas),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.octx=l(this.overlay),this.ctx.clearRect(0,0,this.overlay.width,this.overlay.height),this.canvasHeight=i.height*d.resolution,this.canvasWidth=i.width*d.resolution,this.textEnabled=!!this.ctx.drawText||!!this.ctx.fillText},_initPlugins:function(){c.each(d.plugins,function(a,b){c.each(a.callbacks,function(a,b){this._observe(this.el,b,c.bind(a,this))},this),this[b]=c.clone(a),c.each(this[b],function(a,d){c.isFunction(a)&&(this[b][d]=c.bind(a,this))},this)},this)},_initOptions:function(a){var e=d.clone(d.defaultOptions);e.x2axis=c.extend(c.clone(e.xaxis),e.x2axis),e.y2axis=c.extend(c.clone(e.yaxis),e.y2axis),this.options=d.merge(a||{},e),this.options.grid.minorVerticalLines===null&&this.options.xaxis.scaling==="logarithmic"&&(this.options.grid.minorVerticalLines=!0),this.options.grid.minorHorizontalLines===null&&this.options.yaxis.scaling==="logarithmic"&&(this.options.grid.minorHorizontalLines=!0),b.fire(this.el,"flotr:afterinitoptions",[this]),this.axes=d.Axis.getAxes(this.options);var f=[],g=[],h=this.series.length,i=this.series.length,j=this.options.colors,k=[],l=0,m,n,o,p;for(n=i-1;n>-1;--n)m=this.series[n].color,m&&(--i,c.isNumber(m)?f.push(m):k.push(d.Color.parse(m)));for(n=f.length-1;n>-1;--n)i=Math.max(i,f[n]+1);for(n=0;g.length<i;){m=j.length==n?new d.Color(100,100,100):d.Color.parse(j[n]);var q=l%2==1?-1:1,r=1+q*Math.ceil(l/2)*.2;m.scale(r,r,r),g.push(m),++n>=j.length&&(n=0,++l)}for(n=0,o=0;n<h;++n){p=this.series[n],p.color?c.isNumber(p.color)&&(p.color=g[p.color].toString()):p.color=g[o++].toString(),p.xaxis||(p.xaxis=this.axes.x),p.xaxis==1?p.xaxis=this.axes.x:p.xaxis==2&&(p.xaxis=this.axes.x2),p.yaxis||(p.yaxis=this.axes.y),p.yaxis==1?p.yaxis=this.axes.y:p.yaxis==2&&(p.yaxis=this.axes.y2);for(var s in d.graphTypes)p[s]=c.extend(c.clone(this.options[s]),p[s]);p.mouse=c.extend(c.clone(this.options.mouse),p.mouse),c.isUndefined(p.shadowSize)&&(p.shadowSize=this.options.shadowSize)}},_setEl:function(a){if(!a)throw"The target container doesn't exist";if(!a.clientWidth)throw"The target container must be visible";this.el=a,this.el.graph&&this.el.graph.destroy(),this.el.graph=this}},Flotr.Graph=Graph}(),function(){function c(b){this.orientation=1,this.offset=0,this.datamin=Number.MAX_VALUE,this.datamax=-Number.MAX_VALUE,a.extend(this,b),this._setTranslations()}function d(a){return this.offset+this.orientation*(a-this.min)*this.scale}function e(a){return(this.offset+this.orientation*a)/this.scale+this.min}function f(a){return this.offset+this.orientation*(h(a,this.options.base)-h(this.min,this.options.base))*this.scale}function g(a){return j((this.offset+this.orientation*a)/this.scale+h(this.min,this.options.base),this.options.base)}function h(a,b){return a=Math.log(Math.max(a,Number.MIN_VALUE)),b!==Math.E&&(a/=Math.log(b)),a}function j(a,b){return b===Math.E?Math.exp(a):Math.pow(b,a)}var a=Flotr._,b="logarithmic";c.prototype={setScale:function(){var a=this.length;this.options.scaling==b?this.scale=a/(h(this.max,this.options.base)-h(this.min,this.options.base)):this.scale=a/(this.max-this.min)},calculateTicks:function(){var a=this.options;this.ticks=[],this.minorTicks=[],a.ticks?(this._cleanUserTicks(a.ticks,this.ticks),this._cleanUserTicks(a.minorTicks||[],this.minorTicks)):a.mode=="time"?this._calculateTimeTicks():a.scaling==="logarithmic"?this._calculateLogTicks():this._calculateTicks()},calculateRange:function(){if(!this.used)return;var a=this,b=a.options,c=b.min!==null?b.min:a.datamin,d=b.max!==null?b.max:a.datamax,e=b.autoscaleMargin;b.scaling=="logarithmic"&&(c<=0&&(c=a.datamin),d<=0&&(d=c));if(d==c){var f=d?.01:1;c-=f,d+=f}if(b.scaling==="logarithmic"){c<0&&(c=d/b.base);var g=Math.log(d);b.base!=Math.E&&(g/=Math.log(b.base)),g=Math.ceil(g);var h=Math.log(c);b.base!=Math.E&&(h/=Math.log(b.base)),h=Math.ceil(h),a.tickSize=Flotr.getTickSize(b.noTicks,h,g,b.tickDecimals===null?0:b.tickDecimals),b.minorTickFreq===null&&(g-h>10?b.minorTickFreq=0:g-h>5?b.minorTickFreq=2:b.minorTickFreq=5)}else a.tickSize=Flotr.getTickSize(b.noTicks,c,d,b.tickDecimals);a.min=c,a.max=d,b.min===null&&b.autoscale&&(a.min-=a.tickSize*e,a.min<0&&a.datamin>=0&&(a.min=0),a.min=a.tickSize*Math.floor(a.min/a.tickSize)),b.max===null&&b.autoscale&&(a.max+=a.tickSize*e,a.max>0&&a.datamax<=0&&a.datamax!=a.datamin&&(a.max=0),a.max=a.tickSize*Math.ceil(a.max/a.tickSize)),a.min==a.max&&(a.max=a.min+1)},calculateTextDimensions:function(a,b){var c="",d,e;if(this.options.showLabels)for(e=0;e<this.ticks.length;++e)d=this.ticks[e].label.length,d>c.length&&(c=this.ticks[e].label);this.maxLabel=a.dimensions(c,{size:b.fontSize,angle:Flotr.toRad(this.options.labelsAngle)},"font-size:smaller;","flotr-grid-label"),this.titleSize=a.dimensions(this.options.title,{size:b.fontSize*1.2,angle:Flotr.toRad(this.options.titleAngle)},"font-weight:bold;","flotr-axis-title")},_cleanUserTicks:function(b,c){var d=this,e=this.options,f,g,h,i;a.isFunction(b)&&(b=b({min:d.min,max:d.max}));for(g=0;g<b.length;++g)i=b[g],typeof i=="object"?(f=i[0],h=i.length>1?i[1]:e.tickFormatter(f,{min:d.min,max:d.max})):(f=i,h=e.tickFormatter(f,{min:this.min,max:this.max})),c[g]={v:f,label:h}},_calculateTimeTicks:function(){var a=this,b=Flotr.Date.timeUnits,c=Flotr.Date.spec,d=(a.max-a.min)/a.options.noTicks,e,f,g;for(g=0;g<c.length-1;++g){var h=c[g][0]*b[c[g][1]];if(d<(h+c[g+1][0]*b[c[g+1][1]])/2&&h>=a.tickSize)break}e=c[g][0],f=c[g][1],f=="year"&&(e=Flotr.getTickSize(a.options.noTicks*b.year,a.min,a.max,0)),a.tickSize=e,a.tickUnit=f,a.ticks=Flotr.Date.generator(a)},_calculateLogTicks:function(){var a=this,b=a.options,c,d,e=Math.log(a.max);b.base!=Math.E&&(e/=Math.log(b.base)),e=Math.ceil(e);var f=Math.log(a.min);b.base!=Math.E&&(f/=Math.log(b.base)),f=Math.ceil(f);for(i=f;i<e;i+=a.tickSize){d=b.base==Math.E?Math.exp(i):Math.pow(b.base,i);var g=d*(b.base==Math.E?Math.exp(a.tickSize):Math.pow(b.base,a.tickSize)),h=(g-d)/b.minorTickFreq;a.ticks.push({v:d,label:b.tickFormatter(d,{min:a.min,max:a.max})});for(c=d+h;c<g;c+=h)a.minorTicks.push({v:c,label:b.tickFormatter(c,{min:a.min,max:a.max})})}d=b.base==Math.E?Math.exp(i):Math.pow(b.base,i),a.ticks.push({v:d,label:b.tickFormatter(d,{min:a.min,max:a.max})})},_calculateTicks:function(){var a=this,b=a.options,c=a.tickSize,d=a.min,e=a.max,f=c*Math.ceil(d/c),g,h,i,j,k,l;b.minorTickFreq&&(h=c/b.minorTickFreq);for(k=0;(i=j=f+k*c)<=e;++k){g=b.tickDecimals,g===null&&(g=1-Math.floor(Math.log(c)/Math.LN10)),g<0&&(g=0),i=i.toFixed(g),a.ticks.push({v:i,label:b.tickFormatter(i,{min:a.min,max:a.max})});if(b.minorTickFreq)for(l=0;l<b.minorTickFreq&&k*c+l*h<e;++l)i=(j+l*h).toFixed(g),a.minorTicks.push({v:i,label:b.tickFormatter(i,{min:a.min,max:a.max})})}},_setTranslations:function(a){this.d2p=a?f:d,this.p2d=a?g:e}},a.extend(c,{getAxes:function(a){return{x:new c({options:a.xaxis,n:1,length:this.plotWidth}),x2:new c({options:a.x2axis,n:2,length:this.plotWidth}),y:new c({options:a.yaxis,n:1,length:this.plotHeight,offset:this.plotHeight,orientation:-1}),y2:new c({options:a.y2axis,n:2,length:this.plotHeight,offset:this.plotHeight,orientation:-1})}}}),Flotr.Axis=c}(),function(){function b(b){a.extend(this,b)}var a=Flotr._;b.prototype={getRange:function(){var a=this.data,b=a.length,c=Number.MAX_VALUE,d=Number.MAX_VALUE,e=-Number.MAX_VALUE,f=-Number.MAX_VALUE,g=!1,h=!1,i,j,k;if(b<0||this.hide)return!1;for(k=0;k<b;k++)i=a[k][0],j=a[k][1],i<c&&(c=i,g=!0),i>e&&(e=i,g=!0),j<d&&(d=j,h=!0),j>f&&(f=j,h=!0);return{xmin:c,xmax:e,ymin:d,ymax:f,xused:g,yused:h}}},a.extend(b,{getSeries:function(c){return a.map(c,function(c){var d;return c.data?(d=new b,a.extend(d,c)):d=new b({data:c}),d})}}),Flotr.Series=b}(),Flotr.addType("lines",{options:{show:!1,lineWidth:2,fill:!1,fillBorder:!1,fillColor:null,fillOpacity:.4,steps:!1,stacked:!1},stack:{values:[]},draw:function(a){var b=a.context,c=a.lineWidth,d=a.shadowSize,e;b.save(),b.lineJoin="round",d&&(b.lineWidth=d/2,e=c/2+b.lineWidth/2,b.strokeStyle="rgba(0,0,0,0.1)",this.plot(a,e+d/2,!1),b.strokeStyle="rgba(0,0,0,0.2)",this.plot(a,e,!1)),b.lineWidth=c,b.strokeStyle=a.color,this.plot(a,0,!0),b.restore()},plot:function(a,b,c){var d=a.context,e=a.plotWidth,f=a.plotHeight,g=a.xScale,h=a.yScale,i=a.data,j=a.stacked?this.stack:!1,k=i.length-1,l=null,m=null,n=h(0),o,p,q,r,s,t,u;if(k<1)return;d.beginPath();for(u=0;u<k;++u){if(i[u][1]===null||i[u+1][1]===null)continue;o=g(i[u][0]),p=g(i[u+1][0]),j?(s=j.values[i[u][0]]||0,t=j.values[i[u+1][0]]||j.values[i[u][0]]||0,q=h(i[u][1]+s),r=h(i[u+1][1]+t),c&&(j.values[i[u][0]]=i[u][1]+s,u==k-1&&(j.values[i[u+1][0]]=i[u+1][1]+t))):(q=h(i[u][1]),r=h(i[u+1][1]));if(q>=f&&r>=e||q<=0&&r<=0||o<=0&&p<=0||o>=e&&p>=e)continue;(l!=o||m!=q+b)&&d.moveTo(o,q+b),l=p,m=r+b,a.steps?(d.lineTo(l+b/2,q+b),d.lineTo(l+b/2,m)):d.lineTo(l,m)}(!a.fill||a.fill&&!a.fillBorder)&&d.stroke(),!b&&a.fill&&(o=g(i[0][0]),d.fillStyle=a.fillStyle,d.lineTo(p,n),d.lineTo(o,n),d.lineTo(o,h(i[0][1])),d.fill(),a.fillBorder&&d.stroke()),d.closePath()},extendYRange:function(a,b,c,d){var e=a.options;if(c.stacked&&(!e.max&&e.max!==0||!e.min&&e.min!==0)){var f=a.max,g=a.min,h=d.positiveSums||{},i=d.negativeSums||{},j,k;for(k=0;k<b.length;k++)j=b[k][0]+"",b[k][1]>0?(h[j]=(h[j]||0)+b[k][1],f=Math.max(f,h[j])):(i[j]=(i[j]||0)+b[k][1],g=Math.min(g,i[j]));d.negativeSums=i,d.positiveSums=h,a.max=f,a.min=g}c.steps&&(this.hit=function(a){var b=a.data,c=a.args,d=a.yScale,e=c[0],f=b.length,g=c[1],h=e.x,i=e.relY,j;for(j=0;j<f-1;j++)if(h>=b[j][0]&&h<=b[j+1][0]){Math.abs(d(b[j][1])-i)<8&&(g.x=b[j][0],g.y=b[j][1],g.index=j,g.seriesIndex=a.index);break}},this.drawHit=function(a){var b=a.context,c=a.args,d=a.data,e=a.xScale,f=c.index,g=e(c.x),h=a.yScale(c.y),i;d.length-1>f&&(i=a.xScale(d[f+1][0]),b.save(),b.strokeStyle=a.color,b.lineWidth=a.lineWidth,b.beginPath(),b.moveTo(g,h),b.lineTo(i,h),b.stroke(),b.closePath(),b.restore())},this.clearHit=function(a){var b=a.context,c=a.args,d=a.data,e=a.xScale,f=a.lineWidth,g=c.index,h=e(c.x),i=a.yScale(c.y),j;d.length-1>g&&(j=a.xScale(d[g+1][0]),b.clearRect(h-f,i-f,j-h+2*f,2*f))})}}),Flotr.addType("bars",{options:{show:!1,lineWidth:2,barWidth:1,fill:!0,fillColor:null,fillOpacity:.4,horizontal:!1,stacked:!1,centered:!0,topPadding:.1},stack:{positive:[],negative:[],_positive:[],_negative:[]},draw:function(a){var b=a.context;b.save(),b.lineJoin="miter",b.lineWidth=a.lineWidth,b.strokeStyle=a.color,a.fill&&(b.fillStyle=a.fillStyle),this.plot(a),b.restore()},plot:function(a){var b=a.data,c=a.context,d=a.shadowSize,e,f,g,h,i,j;if(b.length<1)return;this.translate(c,a.horizontal);for(e=0;e<b.length;e++){f=this.getBarGeometry(b[e][0],b[e][1],a);if(f===null)continue;g=f.left,h=f.top,i=f.width,j=f.height,a.fill&&c.fillRect(g,h,i,j),d&&(c.save(),c.fillStyle="rgba(0,0,0,0.05)",c.fillRect(g+d,h+d,i,j),c.restore()),a.lineWidth&&c.strokeRect(g,h,i,j)}},translate:function(a,b){b&&(a.rotate(-Math.PI/2),a.scale(-1,1))},getBarGeometry:function(a,b,c){var d=c.horizontal,e=c.barWidth,f=c.centered,g=c.stacked?this.stack:!1,h=c.lineWidth,i=f?e/2:0,j=d?c.yScale:c.xScale,k=d?c.xScale:c.yScale,l=d?b:a,m=d?a:b,n=0,o,p,q,r,s;return g&&(o=m>0?g.positive:g.negative,n=o[l]||n,o[l]=n+m),p=j(l-i),q=j(l+e-i),r=k(m+n),s=k(n),s<0&&(s=0),a===null||b===null?null:{x:l,y:m,xScale:j,yScale:k,top:r,left:Math.min(p,q)-h/2,width:Math.abs(q-p)-h,height:s-r}},hit:function(a){var b=a.data,c=a.args,d=c[0],e=c[1],f=d.x,g=d.y,h=this.getBarGeometry(f,g,a),i=h.width/2,j=h.left,k,l;for(l=b.length;l--;)k=this.getBarGeometry(b[l][0],b[l][1],a),k.y>h.y&&Math.abs(j-k.left)<i&&(e.x=b[l][0],e.y=b[l][1],e.index=l,e.seriesIndex=a.index)},drawHit:function(a){var b=a.context,c=a.args,d=this.getBarGeometry(c.x,c.y,a),e=d.left,f=d.top,g=d.width,h=d.height;b.save(),b.strokeStyle=a.color,b.lineWidth=a.lineWidth,this.translate(b,a.horizontal),b.beginPath(),b.moveTo(e,f+h),b.lineTo(e,f),b.lineTo(e+g,f),b.lineTo(e+g,f+h),a.fill&&(b.fillStyle=a.fillStyle,b.fill()),b.stroke(),b.closePath(),b.restore()},clearHit:function(a){var b=a.context,c=a.args,d=this.getBarGeometry(c.x,c.y,a),e=d.left,f=d.width,g=d.top,h=d.height,i=2*a.lineWidth;b.save(),this.translate(b,a.horizontal),b.clearRect(e-i,Math.min(g,g+h)-i,f+2*i,Math.abs(h)+2*i),b.restore()},extendXRange:function(a,b,c,d){this._extendRange(a,b,c,d)},extendYRange:function(a,b,c,d){this._extendRange(a,b,c,d)},_extendRange:function(a,b,c,d){var e=a.options.max;if(_.isNumber(e)||_.isString(e))return;var f=a.min,g=a.max,h=c.horizontal,i=a.orientation,j=this.positiveSums||{},k=this.negativeSums||{},l,m,n,o;(i==1&&!h||i==-1&&h)&&c.centered&&(g=Math.max(a.datamax+c.barWidth,g),f=Math.min(a.datamin-c.barWidth,f));if(c.stacked&&(i==1&&h||i==-1&&!h))for(o=b.length;o--;)l=b[o][i==1?1:0]+"",m=b[o][i==1?0:1],m>0?(j[l]=(j[l]||0)+m,g=Math.max(g,j[l])):(k[l]=(k[l]||0)+m,f=Math.min(f,k[l]));(i==1&&h||i==-1&&!h)&&c.topPadding&&(a.max===a.datamax||c.stacked&&this.stackMax!==g)&&(g+=c.topPadding*(g-f)),this.stackMin=f,this.stackMax=g,this.negativeSums=k,this.positiveSums=j,a.max=g,a.min=f}}),Flotr.addType("bubbles",{options:{show:!1,lineWidth:2,fill:!0,fillOpacity:.4,baseRadius:2},draw:function(a){var b=a.context,c=a.shadowSize;b.save(),b.lineWidth=a.lineWidth,b.fillStyle="rgba(0,0,0,0.05)",b.strokeStyle="rgba(0,0,0,0.05)",this.plot(a,c/2),b.strokeStyle="rgba(0,0,0,0.1)",this.plot(a,c/4),b.strokeStyle=a.color,b.fillStyle=a.fillStyle,this.plot(a),b.restore()},plot:function(a,b){var c=a.data,d=a.context,e,f,g,h,i;b=b||0;for(f=0;f<c.length;++f)e=this.getGeometry(c[f],a),d.beginPath(),d.arc(e.x+b,e.y+b,e.z,0,2*Math.PI,!0),d.stroke(),a.fill&&d.fill(),d.closePath()},getGeometry:function(a,b){return{x:b.xScale(a[0]),y:b.yScale(a[1]),z:a[2]*b.baseRadius}},drawHit:function(a){var b=a.context,c=this.getGeometry(a.data[a.args.index],a);b.save(),b.lineWidth=a.lineWidth,b.fillStyle=a.fillStyle,b.strokeStyle=a.color,b.beginPath(),b.arc(c.x,c.y,c.z,0,2*Math.PI,!0),b.fill(),b.stroke(),b.closePath(),b.restore()},clearHit:function(a){var b=a.context,c=this.getGeometry(a.data[a.args.index],a),d=c.z+a.lineWidth;b.save(),b.clearRect(c.x-d,c.y-d,2*d,2*d),b.restore()}}),Flotr.addType("candles",{options:{show:!1,lineWidth:1,wickLineWidth:1,candleWidth:.6,fill:!0,upFillColor:"#00A8F0",downFillColor:"#CB4B4B",fillOpacity:.5,barcharts:!1},draw:function(a){var b=a.context;b.save(),b.lineJoin="miter",b.lineCap="butt",b.lineWidth=a.wickLineWidth||a.lineWidth,this.plot(a),b.restore()},plot:function(a){var b=a.data,c=a.context,d=a.xScale,e=a.yScale,f=a.candleWidth/2,g=a.shadowSize,h=a.wickLineWidth,i=h%2/2,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x;if(b.length<1)return;for(x=0;x<b.length;x++){k=b[x],l=k[0],n=k[1],o=k[2],p=k[3],q=k[4],r=d(l-f),s=d(l+f),t=e(p),u=e(o),v=e(Math.min(n,q)),w=e(Math.max(n,q)),j=a[n>q?"downFillColor":"upFillColor"],a.fill&&!a.barcharts&&(c.fillStyle="rgba(0,0,0,0.05)",c.fillRect(r+g,w+g,s-r,v-w),c.save(),c.globalAlpha=a.fillOpacity,c.fillStyle=j,c.fillRect(r,w+f,s-r,v-w),c.restore());if(a.lineWidth||h)l=Math.floor((r+s)/2)+i,c.strokeStyle=j,c.beginPath(),a.barcharts?(c.moveTo(l,Math.floor(u+f)),c.lineTo(l,Math.floor(t+f)),m=Math.floor(n+f)+.5,c.moveTo(Math.floor(r)+i,m),c.lineTo(l,m),m=Math.floor(q+f)+.5,c.moveTo(Math.floor(s)+i,m),c.lineTo(l,m)):(c.strokeRect(r,w+f,s-r,v-w),c.moveTo(l,Math.floor(w+f)),c.lineTo(l,Math.floor(u+f)),c.moveTo(l,Math.floor(v+f)),c.lineTo(l,Math.floor(t+f))),c.closePath(),c.stroke()}},extendXRange:function(a,b,c){a.options.max===null&&(a.max=Math.max(a.datamax+.5,a.max),a.min=Math.min(a.datamin-.5,a.min))}}),Flotr.addType("gantt",{options:{show:!1,lineWidth:2,barWidth:1,fill:!0,fillColor:null,fillOpacity:.4,centered:!0},draw:function(a){var b=this.ctx,c=a.gantt.barWidth,d=Math.min(a.gantt.lineWidth,c);b.save(),b.translate(this.plotOffset.left,this.plotOffset.top),b.lineJoin="miter",b.lineWidth=d,b.strokeStyle=a.color,b.save(),this.gantt.plotShadows(a,c,0,a.gantt.fill),b.restore();if(a.gantt.fill){var e=a.gantt.fillColor||a.color;b.fillStyle=this.processColor(e,{opacity:a.gantt.fillOpacity})}this.gantt.plot(a,c,0,a.gantt.fill),b.restore()},plot:function(a,b,c,d){var e=a.data;if(e.length<1)return;var f=a.xaxis,g=a.yaxis,h=this.ctx,i;for(i=0;i<e.length;i++){var j=e[i][0],k=e[i][1],l=e[i][2],m=!0,n=!0,o=!0;if(k===null||l===null)continue;var p=k,q=k+l,r=j-(a.gantt.centered?b/2:0),s=j+b-(a.gantt.centered?b/2:0);if(q<f.min||p>f.max||s<g.min||r>g.max)continue;p<f.min&&(p=f.min,m=!1),q>f.max&&(q=f.max,f.lastSerie!=a&&(n=!1)),r<g.min&&(r=g.min),s>g.max&&(s=g.max,g.lastSerie!=a&&(n=!1)),d&&(h.beginPath(),h.moveTo(f.d2p(p),g.d2p(r)+c),h.lineTo(f.d2p(p),g.d2p(s)+c),h.lineTo(f.d2p(q),g.d2p(s)+c),h.lineTo(f.d2p(q),g.d2p(r)+c),h.fill(),h.closePath()),a.gantt.lineWidth&&(m||o||n)&&(h.beginPath(),h.moveTo(f.d2p(p),g.d2p(r)+c),h[m?"lineTo":"moveTo"](f.d2p(p),g.d2p(s)+c),h[n?"lineTo":"moveTo"](f.d2p(q),g.d2p(s)+c),h[o?"lineTo":"moveTo"](f.d2p(q),g.d2p(r)+c),h.stroke(),h.closePath())}},plotShadows:function(a,b,c){var d=a.data;if(d.length<1)return;var e,f,g,h,i=a.xaxis,j=a.yaxis,k=this.ctx,l=this.options.shadowSize;for(e=0;e<d.length;e++){f=d[e][0],g=d[e][1],h=d[e][2];if(g===null||h===null)continue;var m=g,n=g+h,o=f-(a.gantt.centered?b/2:0),p=f+b-(a.gantt.centered?b/2:0);if(n<i.min||m>i.max||p<j.min||o>j.max)continue;m<i.min&&(m=i.min),n>i.max&&(n=i.max),o<j.min&&(o=j.min),p>j.max&&(p=j.max);var q=i.d2p(n)-i.d2p(m)-(i.d2p(n)+l<=this.plotWidth?0:l),r=j.d2p(o)-j.d2p(p)-(j.d2p(o)+l<=this.plotHeight?0:l);k.fillStyle="rgba(0,0,0,0.05)",k.fillRect(Math.min(i.d2p(m)+l,this.plotWidth),Math.min(j.d2p(p)+l,this.plotHeight),q,r)}},extendXRange:function(a){if(a.options.max===null){var b=a.min,c=a.max,d,e,f,g,h,i={},j={},k=null;for(d=0;d<this.series.length;++d){g=this.series[d],h=g.gantt;if(h.show&&g.xaxis==a){for(e=0;e<g.data.length;e++)h.show&&(y=g.data[e][0]+"",i[y]=Math.max(i[y]||0,g.data[e][1]+g.data[e][2]),k=g);for(e in i)c=Math.max(i[e],c)}}a.lastSerie=k,a.max=c,a.min=b}},extendYRange:function(a){if(a.options.max===null){var b=Number.MIN_VALUE,c=Number.MAX_VALUE,d,e,f,g,h={},i={},j=null;for(d=0;d<this.series.length;++d){f=this.series[d],g=f.gantt;if(g.show&&!f.hide&&f.yaxis==a){var k=Number.MIN_VALUE,l=Number.MAX_VALUE;for(e=0;e<f.data.length;e++)k=Math.max(k,f.data[e][0]),l=Math.min(l,f.data[e][0]);g.centered?(b=Math.max(k+.5,b),c=Math.min(l-.5,c)):(b=Math.max(k+1,b),c=Math.min(l,c)),g.barWidth+k>b&&(b=a.max+g.barWidth)}}a.lastSerie=j,a.max=b,a.min=c,a.tickSize=Flotr.getTickSize(a.options.noTicks,c,b,a.options.tickDecimals)}}}),function(){function a(a){return typeof a=="object"&&a.constructor&&(Image?!0:a.constructor===Image)}Flotr.defaultMarkerFormatter=function(a){return Math.round(a.y*100)/100+""},Flotr.addType("markers",{options:{show:!1,lineWidth:1,color:"#000000",fill:!1,fillColor:"#FFFFFF",fillOpacity:.4,stroke:!1,position:"ct",labelFormatter:Flotr.defaultMarkerFormatter,fontSize:Flotr.defaultOptions.fontSize,stacked:!1,stackingType:"b",horizontal:!1},stack:{positive:[],negative:[],values:[]},draw:function(a){function m(a,b){return g=d.negative[a]||0,f=d.positive[a]||0,b>0?(d.positive[a]=g+b,g+b):(d.negative[a]=f+b,f+b)}var b=a.data,c=a.context,d=a.stacked?a.stack:!1,e=a.stackingType,f,g,h,i,j,k,l;c.save(),c.lineJoin="round",c.lineWidth=a.lineWidth,c.strokeStyle="rgba(0,0,0,0.5)",c.fillStyle=a.fillStyle;for(i=0;i<b.length;++i)j=b[i][0],k=b[i][1],d&&(e=="b"?a.horizontal?k=m(k,j):j=m(j,k):e=="a"&&(h=d.values[j]||0,d.values[j]=h+k,k=h+k)),l=a.labelFormatter({x:j,y:k,index:i,data:b}),this.plot(a.xScale(j),a.yScale(k),l,a);c.restore()},plot:function(b,c,d,e){var f=e.context;if(a(d)&&!d.complete)throw"Marker image not loaded.";this._plot(b,c,d,e)},_plot:function(b,c,d,e){var f=e.context,g=2,h=b,i=c,j;a(d)?j={height:d.height,width:d.width}:j=e.text.canvas(d),j.width=Math.floor(j.width+g*2),j.height=Math.floor(j.height+g*2),e.position.indexOf("c")!=-1?h-=j.width/2+g:e.position.indexOf("l")!=-1&&(h-=j.width),e.position.indexOf("m")!=-1?i-=j.height/2+g:e.position.indexOf("t")!=-1&&(i-=j.height),h=Math.floor(h)+.5,i=Math.floor(i)+.5,e.fill&&f.fillRect(h,i,j.width,j.height),e.stroke&&f.strokeRect(h,i,j.width,j.height),a(d)?f.drawImage(d,h+g,i+g):Flotr.drawText(f,d,h+g,i+g,{textBaseline:"top",textAlign:"left",size:e.fontSize,color:e.color})}})}(),function(){var a=Flotr._;Flotr.defaultPieLabelFormatter=function(a,b){return(100*b/a).toFixed(2)+"%"},Flotr.addType("pie",{options:{show:!1,lineWidth:1,fill:!0,fillColor:null,fillOpacity:.6,explode:6,sizeRatio:.6,startAngle:Math.PI/4,labelFormatter:Flotr.defaultPieLabelFormatter,pie3D:!1,pie3DviewAngle:Math.PI/2*.8,pie3DspliceThickness:20},draw:function(a){var b=a.data,c=a.context,d=c.canvas,e=a.lineWidth,f=a.shadowSize,g=a.sizeRatio,h=a.height,i=a.explode,j=a.color,k=a.fill,l=a.fillStyle,m=Math.min(d.width,d.height)*g/2,n=b[0][1],o=[],p=1,q=Math.PI*2*n/this.total,r=this.startAngle||2*Math.PI*a.startAngle,s=r+q,t=r+q/2,u=a.labelFormatter(this.total,n),v=Math.cos(t)<0,w=Math.sin(t)>0,x=i+m+4,y,z,A,B,C;c.save(),c.translate(a.width/2,a.height/2),c.scale(1,p),z=Math.cos(t)*i,A=Math.sin(t)*i,f>0&&(this.plotSlice(z+f,A+f,m,r,s,c),k&&(c.fillStyle="rgba(0,0,0,0.1)",c.fill())),this.plotSlice(z,A,m,r,s,c),k&&(c.fillStyle=l,c.fill()),c.lineWidth=e,c.strokeStyle=j,c.stroke(),B=Math.cos(t)*x,C=Math.sin(t)*x,y={size:a.fontSize*1.2,color:a.fontColor,weight:1.5};if(u)if(a.htmlText||!a.textEnabled){var D=textAlignTop?C-5:h-C+5,E="position:absolute;"+(textAlignTop?"top":"bottom")+":"+D+"px;";textAlignRight?E+="right:"+(this.canvasWidth-B)+"px;text-align:right;":E+="left:"+B+"px;text-align:left;",o.push('<div style="',E,'" class="flotr-grid-label">',u,"</div>")}else y.textAlign=v?"right":"left",y.textBaseline=w?"top":"bottom",Flotr.drawText(c,u,B,C,y);if(a.htmlText||!a.textEnabled){var F=Flotr.DOM.node('<div style="color:'+a.fontColor+'" class="flotr-labels"></div>');Flotr.DOM.insert(F,o.join("")),Flotr.DOM.insert(this.el,F)}c.restore(),this.startAngle=s,this.slices=this.slices||[],this.slices.push({radius:Math.min(d.width,d.height)*g/2,x:z,y:A,explode:i,start:r,end:s})},plotSlice:function(a,b,c,d,e,f){f.beginPath(),f.moveTo(a,b),f.arc(a,b,c,d,e,!1),f.lineTo(a,b),f.closePath()},hit:function(a){var b=a.data[0],c=a.args,d=a.index,e=c[0],f=c[1],g=this.slices[d],h=e.relX-a.width/2,i=e.relY-a.height/2,j=Math.sqrt(h*h+i*i),k=Math.atan(i/h),l=Math.PI*2,m=g.explode||a.explode,n=g.start%l,o=g.end%l;h<0?k+=Math.PI:h>0&&i<0&&(k+=l),j<g.radius+m&&j>m&&(n>o&&(k<o||k>n)||k>n&&k<o)&&(f.x=b[0],f.y=b[1],f.sAngle=n,f.eAngle=o,f.index=0,f.seriesIndex=d,f.fraction=b[1]/this.total)},drawHit:function(a){var b=a.context,c=this.slices[a.args.seriesIndex];b.save(),b.translate(a.width/2,a.height/2),this.plotSlice(c.x,c.y,c.radius,c.start,c.end,b),b.stroke(),b.restore()},clearHit:function(a){var b=a.context,c=this.slices[a.args.seriesIndex],d=2*a.lineWidth,e=c.radius+d;b.save(),b.translate(a.width/2,a.height/2),b.clearRect(c.x-e,c.y-e,2*e+d,2*e+d),b.restore()},extendYRange:function(a,b){this.total=(this.total||0)+b[0][1]}})}(),Flotr.addType("points",{options:{show:!1,radius:3,lineWidth:2,fill:!0,fillColor:"#FFFFFF",fillOpacity:.4},draw:function(a){var b=a.context,c=a.lineWidth,d=a.shadowSize;b.save(),d>0&&(b.lineWidth=d/2,b.strokeStyle="rgba(0,0,0,0.1)",this.plot(a,d/2+b.lineWidth/2),b.strokeStyle="rgba(0,0,0,0.2)",this.plot(a,b.lineWidth/2)),b.lineWidth=a.lineWidth,b.strokeStyle=a.color,b.fillStyle=a.fillColor||a.color,this.plot(a),b.restore()},plot:function(a,b){var c=a.data,d=a.context,e=a.xScale,f=a.yScale,g,h,i;for(g=c.length-1;g>-1;--g){i=c[g][1];if(i===null)continue;h=e(c[g][0]),i=f(i);if(h<0||h>a.width||i<0||i>a.height)continue;d.beginPath(),b?d.arc(h,i+b,a.radius,0,Math.PI,!1):(d.arc(h,i,a.radius,0,2*Math.PI,!0),a.fill&&d.fill()),d.stroke(),d.closePath()}}}),Flotr.addType("radar",{options:{show:!1,lineWidth:2,fill:!0,fillOpacity:.4,radiusRatio:.9},draw:function(a){var b=a.context,c=a.shadowSize;b.save(),b.translate(a.width/2,a.height/2),b.lineWidth=a.lineWidth,b.fillStyle="rgba(0,0,0,0.05)",b.strokeStyle="rgba(0,0,0,0.05)",this.plot(a,c/2),b.strokeStyle="rgba(0,0,0,0.1)",this.plot(a,c/4),b.strokeStyle=a.color,b.fillStyle=a.fillStyle,this.plot(a),b.restore()},plot:function(a,b){var c=a.data,d=a.context,e=Math.min(a.height,a.width)*a.radiusRatio/2,f=2*Math.PI/c.length,g=-Math.PI/2,h,i;b=b||0,d.beginPath();for(h=0;h<c.length;++h)i=c[h][1]/this.max,d[h===0?"moveTo":"lineTo"](Math.cos(h*f+g)*e*i+b,Math.sin(h*f+g)*e*i+b);d.closePath(),a.fill&&d.fill(),d.stroke()},extendYRange:function(a,b){this.max=Math.max(a.max,this.max||-Number.MAX_VALUE)}}),Flotr.addType("timeline",{options:{show:!1,lineWidth:1,barWidth:.2,fill:!0,fillColor:null,fillOpacity:.4,centered:!0},draw:function(a){var b=a.context;b.save(),b.lineJoin="miter",b.lineWidth=a.lineWidth,b.strokeStyle=a.color,b.fillStyle=a.fillStyle,this.plot(a),b.restore()},plot:function(a){var b=a.data,c=a.context,d=a.xScale,e=a.yScale,f=a.barWidth,g=a.lineWidth,h;Flotr._.each(b,function(a){var b=a[0],h=a[1],i=a[2],j=f,k=Math.ceil(d(b)),l=Math.ceil(d(b+i))-k,m=Math.round(e(h)),n=Math.round(e(h-j))-m,o=k-g/2,p=Math.round(m-n/2)-g/2;c.strokeRect(o,p,l,n),c.fillRect(o,p,l,n)})},extendRange:function(a){var b=a.data,c=a.xaxis,d=a.yaxis,e=a.timeline.barWidth;c.options.min===null&&(c.min=c.datamin-e/2);if(c.options.max===null){var f=c.max;Flotr._.each(b,function(a){f=Math.max(f,a[0]+a[2])},this),c.max=f+e/2}d.options.min===null&&(d.min=d.datamin-e),d.options.min===null&&(d.max=d.datamax+e)}}),function(){var a=Flotr.DOM;Flotr.addPlugin("crosshair",{options:{mode:null,color:"#FF0000",hideCursor:!0},callbacks:{"flotr:mousemove":function(a,b){this.options.crosshair.mode&&this.crosshair.clearCrosshair(),this.options.crosshair.mode&&this.crosshair.drawCrosshair(b)}},drawCrosshair:function(b){var c=this.octx,d=this.options.crosshair,e=this.plotOffset,f=e.left+b.relX+.5,g=e.top+b.relY+.5;if(b.relX<0||b.relY<0||b.relX>this.plotWidth||b.relY>this.plotHeight){this.el.style.cursor=null,a.removeClass(this.el,"flotr-crosshair");return}this.lastMousePos.relX=null,this.lastMousePos.relY=null,d.hideCursor&&(this.el.style.cursor="none",a.addClass(this.el,"flotr-crosshair")),c.save(),c.strokeStyle=d.color,c.lineWidth=1,c.beginPath(),d.mode.indexOf("x")!=-1&&(c.moveTo(f,e.top),c.lineTo(f,e.top+this.plotHeight),this.lastMousePos.relX=f),d.mode.indexOf("y")!=-1&&(c.moveTo(e.left,g),c.lineTo(e.left+this.plotWidth,g),this.lastMousePos.relY=g),c.stroke(),c.restore()},clearCrosshair:function(){this.lastMousePos.relX&&this.octx.clearRect(this.lastMousePos.relX-.5,this.plotOffset.top,1,this.plotHeight+1),this.lastMousePos.relY&&this.octx.clearRect(this.plotOffset.left,this.lastMousePos.relY-.5,this.plotWidth+1,1)}})}(),function(){function c(a,b,c,d){var e="image/"+a,f=b.toDataURL(e),g=new Image;return g.src=f,g}var a=Flotr.DOM,b=Flotr._;Flotr.addPlugin("download",{saveImage:function(d,e,f,g){var h=null;if(Flotr.isIE&&Flotr.isIE<9)return h="<html><body>"+this.canvas.firstChild.innerHTML+"</body></html>",window.open().document.write(h);if(d!=="jpeg"&&d!=="png")return;h=c(d,this.canvas,e,f);if(!b.isElement(h)||!g)return window.open(h.src);this.download.restoreCanvas(),a.hide(this.canvas),a.hide(this.overlay),a.setStyles({position:"absolute"}),a.insert(this.el,h),this.saveImageElement=h},restoreCanvas:function(){a.show(this.canvas),a.show(this.overlay),this.saveImageElement&&this.el.removeChild(this.saveImageElement),this.saveImageElement=null}})}(),function(){var a=Flotr.EventAdapter,b=Flotr._;Flotr.addPlugin("graphGrid",{callbacks:{"flotr:beforedraw":function(){this.graphGrid.drawGrid()},"flotr:afterdraw":function(){this.graphGrid.drawOutline()}},drawGrid:function(){function p(a){for(n=0;n<a.length;++n){var b=a[n].v/l.max;for(o=0;o<=u;++o)c[o===0?"moveTo":"lineTo"](Math.cos(o*v+w)*t*b,Math.sin(o*v+w)*t*b)}}function q(a,d){b.each(b.pluck(a,"v"),function(a){if(a<=l.min||a>=l.max||(a==l.min||a==l.max)&&e.outlineWidth)return;d(Math.floor(l.d2p(a))+c.lineWidth/2)})}function r(a){c.moveTo(a,0),c.lineTo(a,j)}function s(a){c.moveTo(0,a),c.lineTo(k,a)}var c=this.ctx,d=this.options,e=d.grid,f=e.verticalLines,g=e.horizontalLines,h=e.minorVerticalLines,i=e.minorHorizontalLines,j=this.plotHeight,k=this.plotWidth,l,m,n,o;(f||h||g||i)&&a.fire(this.el,"flotr:beforegrid",[this.axes.x,this.axes.y,d,this]),c.save(),c.lineWidth=1,c.strokeStyle=e.tickColor;if(e.circular){c.translate(this.plotOffset.left+k/2,this.plotOffset.top+j/2);var t=Math.min(j,k)*d.radar.radiusRatio/2,u=this.axes.x.ticks.length,v=2*(Math.PI/u),w=-Math.PI/2;c.beginPath(),l=this.axes.y,g&&p(l.ticks),i&&p(l.minorTicks),f&&b.times(u,function(a){c.moveTo(0,0),c.lineTo(Math.cos(a*v+w)*t,Math.sin(a*v+w)*t)}),c.stroke()}else c.translate(this.plotOffset.left,this.plotOffset.top),e.backgroundColor&&(c.fillStyle=this.processColor(e.backgroundColor,{x1:0,y1:0,x2:k,y2:j}),c.fillRect(0,0,k,j)),c.beginPath(),l=this.axes.x,f&&q(l.ticks,r),h&&q(l.minorTicks,r),l=this.axes.y,g&&q(l.ticks,s),i&&q(l.minorTicks,s),c.stroke();c.restore(),(f||h||g||i)&&a.fire(this.el,"flotr:aftergrid",[this.axes.x,this.axes.y,d,this])},drawOutline:function(){var a=this,b=a.options,c=b.grid,d=a.ctx,e=c.backgroundImage,f=a.plotOffset,g=f.left,h=f.top,j=a.plotWidth,k=a.plotHeight,l,m,n,o,p,q;if(!c.outlineWidth)return;d.save();if(c.circular){d.translate(g+j/2,h+k/2);var r=Math.min(k,j)*b.radar.radiusRatio/2,s=this.axes.x.ticks.length,t=2*(Math.PI/s),u=-Math.PI/2;d.beginPath(),d.lineWidth=c.outlineWidth,d.strokeStyle=c.color,d.lineJoin="round";for(i=0;i<=s;++i)d[i===0?"moveTo":"lineTo"](Math.cos(i*t+u)*r,Math.sin(i*t+u)*r);d.stroke()}else{d.translate(g,h);var v=c.outlineWidth,w=.5-v+(v+1)%2/2;d.lineWidth=v,d.strokeStyle=c.color,d.lineJoin="miter",d.strokeRect(w,w,j,k)}d.restore(),e&&(n=e.src||e,o=(parseInt(e.left,10)||0)+f.left,p=(parseInt(e.top,10)||0)+f.top,m=new Image,m.onload=function(){d.save(),e.alpha&&(d.globalAlpha=e.alpha),d.globalCompositeOperation="destination-over",d.drawImage(m,0,0,j,k,o,p,j,k),d.restore()},m.src=n)}})}(),function(){var a=Flotr.DOM,b=Flotr._,c=Flotr,d="opacity:0.7;background-color:#000;color:#fff;display:none;position:absolute;padding:2px 8px;-moz-border-radius:4px;border-radius:4px;white-space:nowrap;";Flotr.addPlugin("hit",{callbacks:{"flotr:mousemove":function(a,b){this.hit.track(b)},"flotr:click":function(a){this.hit.track(a)},"flotr:mouseout":function(){this.hit.clearHit()}},track:function(a){(this.options.mouse.track||b.any(this.series,function(a){return a.mouse&&a.mouse.track}))&&this.hit.hit(a)},executeOnType:function(a,d,e){function h(a,h){b.each(b.keys(c.graphTypes),function(b){a[b]&&a[b].show&&this[b][d]&&(g=this.getOptions(a,b),g.fill=!!a.mouse.fillColor,g.fillStyle=this.processColor(a.mouse.fillColor||"#ffffff",{opacity:a.mouse.fillOpacity}),g.color=a.mouse.lineColor,g.context=this.octx,g.index=h,e&&(g.args=e),this[b][d].call(this[b],g),f=!0)},this)}var f=!1,g;return b.isArray(a)||(a=[a]),b.each(a,h,this),f},drawHit:function(a){var b=this.octx,c=a.series;if(c.mouse.lineColor){b.save(),b.lineWidth=c.points?c.points.lineWidth:1,b.strokeStyle=c.mouse.lineColor,b.fillStyle=this.processColor(c.mouse.fillColor||"#ffffff",{opacity:c.mouse.fillOpacity}),b.translate(this.plotOffset.left,this.plotOffset.top);if(!this.hit.executeOnType(c,"drawHit",a)){var d=a.xaxis,e=a.yaxis;b.beginPath(),b.arc(d.d2p(a.x),e.d2p(a.y),c.points.radius||c.mouse.radius,0,2*Math.PI,!0),b.fill(),b.stroke(),b.closePath()}b.restore()}this.prevHit=a},clearHit:function(){var b=this.prevHit,c=this.octx,d=this.plotOffset;c.save(),c.translate(d.left,d.top);if(b){if(!this.hit.executeOnType(b.series,"clearHit",this.prevHit)){var e=b.series,f=e.points?e.points.lineWidth:1;offset=(e.points.radius||e.mouse.radius)+f,c.clearRect(b.xaxis.d2p(b.x)-offset,b.yaxis.d2p(b.y)-offset,offset*2,offset*2)}a.hide(this.mouseTrack),this.prevHit=null}c.restore()},hit:function(a){var c=this.options,d=this.prevHit,e,f,g,h,i,j,k,l;if(this.series.length===0)return;n={relX:a.relX,relY:a.relY,absX:a.absX,absY:a.absY};if(c.mouse.trackY&&!c.mouse.trackAll&&this.hit.executeOnType(this.series,"hit",[a,n]))b.isUndefined(n.seriesIndex)||(i=this.series[n.seriesIndex],n.series=i,n.mouse=i.mouse,n.xaxis=i.xaxis,n.yaxis=i.yaxis);else{e=this.hit.closest(a);if(e){e=c.mouse.trackY?e.point:e.x,h=e.seriesIndex,i=this.series[h],k=i.xaxis,l=i.yaxis,f=2*i.mouse.sensibility;if(c.mouse.trackAll||e.distanceX<f/k.scale&&(!c.mouse.trackY||e.distanceY<f/l.scale))n.series=i,n.xaxis=i.xaxis,n.yaxis=i.yaxis,n.mouse=i.mouse,n.x=e.x,n.y=e.y,n.dist=e.distance,n.index=e.dataIndex,n.seriesIndex=h}}if(!d||d.index!==n.index||d.seriesIndex!==n.seriesIndex)this.hit.clearHit(),n.series&&n.mouse&&n.mouse.track&&(this.hit.drawMouseTrack(n),this.hit.drawHit(n),Flotr.EventAdapter.fire(this.el,"flotr:hit",[n,this]))},closest:function(a){function t(a){a.distance=m,a.distanceX=n,a.distanceY=o,a.seriesIndex=r,a.dataIndex=s,a.x=p,a.y=q}var b=this.series,c=this.options,d=a.x,e=a.y,f=Number.MAX_VALUE,g=Number.MAX_VALUE,h={},i={},j=!1,k,l,m,n,o,p,q,r,s;for(r=0;r<b.length;r++){k=b[r],l=k.data,l.length&&(j=!0);for(s=l.length;s--;){p=l[s][0],q=l[s][1];if(p===null||q===null)continue;n=Math.abs(p-d),o=Math.abs(q-e),m=n*n+o*o,m<f&&(f=m,t(h)),n<g&&(g=n,t(i))}}return j?{point:h,x:i}:!1},drawMouseTrack:function(b){var c="",e=b.series,f=b.mouse.position,g=b.mouse.margin,h=d,i=this.mouseTrack,j=this.plotOffset,k=j.left,l=j.right,m=j.bottom,n=j.top,o=b.mouse.trackDecimals,p=this.options;i||(i=a.node('<div class="flotr-mouse-value"></div>'),this.mouseTrack=i,a.insert(this.el,i));if(!b.mouse.relative)f.charAt(0)=="n"?c+="top:"+(g+n)+"px;bottom:auto;":f.charAt(0)=="s"&&(c+="bottom:"+(g+m)+"px;top:auto;"),f.charAt(1)=="e"?c+="right:"+(g+l)+"px;left:auto;":f.charAt(1)=="w"&&(c+="left:"+(g+k)+"px;right:auto;");else if(e.bars.show)c+="bottom:"+(g-n-b.yaxis.d2p(b.y/2)+this.canvasHeight)+"px;top:auto;",c+="left:"+(g+k+b.xaxis.d2p(b.x-p.bars.barWidth/2))+"px;right:auto;";else if(e.pie.show){var q={x:this.plotWidth/2,y:this.plotHeight/2},r=Math.min(this.canvasWidth,this.canvasHeight)*e.pie.sizeRatio/2,s=b.sAngle<b.eAngle?(b.sAngle+b.eAngle)/2:(b.sAngle+b.eAngle+2*Math.PI)/2;c+="bottom:"+(g-n-q.y-Math.sin(s)*r/2+this.canvasHeight)+"px;top:auto;",c+="left:"+(g+k+q.x+Math.cos(s)*r/2)+"px;right:auto;"}else f.charAt(0)=="n"?c+="bottom:"+(g-n-b.yaxis.d2p(b.y)+this.canvasHeight)+"px;top:auto;":f.charAt(0)=="s"&&(c+="top:"+(g+n+b.yaxis.d2p(b.y))+"px;bottom:auto;"),f.charAt(1)=="e"?c+="left:"+(g+k+b.xaxis.d2p(b.x))+"px;right:auto;":f.charAt(1)=="w"&&(c+="right:"+(g-k-b.xaxis.d2p(b.x)+this.canvasWidth)+"px;left:auto;");h+=c,i.style.cssText=h;if(!o||o<0)o=0;i.innerHTML=b.mouse.trackFormatter({x:b.x.toFixed(o),y:b.y.toFixed(o),series:b.series,index:b.index,nearest:b,fraction:b.fraction}),a.show(i)}})}(),function(){function a(a,b){return a.which?a.which===1:a.button===0||a.button===1}function b(a,b){return Math.min(Math.max(0,a),b.plotWidth-1)}function c(a,b){return Math.min(Math.max(0,a),b.plotHeight)}var d=Flotr.DOM,e=Flotr.EventAdapter,f=Flotr._;Flotr.addPlugin("selection",{options:{mode:null,color:"#B6D9FF",fps:20},callbacks:{"flotr:mouseup":function(a){if(!this.options.selection||!this.options.selection.mode)return;this.selection.interval&&clearInterval(this.selection.interval);var b=e.eventPointer(a);this.selection.setSelectionPos(this.selection.selection.second,{pageX:b.x,pageY:b.y}),this.selection.clearSelection(),this.selection.selecting&&this.selection.selectionIsSane()&&(this.selection.drawSelection(),this.selection.fireSelectEvent(),this.ignoreClick=!0)},"flotr:mousedown":function(b){if(!this.options.selection||!this.options.selection.mode)return;if(!this.options.selection.mode||!a(b)&&f.isUndefined(b.touches))return;var c=e.eventPointer(b);this.selection.setSelectionPos(this.selection.selection.first,{pageX:c.x,pageY:c.y}),this.selection.interval&&clearInterval(this.selection.interval),this.lastMousePos.pageX=null,this.selection.selecting=!1,this.selection.interval=setInterval(f.bind(this.selection.updateSelection,this),1e3/this.options.selection.fps)}},getArea:function(){var a=this.selection.selection,b=a.first,c=a.second;return{x1:Math.min(b.x,c.x),x2:Math.max(b.x,c.x),y1:Math.min(b.y,c.y),y2:Math.max(b.y,c.y)}},selection:{first:{x:-1,y:-1},second:{x:-1,y:-1}},prevSelection:null,interval:null,fireSelectEvent:function(a){var b=this.axes,c=this.selection.selection,d,f,g,h;a=a||"select",d=b.x.p2d(c.first.x),f=b.x.p2d(c.second.x),g=b.y.p2d(c.first.y),h=b.y.p2d(c.second.y),e.fire(this.el,"flotr:"+a,[{x1:Math.min(d,f),y1:Math.min(g,h),x2:Math.max(d,f),y2:Math.max(g,h),xfirst:d,xsecond:f,yfirst:g,ysecond:h},this])},setSelection:function(a,d){var e=this.options,f=this.axes.x,g=this.axes.y,h=g.scale,i=f.scale,j=e.selection.mode.indexOf("x")!=-1,k=e.selection.mode.indexOf("y")!=-1,l=this.selection.selection;this.selection.clearSelection(),l.first.y=c(j&&!k?0:(g.max-a.y1)*h,this),l.second.y=c(j&&!k?this.plotHeight-1:(g.max-a.y2)*h,this),l.first.x=b(k&&!j?0:a.x1,this),l.second.x=b(k&&!j?this.plotWidth:a.x2,this),this.selection.drawSelection(),d||this.selection.fireSelectEvent()},setSelectionPos:function(a,e){var f=this.options,g=d.position(this.overlay),h=this.selection.selection;f.selection.mode.indexOf("x")==-1?a.x=a==h.first?0:this.plotWidth:a.x=b(e.pageX-g.left-this.plotOffset.left,this),f.selection.mode.indexOf("y")==-1?a.y=a==h.first?0:this.plotHeight-1:a.y=c(e.pageY-g.top-this.plotOffset.top,this)},drawSelection:function(){this.selection.fireSelectEvent("selecting");var a=this.selection.selection,b=this.octx,c=this.options,d=this.plotOffset,e=this.selection.prevSelection;if(e&&a.first.x==e.first.x&&a.first.y==e.first.y&&a.second.x==e.second.x&&a.second.y==e.second.y)return;b.save(),b.strokeStyle=this.processColor(c.selection.color,{opacity:.8}),b.lineWidth=1,b.lineJoin="miter",b.fillStyle=this.processColor(c.selection.color,{opacity:.4}),this.selection.prevSelection={first:{x:a.first.x,y:a.first.y},second:{x:a.second.x,y:a.second.y}};var f=Math.min(a.first.x,a.second.x),g=Math.min(a.first.y,a.second.y),h=Math.abs(a.second.x-a.first.x),i=Math.abs(a.second.y-a.first.y);b.fillRect(f+d.left+.5,g+d.top+.5,h,i),b.strokeRect(f+d.left+.5,g+d.top+.5,h,i),b.restore()},updateSelection:function(){if(!this.lastMousePos.pageX)return;this.selection.selecting=!0,this.selection.setSelectionPos(this.selection.selection.second,this.lastMousePos),this.selection.clearSelection(),this.selection.selectionIsSane()&&this.selection.drawSelection()},clearSelection:function(){if(!this.selection.prevSelection)return;var a=this.selection.prevSelection,b=1,c=this.plotOffset,d=Math.min(a.first.x,a.second.x),e=Math.min(a.first.y,a.second.y),f=Math.abs(a.second.x-a.first.x),g=Math.abs(a.second.y-a.first.y);this.octx.clearRect(d+c.left-b+.5,e+c.top-b,f+2*b+.5,g+2*b+.5),this.selection.prevSelection=null},selectionIsSane:function(){var a=this.selection.selection;return Math.abs(a.second.x-a.first.x)>=5||Math.abs(a.second.y-a.first.y)>=5}})}(),function(){var a=Flotr.DOM;Flotr.addPlugin("labels",{callbacks:{"flotr:afterdraw":function(){this.labels.draw()}},draw:function(){function s(a,b,d){var e=d?b.minorTicks:b.ticks,f=b.orientation===1,h=b.n===1,k,m;k={color:b.options.color||o.grid.color,angle:Flotr.toRad(b.options.labelsAngle),textBaseline:"middle"};for(l=0;l<e.length&&(d?b.options.showMinorLabels:b.options.showLabels);++l){c=e[l],c.label+="";if(!c.label||!c.label.length)continue;x=Math.cos(l*i+j)*g,y=Math.sin(l*i+j)*g,k.textAlign=f?Math.abs(x)<.1?"center":x<0?"right":"left":"left",Flotr.drawText(p,c.label,f?x:3,f?y:-(b.ticks[l].v/b.max)*(g-o.fontSize),k)}}function t(a,b,d,e){function j(a){return a.options.showLabels&&a.used}function k(a,b,c,d){return a.plotOffset.left+(b?d:c?-o.grid.labelMargin:o.grid.labelMargin+a.plotWidth)}function m(a,b,c,d){return a.plotOffset.top+(b?o.grid.labelMargin:d)+(b&&c?a.plotHeight:0)}var f=b.orientation===1,g=b.n===1,h,i;h={color:b.options.color||o.grid.color,textAlign:d,textBaseline:e,angle:Flotr.toRad(b.options.labelsAngle)},h=Flotr.getBestTextAlign(h.angle,h);for(l=0;l<b.ticks.length&&j(b);++l){c=b.ticks[l];if(!c.label||!c.label.length)continue;i=b.d2p(c.v);if(i<0||i>(f?a.plotWidth:a.plotHeight))continue;Flotr.drawText(p,c.label,k(a,f,g,i),m(a,f,g,i),h),!f&&!g&&(p.save(),p.strokeStyle=h.color,p.beginPath(),p.moveTo(a.plotOffset.left+a.plotWidth-8,a.plotOffset.top+b.d2p(c.v)),p.lineTo(a.plotOffset.left+a.plotWidth,a.plotOffset.top+b.d2p(c.v)),p.stroke(),p.restore())}}function u(a,b){var d=b.orientation===1,e=b.n===1,g,h,i,j=a.plotOffset,k;!d&&!e&&(p.save(),p.strokeStyle=b.options.color||o.grid.color,p.beginPath());if(b.options.showLabels&&(e?!0:b.used))for(l=0;l<b.ticks.length;++l){c=b.ticks[l];if(!c.label||!c.label.length||(d?j.left:j.top)+b.d2p(c.v)<0||(d?j.left:j.top)+b.d2p(c.v)>(d?a.canvasWidth:a.canvasHeight))continue;i=j.top+(d?(e?1:-1)*(a.plotHeight+o.grid.labelMargin):b.d2p(c.v)-b.maxLabel.height/2),g=d?j.left+b.d2p(c.v)-f/2:0,l===0?k=" first":l===b.ticks.length-1?k=" last":k="",m+=['<div style="position:absolute; text-align:'+(d?"center":"right")+"; ","top:"+i+"px; ",(!d&&!e?"right:":"left:")+g+"px; ","width:"+(d?f:(e?j.left:j.right)-o.grid.labelMargin)+"px; ",b.options.color?"color:"+b.options.color+"; ":" ",'" class="flotr-grid-label'+k+'">'+c.label+"</div>"].join(" "),!d&&!e&&(p.moveTo(j.left+a.plotWidth-8,j.top+b.d2p(c.v)),p.lineTo(j.left+a.plotWidth,j.top+b.d2p(c.v)))}}var b,c,d,e,f,g,h,i,j,k,l,m="",n=0,o=this.options,p=this.ctx,q=this.axes,r={size:o.fontSize};for(l=0;l<q.x.ticks.length;++l)q.x.ticks[l].label&&++n;f=this.plotWidth/n,o.grid.circular&&(p.save(),p.translate(this.plotOffset.left+this.plotWidth/2,this.plotOffset.top+this.plotHeight/2),g=this.plotHeight*o.radar.radiusRatio/2+o.fontSize,h=this.axes.x.ticks.length,i=2*(Math.PI/h),j=-Math.PI/2,s(this,q.x,!1),s(this,q.x,!0),s(this,q.y,!1),s(this,q.y,!0),p.restore()),!o.HtmlText&&this.textEnabled?(t(this,q.x,"center","top"),t(this,q.x2,"center","bottom"),t(this,q.y,"right","middle"),t(this,q.y2,"left","middle")):(q.x.options.showLabels||q.x2.options.showLabels||q.y.options.showLabels||q.y2.options.showLabels)&&!o.grid.circular&&(m="",u(this,q.x),u(this,q.x2),u(this,q.y),u(this,q.y2),p.stroke(),p.restore(),k=a.create("div"),a.setStyles(k,{fontSize:"smaller",color:o.grid.color}),k.className="flotr-labels",a.insert(this.el,k),a.insert(k,m))}})}(),function(){var a=Flotr.DOM,b=Flotr._;Flotr.addPlugin("legend",{options:{show:!0,noColumns:1,labelFormatter:function(a){return a},labelBoxBorderColor:"#CCCCCC",labelBoxWidth:14,labelBoxHeight:10,labelBoxMargin:5,labelBoxOpacity:.4,container:null,position:"nw",margin:5,backgroundColor:null,backgroundOpacity:.85},callbacks:{"flotr:afterinit":function(){this.legend.insertLegend()}},insertLegend:function(){if(!this.options.legend.show)return;var c=this.series,d=this.plotOffset,e=this.options,f=e.legend,g=[],h=!1,i=this.ctx,j=b.filter(c,function(a){return a.label&&!a.hide}).length,k=f.position,l=f.margin,m,n,o;if(j)if(!e.HtmlText&&this.textEnabled&&!f.container){var p={size:e.fontSize*1.1,color:e.grid.color},q=f.labelBoxWidth,r=f.labelBoxHeight,s=f.labelBoxMargin,t=d.left+l,u=d.top+l,v=0;for(m=c.length-1;m>-1;--m){if(!c[m].label||c[m].hide)continue;n=f.labelFormatter(c[m].label),v=Math.max(v,this._text.measureText(n,p).width)}var w=Math.round(q+s*3+v),x=Math.round(j*(s+r)+s);k.charAt(0)=="s"&&(u=d.top+this.plotHeight-(l+x)),k.charAt(1)=="e"&&(t=d.left+this.plotWidth-(l+w)),o=this.processColor(f.backgroundColor||"rgb(240,240,240)",{opacity:f.backgroundOpacity||.1}),i.fillStyle=o,i.fillRect(t,u,w,x),i.strokeStyle=f.labelBoxBorderColor,i.strokeRect(Flotr.toPixel(t),Flotr.toPixel(u),w,x);var y=t+s,z=u+s;for(m=0;m<c.length;m++){if(!c[m].label||c[m].hide)continue;n=f.labelFormatter(c[m].label),i.fillStyle=c[m].color,i.fillRect(y,z,q-1,r-1),i.strokeStyle=f.labelBoxBorderColor,i.lineWidth=1,i.strokeRect(Math.ceil(y)-1.5,Math.ceil(z)-1.5,q+2,r+2),Flotr.drawText(i,n,y+q+s,z+r,p),z+=r+s}}else{for(m=0;m<c.length;++m){if(!c[m].label||c[m].hide)continue;m%f.noColumns===0&&(g.push(h?"</tr><tr>":"<tr>"),h=!0);var A=c[m],B=f.labelBoxWidth,C=f.labelBoxHeight,E=A.bars?A.bars.fillOpacity:f.labelBoxOpacity,F="opacity:"+E+";filter:alpha(opacity="+E*100+");";n=f.labelFormatter(A.label),o="background-color:"+(A.bars&&A.bars.show&&A.bars.fillColor&&A.bars.fill?A.bars.fillColor:A.color)+";",g.push('<td class="flotr-legend-color-box">','<div style="border:1px solid ',f.labelBoxBorderColor,';padding:1px">','<div style="width:',B-1,"px;height:",C-1,"px;border:1px solid ",c[m].color,'">','<div style="width:',B,"px;height:",C,"px;","opacity:.4;",o,'"></div>',"</div>","</div>","</td>",'<td class="flotr-legend-label">',n,"</td>")}h&&g.push("</tr>");if(g.length>0){var G='<table style="font-size:smaller;color:'+e.grid.color+'">'+g.join("")+"</table>";if(f.container)a.insert(f.container,G);else{var H={position:"absolute","z-index":2};k.charAt(0)=="n"?(H.top=l+d.top+"px",H.bottom="auto"):k.charAt(0)=="s"&&(H.bottom=l+d.bottom+"px",H.top="auto"),k.charAt(1)=="e"?(H.right=l+d.right+"px",H.left="auto"):k.charAt(1)=="w"&&(H.left=l+d.left+"px",H.right="auto");var I=a.create("div"),J;I.className="flotr-legend",a.setStyles(I,H),a.insert(I,G),a.insert(this.el,I);if(!f.backgroundOpacity)return;var K=f.backgroundColor||e.grid.backgroundColor||"#ffffff";b.extend(H,a.size(I),{backgroundColor:K,"z-index":1}),H.width+="px",H.height+="px",I=a.create("div"),I.className="flotr-legend-bg",a.setStyles(I,H),a.opacity(I,f.backgroundOpacity),a.insert(I," "),a.insert(this.el,I)}}}}})}(),function(){function a(a){if(this.options.spreadsheet.tickFormatter)return this.options.spreadsheet.tickFormatter(a);var b=c.find(this.axes.x.ticks,function(b){return b.v==a});return b?b.label:a}var b=Flotr.DOM,c=Flotr._;Flotr.addPlugin("spreadsheet",{options:{show:!1,tabGraphLabel:"Graph",tabDataLabel:"Data",toolbarDownload:"Download CSV",toolbarSelectAll:"Select all",csvFileSeparator:",",decimalSeparator:".",tickFormatter:null,initialTab:"graph"},callbacks:{"flotr:afterconstruct":function(){if(!this.options.spreadsheet.show)return;var a=this.spreadsheet,c=b.node('<div class="flotr-tabs-group" style="position:absolute;left:0px;width:'+this.canvasWidth+'px"></div>'),d=b.node('<div style="float:left" class="flotr-tab selected">'+this.options.spreadsheet.tabGraphLabel+"</div>"),e=b.node('<div style="float:left" class="flotr-tab">'+this.options.spreadsheet.tabDataLabel+"</div>"),f;a.tabsContainer=c,a.tabs={graph:d,data:e},b.insert(c,d),b.insert(c,e),b.insert(this.el,c),f=b.size(e).height+2,this.plotOffset.bottom+=f,b.setStyles(c,{top:this.canvasHeight-f+"px"}),this._observe(d,"click",function(){a.showTab("graph")})._observe(e,"click",function(){a.showTab("data")}),this.options.spreadsheet.initialTab!=="graph"&&a.showTab(this.options.spreadsheet.initialTab)}},loadDataGrid:function(){if(this.seriesData)return this.seriesData;var a=this.series,b={};return c.each(a,function(a,d){c.each(a.data,function(a){var c=a[0],e=a[1],f=b[c];if(f)f[d+1]=e;else{var g=[];g[0]=c,g[d+1]=e,b[c]=g}})}),this.seriesData=c.sortBy(b,function(a,b){return parseInt(b,10)}),this.seriesData},constructDataGrid:function(){if(this.spreadsheet.datagrid)return this.spreadsheet.datagrid;var d=this.series,e=this.spreadsheet.loadDataGrid(),f=["<colgroup><col />"],g,h,i,j=['<table class="flotr-datagrid"><tr class="first-row">'];j.push("<th>&nbsp;</th>"),c.each(d,function(a,b){j.push('<th scope="col">'+(a.label||String.fromCharCode(65+b))+"</th>"),f.push("<col />")}),j.push("</tr>"),c.each(e,function(b){j.push("<tr>"),c.times(d.length+1,function(d){var e="td",f=b[d],g=c.isUndefined(f)?"":Math.round(f*1e5)/1e5;if(d===0){e="th";var h=a.call(this,g);h&&(g=h)}j.push("<"+e+(e=="th"?' scope="row"':"")+">"+g+"</"+e+">")},this),j.push("</tr>")},this),f.push("</colgroup>"),i=b.node(j.join("")),g=b.node('<button type="button" class="flotr-datagrid-toolbar-button">'+this.options.spreadsheet.toolbarDownload+"</button>"),h=b.node('<button type="button" class="flotr-datagrid-toolbar-button">'+this.options.spreadsheet.toolbarSelectAll+"</button>"),this._observe(g,"click",c.bind(this.spreadsheet.downloadCSV,this))._observe(h,"click",c.bind(this.spreadsheet.selectAllData,this));var k=b.node('<div class="flotr-datagrid-toolbar"></div>');b.insert(k,g),b.insert(k,h);var l=this.canvasHeight-b.size(this.spreadsheet.tabsContainer).height-2,m=b.node('<div class="flotr-datagrid-container" style="position:absolute;left:0px;top:0px;width:'+this.canvasWidth+"px;height:"+l+'px;overflow:auto;z-index:10"></div>');return b.insert(m,k),b.insert(m,i),b.insert(this.el,m),this.spreadsheet.datagrid=i,this.spreadsheet.container=m,i},showTab:function(a){if(this.spreadsheet.activeTab===a)return;switch(a){case"graph":b.hide(this.spreadsheet.container),b.removeClass(this.spreadsheet.tabs.data,"selected"),b.addClass(this.spreadsheet.tabs.graph,"selected");break;case"data":this.spreadsheet.datagrid||this.spreadsheet.constructDataGrid(),b.show(this.spreadsheet.container),b.addClass(this.spreadsheet.tabs.data,"selected"),b.removeClass(this.spreadsheet.tabs.graph,"selected");break;default:throw"Illegal tab name: "+a}this.spreadsheet.activeTab=a},selectAllData:function(){if(this.spreadsheet.tabs){var a,b,c,d,e=this.spreadsheet.constructDataGrid();return this.spreadsheet.showTab("data"),setTimeout(function(){(c=e.ownerDocument)&&(d=c.defaultView)&&d.getSelection&&c.createRange&&(a=window.getSelection())&&a.removeAllRanges?(b=c.createRange(),b.selectNode(e),a.removeAllRanges(),a.addRange(b)):document.body&&document.body.createTextRange&&(b=document.body.createTextRange())&&(b.moveToElementText(e),b.select())},0),!0}return!1},downloadCSV:function(){var b="",d=this.series,e=this.options,f=this.spreadsheet.loadDataGrid(),g=encodeURIComponent(e.spreadsheet.csvFileSeparator);if(e.spreadsheet.decimalSeparator===e.spreadsheet.csvFileSeparator)throw"The decimal separator is the same as the column separator ("+e.spreadsheet.decimalSeparator+")";c.each(d,function(a,c){b+=g+'"'+(a.label||String.fromCharCode(65+c)).replace(/\"/g,'\\"')+'"'}),b+="%0D%0A",b+=c.reduce(f,function(b,c){var d=a.call(this,c[0])||"";d='"'+(d+"").replace(/\"/g,'\\"')+'"';var f=c.slice(1).join(g);return e.spreadsheet.decimalSeparator!=="."&&(f=f.replace(/\./g,e.spreadsheet.decimalSeparator)),b+d+g+f+"%0D%0A"},"",this),Flotr.isIE&&Flotr.isIE<9?(b=b.replace(new RegExp(g,"g"),decodeURIComponent(g)).replace(/%0A/g,"\n").replace(/%0D/g,"\r"),window.open().document.write(b)):window.open("data:text/csv,"+b)}})}(),function(){var a=Flotr.DOM;Flotr.addPlugin("titles",{callbacks:{"flotr:afterdraw":function(){this.titles.drawTitles()}},drawTitles:function(){var b,c=this.options,d=c.grid.labelMargin,e=this.ctx,f=this.axes;if(!c.HtmlText&&this.textEnabled){var g={size:c.fontSize,color:c.grid.color,textAlign:"center"};c.subtitle&&Flotr.drawText(e,c.subtitle,this.plotOffset.left+this.plotWidth/2,this.titleHeight+this.subtitleHeight-2,g),g.weight=1.5,g.size*=1.5,c.title&&Flotr.drawText(e,c.title,this.plotOffset.left+this.plotWidth/2,this.titleHeight-2,g),g.weight=1.8,g.size*=.8,f.x.options.title&&f.x.used&&(g.textAlign=f.x.options.titleAlign||"center",g.textBaseline="top",g.angle=Flotr.toRad(f.x.options.titleAngle),g=Flotr.getBestTextAlign(g.angle,g),Flotr.drawText(e,f.x.options.title,this.plotOffset.left+this.plotWidth/2,this.plotOffset.top+f.x.maxLabel.height+this.plotHeight+2*d,g)),f.x2.options.title&&f.x2.used&&(g.textAlign=f.x2.options.titleAlign||"center",g.textBaseline="bottom",g.angle=Flotr.toRad(f.x2.options.titleAngle),g=Flotr.getBestTextAlign(g.angle,g),Flotr.drawText(e,f.x2.options.title,this.plotOffset.left+this.plotWidth/2,this.plotOffset.top-f.x2.maxLabel.height-2*d,g)),f.y.options.title&&f.y.used&&(g.textAlign=f.y.options.titleAlign||"right",g.textBaseline="middle",g.angle=Flotr.toRad(f.y.options.titleAngle),g=Flotr.getBestTextAlign(g.angle,g),Flotr.drawText(e,f.y.options.title,this.plotOffset.left-f.y.maxLabel.width-2*d,this.plotOffset.top+this.plotHeight/2,g)),f.y2.options.title&&f.y2.used&&(g.textAlign=f.y2.options.titleAlign||"left",g.textBaseline="middle",g.angle=Flotr.toRad(f.y2.options.titleAngle),g=Flotr.getBestTextAlign(g.angle,g),Flotr.drawText(e,f.y2.options.title,this.plotOffset.left+this.plotWidth+f.y2.maxLabel.width+2*d,this.plotOffset.top+this.plotHeight/2,g))}else{b=[],c.title&&b.push('<div style="position:absolute;top:0;left:',this.plotOffset.left,"px;font-size:1em;font-weight:bold;text-align:center;width:",this.plotWidth,'px;" class="flotr-title">',c.title,"</div>"),c.subtitle&&b.push('<div style="position:absolute;top:',this.titleHeight,"px;left:",this.plotOffset.left,"px;font-size:smaller;text-align:center;width:",this.plotWidth,'px;" class="flotr-subtitle">',c.subtitle,"</div>"),b.push("</div>"),b.push('<div class="flotr-axis-title" style="font-weight:bold;">'),f.x.options.title&&f.x.used&&b.push('<div style="position:absolute;top:',this.plotOffset.top+this.plotHeight+c.grid.labelMargin+f.x.titleSize.height,"px;left:",this.plotOffset.left,"px;width:",this.plotWidth,'px;text-align:center;" class="flotr-axis-title">',f.x.options.title,"</div>"),f.x2.options.title&&f.x2.used&&b.push('<div style="position:absolute;top:0;left:',this.plotOffset.left,"px;width:",this.plotWidth,'px;text-align:center;" class="flotr-axis-title">',f.x2.options.title,"</div>"),f.y.options.title&&f.y.used&&b.push('<div style="position:absolute;top:',this.plotOffset.top+this.plotHeight/2-f.y.titleSize.height/2,'px;left:0;text-align:right;" class="flotr-axis-title">',f.y.options.title,"</div>"),f.y2.options.title&&f.y2.used&&b.push('<div style="position:absolute;top:',this.plotOffset.top+this.plotHeight/2-f.y.titleSize.height/2,'px;right:0;text-align:right;" class="flotr-axis-title">',f.y2.options.title,"</div>"),b=b.join("");var h=a.create("div");a.setStyles({color:c.grid.color}),h.className="flotr-titles",a.insert(this.el,h),a.insert(h,b)}}})}();
/*!
  * Bonzo: DOM Utility (c) Dustin Diaz 2011
  * https://github.com/ded/bonzo
  * License MIT
  */
!function(a,b){typeof define=="function"?define(b):typeof module!="undefined"?module.exports=b():this[a]=b()}("bonzo",function(){function x(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function y(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c||a[d],a[d],d,a);return a}function z(a){return a.replace(/-(.)/g,function(a,b){return b.toUpperCase()})}function A(a){return a&&a.nodeName&&a.nodeType==1}function B(a,b,c,d){for(d=0,j=a.length;d<j;++d)if(b.call(c,a[d],d,a))return!0;return!1}function D(a,b,c){var d=0,g=b||this,h=[],i=f&&typeof a=="string"&&a.charAt(0)!="<"?function(b){return(b=f(a))&&(b.selected=1)&&b}():a;return y(J(i),function(a){y(g,function(b){var f=!b[e]||b[e]&&!b[e][e]?function(){var a=b.cloneNode(!0);return g.$&&g.cloneEvents&&g.$(a).cloneEvents(b),a}():b;c(a,f),h[d]=f,d++})},this),y(h,function(a,b){g[b]=a}),g.length=d,g}function E(a,b,c){var d=N(a),e=d.css("position"),f=d.offset(),g="relative",h=e==g,i=[parseInt(d.css("left"),10),parseInt(d.css("top"),10)];e=="static"&&(d.css("position",g),e=g),isNaN(i[0])&&(i[0]=h?0:a.offsetLeft),isNaN(i[1])&&(i[1]=h?0:a.offsetTop),b!=null&&(a.style.left=b-f.left+i[0]+q),c!=null&&(a.style.top=c-f.top+i[1]+q)}function F(a,b){return x(b).test(a.className)}function G(a,b){a.className=w(a.className+" "+b)}function H(a,b){a.className=w(a.className.replace(x(b)," "))}function I(a){this.length=0;if(a){a=typeof a!="string"&&!a.nodeType&&typeof a.length!="undefined"?a:[a],this.length=a.length;for(var b=0;b<a.length;b++)this[b]=a[b]}}function J(a){return typeof a=="string"?N.create(a):A(a)?[a]:a}function K(a,c,d){var e=this[0];return a==null&&c==null?(L(e)?M():{x:e.scrollLeft,y:e.scrollTop})[d]:(L(e)?b.scrollTo(a,c):(a!=null&&(e.scrollLeft=a),c!=null&&(e.scrollTop=c)),this)}function L(a){return a===b||/^(?:body|html)$/i.test(a.tagName)}function M(){return{x:b.pageXOffset||d.scrollLeft,y:b.pageYOffset||d.scrollTop}}function N(a,b){return new I(a,b)}var a=this,b=window,c=b.document,d=c.documentElement,e="parentNode",f=null,g=/^checked|value|selected$/,h=/select|fieldset|table|tbody|tfoot|td|tr|colgroup/i,i="table",k={thead:i,tbody:i,tfoot:i,tr:"tbody",th:"tr",td:"tr",fieldset:"form",option:"select"},l=/^checked|selected$/,m=/msie/i.test(navigator.userAgent),n=[],o=0,p=/^-?[\d\.]+$/,q="px",r="setAttribute",s="getAttribute",t=/(^\s*|\s*$)/g,u={lineHeight:1,zoom:1,zIndex:1,opacity:1},v=function(){var a=["webkitTransform","MozTransform","OTransform","msTransform","Transform"],b;for(b=0;b<a.length;b++)if(a[b]in c.createElement("a").style)return a[b]}(),w=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(t,"")},C=c.defaultView&&c.defaultView.getComputedStyle?function(a,b){b=b=="transform"?v:b,b=b=="transform-origin"?v+"Origin":b;var d=null;b=="float"&&(b="cssFloat");var e=c.defaultView.getComputedStyle(a,"");return e&&(d=e[z(b)]),a.style[b]||d}:m&&d.currentStyle?function(a,b){b=z(b),b=b=="float"?"styleFloat":b;if(b=="opacity"){var c=100;try{c=a.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(d){try{c=a.filters("alpha").opacity}catch(e){}}return c/100}var f=a.currentStyle?a.currentStyle[b]:null;return a.style[b]||f}:function(a,b){return a.style[z(b)]};I.prototype={get:function(a){return this[a]},each:function(a,b){return y(this,a,b)},map:function(a,b){var c=[],d,e;for(e=0;e<this.length;e++)d=a.call(this,this[e],e),b?b(d)&&c.push(d):c.push(d);return c},first:function(){return N(this[0])},last:function(){return N(this[this.length-1])},html:function(a,b){function f(b){while(b.firstChild)b.removeChild(b.firstChild);y(J(a),function(a){b.appendChild(a)})}var c=b?d.textContent===null?"innerText":"textContent":"innerHTML",e;return typeof a!="undefined"?this.each(function(b){(e=b.tagName.match(h))?f(b,e[0]):b[c]=a}):this[0]?this[0][c]:""},text:function(a){return this.html(a,1)},addClass:function(a){return this.each(function(b){F(b,a)||G(b,a)})},removeClass:function(a){return this.each(function(b){F(b,a)&&H(b,a)})},hasClass:function(a){return B(this,function(b){return F(b,a)})},toggleClass:function(a,b){return this.each(function(c){typeof b!="undefined"?b?G(c,a):H(c,a):F(c,a)?H(c,a):G(c,a)})},show:function(a){return this.each(function(b){b.style.display=a||""})},hide:function(a){return this.each(function(a){a.style.display="none"})},append:function(a){return this.each(function(b){y(J(a),function(a){b.appendChild(a)})})},prepend:function(a){return this.each(function(b){var c=b.firstChild;y(J(a),function(a){b.insertBefore(a,c)})})},appendTo:function(a,b){return D.call(this,a,b,function(a,b){a.appendChild(b)})},prependTo:function(a,b){return D.call(this,a,b,function(a,b){a.insertBefore(b,a.firstChild)})},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},related:function(a){return this.map(function(b){b=b[a];while(b&&b.nodeType!==1)b=b[a];return b||0},function(a){return a})},before:function(a){return this.each(function(b){y(N.create(a),function(a){b[e].insertBefore(a,b)})})},after:function(a){return this.each(function(b){y(N.create(a),function(a){b[e].insertBefore(a,b.nextSibling)})})},insertBefore:function(a,b){return D.call(this,a,b,function(a,b){a[e].insertBefore(b,a)})},insertAfter:function(a,b){return D.call(this,a,b,function(a,b){var c=a.nextSibling;c?a[e].insertBefore(b,c):a[e].appendChild(b)})},css:function(a,d,e){function g(a,b,c){for(var d in f)f.hasOwnProperty(d)&&(c=f[d],(b=z(d))&&p.test(c)&&!(b in u)&&(c+=q),b=b=="transform"?v:b,b=b=="transformOrigin"?v+"Origin":b,a.style[b]=c)}if(d===undefined&&typeof a=="string")return d=this[0],d?d==c||d==b?(e=d==c?N.doc():N.viewport(),a=="width"?e.width:a=="height"?e.height:""):C(d,a):null;var f=a;typeof a=="string"&&(f={},f[a]=d),m&&f.opacity&&(f.filter="alpha(opacity="+f.opacity*100+")",f.zoom=a.zoom||1,delete f.opacity);if(d=f["float"])m?f.styleFloat=d:f.cssFloat=d,delete f["float"];return this.each(g)},offset:function(a,b){if(typeof a=="number"||typeof b=="number")return this.each(function(c){E(c,a,b)});var c=this[0],d=c.offsetWidth,e=c.offsetHeight,f=c.offsetTop,g=c.offsetLeft;while(c=c.offsetParent)f=f+c.offsetTop,g=g+c.offsetLeft;return{top:f,left:g,height:e,width:d}},attr:function(a,b){var c=this[0];if(typeof a=="string"||a instanceof String)return typeof b=="undefined"?g.test(a)?l.test(a)&&typeof c[a]=="string"?!0:c[a]:c[s](a):this.each(function(c){g.test(a)?c[a]=b:c[r](a,b)});for(var d in a)a.hasOwnProperty(d)&&this.attr(d,a[d]);return this},val:function(a){return typeof a=="string"?this.attr("value",a):this[0].value},removeAttr:function(a){return this.each(function(b){l.test(a)?b[a]=!1:b.removeAttribute(a)})},data:function(a,b){var c=this[0];if(typeof b=="undefined"){c[s]("data-node-uid")||c[r]("data-node-uid",++o);var d=c[s]("data-node-uid");return n[d]||(n[d]={}),n[d][a]}return this.each(function(c){c[s]("data-node-uid")||c[r]("data-node-uid",++o);var d=c[s]("data-node-uid"),e=n[d]||(n[d]={});e[a]=b})},remove:function(){return this.each(function(a){a[e]&&a[e].removeChild(a)})},empty:function(){return this.each(function(a){while(a.firstChild)a.removeChild(a.firstChild)})},detach:function(){return this.map(function(a){return a[e].removeChild(a)})},scrollTop:function(a){return K.call(this,null,a,"y")},scrollLeft:function(a){return K.call(this,a,null,"x")},toggle:function(a){return this.each(function(a){a.style.display=a.offsetWidth||a.offsetHeight?"none":"block"}),a&&a(),this}},N.setQueryEngine=function(a){f=a,delete N.setQueryEngine},N.aug=function(a,b){for(var c in a)a.hasOwnProperty(c)&&((b||I.prototype)[c]=a[c])},N.create=function(a){return typeof a=="string"?function(){var b=/^<([^\s>]+)/.exec(a),d=c.createElement(b&&k[b[1].toLowerCase()]||"div"),e=[];d.innerHTML=a;var f=d.childNodes;d=d.firstChild,e.push(d);while(d=d.nextSibling)d.nodeType==1&&e.push(d);return e}():A(a)?[a.cloneNode(!0)]:[]},N.doc=function(){var a=this.viewport();return{width:Math.max(c.body.scrollWidth,d.scrollWidth,a.width),height:Math.max(c.body.scrollHeight,d.scrollHeight,a.height)}},N.firstChild=function(a){for(var b=a.childNodes,c=0,d=b&&b.length||0,e;c<d;c++)b[c].nodeType===1&&(e=b[d=c]);return e},N.viewport=function(){return{width:m?d.clientWidth:self.innerWidth,height:m?d.clientHeight:self.innerHeight}},N.isAncestor="compareDocumentPosition"in d?function(a,b){return(a.compareDocumentPosition(b)&16)==16}:"contains"in d?function(a,b){return a!==b&&a.contains(b)}:function(a,b){while(b=b[e])if(b===a)return!0;return!1};var O=a.bonzo;return N.noConflict=function(){return a.bonzo=O,this},N})// Envision.js
// (c) 2012 Carl Sutherland, Humble Software
// Distributed under the MIT License
// Source: http://www.github.com/HumbleSoftware/envisionjs
// Homepage: http://www.humblesoftware.com/envision

/**
 * The Envision namespace.
 * @namespace
 */
envision = {

  // Globals
  _ : Flotr._,        // Underscore.js, functional microlib
  bean : Flotr.bean,  // Bean, events
  bonzo : bonzo,      // Bonzo, dom

  // Utility
  noConflict : (function (root) {
    var previous = root.envision;
    return function () {
      root.envision = previous;
      return this;
    }
  })(this)
};

// Visualization Class
(function () { 

var
  CN_FIRST  = 'envision-first',
  CN_LAST   = 'envision-last',

  T_VISUALIZATION   = '<div class="envision-visualization"></div>';
  T_COMPONENT_CONTAINER = '<div class="envision-component-container"></div>';

/**
 * @summary Defines a visualization of componenents.
 *
 * @description This class manages the rendering of a visualization.
 * It provides convenience methods for adding, removing, and reordered
 * components dynamically as well as convenience methods for working
 * with a logical group of components.
 *
 * @param {String} [name]  A name for the visualization.
 * @param {Element} [element]  A container element for the visualization.
 *
 * @memberof envision
 * @class
 */
function Visualization (options) {
  this.options = options || {};
  this.components = [];
  this.node = null;
  this.rendered = false;
}

Visualization.prototype = {

  /**
   * Render the visualization.
   *
   * If no element is submitted, the visualization will
   * render in the element configured in the constructor.
   *
   * This method is chainable.
   *
   * @param {Element} [element]
   */
  render : function (element) {

    var options = this.options;

    element = element || options.element;
    if (!element) throw 'No element to render within.';

    this.node = bonzo.create(T_VISUALIZATION)[0];
    bonzo(this.node).addClass(options.name || '')
    this.container = element;
    bonzo(element).append(this.node);
    bonzo(element).data('envision', this);

    _.each(this.components, function (component) {
      this._renderComponent(component);
    }, this);
    this._updateClasses();

    this.rendered = true;

    return this;
  },

  /**
   * Add a component to the visualization.
   *
   * If the visualization has already been rendered,
   * it will render the new component.
   *
   * This method is chainable.
   *
   * @param {envision.Component} component
   */
  add : function (component) {
    this.components.push(component);
    if (this.rendered) {
      this._renderComponent(component);
      this._updateClasses();
    }
    return this;
  },

  /**
   * Remove a component from the visualization.
   *
   * This removes the components from the list of components in the
   * visualization and removes its container from the DOM.  It does not
   * destroy the component.
   *
   * This method is chainable.
   *
   * @returns {envision.Visualization} This visualization.
   */
  remove : function (component) {
    var
      components  = this.components,
      index = this.indexOf(component);
    if (index !== -1) {
      components.splice(index, 1);
      bonzo(component.container).remove();
      this._updateClasses();
    }
    return this;
  },

  /**
   * Reorders a component.
   *
   * This method is chainable.
   *
   * @param {envision.Component} component
   * @param {Number} newIndex
   */
  setPosition : function (component, newIndex) {
    var
      components  = this.components;
    if (newIndex >= 0 && newIndex < components.length && this.remove(component)) {
      if (this.rendered) {
        if (newIndex === components.length)
          this.node.appendChild(component.container);
        else
          this.node.insertBefore(component.container, components[newIndex].container);
      }
      components.splice(newIndex, 0, component);
      this._updateClasses();
    }
    return this;
  },

  /**
   * Gets the position of a component.
   *
   * @param {envision.Component} component
   */
  indexOf : function (component) {
    return _.indexOf(this.components, component);
  },

  /**
   * Gets the component at a position.
   *
   * @param {envision.Component} component
   * @returns {envision.Component}  The found component.
   */
  getComponent : function (index) {
    var components = this.components;
    if (index < components.length) return components[index];
  },

  /**
   * Gets whether or not the component is the first component
   * in the visualization.
   *
   * @param {envision.Component} component
   * @returns {Boolean}
   */
  isFirst : function (component) {
    return (this.indexOf(component) === 0 ? true : false);
  },

  /**
   * Gets whether or not the component is the last component
   * in the visualization.
   *
   * @param {envision.Component} component
   * @returns {Boolean}
   */
  isLast : function (component) {
    return (this.indexOf(component) === this.components.length - 1 ? true : false);
  },

  /**
   * Destroys the visualization.
   *
   * This empties the container and destroys all the components which are part
   * of the visualization.
   */
  destroy : function () {
    _.each(this.components, function (component) {
      component.destroy();
    });
    bonzo(this.container).empty();
  },

  _renderComponent : function (component) {
    var
      container = bonzo.create(T_COMPONENT_CONTAINER)[0];

    bonzo(this.node).append(container);
    component.render(container);
  },

  _updateClasses : function () {

    var
      components  = this.components,
      first     = 0,
      last      = components.length -1,
      node;

    _.each(components, function (component, index) {
      node = bonzo(component.container);

      if (index === first)
        node.addClass(CN_FIRST);
      else
        node.removeClass(CN_FIRST);

      if (index === last)
        node.addClass(CN_LAST);
      else
        node.removeClass(CN_LAST);
    });
  }
};

envision.Visualization = Visualization;

})();

// Component Class
(function () { 

var

  V = envision,

  CN_COMPONENT = 'envision-component',

  T_COMPONENT = '<div class="' + CN_COMPONENT + '"></div>';

/**
 * @summary Defines a visualization component.
 *
 * @description Components are the building blocks of a visualization, 
 * representing one typically graphical piece of the vis.  This class manages
 * the options, DOM and API construction for an adapter which handles the
 * actual drawing of the visualization piece.
 *
 * Adapters can take the form of an actual object, a constructor function
 * or a function returning an object.  Only one of these will be used.  If
 * none is submitted, the default adapter Flotr2 is used.
 *
 * @param {String} [name]  A name for the component.
 * @param {Element} [element]  A container element for the component.
 * @param {Number} [height]  An explicit component height.
 * @param {Number} [width]  An explicit component width.
 * @param {Array} [data]  An array of data.  Data may be formatted for 
 * envision or for the adapter itself, in which case skipPreprocess will
 * also need to be submitted.
 * @param {Boolean} [skipPreprocess]  Skip data preprocessing.  This is useful
 * when using the native data format for an adapter.
 * @param {Object} [adapter]  An adapter object.
 * @param {Function} [adapterConstructor]  An adapter constructor to be
 * instantiated by the component.
 * @param {Function} [adapterCallback]  An callback invoked by the component
 * returning an adapter.
 * @param {Object} [adapterOptions]  Options passed to the adapter constructor
 * or function.
 *
 * @memberof envision
 * @class
 */
function Component (options) {

  options = options || {};

  var
    node = bonzo.create(T_COMPONENT)[0];

  this.options = options;
  this.node = node;

  if (options.flotr) {
    this.api = new V.adapters.flotr.Child(options);
  } else if (options.adapter) {
    this.api = options.adapter;
  } else if (options.adapterConstructor) {
    this.api = new options.adapterConstructor(options.adapterOptions);
  } else if (options.adapterCallback) {
    this.api = options.adapterCallback.call(null, options.adapterOptions);
  }
}

Component.prototype = {

  /**
   * Render the component.
   *
   * If no element is submitted, the component will
   * render in the element configured in the constructor.
   *
   * @param {Element} [element]
   */
  render : function (element) {

    var
      node = this.node,
      options = this.options;

    element = element || options.element;

    if (!element) throw 'No element to render within.';

    bonzo(element)
      .addClass(options.name || '')
      .append(this.node);
    this._setDimension('width');
    this._setDimension('height');
    this.container = element;

    this.draw(options.data, options.flotr);
  },

  /**
   * Draw the component.
   *
   * @param {Array} [data] Data for the adapter.
   * @param {Object} [options] Configuration object for the adapters draw method.
   */
  draw : function (data, options) {
    if (this.api) {
      this.api.draw(data, options, this.node);
    }
  },

  getData : function () {
    return this.data;
  },

  /**
   * Trigger an event on the component's API.
   *
   * Arguments are passed through to the API.
   */
  trigger : function () {
    this.api.trigger.apply(this.api, Array.prototype.concat.apply([this], arguments));
  },

  /**
   * Attach to an event on the component's API.
   *
   * Arguments are passed through to the API.
   */
  attach : function () {
    this.api.attach.apply(this.api, Array.prototype.concat.apply([this], arguments));
  },

  /**
   * Detach a listener from an event on the component's API.
   *
   * Arguments are passed through to the API.
   */
  detach : function () {
    this.api.detach.apply(this.api, Array.prototype.concat.apply([this], arguments));
  },

  /**
   * Destroy the component.
   *
   * Empties the container and calls the destroy method on the
   * component's API.
   */
  destroy : function () {
    if (this.api && this.api.destroy) this.api.destroy();
    bonzo(this.container).empty();
  },

  _setDimension : function (attribute) {
    var
      node = this.node,
      options = this.options;
    if (options[attribute]) {
      bonzo(node).css(attribute, options[attribute]);
    } else {
      options[attribute] = parseInt(bonzo(node).css(attribute), 10);
    }
    this[attribute] = options[attribute];
  }
};

V.Component = Component;

})();

// Interaction Class
(function () {

var H = envision;

/**
 * @summary Defines an interaction between components.
 *
 * @description  This class defines interactions in which actions are triggered
 * by leader components and reacted to by follower components.  These actions
 * are defined as configurable mappings of trigger events and event consumers.
 * It is up to the adapter to implement the triggers and consumers.
 *
 * A component may be both a leader and a follower.  A leader which is a 
 * follower will react to actions triggered by other leaders, but will safely
 * not react to its own.  This allows for groups of components to perform a
 * common action.
 *
 * Optionally, actions may be supplied with a callback executed before the 
 * action is consumed.  This allows for quick custom functionality to be added
 * and is how advanced data management (ie. live Ajax data) may be implemented.
 *
 * This class follow an observer mediator pattern.
 *
 * @param {envision.Component|Array} [leader]  Component(s) to lead the
 * interaction
 *
 * @memberof envision
 * @class
 */
function Interaction(options) {
  this.options = options = options || {};
  this.actions = [];
  this.actionOptions = [];
  this.followers = [];
  this.leaders = [];
  this.prevent = {};

  if (options.leader) {
    this.leader(options.leader);
  }
}

Interaction.prototype = {

  getLeaders : function () {
    return this.leaders; 
  },

  getFollowers : function () {
    return this.followers; 
  },

  getActions : function () {
    return this.actions;
  },

  /**
   * Add a component as an interaction leader.
   *
   * @param {envision.Component} component
   */
  leader : function (component) {

    this.leaders.push(component);

    _.each(this.actions, function (action, i) {
      this._bindLeader(component, action, this.actionOptions[i]);
    }, this);
    return this;
  },

  /**
   * Add a component as an interaction leader.
   *
   * @param {envision.Component} component
   */
  follower : function (component) {
    this.followers.push(component);
    return this;
  },

  /**
   * Adds an array of components as both followers and leaders.
   *
   * @param {Array} components  An array of components
   */
  group : function (components) {
    if (!_.isArray(components)) components = [components];
    _.each(components, function (component) {
      this.leader(component);
      this.follower(component);
    }, this);
    return this;
  },

  /**
   * Adds an action to the interaction.
   *
   * The action may be optionally configured with the options argument.
   * Currently the accepts a callback member, invoked after an action
   * is triggered and before it is consumed by followers.
   *
   * @param {Object} action
   * @param {Object} [options]
   */
  add : function (action, options) {
    this.actions.push(action);
    this.actionOptions.push(options);
    _.each(this.leaders, function (leader) {
      this._bindLeader(leader, action, options);
    }, this);
    return this;
  },

  _bindLeader : function (leader, action, options) {
    _.each(action.events, function (e) {

      var
        handler = e.handler || e,
        consumer = e.consumer || e;

      leader.attach(handler, _.bind(function (leader, result) {

        if (this.prevent[name]) return;

        // Apply custom callback configured for this action
        if (options && options.callback) {
          options.callback.call(this, result);
        }

        this.prevent[name] = true; // Prevent recursions for this name
        try {
          _.each(this.followers, function (follower) {

            if (leader === follower) return; // Skip leader (recursion)

            follower.trigger(consumer, result);

          }, this);
        } catch (e) {
          this.prevent[name] = false;
          throw e;
        }
        this.prevent[name] = false;
      }, this));
    }, this);
  }
};

H.Interaction = Interaction;

})();

// Preprocessor Class
(function () {

/**
 * @summary Data preprocessor.
 *
 * @description Data can be preprocessed before it is rendered by an adapter.
 *
 * This has several important performance considerations.  If data will be 
 * rendered repeatedly or on slower browsers, it will be faster after being
 * optimized.
 *
 * First, data outside the boundaries does not need to be rendered.  Second,
 * the resolution of the data only needs to be at most the number of pixels
 * in the width of the visualization.
 *
 * Performing these optimizations will limit memory overhead, important
 * for garbage collection and performance on old browsers, as well as drawing
 * overhead, important for mobile devices, old browsers and large data sets.
 *
 * @param {Array} [data]  The data for processing.
 *
 * @memberof envision
 * @class
 */
function Preprocessor (options) {

  options = options || {};

  var
    data;

  /**
   * Returns data.
   */
  this.getData = function () {
    if (this.bounded) bound(this);
    return data;
  }

  /**
   * Set the data object.
   */
  this.setData = function (newData) {
    var
      i, length;
    if (!_.isArray(newData)) throw new Error('Array expected.');
    if (newData.length < 2) throw new Error('Data must contain at least two dimensions.');
    length = newData[0].length;
    for (i = newData.length; i--;) {
      if (!_.isArray(newData[i])) throw new Error('Data dimensions must be arrays.');
      if (newData[i].length !== length) throw new Error('Data dimensions must contain the same number of points.');
    }

    data = newData;

    return this;
  }

  if (options.data) this.setData(options.data);
}

function getStartIndex (data, min) {

  var
    length = data.length,
    i;

  for (i = 0; i < length; i++) {
    if (data[i] >= min) break;
  }

  // Include point outside range when not exact match
  if (data[i] > min && i > 0) i--;

  return i;
}

function getEndIndex (data, max) {

  var
    i;

  for (i = data.length; i--;) {
    if (data[i] <= max) break;
  }

  // Include point outside range when not exact match
  if (data[i] < max && i > 0) i++;

  return i;
}

function bound (that) {

  delete that.bounded;

  var
    data    = that.getData(),
    length  = that.length(),
    x       = data[0],
    y       = data[1],
    min     = that.min || 0,
    max     = that.max || that.length(),
    start   = getStartIndex(x, min),
    end     = getEndIndex(x, max);

  that.setData([
    x.slice(start, end + 1),
    y.slice(start, end + 1)
  ]);
};

Preprocessor.prototype = {

  /**
   * Returns the length of the data set.
   *
   * @return {Number} Length of the data set.
   */
  length : function () {
    return this.getData()[0].length;
  },

  /**
   * Bounds the data set at within a range.
   *
   * @param {Number} min
   * @param {Number} max
   */
  bound : function (min, max) {

    if (!_.isNumber(min) || !_.isNumber(max)) return this;

    this.min = min;
    this.max = max;
    this.bounded = true;

    return this;
  },

  /**
   * Subsample data using MinMax.
   *
   * MinMax will display the extrema of the subsample intervals.  This is
   * slower than regular interval subsampling but necessary for data that 
   * is very non-homogenous.
   *
   * @param {Number} resolution
   */
  subsampleMinMax : function (resolution) {

    var bounded = this.bounded;
    delete this.bounded;

    var
      data    = this.getData(),
      length  = this.length(),
      x       = data[0],
      y       = data[1],
      start   = bounded ? getStartIndex(x, this.min) : 0,
      end     = bounded ? getEndIndex(x, this.max) : length - 1,
      count   = (resolution - 2) / 2,
      newX    = [],
      newY    = [],
      min     = Number.MAX_VALUE,
      max     = -Number.MAX_VALUE,
      minI    = 1,
      maxI    = 1,
      unit    = (end - start)/ count,
      position, min, max, datum, i, j;

    if (end - start + 1 > resolution) {

      newX.push(x[start]);
      newY.push(y[start]);

      position = start + unit;

      for (i = start; i < end; i++) {

        if (i === Math.round(position)) {

          position += unit;

          j = Math.min(maxI, minI);
          newX.push(x[j]);
          newY.push(y[j]);

          j = Math.max(maxI, minI);
          newX.push(x[j]);
          newY.push(y[j]);

          minI = i;
          min = y[minI];
          maxI = i;
          max = y[maxI];

        } else {
          if (y[i] > max) {
            max = y[i];
            maxI = i;
          }

          if (y[i] < min) {
            min = y[i];
            minI = i;
          }
        }
      }

      if (i < position) {
        newX.push(x[minI]);
        newY.push(min);
        newX.push(x[maxI]);
        newY.push(max);
      }

      // Last
      newX.push(x[end]);
      newY.push(y[end]);

      this.setData([newX, newY]);
    } else {
      this.bounded = true;
    }

    return this;
  },

  /**
   * Subsample data at a regular interval for resolution.
   *
   * This is the fastest subsampling and good for monotonic data and fairly
   * homogenous data (not a lot of up and down).
   *
   * @param {Number} resolution
   */
  subsample : function (resolution) {

    var bounded = this.bounded;
    delete this.bounded;

    var
      data    = this.getData(),
      length  = this.length(),
      x       = data[0],
      y       = data[1],
      start   = bounded ? getStartIndex(x, this.min) : 0,
      end     = bounded ? getEndIndex(x, this.max) : length - 1,
      unit    = (end - start + 1) / resolution,
      newX    = [],
      newY    = [],
      i, index;

    if (length > resolution) {

      // First
      newX.push(x[start]);
      newY.push(y[start]);

      for (i = 1; i < resolution; i++) {
        if (i * unit >= end - unit) break;
        index = Math.round(i * unit) + start;
        newX.push(x[index]);
        newY.push(y[index]);
      }

      // Last
      newX.push(x[end]);
      newY.push(y[end]);

      this.setData([newX, newY]);
    }

    return this;
  }
};

envision.Preprocessor = Preprocessor;

}());

/**
 * Actions namespace.  Actions are configurations for 
 * common use cases when building Interactions.
 */
envision.actions = envision.actions || {};

envision.actions.hit = {
  events : [
    'hit',
    'mouseout'
  ]
};

envision.actions.selection =  {
  events : [
    {
      handler : 'select',
      consumer : 'zoom'
    },
    // Reset on click, avoids re-drawing the leader.
    {
        handler : 'click',
        consumer : 'reset'
    }
  ]
};

envision.actions.zoom =  {
  events : [
    // Zoom on the followers as selecting
    {
      handler : 'select',
      consumer : 'zoom'
    },
    // Zoom on the leader after mouseup
    'zoom',
    // Reset all on click
    'reset'
  ]
};

/**
 * Adapters namespace.  These are component adapters for external
 * librares.  Envision.js ships with a Flotr2 adapter.
 */
envision.adapters = envision.adapters || {};

envision.adapters.flotr = {};

/*
 * Flotr Default Options
 */

envision.adapters.flotr.defaultOptions = {
  grid : {
    outlineWidth : 0,
    labelMargin : 0,
    horizontalLines : false,
    verticalLines : false
  },
  bars : {
    show        : false,
    barWidth    : 0.5,
    fill        : true,
    lineWidth   : 1,
    fillOpacity : 1
  },
  lines : {
    lineWidth   : 1
  },
  xaxis : {
    margin      : false,
    tickDecimals: 0,
    showLabels  : false
  },
  yaxis : {
    margin      : false,
    showLabels  : false
  },
  shadowSize    : false
};

/**
 * Flotr Adapter
 */
(function () { 

var
  V = envision,
  A = envision.adapters,
  E = Flotr.EventAdapter,
  DEFAULTS = A.flotr.defaultOptions;

function Child (options) {
  this.options = options || {};
  this.flotr = null;
  this._flotrDefaultOptions();
}

Child.prototype = {

  destroy : function () {
    this.flotr.destroy();
  },

  draw : function (data, flotr, node) {

    var
      o           = this.options,
      flotrData   = [];

    data = data || o.data;

    if (flotr) {
      flotr = Flotr.clone(flotr);
      flotr = Flotr.merge(o.flotr, flotr);
    } else {
      flotr = o.flotr;
    }

    o.data = data;
    min = flotr.xaxis.min;
    max = flotr.xaxis.max;

    data = this._getDataArray(data);
    if (o.skipPreprocess) {
      flotrData = data;
    } else {
      _.each(data, function (d, index) {

        var
          isObject = !_.isArray(d),
          unprocessed = isObject ? d.data : d,
          processed = this._processData(unprocessed, flotr),
          x = processed[0],
          y = processed[1],
          data = [],
          o, i;

        // Transform for Flotr
        for (i = 0; i < x.length; i++) {
          data.push([x[i], y[i]]);
        }

        if (isObject) {
          o = _.extend({}, d);
          o.data = data;
          flotrData.push(o);
        } else {
          flotrData.push(data);
        }

      }, this);
    }

    if (!flotr) throw 'No graph submitted.';

    this.flotr = Flotr.draw(node, flotrData, flotr);
  },

  _processData : function (data, flotr) {

    var
      options     = this.options,
      process     = options.processData,
      resolution  = options.width,
      axis        = flotr.xaxis,
      min         = axis.min,
      max         = axis.max,
      preprocessor;

    if (_.isFunction(data)) {
      return data(min, max, resolution);
    } else if (process) {
      preprocessor = new V.Preprocessor({data : data});
      process.apply(this, [{
        preprocessor : preprocessor,
        min : min,
        max : max,
        resolution : resolution
      }]);
    } else {
      preprocessor = new V.Preprocessor({data : data})
        .bound(min, max)
        .subsampleMinMax(resolution);
    }

    return preprocessor.getData();
  },

  _getDataArray : function (data) {

    if (data[0] && (!_.isArray(data[0]) || (data[0][0] && _.isArray(data[0][0]))))
      return data;
    else
      return [data];
  },

  _flotrDefaultOptions : function (options) {

    var o = options || this.options.flotr,
      i;

    for (i in DEFAULTS) {
      if (DEFAULTS.hasOwnProperty(i)) {
        if (_.isUndefined(o[i])) {
          o[i] = DEFAULTS[i];
        } else {
          _.defaults(o[i], DEFAULTS[i]);
        }
      }
    }
  },

  attach : function (component, name, callback) {

    var
      event = this.events[name] || {},
      name = event.name || false,
      handler = event.handler || false;

    if (handler) {

      return E.observe(component.node, name, function () {

        var
          args = [component].concat(Array.prototype.slice.call(arguments)),
          result = handler.apply(this, args);

        return callback.apply(null, [component, result]);

      });
    } else {
      return false;
    }
  },

  detach : function (component, name, callback) {
    return E.stopObserve(component.node, name, handler);
  },

  trigger : function (component, name, options) {

    var
      event = this.events[name],
      consumer = event.consumer || false;

    return consumer ? consumer.apply(this, [component, options]) : false;
  },

  events : {

    hit : {
      name : 'flotr:hit',
      handler : function (component, hit) {

        var
          x = hit.x,
          y = hit.y,
          graph = component.api.flotr,
          options;

        // Normalized hit:
        options = {
          data : {
            index : hit.index,
            x : x,
            y : y
          },
          x : graph.axes.x.d2p(x),
          y : graph.axes.y.d2p(y)
        };

        return options;
      },
      consumer : function (component, hit) {

        var
          graph = component.api.flotr,
          o;

        // TODO this is a hack;
        // the hit plugin should expose an API to do this easily
        o = {
          x : hit.data.x,
          y : hit.data.y || 1,
          relX : hit.x,
          relY : hit.y || 1
        };

        graph.hit.hit(o);
      }
    },

    select : {
      name : 'flotr:selecting',
      handler : selectHandler,
      consumer : function (component, selection) {

        var
          graph = component.api.flotr,
          axes = graph.axes,
          data = selection.data || {},
          options = {},
          x = selection.x,
          y = selection.y;

        if (!x && data.x) {
          // Translate data to pixels
          x = data.x;
          options.x1 = axes.x.d2p(x.min);
          options.x2 = axes.x.d2p(x.max);
        } else if (x) {
          // Use pixels
          options.x1 = x.min;
          options.x2 = x.max;
        }

        if (!y && data.y) {
          // Translate data to pixels
          y = data.y;
          options.y1 = axes.y.d2p(y.min);
          options.y2 = axes.y.d2p(y.max);
        } else if (y) {
          // Use pixels
          options.y1 = y.min;
          options.y2 = y.max;
        }

        graph.selection.setSelection(options);
      }
    },

    zoom : {
      name : 'flotr:select',
      handler : function (component, selection) {
        var options = selectHandler(component, selection);
        component.trigger('zoom', options);
        return options;
      },
      consumer : function (component, selection) {

        var
          x = selection.data.x,
          y = selection.data.y,
          options = {};

        if (x) {
          options.xaxis = {
            min : x.min,
            max : x.max
          };
        }

        if (y) {
          options.yaxis = {
            min : y.min,
            max : y.max
          };
        }

        component.draw(null, options);
      }
    },

    mouseout : {
      name : 'flotr:mouseout',
      handler : function (component) {
      },
      consumer : function (component) {
        component.api.flotr.hit.clearHit();
      }
    },

    reset : {
      name : 'flotr:click',
      handler : function (component) {
        component.draw();
      },
      consumer : function (component) {
        component.draw();
      }
    },

    click : {
      name : 'flotr:click',
      handler : function (component) {

        var
          min = component.api.flotr.axes.x.min,
          max = component.api.flotr.axes.x.max;

        return {
          data : {
            x : {
              min : min,
              max : max
            }
          },
          x : {
            min : component.api.flotr.axes.x.d2p(min),
            max : component.api.flotr.axes.x.d2p(max)
          }
        };
      },
      consumer : function (component, selection) {

        var
          x = selection.data.x,
          y = selection.data.y,
          options = {};

        if (x) {
          options.xaxis = {
            min : x.min,
            max : x.max
          };
        }

        if (y) {
          options.yaxis = {
            min : y.min,
            max : y.max
          };
        }

        component.draw(null, options);
      }
    }
  }
};

function selectHandler (component, selection) {

  var
    mode = component.options.flotr.selection.mode,
    axes = component.api.flotr.axes,
    datax, datay, x, y, options;

  if (mode.indexOf('x') !== -1) {
    datax = {};
    datax.min = selection.x1;
    datax.max = selection.x2;
    x = {};
    x.min = axes.x.d2p(selection.x1);
    x.max = axes.x.d2p(selection.x2);
  }

  if (mode.indexOf('y') !== -1) {
    datay = {};
    datay.min = selection.y1;
    datay.max = selection.y2;
    y = {};
    y.min = axes.y.d2p(selection.y1);
    y.max = axes.y.d2p(selection.y2);
  }

  // Normalized selection:
  options = {
    data : {
      x : datax,
      y : datay
    },
    x : x,
    y : y
  }

  return options;
}

A.flotr.Child = Child;

})();

/** Lines **/
Flotr.addType('lite-lines', {
  options: {
    show: false,           // => setting to true will show lines, false will hide
    lineWidth: 2,          // => line width in pixels
    fill: false,           // => true to fill the area from the line to the x axis, false for (transparent) no fill
    fillBorder: false,     // => draw a border around the fill
    fillColor: null,       // => fill color
    fillOpacity: 0.4       // => opacity of the fill color, set to 1 for a solid fill, 0 hides the fill
  },

  /**
   * Draws lines series in the canvas element.
   * @param {Object} options
   */
  draw : function (options) {

    var
      context     = options.context,
      lineWidth   = options.lineWidth,
      shadowSize  = options.shadowSize,
      offset;

    context.save();
    context.lineCap = 'butt';
    context.lineWidth = lineWidth;
    context.strokeStyle = options.color;

    this.plot(options);

    context.restore();
  },

  plot : function (options) {

    var
      context   = options.context,
      xScale    = options.xScale,
      yScale    = options.yScale,
      data      = options.data, 
      length    = data.length - 1,
      zero      = yScale(0),
      x0, y0;
      
    if (length < 1) return;

    x0 = xScale(data[0][0]);
    y0 = yScale(data[0][1]);

    context.beginPath();
    context.moveTo(x0, y0);
    for (i = 0; i < length; ++i) {
      context.lineTo(
        xScale(data[i+1][0]),
        yScale(data[i+1][1])
      );
    }

    if (!options.fill || options.fill && !options.fillBorder) context.stroke();

    if (options.fill){
      x0 = xScale(data[0][0]);
      context.fillStyle = options.fillStyle;
      context.lineTo(xScale(data[length][0]), zero);
      context.lineTo(x0, zero);
      context.lineTo(x0, yScale(data[0][1]));
      context.fill();
      if (options.fillBorder) {
        context.stroke();
      }
    }
  }
});

/** Bars **/
Flotr.addType('whiskers', {

  options: {
    show: false,           // => setting to true will show bars, false will hide
    lineWidth: 2,          // => in pixels
    barWidth: 1,           // => in units of the x axis
    fill: true,            // => true to fill the area from the line to the x axis, false for (transparent) no fill
    fillColor: null,       // => fill color
    fillOpacity: 0.4,      // => opacity of the fill color, set to 1 for a solid fill, 0 hides the fill
    horizontal: false,     // => horizontal bars (x and y inverted)
    stacked: false,        // => stacked bar charts
    centered: true         // => center the bars to their x axis value
  },

  stack : { 
    positive : [],
    negative : [],
    _positive : [], // Shadow
    _negative : []  // Shadow
  },

  draw : function (options) {
    var
      context = options.context;

    context.save();
    context.lineJoin = 'miter';
    context.lineCap = 'butt';
    context.lineWidth = options.lineWidth;
    context.strokeStyle = options.color;
    if (options.fill) context.fillStyle = options.fillStyle;
    
    this.plot(options);

    context.restore();
  },

  plot : function (options) {

    var
      data            = options.data,
      context         = options.context,
      shadowSize      = options.shadowSize,
      xScale          = options.xScale,
      yScale          = options.yScale,
      zero            = yScale(0),
      i, x;

    if (data.length < 1) return;

    context.translate(-options.lineWidth, 0)
    context.beginPath();
    for (i = 0; i < data.length; i++) {
      x = xScale(data[i][0]);
      context.moveTo(x, zero);
      context.lineTo(x, yScale(data[i][1]));
    }

    context.closePath();
    context.stroke();
  },

  drawHit : function (options) {

    var
      args            = options.args,
      context         = options.context,
      shadowSize      = options.shadowSize,
      xScale          = options.xScale,
      yScale          = options.yScale,
      zero            = yScale(0),
      x               = xScale(args.x),
      y               = yScale(args.y);

    context.save();
    context.translate(-options.lineWidth, 0)
    context.beginPath();
    context.moveTo(x, zero);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore();
  },

  clearHit: function (options) {

    var
      args            = options.args,
      context         = options.context,
      shadowSize      = options.shadowSize,
      xScale          = options.xScale,
      yScale          = options.yScale,
      lineWidth       = options.lineWidth,
      zero            = yScale(0),
      x               = xScale(args.x),
      y               = yScale(args.y);

    context.save();
    context.clearRect(x - 2 * lineWidth, y - lineWidth, 4 * lineWidth, zero - y + lineWidth);
    context.restore();
  }
});

/**
 * Components namespace.  These are standalone, custom components
 * APIs for widgets, decorations, flair.
 */
envision.components = envision.components || {};

(function () {

  function QuadraticDrawing (options) {
    this.options = options || {};
  }

  QuadraticDrawing.prototype = {

    height : null,
    width : null,
    rendered : false,

    render : function (node) {
      var
        canvas = document.createElement('canvas'),
        offset = bonzo(node).offset();

      this.height = offset.height;
      this.width = offset.width;

      bonzo(canvas)
        .attr('height', offset.height)
        .attr('width', offset.width)
        .css({
          position : 'absolute',
          top : '0px',
          left : '0px'
        });

      node.appendChild(canvas);
      bonzo(node).css({
        position : 'relative'
      });

      if (typeof FlashCanvas !== 'undefined') FlashCanvas.initElement(canvas);
      this.context = canvas.getContext('2d');
      this.rendered = true;
    },

    draw : function (data, options, node) {

      if (!this.rendered) this.render(node);

      var
        context = this.context,
        height = this.height,
        width = this.width,
        half = Math.round(height / 2) - .5,
        min, max;

      options = options || { min : width / 2, max : width / 2};

      min = options.min + 0.5;
      max = options.max + 0.5;

      context.clearRect(0, 0, width, height);
      if (min || max) {
        context.save();
        context.strokeStyle = this.options.strokeStyle || '#B6D9FF';
        context.fillStyle = this.options.fillStyle || 'rgba(182, 217, 255, .4)';
        context.beginPath();

        // Left
        if (min <= 1) {
          context.moveTo(0, height);
          context.lineTo(0, -0.5);
        } else {
          context.moveTo(min, height);
          context.quadraticCurveTo(min, half, Math.max(min - half, min / 2), half);
          context.lineTo(Math.min(half, min / 2), half);
          context.quadraticCurveTo(0, half, 0.5, -0.5);
        }

        // Top
        context.lineTo(width - 0.5, -0.5);

        // Right
        if (max >= width - 1) {
          context.lineTo(max, height);
        } else {
          context.quadraticCurveTo(width, half, Math.max(width - half, width - (width - max) / 2), half);
          context.lineTo(Math.min(max + half, width - (width - max) / 2), half);
          context.quadraticCurveTo(max, half, max, height);
        }

        context.stroke();
        context.closePath();
        context.fill();
        context.restore();
      }
    },
    trigger : function (component, name, options) {
      if (name === 'zoom') {
        this.zoom(component, options);
      } else if (name === 'reset') {
        this.reset(component);
      }
    },
    zoom : function (component, options) {
      var
        x = options.x || {},
        min = x.min,
        max = x.max,
        api = component.api;

      component.draw(null, {
        min : min,
        max : max
      });
    },
    reset : function (component) {
      component.draw(null, {
        min : component.width / 2,
        max : component.width / 2
      });
    }
  };
  envision.components.QuadraticDrawing = QuadraticDrawing;
})();

/**
 * Templates namespace.
 *
 * Templates are pre-built interactive visualizations fitting common
 * use-cases.  These include several components together with 
 * interactions and configuration for each.  They may have their own
 * custom configuration options as well.
 */
envision.templates = envision.templates || {};

(function () {

var
  V = envision;

// Custom data processor
function processData (options) {

  var
    resolution = options.resolution;

  options.preprocessor
    .bound(options.min, options.max)
    .subsampleMinMax(resolution + Math.round(resolution / 3));
}

function getDefaults () {
  return {
    price : {
      name : 'envision-finance-price',
      flotr : {
        'lite-lines' : {
          lineWidth : 1,
          show : true,
          fill : true,
          fillOpacity : 0.2
        },
        mouse : {
          track: true,
          trackY: false,
          trackAll: true,
          sensibility: 1,
          trackDecimals: 4,
          position: 'ne'
        },
        yaxis : { 
          autoscale : true,
          autoscaleMargin : 0.05,
          noTicks : 4,
          showLabels : true,
          min : 0
        }
      },
      processData : processData
    },
    volume : {
      name : 'envision-finance-volume',
      flotr : {
        whiskers : {
          show : true,
          lineWidth : 2
        },
        mouse: {
          track: true,
          trackY: false,
          trackAll: true
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : .5 
        }
      },
      processData : processData
    },
    summary : {
      name : 'envision-finance-summary',
      flotr : {
        'lite-lines' : {
          show : true,
          lineWidth : 1,
          fill : true,
          fillOpacity : 0.2,
          fillBorder : true
        },
        xaxis : {
          noTicks: 5,
          showLabels : true
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : 0.1
        },
        handles : {
          show : true
        },
        selection : {
          mode : 'x'
        },
        grid : {
          verticalLines : false
        }
      }
    },
    connection : {
      name : 'envision-finance-connection',
      adapterConstructor : V.components.QuadraticDrawing
    }
  };
}

function Finance (options) {

  var
    data = options.data,
    defaults = getDefaults(),
    vis = new V.Visualization({name : 'envision-finance'}),
    selection = new V.Interaction(),
    hit = new V.Interaction(),
    price, volume, connection, summary;

  if (options.defaults) {
    defaults = Flotr.merge(defaults, options.defaults);
  }

  defaults.price.data = data.price;
  defaults.volume.data = data.volume;
  defaults.summary.data = data.summary;

  defaults.price.flotr.mouse.trackFormatter = options.trackFormatter || function (o) {

    var
      index = o.index,
      value = 'Price: $' + data.price[1][index] + ", Vol: " + data.volume[1][index],
      day;

    return value;
  };
  if (options.xTickFormatter) {
    defaults.summary.flotr.xaxis.tickFormatter = options.xTickFormatter;
  }
  defaults.price.flotr.yaxis.tickFormatter = options.yTickFormatter || function (n) {
    return '$' + n;
  };

  price = new V.Component(defaults.price);
  volume = new V.Component(defaults.volume);
  connection = new V.Component(defaults.connection);
  summary = new V.Component(defaults.summary);

  // Render visualization
  vis
    .add(price)
    .add(volume)
    .add(connection)
    .add(summary)
    .render(options.container);

  // Define the selection zooming interaction
  selection
    .follower(price)
    .follower(volume)
    .follower(connection)
    .leader(summary)
    .add(V.actions.selection, options.selectionCallback ? { callback : options.selectionCallback } : null);

  // Define the mouseover hit interaction
  hit
    .group([price, volume])
    .add(V.actions.hit);

  // Optional initial selection
  if (options.selection) {
    summary.trigger('select', options.selection);
  }

  // Members
  this.vis = vis;
  this.selection = selection;
  this.hit = hit;
  this.price = price;
  this.volume = volume;
  this.summary = summary;
}

V.templates.Finance = Finance;

})();

(function () {

var
  V = envision;

function getDefaults () {
  return {
    detail : {
      name : 'envision-timeseries-detail',
      flotr : {

      }
    },
    summary : {
      name : 'envision-timeseries-summary',
      flotr : {
        handles : {
          show : true
        },
        selection : {
          mode : 'x'
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : 0.1
        }
      }
    },
    connection : {
      name : 'envision-timeseries-connection',
      adapterConstructor : V.components.QuadraticDrawing
    }
  };
}

function TimeSeries (options) {

  var
    data = options.data,
    defaults = getDefaults(),
    vis = new V.Visualization({name : 'envision-timeseries'}),
    selection = new V.Interaction(),
    detail, summary, connection;

  // Fill Defaults
  if (options.defaults) {
    defaults = Flotr.merge(defaults, options.defaults);
  }
  defaults.detail.data = data.detail;
  defaults.summary.data = data.summary;

  // Build Components
  detail = new V.Component(defaults.detail);
  connection = new V.Component(defaults.connection);
  summary = new V.Component(defaults.summary);

  // Render visualization
  vis
    .add(detail)
    .add(connection)
    .add(summary)
    .render(options.container);

  // Selection action
  selection
    .add(V.actions.selection)
    .follower(detail)
    .follower(connection)
    .leader(summary);

  // Optional initial selection
  if (options.selection) {
    summary.trigger('select', options.selection);
  }

  this.vis = vis;
  this.selection = selection;
  this.detail = detail;
  this.summary = summary;
};

V.templates.TimeSeries = TimeSeries;

})();

(function () {

var
  V = envision,
  Zoom;

function defaultsZoom () {
  return {
    name : 'zoom',
    flotr : {}
  };
}

function defaultsSummary () {
  return {
    name : 'summary',
    flotr : {
      handles : { show : true },
      selection : { mode : 'x'}
    }
  };
}

function getDefaults (options, defaults) {
  var o = _.defaults(options, defaults);
  o.flotr = _.defaults(o.flotr, defaults.flotr);
  return o;
}

Zoom = function (options) {

  var
    vis = new V.Visualization(),
    zoom = new V.Component(getDefaults(options.zoom || {}, defaultsZoom())),
    summary = new V.Component(getDefaults(options.summary || {}, defaultsSummary())),
    interaction = new V.Interaction({leader : summary});

  vis
    .add(zoom)
    .add(summary);

  interaction.add(V.actions.selection);
  interaction.follower(zoom);

  this.vis = vis;
  this.interaction = interaction;

  if (options.container) {
    this.render(options.container);
  }
};

Zoom.prototype = {
  render : function (container) {
    this.vis.render(container);
  }
};

V.templates.Zoom = Zoom;

})();
