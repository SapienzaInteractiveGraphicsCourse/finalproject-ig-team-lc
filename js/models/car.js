import { Colors } from '../colors.js';

var Car = function() {
	// Car
	var car_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ color: Colors.red }),
		.8, // high friction
		.2 // low restitution
	);

	var wheel_material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		.8, // high friction
		.5 // medium restitution
	);

	var body_geometry = new THREE.CubeGeometry( 33, 20, 20 );
	var wheel_geometry = new THREE.CylinderGeometry( 5, 5, 1, 8 );

	// body
	this.body = new Physijs.BoxMesh(body_geometry, car_material, 5000);
	this.body.position.x = -100;
	this.body.position.y = 25;
	this.body.position.z = 45;
	this.body.receiveShadow = this.body.castShadow = true;

	// front left wheel
	this.wheel_fl = new Physijs.CylinderMesh(wheel_geometry, wheel_material, 1000);
	this.wheel_fl.rotation.x = Math.PI / 2;
	this.wheel_fl.position.x = this.body.position.x + body_geometry.parameters.width/2;
	this.wheel_fl.position.y = this.body.position.y - body_geometry.parameters.height/2;
	this.wheel_fl.position.z = this.body.position.z - body_geometry.parameters.depth/2;
	this.wheel_fl.receiveShadow = this.wheel_fl.castShadow = true;

	// front right wheel
	this.wheel_fr = new Physijs.CylinderMesh(wheel_geometry, wheel_material, 1000);
	this.wheel_fr.rotation.x = Math.PI / 2;
	this.wheel_fr.position.x = this.body.position.x + body_geometry.parameters.width/2;
	this.wheel_fr.position.y = this.body.position.y - body_geometry.parameters.height/2;
	this.wheel_fr.position.z = this.body.position.z + body_geometry.parameters.depth/2;
	this.wheel_fr.receiveShadow = this.wheel_fr.castShadow = true;

	// back left wheel
	this.wheel_bl = new Physijs.CylinderMesh(wheel_geometry, wheel_material, 1000);
	this.wheel_bl.rotation.x = Math.PI / 2;
	this.wheel_bl.position.x = this.body.position.x - body_geometry.parameters.width/2;
	this.wheel_bl.position.y = this.body.position.y - body_geometry.parameters.height/2;
	this.wheel_bl.position.z = this.body.position.z - body_geometry.parameters.depth/2;
	this.wheel_bl.receiveShadow = this.wheel_bl.castShadow = true;

	// back right wheel
	this.wheel_br = new Physijs.CylinderMesh(wheel_geometry, wheel_material, 1000);
	this.wheel_br.rotation.x = Math.PI / 2;
	this.wheel_br.position.x = this.body.position.x - body_geometry.parameters.width/2;
	this.wheel_br.position.y = this.body.position.y - body_geometry.parameters.height/2;
	this.wheel_br.position.z = this.body.position.z + body_geometry.parameters.depth/2;
	this.wheel_br.receiveShadow = this.wheel_br.castShadow = true;
};

export { Car };
