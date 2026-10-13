const fs=require('fs'),vm=require('vm');const ctx={window:{}};vm.createContext(ctx);
for(const f of ['vitranta-engine.js','platinum-aggregate.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const cases=[['Kobe Bryant',72,73,'0.975'],['Kobe Bean Bryant',82,78,'0.26875'],['Benjamin Siegel',82,81,'0.725'],['Ben',100,100,'0.9625'],['Siegel',100,100,'0.98125'],['Bugsy',100,100,'+1']];
for(const [name,sy,prod,mom] of cases){const r=ctx.window.AVETRA_PLATINUM_AGGREGATE.calculate(name);if(r.synergy!==sy||r.productive!==prod||r.momentum!==mom)throw Error(name+': '+JSON.stringify(r));console.log('PASS',name,sy,prod,mom)}
