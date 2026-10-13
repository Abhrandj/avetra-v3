/* AVETRA v3.0 Tahap 1. Separate UI only; original BrandName engine remains unchanged. */
(function(){'use strict';
 const $=id=>document.getElementById(id), key='avetra-v3-brandlab-history-v1';
 const category=$('labCategory'), names=$('labNames'), msg=$('labMessage'), out=$('labResults');
 if(!category || typeof window.brandExact!=='function')return;
 const cats=[...document.querySelectorAll('#btype option')];
 cats.forEach((opt,i)=>{const el=document.createElement('option');el.value=opt.value;el.textContent=opt.textContent;category.appendChild(el)});
 if(!category.options.length){msg.textContent='Kategori tidak tersedia.';return;}
 let current=[];
 function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function score(s){const n=parseInt(s,10);return Number.isFinite(n)?n:-1;}
 function load(){try{const x=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(x)?x:[]}catch{return []}}
 function store(v){try{localStorage.setItem(key,JSON.stringify(v));return true}catch{msg.textContent='Penyimpanan browser tidak tersedia.';return false}}
 function renderSaved(){const items=load(), target=$('labSaved');target.replaceChildren();if(!items.length){target.textContent='Belum ada hasil tersimpan.';return;}
 items.slice().reverse().forEach((entry,i)=>{const box=document.createElement('div');box.className='obstacle-panel';const head=document.createElement('strong');head.textContent=`${entry.category||'Kategori'} · ${entry.names.length} nama`;const sub=document.createElement('small');sub.textContent=entry.names.join(' • ');const btn=document.createElement('button');btn.textContent='Buka kembali';btn.onclick=()=>{names.value=entry.names.join('\n');category.value=entry.categoryIndex;compare();};box.append(head,sub,document.createElement('br'),btn);target.appendChild(box)});}
 function compare(){const entries=[...new Set(names.value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean))];if(!entries.length){msg.textContent='Masukkan minimal satu nama.';return;}if(entries.length>20){msg.textContent='Maksimal 20 nama per perbandingan.';return;}
 const idx=category.selectedIndex;current=entries.map(name=>window.brandExact(name,idx));
 const bestMatch=Math.max(...current.map(x=>score(x.match))),bestSP=Math.max(...current.map(x=>score(x.sellPower)));
 const rows=current.map((x,i)=>`<tr><td>${i+1}</td><td class="lab-name"><button type="button" class="lab-open" data-index="${i}" aria-label="Buka analisis ${esc(x.name)}">${esc(x.name)} ↗</button></td><td>${esc(x.ar)}</td><td>${esc(x.coherence)}</td><td class="${score(x.match)===bestMatch?'lab-best':''}">${esc(x.match)}</td><td class="${score(x.sellPower)===bestSP?'lab-best':''}">${esc(x.sellPower)}</td></tr>`).join('');
 out.innerHTML=`<div class="card"><h3>Hasil perbandingan · ${esc(category.options[idx].textContent)}</h3><p class="note">Ketuk nama untuk melihat analisis lengkap. Geser tabel ke samping untuk melihat semua kolom.</p><div class="lab-table" role="region" tabindex="0" aria-label="Tabel perbandingan brand, geser horizontal"><table><thead><tr><th>No.</th><th>Nama</th><th>A.R.</th><th>Coherence</th><th>MATCH</th><th>Sell Power</th></tr></thead><tbody>${rows}</tbody></table></div><p class="note">Sorotan hijau menunjukkan nilai tertinggi di antara nama yang dibandingkan, bukan prediksi hasil bisnis. Nilai A.R. 11 atau hasil tidak tersedia tidak dianggap skor MATCH.</p></div>`;
 out.querySelectorAll('.lab-open').forEach(btn=>btn.addEventListener('click',()=>{const item=current[Number(btn.dataset.index)];if(!item)return;const field=$('bname');const selector=$('btype');if(field)field.value=item.name;if(selector)selector.selectedIndex=idx;document.querySelector('.tab[data-tab="brand"]')?.click();$('bcalc')?.click();document.getElementById('bout')?.scrollIntoView({behavior:'smooth',block:'start'});}));
 $('labExport').disabled=false;$('labSave').disabled=false;msg.textContent=`${current.length} nama berhasil dihitung menggunakan BrandName Classic.`;}
 $('labCompare').onclick=compare;
 $('labFromBrand').onclick=()=>{const name=$('bname')?.value?.trim();if(!name){msg.textContent='Isi nama pada tab BrandName terlebih dahulu.';return;}names.value=names.value.trim()?names.value.trim()+'\n'+name:name;const from=$('btype');if(from)category.selectedIndex=from.selectedIndex;msg.textContent='Nama diambil dari tab BrandName.';};
 $('labExport').onclick=()=>{if(!current.length)return;const rows=[['Nama','Kategori','AR','Coherence','MATCH','Sell Power'],...current.map(x=>[x.name,x.type,x.ar,x.coherence,x.match,x.sellPower])];const csv='\ufeff'+rows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='AVETRA_BrandLab_v3.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 $('labSave').onclick=()=>{if(!current.length)return;const data=load();data.push({categoryIndex:category.value,category:category.options[category.selectedIndex].textContent,names:current.map(x=>x.name)});if(store(data.slice(-30))) {renderSaved();msg.textContent='Perbandingan disimpan pada perangkat ini.';}};
 $('labClearSaved').onclick=()=>{if(!confirm('Hapus semua perbandingan Brand Lab yang tersimpan di perangkat ini?'))return;if(store([]))renderSaved();};
 renderSaved();
})();
