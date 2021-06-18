import './style.css';
import * as THREE from 'three';
import { createRitualCircle, initWorld, load3dModel } from './functions';
import { TREE_COORDS } from './constants';

const { scene, camera, renderer, canvas } = initWorld();

scene.fog = new THREE.Fog(0x000000, 1, 10);
camera.position.set(0, .75, 0.5);
camera.lookAt(0, 0.25, -1);

const pointLight = new THREE.PointLight(0xFF0000, .3, 20, 2);
pointLight.position.set(0, 0.25, 0.5);
scene.add(pointLight);

/* ========================================================================
 * ================================TREES===================================
 * ======================================================================== */
for (let idx = 0; idx < TREE_COORDS.length; idx++) {
  const randTree = Math.floor(Math.random() * 5) + 1;
  const randRot = Math.floor(Math.random() * 360) + 1;
  const coords = { x: TREE_COORDS[idx].x, y: 0, z: TREE_COORDS[idx].z + 10 };
  const rot = { x: 0, y: randRot, z: 0 };
  const obj_name = `models/CommonTree_Dead_${randTree}.obj`;
  const mtl_name = `models/CommonTree_Dead_${randTree}.mtl`;

  load3dModel(obj_name, mtl_name, scene, coords, rot, 4, 0);
}

load3dModel('models/TreeStump.obj', 'models/TreeStump.mtl', scene, { x: 3, y: 0, z: -2 }, { x: 0, y: 0, z: 0 }, 1, 0);
load3dModel('models/WoodLog.obj', 'models/WoodLog.mtl', scene, { x: 1, y: 0, z: -3 }, { x: 0, y: Math.PI * 1.25, z: 0 }, 1, 0);


/* ========================================================================
 * ================================ROCKS===================================
 * ======================================================================== */
load3dModel('models/Rock_6.obj', 'models/Rock_6.mtl', scene, { x: -2, y: -2, z: -5 }, { x: 0, y: 0, z: 0 }, 4, 0);
load3dModel('models/Rock_1.obj', 'models/Rock_1.mtl', scene, { x: -1, y: -2, z: -5.5 }, { x: 0, y: 90, z: 0 }, 4, 0);
load3dModel('models/Rock_1.obj', 'models/Rock_5.mtl', scene, { x: -5, y: -2, z: -2 }, { x: 0, y: 0, z: 0 }, 4, 0);


/* ========================================================================
 * ================================GRASS===================================
 * ======================================================================== */
for (let idx = 0; idx < 2000; idx++) {
  const obj_name = `models/Grass_Short.obj`;
  const mtl_name = `models/Grass_Short.mtl`;
  const randRot = Math.floor(Math.random() * 360) + 1;
  const randX = Math.floor(Math.random() * 2) % 2 === 0 ? Math.random() * 1000 / 100 : Math.random() * 1000 / 100 * -1;
  const randY = (Math.random() * 10 + 15) / 100 * -1;
  const randZ = Math.floor(Math.random() * 2) % 2 === 0 ? Math.random() * 1000 / 100 : Math.random() * 1000 / 100 * -1;
  const coords = { x: randX, y: randY, z: randZ };
  const rot = { x: 0, y: randRot, z: 0 };
  load3dModel(obj_name, mtl_name, scene, coords, rot, 1, 0);
}

/* ========================================================================
 * ================================FLOOR===================================
 * ======================================================================== */
const groundGeo = new THREE.BoxGeometry(500, 5, 500);
const groundMat = new THREE.MeshPhongMaterial({ color: 0x2d3828, shininess: 0 });
const groundMsh = new THREE.Mesh(groundGeo, groundMat);
groundMsh.position.set(0, -2.5, 0);
scene.add(groundMsh);


/* ========================================================================
 * ================================CIRCLE==================================
 * ======================================================================== */
const ritualCircle = createRitualCircle();
scene.add(ritualCircle);
ritualCircle.position.set(0, 0.25, -1);
ritualCircle.rotateX(Math.PI / 2);


/* ========================================================================
 * ============================ANIMATION LOOP==============================
 * ======================================================================== */
const dayElem = document.querySelector('#day-num');
const hourElem = document.querySelector('#hour-num');
const minuteElem = document.querySelector('#minute-num');
const secondElem = document.querySelector('#second-num');

canvas.style.width = '100%';
canvas.style.height = '100%';

function animate() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  const now = new Date();
  const then = new Date('2021-08-01T16:00:00+04:00');
  let diff = then - now;
  dayElem.innerHTML = Math.floor(diff / 86400000);
  diff = diff % 86400000;
  hourElem.innerHTML = Math.floor(diff / 3600000);
  diff = diff % 3600000;
  minuteElem.innerHTML = Math.floor(diff / 60000);
  diff = diff % 60000;
  secondElem.innerHTML = Math.floor(diff / 1000);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();