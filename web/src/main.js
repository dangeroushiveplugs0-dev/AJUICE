import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { createAppState } from './ajui/core/AppState.js';

const app = createAppState();
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x101114); app.document.setScene(scene);
const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.01,500); camera.position.set(4,3,5);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'}); renderer.setPixelRatio(app.performance.settings.pixelRatio); renderer.setSize(innerWidth,innerHeight); document.body.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x30343b,2)); const key=new THREE.DirectionalLight(0xffffff,2.2); key.position.set(4,7,5); scene.add(key);
const grid=new THREE.GridHelper(20,40,0x555b66,0x282c33); scene.add(grid); scene.add(new THREE.AxesHelper(1.5));
const material=new THREE.MeshStandardMaterial({color:0x7c8cff,roughness:.62,metalness:.05});
const cube=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),material); cube.name='Cube'; scene.add(cube); app.selection.select(cube);
const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true; controls.screenSpacePanning=true; controls.enablePan=true; controls.minDistance=.05; controls.maxDistance=100; controls.touches={ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_PAN};
const transform=new TransformControls(camera,renderer.domElement); transform.setMode('translate'); transform.setSpace('world'); transform.setSize(.9); transform.attach(cube); scene.add(transform.getHelper());
transform.addEventListener('dragging-changed',e=>controls.enabled=!e.value);
transform.addEventListener('objectChange',()=>{ cube.updateMatrixWorld(true); app.document.markDirty(); });
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
let last=performance.now();
function loop(now=performance.now()){ requestAnimationFrame(loop); const delta=now-last; last=now; app.performance.update(delta); controls.update(); renderer.setPixelRatio(app.performance.getViewportPolicy().pixelRatio); renderer.render(scene,camera); }
loop();
