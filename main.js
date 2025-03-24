import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2;

// Load MTL First
const mtlLoader = new MTLLoader();
mtlLoader.load('./models/cosh.mtl', (materials) => {
    materials.preload(); // Preload the materials

    // Now load OBJ with materials applied
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials); // Assign materials
    objLoader.load('./models/cosh.obj', (object) => {
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, 0);
        scene.add(object);
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });

}, (progress) => {
    console.log('MTL Loading Progress:', progress);
}, (error) => {
    console.error('Error loading MTL file:', error);
});

// Camera Position
camera.position.y = 7.5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
