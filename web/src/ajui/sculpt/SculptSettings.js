export class SculptSettings {
  constructor(){
    this.brush='layer';
    this.radius=.45;
    this.strength=.35;
    this.falloff=.7;
    this.density=0.35;
    this.maxVerticesPerStroke=64;
    this.symmetry=true;
  }
  setDensity(value){ this.density=Math.max(0,Math.min(1,Number(value)||0)); this.maxVerticesPerStroke=Math.round(8+this.density*248); }
}
