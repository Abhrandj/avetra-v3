/* AVETRA 2.8.0: research calendar. Transit letters follow the verified cekVirac repetition.
   Yearly essence is a transparent candidate mapping, NOT yet verified against Arkadia's Transit_1/2 or Ess rows. */
(function(){
'use strict';
const $=id=>document.getElementById(id), ABC='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const val=c=>ABC.indexOf(c)%9+1;
const special=new Set([11,13,14,16,19,22]);
function reduce(n){while(n>=10&&!special.has(n))n=String(n).split('').reduce((s,c)=>s+Number(c),0);return n;}
function digit(n){while(n>9)n=String(n).split('').reduce((s,c)=>s+Number(c),0);return n;}
function stream(word){const a=[];for(const letter of word){for(let i=0;i<val(letter);i++)a.push({letter,value:val(letter)});}return a;}
function yearDigit(year){return digit(year);}
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
 const entered=$('lname').value, name=(typeof scsNormalizeName==='function'?scsNormalizeName(entered):String(entered??'').toUpperCase().replace(/[^A-Z0-9\s]/g,'').replace(/\s+/g,' ').trim()), dob=$('ldob').value, out=$('transitOut');
 if(!/^[A-Z]+(?:\s+[A-Z]+)*$/.test(name)||name.split(/\s+/).length>9||!dob){out.innerHTML='<p class="note">Masukkan nama (1–9 kata) dan tanggal lahir yang valid. Tanda baca pada nama diabaikan.</p>';return;}
 const words=name.split(/\s+/), streams=words.map(stream), start=Number(dob.slice(0,4)), month=Number(dob.slice(5,7)), day=Number(dob.slice(8,10));
 const now=new Date(), defaultAge=Math.min(99,Math.max(0,now.getFullYear()-start-(now.getMonth()+1<month||(now.getMonth()+1===month&&now.getDate()<day)?1:0)));
 const from=Math.max(0,Math.min(90,Number($('transitStart').value)||0));$('transitStart').value=from;
 let rows='';for(let age=from;age<Math.min(100,from+15);age++){
  const year=start+age, chars=streams.map(s=>s[age%s.length]), raw=chars.reduce((s,c)=>s+c.value,0), essence=reduce(raw), pyRaw=day+month+yearDigit(year), py=digit(pyRaw);
  rows+=`<tr${age===defaultAge?' style="background:#173b4c"':''}><td>${age}</td><td>${year}</td><td>${chars.map(c=>esc(c.letter)).join(' / ')}</td><td>${raw} → ${essence}</td><td>${pyRaw} → ${py}</td><td>${yearDigit(year)}</td></tr>`;
 }
 const original=window.AVETRA_VITRANTA.vitranta(name), mismatches=[];
 for(let age=0;age<100;age++){const raw=streams.reduce((s,a)=>s+a[age%a.length].value,0);if(reduce(raw)!==original[age])mismatches.push(age);}
 out.innerHTML=`<p class="note">Tabel penelitian usia ${from}–${Math.min(99,from+14)}. Huruf transit mengikuti fungsi cekVirac AVETRA. Kolom Essence merupakan kandidat hasil jumlah nilai huruf aktif, belum divalidasi terhadap tabel Arkadia. Personal Year menggunakan rumus numerologi umum (tanggal + bulan + Universal Year), bukan rumus Arkand yang sudah dipastikan.</p><div class="tablewrap"><table><thead><tr><th>Usia</th><th>Tahun</th><th>Transit huruf</th><th>Essence kandidat</th><th>Personal Year</th><th>Universal Year</th></tr></thead><tbody>${rows}</tbody></table></div><p class="note">Pemeriksaan terhadap mesin Vitranta saat ini: ${mismatches.length===0?'100 dari 100 posisi konsisten.':'Tidak cocok pada '+mismatches.length+' posisi.'} Baris yang disorot menunjukkan usia sekarang berdasarkan tanggal lahir. Angka tahun merujuk tahun saat ulang tahun usia tersebut berlangsung.</p>`;
}
function setup(){const panel=$('lifemap');if(!panel)return;const card=document.createElement('div');card.className='card';card.innerHTML='<h3>Transit Tahunan · Laboratorium Arkadia</h3><p class="note">Eksplorasi huruf transit dan tahun. Tidak mengubah hasil Platinum, Synergy, Productive, atau Momentum.</p><label for="transitStart">Mulai dari usia</label><input type="number" id="transitStart" min="0" max="90" value="40" style="max-width:120px"><button id="transitRun" class="go">Tampilkan 15 Tahun</button><div id="transitOut" aria-live="polite"></div>';panel.appendChild(card);$('transitRun').addEventListener('click',render);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
