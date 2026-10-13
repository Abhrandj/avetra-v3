(function(){
const d=window.AVETRA_SCS_DICTIONARY;
const type=document.getElementById('dictType'),val=document.getElementById('dictValue'),out=document.getElementById('dictOutput');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[c]));
function updateValues(){
const key=type.value;
const keys=d[key]?Object.keys(d[key]):[];
val.innerHTML=keys.map(k=>'<option value="'+esc(k)+'">'+esc(k)+'</option>').join('');
val.disabled=!keys.length;
render();
}
function render(){
const key=type.value, k=val.value;
if(key==='synchronicity'||key==='coherence'){
const x=d.thresholds[key];
out.innerHTML='<h3>'+ (key==='synchronicity'?'Synchronicity':'Coherence') +'</h3><p>Ambang kategori positif menurut sumber: <b>'+x.positive_min.toFixed(1)+'</b>.</p><p class="note">Definisi dan ambang telah dicatat. Deskripsi setiap nilai belum diverifikasi dalam kamus tahap 1.</p>';
return;
}
if(key==='obstacle3'){
out.innerHTML='<h3>Obstacle 3 · O:3</h3><p>'+esc(d.obstacle3.historical_claim)+'</p><p class="note">Aturan: reduksi selisih mutlak A.R. terkoreksi dan Time = 3. Interpretasi numerologi, bukan informasi medis.</p>';return;
}
const entry=d[key]&&d[key][k];
if(!entry){out.textContent='Data belum tersedia.';return;}
if(key==='harani')out.innerHTML='<h3>Harani '+esc(k)+' · klasifikasi dasar '+esc(entry.status_dasar)+'</h3><p><b>Fase pendek:</b> '+esc(entry.fase_pendek)+'</p><p><b>Fase panjang:</b> '+esc(entry.fase_panjang)+'</p><p class="note">Pembacaan gabungan dengan indikator lain belum otomatis pada tahap ini.</p>';
else if(key==='time')out.innerHTML='<h3>Time '+esc(k)+'</h3><p><b>Kekuatan:</b> '+esc(entry.kekuatan)+'</p><p><b>Tantangan:</b> '+esc(entry.tantangan)+'</p>';
else out.innerHTML='<h3>A.R. '+esc(k)+'</h3><p>'+esc(entry.arti)+'</p>';
}
type.addEventListener('change',updateValues);val.addEventListener('change',render);updateValues();
})();