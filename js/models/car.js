import { Colors } from '../colors.js';

const StartPos = new THREE.Vector3( -100, 25, 45 );
const BodyGeom = new THREE.Vector3( 60, 15, 35 );
const RoofGeom = new THREE.Vector3(  0.65*BodyGeom.x, BodyGeom.y, 0.99*BodyGeom.z );
const WheelGeom = new THREE.Vector4( 8, 8, 5, 15 );
const CarMass = 5000;
const WheelMass = 1000;
//geometries constructors
function createBoxPhys(x, y, z, posX, posY, posZ, color, mass){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			color: color,
		}),
		.5, // medium friction
		.5 // medium restitution
	);
	var box =  new Physijs.BoxMesh(geometry, material, mass);
	box.castShadow = box.receiveShadow = true;
	box.position.set(posX, posY, posZ);
	return box;
}
function createBox(x, y, z, posX, posY, posZ, color){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = new THREE.MeshPhongMaterial({
			color: color,
		});
	var box = new THREE.Mesh(geometry, material);
	box.castShadow = box.receiveShadow = true;
	box.position.set(posX, posY, posZ);
	return box;
}

function createCylinderPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color, mass) {
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ color: color }),
		.8, // medium friction
		.2 // medium restitution
	);
	var cylinder = new Physijs.CylinderMesh(geometry, material, mass);
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

function createTire(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color, mass) {
	var cylinder = createCylinderPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color, mass);
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
		StartPos.x, StartPos.y, StartPos.z, Colors.armyGreen, CarMass );

	var roof = createBox( RoofGeom.x, RoofGeom.y, RoofGeom.z,
		-BodyGeom.x/2+RoofGeom.x/2, BodyGeom.y, 0, Colors.armyGreen);
	// wheels
	var fl =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		+BodyGeom.x/2,
		-BodyGeom.y/2,
		-BodyGeom.z/2-WheelGeom.z,
		Colors.black);
	var fr =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		+BodyGeom.x/2,
		-BodyGeom.y/2,
		+BodyGeom.z/2+WheelGeom.z,
		Colors.black,
		WheelMass);
	var bl =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		-BodyGeom.x/2+WheelGeom.x,
		-BodyGeom.y/2,
		-BodyGeom.z/2-WheelGeom.z,
		Colors.black,
		WheelMass);
	var br =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		-BodyGeom.x/2+WheelGeom.x,
		-BodyGeom.y/2,
		+BodyGeom.z/2+WheelGeom.z,
		Colors.black,
		WheelMass);
	var leftHeadLight = createCarLights(3,3, 1, 12,
		BodyGeom.x/2, BodyGeom.y/2-3, -BodyGeom.z/2+3, Colors.white);
	var rightHeadLight = createCarLights(3,3, 1, 12,
		BodyGeom.x/2, BodyGeom.y/2-3, +BodyGeom.z/2-3, Colors.white);
	var windshield = createBox(1, 0.85*RoofGeom.y, 0.9*RoofGeom.z, RoofGeom.x/2, 0, 0, Colors.white)
	var leftWindow = createBox(0.4*RoofGeom.x, 0.8*RoofGeom.y, 1, RoofGeom.x/2-1.2*(0.4*RoofGeom.x)/2, 0, -RoofGeom.z/2, Colors.white);
	var rightWindow = createBox(0.4*RoofGeom.x, 0.8*RoofGeom.y, 1, RoofGeom.x/2-1.2*(0.4*RoofGeom.x)/2, 0, RoofGeom.z/2, Colors.white);
	var rearWindow = createBox(1, 0.7*RoofGeom.y, 0.7*RoofGeom.z, -RoofGeom.x/2, 0.05*RoofGeom.y, 0, Colors.white);
	var spareWheel = createCarLights(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		-BodyGeom.x/2-WheelGeom.z/2, BodyGeom.y/2, 0, Colors.black);


	this.body = body;
	this.body.add(roof); // 0
	this.body.add(fl);
	this.body.add(fr);
	this.body.add(bl);
	this.body.add(br);
	this.body.add(leftHeadLight);
	this.body.add(rightHeadLight); // 6
	this.body.add(spareWheel);
	this.body.children[0].add(windshield);
	this.body.children[0].add(leftWindow);
	this.body.children[0].add(rightWindow);
	this.body.children[0].add(rearWindow);

	// add name to body children to better mangage animation
	this.body.name = "body";
	var bodyChildrenNames = ["roof", "fl", "fr", "bl", "br", "leftHeadLight", "rightHeadLight", "spareWheel"];
	var roofChildrenNames = ["windshield", "leftWindow", "rightWindow", "rearWindow"];
	for (var i = 0; i < bodyChildrenNames.length; i++){
		this.body.children[i].name = bodyChildrenNames[i];

		switch(this.body.children[i].name){
			case "roof":
				console.log("here");
				for (var j = 0; j < roofChildrenNames.length; j++){
					this.body.children[i].children[j].name = roofChildrenNames[j];
				}
			break;
		}


	}
console.log(this.body);
	//console.log("1" + this.body);
	//console.log("2",this.body.children[0]);

/*
	this.body.children[0].name = "roof";
	this.body.children[1].name = "fl";
	this.body.children[2].name = "fr";
	this.body.children[3].name = "bl";
	this.body.children[0].name = "br";
	this.body.children[0].name = "leftHeadLight";
	this.body.children[0].name = "rightHeadLight";
	this.body.children[0].add(windshield)
*/


};

export { Car };
