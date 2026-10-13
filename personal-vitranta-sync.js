// AVETRA v2.8.6: UI-only Personal / Vitranta shared inputs.
(function(){
  'use strict';
  const el=id=>document.getElementById(id);
  const pName=el('pname'),pDate=el('pdob'),lName=el('lname'),lDate=el('ldob');
  if(!pName||!pDate||!lName||!lDate)return;
  let lastEdited='personal';
  function clearResult(target){
    // A changed subject invalidates the previous result; never label stale output as current.
    const result=el(target==='personal'?'pout':'lout');
    if(result&&result.innerHTML.trim())result.innerHTML='<div class="card note">Nama atau tanggal berubah. Tekan tombol Hitung untuk memperbarui hasil.</div>';
  }
  function sync(source){
    const from=source==='personal'?[pName,pDate]:[lName,lDate];
    const to=source==='personal'?[lName,lDate]:[pName,pDate];
    if(!from[0].value.trim()&&!from[1].value)return;
    let changed=false;
    from.forEach((field,i)=>{if(to[i].value!==field.value){to[i].value=field.value;changed=true;}});
    if(changed)clearResult(source==='personal'?'lifemap':'personal');
  }
  for(const field of [pName,pDate])for(const event of ['input','change'])field.addEventListener(event,()=>{lastEdited='personal';clearResult('lifemap');});
  for(const field of [lName,lDate])for(const event of ['input','change'])field.addEventListener(event,()=>{lastEdited='lifemap';clearResult('personal');});
  document.querySelectorAll('.tab[data-tab="personal"],.tab[data-tab="lifemap"]').forEach(tab=>{
    tab.addEventListener('click',()=>{const destination=tab.dataset.tab;sync(destination==='personal'?'lifemap':'personal');});
  });
  // Existing combined-interpretation handler opens the tab. Copy the active
  // Personal subject first, then calculate the Life Map for that subject.
  document.addEventListener('click',event=>{
    if(!event.target.closest('.avetra-go-vitranta'))return;
    sync('personal');
    setTimeout(()=>{if(lName.value.trim()&&lDate.value)el('lcalc')?.click();},0);
  },true);
  // A direct calculation also propagates its subject to the other module.
  el('pcalc')?.addEventListener('click',()=>{lastEdited='personal';sync('personal');});
  el('lcalc')?.addEventListener('click',()=>{lastEdited='lifemap';sync('lifemap');});
})();
