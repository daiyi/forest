let {scene, renderer, camera} = initCanvas(document.getElementById('canvas'));

initCamera(camera);
onWindowResize();

addLandscape(scene);
addScaffoldingCube(scene, 15);

let pyTree = PythagorasTree(6, 0.4);
pyTree.translateX(8);
pyTree.rotateY(Math.PI/2); // face camera
scene.add(pyTree);

let evergreen = EvergreenTree(8, 0.5);
evergreen.translateX(-8);
evergreen.rotateY(Math.PI/2); // face camera
scene.add(evergreen);


// Animation loop
function render() {
  pyTree.rotation.y += CAMERA_ROTATION_SPEED;
  evergreen.rotation.y += CAMERA_ROTATION_SPEED;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();


window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('load', printStats);
