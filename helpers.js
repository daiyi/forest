const CAMERA_ROTATION_SPEED = Math.PI/170;
const three = THREE; // guh caps

const STATS = document.getElementById('stats');
const CAMERA_SPEED = 0.7;

const KEYUP    = 38;
const KEYDOWN  = 40;
const KEYLEFT  = 37;
const KEYRIGHT = 39;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;


/* canvas {Object} - DOM node for the <canvas> to render contents in
 */
function initCanvas(canvas) {
  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({canvas, antialias: true});
  let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  // background colour
  renderer.setClearColor(0x6E5ACF);

  return {scene, renderer, camera};
}

function initCamera(camera) {
  camera.translateZ(30);
  camera.translateY(4);
  camera.rotateX(Math.PI/8);
}

function addLandscape(scene, width=30, height=6) {
  let planeGeometry = new THREE.PlaneGeometry(width, height);
  let planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00EEA6,
    side: THREE.DoubleSide
  });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotateX(Math.PI/2);
  scene.add(plane);
}

function addScaffoldingCube(scene, length=10) {
  let cubeGeometry = new THREE.BoxGeometry(length, length, length);
  let cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x999999,
    wireframe: true
  });
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.translateY(length/2);
  scene.add(cube);
}

function printStats() {
  STATS.innerHTML = `           x      y      z
camera ${printCoord(camera.position)}
`;
}

/** coord is an object that represents (x,y,z)
 */
function printCoord(coord) {
  return Object.values(coord).map(pos => {
    return `${(pos<0)? '': ' '} ${pos.toPrecision((Math.abs(pos/1)<1) ? 2 : 3).toString()}`
  });
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

function onKeyDown(e) {
  const key = e.keyCode;

  switch (key) {
    case KEYUP:
    case KEY_W:
      if (camera.rotation.x > Math.PI/6 * -1) {
        camera.rotation.x += Math.PI/2 * CAMERA_ROTATION_SPEED * -1;
        camera.position.y += CAMERA_SPEED;
      }
      break;
    case KEY_S:
    case KEYDOWN:
      if (camera.rotation.x < Math.PI/4) {
        camera.rotation.x += Math.PI/2 * CAMERA_ROTATION_SPEED;
        camera.position.y += CAMERA_SPEED * -1;
      }
      break;
  }
  // printStats();
}
