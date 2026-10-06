export class SculptStroke {
  constructor(){ this.changes=new Map(); }
  capture(index,position){ if(!this.changes.has(index)) this.changes.set(index,position.clone()); }
  restore(positions){ for(const [index,position] of this.changes) positions[index].copy(position); }
  get size(){ return this.changes.size; }
}
