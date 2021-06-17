import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export const initWorld = () => {
  const scene = new THREE.Scene;
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
  scene.add(ambientLight);

  return { scene, camera, renderer };
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
  return new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), 1, hex);
};

export const createOriginHelper = () => {
  return [
    createOriginArrow(new THREE.Vector3(1, 0, 0), 0xFF0000),
    createOriginArrow(new THREE.Vector3(0, 1, 0), 0x00FF00),
    createOriginArrow(new THREE.Vector3(0, 0, 1), 0x0000FF)
  ]
};

const createRing = (inner, outer, segments, options) => {
  const ring_geo = new THREE.RingGeometry(inner, outer, segments);
  const ring_mat = new THREE.MeshBasicMaterial(options);
  return new THREE.Mesh(ring_geo, ring_mat);
};

const createPlane = (width, height, options) => {
  const plane_geo = new THREE.PlaneGeometry(width, height);
  const plane_mat = new THREE.MeshBasicMaterial(options);
  return new THREE.Mesh(plane_geo, plane_mat);
};

const calculateMidpoint = (x1, x2, y1, y2) => {
  return { x: (x1+x2)/2, y: (y1+y2)/2 };
};

const calculateDistance = (x1, x2, y1, y2) => {
  return Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2));
};

const calculateRotation = (x1, x2, y1, y2) => {
  return Math.atan2((y2-y1), (x2-x1));
}

export const createRitualCircle = () => {
  const ritual_group = new THREE.Group();
  const opts = { color: 0xFF0000, side: THREE.DoubleSide };
  const gem_opts = { color: 0x080808, roughness: 0.2, reflectivity: 0.5 };

  ritual_group.add(createRing(1, 0.98, 128, opts));
  ritual_group.add(createRing(0.9, 0.88, 128, opts));
  ritual_group.add(createRing(0.5, 0.48, 128, opts));
  ritual_group.add(createRing(0.4, 0.38, 128, opts));

  for (let idx = 0; idx < 8; idx++) {
    const ring_coords = { x: .8 * Math.cos(Math.PI / 4 * idx), y: .8 * Math.sin(Math.PI / 4 * idx) };
    const star_coords = {
      x1: .7 * Math.cos(Math.PI / 4 * idx),
      x2: .7 * Math.cos((Math.PI / 4) * (idx + 3)),
      y1: .7 * Math.sin(Math.PI / 4 * idx),
      y2: .7 * Math.sin((Math.PI / 4) * (idx + 3)),
    };

    const small_ring = createRing(0.1, 0.08, 128, opts);
    small_ring.position.set(ring_coords.x, ring_coords.y, 0);
    ritual_group.add(small_ring)
    
    const line_mp = calculateMidpoint(star_coords.x1, star_coords.x2, star_coords.y1, star_coords.y2);
    const line_dist = calculateDistance(star_coords.x1, star_coords.x2, star_coords.y1, star_coords.y2);
    const line_rot = calculateRotation(star_coords.x1, star_coords.x2, star_coords.y1, star_coords.y2);
    const star_line = createPlane(0.02, line_dist, { color: 0xFF0000, side: THREE.DoubleSide });
    star_line.position.set(line_mp.x, line_mp.y);
    star_line.rotateZ(line_rot - (90 * Math.PI / 180));
    ritual_group.add(star_line);
  }
  return ritual_group;
};
