export const EDITOR_MODES = Object.freeze({ MODEL:'model', SCULPT:'sculpt' });

export class ModeManager {
  constructor(){ this.mode=EDITOR_MODES.MODEL; this.listeners=new Set(); }
  setMode(mode){ if(!Object.values(EDITOR_MODES).includes(mode) || mode===this.mode) return false; this.mode=mode; for(const listener of this.listeners) listener(mode); return true; }
  onChange(listener){ this.listeners.add(listener); return ()=>this.listeners.delete(listener); }
  isSculpt(){ return this.mode===EDITOR_MODES.SCULPT; }
}
