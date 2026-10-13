
// Synchronicity: port of SCSClass.hitunginCtr and hitunginName bytecode.
const SYNC_TABLE={"1:2:2":"0.9","1:2:1":"0.9","1:2:0":"! 0.05 !","1:1:2":"0.7","1:1:1":"0.6","1:1:0":"! 0.05 !","2:2:2":"0.8","2:2:1":"0.8","2:2:0":"! 0.05 !","2:1:2":"! 0.1 !","2:1:1":"! 0.1 !","2:1:0":"! 0.05 !","3:2:2":"! 0.2 !","3:2:1":"! 0.2 !","3:2:0":"! 0.05 !","3:1:2":"! 0.05 !","3:1:1":"! 0.05 !","3:1:0":"! 0.05 !","4:2:2":"1.0","4:2:1":"1.0","4:2:0":"! 0.5 !","4:1:2":"0.8","4:1:1":"0.7","4:1:0":"! 0.1 !","5:2:2":"0.6","5:2:1":"0.6","5:2:0":"! 0.05 !","5:1:2":"! 0.1 !","5:1:1":"! 0.1 !","5:1:0":"! 0.05 !","6:2:2":"! 0.5 !","6:2:1":"! 0.5 !","6:2:0":"! 0.05 !","6:1:2":"! 0.1 !","6:1:1":"! 0.1 !","6:1:0":"! 0.05 !","7:2:2":"! 0.4 !","7:2:1":"! 0.4 !","7:2:0":"! 0.05 !","7:1:2":"! 0.1 !","7:1:1":"! 0.1 !","7:1:0":"! 0.05 !","8:2:2":"! 0.3 !","8:2:1":"! 0.3 !","8:2:0":"! 0.05 !","8:1:2":"! 0.1 !","8:1:1":"! 0.1 !","8:1:0":"! 0.05 !","9:2:2":"! 0.2 !","9:2:1":"! 0.2 !","9:2:0":"! 0.05 !","9:1:2":"! 0.1 !","9:1:1":"! 0.1 !","9:1:0":"! 0.05 !","0:2:2":"1.0","0:2:1":"1.0","0:2:0":"! 0.5 !","0:1:2":"0.8","0:1:1":"0.7","0:1:0":"! 0.1 !"};
function syncCtr(c,sex){
 const vals=Object.values(c).map(v=>red(v)),freq=Array(30).fill(0);vals.forEach(v=>freq[v]++);
 for(let i=0;i<10;i++)if(freq[i]===2)return i===6&&sex===1?0:2;
 for(const target of [3,4]){let hits=[];for(let i=0;i<10;i++)if(freq[i]===target)hits.push(i);if(hits.length===1)return [5,6].includes(hits[0])?0:2;}
 return 1;
}
function synchronicity(besar,kecil,c,sex){let ctr=syncCtr(c,sex),bucket=[1,2,3,4,6,7,8,9].includes(besar)?2:1;return SYNC_TABLE[`${kecil}:${bucket}:${ctr}`]??'Tidak Ada';}

