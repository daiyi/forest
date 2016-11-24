function EvergreenTree(size=7, length = 0.7) {
	let grammar = getGrammar();
	let tree = new THREE.Object3D();

	tree.name = "EvergreenTree";
	tree.add(getAxiom(grammar));
	tree.translateY(length * -1);
	growTree(tree, size);
	tree.updateMatrixWorld();

	let combinedGeo = new THREE.Geometry();
	tree.traverse(branch => {
		if (branch.geometry) {
			branch.geometry.vertices.forEach(vector => branch.localToWorld(vector));
			combinedGeo.merge(branch.geometry);

			// must transform back to local because children rely on local position to find
			// their own world positioning
			branch.geometry.vertices.forEach(vector => branch.worldToLocal(vector));
		}
	});

	return new THREE.LineSegments(combinedGeo, new THREE.LineBasicMaterial({color: "#000000"}));


	function getBranch(name) {
		let material = new THREE.LineBasicMaterial({color: "#ffffff"});
		let geometry = new THREE.Geometry();

		geometry.vertices.push(
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(0, length, 0)
		);

	  let branch = new THREE.Line(geometry, material);
		branch.name = name;
		branch.translateY(length);

		return branch;
	}

	function getGrammar() {
		let branchAPrime = getBranch('b');
		let branchBPrime = getBranch('b');

		branchAPrime.add(getBranch('a').rotateX(Math.PI/8));
		branchAPrime.add(getBranch('a').rotateX(-Math.PI/8));
		branchBPrime.add(getBranch('b'));

		return {
			a: branchAPrime,
			b: branchBPrime
		}
	}

	function getAxiom(grammar) {
		return getBranch('a');
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
}
