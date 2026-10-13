/* AVETRA v2.7.1 - sourced, non-predictive combined interpretation */
(function(){
'use strict';
const d=window.AVETRA_SCS_DICTIONARY;
if(!d)return;
const safe=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[c]));
const numeric=x=>{const n=Number.parseFloat(String(x).replace(/!/g,''));return Number.isFinite(n)?n:null;};
const line=(title,text)=>'<li><b>'+safe(title)+':</b> '+safe(text)+'</li>';
function build(r){
 const h=d.harani[String(r.h)],a=d.acoustic_root[String(r.a)],t=d.time[String(r.t)];
 const sv=numeric(r.sv),cv=numeric(r.cv),o=r.kecil===3;
 const signals=[];
 if(sv!==null && sv<d.thresholds.synchronicity.positive_min)signals.push('Synchronicity '+sv.toFixed(2)+' di bawah ambang '+d.thresholds.synchronicity.positive_min.toFixed(1));
 if(cv!==null && cv<d.thresholds.coherence.positive_min)signals.push('Coherence '+cv.toFixed(2)+' di bawah ambang '+d.thresholds.coherence.positive_min.toFixed(1));
 if(o)signals.push('Obstacle 3 (O:3) terdeteksi dari selisih A.R. dan Time');
 if(h && h.status_dasar !== 'positif')signals.push('Harani '+r.h+' tidak berada dalam klasifikasi dasar positif');
 const strengths=[];
 if(sv!==null && sv>=.8)strengths.push('Synchronicity memenuhi ambang');
 if(cv!==null && cv>=.7)strengths.push('Coherence memenuhi ambang');
 if(h && h.status_dasar==='positif')strengths.push('Harani '+r.h+' memiliki klasifikasi dasar positif');
 // v2.6: interpretation is descriptive, not a predictive or moral scoring model.
 const combinedStatus=signals.length?'Struktur campuran: '+signals.length+' indikator perhatian':'Tidak ditemukan indikator perhatian pada pemeriksaan yang tersedia';
 const quality=(v,min)=>v===null?'Belum tersedia':v<min?'Di bawah ambang rekonstruksi':'Memenuhi ambang rekonstruksi';
 const obstacles=o?'O:3 terdeteksi, perlu dibaca tersendiri.':'O:3 tidak terdeteksi.';
 const supporting=signals.length?'Indikator pendukung tidak menghapus indikator perhatian yang ditemukan.':'Tidak ada indikator perhatian dalam cakupan aturan yang sudah tersedia; ini bukan jaminan hasil kehidupan.';
 const plat=r.platinum;
 const pct=v=>typeof v==='number'&&Number.isFinite(v)?v:null;
 const sy=plat?pct(plat.synergy):null,pr=plat?pct(plat.productive):null;
 const raw=plat?pct(plat.momentumRaw):null;
 const vitranta=plat&&Array.isArray(plat.values)?plat.values:null;
 const counts=vitranta?{
  synergy:vitranta.filter(v=>![11,13,19].includes(v)).length,
  productive:vitranta.slice(21,81).filter(v=>![11,13,19].includes(v)).length
 }:null;
 const fmt=v=>v===null?'Tidak tersedia':Number(v.toFixed(5)).toString();
 const html=`<div class="card combined-reading clean-analysis" id="combinedReading">
 <h2>Ringkasan Platinum · ${safe(r.n)}</h2>
 <p class="note">Pembacaan simbolik metode SCS, bukan prediksi ilmiah.</p>
 <div class="reading-status platinum-metrics">
 <span><small>Harani</small><b>${safe(r.h)}</b><small>${h?safe(h.status_dasar):'Belum diklasifikasi'}</small></span>
 <span><small>A.R.</small><b>${safe(r.a)}</b></span>
 <span><small>Time</small><b>${safe(r.t)}</b></span>
 <span><small>F / M / E / I</small><b>${safe(r.catur.join(' / '))}</b></span>
 <span><small>Catur reduced</small><b>${safe(r.cReduced.join(' / '))}</b></span>
 <span><small>f · ${safe(r.wordCount)} kata</small><b>${safe(r.f.toFixed(1))}</b></span>
 <span><small>c.i</small><b>${safe(r.ci)}</b></span>
 <span><small>Synchronicity (SV)</small><b>${safe(r.sv)}</b></span>
 <span><small>Coherence (CV)</small><b>${safe(r.cv)}</b></span>
 <span><small>Besar</small><b>${safe(r.besar)}</b></span>
 <span><small>Kecil</small><b>${safe(r.kecil)}</b></span>
 <span><small>Obstacle 3</small><b>${o?'O:3':'Tidak terdeteksi'}</b></span>
 <span><small>Synergy</small><b>${r.platinum?safe(r.platinum.synergy)+"%":"Tidak tersedia"}</b></span>
 <span><small>Productive</small><b>${r.platinum?safe(r.platinum.productive)+"%":"Tidak tersedia"}</b></span>
 <span><small>Momentum Stream</small><b>${r.platinum?safe(r.platinum.momentum):"Tidak tersedia"}</b></span>
 <span><small>Vitranta</small><b>${r.platinum?"100 nilai dihitung":"Tidak tersedia"}</b></span>
 </div>
 ${r.platinumError?'<div class="card warning" role="status"><b>Hasil Platinum belum lengkap.</b><p>Synergy, Productive, Momentum, dan Vitranta tidak tersedia: '+safe(r.platinumError)+'.</p><p class="note">Harani, A.R., Time, SV, dan CV tetap merupakan hasil parsial. Nilai yang tidak tersedia bukan 0%.</p></div>':''}
 <section class="clean-section" aria-label="Pembacaan gabungan">
 <h3>Pembacaan Gabungan</h3>
 <p><b>${safe(combinedStatus)}.</b> ${signals.length?'Indikator yang perlu diperiksa: '+safe(signals.join('; '))+'.':'Harani, SV, CV, dan O:3 telah diperiksa dengan aturan yang tersedia.'}</p>
 <p class="note">Harani positif tidak menghapus indikator merah. Ambang SV/CV mengikuti kamus rekonstruksi dan belum seluruhnya diverifikasi terhadap sumber historis. Obstacle adalah kategori simbolik, bukan prediksi kejadian.</p>
 </section>
 <section class="clean-section avetra-reading-engine" aria-label="SCS Reading Engine">
 <h3>SCS Reading Engine · Tahap 1</h3>
 <p><b>Struktur dasar:</b> Harani ${safe(r.h)} (${h?safe(h.status_dasar):'belum diklasifikasi'}), Acoustic Root ${safe(r.a)}, Time ${safe(r.t)}. Klasifikasi Harani tidak berdiri sendiri sebagai kesimpulan akhir.</p>
 <p><b>Kesempatan / Synchronicity:</b> ${sv===null?'Belum tersedia':safe(r.sv)+' · '+safe(quality(sv,d.thresholds.synchronicity.positive_min))}. <b>Penguasaan / Coherence:</b> ${cv===null?'Belum tersedia':safe(r.cv)+' · '+safe(quality(cv,d.thresholds.coherence.positive_min))}.</p>
 <p><b>Hambatan khusus:</b> ${safe(obstacles)} ${signals.length?'Catatan perhatian: '+safe(signals.join('; '))+'.':'Tidak ada sinyal perhatian dari pemeriksaan yang tersedia.'}</p>
 <p><b>Perjalanan Vitranta:</b> Synergy ${sy===null?'belum tersedia':safe(sy)+'%'}, Productive ${pr===null?'belum tersedia':safe(pr)+'%'}, Momentum ${raw===null?'belum tersedia':safe(r.platinum.momentum)}. Ketiganya adalah ukuran terpisah; belum ada bukti bahwa Synergy dan Productive dijumlahkan menjadi Momentum.</p>
 <p><b>Sintesis:</b> ${safe(supporting)}</p>
 <p class="note">FMEI dibaca sebagai komposisi simbolik nama. Hubungan matematis langsung FMEI terhadap SV/CV dan Time belum terverifikasi. Ambang serta makna indikator mengikuti rekonstruksi, bukan prediksi keberhasilan, kesehatan, atau keselamatan.</p>
 </section>
 <section class="clean-section" aria-label="Audit Vitranta">
 <h3>Audit Perhitungan Vitranta</h3>
 <p class="note">Bagian ini menjelaskan implementasi AVETRA yang berjalan saat ini, bukan konfirmasi rumus historis Arkand.</p>
 <details class="clean-subdetail"><summary>Lihat asal angka Synergy, Productive, Momentum</summary>
 <div class="avetra-audit-detail">
 <p><b>Synergy:</b> ${counts?counts.synergy+' dari 100 posisi memenuhi klasifikasi implementasi = '+safe(sy)+'%':'Belum tersedia'}. Posisi dengan nilai 11, 13, atau 19 diklasifikasikan sebagai pengecualian pada mesin saat ini.</p>
 <p><b>Productive:</b> ${counts?counts.productive+' dari 60 posisi (indeks 21–80) = floor('+counts.productive+'/60 × 100) = '+safe(pr)+'%':'Belum tersedia'}. Indeks array tidak boleh otomatis disamakan dengan usia sebelum ada verifikasi pemetaan.</p>
 <p><b>Momentum:</b> ${raw===null?'Belum tersedia':'Nilai mentah '+safe(fmt(raw))+'; tampilan '+safe(plat.momentum)+'.'} Perhitungan sekarang menggunakan rata-rata bobot 40 posisi (indeks 18–57). Jika nilai mentah melebihi 1, tampilan menjadi +1; nilai mentah tetap disimpan.</p>
 <p><b>Catatan verifikasi:</b> Bobot setiap nilai Vitranta, rentang posisi, dan aturan klasifikasi positif masih berstatus rekonstruksi. Bandingkan dengan keluaran SCS historis sebelum mengubahnya.</p>
 </div></details>
 </section>
 <section class="clean-section" aria-label="Interpretasi nama">
 <h3>Interpretasi Nama</h3>
 <p><b>Harani ${safe(r.h)}</b>: ${h?safe(h.fase_pendek):'Interpretasi belum tersedia'}. ${h?'Fase panjang: '+safe(h.fase_panjang)+'.':''}</p>
 <p><b>Acoustic Root ${safe(r.a)}</b>: ${a?safe(a.arti):'Belum tersedia'}.</p>
 <p><b>Time ${safe(r.t)}</b>: ${t?safe(t.kekuatan):'Belum tersedia'}.</p>
 <p><b>Hubungan indikator:</b> ${sv!==null?'SV '+safe(r.sv):'SV belum tersedia'}, ${cv!==null?'CV '+safe(r.cv):'CV belum tersedia'}; ${signals.length?safe(signals.length+' indikator perhatian dalam pemeriksaan SV, CV, dan O:3.'):'tidak ada indikator perhatian dalam pemeriksaan SV, CV, dan O:3.'}</p>
 <details class="clean-subdetail"><summary>Interpretasi FMEI (Fisik, Mental, Emosi, Intuisi)</summary><div id="avetraFmeiContent"></div></details>
 </section>
 <section class="clean-section avetra-synthesis" aria-label="Sintesis Nama">
 <h3>Sintesis Nama</h3>
 <p>${h?safe('Tema Harani '+r.h+': '+h.fase_pendek+'. '):''}${a?safe('A.R. '+r.a+' menambahkan '+a.arti.toLowerCase()+'. '):''}${t?safe('Time '+r.t+' berkaitan dengan '+t.kekuatan.toLowerCase()+'.'):''}</p>
 <p class="note">Ini merupakan gabungan tema simbolik dari indikator yang sudah dihitung, bukan skor atau prediksi baru.</p>
 </section>
 <p class="note avetra-detail-links"><button type="button" class="avetra-go-vitranta">Lihat detail di Vitranta Life Map →</button> <button type="button" class="avetra-go-kamus">Buka Kamus SCS →</button></p>
 </div>`;
 return html;
}
function run(){
 const name=document.getElementById('pname')?.value.trim(),date=document.getElementById('pdob')?.value;
 if(avetraPersonalValidation(name,date))return;
 const sex=Number(document.getElementById('psex').value);
 const m=personalMetrics(name,date,sex);
 const {a,t,h,c,besar,kecil,cReduced,f,ci,sv,co:cv}=m;
 const output=document.getElementById('pout');
 // Legacy modules still run first. Extract only their unique content,
 // then replace the output completely to prevent duplicate metric cards.
 const oldCards=Array.from(output.children);
 const original=oldCards.find(n=>n.querySelector('.metrics'));
 const interpretation=oldCards.find(n=>n.querySelector('h2')?.textContent.startsWith('Arti Struktur Nama'));
 output.innerHTML=build({n:name,a,t,h,kecil,besar,sv,cv,catur:Object.values(c),cReduced,f,ci,wordCount:m.wordCount,platinum:m.platinum,platinumError:m.platinumError});
 const toTab=tab=>{const btn=document.querySelector('.tabs .tab[data-tab="'+tab+'"]');if(btn){btn.click();window.scrollTo({top:0,behavior:'smooth'});}};
 output.querySelector('.avetra-go-vitranta')?.addEventListener('click',()=>toTab('lifemap'));
 output.querySelector('.avetra-go-kamus')?.addEventListener('click',()=>toTab('kamus'));
 {
  if(interpretation){
   const fmei=document.getElementById('avetraFmeiContent');
   if(fmei){
    // The sourced FMEI text is retained only once, in its dedicated panel.
    const headings=Array.from(interpretation.querySelectorAll('h3,h4'));
    const fmeiHeading=headings.find(n=>/FMEI|Composition of Character/i.test(n.textContent));
    if(fmeiHeading){
     let n=fmeiHeading.nextElementSibling;
     while(n && !/Synchronicity dan Coherence/i.test(n.textContent||'')){
      const next=n.nextElementSibling;
      fmei.appendChild(n);
      n=next;
     }
    }
    if(!fmei.children.length)fmei.textContent='Rincian FMEI belum tersedia.';
   }
  }
 }

}
const btn=document.getElementById('pcalc');
if(btn)btn.addEventListener('click',run);
})();