const three = THREE; // guh caps
const canvas = document.getElementById('canvas');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setClearColor(0x6E5ACF);

onWindowResize();
camera.translateZ(12);
camera.translateY(9);
camera.rotateX(-Math.PI/10);


let planeGeometry = new THREE.PlaneGeometry(30, 6);
let planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00EEA6,
  side: THREE.DoubleSide
});
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotateX(Math.PI/2);


const cubeLength = 10;
let cubeGeometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength);
let cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x999999,
  wireframe: true
});
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.translateY(cubeLength/2);
scene.add(cube);


const len = 2;
let matA = new THREE.LineBasicMaterial({color: 0xFF7A00}); // orange
let matB = new THREE.LineBasicMaterial({color: 0xA50061}); // red
let geometry = new THREE.Geometry();

geometry.vertices.push(
	new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, len, 0)
);
let tree = new THREE.Object3D();
let branchA = new THREE.Line(geometry.clone(), matA);
let branchB = new THREE.Line(geometry.clone(), matB);
branchA.name = 'a';
branchB.name = 'b';
branchA.translateY(len);
branchB.translateY(len);
let branchAPrime = branchB.clone();
let forkLeft = branchA.clone().rotateX(Math.PI/8);
let forkRight = branchA.clone().rotateX(-Math.PI/8);

branchAPrime.add(forkLeft.clone());
branchAPrime.add(forkRight.clone());

let grammar = {
  a: branchAPrime,
  b: branchB
}

// axiom
tree.add(branchA.clone());
tree.translateY(-len);
scene.add(tree);

scene.add(branchA.clone().translateX(-10).translateY(-len));
scene.add(branchAPrime.clone().translateX(10).translateY(-len));


function render() {
  tree.rotation.y += 0.003;
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
