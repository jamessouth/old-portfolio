import{Workbox as e}from"../web_modules/workbox-window.e28149307080187da95cbbaae8cac292.js";let t;const n=document.querySelector("main"),o=document.createElement("div"),r=document.createElement("button"),i=document.createElement("div"),l=document.createElement("button");function s(e){e.preventDefault(),t=e,r.style.display="block",o.style.display="block",r.addEventListener("click",a)}async function a(){r.style.display="none",o.style.display="none";try{await t.prompt();"accepted"!==(await t.userChoice).outcome&&window.removeEventListener("beforeinstallprompt",s),t=null}catch(e){console.error(e),window.removeEventListener("beforeinstallprompt",s)}}if(r.textContent="install me!",r.className="installbtn",o.className="installdiv",l.textContent="new content: reload!",l.className="reloadbtn",i.className="reloaddiv","serviceWorker"in navigator){const t=new e("./service-worker.js");document.body.insertBefore(r,n),document.body.insertBefore(o,n),l.addEventListener("click",()=>{t.addEventListener("controlling",()=>{window.location.reload()}),t.messageSW({type:"SKIP_WAITING"})}),t.addEventListener("waiting",()=>{document.body.insertBefore(l,n),document.body.insertBefore(i,n),l.style.display="block",i.style.display="block"}),window.addEventListener("beforeinstallprompt",s),window.addEventListener("appinstalled",()=>{const e=document.querySelector("h1");e.textContent="Thank you!",setTimeout(()=>{e.textContent="James South"},6500)}),t.register()}