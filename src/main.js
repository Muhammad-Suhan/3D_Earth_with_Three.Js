import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 2;
scene.add(camera);

//earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180
scene.add(earthGroup)
const loader = new THREE.TextureLoader()
const geo = new THREE.IcosahedronGeometry(1,12);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("../public/8k_earth.jpg")
  // flatShading: true
})
const earthMesh = new THREE.Mesh(geo, material);
earthGroup.add(earthMesh);

// light
const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF)
scene.add(hemiLight)


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
// ------------
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
function animate(){
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.002
  controls.update();
  renderer.render(scene, camera)
}
animate()
renderer.render(scene, camera);