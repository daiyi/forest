const canvas = document.getElementById('canvas');
const CAMERA_ROTATION_SPEED = Math.PI/170;
const CUBELENGTH = 10;
const three = THREE; // guh caps

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas, antialias: true});

// background colour
renderer.setClearColor(0x6E5ACF);

camera.translateZ(30);
camera.translateY(4);
camera.rotateX(Math.PI/8);

onWindowResize();

//////////////////////////// trees /////////////////////////////////////////////

let pyTree = PythagorasTree(6, 0.4);
pyTree.translateZ(8);
scene.add(pyTree);

let evergreen = EvergreenTree(8, 0.5);
evergreen.translateZ(-8);
scene.add(evergreen);


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
  pyTree.rotation.y += CAMERA_ROTATION_SPEED;
  evergreen.rotation.y += CAMERA_ROTATION_SPEED;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();


//////////////////////////// helpers ///////////////////////////////////////////
const CAMERA_SPEED = 0.7;

const KEYUP          = 38;
const KEYDOWN        = 40;
const KEYLEFT        = 37;
const KEYRIGHT       = 39;

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

function onArrowKey(e) {
  const key = e.keyCode;

  switch (key) {
    case KEYUP:
      if (camera.rotation.x > Math.PI/6 * -1) {
        camera.rotation.x += Math.PI/2 * CAMERA_ROTATION_SPEED * -1;
        camera.position.y += CAMERA_SPEED;
      }
      break;
    case KEYDOWN:
      if (camera.rotation.x < Math.PI/6) {
        camera.rotation.x += Math.PI/2 * CAMERA_ROTATION_SPEED;
        camera.position.y += CAMERA_SPEED * -1;
      }
      break;
  }
}

window.addEventListener('resize', onWindowResize, false);
document.addEventListener('keydown', onArrowKey);
