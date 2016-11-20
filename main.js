const three = THREE; // guh caps
const canvas = document.getElementById('canvas');

let scene = new three.Scene();
let camera = new three.PerspectiveCamera(75, 1, 0.1, 1000);
let renderer = new three.WebGLRenderer({canvas, antialias: true});
renderer.setClearColor(0x6E5ACF);

onWindowResize();
camera.position.z = 12;
camera.position.y = 9;
camera.rotateX(-Math.PI/10);

let planeGeometry = new three.PlaneGeometry(10, 6);
let planeMaterial = new three.MeshBasicMaterial({
  color: 0x00EEA6,
  side: THREE.DoubleSide
});
let plane = new three.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = Math.PI/2;

const cubeLength = 10;
let cubeGeometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength);
let cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xA50061,
  wireframe: true
});
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = cubeLength/2;
scene.add(cube);


let material = new three.LineBasicMaterial({color: 0xFF7A00});
let geometry = new three.Geometry();
geometry.vertices.push(
	new three.Vector3(0, 0, 0),
  new three.Vector3(0, 5, 0)
);
let line = new three.Line(geometry, material);
scene.add(line);


function render() {
  line.rotation.y += 0.003;
  cube.rotation.y += 0.003;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();


//////////////////////////// etc ///////////////////////////////////////////////

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

window.addEventListener('resize', onWindowResize, false);
