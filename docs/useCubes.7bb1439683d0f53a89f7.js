(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"7N7Y":function(e,t,o){"use strict";o.r(t);o("ma9I"),o("QFcT");var n,s,a,r=document.querySelectorAll(".photo-cube"),c=document.querySelectorAll(".cube-container"),u=document.querySelector(".hold"),i=0,v={0:{x:0,y:0,xs:0,ys:0},1:{x:0,y:0,xs:0,ys:0}};function d(e){var t=e.touches?Math.floor(e.touches[0].clientX):e.x,o=(e.touches?Math.floor(e.touches[0].clientY):e.y)+a;v[i].xs=t-n+v[i].x,v[i].ys=o-s+v[i].y,r[i].style.transform="rotateX(".concat(-v[i].ys,"deg) rotateY(").concat(v[i].xs,"deg)")}function h(e){return{x:e.offsetLeft+e.offsetWidth/2,y:e.offsetTop+e.offsetHeight/2}}function f(e){u.addEventListener("mousemove",d,{passive:!0}),"CUBE-PANEL"===e.target.tagName&&u.addEventListener("touchmove",d,{passive:!0}),a=window.scrollY;var t=h(c[0]),o=h(c[1]);n=e.x||Math.floor(e.touches[0].clientX),s=(e.y||Math.floor(e.touches[0].clientY))+a;var r=Math.round(Math.hypot(t.x-n,t.y-s)),v=Math.round(Math.hypot(o.x-n,o.y-s));i=r<=v?0:1}function l(){v[i].x=v[i].xs||0,v[i].y=v[i].ys||0,u.removeEventListener("mousemove",d,{passive:!0}),u.removeEventListener("touchmove",d,{passive:!0})}u.addEventListener("mousedown",f,{passive:!0}),u.addEventListener("touchstart",f,{passive:!0}),u.addEventListener("mouseup",l),u.addEventListener("touchend",l),u.addEventListener("mouseleave",l),document.addEventListener("touchmove",function(e){"CUBE-PANEL"===e.target.tagName&&e.preventDefault()},{passive:!1})},QFcT:function(e,t,o){var n=o("I+eb"),s=Math.abs,a=Math.sqrt;n({target:"Math",stat:!0},{hypot:function(e,t){for(var o,n,r=0,c=0,u=arguments.length,i=0;c<u;)i<(o=s(arguments[c++]))?(r=r*(n=i/o)*n+1,i=o):r+=o>0?(n=o/i)*n:o;return i===1/0?1/0:i*a(r)}})}}]);
//# sourceMappingURL=useCubes.7bb1439683d0f53a89f7.js.map