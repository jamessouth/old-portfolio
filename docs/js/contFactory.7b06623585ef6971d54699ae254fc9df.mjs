const o=[{o:"mailto:jamesdanielsouth@outlook.com",t:"open your email client to email me",e:0,n:78},{o:"https://github.com/jamessouth",t:"go to my github",e:-78,n:64},{o:"https://app.pluralsight.com/profile/jamessouth",t:"go to my pluralsight profile",e:-142,n:196},{o:"https://stackoverflow.com/users/9996080/james-south?tab=profile",t:"go to my stack overflow profile",e:-338,n:54},{o:"https://twitter.com/dsouthbot",t:"go to my twitter",e:-392,n:78},{o:"https://exercism.io/profiles/jamessouth",t:"go to my exercism profile",e:-470,n:130},{o:"https://dev.to/jamessouth",t:"go to my dev community profile",e:-600,n:64}];class t extends HTMLElement{constructor({o:o,t:t,e:e,n:n},i){super();const l=this.i({l:"open"}),s=function(o,t,e,n,i){const l=document.createElement("template"),s=`\n  <a rel="noopener noreferrer" href="${o}">\n    <img height="64" src="${i}" alt="${t}" width="${n}"/>\n  </a>\n  <style>\n  img{\n    object-fit: none;\n    object-position: ${e}px;\n  }\n  a{\n    display: block;\n    line-height: 0;\n    border: 2px solid transparent;\n    padding: 4px;\n  }\n  a:focus,\n  a:hover{\n    outline: none;\n    border: 2px solid #08415C;\n  }`;return l.s=s,l}(o,t,e,n,i);l.a(s.f.r(!0))}}export default function e(e,n,i){const l=new t(o[n],i);e.a(l)}window.customElements.define("contact-link",t);