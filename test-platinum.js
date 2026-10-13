
const fs=require('fs'),vm=require('vm');
const elements={pname:{value:'Abhrand Prazeskana Johanda'},pdob:{value:'1978-08-23'},psex:{value:'0'},pout:{innerHTML:''}};
const ctx={window:{},document:{getElementById:id=>elements[id]||{append:()=>{},addEventListener:()=>{}},createElement:()=>({}),querySelectorAll:()=>[]},console};vm.createContext(ctx);
for(const f of ['brand-engine.js','app.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const x=vm.runInContext("personalMetrics('Abhrand Prazeskana Johanda','1978-08-23',0)",ctx);
if(x.f!==1)throw Error('3 words must f=1: '+x.f);
for(const n of ['Kobe Bryant','Kobe Bean Bryant','Abhrand Prazeskana Johanda']){
 const m=vm.runInContext(`personalMetrics(${JSON.stringify(n)},'1978-08-23',0)`,ctx);
 if(m.wordCount!==n.split(' ').length)throw Error('word count '+n);
 console.log(n,'f',m.f,'ci',m.ci,'catur',Object.values(m.c).join('/'));
}
