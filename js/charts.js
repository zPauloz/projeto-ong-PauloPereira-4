
function drawPie(id,data,labels){
  const c=document.getElementById(id); if(!c) return; const ctx=c.getContext('2d'); const total=data.reduce((a,b)=>a+b,0);
  let start= -0.5*Math.PI; const colors=['#2b7a78','#f6ae2d','#f08a5d','#b83b5e','#6a2c70'];
  data.forEach((v,i)=>{ const slice= v/total * Math.PI*2; ctx.beginPath(); ctx.moveTo(c.width/2,c.height/2); ctx.arc(c.width/2,c.height/2,Math.min(c.width,c.height)/2 -10, start, start+slice); ctx.closePath(); ctx.fillStyle=colors[i%colors.length]; ctx.fill(); start+=slice; });
}
function drawLine(id,labels,values){
  const c=document.getElementById(id); if(!c) return; const ctx=c.getContext('2d');
  const w=c.width,h=c.height; const pad=30; const max=Math.max(...values); const xStep=(w-2*pad)/(values.length-1);
  ctx.beginPath(); ctx.moveTo(pad, h-pad - (values[0]/max)*(h-2*pad)); for(let i=1;i<values.length;i++){ ctx.lineTo(pad + i*xStep, h-pad - (values[i]/max)*(h-2*pad)); }
  ctx.strokeStyle='#2b7a78'; ctx.lineWidth=2; ctx.stroke();
}
function drawBars(id,labels,values){
  const c=document.getElementById(id); if(!c) return; const ctx=c.getContext('2d'); const w=c.width,h=c.height; const pad=30; const barW=(w-2*pad)/values.length -10; const max=Math.max(...values);
  values.forEach((v,i)=>{ const x=pad + i*(barW+10); const barH=(v/max)*(h-2*pad); ctx.fillStyle='#f6ae2d'; ctx.fillRect(x, h-pad-barH, barW, barH); });
}
function resizeCanvases(){ document.querySelectorAll('canvas[data-chart]').forEach(c=>{ const ratio=window.devicePixelRatio||1; const rect=c.getBoundingClientRect(); c.width=Math.round(rect.width*ratio); c.height=Math.round(rect.height*ratio); }); }
window.addEventListener('load',()=>{ resizeCanvases(); drawPie('pieRecursos',[45,25,15,10,5],['Educação','Saúde','Higiene','Alimentação','Admin']); drawLine('lineVol',[2018,2019,2020,2021,2022],[120,180,240,300,360]); drawBars('barImpact',['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'],[50,120,80,200,140]); });
window.addEventListener('resize',()=>{ resizeCanvases(); drawPie('pieRecursos',[45,25,15,10,5]); drawLine('lineVol',[2018,2019,2020,2021,2022],[120,180,240,300,360]); drawBars('barImpact',['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'],[50,120,80,200,140]); });
