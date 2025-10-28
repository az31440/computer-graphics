import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaed6f1);

//camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(30, 30, 40);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//ground
const groundGeometry = new THREE.PlaneGeometry(80, 120);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x3baf4a });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

//roads
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });

const road1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 100), roadMaterial);
road1.rotation.x = -Math.PI / 2;
road1.position.set(-10, 0.01, -10);
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 80), roadMaterial);
road2.rotation.x = -Math.PI / 2;
road2.rotation.z = Math.PI / 6;
road2.position.set(10, 0.01, 0);
scene.add(road2);

const road3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 28), roadMaterial);
road3.rotation.x = -Math.PI / 2;
road3.position.set(30, 0.01, 46);
scene.add(road3);

// Building materials
const buildingWhite = new THREE.MeshPhongMaterial({ color: 0xffffff });
const buildingGray = new THREE.MeshStandardMaterial({ color: 0xb0bec5 });
const buildingYellow = new THREE.MeshStandardMaterial({ color: 0xffffc5 });

// Buildings
const building1 = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 25), buildingWhite);
building1.position.set(3, 3, 25);
scene.add(building1);

const building2 = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 25), buildingYellow);
building2.position.set(15, 3, -15);
building2.rotation.y = Math.PI / 6;
scene.add(building2);

const building3 = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 18), buildingGray);
building3.position.set(-22, 3, -10);
scene.add(building3);

const building4 = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 25), buildingWhite);
building4.position.set(18, 3, 47);
scene.add(building4);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(30, 40, 20);
scene.add(sunLight);

const pointLight = new THREE.PointLight(0xfff5c0, 1, 80);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// GUI
const gui = new GUI();
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001).name('Ambient Light');
gui.add(sunLight, 'intensity').min(0).max(3).step(0.001).name('Sun Light');
gui.add(pointLight, 'intensity').min(0).max(3).step(0.001).name('Point Light');

//animation loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

//resize handling 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
