import"./loadSW.01b2bfa77b20923e06ff73514e4c16a9.mjs";import t from"./projects.c5d99e8a54100ee8d034609aa6e8e454.mjs";import e from"./links.46f7cef7ed33fa1ed4bb5e06016b876e.mjs";const o=document.querySelectorAll(".projects div"),r=document.querySelectorAll(".contact div"),n=[...r].slice(0,r.length-2);fetch("./images/resume.bfe1d2ba21f5a1547aefb64b31807378.pdf").then(t=>{const e=document.querySelector("li:last-of-type a");e.href=t.url,e.download="james_south_res.pdf"}).catch(t=>console.log("failed to fetch: ",t)),CSS.paintWorklet&&(CSS.paintWorklet.addModule("./js/BorderPaint.4ce9d5f121d8e2bb4ac12f59c36fef6e.js"),CSS.paintWorklet.addModule("./js/ButtonPaint.ba004a0309ad1802a12e3dbed1017341.js"));const s={root:null,rootMargin:"0px 0px 420px 0px",threshold:.1};Promise.all([import("./panelFactory.9003faff5c1556de4c3a2b6626eeb075.mjs"),import("./linkFactory.73d5446ad60ace2b09cf005535ed4324.mjs")]).then(([r,l])=>{const c=new IntersectionObserver(function(o,r){return function(n,s){n.filter(t=>t.isIntersecting).forEach(({target:n,target:{id:l}})=>{l.includes("x")?r(n,e[parseInt(l,10)]):o(n,t[l]),s.unobserve(n)})}}(r.default,l.default),s);[...o,...n].forEach(t=>c.observe(t))}).catch(t=>console.log(t));