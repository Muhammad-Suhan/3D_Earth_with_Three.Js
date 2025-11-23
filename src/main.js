import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);

//earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180
scene.add(earthGroup)
const loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1,16);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("../public/../public/earthmap1k.jpg")
  // flatShading: true
})
const earthMesh = new THREE.Mesh(geo, material);
earthGroup.add(earthMesh);
// night light
const nightEarthMat = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0.3,
  map: loader.load("../public/nightmap.jpg"),
  blending: THREE.AdditiveBlending
})
const nightEarthMesh = new THREE.Mesh(geo, nightEarthMat);
earthGroup.add(nightEarthMesh)
//Cloud 
const cloudMetarial = new THREE.MeshBasicMaterial({
  map: loader.load("../public/earthcloudmaptrans.jpg"),
  transparent: true,
  opacity: 0.1,
  blending: THREE.AdditiveBlending
})
// glow mesh
const glowMateroal = new THREE.MeshBasicMaterial({
  color: 0x00125C,
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending
})
const glowMesh = new THREE.Mesh(geo, glowMateroal);
glowMesh.scale.addScalar(0.02)
earthGroup.add(glowMesh)


const cloudMesh = new THREE.Mesh(geo, cloudMetarial)
cloudMesh.scale.addScalar(0.02)
earthGroup.add(cloudMesh)
// light
const sunLight = new THREE.DirectionalLight(0xFFFFFF);
sunLight.position.set(-0.8,0.5,0.6)
scene.add(sunLight)


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
  earthMesh.rotation.y += 0.002;
  nightEarthMesh.rotation.y += 0.002;
  cloudMesh.rotation.y += 0.002;
  glowMesh.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera)
}
animate()
renderer.render(scene, camera);