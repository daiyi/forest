let {scene, renderer, camera} = initCanvas(document.getElementById('canvas'));

initCamera(camera);
onWindowResize();

const landscapeSize = 60;
addLandscape(scene, landscapeSize);
// addScaffoldingCube(scene, 15);

// let pyTree = PythagorasTree(6, 0.4);
// pyTree.translateX(8);
// pyTree.rotateY(Math.PI/2); // face camera
// scene.add(pyTree);

const forestSize = 1;
let forest = [];

for (let i = 0; i < forestSize; i++) {
  forest[i] = EvergreenTree();
  // forest[i].translateX(Math.random() * landscapeSize - landscapeSize/2);
  scene.add(forest[i]);
}

// Animation loop
function render() {
  forest.forEach(tree => tree.rotation.y += CAMERA_ROTATION_SPEED);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();


window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', onKeyDown);
// window.addEventListener('load', printStats);
