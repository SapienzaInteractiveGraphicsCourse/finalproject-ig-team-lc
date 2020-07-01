import { Colors } from '../colors.js';

var Car = function() {
	
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCabin = new THREE.BoxGeometry(130,80,80,1,1,1);
	var matCabin = new THREE.MeshPhongMaterial({color:Colors.red, flatShading:THREE.FlatShading});
	var cabin = new THREE.Mesh(geomCabin, matCabin);
	cabin.castShadow = true;
	cabin.receiveShadow = true;
	this.mesh.add(cabin);
	
	// Create the wheels

	var geomWheel = new THREE.BoxGeometry(30,30,10,1,1,1);
	var matWheel = new THREE.MeshPhongMaterial({color:Colors.brownDark, flatShading:THREE.FlatShading});

	// right front wheel
	var rightFrontWheel = new THREE.Mesh(geomWheel, matWheel);
	rightFrontWheel.position.x = cabin.position.x + geomCabin.parameters.width/2 - geomWheel.parameters.width/2;
	rightFrontWheel.position.y = cabin.position.y - geomCabin.parameters.height/2;
	rightFrontWheel.position.z = cabin.position.z + geomCabin.parameters.depth/2 + geomWheel.parameters.depth/2;
	rightFrontWheel.castShadow = true;
	rightFrontWheel.receiveShadow = true;
	this.mesh.add(rightFrontWheel);

	// left front wheel
	var leftFrontWheel = new THREE.Mesh(geomWheel, matWheel);
	leftFrontWheel.position.x = cabin.position.x + geomCabin.parameters.width/2 - geomWheel.parameters.width/2;
	leftFrontWheel.position.y = cabin.position.y - geomCabin.parameters.height/2;
	leftFrontWheel.position.z = cabin.position.z - geomCabin.parameters.depth/2 - geomWheel.parameters.depth/2;
	leftFrontWheel.castShadow = true;
	leftFrontWheel.receiveShadow = true;
	this.mesh.add(leftFrontWheel);

	// right rear wheel
	var rightRearWheel = new THREE.Mesh(geomWheel, matWheel);
	rightRearWheel.position.x = cabin.position.x - geomCabin.parameters.width/2 + geomWheel.parameters.width/2;
	rightRearWheel.position.y = cabin.position.y - geomCabin.parameters.height/2;
	rightRearWheel.position.z = cabin.position.z + geomCabin.parameters.depth/2 + geomWheel.parameters.depth/2;
	rightRearWheel.castShadow = true;
	rightRearWheel.receiveShadow = true;
	this.mesh.add(rightRearWheel);

	// left rear wheel
	var leftRearWheel = new THREE.Mesh(geomWheel, matWheel);
	leftRearWheel.position.x = cabin.position.x - geomCabin.parameters.width/2 + geomWheel.parameters.width/2;
	leftRearWheel.position.y = cabin.position.y - geomCabin.parameters.height/2;
	leftRearWheel.position.z = cabin.position.z - geomCabin.parameters.depth/2 - geomWheel.parameters.depth/2;
	leftRearWheel.castShadow = true;
	leftRearWheel.receiveShadow = true;
	this.mesh.add(leftRearWheel);
};

export { Car };