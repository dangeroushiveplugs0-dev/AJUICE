export class TransformCommand {
  constructor(object,before,after){ this.object=object; this.before=before.clone(); this.after=after.clone(); }
  execute(){ this.object.position.copy(this.after.position); this.object.quaternion.copy(this.after.quaternion); this.object.scale.copy(this.after.scale); this.object.updateMatrixWorld(true); }
  undo(){ this.object.position.copy(this.before.position); this.object.quaternion.copy(this.before.quaternion); this.object.scale.copy(this.before.scale); this.object.updateMatrixWorld(true); }
}
