const three = THREE; // guh caps
const canvas = document.getElementById('canvas');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas, antialias: true});

// background colour
renderer.setClearColor(0x6E5ACF);

camera.translateZ(12);
camera.translateY(15);
camera.rotateX(-Math.PI/8);

onWindowResize();


//////////////////////////// pythagoras tree ///////////////////////////////////

const len = 1;
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
let branchBPrime = branchB.clone();

branchAPrime.add(branchA.clone().rotateX(Math.PI/8));
branchAPrime.add(branchA.clone().rotateX(-Math.PI/8));
branchBPrime.add(branchB.clone());

let grammar = {
  a: branchAPrime,
  b: branchBPrime
}

function growTree(tree, n) {
  if (n === 0) {
    return;
  }
  for (let i = tree.children.length-1; i >= 0; i--) {
    let child = tree.children[i];
    let growth = grammar[child.name].clone();
    growth.rotation.copy(child.rotation);

    if (child.name === 'a') {
      tree.add(growth);
      growTree(growth, n-1);
    }
    else if (child.name === 'b') {
      child.children.forEach(child => {
        let clone = child.clone();
        clone.rotation.copy(child.rotation);
        growth.children[0].add(clone);
      });
      tree.add(growth);
    }
    tree.remove(child);
  }
  growTree(tree, n-1);
}

// axiom
tree.add(branchA.clone());

tree0 = tree.clone().translateY(-len).translateX(-10);
tree1 = tree.clone().translateY(-len).translateX(10);
growTree(tree0, 2);
growTree(tree1, 3);
scene.add(tree0);
scene.add(tree1);

tree = tree.clone().translateY(-len);
growTree(tree, 5);
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
scene.add(cube);


//////////////////////////// animation loop ////////////////////////////////////

function render() {
  tree.rotation.y += 0.003;
  cube.rotation.y += 0.003;

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
