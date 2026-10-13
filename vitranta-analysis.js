
// AVETRA v1.4: verified aggregation formulas over user-supplied 100 Vitranta values.
// Does not invent the missing original hitungVitranta(date,name) algorithm.
(function(){
 const $=id=>document.getElementById(id);
 const W={1:.75,2:.75,3:2,4:1,5:1,6:1,7:1,8:2,9:.5,11:.5,13:-1,14:1,16:-1,19:-1,22:3};
 const positive=v=>![11,13,19].includes(v);
 const effect=v=>W[v]??0;
 let vals=[],birth=0,sel=0;
 function redraw(){
  const a=vals,x=i=>44+i/99*995,y=v=>292-(v+1.25)/4.5*260;
  let s=[-1,0,1,2,3].map(t=>`<line class="vgrid" x1="44" x2="1039" y1="${y(t)}" y2="${y(t)}"/><text class="vlabel" x="12" y="${y(t)+4}">${t}</text>`).join('');
  for(let i=0;i<100;i+=10)s+=`<text class="vlabel" x="${x(i)}" y="321" text-anchor="middle">${birth+i}</text>`;
  s+=`<rect x="${x(21)}" y="7" width="${x(80)-x(21)}" height="7" fill="#74e0a1" opacity=".8"/><rect x="${x(18)}" y="17" width="${x(57)-x(18)}" height="7" fill="#ffcc66" opacity=".8"/>`;
  s+=`<polyline fill="none" stroke="#62d6ff" stroke-width="2.8" stroke-linejoin="round" points="${a.map((v,i)=>x(i)+','+y(effect(v))).join(' ')}"/>`;
  a.forEach((v,i)=>{if([13,16,19,22].includes(v)||i===sel)s+=`<circle data-age="${i}" cx="${x(i)}" cy="${y(effect(v))}" r="${i===sel?6:4}" fill="${[13,16,19].includes(v)?'#ff7885':v===22?'#ffcc66':'#62d6ff'}"><title>Usia ${i}: ${v} (effect ${effect(v)})</title></circle>`});
  s+=`<line x1="${x(sel)}" x2="${x(sel)}" y1="26" y2="292" stroke="#fff" stroke-dasharray="3 5" opacity=".55"/>`;
  $('vchart').innerHTML=s;
  $('vchart').querySelectorAll('circle[data-age]').forEach(c=>c.onclick=()=>choose(+c.dataset.age));
 }
 function choose(i){sel=i;$('vyear').value=i;$('vdetail').textContent=`Usia ${i} • Tahun ulang tahun ${birth+i} • Vitranta ${vals[i]} • Effect ${effect(vals[i])>0?'+':''}${effect(vals[i])} • Synergy ${positive(vals[i])?'positif':'tidak positif'} • Productive ${i>=21&&i<=80?'aktif':'di luar jendela'} • Momentum ${i>=18&&i<=57?'aktif':'di luar jendela'}`;redraw()}
 function calc(){
  let input=$('vvalues').value.trim(),parts=input.split(/[\s,;]+/).filter(Boolean);
  if(parts.length!==100||parts.some(x=>!(/^\d+$/.test(x))||!(+x in W))){$('lout').innerHTML='<div class="card warning">Masukkan tepat 100 angka yang valid: 1–9, 11, 13, 14, 16, 19, atau 22.</div>';return}
  vals=parts.map(Number);
  let d=$('ldob').value;birth=d?+d.slice(0,4):new Date().getFullYear();
  const sy=vals.filter(positive).length,prod=vals.slice(21,81).filter(positive).length,ms=vals.slice(18,58).reduce((a,v)=>a+effect(v),0)/40;
  const negative=vals.flatMap((v,i)=>[13,16,19].includes(v)?[birth+i]:[]);
  const name=$('lname').value.trim();const automatic=$('vvalues').dataset.source==='automatic';
  $('lout').innerHTML=`<div class="card"><h2>Life Map ${name?escapeHtml(name):'100 Tahun'}</h2><p class="note">${automatic?'100 nilai Vitranta dihitung otomatis dari nama melalui port mesin Platinum. Ringkasan memakai agregasi AVETRA yang masih berstatus rekonstruksi.':'Mode audit manual: agregasi dari 100 nilai yang Anda masukkan, bukan perhitungan otomatis.'}</p><div class="metrics"><div class="metric"><small>Synergy</small><b>${sy}%</b></div><div class="metric"><small>Productive</small><b>${Math.floor(prod/60*100)}%</b></div><div class="metric"><small>Momentum raw</small><b>${ms.toFixed(5).replace(/0+$/,'').replace(/\.$/,'')}</b></div></div><p class="note">Momentum display: ${ms>1?'+1':ms<0?'Negatif':ms.toFixed(5)}</p><div class="chartwrap"><svg id="vchart" viewBox="0 0 1060 350" role="img" aria-label="Grafik bobot Momentum selama 100 tahun"></svg></div><label for="vyear">Pilih usia</label><input type="range" min="0" max="99" value="0" id="vyear"><div class="vdetail" id="vdetail"></div><p class="note">Tahun dengan nilai 13/16/19 (klasifikasi simbolik, bukan prediksi kejadian): ${negative.length?negative.join(', '):'Tidak ada'}</p><button id="vcsv">Unduh CSV</button></div>`;
  $('vyear').oninput=e=>choose(+e.target.value);
  $('vcsv').onclick=()=>{const data='usia,tahun,vitranta,effect,synergy_positive,productive_window,momentum_window\n'+vals.map((v,i)=>[i,birth+i,v,effect(v),+positive(v),+(i>=21&&i<=80),+(i>=18&&i<=57)].join(',')).join('\n');const u=URL.createObjectURL(new Blob([data],{type:'text/csv'})),a=document.createElement('a');a.href=u;a.download='avetra_vitranta.csv';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)};
  choose(0);
 }
 function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
 $('vcalc').onclick=()=>{if($('vvalues').dataset.source!=='automatic')$('vvalues').dataset.source='manual';calc()};$('vclear').onclick=()=>{$('vvalues').value='';$('vvalues').dataset.source='manual';$('lout').innerHTML=''};
})();
