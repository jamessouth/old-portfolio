importScripts("precache-manifest-v7.d75a8c7dd17f6ba5713fd73cc8d8ff52.js");

!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);try{self["workbox:core:4.1.0"]&&_()}catch(e){}const n=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:self.registration.scope},i=e=>[r.prefix,e,r.suffix].filter(e=>e.length>0).join("-"),c={updateDetails:e=>{Object.keys(r).forEach(t=>{void 0!==e[t]&&(r[t]=e[t])})},getGoogleAnalyticsName:e=>e||i(r.googleAnalytics),getPrecacheName:e=>e||i(r.precache),getRuntimeName:e=>e||i(r.runtime)},o=e=>{const t=new URL(e,location);return t.origin===location.origin?t.pathname:t.href},h=new Set;class u{constructor(e,t,{onupgradeneeded:s,onversionchange:n=this._onversionchange}={}){this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n,this._db=null}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=(()=>t(n.error)),n.onupgradeneeded=(e=>{s?(n.transaction.abort(),e.target.result.close()):this._onupgradeneeded&&this._onupgradeneeded(e)}),n.onsuccess=(({target:t})=>{const n=t.result;s?n.close():(n.onversionchange=this._onversionchange.bind(this),e(n))})}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(({key:e})=>e)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:r}={}){return await this.transaction([e],"readonly",(i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,u=[];h.openCursor(s,n).onsuccess=(({target:e})=>{const t=e.result;if(t){const{primaryKey:e,key:s,value:n}=t;u.push(r?{primaryKey:e,key:s,value:n}:n),a&&u.length>=a?c(u):t.continue()}else c(u)})})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const r=this._db.transaction(e,t);r.onabort=(({target:e})=>a(e.error)),r.oncomplete=(()=>n()),s(r,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{s.objectStore(t)[e](...n).onsuccess=(({target:e})=>{a(e.result)})})}_onversionchange(){this.close()}close(){this._db&&(this._db.close(),this._db=null)}}u.prototype.OPEN_TIMEOUT=2e3;const l={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(l))for(const s of t)s in IDBObjectStore.prototype&&(u.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});const d=async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=(({target:e})=>{s(e.error)}),n.onblocked=(()=>{s(new Error("Delete blocked"))}),n.onsuccess=(()=>{t()})})};try{self["workbox:expiration:4.1.0"]&&_()}catch(e){}const p="workbox-expiration",g="cache-entries",f=e=>{const t=new URL(e,location);return t.hash="",t.href};class m{constructor(e){this._cacheName=e,this._db=new u(p,1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(g,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),d(this._cacheName)}async setTimestamp(e,t){e=f(e),await this._db.put(g,{url:e,timestamp:t,cacheName:this._cacheName,id:this._getId(e)})}async getTimestamp(e){return(await this._db.get(g,this._getId(e))).timestamp}async expireEntries(e,t){return await this._db.transaction(g,"readwrite",(s,n)=>{const a=s.objectStore(g),r=[];let i=0;a.index("timestamp").openCursor(null,"prev").onsuccess=(({target:s})=>{const a=s.result;if(a){const s=a.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&i>=t?(a.delete(),r.push(a.value.url)):i++),a.continue()}else n(r)})})}_getId(e){return this._cacheName+"|"+f(e)}}class w{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new m(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:void 0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,this.expireEntries())}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class y{constructor(e={}){var t;this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=(()=>this.deleteCacheAndMetadata()),h.add(t))}_getCacheExpiration(e){if(e===c.getRuntimeName())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new w(e,this._config),this._cacheExpirations.set(e,t)),t}cachedResponseWillBeUsed({event:e,request:t,cacheName:s,cachedResponse:n}){if(!n)return null;let a=this._isResponseDateFresh(n);const r=this._getCacheExpiration(s);r.expireEntries();const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){0}return a?n:null}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async cacheDidUpdate({cacheName:e,request:t}){const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await caches.delete(e),await t.delete();this._cacheExpirations=new Map}}try{self["workbox:precaching:4.1.0"]&&_()}catch(e){}const v="cacheDidUpdate",x="cacheWillUpdate",R="cachedResponseWillBeUsed",q="fetchDidFail",b="fetchDidSucceed",N="requestWillFetch",E=(e,t)=>e.filter(e=>t in e),U=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const r=await caches.open(e);let i=await r.match(t,n);for(const r of a)R in r&&(i=await r[R].call(r,{cacheName:e,request:t,event:s,matchOptions:n,cachedResponse:i}));return i},O=async({request:e,response:t,event:s,plugins:n})=>{let a=t,r=!1;for(let t of n)if(x in t&&(r=!0,!(a=await t[x].call(t,{request:e,response:a,event:s}))))break;return r||(a=200===a.status?a:null),a||null},L={put:async({cacheName:e,request:t,response:s,event:n,plugins:r=[],matchOptions:i}={})=>{if(!s)throw new a("cache-put-with-no-response",{url:o(t.url)});let c=await O({request:t,response:s,event:n,plugins:r});if(!c)return;const u=await caches.open(e),l=E(r,v);let d=l.length>0?await U({cacheName:e,request:t,matchOptions:i}):null;try{await u.put(t,c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of h)await e()}(),e}for(let s of l)await s[v].call(s,{cacheName:e,request:t,event:n,oldResponse:d,newResponse:c})},match:U},T={fetch:async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if(s&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}"string"==typeof e&&(e=new Request(e));const r=E(n,q),i=r.length>0?e.clone():null;try{for(let t of n)N in t&&(e=await t[N].call(t,{request:e.clone(),event:s}))}catch(e){throw new a("plugin-error-request-will-fetch",{thrownError:e})}let c=e.clone();try{let a;a="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)b in e&&(a=await e[b].call(e,{event:s,request:c,response:a}));return a}catch(e){for(const t of r)await t[q].call(t,{error:e,event:s,originalRequest:i.clone(),request:c.clone()});throw e}}};const S="__WB_REVISION__";function j(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location),r=new URL(s,location);return r.searchParams.set(S,t),{cacheKey:r.href,url:n.href}}class k{constructor(e){this._cacheName=c.getPrecacheName(e),this._urlsToCacheKeys=new Map}addToCacheList(e){for(const t of e){const{cacheKey:e,url:s}=j(t);if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});this._urlsToCacheKeys.set(s,e)}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await caches.open(this._cacheName),r=await a.keys(),i=new Set(r.map(e=>e.url));for(const e of this._urlsToCacheKeys.values())i.has(e)?n.push(e):s.push(e);const c=s.map(s=>this._addURLToCache({event:e,plugins:t,url:s}));return await Promise.all(c),{updatedURLs:s,notUpdatedURLs:n}}async activate(){const e=await caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({url:e,event:t,plugins:s}){const n=new Request(e,{credentials:"same-origin"});let r,i=await T.fetch({event:t,plugins:s,request:n});for(const e of s||[])"cacheWillUpdate"in e&&(r=e.cacheWillUpdate.bind(e));if(!(r?r({event:t,request:n,response:i}):i.status<400))throw new a("bad-precaching-response",{url:e,status:i.status});i.redirected&&(i=await async function(e){const t=e.clone(),s="body"in t?Promise.resolve(t.body):t.blob(),n=await s;return new Response(n,{headers:t.headers,status:t.status,statusText:t.statusText})}(i)),await L.put({event:t,plugins:s,request:n,response:i,cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location);return this._urlsToCacheKeys.get(t.href)}}let A;const C=()=>(A||(A=new k),A);const M=(e,t)=>{const s=C().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const r=new URL(e,location);r.hash="",yield r.href;const i=function(e,t){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i);e.pathname+=s,yield e.href}if(n){const e=new URL(i);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let K=!1;const P=[],D={get:()=>P,add(e){P.push(...e)}};let I=!1;try{self["workbox:routing:4.1.0"]&&_()}catch(e){}const W="GET",H=e=>e&&"object"==typeof e?e:{handle:e};class F{constructor(e,t,s){this.handler=H(t),this.match=e,this.method=s||W}}class $ extends F{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);return s?t.origin!==location.origin&&0!==s.index?null:s.slice(1):null},t,s)}}class Q{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",async e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&(await s,e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location);if(!s.protocol.startsWith("http"))return void 0;let n,{params:a,route:r}=this.findMatchingRoute({url:s,request:e,event:t}),i=r&&r.handler;if(!i&&this._defaultHandler&&(i=this._defaultHandler),i){try{n=i.handle({url:s,request:e,event:t,params:a})}catch(e){n=Promise.reject(e)}return n&&this._catchHandler&&(n=n.catch(e=>this._catchHandler.handle({url:s,event:t,err:e}))),n}}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n,r=a.match({url:e,request:t,event:s});if(r)return Array.isArray(r)&&r.length>0?n=r:r.constructor===Object&&Object.keys(r).length>0&&(n=r),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=H(e)}setCatchHandler(e){this._catchHandler=H(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let B;const G=()=>(B||((B=new Q).addFetchListener(),B.addCacheListener()),B),z=(e,t,s="GET")=>{let n;if("string"==typeof e){const a=new URL(e,location);0,n=new F(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new $(e,t,s);else if("function"==typeof e)n=new F(e,t,s);else{if(!(e instanceof F))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return G().registerRoute(n),n};try{self["workbox:strategies:4.1.0"]&&_()}catch(e){}class J{constructor(e={}){this._cacheName=c.getRuntimeName(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions||null,this._matchOptions=e.matchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await L.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new a("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await T.fetch({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=L.put({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){0}return s}}const V={cacheWillUpdate:({response:e})=>200===e.status||0===e.status?e:null};class X{constructor(e={}){if(this._cacheName=c.getRuntimeName(e.cacheName),this._plugins=e.plugins||[],e.plugins){let t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[V,...e.plugins]}else this._plugins=[V];this._fetchOptions=e.fetchOptions||null,this._matchOptions=e.matchOptions||null}async handle({event:e,request:t}){return this.makeRequest({event:e,request:t||e.request})}async makeRequest({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,r=await L.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(r){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{r=await s}catch(e){n=e}}if(!r)throw new a("no-response",{url:t.url,error:n});return r}async _getFromNetwork({request:e,event:t}){const s=await T.fetch({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=L.put({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}const Y="james south portfolio";var Z,ee,te,se;Z={prefix:Y},c.updateDetails(Z),self.__precacheManifest=[].concat(self.__precacheManifest||[]),ee=self.__precacheManifest,te={},(e=>{const t=C();if(t.addToCacheList(e),!I&&e.length>0){const e=D.get();self.addEventListener("install",s=>{s.waitUntil(t.install({event:s,plugins:e}).catch(e=>{throw e}))}),self.addEventListener("activate",s=>{s.waitUntil(t.activate({event:s,plugins:e}))}),I=!0}})(ee),(({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n=null}={})=>{if(!K){const a=c.getPrecacheName();addEventListener("fetch",r=>{const i=M(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!i)return;let c=caches.open(a).then(e=>e.match(i)).then(e=>e||fetch(i));r.respondWith(c)}),K=!0}})(te),addEventListener("activate",e=>{const t=c.getPrecacheName();e.waitUntil((async(e,t="-precache-")=>{const s=(await caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>caches.delete(e))),s})(t).then(e=>{}))}),addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&skipWaiting()}),z(/\.(?:js)$/,new J({cacheName:`${Y}-lazy-js`,plugins:[new y({maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]})),z(/\.(?:png|jpg|jpeg|svg|gif)$/,new J({cacheName:`${Y}-images`,plugins:[new y({maxAgeSeconds:15552e3,purgeOnQuotaError:!0})]})),z(/^https:\/\/fonts\.googleapis\.com/,new X({cacheName:`${Y}-google-fonts-css`,plugins:[new y({maxEntries:1,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),z(/^https:\/\/fonts\.gstatic\.com/,new J({cacheName:`${Y}-google-fonts`,plugins:[new y({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]})),se=new X({cacheName:`${Y}-default-handler`,plugins:[new y({maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),G().setDefaultHandler(se),(e=>{G().setCatchHandler(e)})(({event:e})=>{if("image"===e.request.destination&&/\.gif$/.test(e.request.url)&&!e.request.url.includes("explosion"))switch(e.request.url.match(/\d{1,2}(?=\.\w{32})/)[0]){case"7":return caches.match("/images/project7.0d460c6cd15e9ed3f683a05d1a282fbb.jpg");case"9":return caches.match("/images/project9.fef701d08faf6c81fe7b50e9c45f79ad.jpg");case"10":return caches.match("/images/project10.38128e3e605efa9c9dc9aecec6ffe3f7.jpg");case"11":return caches.match("/images/project11.f50561f0701ba64315826deee4556c17.jpg")}return Response.error()})}]);
//# sourceMappingURL=sw.js.map
