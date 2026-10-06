export class DocumentState {
  constructor(){ this.scene=null; this.selection=[]; this.activeObject=null; this.dirty=false; }
  setScene(scene){ this.scene=scene; }
  setSelection(objects){ this.selection=[...objects]; this.activeObject=this.selection.at(-1) ?? null; }
  clearSelection(){ this.selection=[]; this.activeObject=null; }
  markDirty(){ this.dirty=true; }
  markSaved(){ this.dirty=false; }
}
