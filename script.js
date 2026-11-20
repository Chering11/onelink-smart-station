// ข้อมูลทั้งหมดด้านล่างเป็นข้อมูลสมมติสำหรับการสาธิตเท่านั้น
const zones=[{name:'ทางเข้า–ออก',capacity:250,normal:120,rush:225,quiet:45},{name:'จุดจำหน่ายตั๋ว',capacity:150,normal:85,rush:135,quiet:20},{name:'ชานชาลา (โซนจำลอง)',capacity:350,normal:310,rush:340,quiet:95},{name:'ทางเดินเชื่อม',capacity:300,normal:160,rush:275,quiet:35}];
const hourly=[{time:'06:00',count:80},{time:'08:00',count:260},{time:'10:00',count:170},{time:'12:00',count:210},{time:'16:00',count:290},{time:'18:00',count:340}];
function render(mode='normal'){
  const total=zones.reduce((sum,z)=>sum+z[mode],0);
  const capacity=zones.reduce((sum,z)=>sum+z.capacity,0);
  document.getElementById('total').textContent=total.toLocaleString('th-TH');
  document.getElementById('percent').textContent=Math.round(total/capacity*100)+'%';
  document.getElementById('alerts').textContent=zones.filter(z=>z[mode]/z.capacity>=.8).length;
  document.getElementById('zoneList').innerHTML=zones.map(z=>{
    const pct=Math.round(z[mode]/z.capacity*100);
    const color=pct>=80?'red':pct>=60?'yellow':'green';
    const label=pct>=80?'หนาแน่นสูง':pct>=60?'ปานกลาง':'ปกติ';
    return `<article class="zone"><div class="zone-head"><b>${z.name}</b><span>${label} · ${pct}%</span></div><div class="bar"><div class="fill ${color}" style="width:${pct}%"></div></div><small>${z[mode]} / ${z.capacity} คน (สมมติ)</small></article>`;
  }).join('');
  const factor=mode==='rush'?1.25:mode==='quiet'?.45:1;
  const max=Math.max(...hourly.map(h=>h.count*factor));
  document.getElementById('chart').innerHTML=hourly.map(h=>{
    const value=Math.round(h.count*factor);
    return `<div class="chart-col" title="${h.time}: ${value} คน"><small>${value}</small><div class="chart-bar" style="height:${Math.round(value/max*80)}%"></div><span class="chart-label">${h.time}</span></div>`;
  }).join('');
}
document.getElementById('normal').addEventListener('click',()=>render('normal'));
document.getElementById('rush').addEventListener('click',()=>render('rush'));
document.getElementById('quiet').addEventListener('click',()=>render('quiet'));
render();
