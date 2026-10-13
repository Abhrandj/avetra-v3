// SCS BrandName v1.1.2 reconstruction from SCS_Brand.cod bytecode
const SCS_BRAND_CATEGORIES = ['Antique', 'Automotive', 'Beverage', 'Community', 'Cosmetics', 'Digital', 'Electronic', 'Fashion', 'Finance', 'Food', 'Grocery', 'Healthy', 'Hotel', 'Jewellery', 'Magazine', 'Military', 'Music', 'NewsPaper', 'Photography', 'Property', 'Restaurant', 'Salon $ Spa', 'Service', 'Sex', 'Sport', 'Stationary', 'Tour Travel', 'Transportation', 'TV & Radio'];
const MATCH_AR = [1,2,3,4,5,6,7,8,9,22];
const MATCH_TABLE = [[60, 80, 40, 50, 20, 90, 100, 70, 30, 10], [100, 50, 40, 70, 60, 90, 80, 100, 10, 100], [20, 80, 70, 90, 100, 100, 20, 60, 50, 100], [50, 70, 90, 100, 80, 70, 60, 90, 60, 100], [70, 60, 100, 90, 50, 80, 100, 100, 90, 100], [90, 70, 50, 60, 70, 100, 80, 90, 10, 100], [100, 70, 60, 80, 100, 60, 70, 90, 50, 100], [10, 90, 90, 70, 100, 60, 40, 80, 50, 100], [70, 100, 90, 90, 80, 100, 70, 90, 60, 100], [20, 80, 70, 90, 100, 100, 20, 60, 50, 100], [90, 90, 70, 100, 80, 100, 50, 100, 60, 100], [70, 90, 80, 70, 80, 90, 100, 100, 90, 100], [70, 100, 90, 80, 60, 80, 50, 90, 100, 100], [20, 100, 80, 70, 90, 60, 50, 100, 60, 100], [100, 70, 70, 100, 100, 60, 90, 80, 50, 80], [100, 70, 60, 80, 100, 60, 90, 100, 50, 90], [50, 80, 90, 60, 70, 80, 100, 60, 80, 100], [100, 70, 70, 100, 100, 50, 90, 80, 60, 80], [50, 90, 80, 90, 100, 80, 70, 70, 100, 100], [100, 80, 70, 100, 100, 90, 90, 100, 60, 100], [70, 60, 100, 40, 80, 90, 10, 40, 50, 40], [80, 90, 100, 70, 100, 90, 60, 70, 80, 70], [90, 100, 80, 90, 90, 80, 100, 100, 70, 100], [60, 50, 70, 90, 100, 80, 40, 20, 30, 90], [40, 50, 60, 90, 70, 60, 80, 100, 30, 100], [50, 100, 60, 80, 60, 70, 100, 90, 40, 100], [50, 80, 90, 70, 100, 50, 60, 90, 30, 100], [80, 70, 90, 100, 60, 100, 80, 70, 90, 100], [100, 70, 70, 100, 100, 60, 90, 80, 60, 100]];
const LETTER_VALUE = Object.fromEntries([['AJS1',1],['BKT2',2],['CLU3',3],['DMV4',4],['ENW5',5],['FOX6',6],['GPY7',7],['HQZ8',8],['IR9',9]].flatMap(([s,n])=>[...s].map(c=>[c,n])));
// AVETRA input normalization: preserve word boundaries, discard punctuation.
// Digits remain for BrandName Classic's historic A group; do not assign them letter values.
function scsNormalizeName(s) { return String(s ?? '').toUpperCase().replace(/[^A-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim(); }
function cleanName(s) { return scsNormalizeName(s).replaceAll(' ', ''); }
function sum1Digit(n, preserve=[]) { n=Math.abs(Number(n)||0); while(n>=10 && !preserve.includes(n)) n=[...String(n)].reduce((a,c)=>a+Number(c),0); return n; }
function acousticRoot(name) {
  const parts=scsNormalizeName(name).split(' '); // punctuation removed before word-level reduction
  const vals=parts.map(p=>{ const sum=[...cleanName(p)].reduce((a,c)=>a+(LETTER_VALUE[c]||0),0); return [11,22].includes(sum)?sum:sum1Digit(sum); });
  const total=vals.reduce((a,b)=>a+b,0); return [11,22].includes(total)?total:sum1Digit(total);
}
function catur(name) {
  const n=cleanName(name), groups=['DMVENW','AJSHQZ','BKTCLUFOX','GPYIR','0123456789'];
  const raw=groups.map(g=>[...n].filter(c=>g.includes(c)).length); return [...raw,...raw.map(x=>sum1Digit(x))];
}
function coherence(c) {
  const hist=Array(30).fill(0); for(let j=5;j<9;j++) hist[c[j]]++;
  let pairs=0,pairValue=0,triple=false,quad=false,zeroPair=false;
  for(let v=0;v<10;v++){ if(hist[v]===2){pairs++;pairValue=v;if(v===0)zeroPair=true;} if(hist[v]===3)triple=true;if(hist[v]===4)quad=true; }
  if(hist[6]===4 || hist[5]===4) return '! 0.1 !';
  if(c.slice(5,9).every(x=>x===0) && c[9]>0) return '! 0.2 !';
  if(c.slice(5,9).filter(x=>x===1).length===1 && c.slice(5,9).filter(x=>x===0).length===3) return '0.3';
  if(c.slice(5,9).filter(x=>x>=2).length===1 && c.slice(5,9).filter(x=>x===0).length===3) return '0.4';
  if(pairs===1 && c[8]===pairValue && pairValue!==0) return '0.5';
  if(pairs===2 && zeroPair && c[8]===pairValue) return '0.5';
  if(pairs===1 && zeroPair) return '0.6';
  if(pairs===0 && !triple && !quad) return '0.7';
  if(pairs===1 && c[8]!==pairValue) return '0.8';
  if(pairs===2 && zeroPair && c[8]!==pairValue) return '0.8';
  if((pairs===2 && !zeroPair) || triple) return '0.9';
  if(quad) return '1.0';
  return 'Ga ketemu @_@';
}
function match(ar,typeIndex) { if(ar===11) return 'Fatal Error'; const col=MATCH_AR.indexOf(ar); return (MATCH_TABLE[typeIndex]&&col>=0)?MATCH_TABLE[typeIndex][col]+'%':'Ga Match'; }
function first184Position(name) { const special='AJSHQZDMV', n=cleanName(name); for(let i=0;i<n.length;i++) if(special.includes(n[i])) return i+1; return 0; }
function sellPower(coh,matchPct,name) {
 const c=parseFloat(String(coh).replace(/!/g,'')), m=parseInt(matchPct), p=first184Position(name); const bucket=(p>=1&&p<=4)?0:(p>=5&&p<=7)?1:(p>=8&&p<=9)?2:3;
 const high={'100':[100,60,30,10],'90':[100,60,30,10],'80':[100,60,30,10],'70':[90,50,20,10],'60':[80,40,10,10],'50':[70,30,10,10],'40':[30,20,10,10],'30':[10,10,10,10],'20':[10,10,10,10],'10':[10,10,10,10]};
 const low={'100':[20,10,5,5],'90':[20,10,5,5],'80':[20,10,5,5],'70':[10,10,5,5],'60':[10,5,5,5],'50':[10,5,5,5],'40':[10,5,5,5],'30':[5,5,5,5],'20':[10,5,5,5],'10':[10,5,5,5]};
 const table=c>=0.6?high:low; return table[m]?table[m][bucket]+'%':'Ga Ada SP';
}
function calculateBrand(name,typeIndex) { const ar=acousticRoot(name), cc=catur(name), coh=coherence(cc), mt=match(ar,typeIndex), sp=sellPower(coh,mt,name); return {name,type:SCS_BRAND_CATEGORIES[typeIndex],ar,caturRaw:cc.slice(0,5),caturReduced:cc.slice(5),coherence:coh,match:mt,sellPower:sp,first184:first184Position(name)}; }

window.brandExact = (name, index) => calculateBrand(name,index);
