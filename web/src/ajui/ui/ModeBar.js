export function createModeBar(modeManager,settings){
  const bar=document.createElement('div'); bar.style.cssText='position:fixed;top:12px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:20;padding:6px;background:rgba(16,17,20,.92);border:1px solid #30343b;border-radius:10px;font:13px system-ui;color:#fff;align-items:center';
  const make=(label,mode)=>{ const b=document.createElement('button'); b.textContent=label; b.style.cssText='min-height:38px;padding:0 14px;border:0;border-radius:7px;background:#252a31;color:#fff;font-weight:600'; b.onclick=()=>modeManager.setMode(mode); return b; };
  const model=make('MODEL','model'), sculpt=make('SCULPT','sculpt');
  const density=document.createElement('input'); density.type='range'; density.min='0'; density.max='1'; density.step='.01'; density.value=settings.density; density.title='Sculpt geometry density'; density.style.width='110px';
  density.oninput=()=>settings.setDensity(density.value);
  bar.append(model,sculpt,density); document.body.appendChild(bar);
  const update=mode=>{ model.style.opacity=mode==='model'?'1':'.55'; sculpt.style.opacity=mode==='sculpt'?'1':'.55'; density.style.display=mode==='sculpt'?'block':'none'; };
  modeManager.onChange(update); update(modeManager.mode); return bar;
}