const $=id=>document.getElementById(id);
const groups={F:'DMVENW',M:'AJSHQZ',E:'BKTCLUFOX',I:'GPYIR'};
function red(n,p=[]){n=Math.abs(n);while(n>=10&&!p.includes(n))n=String(n).split('').reduce((a,c)=>a+Number(c),0);return n}
function caturPersonal(name){const s=name.toUpperCase();return Object.fromEntries(Object.entries(groups).map(([k,chars])=>[k,[...s].filter(c=>chars.includes(c)).length]))}
function cohPersonal(c,sex){let a=['F','M','E','I'].map(k=>red(c[k]));let cnt=Array(10).fill(0);a.forEach(x=>cnt[x]++);
if(cnt[6]>=3)return '! 0.1 !';if(cnt[5]>=3)return '! 0.2 !';
if(cnt[6]===2&&a[2]===6&&sex===1)return '! 0.3 !';
if(cnt[6]===2&&a[2]===6)return '0.8';
if(cnt[0]>=3)return '! 0.4 !';if(a[0]===5&&a[2]===3)return '! 0.5 !';if(a[2]===6&&sex===1)return '! 0.5 !';if(cnt[0]>=1)return '! 0.6 !';
let mx=Math.max(...cnt);return (mx===1?.7:mx===2?.8:mx===3?.9:1).toFixed(1)}
// UI-only validation. Historical SCS calculation formulas remain unchanged.
function avetraValidDate(d){
 if(typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d))return false;
 const [y,m,day]=d.split('-').map(Number);
 if(y<1||m<1||m>12||day<1)return false;
 const days=new Date(Date.UTC(y,m,0)).getUTCDate();
 // Date.UTC treats years 0–99 as 1900–1999; calculate leap years explicitly.
 const leap=y%4===0&&(y%100!==0||y%400===0);
 const limit=m===2?(leap?29:28):[4,6,9,11].includes(m)?30:31;
 return day<=limit;
}
function avetraPersonalValidation(name,date){
 if(!String(name||'').trim()||!date)return 'Isi nama dan tanggal lahir.';
 if(!avetraValidDate(date))return 'Tanggal lahir tidak valid. Pilih tanggal kalender yang benar.';
 return '';
}
function time(d){let [y,m,day]=d.split('-').map(Number);return red(day+m+y)}
function harani(n){let a=[...n.toUpperCase().replace(/\s/g,'')].map(c=>LETTER_VALUE[c]||0);if(!a.length)return '';const seed=a.slice();while(a.length<9)a.push(...seed.slice(0,9-a.length));a=a.slice(0,9);let h=[a[0]+8*a[1]+a[2],2*a[3]+7*a[4]+2*a[5],a[6]+8*a[7]+a[8]].map(x=>red(x));return red(h.reduce((x,y)=>x+y,0),[11,13])}
function cards(data){return `<div class="metrics">${data.map(([k,v])=>`<div class="metric"><small>${k}</small><b>${v}</b></div>`).join('')}</div>`}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
// Shared Platinum calculation: both Personal and Interpretation must use this one result.
function personalMetrics(n,d,sex){
 const name=scsNormalizeName(n);
 const a=acousticRoot(name),t=time(d),c=caturPersonal(name);
 const h=harani(name),co=cohPersonal(c,sex===3?1:sex);
 const wordCount=name.split(' ').length;
 const f=[0,.8,.9,1,.7,.3][wordCount]??.2;
 const hits=Object.values(c).filter(x=>Math.abs(a-x)===3).length;
 const ci=hits===0?1:-hits;
 const besarRaw=a+t,besar=red(besarRaw,[11,13,14,16]);
 const om=a===22?4:a,kecilRaw=Math.abs(om-t),kecil=red(kecilRaw);
 const cReduced=Object.values(c).map(v=>red(v));
 const sv=synchronicity(besar,kecil,c,sex===3?1:sex);
 let platinum=null,platinumError=null;
 try{platinum=window.AVETRA_PLATINUM_AGGREGATE.calculate(name)}catch(e){platinumError=e.message}
 return {platinum,platinumError,name,a,t,c,h,co,f,ci,besarRaw,besar,om,kecilRaw,kecil,cReduced,sv,obstacle3:kecil===3,wordCount};
}
function personal(){let n=$('pname').value.trim().replace(/\s+/g,' '),d=$('pdob').value,sex=+$('psex').value;const invalid=avetraPersonalValidation(n,d);if(invalid){$('pout').innerHTML='<div class="card warning">'+esc(invalid)+'</div>';return}
let {a,t,c,co,h,f,ci,besarRaw,besar,om,kecilRaw,kecil,obstacle3,cReduced,sv,platinum,platinumError}=personalMetrics(n,d,sex);let components=scsNormalizeName(n).split(' ').map(word=>{let total=[...word.toUpperCase()].reduce((v,ch)=>v+(LETTER_VALUE[ch]||0),0);return {word,total,reduced:[11,22].includes(total)?total:red(total)}});
$('pout').innerHTML=`<div class="card"><h2>${esc(n)}</h2><p class="note">Menyiapkan ringkasan pembacaan Platinum…</p></div>`;}


function brand(){let n=$('bname').value.trim(),i=+$('btype').value;if(!n){$('bout').innerHTML='<div class="card warning">Isi nama brand.</div>';return}let r=brandExact(n,i);
if(r.ar===11){$('bout').innerHTML=`<div class="card"><h2>${esc(r.name)}</h2><p class="note">${esc(r.type)} · BrandName SCS Classic v1.1.2</p>${cards([['A.R.',r.ar],['Coherence',r.coherence],['MATCH','Tidak tersedia'],['Sell Power','Tidak dapat dihitung'],['F / M / E / I / A',r.caturRaw.join(' / ')],['Reduced Catur',r.caturReduced.join(' / ')]])}<p class="warning">A.R. 11 menghasilkan “Fatal Error” pada fungsi MATCH versi Classic yang direkonstruksi. Ini keterbatasan perhitungan historis, bukan penilaian buruk terhadap nama. Nilai MATCH dan Sell Power tidak boleh ditafsirkan sebagai 0%.</p><p class="note">Hasil internal Classic: MATCH = ${esc(r.match)}; Sell Power = ${esc(r.sellPower)}. Algoritma asli tidak diubah.</p></div>`;return;}

$('bout').innerHTML=`<div class="card"><h2>${esc(r.name)}</h2><p class="note">${esc(r.type)}</p>${cards([['A.R.',r.ar],['Coherence',r.coherence],['Match',r.match],['Sell Power',r.sellPower],['F / M / E / I / A',r.caturRaw.join(' / ')],['Reduced Catur',r.caturReduced.join(' / ')],['First 1/4/8 position',r.first184]])}<p class="note">Menggunakan modul BrandName v1.1.2 hasil rekonstruksi bytecode. Bukan jaminan keberhasilan merek.</p></div>`}
function lifemap(){let n=$('lname').value.trim(),d=$('ldob').value;if(!n||!d){$('lout').innerHTML='<div class="card warning">Isi nama dan tanggal lahir.</div>';return}
$('lout').innerHTML=`<div class="card"><h2>${esc(n)}</h2><p>Tanggal lahir: ${esc(d)}</p><p class="warning">Grafik belum tersedia untuk input ini. Mesin Vitranta perlu dipindahkan dari class Java asli agar 100 nilai dihitung, bukan diperkirakan.</p><button id="copytolife">Gunakan di Personal</button></div>`;
$('copytolife').onclick=()=>{$('pname').value=n;$('pdob').value=d;switchTab('personal')}}
function switchTab(tab){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id===tab))}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
SCS_BRAND_CATEGORIES.forEach((name,i)=>{let o=document.createElement('option');o.value=i;o.textContent=name;$('btype').append(o)});
$('pcalc').onclick=personal;$('bcalc').onclick=brand;$('lcalc').onclick=lifemap;
