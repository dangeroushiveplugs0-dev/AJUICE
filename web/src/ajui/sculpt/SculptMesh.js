import * as THREE from 'three';

export class SculptMesh {
  constructor(mesh){ this.mesh=mesh; this.geometry=mesh.geometry; this.positions=this.geometry.attributes.position; this.basePositions=this.positions.array.slice(); this.tmp=new THREE.Vector3(); }
  rebuildNormals(){ this.geometry.computeVertexNormals(); this.positions.needsUpdate=true; }
  getPosition(index,out=this.tmp){ out.fromBufferAttribute(this.positions,index); return out; }
  applyLayer(hitLocal,normalLocal,settings,stroke){
    const p=new THREE.Vector3();
    const n=normalLocal.clone().normalize();
    const radius=settings.radius;
    let candidates=[];
    for(let i=0;i<this.positions.count;i++){
      this.getPosition(i,p);
      const d=p.distanceTo(hitLocal);
      if(d<=radius) candidates.push({i,d});
    }
    candidates.sort((a,b)=>a.d-b.d);
    candidates=candidates.slice(0,Math.max(1,settings.maxVerticesPerStroke));
    const maxD=Math.max(radius,0.0001);
    for(const c of candidates){
      const fall=Math.pow(1-c.d/maxD,Math.max(.1,settings.falloff*3));
      stroke.capture(c.i,this.getPosition(c.i).clone());
      p.copy(this.getPosition(c.i)).addScaledVector(n,settings.strength*fall*.12);
      this.positions.setXYZ(c.i,p.x,p.y,p.z);
    }
    this.rebuildNormals();
    return candidates.length;
  }
}
