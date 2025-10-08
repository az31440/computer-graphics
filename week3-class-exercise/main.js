import * as THREE from 'three';
import { Wireframe } from 'three/examples/jsm/Addons.js';
import { lightPosition } from 'three/src/nodes/TSL.js';
import { color, directPointLight } from 'three/tsl';
import { AmbientLight } from 'three/webgpu';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(1, 3, 10);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xfcb603 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; 
plane.receiveShadow = true;
scene.add(plane);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial( {
    color: 0x8844ff,
    // metalness: 0.4,
    // roughness: 0.3,
    specular: 0xfffffff,
    // emissive: 0x220044
    shininess: 50
} );
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-2, 0.5, 0);
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x44ff44, shininess: 100 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0.6, 0);
scene.add(sphere);

const coneGeometry = new THREE.ConeGeometry(0.6, 1.2, 32);
const coneMaterial = new THREE.MeshLambertMaterial({ color: 0x4444ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(2, 0.6, 0);
scene.add(cone);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  box.rotation.y += 0.01;
  sphere.rotation.y += 0.01;
  cone.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();