import { Colors } from '../colors.js';

var Car = function() {

	// Create the cabin
	var geomCabin = new THREE.BoxGeometry(33,20,20,1,1,1);
	var matCabin = new THREE.MeshPhongMaterial({color:Colors.red, flatShading:THREE.FlatShading});
	this.cabin = new Physijs.BoxMesh(geomCabin, matCabin);
	this.cabin.position.x = -100;
	this.cabin.position.y = 25;
	this.cabin.position.z = -45;
	this.cabin.castShadow = true;
	this.cabin.receiveShadow = true;

	// Create the wheels

	var geomWheel = new THREE.BoxGeometry(8,8,3,1,1,1);
	var matWheel = new THREE.MeshPhongMaterial({color:Colors.brownDark, flatShading:THREE.FlatShading});

	// right front wheel
	this.rightFrontWheel = new Physijs.BoxMesh(geomWheel, matWheel);
	this.rightFrontWheel.position.x = this.cabin.position.x + geomCabin.parameters.width/2 - geomWheel.parameters.width/2;
	this.rightFrontWheel.position.y = this.cabin.position.y - geomCabin.parameters.height/2;
	this.rightFrontWheel.position.z = this.cabin.position.z + geomCabin.parameters.depth/2 + geomWheel.parameters.depth/2;
	this.rightFrontWheel.castShadow = true;
	this.rightFrontWheel.receiveShadow = true;

	// left front wheel
	this.leftFrontWheel = new Physijs.BoxMesh(geomWheel, matWheel);
	this.leftFrontWheel.position.x = this.cabin.position.x + geomCabin.parameters.width/2 - geomWheel.parameters.width/2;
	this.leftFrontWheel.position.y = this.cabin.position.y - geomCabin.parameters.height/2;
	this.leftFrontWheel.position.z = this.cabin.position.z - geomCabin.parameters.depth/2 - geomWheel.parameters.depth/2;
	this.leftFrontWheel.castShadow = true;
	this.leftFrontWheel.receiveShadow = true;

	// right rear wheel
	this.rightRearWheel = new Physijs.BoxMesh(geomWheel, matWheel);
	this.rightRearWheel.position.x = this.cabin.position.x - geomCabin.parameters.width/2 + geomWheel.parameters.width/2;
	this.rightRearWheel.position.y = this.cabin.position.y - geomCabin.parameters.height/2;
	this.rightRearWheel.position.z = this.cabin.position.z + geomCabin.parameters.depth/2 + geomWheel.parameters.depth/2;
	this.rightRearWheel.castShadow = true;
	this.rightRearWheel.receiveShadow = true;

	// left rear wheel
	this.leftRearWheel = new Physijs.BoxMesh(geomWheel, matWheel);
	this.leftRearWheel.position.x = this.cabin.position.x - geomCabin.parameters.width/2 + geomWheel.parameters.width/2;
	this.leftRearWheel.position.y = this.cabin.position.y - geomCabin.parameters.height/2;
	this.leftRearWheel.position.z = this.cabin.position.z - geomCabin.parameters.depth/2 - geomWheel.parameters.depth/2;
	this.leftRearWheel.castShadow = true;
	this.leftRearWheel.receiveShadow = true;
};

export { Car };
