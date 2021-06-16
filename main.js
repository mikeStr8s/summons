import './style.css';
import * as THREE from 'three';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'meshline';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { load3dModel } from './functions';

// Setup environment
const scene = new THREE.Scene;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(30);
camera.position.setY(30);
camera.position.setZ(30);
// camera.position.setX(9);
// camera.position.setY(3);
// camera.position.setZ(9);

const color = 0x0F0F0F;  // white
const near = 1;
const far = 35;
// scene.fog = new THREE.Fog(color, near, far);

// Add objects to scene
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFF0000, 1, 0, 1);
pointLight.position.set(0, -5, 0);
scene.add(pointLight);

function addSlivers() {
  const slivers = [];
  for (let idx = 0; idx < 3; idx++) {
    const slvr_geo = new THREE.OctahedronGeometry();
    const slvr_mat = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.2 });
    const slvr_msh = new THREE.Mesh(slvr_geo, slvr_mat);
    scene.add(slvr_msh);
    slivers.push(slvr_msh);
  }
  
  slivers[0].position.set(8 * Math.cos((Math.PI / 4) * 2), 2, 8 * Math.sin((Math.PI / 4) * 2));
  slivers[1].position.set(8 * Math.cos((Math.PI / 4) * 5), 2, 8 * Math.sin((Math.PI / 4) * 5));
  slivers[2].position.set(8 * Math.cos((Math.PI / 4) * 0), 2, 8 * Math.sin((Math.PI / 4) * 0));

  return slivers;
}

function createRitualCircle() {
  const opts = { color: 0xFF0000, side: THREE.DoubleSide }

  const o1_geo = new THREE.RingGeometry(9.9, 10, 128);
  const o1_mat = new THREE.MeshBasicMaterial(opts);
  const o1_msh = new THREE.Mesh(o1_geo, o1_mat);

  const o2_geo = new THREE.RingGeometry(8.9, 9, 128);
  const o2_mat = new THREE.MeshBasicMaterial(opts);
  const o2_msh = new THREE.Mesh(o2_geo, o2_mat);

  const o3_geo = new THREE.RingGeometry(6.9, 7, 128);
  const o3_mat = new THREE.MeshBasicMaterial(opts);
  const o3_msh = new THREE.Mesh(o3_geo, o3_mat);

  const o4_geo = new THREE.RingGeometry(5.9, 6, 128);
  const o4_mat = new THREE.MeshBasicMaterial(opts);
  const o4_msh = new THREE.Mesh(o4_geo, o4_mat);

  scene.add(o1_msh, o2_msh, o3_msh, o4_msh);

  o1_msh.rotation.x = Math.PI / 2;
  o2_msh.rotation.x = Math.PI / 2;
  o3_msh.rotation.x = Math.PI / 2;
  o4_msh.rotation.x = Math.PI / 2;

  const lights = [];
  for (let idx = 0; idx < 9; idx++) {
    // Create smaller circles
    const x_rot = 8 * Math.cos((Math.PI / 4) * idx);
    const y_rot = 8 * Math.sin((Math.PI / 4) * idx);

    const rot_geo = new THREE.RingGeometry(1.4, 1.5, 128);
    const rot_mat = new THREE.MeshBasicMaterial(opts);
    const rot_msh = new THREE.Mesh(rot_geo, rot_mat);
    scene.add(rot_msh);

    rot_msh.position.set(x_rot, 0, y_rot);
    rot_msh.rotation.x = Math.PI / 2;

    const pl = new THREE.PointLight(0xFF0000, 1, 0, 1);
    pl.position.set(x_rot, -5, y_rot);
    scene.add(pl);
    lights.push(pl);

    // Create Star
    const x_line1 = 6 * Math.cos((Math.PI / 4) * idx);
    const y_line1 = 6 * Math.sin((Math.PI / 4) * idx);
    const x_line2 = 6 * Math.cos((Math.PI / 4) * (idx + 3));
    const y_line2 = 6 * Math.sin((Math.PI / 4) * (idx + 3));

    const points = [];
    points.push( new THREE.Vector3(x_line1, 0 , y_line1));
    points.push( new THREE.Vector3(x_line2, 0, y_line2));

    const line_geo = new MeshLine();
    line_geo.setPoints(points);

    const line_mat = new MeshLineMaterial({ color: 0xFF0000, lineWidth: 0.1, fog: true });
    const line_msh = new THREE.Mesh(line_geo, line_mat);
    scene.add(line_msh);
  }
  return lights;
}

function createOriginArrow(dir, hex) {
  const origin = new THREE.Vector3(0, 0, 0);
  const length = 1;

  dir.normalize();

  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  scene.add(arrowHelper);
}

function createOrigin() {
  const dirX = new THREE.Vector3(1, 0, 0);
  const hexX = 0xFF0000;
  createOriginArrow(dirX, hexX);

  const dirY = new THREE.Vector3(0, 1, 0);
  const hexY = 0x00FF00;
  createOriginArrow(dirY, hexY);

  const dirZ = new THREE.Vector3(0, 0, 1);
  const hexZ = 0x0000FF;
  createOriginArrow(dirZ, hexZ);
}

// createOrigin();
const LIGHTS = createRitualCircle();
const SLIVERS = addSlivers();
load3dModel("models/OBJ/BirchTree_1.obj", "models/OBJ/BirchTree_1.mtl", scene, 0, 0, 0, 4, 0);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  const r1 = Math.random() / 100;
  const r2 = Math.random() / 100;
  const r3 = Math.random() / 100;
  SLIVERS[0].rotation.y += r1;
  SLIVERS[1].rotation.y += r2;
  SLIVERS[2].rotation.y += r3;

  // for (let idx = 0; idx < 8; idx++) {
  //   LIGHTS[idx].intensity = Math.random() * (1-.5) + .5;
  // }

  renderer.render(scene, camera);
}

animate();