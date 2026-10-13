/* AVETRA v2.6.8: navigation and presentation only. All calculation engines untouched. */
(function(){
 'use strict';
 function init(){
  const tabs=document.querySelector('.tabs');
  if(!tabs)return;
  tabs.setAttribute('aria-label','Modul AVETRA');
  // Six original buttons are the only module navigation.
  const buttons=[...tabs.querySelectorAll('.tab')];
  function syncPressed(){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('active'))));}
  tabs.addEventListener('click',e=>{if(e.target.closest('.tab'))requestAnimationFrame(syncPressed);});
  syncPressed();
  const top=document.createElement('button');top.type='button';top.id='avetraBackTop';top.textContent='↑';top.title='Kembali ke atas';top.setAttribute('aria-label','Kembali ke atas halaman');
  top.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
  document.body.appendChild(top);
  let previous=window.scrollY,ticking=false;
  function update(){const y=window.scrollY;top.classList.toggle('show',y>1200&&(y<previous-3||Math.abs(y-previous)<3));previous=y;ticking=false;}
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});update();
  function arrange(){
   const metrics=document.querySelector('#combinedReading .platinum-metrics');
   if(!metrics||metrics.dataset.smart==='yes')return;
   metrics.dataset.smart='yes';
   const items=[...metrics.children];
   const primary=[0,1,2,7,8,12];
   const details=document.createElement('details');details.className='avetra-more-metrics';
   const summary=document.createElement('summary');summary.textContent='Lihat semua indikator Platinum ('+(items.length-primary.length)+' tambahan)';
   const extra=document.createElement('div');extra.className='reading-status platinum-metrics avetra-extra-grid';
   items.forEach((item,i)=>{if(!primary.includes(i))extra.appendChild(item);});
   details.append(summary,extra);metrics.insertAdjacentElement('afterend',details);
  }
  const pout=document.getElementById('pout');if(pout){new MutationObserver(arrange).observe(pout,{childList:true,subtree:false});arrange();}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
