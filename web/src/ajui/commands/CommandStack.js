export class CommandStack {
  constructor(){ this.undoStack=[]; this.redoStack=[]; }
  execute(command){ command.execute(); this.undoStack.push(command); this.redoStack.length=0; }
  undo(){ const c=this.undoStack.pop(); if(!c) return false; c.undo(); this.redoStack.push(c); return true; }
  redo(){ const c=this.redoStack.pop(); if(!c) return false; c.execute(); this.undoStack.push(c); return true; }
  clear(){ this.undoStack.length=0; this.redoStack.length=0; }
}
