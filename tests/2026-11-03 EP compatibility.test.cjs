const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const content = require('../learning-path.js');
const engine = require('../progress.js')(content);
const points = require('../nagold.js')(content);
const overview = require('../class-overview.js')(content, engine, points);

function historicalFile() {
 return {app:'AlgoLab',formatVersion:1,version:'1.8.0',exportedAt:'2026-10-20T10:30:00Z',state:{
  profile:{name:'tes.tst',className:'J2 INF1'},
  answers:{'L1.1':{struktur:0,stapel:1,queue:2,baum:0}},completed:['L1.1'],
  work:{'L1.1':{definition:'Eine geordnete Struktur'},'L1.2':{teamcode:'punkte = [12, 8, 15, 9]'}},
  nagoldEntries:[
   {date:'2026-10-19',time:'10:30',purpose:'L1.1 · Datenstrukturen kennenlernen',points:5,lessonId:'L1.1'},
   {date:'2026-10-19',time:'11:00',purpose:'Zusatzaufgabe',points:3},
   {date:'2026-10-20',time:'08:30',purpose:'Korrektur eines alten Eintrags',points:-2}
  ], selfcheck:{}, extras:{}, practice:{solved:{},drafts:{werkstatt:'print("Entwurf")'}},exam:{scores:{},answers:{}}
 }};
}

test('1.8.0 NAGOLD backup survives the EP label change without any conversion',()=>{
 const old=historicalFile(); const restored=engine.readPayload(old);
 assert.deepEqual(restored,old.state);
 const saved=engine.payload(restored);
 assert.equal(saved.formatVersion,1);
 assert.equal(saved.version,content.version);
 assert.deepEqual(saved.state,old.state);
 assert.equal(points.total(restored),6);
 assert.equal(engine.total(restored),100);
 assert.equal(engine.unlocked(restored,'L1.2'),true);
 assert.equal(engine.unlocked(restored,'L1.3'),false);
 assert.deepEqual(engine.readPayload(JSON.parse(JSON.stringify(saved))),restored);
});

test('EP class overview and CSV show the unchanged historical total separately from learning points',()=>{
 const result=overview.readFile(JSON.stringify(historicalFile()),'alt.json');
 assert.equal(result.ok,true);
 assert.equal(result.row.nagold,6);
 assert.equal(result.row.points,100);
 const csv=overview.toCsv([result.row]);
 assert.match(csv.split('\r\n')[0],/;Lernpunkte;EP;/);
 assert.doesNotMatch(csv,/NAGOLD/);
 assert.match(csv,/;100;6;/);
});

test('All generated EP interface text changed while technical compatibility names remain',()=>{
 const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
 const html=read('index.html'),table=read('nagold-table.js');
 assert.match(html,/EP · Erfahrungspunkte/);
 assert.match(table,/EP · Erfahrungspunkte/);
 assert.match(table,/keinen Einfluss auf Fachnoten/);
 assert.match(html,/Lernpunkte zum Freischalten/);
 for(const name of ['index.html','app.js','progress.js','class-overview.js','nagold-table.js']) {
  assert.doesNotMatch(read(name),/\bNAGOLD\b/,name);
 }
 assert.match(read('progress.js'),/nagoldEntries/);
 assert.match(read('nagold.js'),/ALGOLAB_NAGOLD/);
});
