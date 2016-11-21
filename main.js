const canvas = document.getElementById('canvas');
const CAMERA_ROTATION_SPEED = Math.PI/170;
const CUBELENGTH = 10;
const three = THREE; // guh caps

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas, antialias: true});

// background colour
renderer.setClearColor(0x6E5ACF);

camera.translateZ(20);
camera.translateY(30);
camera.rotateX(-Math.PI/8);

onWindowResize();

//////////////////////////// trees /////////////////////////////////////////////

let tree = PythagorasTree(6, 0.5);
scene.add(tree);


//////////////////////////// background ////////////////////////////////////////

let planeGeometry = new THREE.PlaneGeometry(30, 6);
let planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00EEA6,
  side: THREE.DoubleSide
});
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(Math.PI/2);
scene.add(plane);


//////////////////////////// scaffolding ///////////////////////////////////////

let cubeGeometry = new THREE.BoxGeometry(CUBELENGTH, CUBELENGTH, CUBELENGTH);
let cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x999999,
  wireframe: true
});
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.translateY(CUBELENGTH/2);
// scene.add(cube);


//////////////////////////// animation loop ////////////////////////////////////

function render() {
  tree.rotation.y += CAMERA_ROTATION_SPEED;
  // cube.rotation.y += CAMERA_ROTATION_SPEED;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();


//////////////////////////// helpers ///////////////////////////////////////////

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize, false);
