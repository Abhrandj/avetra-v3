// AVETRA v2.6.8: network-first for scripts to prevent mixed-version JS on Safari.
const K='avetra-v3.0.1-1';
const ASSETS=['./','./index.html','./cabalistic-engine.js','./cabalistic-decomposition.js','./platinum-aggregate.js','./ui-polish.js','./app.js','./brand-engine.js','./brand-category-guide.js','./brand-lab-v3.js','./enhancements.js','./vitranta-analysis.js','./vitranta-engine.js','./auto-vitranta.js','./interpretation.js','./scs-dictionary.js','./scs-dictionary-ui.js','./compatibility.js','./combined-interpretation.js','./transit-calendar.js','./personal-vitranta-sync.js','./manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(K).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==K).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'||url.pathname.endsWith('.js')){
  e.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();e.waitUntil(caches.open(K).then(c=>c.put(req,copy)))}return res}).catch(()=>caches.match(req).then(r=>r||caches.match(url.pathname.split('/').pop()))));
  return;
 }
 e.respondWith(caches.match(req).then(r=>r||fetch(req)));
});
