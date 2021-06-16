import * as THREE from "three";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "meshline";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export const initWorld = () => {
  const scene = new THREE.Scene;
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const ambientLight = new THREE.AmbientLight(0xFFFFFF);
  scene.add(ambientLight);

  return { scene, camera, renderer, controls };
};

export const load3dModel = (objFile, mtlFile, scene, coords, rot, scale, shine) => {
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  mtlLoader.load(mtlFile, (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load(objFile, (obj) => {
      obj.translateX(coords.x);
      obj.translateY(coords.y);
      obj.translateZ(coords.z);
      obj.rotateX(rot.x);
      obj.rotateY(rot.y);
      obj.rotateZ(rot.z);
      obj.scale.set(scale, scale, scale);
      for (let child = 0; child < obj.children.length; child++) {
        for (let material = 0; material < obj.children[child].material.length; material++) {
          obj.children[child].material[material].shininess = shine;
        }
      }
      scene.add(obj);
    });
  });
};

const createOriginArrow = (dir, hex) => {
  dir.normalize();
  return new THREE.ArrowHelper(dir, new THREE.Vector3(0,0,0), 1, hex);
};

export const createOriginHelper = () => {
  return [
    createOriginArrow(new THREE.Vector3(1,0,0), 0xFF0000),
    createOriginArrow(new THREE.Vector3(0,1,0), 0x00FF00),
    createOriginArrow(new THREE.Vector3(0,0,1), 0x0000FF)
  ]
};
