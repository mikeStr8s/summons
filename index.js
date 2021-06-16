import './style.css';
import * as THREE from 'three';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'meshline';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { createOriginHelper, initWorld, load3dModel } from './functions';
import { TREE_COORDS } from './constants';

const { scene, camera, renderer, controls } = initWorld();

scene.add(...createOriginHelper());

scene.fog = new THREE.Fog(0x000000, 1, 35);
camera.position.set(0, 3, 10);

/* ========================================================================
 * ================================TREES===================================
 * ======================================================================== */
for (let idx = 0; idx < TREE_COORDS.length; idx++) {
    const randTree = Math.floor(Math.random() * 5) + 1;
    const randRot = Math.floor(Math.random() * 360) + 1;
    const coords = { x: TREE_COORDS[idx].x, y: 0, z: TREE_COORDS[idx].z + 10 };
    const rot = { x: 0, y: randRot, z: 0 };
    const obj_name = `models/OBJ/CommonTree_Dead_${randTree}.obj`;
    const mtl_name = `models/OBJ/CommonTree_Dead_${randTree}.mtl`;

    load3dModel(obj_name, mtl_name, scene, coords, rot, 4, 0);
}

const groundGeo = new THREE.BoxGeometry(500, 5, 500);
const groundMat = new THREE.MeshPhongMaterial({ color: 0x587d47, shininess: 0 });
const groundMsh = new THREE.Mesh(groundGeo, groundMat);
groundMsh.position.set(0,-2.5,0);
scene.add(groundMsh);

function animate() {
    requestAnimationFrame(animate);
  
    controls.update();
  
    renderer.render(scene, camera);
  }
  
  animate();