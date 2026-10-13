const fs=require('fs'),vm=require('vm'),assert=require('assert');
const el={pcalc:{onclick:null},pname:{value:''},pdob:{value:''},psex:{value:'1'},pout:{innerHTML:'',insertAdjacentHTML(){}}};
const ctx={window:{},document:{getElementById:id=>el[id]||{append(){},addEventListener(){}},createElement:()=>({}),querySelectorAll:()=>[]},console};vm.createContext(ctx);
for(const f of ['brand-engine.js','vitranta-engine.js','platinum-aggregate.js','app.js','interpretation.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
let checked=0;const names=['Kobe Bryant','Kobe Bean Bryant','Abhrand Prazeskana Johanda','AVETRA','Joko Santoso','A','AAI','A B','Satu Dua Tiga Empat','  Joko   Santoso  '];const dates=['1977-01-04','1999-06-08','2000-12-31'];
for(const n of names)for(const d of dates)for(const sex of [1,2,3]){
 const p=vm.runInContext(`personalMetrics(${JSON.stringify(n)},${JSON.stringify(d)},${sex})`,ctx);
 const q=vm.runInContext(`(function(){const n=${JSON.stringify(n)}.trim().replace(/\\s+/g,' '),d=${JSON.stringify(d)},sex=${sex};const a=acousticRoot(n),t=time(d),c=caturPersonal(n),h=harani(n),om=a===22?4:a,kecil=red(Math.abs(om-t)),besar=red(a+t,[11,13,14,16]);return {a,t,c,h,sv:synchronicity(besar,kecil,c,sex===3?1:sex),cv:cohPersonal(c,sex===3?1:sex)}})()`,ctx);
 for(const k of ['a','t','h','sv'])assert.strictEqual(p[k],q[k],n+' '+k);assert.strictEqual(p.co,q.cv);assert.strictEqual(JSON.stringify(p.c),JSON.stringify(q.c));
 assert.strictEqual(p.platinumError,null,n+' platinum');assert.strictEqual(p.platinum.values.length,100);checked++;
}
console.log('PASS cross-module samples:',checked);
for(const [n,f] of [['A',.8],['A B',.9],['A B C',1],['A B C D',.7],['A B C D E',.3],['A B C D E F',.2]])assert.strictEqual(vm.runInContext(`personalMetrics(${JSON.stringify(n)},'2000-01-01',1).f`,ctx),f);
console.log('PASS word factor 1..6');
console.log('NOTE: Vitranta letter mapping is distinct from BrandName LETTER_VALUE, requires historical evidence before treating as defect.');
