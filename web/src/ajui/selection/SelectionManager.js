export class SelectionManager {
  constructor(documentState){ this.document=documentState; }
  select(object,additive=false){ const current=this.document.selection; if(additive){ if(current.includes(object)) this.document.setSelection(current.filter(x=>x!==object)); else this.document.setSelection([...current,object]); } else this.document.setSelection(object?[object]:[]); }
  clear(){ this.document.clearSelection(); }
}
