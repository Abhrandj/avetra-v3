// Regression harness for AVETRA BrandName Classic, no external dependencies.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/brand-engine.js','utf8'),ctx);
const calc=(n,t)=>ctx.window.brandExact(n,t);
let checks=0;
function eq(actual,expected,label){assert.strictEqual(actual,expected,label);checks++;}
const friend=calc('FRIENDSTER',3),face=calc('FACEBOOK',3);
for(const [r,expected,label] of [[friend,[1,'0.7','50%','30%'],'FRIENDSTER'],[face,[4,'0.8','100%','100%'],'FACEBOOK']]){
 for(let j=0;j<4;j++)eq([r.ar,r.coherence,r.match,r.sellPower][j],expected[j],label+' field '+j);
}
eq(vm.runInContext('SCS_BRAND_CATEGORIES.length',ctx),29,'category count');
const ar=[1,2,3,4,5,6,7,8,9,22];
const expected=JSON.parse(fs.readFileSync(__dirname+'/brand-match-reference.json','utf8'));
for(let i=0;i<29;i++)for(let j=0;j<10;j++){
 eq(vm.runInContext('SCS_BRAND_CATEGORIES['+i+']',ctx),expected.categories[i],'category '+i);
 eq(ctx.match(ar[j],i),expected.table[i][j]+'%','MATCH '+i+'/'+ar[j]);
}
eq(calc('AAI',22).ar,11,'AR 11');eq(calc('AAI',22).match,'Fatal Error','AR11 match');eq(calc('AAI',22).sellPower,'Ga Ada SP','AR11 SP');
for(const [n,ar0,mt,sp] of [['AVETRA',22,'100%','100%'],['A1',2,'100%','20%'],['123',6,'80%','5%'],['000',0,'Ga Match','Ga Ada SP'],['K',2,'100%','5%']]){
 const r=calc(n,22);eq(r.ar,ar0,n+' AR');eq(r.match,mt,n+' MATCH');eq(r.sellPower,sp,n+' SP');
}
// Check all coherence input combinations map to a documented result.
for(let f=0;f<10;f++)for(let m=0;m<10;m++)for(let e=0;e<10;e++)for(let i=0;i<10;i++){
 const c=[0,0,0,0,0,f,m,e,i,1],result=ctx.coherence(c);
 assert.notStrictEqual(result,'Ga ketemu @_@','coherence '+[f,m,e,i]);checks++;
}
// Sell Power table covers each match bucket, coherence branch and position group.
for(const coh of ['0.5','0.6'])for(const match of [10,20,30,40,50,60,70,80,90,100])for(const name of ['A','BBBB A','BBBBBBB A','BBBBBBBBB A']){
 assert.match(ctx.sellPower(coh,match+'%',name),/^\d+%$/);checks++;
}
console.log('PASS: '+checks+' regression assertions. BrandName engine unchanged.');
