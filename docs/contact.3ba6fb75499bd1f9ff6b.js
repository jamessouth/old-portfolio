(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"7yc6":function(e,n){e.exports="images/debe92e685ee0158777b4699f877dbaa.jpg"},qhQU:function(e,n,t){"use strict";t.r(n);t("Z2Ku"),t("L9s1"),t("rGqo");var a,o=t("zWI3"),r=t.n(o),c=t("7yc6"),l=t.n(c),i=new Worker("./worker.min.js"),s=document.querySelector("#board"),d=document.querySelector(".canvasbutton button"),u=document.querySelector("#fader"),f=document.querySelector("#contactinfolinks"),g=document.querySelectorAll("#contactinfolinks a"),y=document.querySelector(".clickCounter p:last-of-type"),m=document.querySelector(".help"),p=s.getContext("2d"),b=u.getContext("2d"),h=new Image,k=0,v=0,w=0;i.addEventListener("message",function(e){var n=e.data,o=n.shades,c=n.canvArray,S=n.randBoxes,q=n.boardOrder,I=n.drawOrder;function x(){v<S.length-1&&requestAnimationFrame(x),p.clearRect(S[v][0],S[v][1],20,20),(v+=1)===S.length&&(f.style.zIndex=5,g.forEach(function(e){e.tabIndex="0"}),g[0].focus())}function C(){k<o.length&&requestAnimationFrame(C),b.fillStyle="rgba(173, 216, 230, ".concat(o[k],")"),b.clearRect(0,0,75,75),b.fillRect(0,0,75,75),(k+=1)===o.length&&(u.style.display="none",s.style.backgroundColor="transparent",d.parentNode.classList.add("animating"),CSS.paintWorklet&&a(),setTimeout(x,3e3))}h.onload=function(){for(var e=0;e<c.length-1;e+=1)p.drawImage(h,c[e][0],c[e][1],75,75,c[I[e]][0],c[I[e]][1],75,75)},h.src=r.a,s.addEventListener("click",function(e){!function(e,n){if(0!==c.length){var t,a=4*Math.floor(n/75)+Math.floor(e/75),o=q.indexOf(15);if(o%4==0){if(![-4,1,4].includes(a-o))return}else if((o+1)%4==0){if(![-4,-1,4].includes(a-o))return}else if(![1,4].includes(Math.abs(a-o)))return;var r=q[a];p.clearRect(c[a][0],c[a][1],75,75),p.drawImage(h,c[r][0],c[r][1],75,75,c[o][0],c[o][1],75,75);var l=[q[o],q[a]];if(q[a]=l[0],q[o]=l[1],0===q[0]&&3===q[3]&&11===q[11]&&14===q[14]){t=!0;for(var i=0;i<q.length;i+=1)if(q[i]!==i){t=!1;break}}t&&(u.style.display="block",d.style.display="none",C(),p.drawImage(h,225,225,75,75,225,225,75,75),c.splice(0))}}(e.offsetX,e.offsetY),1===(w+=1)&&(m.style.display="none"),CSS.paintWorklet&&(10===w&&t.e(0).then(t.bind(null,"hHaJ")).then(function(e){return a=e.default}).catch(function(e){return console.log(e)}),20===w&&CSS.paintWorklet.addModule("./burst.min.js")),30===w&&(f.style.backgroundImage="url(".concat(l.a,")")),y.textContent=" ".concat(w)}),d.addEventListener("click",function(){f.style.backgroundImage="url(".concat(l.a,")"),m.style.display="none",p.clearRect(0,0,300,300),p.drawImage(h,0,0,300,300),c.splice(0),s.style.backgroundColor="transparent",setTimeout(x,3e3),d.style.display="none"}),i.terminate()}),i.addEventListener("error",function(e){e.preventDefault(),console.log(e.message,"on line ".concat(e.lineno))})},zWI3:function(e,n){e.exports="images/1d156c6e18cf3e139dfb92a0b2bd7aac.jpg"}}]);
//# sourceMappingURL=contact.3ba6fb75499bd1f9ff6b.js.map