import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createAppState } from './ajui/core/AppState.js';
import { ModeManager, EDITOR_MODES } from './ajui/modes/ModeManager.js';
import { SculptSettings } from './ajui/sculpt/SculptSettings.js';
import { SculptMesh } from './ajui/sculpt/SculptMesh.js';
import { SculptController } from './ajui/sculpt/SculptController.js';
import { createModeBar } from './ajui/ui/ModeBar.js';

const app=createAppState(), modes=new ModeManager(), sculptSettings=new SculptSettings();
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x101114); app.document.setScene(scene);
const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.01,500); camera.position.set(4,3,5);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(innerWidth,innerHeight); document.body.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x30343b,2));
const key=new THREE.DirectionalLight(0xffffff,2.2); key.position.set(4,7,5); scene.add(key);
scene.add(new THREE.GridHelper(20,40,0x555b66,0x282c33)); scene.add(new THREE.AxesHelper(1.5));
const cube=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshStandardMaterial({color:0x7c8cff,roughness:.62,metalness:.05}));
cube.name='Cube'; scene.add(cube); app.selection.select(cube);
const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true; controls.screenSpacePanning=true; controls.enablePan=true; controls.minDistance=.05; controls.maxDistance=100; controls.touches={ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_PAN};
const sculptMesh=new SculptMesh(cube);
const sculpt=new SculptController({camera,renderer,mesh:sculptMesh,settings:sculptSettings,onStroke:s=>{if(s.size>0)app.document.markDirty();}});
createModeBar(modes,sculptSettings);

const gizmoCanvas=document.createElement('canvas'); gizmoCanvas.width=gizmoCanvas.height=180;
gizmoCanvas.style.cssText='position:fixed;right:8px;top:8px;width:90px;height:90px;z-index:30;touch-action:none';
document.body.appendChild(gizmoCanvas);
const gx=gizmoCanvas.getContext('2d');
function drawGizmo(){
 gx.clearRect(0,0,180,180); gx.save(); gx.translate(90,90);
 const axes=[{v:new THREE.Vector3(1,0,0),c:'#e45b5b',l:'X'},{v:new THREE.Vector3(0,1,0),c:'#62cf78',l:'Y'},{v:new THREE.Vector3(0,0,1),c:'#5b8ee4',l:'Z'}];
 axes.map(a=>{const q=a.v.clone().applyQuaternion(camera.quaternion); return {...a,x:q.x,y:-q.y,z:q.z};}).sort((a,b)=>a.z-b.z).forEach(a=>{const len=48; gx.strokeStyle=a.c;gx.lineWidth=7;gx.lineCap='round';gx.beginPath();gx.moveTo(0,0);gx.lineTo(a.x*len,a.y*len);gx.stroke();gx.fillStyle=a.c;gx.beginPath();gx.arc(a.x*len,a.y*len,11,0,Math.PI*2);gx.fill();gx.fillStyle='#fff';gx.font='bold 18px system-ui';gx.textAlign='center';gx.textBaseline='middle';gx.fillText(a.l,a.x*len,a.y*len);});
 gx.restore();
}
gizmoCanvas.addEventListener('pointerdown',e=>{
 const r=gizmoCanvas.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*180-90,y=(e.clientY-r.top)/r.height*180-90;
 let best=null,bd=999; [{v:new THREE.Vector3(1,0,0),l:'X'},{v:new THREE.Vector3(0,1,0),l:'Y'},{v:new THREE.Vector3(0,0,1),l:'Z'}].forEach(a=>{const q=a.v.clone().applyQuaternion(camera.quaternion);const dx=q.x*48-x,dy=-q.y*48-y,d=dx*dx+dy*dy;if(d<bd){bd=d;best=a;}}); if(best&&bd<900){const target=new THREE.Vector3();camera.position.copy(best.v.clone().multiplyScalar(6));camera.lookAt(target);}
});

const boot=document.getElementById('boot'); if(boot)boot.remove();
modes.onChange(mode=>{const s=mode===EDITOR_MODES.SCULPT;if(s){sculpt.enable();controls.enabled=false;}else{sculpt.disable();controls.enabled=true;}});
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
let last=performance.now();
function loop(now=performance.now()){requestAnimationFrame(loop);const d=now-last;last=now;app.performance.update(d);if(!modes.isSculpt())controls.update();renderer.setPixelRatio(app.performance.getViewportPolicy().pixelRatio);renderer.render(scene,camera);drawGizmo();}
loop();
