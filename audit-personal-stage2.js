const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements={pcalc:{onclick:null},pname:{value:''},pdob:{value:''},psex:{value:'1'},pout:{innerHTML:'',insertAdjacentHTML(where,html){this.innerHTML+=html}}};
const ctx={window:{},document:{getElementById:id=>elements[id]||{append(){},addEventListener(){}},createElement:()=>({}),querySelectorAll:()=>[]},console};vm.createContext(ctx);
for(const f of ['brand-engine.js','vitranta-engine.js','platinum-aggregate.js','app.js','interpretation.js'])vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),ctx,{filename:f});
const run=(expr)=>vm.runInContext(expr,ctx);
let svCount=0,missing=[];for(let small=0;small<=9;small++)for(let big=0;big<=22;big++)for(let ctr=0;ctr<=2;ctr++){let bucket=[1,2,3,4,6,7,8,9].includes(big)?2:1;let key=`${small}:${bucket}:${ctr}`;let val=run(`SYNC_TABLE[${JSON.stringify(key)}]`);if(val===undefined)missing.push(key);else svCount++}
let cvCount=0,cvUnknown=0;for(let f=0;f<10;f++)for(let m=0;m<10;m++)for(let e=0;e<10;e++)for(let i=0;i<10;i++)for(let sex of [0,1,2,3]){let val=run(`cohPersonal({F:${f},M:${m},E:${e},I:${i}},${sex===3?1:sex})`);if(!/^!? ?(?:0\.\d+|1\.0) ?!?$/.test(val))cvUnknown++;cvCount++}
const cases=[['2000-02-29','leap valid'],['1900-02-29','invalid nonleap'],['2026-02-30','invalid day'],['2026-13-01','invalid month'],['2026-00-01','invalid month zero'],['not-a-date','invalid format'],['','empty'],['2026-10-13','valid']];
let dates=cases.map(([date,label])=>({date,label,time:run(`time(${JSON.stringify(date)})`)}));
let names=['A','A1','A-B','Émile','A  B','A\tB','A B C D E F G H I','A B C D E F G H I J',''];let nameResults=names.map(name=>{let p=run(`personalMetrics(${JSON.stringify(name)},'2000-01-01',1)`);return {name,ar:p.a,sv:p.sv,cv:p.co,error:p.platinumError,hasPlatinum:!!p.platinum}});
let invalidOutput;elements.pname.value='A1';elements.pdob.value='2000-01-01';try{elements.pcalc.onclick();invalidOutput=elements.pout.innerHTML}catch(e){invalidOutput='EXCEPTION: '+e.message}
console.log(JSON.stringify({svCount,missing,cvCount,cvUnknown,dates,nameResults,invalidOutput:invalidOutput.slice(0,550)},null,2));
