import { Colors } from '../colors.js';

var Ground = function(){

	// create ground cylinder;
	var geometry = new THREE.CylinderGeometry(1300,1300,700,100,10);

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
	var material = new THREE.MeshPhongMaterial({
		color:Colors.brown,
		flatShading:THREE.FlatShading,
	});

	this.mesh = new THREE.Mesh(geometry, material);

	// ground receive shadows
	this.mesh.receiveShadow = true;
}

// function that simulate the ground irregularities
Ground.prototype.addIrregularities = function (){
	// get the vertices
	var verts = this.mesh.geometry.vertices;
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