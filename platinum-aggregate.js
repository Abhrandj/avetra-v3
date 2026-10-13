/* AVETRA v2.5: aggregates from the reconstructed 100-year Vitranta array. */
(function(){
'use strict';
const weights={1:.75,2:.75,3:2,4:1,5:1,6:1,7:1,8:2,9:.5,11:.5,13:-1,14:1,16:-1,19:-1,22:3};
const positive=v=>![11,13,19].includes(v);
function fromValues(vals){
 if(!Array.isArray(vals)||vals.length!==100||vals.some(v=>!Object.prototype.hasOwnProperty.call(weights,v)))throw Error('Dibutuhkan tepat 100 nilai Vitranta yang valid');
 const synergy=vals.filter(positive).length;
 const productive=Math.floor(vals.slice(21,81).filter(positive).length/60*100);
 const raw=vals.slice(18,58).reduce((s,v)=>s+weights[v],0)/40;
 const momentum=raw>1?'+1':raw<0?'Negatif':Number(raw.toFixed(5)).toString();
 return {synergy,productive,momentum,momentumRaw:raw,values:vals.slice()};
}
function calculate(name){if(!window.AVETRA_VITRANTA)throw Error('Mesin Vitranta belum tersedia');return fromValues(window.AVETRA_VITRANTA.vitranta(name))}
window.AVETRA_PLATINUM_AGGREGATE={fromValues,calculate};
})();
