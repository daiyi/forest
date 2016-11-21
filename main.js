const three = THREE; // guh caps
const canvas = document.getElementById('canvas');
const CAMERA_ROTATION_SPEED = Math.PI/80;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas, antialias: true});

// background colour
renderer.setClearColor(0x6E5ACF);

camera.translateZ(30);
camera.translateY(-5);
camera.rotateX(Math.PI/12);

onWindowResize();


//////////////////////////// pythagoras tree ///////////////////////////////////

const len = 0.5;
let matA = new THREE.LineBasicMaterial({color: 0x000000});
let matB = new THREE.LineBasicMaterial({color: 0x000000});
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
let branchBPrime = branchB.clone();

branchAPrime.add(branchA.clone().rotateX(Math.PI/8));
branchAPrime.add(branchA.clone().rotateX(-Math.PI/8));
branchBPrime.add(branchB.clone());

let grammar = {
  a: branchAPrime,
  b: branchBPrime
}

function growTree(tree, n, colorIndex) {
  if (n === 0) return;
  !!colorIndex || (colorIndex = n);

  for (let i = tree.children.length-1; i >= 0; i--) {
    let child = tree.children[i];
    let growth = grammar[child.name].clone();

    growth.rotation.copy(child.rotation);
    growth.rotateY(Math.random() * Math.PI * 2);
    growth.material = new THREE.LineBasicMaterial({
      color: getMatColor(colorIndex)
    });
    growth.children.forEach(child => {
      child.material = new THREE.LineBasicMaterial({
        color: getMatColor(colorIndex)
      });
    });

    if (child.name === 'a') {
      growTree(growth, n-1, colorIndex-1);
    }

    child.children.forEach(child => {
      let clone = child.clone();
      clone.rotation.copy(child.rotation);
      growth.children[0].add(clone);
    });

    tree.add(growth);
    tree.remove(child);
  }

  growTree(tree, n-1, colorIndex);
}

// axiom
tree.add(branchA.clone());

tree.translateY(-len);
growTree(tree, 9);
scene.add(tree);


//////////////////////////// background ////////////////////////////////////////

let planeGeometry = new THREE.PlaneGeometry(30, 6);
let planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00EEA6,
  side: THREE.DoubleSide
});
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotateX(Math.PI/2);


//////////////////////////// scaffolding ///////////////////////////////////////

const cubeLength = 10;
let cubeGeometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength);
let cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x999999,
  wireframe: true
});
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.translateY(cubeLength/2);
// scene.add(cube);


//////////////////////////// animation loop ////////////////////////////////////

function render() {
  tree.rotation.y += CAMERA_ROTATION_SPEED;
  cube.rotation.y += CAMERA_ROTATION_SPEED;

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
