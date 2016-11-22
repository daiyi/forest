function EvergreenTree(size, branchLength = 0.2) {
  let matA = new THREE.LineBasicMaterial({color: 0x000000});
  let matB = new THREE.LineBasicMaterial({color: 0x000000});
  let geometry = new THREE.Geometry();

  geometry.vertices.push(
  	new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, branchLength, 0)
  );
  let branchA = new THREE.Line(geometry.clone(), matA);
  let branchB = new THREE.Line(geometry.clone(), matB);
  branchA.name = 'a';
  branchB.name = 'b';
  branchA.translateY(branchLength);
  branchB.translateY(branchLength);
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


	let axiom = branchA.clone();

	let tree = new THREE.Object3D();
	tree.add(axiom);
	tree.translateY(branchLength * -1);

	// face camera
	tree.rotateY(Math.PI/2);

	growTree(tree, size);
	return tree;
}
