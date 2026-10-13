// AVETRA v1.1 progressive enhancements
const e$=id=>document.getElementById(id);
function brandCompare(){
 const names=[...new Set(e$('candidates').value.split(/\n|,/).map(s=>s.trim()).filter(Boolean))].slice(0,25),category=+e$('btype').value;
 if(!names.length){e$('compareOut').innerHTML='<div class="card warning">Masukkan nama kandidat, satu per baris.</div>';return;}
 const result=names.map(name=>brandExact(name,category));
 e$('compareOut').innerHTML=`<div class="card"><h2>Perbandingan • ${esc(SCS_BRAND_CATEGORIES[category])}</h2><div class="brand-candidate-grid">${result.map(r=>`<article class="brand-compare-card"><h4>${esc(r.name)}</h4><div class="brand-data-grid">${[['A.R.',r.ar],['Coherence',r.coherence],['MATCH',r.ar===11?'Tidak tersedia':r.match],['Sell Power',r.ar===11?'Tidak dapat dihitung':r.sellPower]].map(([k,v])=>`<div><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</div><p class="brand-catur">F / M / E / I / A: ${r.caturRaw.join(' / ')}</p></article>`).join('')}</div><div class="actions"><button id="downloadCompare">Unduh CSV</button></div><p class="note">Skor berasal dari tabel rekonstruksi SCS, bukan peluang keberhasilan bisnis. Nama dan ketersediaan merek belum diperiksa.</p></div>`;
 e$('downloadCompare').onclick=()=>downloadCSV('avetra_brand_compare.csv',[['Name','Category','AR','Coherence','Match','SellPower','F','M','E','I','A'],...result.map(r=>[r.name,r.type,r.ar,r.coherence,r.match,r.sellPower,...r.caturRaw])]);
}
function downloadCSV(filename,rows){const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)}
e$('compareBrands').onclick=brandCompare;
// Safari can show a visually empty native date control. Keep it usable and explicit.
for(const id of ['pdob','ldob']){const el=e$(id);el.addEventListener('change',()=>{el.title=el.value||'Pilih tanggal lahir'});}
// Preserve input only within the current tab/session; no personal names are sent to a server.
const fields=['pname','pdob','psex','bname','btype','candidates','lname','ldob'];
fields.forEach(id=>{let el=e$(id);try{const v=sessionStorage.getItem('avetra:'+id);if(v!==null)el.value=v;}catch(_){}el.addEventListener('input',()=>{try{sessionStorage.setItem('avetra:'+id,el.value)}catch(_){}});el.addEventListener('change',()=>{try{sessionStorage.setItem('avetra:'+id,el.value)}catch(_){}})});
