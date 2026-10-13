/* Port of Platinum.SCSClass: virac, cekVirac, hitungVitranta; verified against original JVM. */
(function(){
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const val=c=>{const i=alphabet.indexOf(c);return i<0?0:(i%9)+1};
const allowed=new Set([11,13,14,16,19,22]);
function reduce(n){while(n>=10&&!allowed.has(n))n=String(n).split('').reduce((a,d)=>a+ +d,0);return n}
function cekVirac(word){let seq=[];for(const c of word){const v=val(c);for(let i=0;i<v;i++)seq.push(v)}if(!seq.length)throw Error('Nama harus berisi huruf A–Z');return Array.from({length:100},(_,i)=>seq[i%seq.length])}
function vitranta(name){let normalized=(typeof scsNormalizeName==='function'?scsNormalizeName(name):String(name??'').toUpperCase().replace(/[^A-Z0-9\s]/g,'').replace(/\s+/g,' ').trim());let words=normalized.split(/\s+/).filter(Boolean);if(!words.length||words.length>9)throw Error('Nama harus memiliki 1 sampai 9 komponen');if(!/^[A-Z ]+$/.test(words.join(' ')))throw Error('Gunakan huruf A–Z dan spasi saja');let streams=words.map(cekVirac);return Array.from({length:100},(_,i)=>reduce(streams.reduce((sum,a)=>sum+a[i],0)))}
window.AVETRA_VITRANTA={vitranta,cekVirac};
})();
