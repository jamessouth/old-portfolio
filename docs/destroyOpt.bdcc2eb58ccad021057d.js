(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{U6hr:function(e,t){e.exports="images/explosion.84627f9421b5fb5af82d16343678f266.gif"},mRv3:function(e,t,n){"use strict";n.r(t);n("sMBO"),n("FZtP");var o=n("U6hr"),i=n.n(o),c=document.querySelector("ul"),l=document.createElement("template");l.innerHTML='<p>Destroy Cubes</p>\n<input tabindex="0" class="check" type="checkbox" id="destroy" name="destroy" value="destroy"/>\n<label for="destroy">do not destroy</label>\n<label for="sec">wait</label>\n<select tabindex="0" disabled="" id="sec" name="delay" data-sizing="s">\n  <option disabled="">0</option>\n  <option>1</option>\n  <option>2</option>\n  <option>3</option>\n  <option>4</option>\n  <option>5</option>\n  <option>6</option>\n  <option>7</option>\n  <option>8</option>\n  <option>9</option>\n</select>\n<div>\n  <p>seconds after </p>\n  <button type="button" tabindex="0">click</button>\n</div>',c.children[2].appendChild(l.content);var a=document.querySelector(".hold"),d=document.querySelector(".slider input"),s=document.querySelector("#destroy"),r=document.querySelector('label[for="destroy"]'),u=document.querySelector("h1:first-of-type"),p=document.querySelector("select"),y=document.querySelector('label[for="sec"]'),m=document.querySelector("select + div"),f=new Image,b=new Image,h=document.querySelectorAll(".photo-cube"),v=m.querySelector("button"),g=document.querySelectorAll(".subhead:nth-of-type(odd)"),x=document.querySelectorAll(".subhead:nth-of-type(even)");function S(e){e.addEventListener("animationend",function(){f.style.display="block",u.style.marginBottom="0",e.style.display="none",e.parentNode.style.display="none";for(var t=0;t<2;t+=1)g[t].style.display="none",x[t].style.display="none";window.innerWidth<768?(f.style.width="560px",f.style.height="420px",f.style.marginTop="".concat(document.documentElement.clientHeight/2-167-210,"px")):(b.style.display="block",f.style.marginTop="".concat((d.value-220)/3+26,"px"),b.style.marginTop="".concat((d.value-220)/3+0,"px"))}),e.classList.add("blowup"),setTimeout(function(){[f,b].forEach(function(e){e.style.display="none"})},1e3*p.value+5490)}s.checked=!1,p.value=0,s.addEventListener("change",function(e){e.target.checked?([f,b].forEach(function(e,t){e.setAttribute("alt","explosion"),e.classList.add("explode"),e.onload=function(){a.insertBefore(e,h[t].parentNode),[p,y,m].forEach(function(e){e.style.display="block"})},e.src=i.a}),r.textContent="DESTROY!",p.removeAttribute("disabled")):(r.textContent="do not destroy",[p,y,m].forEach(function(e){e.style.display="none"}),p.setAttribute("disabled",""))}),v.addEventListener("click",function(){S(h[0]),S(h[1])}),p.addEventListener("change",function(){var e=this.dataset.sizing;document.documentElement.style.setProperty("--".concat(this.name),this.value+e)})},sMBO:function(e,t,n){var o=n("g6v/"),i=n("m/L8").f,c=Function.prototype,l=c.toString,a=/^\s*function ([^ (]*)/;!o||"name"in c||i(c,"name",{configurable:!0,get:function(){try{return l.call(this).match(a)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=destroyOpt.bdcc2eb58ccad021057d.js.map