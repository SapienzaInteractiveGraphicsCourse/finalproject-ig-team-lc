import { Colors } from '../colors.js';

var Ground = function(){

	// create ground cylinder;
	var geometry = new THREE.CylinderGeometry(1300,1300,700,100,10, true);

	// rotate on x axis
	geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	geometry.mergeVertices();

	var l = geometry.vertices.length;

	this.irregularities = [];

	for (var i=0; i<l; i++){
		// get each vertex
		var v = geometry.vertices[i];
		var randomAngle = Math.random() * Math.PI * 2;
		var randomDistance = 5 + Math.random() * 15;

		// store some data associated to it
		this.irregularities.push({y: v.y, x: v.x, z: v.z,
			ang: randomAngle, dis: randomDistance });
	};

	// material
	var loader = new THREE.TextureLoader();
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			map: loader.load( 'textures/groundGrass.jpg' ),
			//bumpMap: loader.load( 'textures/groundBump.png')
		}),
		.8, //  friction
		.5 //  restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 135, 15);
	//material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	//material.bumpMap.repeat.set(115, 6);

	// this.addIrregularities(geometry);

	this.mesh = new Physijs.ConvexMesh(geometry, material, 0);
	// ground receive shadows
	this.mesh.receiveShadow = true;
}

// function that simulate the ground irregularities
Ground.prototype.addIrregularities = function (geometry){
	// get the vertices
	var verts = geometry.vertices;
	var l = verts.length;

	for (var i=0; i<l; i++){
		var v = verts[i];

		// get the data associated to it
		var vprops = this.irregularities[i];

		// update the position of the vertex
		v.x = vprops.x + Math.cos(vprops.ang)*vprops.dis;
		v.y = vprops.y + Math.sin(vprops.ang)*vprops.dis;
	}
}

export { Ground };
