!function(){"use strict";self.CACHE_BUSTER="1555729939096|0.4276357861935136",self.addEventListener("install",function(e){return self.skipWaiting()}),self.addEventListener("activate",function(e){return self.clients.claim()});var e=function(e,t){return caches.keys().then(function(n){n.forEach(function(n){0===n.indexOf(e)&&n!==t&&caches.delete(n)})})},t="".concat("esw-asset-cache","-").concat("1"),n=["assets/auto-import-fastboot-d41d8cd98f00b204e9800998ecf8427e.js","assets/images/icon-192-ad7f0a3342c74b9ecb6aec5e145d48ac.png","assets/images/icon-512-b34d88e91a4389f9be6e1221afd633d1.png","assets/track-your-goals-37d35fee8e6b28d3471c8302c9cdf2ee.css","assets/track-your-goals-44ee9019eb8a033c34068e5a8963f60a.js","assets/vector/add.svg","assets/vector/cancel.svg","assets/vector/delete.svg","assets/vector/download.svg","assets/vector/edit.svg","assets/vector/rotate.svg","assets/vector/save.svg","assets/vector/stopwatch.svg","assets/vector/upload.svg","assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css","assets/vendor-74a7746329b3fe428c3173a5896d743f.js"].map(function(e){return new URL(e,self.location).toString()});self.addEventListener("install",function(e){e.waitUntil(caches.open(t).then(function(e){return Promise.all(n.map(function(t){var n=new Request(t,{mode:"cors"});return fetch(n).then(function(n){if(n.status>=400){var s=new Error("Request for ".concat(t," failed with status ").concat(n.statusText));throw s}return e.put(t,n)}).catch(function(e){console.error("Not caching ".concat(t," due to ").concat(e))})}))}))}),self.addEventListener("activate",function(s){s.waitUntil(Promise.all([e("esw-asset-cache",t),void caches.open(t).then(function(e){return e.keys().then(function(t){t.forEach(function(t){-1===n.indexOf(t.url)&&e.delete(t)})})})]))}),self.addEventListener("fetch",function(e){var s="GET"===e.request.method,c=-1!==n.indexOf(e.request.url);s&&c&&e.respondWith(caches.match(e.request,{cacheName:t}).then(function(t){return t||fetch(e.request.url,{mode:"cors"})}))});var s=[],c=[];function a(e,t){return!!t.find(function(t){return t.test(decodeURI(e))})}self.INDEX_FILE_HASH="eeda52cd12e8933c0f03dca3a15c6955";var o="".concat("esw-index","-").concat("1"),r=new URL("index.html",self.location).toString();self.addEventListener("install",function(e){e.waitUntil(fetch(r,{credentials:"include"}).then(function(e){return caches.open(o).then(function(t){return t.put(r,e)})}))}),self.addEventListener("activate",function(t){t.waitUntil(e("esw-index",o))}),self.addEventListener("fetch",function(e){var t=e.request,n=new URL(t.url),i="GET"===t.method,u=-1!==t.headers.get("accept").indexOf("text/html"),f=n.origin===location.origin,l=a(t.url,s),d=!c.length||a(t.url,c);!("/tests"===n.pathname&&!1)&&i&&u&&f&&d&&!l&&e.respondWith(caches.match(r,{cacheName:o}).then(function(e){return e||fetch(r,{credentials:"include"}).then(function(e){return caches.open(o).then(function(t){return t.put(r,e)}),e.clone()})}))})}();
//# sourceMappingURL=sw-3bc2243213e2ebd85fb205db2cc5ae33.map