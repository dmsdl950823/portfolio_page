(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.animation=void 0;var _animeEs=_interopRequireDefault(require("./animejs/lib/anime.es.js"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var work_sect=document.getElementById("works"),workdiv=document.querySelectorAll(".workdiv"),about_sect=document.getElementById("about"),quer=document.querySelectorAll(".workLists"),TOP=document.getElementById("top"),header=document.getElementById("header"),header_menu=document.getElementById("header_menu"),head_gnb=document.getElementById("head_gnb").childNodes,aboutquery=window.matchMedia("(max-width: 375px)"),targetGenerator=function(e,t,o){switch(o){case!0:return quer[e].childNodes[t].querySelector(".imageSect");case!1:return quer[e].childNodes[t].querySelector(".work_cont > a")}},workAnimationGenerator=function(e,t,o,a){var n={};if(1===a||0===a){var r;switch(a){case 1:r=-80;break;case 0:r=80}n={targets:targetGenerator(e,t,o),translateX:r,translateY:-90,opacity:1,duration:500,easing:"easeInCubic"}}else n={targets:targetGenerator(e,t,o),translateY:-124,duration:500,opacity:1,easing:"easeOutQuart"};return n},topBttnAction=function(){addEvent("click",TOP,function(e){document.documentElement.scrollTop;window.scrollTo({top:0,left:0,behavior:"smooth"})})},wk_offset=work_sect.offsetTop;function workdivs_offset(){for(var e=[],t=0;t<workdiv.length;)e.push(workdiv[t].offsetTop),t++;return e}var workoffsets=workdivs_offset(),aboutoffsets=about_sect.offsetTop,workoffsets_2=workoffsets[1]-100,workoffsets_3=workoffsets[2]-100,workoffsets_math2=(workoffsets_3-workoffsets_2)/2+workoffsets_2,workoffsets_math3=aboutoffsets-workoffsets_3+aboutoffsets/2;function scrollAction(){var e=document.documentElement.scrollTop,t=Math.floor(e);if(console.log("my scroll "+t),t>0?(TOP.style.opacity=1,(0,_animeEs.default)({targets:".workback",translateX:t/2,easing:"linear",duration:300}),(0,_animeEs.default)({targets:".aboutback",translateX:-t/2,easing:"linear",duration:300}),header_menu.style.position="fixed"):(TOP.style.opacity=0,header_menu.style.position=""),t<workoffsets[0]-200)head_gnb.forEach(function(e){return e.classList.remove("on")});else if(t>=workoffsets[0]-200&&t<aboutoffsets-200)head_gnb.forEach(function(e){return e.classList.remove("on")}),head_gnb[0].classList.add("on");else if(t>=aboutoffsets-200){head_gnb.forEach(function(e){return e.classList.remove("on")}),head_gnb[1].classList.add("on");var o={targets:".profile_name",duration:500,opacity:1,easing:"easeOutQuart"};aboutquery.matches?(o.translateY=-44,(0,_animeEs.default)(o)):(o.translateY=-60,(0,_animeEs.default)(o))}}function addEvent(e,t,o){t.addEventListener?t.addEventListener(e,o,!1):t.attachEvent&&t.attachEvent("on"+e,o)}var animation=function(){addEvent("scroll",document,scrollAction),topBttnAction()};exports.animation=animation;

},{"./animejs/lib/anime.es.js":3}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mainRotation=void 0;var mainRotation=function(){var t=document.getElementById("header"),e=document.querySelector(".cube");var n,a,o,r=0,c=0;a="click",o=function(){4===++c&&(c=0),3===++r&&(r--,r-=1);var t=28*r,n=90*c;0===n&&(t=0),e.style.transform="\n            translateY(".concat(t,"px) \n            rotateX(").concat(n,"deg)\n        ")},(n=t).addEventListner?n.addEventListner(a,o,!1):n.attachEvent?n.attachEvent("on"+a,o):n["on"+a]=o};exports.mainRotation=mainRotation;

},{}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var defaultInstanceSettings={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},defaultTweenSettings={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},validTransforms=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective"],cache={CSS:{},springs:{}};function minMax(e,t,n){return Math.min(Math.max(e,t),n)}function stringContains(e,t){return e.indexOf(t)>-1}function applyArguments(e,t){return e.apply(null,t)}var is={arr:function(e){return Array.isArray(e)},obj:function(e){return stringContains(Object.prototype.toString.call(e),"Object")},pth:function(e){return is.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||is.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return is.hex(e)||is.rgb(e)||is.hsl(e)},key:function(e){return!defaultInstanceSettings.hasOwnProperty(e)&&!defaultTweenSettings.hasOwnProperty(e)&&"targets"!==e&&"keyframes"!==e}};function parseEasingParameters(e){var t=/\(([^)]+)\)/.exec(e);return t?t[1].split(",").map(function(e){return parseFloat(e)}):[]}function spring(e,t){var n=parseEasingParameters(e),r=minMax(is.und(n[0])?1:n[0],.1,100),a=minMax(is.und(n[1])?100:n[1],.1,100),i=minMax(is.und(n[2])?10:n[2],.1,100),o=minMax(is.und(n[3])?0:n[3],.1,100),s=Math.sqrt(a/r),u=i/(2*Math.sqrt(a*r)),c=u<1?s*Math.sqrt(1-u*u):0,l=1,f=u<1?(u*s-o)/c:-o+s;function g(e){var n=t?t*e/1e3:e;return n=u<1?Math.exp(-n*u*s)*(l*Math.cos(c*n)+f*Math.sin(c*n)):(l+f*n)*Math.exp(-n*s),0===e||1===e?e:1-n}return t?g:function(){var t=cache.springs[e];if(t)return t;for(var n=0,r=0;;)if(1===g(n+=1/6)){if(++r>=16)break}else r=0;var a=n*(1/6)*1e3;return cache.springs[e]=a,a}}function steps(e){return void 0===e&&(e=10),function(t){return Math.round(t*e)*(1/e)}}var bezier=function(){var e=11,t=1/(e-1);function n(e,t){return 1-3*t+3*e}function r(e,t){return 3*t-6*e}function a(e){return 3*e}function i(e,t,i){return((n(t,i)*e+r(t,i))*e+a(t))*e}function o(e,t,i){return 3*n(t,i)*e*e+2*r(t,i)*e+a(t)}return function(n,r,a,s){if(0<=n&&n<=1&&0<=a&&a<=1){var u=new Float32Array(e);if(n!==r||a!==s)for(var c=0;c<e;++c)u[c]=i(c*t,n,a);return function(e){return n===r&&a===s?e:0===e||1===e?e:i(l(e),r,s)}}function l(r){for(var s=0,c=1,l=e-1;c!==l&&u[c]<=r;++c)s+=t;var f=s+(r-u[--c])/(u[c+1]-u[c])*t,g=o(f,n,a);return g>=.001?function(e,t,n,r){for(var a=0;a<4;++a){var s=o(t,n,r);if(0===s)return t;t-=(i(t,n,r)-e)/s}return t}(r,f,n,a):0===g?f:function(e,t,n,r,a){var o,s,u=0;do{(o=i(s=t+(n-t)/2,r,a)-e)>0?n=s:t=s}while(Math.abs(o)>1e-7&&++u<10);return s}(r,s,s+t,n,a)}}}(),penner=function(){var e={linear:function(){return function(e){return e}}},t={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){for(var t,n=4;e<((t=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*t-2)/22-e,2)}},Elastic:function(e,t){void 0===e&&(e=1),void 0===t&&(t=.5);var n=minMax(e,1,10),r=minMax(t,.1,2);return function(e){return 0===e||1===e?e:-n*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/n))*(2*Math.PI)/r)}}};return["Quad","Cubic","Quart","Quint","Expo"].forEach(function(e,n){t[e]=function(){return function(e){return Math.pow(e,n+2)}}}),Object.keys(t).forEach(function(n){var r=t[n];e["easeIn"+n]=r,e["easeOut"+n]=function(e,t){return function(n){return 1-r(e,t)(1-n)}},e["easeInOut"+n]=function(e,t){return function(n){return n<.5?r(e,t)(2*n)/2:1-r(e,t)(-2*n+2)/2}}}),e}();function parseEasings(e,t){if(is.fnc(e))return e;var n=e.split("(")[0],r=penner[n],a=parseEasingParameters(e);switch(n){case"spring":return spring(e,t);case"cubicBezier":return applyArguments(bezier,a);case"steps":return applyArguments(steps,a);default:return applyArguments(r,a)}}function selectString(e){try{return document.querySelectorAll(e)}catch(e){return}}function filterArray(e,t){for(var n=e.length,r=arguments.length>=2?arguments[1]:void 0,a=[],i=0;i<n;i++)if(i in e){var o=e[i];t.call(r,o,i,e)&&a.push(o)}return a}function flattenArray(e){return e.reduce(function(e,t){return e.concat(is.arr(t)?flattenArray(t):t)},[])}function toArray(e){return is.arr(e)?e:(is.str(e)&&(e=selectString(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function arrayContains(e,t){return e.some(function(e){return e===t})}function cloneObject(e){var t={};for(var n in e)t[n]=e[n];return t}function replaceObjectProps(e,t){var n=cloneObject(e);for(var r in e)n[r]=t.hasOwnProperty(r)?t[r]:e[r];return n}function mergeObjects(e,t){var n=cloneObject(e);for(var r in t)n[r]=is.und(e[r])?t[r]:e[r];return n}function rgbToRgba(e){var t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);return t?"rgba("+t[1]+",1)":e}function hexToRgba(e){var t=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,n,r){return t+t+n+n+r+r}),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return"rgba("+parseInt(n[1],16)+","+parseInt(n[2],16)+","+parseInt(n[3],16)+",1)"}function hslToRgba(e){var t,n,r,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),i=parseInt(a[1],10)/360,o=parseInt(a[2],10)/100,s=parseInt(a[3],10)/100,u=a[4]||1;function c(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}if(0==o)t=n=r=s;else{var l=s<.5?s*(1+o):s+o-s*o,f=2*s-l;t=c(f,l,i+1/3),n=c(f,l,i),r=c(f,l,i-1/3)}return"rgba("+255*t+","+255*n+","+255*r+","+u+")"}function colorToRgb(e){return is.rgb(e)?rgbToRgba(e):is.hex(e)?hexToRgba(e):is.hsl(e)?hslToRgba(e):void 0}function getUnit(e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(t)return t[1]}function getTransformUnit(e){return stringContains(e,"translate")||"perspective"===e?"px":stringContains(e,"rotate")||stringContains(e,"skew")?"deg":void 0}function getFunctionValue(e,t){return is.fnc(e)?e(t.target,t.id,t.total):e}function getAttribute(e,t){return e.getAttribute(t)}function convertPxToUnit(e,t,n){if(arrayContains([n,"deg","rad","turn"],getUnit(t)))return t;var r=cache.CSS[t+n];if(!is.und(r))return r;var a=document.createElement(e.tagName),i=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;i.appendChild(a),a.style.position="absolute",a.style.width=100+n;var o=100/a.offsetWidth;i.removeChild(a);var s=o*parseFloat(t);return cache.CSS[t+n]=s,s}function getCSSValue(e,t,n){if(t in e.style){var r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[t]||getComputedStyle(e).getPropertyValue(r)||"0";return n?convertPxToUnit(e,a,n):a}}function getAnimationType(e,t){return is.dom(e)&&!is.inp(e)&&(getAttribute(e,t)||is.svg(e)&&e[t])?"attribute":is.dom(e)&&arrayContains(validTransforms,t)?"transform":is.dom(e)&&"transform"!==t&&getCSSValue(e,t)?"css":null!=e[t]?"object":void 0}function getElementTransforms(e){if(is.dom(e)){for(var t,n=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;t=r.exec(n);)a.set(t[1],t[2]);return a}}function getTransformValue(e,t,n,r){var a=stringContains(t,"scale")?1:0+getTransformUnit(t),i=getElementTransforms(e).get(t)||a;return n&&(n.transforms.list.set(t,i),n.transforms.last=t),r?convertPxToUnit(e,i,r):i}function getOriginalTargetValue(e,t,n,r){switch(getAnimationType(e,t)){case"transform":return getTransformValue(e,t,r,n);case"css":return getCSSValue(e,t,n);case"attribute":return getAttribute(e,t);default:return e[t]||0}}function getRelativeValue(e,t){var n=/^(\*=|\+=|-=)/.exec(e);if(!n)return e;var r=getUnit(e)||0,a=parseFloat(t),i=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return a+i+r;case"-":return a-i+r;case"*":return a*i+r}}function validateValue(e,t){if(is.col(e))return colorToRgb(e);if(/\s/g.test(e))return e;var n=getUnit(e),r=n?e.substr(0,e.length-n.length):e;return t?r+t:r}function getDistance(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function getCircleLength(e){return 2*Math.PI*getAttribute(e,"r")}function getRectLength(e){return 2*getAttribute(e,"width")+2*getAttribute(e,"height")}function getLineLength(e){return getDistance({x:getAttribute(e,"x1"),y:getAttribute(e,"y1")},{x:getAttribute(e,"x2"),y:getAttribute(e,"y2")})}function getPolylineLength(e){for(var t,n=e.points,r=0,a=0;a<n.numberOfItems;a++){var i=n.getItem(a);a>0&&(r+=getDistance(t,i)),t=i}return r}function getPolygonLength(e){var t=e.points;return getPolylineLength(e)+getDistance(t.getItem(t.numberOfItems-1),t.getItem(0))}function getTotalLength(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return getCircleLength(e);case"rect":return getRectLength(e);case"line":return getLineLength(e);case"polyline":return getPolylineLength(e);case"polygon":return getPolygonLength(e)}}function setDashoffset(e){var t=getTotalLength(e);return e.setAttribute("stroke-dasharray",t),t}function getParentSvgEl(e){for(var t=e.parentNode;is.svg(t)&&is.svg(t.parentNode);)t=t.parentNode;return t}function getParentSvg(e,t){var n=t||{},r=n.el||getParentSvgEl(e),a=r.getBoundingClientRect(),i=getAttribute(r,"viewBox"),o=a.width,s=a.height,u=n.viewBox||(i?i.split(" "):[0,0,o,s]);return{el:r,viewBox:u,x:u[0]/1,y:u[1]/1,w:o/u[2],h:s/u[3]}}function getPath(e,t){var n=is.str(e)?selectString(e)[0]:e,r=t||100;return function(e){return{property:e,el:n,svg:getParentSvg(n),totalLength:getTotalLength(n)*(r/100)}}}function getPathProgress(e,t){function n(n){void 0===n&&(n=0);var r=t+n>=1?t+n:0;return e.el.getPointAtLength(r)}var r=getParentSvg(e.el,e.svg),a=n(),i=n(-1),o=n(1);switch(e.property){case"x":return(a.x-r.x)*r.w;case"y":return(a.y-r.y)*r.h;case"angle":return 180*Math.atan2(o.y-i.y,o.x-i.x)/Math.PI}}function decomposeValue(e,t){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=validateValue(is.pth(e)?e.totalLength:e,t)+"";return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:is.str(e)||t?r.split(n):[]}}function parseTargets(e){return filterArray(e?flattenArray(is.arr(e)?e.map(toArray):toArray(e)):[],function(e,t,n){return n.indexOf(e)===t})}function getAnimatables(e){var t=parseTargets(e);return t.map(function(e,n){return{target:e,id:n,total:t.length,transforms:{list:getElementTransforms(e)}}})}function normalizePropertyTweens(e,t){var n=cloneObject(t);if(/^spring/.test(n.easing)&&(n.duration=spring(n.easing)),is.arr(e)){var r=e.length;2===r&&!is.obj(e[0])?e={value:e}:is.fnc(t.duration)||(n.duration=t.duration/r)}var a=is.arr(e)?e:[e];return a.map(function(e,n){var r=is.obj(e)&&!is.pth(e)?e:{value:e};return is.und(r.delay)&&(r.delay=n?0:t.delay),is.und(r.endDelay)&&(r.endDelay=n===a.length-1?t.endDelay:0),r}).map(function(e){return mergeObjects(e,n)})}function flattenKeyframes(e){for(var t=filterArray(flattenArray(e.map(function(e){return Object.keys(e)})),function(e){return is.key(e)}).reduce(function(e,t){return e.indexOf(t)<0&&e.push(t),e},[]),n={},r=function(r){var a=t[r];n[a]=e.map(function(e){var t={};for(var n in e)is.key(n)?n==a&&(t.value=e[n]):t[n]=e[n];return t})},a=0;a<t.length;a++)r(a);return n}function getProperties(e,t){var n=[],r=t.keyframes;for(var a in r&&(t=mergeObjects(flattenKeyframes(r),t)),t)is.key(a)&&n.push({name:a,tweens:normalizePropertyTweens(t[a],e)});return n}function normalizeTweenValues(e,t){var n={};for(var r in e){var a=getFunctionValue(e[r],t);is.arr(a)&&1===(a=a.map(function(e){return getFunctionValue(e,t)})).length&&(a=a[0]),n[r]=a}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}function normalizeTweens(e,t){var n;return e.tweens.map(function(r){var a=normalizeTweenValues(r,t),i=a.value,o=is.arr(i)?i[1]:i,s=getUnit(o),u=getOriginalTargetValue(t.target,e.name,s,t),c=n?n.to.original:u,l=is.arr(i)?i[0]:c,f=getUnit(l)||getUnit(u),g=s||f;return is.und(o)&&(o=c),a.from=decomposeValue(l,g),a.to=decomposeValue(getRelativeValue(o,l),g),a.start=n?n.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=parseEasings(a.easing,a.duration),a.isPath=is.pth(i),a.isColor=is.col(a.from.original),a.isColor&&(a.round=1),n=a,a})}var setProgressValue={css:function(e,t,n){return e.style[t]=n},attribute:function(e,t,n){return e.setAttribute(t,n)},object:function(e,t,n){return e[t]=n},transform:function(e,t,n,r,a){if(r.list.set(t,n),t===r.last||a){var i="";r.list.forEach(function(e,t){i+=t+"("+e+") "}),e.style.transform=i}}};function setTargetsValue(e,t){getAnimatables(e).forEach(function(e){for(var n in t){var r=getFunctionValue(t[n],e),a=e.target,i=getUnit(r),o=getOriginalTargetValue(a,n,i,e),s=getRelativeValue(validateValue(r,i||getUnit(o)),o),u=getAnimationType(a,n);setProgressValue[u](a,n,s,e.transforms,!0)}})}function createAnimation(e,t){var n=getAnimationType(e.target,t.name);if(n){var r=normalizeTweens(t,e),a=r[r.length-1];return{type:n,property:t.name,animatable:e,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}function getAnimations(e,t){return filterArray(flattenArray(e.map(function(e){return t.map(function(t){return createAnimation(e,t)})})),function(e){return!is.und(e)})}function getInstanceTimings(e,t){var n=e.length,r=function(e){return e.timelineOffset?e.timelineOffset:0},a={};return a.duration=n?Math.max.apply(Math,e.map(function(e){return r(e)+e.duration})):t.duration,a.delay=n?Math.min.apply(Math,e.map(function(e){return r(e)+e.delay})):t.delay,a.endDelay=n?a.duration-Math.max.apply(Math,e.map(function(e){return r(e)+e.duration-e.endDelay})):t.endDelay,a}var instanceID=0;function createNewInstance(e){var t=replaceObjectProps(defaultInstanceSettings,e),n=replaceObjectProps(defaultTweenSettings,e),r=getProperties(n,e),a=getAnimatables(e.targets),i=getAnimations(a,r),o=getInstanceTimings(i,n),s=instanceID;return instanceID++,mergeObjects(t,{id:s,children:[],animatables:a,animations:i,duration:o.duration,delay:o.delay,endDelay:o.endDelay})}var raf,activeInstances=[],pausedInstances=[],engine=function(){function e(){raf=requestAnimationFrame(t)}function t(t){var n=activeInstances.length;if(n){for(var r=0;r<n;){var a=activeInstances[r];if(a.paused){var i=activeInstances.indexOf(a);i>-1&&(activeInstances.splice(i,1),n=activeInstances.length)}else a.tick(t);r++}e()}else raf=cancelAnimationFrame(raf)}return e}();function handleVisibilityChange(){document.hidden?(activeInstances.forEach(function(e){return e.pause()}),pausedInstances=activeInstances.slice(0),anime.running=activeInstances=[]):pausedInstances.forEach(function(e){return e.play()})}function anime(e){void 0===e&&(e={});var t,n=0,r=0,a=0,i=0,o=null;function s(e){var t=window.Promise&&new Promise(function(e){return o=e});return e.finished=t,t}var u=createNewInstance(e);s(u);function c(){var e=u.direction;"alternate"!==e&&(u.direction="normal"!==e?"normal":"reverse"),u.reversed=!u.reversed,t.forEach(function(e){return e.reversed=u.reversed})}function l(e){return u.reversed?u.duration-e:e}function f(){n=0,r=l(u.currentTime)*(1/anime.speed)}function g(e,t){t&&t.seek(e-t.timelineOffset)}function d(e){for(var t=0,n=u.animations,r=n.length;t<r;){var a=n[t],i=a.animatable,o=a.tweens,s=o.length-1,c=o[s];s&&(c=filterArray(o,function(t){return e<t.end})[0]||c);for(var l=minMax(e-c.start-c.delay,0,c.duration)/c.duration,f=isNaN(l)?1:c.easing(l),g=c.to.strings,d=c.round,p=[],m=c.to.numbers.length,v=void 0,h=0;h<m;h++){var y=void 0,b=c.to.numbers[h],T=c.from.numbers[h]||0;y=c.isPath?getPathProgress(c.value,f*b):T+f*(b-T),d&&(c.isColor&&h>2||(y=Math.round(y*d)/d)),p.push(y)}var x=g.length;if(x){v=g[0];for(var M=0;M<x;M++){g[M];var w=g[M+1],A=p[M];isNaN(A)||(v+=w?A+w:A+" ")}}else v=p[0];setProgressValue[a.type](i.target,a.property,v,i.transforms),a.currentValue=v,t++}}function p(e){u[e]&&!u.passThrough&&u[e](u)}function m(e){var f=u.duration,m=u.delay,v=f-u.endDelay,h=l(e);u.progress=minMax(h/f*100,0,100),u.reversePlayback=h<u.currentTime,t&&function(e){if(u.reversePlayback)for(var n=i;n--;)g(e,t[n]);else for(var r=0;r<i;r++)g(e,t[r])}(h),!u.began&&u.currentTime>0&&(u.began=!0,p("begin")),!u.loopBegan&&u.currentTime>0&&(u.loopBegan=!0,p("loopBegin")),h<=m&&0!==u.currentTime&&d(0),(h>=v&&u.currentTime!==f||!f)&&d(f),h>m&&h<v?(u.changeBegan||(u.changeBegan=!0,u.changeCompleted=!1,p("changeBegin")),p("change"),d(h)):u.changeBegan&&(u.changeCompleted=!0,u.changeBegan=!1,p("changeComplete")),u.currentTime=minMax(h,0,f),u.began&&p("update"),e>=f&&(r=0,u.remaining&&!0!==u.remaining&&u.remaining--,u.remaining?(n=a,p("loopComplete"),u.loopBegan=!1,"alternate"===u.direction&&c()):(u.paused=!0,u.completed||(u.completed=!0,p("loopComplete"),p("complete"),!u.passThrough&&"Promise"in window&&(o(),s(u)))))}return u.reset=function(){var e=u.direction;u.passThrough=!1,u.currentTime=0,u.progress=0,u.paused=!0,u.began=!1,u.loopBegan=!1,u.changeBegan=!1,u.completed=!1,u.changeCompleted=!1,u.reversePlayback=!1,u.reversed="reverse"===e,u.remaining=u.loop,t=u.children;for(var n=i=t.length;n--;)u.children[n].reset();(u.reversed&&!0!==u.loop||"alternate"===e&&1===u.loop)&&u.remaining++,d(u.reversed?u.duration:0)},u.set=function(e,t){return setTargetsValue(e,t),u},u.tick=function(e){a=e,n||(n=a),m((a+(r-n))*anime.speed)},u.seek=function(e){m(l(e))},u.pause=function(){u.paused=!0,f()},u.play=function(){u.paused&&(u.completed&&u.reset(),u.paused=!1,activeInstances.push(u),f(),raf||engine())},u.reverse=function(){c(),f()},u.restart=function(){u.reset(),u.play()},u.reset(),u.autoplay&&u.play(),u}function removeTargetsFromAnimations(e,t){for(var n=t.length;n--;)arrayContains(e,t[n].animatable.target)&&t.splice(n,1)}function removeTargets(e){for(var t=parseTargets(e),n=activeInstances.length;n--;){var r=activeInstances[n],a=r.animations,i=r.children;removeTargetsFromAnimations(t,a);for(var o=i.length;o--;){var s=i[o],u=s.animations;removeTargetsFromAnimations(t,u),u.length||s.children.length||i.splice(o,1)}a.length||i.length||r.pause()}}function stagger(e,t){void 0===t&&(t={});var n=t.direction||"normal",r=t.easing?parseEasings(t.easing):null,a=t.grid,i=t.axis,o=t.from||0,s="first"===o,u="center"===o,c="last"===o,l=is.arr(e),f=l?parseFloat(e[0]):parseFloat(e),g=l?parseFloat(e[1]):0,d=getUnit(l?e[1]:e)||0,p=t.start||0+(l?f:0),m=[],v=0;return function(e,t,h){if(s&&(o=0),u&&(o=(h-1)/2),c&&(o=h-1),!m.length){for(var y=0;y<h;y++){if(a){var b=u?(a[0]-1)/2:o%a[0],T=u?(a[1]-1)/2:Math.floor(o/a[0]),x=b-y%a[0],M=T-Math.floor(y/a[0]),w=Math.sqrt(x*x+M*M);"x"===i&&(w=-x),"y"===i&&(w=-M),m.push(w)}else m.push(Math.abs(o-y));v=Math.max.apply(Math,m)}r&&(m=m.map(function(e){return r(e/v)*v})),"reverse"===n&&(m=m.map(function(e){return i?e<0?-1*e:-e:Math.abs(v-e)}))}return p+(l?(g-f)/v:f)*(Math.round(100*m[t])/100)+d}}function timeline(e){void 0===e&&(e={});var t=anime(e);return t.duration=0,t.add=function(n,r){var a=activeInstances.indexOf(t),i=t.children;function o(e){e.passThrough=!0}a>-1&&activeInstances.splice(a,1);for(var s=0;s<i.length;s++)o(i[s]);var u=mergeObjects(n,replaceObjectProps(defaultTweenSettings,e));u.targets=u.targets||e.targets;var c=t.duration;u.autoplay=!1,u.direction=t.direction,u.timelineOffset=is.und(r)?c:getRelativeValue(r,c),o(t),t.seek(u.timelineOffset);var l=anime(u);o(l),i.push(l);var f=getInstanceTimings(i,e);return t.delay=f.delay,t.endDelay=f.endDelay,t.duration=f.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t}"undefined"!=typeof document&&document.addEventListener("visibilitychange",handleVisibilityChange),anime.version="3.1.0",anime.speed=1,anime.running=activeInstances,anime.remove=removeTargets,anime.get=getOriginalTargetValue,anime.set=setTargetsValue,anime.convertPx=convertPxToUnit,anime.path=getPath,anime.setDashoffset=setDashoffset,anime.stagger=stagger,anime.timeline=timeline,anime.easing=parseEasings,anime.penner=penner,anime.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var _default=anime;exports.default=_default;

},{}],4:[function(require,module,exports){
"use strict";var _animation=require("./_animation"),_mainRotation=require("./_mainRotation");(0,_animation.animation)(),(0,_mainRotation.mainRotation)();var lanBtn=document.getElementById("language"),imageSects=document.querySelectorAll(".imageSect"),work_cont_strong=document.querySelectorAll(".work_cont strong"),work_cont_p=document.querySelectorAll(".work_cont p"),about_desc=document.querySelector(".career"),d_graph=document.querySelectorAll(".d_graph"),c_graph=document.querySelectorAll(".c_graph"),imgAnchor=document.querySelectorAll(".imgAnchor"),crossbrwz_list=document.querySelectorAll(".crossbrwz_list");function addListner(t,n,e){t.addEventListner?t.addEventListner(n,e,!1):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e}function jsonLoad(){var t=new XMLHttpRequest;t.onreadystatechange=function(){4===this.readyState&&200===this.status&&data_Event(JSON.parse(this.responseText))},t.open("GET","../json/coverWork.json",!0),t.send()}function data_Event(t){for(var n=t.filter(function(t){return null!==t.contribution}),e=n.map(function(t){return t.contribution}),r=n.map(function(t){return t.design}),o=n.map(function(t){return t.href}),c=n.map(function(t){return t.cross_b}),a=0;a<c_graph.length;a++)void 0!==c_graph[a]&&(c_graph[a].style.width=e[a]+"%");for(var i=0;i<d_graph.length;i++)void 0!==d_graph[i]&&(d_graph[i].style.width=r[i]+"%");for(var u=0;u<imgAnchor.length;u++)void 0!==imgAnchor[u]&&(imgAnchor[u].setAttribute("href",o[u]),imgAnchor[u].setAttribute("target","_blank"));for(var s=0;s<crossbrwz_list.length;s++)crossbrwz_list[s].innerHTML="".concat(c[s]);addListner(lanBtn,"click",function(e){var r=t.filter(function(t){return null===t.contribution}),o=n.map(function(t){return t.desc_eng}),c=n.map(function(t){return t.desc_kor}),a=r.map(function(t){return t.desc_eng}),i=r.map(function(t){return t.desc_kor});lanBtn.checked?(console.log("click false"),checkedEvent(o,a)):(console.log("click true"),checkedEvent(c,i))})}function checkedEvent(t,n){for(var e=0;e<work_cont_strong.length;e++)void 0!==work_cont_p[e]&&(work_cont_p[e].innerHTML=t[e]);about_desc.innerHTML=n[0]}function backimages(){for(var t=0;t<imageSects.length;t++)imageSects[t].style.background="url(../images/mock_".concat(t+1,".jpg) no-repeat"),imageSects[t].style.backgroundSize="100% 100%"}backimages(),jsonLoad();

},{"./_animation":1,"./_mainRotation":2}]},{},[4]);
