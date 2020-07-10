import { Colors } from '../colors.js';

const StartPos = new THREE.Vector3( -100., 25., 45. );
const BodyGeom = new THREE.Vector3( 60., 15., 35. );
const FWheelGeom = new THREE.Vector4( 7., 7., 5., 15. );
const BWheelGeom = new THREE.Vector4( 8., 8., 5., 15. );
//geometries constructors
function createBoxPhys(x, y, z, posX, posY, posZ, color, transparentBool){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			color: color,
			transparent: transparentBool
		}),
		.5, // medium friction
		.5 // medium restitution
	);
	var box =  new Physijs.BoxMesh(geometry, material);
	box.castShadow = box.receiveShadow = true;
	box.position.set(posX, posY, posZ);
	return box;
}
function createBox(x, y, z, posX, posY, posZ, color, transparentBool){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = new THREE.MeshPhongMaterial({
			color: color,
			transparent: transparentBool
		});
	var box = new THREE.Mesh(geometry, material);
	box.castShadow = box.receiveShadow = true;
	box.position.set(posX, posY, posZ);
	return box;
}

function createCylinderPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color) {
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ color: color }),
		.8, // medium friction
		.2 // medium restitution
	);
	var cylinder = new Physijs.CylinderMesh(geometry, material, 1000);
	cylinder.castShadow = cylinder.receiveShadow = true;
	cylinder.position.set(posX, posY, posZ);
	return cylinder;
}

function createCylinder(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color){
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = new THREE.MeshPhongMaterial({ color: color });
	var cylinder = new THREE.Mesh(geometry, material);
	cylinder.castShadow = cylinder.receiveShadow = true;
	cylinder.position.set(posX, posY, posZ);
	return cylinder;
}

function createTire(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color) {
	var cylinder = createCylinderPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color);
	cylinder.rotation.x = Math.PI / 2;
	return cylinder;
}

function createCarLights(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color){
	var cylinder = createCylinder(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color);
	cylinder.rotation.z = Math.PI / 2;
	return cylinder;
}

var Car = function() {

	var body = createBoxPhys( BodyGeom.x, BodyGeom.y, BodyGeom.z,
		StartPos.x, StartPos.y, StartPos.z, Colors.red, false );

	var roof = createBox( 0.6*BodyGeom.x, BodyGeom.y, BodyGeom.z*0.95,
		-0.05*BodyGeom.x, BodyGeom.y, 0, Colors.red, false );
	// wheels
	var fl =  createTire(FWheelGeom.x, FWheelGeom.y, FWheelGeom.z/2, FWheelGeom.w,
		+BodyGeom.x/2,
		-BodyGeom.y/2,
		-BodyGeom.z/2-FWheelGeom.z/2,
		Colors.black);
	var fr =  createTire(FWheelGeom.x, FWheelGeom.y, FWheelGeom.z/2, FWheelGeom.w,
		+BodyGeom.x/2,
		-BodyGeom.y/2,
		+BodyGeom.z/2+FWheelGeom.z/2,
		Colors.black);
	var bl =  createTire(BWheelGeom.x, BWheelGeom.y, BWheelGeom.z/2, BWheelGeom.w,
		-BodyGeom.x/2+BWheelGeom.x,
		-BodyGeom.y/2,
		-BodyGeom.z/2-BWheelGeom.z/2,
		Colors.black);
	var br =  createTire(BWheelGeom.x, BWheelGeom.y, BWheelGeom.z/2, BWheelGeom.w,
		-BodyGeom.x/2+BWheelGeom.x,
		-BodyGeom.y/2,
		+BodyGeom.z/2+BWheelGeom.z/2,
		Colors.black);
	var leftHeadLight = createCarLights(3,3, 1, 12,
		BodyGeom.x/2, BodyGeom.y/2-3, -BodyGeom.z/2+3, Colors.white);
	var rightHeadLight = createCarLights(3,3, 1, 12,
		BodyGeom.x/2, BodyGeom.y/2-3, +BodyGeom.z/2-3, Colors.white);
	var windshield = createBox(1, 0.85*BodyGeom.y, 0.85*BodyGeom.z, (0.6*BodyGeom.x)/2, 0, 0, Colors.white, true)

	this.body = body;
	this.body.add(roof);
	this.body.add(fl);
	this.body.add(fr);
	this.body.add(bl);
	this.body.add(br);
	this.body.add(leftHeadLight);
	this.body.add(rightHeadLight);
	this.body.children[0].add(windshield)
};

export { Car };
