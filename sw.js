!function(){"use strict";self.CACHE_BUSTER="1555722562708|0.45259424797588865",self.addEventListener("install",function(e){return self.skipWaiting()}),self.addEventListener("activate",function(e){return self.clients.claim()});var e=function(e,t){return caches.keys().then(function(n){n.forEach(function(n){0===n.indexOf(e)&&n!==t&&caches.delete(n)})})},t="".concat("esw-asset-cache","-").concat("1"),n=["assets/auto-import-fastboot-d41d8cd98f00b204e9800998ecf8427e.js","assets/images/icon-192-ad7f0a3342c74b9ecb6aec5e145d48ac.png","assets/images/icon-512-b34d88e91a4389f9be6e1221afd633d1.png","assets/track-your-goals-53c0ab2ca57b2e30ea6b00c5cf8941e3.css","assets/track-your-goals-bf8bf407687998adc915ee7f0630cc5b.js","assets/vector/add.svg","assets/vector/cancel.svg","assets/vector/delete.svg","assets/vector/download.svg","assets/vector/edit.svg","assets/vector/rotate.svg","assets/vector/save.svg","assets/vector/stopwatch.svg","assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css","assets/vendor-6d1542e1c89f87e1180ea98842f3d4ed.js"].map(function(e){return new URL(e,self.location).toString()});self.addEventListener("install",function(e){e.waitUntil(caches.open(t).then(function(e){return Promise.all(n.map(function(t){var n=new Request(t,{mode:"cors"});return fetch(n).then(function(n){if(n.status>=400){var s=new Error("Request for ".concat(t," failed with status ").concat(n.statusText));throw s}return e.put(t,n)}).catch(function(e){console.error("Not caching ".concat(t," due to ").concat(e))})}))}))}),self.addEventListener("activate",function(s){s.waitUntil(Promise.all([e("esw-asset-cache",t),void caches.open(t).then(function(e){return e.keys().then(function(t){t.forEach(function(t){-1===n.indexOf(t.url)&&e.delete(t)})})})]))}),self.addEventListener("fetch",function(e){var s="GET"===e.request.method,c=-1!==n.indexOf(e.request.url);s&&c&&e.respondWith(caches.match(e.request,{cacheName:t}).then(function(t){return t||fetch(e.request.url,{mode:"cors"})}))});var s=[],c=[];function a(e,t){return!!t.find(function(t){return t.test(decodeURI(e))})}self.INDEX_FILE_HASH="d544ccff9703d97027a5ced1befe76b1";var r="".concat("esw-index","-").concat("1"),o=new URL("index.html",self.location).toString();self.addEventListener("install",function(e){e.waitUntil(fetch(o,{credentials:"include"}).then(function(e){return caches.open(r).then(function(t){return t.put(o,e)})}))}),self.addEventListener("activate",function(t){t.waitUntil(e("esw-index",r))}),self.addEventListener("fetch",function(e){var t=e.request,n=new URL(t.url),i="GET"===t.method,u=-1!==t.headers.get("accept").indexOf("text/html"),f=n.origin===location.origin,l=a(t.url,s),d=!c.length||a(t.url,c);!("/tests"===n.pathname&&!1)&&i&&u&&f&&d&&!l&&e.respondWith(caches.match(o,{cacheName:r}).then(function(e){return e||fetch(o,{credentials:"include"}).then(function(e){return caches.open(r).then(function(t){return t.put(o,e)}),e.clone()})}))})}();
//# sourceMappingURL=sw-76c8ce64b254bc617e80e5e0042bdcee.map