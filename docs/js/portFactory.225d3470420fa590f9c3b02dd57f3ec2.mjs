const e=new Worker("./worker.80e99b1b2eebcdb83e0ba87e7884a88a.js"),t=document.querySelectorAll(".projects div"),o=[{t:"clean tablet",o:"http://clean-tablet.herokuapp.com/",i:"https://github.com/jamessouth/clean-tablet",s:"names and scores from a game",l:"go websockets",h:"react heroku",p:"live site for clean tablet game",m:"code for clean tablet project"},{t:"time zones",l:"react mongodb",h:"node graphql heroku",o:"http://timezones.herokuapp.com/",i:"https://github.com/jamessouth/timezones",s:"list of countries in a time zone",p:"live site for timezones project",m:"code for timezones project"},{t:"portfolio",l:"pwa snowpack a11y paint",h:"components workers sass",i:"https://github.com/jamessouth/portfolio",s:"hovering cubes with images of my websites on each side",m:"code for portfolio project"},{t:"dashboard",l:"pwa vue vuex",h:"ajax chart.js fp",o:"https://jamessouth.github.io/dashboard/",i:"https://github.com/jamessouth/dashboard",s:"a doughnut chart",p:"live site for web app dashboard project",m:"code for web app dashboard project"},{t:"directory",l:"pwa react a11y",h:"tdd ajax fp",o:"https://jamessouth.github.io/directory/",i:"https://github.com/jamessouth/directory",s:"employee info cards laid out in a grid",p:"live site for employee directory project",m:"code for employee directory project"},{t:"puzzle generator",l:"angular",h:"typescript",o:"https://jamessouth.github.io/fifteen-puzzle-generator/home",i:"https://github.com/jamessouth/fifteen-puzzle-generator",s:"an unsolved sliding block puzzle",p:"live site for 15 puzzle generator project",m:"code for 15 puzzle generator project"},{t:"face scramble!",l:"angular typescript",h:"nativescript",i:"https://github.com/jamessouth/face-scramble",s:"a 15 puzzle being solved along with moves and elapsed time",m:"code for face scramble project"},{t:"web dev kit",o:"https://chrome.google.com/webstore/detail/web-dev-kit/geedfiohcopjhgancckdfanhobhfbgmm",i:"https://github.com/jamessouth/webdevkit",s:"a laptop on a desk",l:"javascript",h:"chrome extension",p:"live site for web dev kit project",m:"code for web dev kit project"},{t:"vue-style-lint",l:"node es6 fp ci tdd",h:"npm|v1.0.3",o:"https://www.npmjs.com/package/vue-style-lint",i:"https://github.com/jamessouth/vue-style-lint",s:"output of a computer terminal",p:"live site for vue-style-lint project",m:"code for vue-style-lint project"}];class i extends HTMLElement{constructor({title:e,tech1:t,tech2:o,live:i,code:n,alt:r,liveAria:a,codeAria:c},s,l){super();const h=this.attachShadow({mode:"open"}),p=function(e,t,o,i,n,r,a,c,s,l){const h=document.createElement("template"),p=`\n  <h3>${e}</h3>\n  <p>${t}</p>\n  <p>${o||""}</p>\n  <div></div>\n  <div>\n    <img src="${s}" alt="${r}"/>\n    <a rel="noopener noreferrer" href="${n}" aria-label="${c}">code</a>\n    ${i?`<a rel="noopener noreferrer" href="${i}" aria-label="${a}">live</a>`:""}\n  </div>\n  <style>\n  a:hover,\n  a:focus{\n    outline: none;\n    background-color: #08415C;\n    color: #fafad2;\n  }\n  img{\n    object-fit: cover;\n    object-position: ${-288*l}px;\n    width: 100%;\n    height: 100%;\n    grid-area: top;\n  }\n  h3, p, a{\n    text-align: center;\n    color: #30511d;\n  }\n  h3{\n    font-size: 1.9em;\n    line-height: 1.6;\n    margin: 0;\n  }\n  p{\n    margin: 0;\n    font-size: 1.5em;\n    line-height: 1;\n    height: 24px;\n    font-weight: bold;\n  }\n  a{\n    width: calc(100% - 2px);\n    height: 30px;\n    line-height: 0.8;\n    font-size: 2em;\n    text-decoration: none;\n    border: 1px solid #30511d;\n    font-weight: bold;\n  }\n  div:first-of-type{\n    width: 100%;\n    height: .5625rem;\n    background: transparent;\n  }\n  div:last-of-type{\n    display: grid;\n    grid: "top top" 90% "lbot rbot" 10% / 1fr 1fr;\n    justify-items: center;\n    width: 288px;\n    height: 320px;\n  }\n  ${i?"\n  a:first-of-type{\n    grid-area: lbot;\n  }\n  a:last-of-type{\n    grid-area: rbot;\n  }":"\n  a{\n    grid-column: 1 / -1;\n  }"}\n  `;return h.innerHTML=p,h}(e,t,o,i,n,r,a,c,s,l);h.appendChild(p.content.cloneNode(!0))}get langDiv(){return this.shadowRoot.querySelector("div:first-of-type")}}e.addEventListener("message",e=>{t[e.data.id].children[0].shadowRoot.children[3].style.background=e.data.style,t[e.data.id].children[0].shadowRoot.children[3].setAttribute("title",e.data.title)});export default function n(t,n,r){const a=o[n].code.match(/[\w-]+$/)[0];e.postMessage({id:t.id,repoName:a});const c=new i(o[n],r,n);t.appendChild(c)}window.customElements.define("project-panel",i);