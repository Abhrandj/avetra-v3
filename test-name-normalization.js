const fs=require('fs'),vm=require('vm'),assert=require('assert');
const c={window:{}};vm.createContext(c);
for(const f of ['brand-engine.js','vitranta-engine.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),c);
const cases=[['Mr. Bean','MR BEAN'],["O'Connor",'OCONNOR'],['Anne-Marie','ANNEMARIE'],['John D. Rockefeller','JOHN D ROCKEFELLER'],['  Mr.   Bean! ','MR BEAN']];
for(const [input,normal] of cases){
 assert.strictEqual(c.scsNormalizeName(input),normal);
 const b=c.window.brandExact(input,28),expected=c.window.brandExact(normal,28);
 for(const k of ['ar','coherence','match','sellPower','first184'])assert.strictEqual(b[k],expected[k],input+':'+k);
 assert.deepStrictEqual(Array.from(c.window.AVETRA_VITRANTA.vitranta(input)),Array.from(c.window.AVETRA_VITRANTA.vitranta(normal)),input+' Vitranta');
}
assert.strictEqual(c.window.brandExact('Mr. Bean',28).match,'80%');
assert.strictEqual(c.window.brandExact('Mr. Bean',28).ar,8);
console.log('PASS: '+cases.length+' punctuation/name normalization cases, BrandName + Vitranta; historical MATCH discrepancy remains 80% vs 100%.');
