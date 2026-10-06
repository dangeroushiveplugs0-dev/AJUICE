import * as THREE from 'three';
import { SculptStroke } from './SculptStroke.js';

export class SculptController {
  constructor({camera,renderer,mesh,settings,onStroke}){ this.camera=camera; this.renderer=renderer; this.mesh=mesh; this.settings=settings; this.onStroke=onStroke; this.raycaster=new THREE.Raycaster(); this.pointer=new THREE.Vector2(); this.active=false; this.stroke=null; this.lastHit=null; this.handlePointer=this.handlePointer.bind(this); }
  enable(){ if(this.active)return; this.active=true; this.renderer.domElement.addEventListener('pointerdown',this.handlePointer); }
  disable(){ if(!this.active)return; this.active=false; this.renderer.domElement.removeEventListener('pointerdown',this.handlePointer); }
  handlePointer(event){
    if(event.pointerType==='mouse' && event.button!==0)return;
    const rect=this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-((event.clientY-rect.top)/rect.height)*2+1);
    this.raycaster.setFromCamera(this.pointer,this.camera);
    const hit=this.raycaster.intersectObject(this.mesh.mesh,false)[0];
    if(!hit)return;
    this.stroke=new SculptStroke();
    const localPoint=this.mesh.mesh.worldToLocal(hit.point.clone());
    const localNormal=this.mesh.mesh.worldToLocal(hit.point.clone().add(hit.face.normal)).sub(localPoint).normalize();
    this.mesh.applyLayer(localPoint,localNormal,this.settings,this.stroke);
    this.onStroke?.(this.stroke);
  }
}
