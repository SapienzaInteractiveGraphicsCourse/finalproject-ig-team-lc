import { Colors } from '../colors.js';

const StartPos = new THREE.Vector3( -100, 25, 0 ),
	BodyGeom = new THREE.Vector3( 60, 15, 35 ),
	RoofGeom = new THREE.Vector3(  0.65*BodyGeom.x, BodyGeom.y, 0.99*BodyGeom.z ),
	WheelGeom = new THREE.Vector4( 8, 8, 5, 17 ),
	DoorGeom = new THREE.Vector3(0.4*RoofGeom.x, 0.9*BodyGeom.y, 2),
	HandleGeom = new THREE.Vector3(5, 1, 2),
	WheelRimGeom = new THREE.Vector4(0.6*WheelGeom.x, 0.6*WheelGeom.y, WheelGeom.z/6, WheelGeom.w),
	CarMass = 5000,
	WheelMass = 1000,
	TireDistanceFactor = 1.2;

var loader = new THREE.TextureLoader();

//geometries constructors
function createBoxPhys(x, y, z, posX, posY, posZ, mass, color){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			color: color
		}),
		.5, // medium friction
		.5 // medium restitution
	);
	var box =  new Physijs.BoxMesh(geometry, material, mass);
	box.castShadow = box.receiveShadow = true;
	box.position.set(posX, posY, posZ);
	return box;
}
function createBoxPhysTex(x, y, z, posX, posY, posZ, mass, texture){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ map: loader.load( 'textures/'+texture ) }),
		.5, // high friction
		.5 // low restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 2, 1);
	var box =  new Physijs.BoxMesh(geometry, material, mass);
	box.castShadow = box.receiveShadow = true;
	box.position.set(posX, posY, posZ);
	return box;
}
function createBox(x, y, z, posX, posY, posZ, color){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = new THREE.MeshPhongMaterial({
			color: color
		});
	var box = new THREE.Mesh(geometry, material);
	box.castShadow = box.receiveShadow = true;
	box.position.set(posX, posY, posZ);
	return box;
}

function createBoxTex(x, y, z, posX, posY, posZ, texture){
	var geometry = new THREE.BoxGeometry(x, y, z);
	var material = new THREE.MeshPhongMaterial({ map: loader.load( 'textures/'+texture ) });
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 2, 1);
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

function createCylinderPhysTex(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture, mass) {
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ map: loader.load( 'textures/'+texture ) }),
		.8, // high friction
		.2 // low restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 2, 1);
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

function createCylinderTex(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture){
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = new THREE.MeshPhongMaterial({ map: loader.load( 'textures/'+texture ) });
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 1, 1);
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
function createRimTex(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture) {
	var cylinder = createCylinderTex(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture);
	cylinder.rotation.x = Math.PI / 2;
	return cylinder;
}

function createCarLights(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color){
	var cylinder = createCylinder(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color);
	cylinder.rotation.z = Math.PI / 2;
	return cylinder;
}

var Car = function(scene) {

	var body = createBoxPhys( BodyGeom.x, BodyGeom.y, BodyGeom.z,
		StartPos.x, StartPos.y, StartPos.z, CarMass, Colors.armyGreen );
	var roof = createBoxTex( RoofGeom.x, RoofGeom.y, RoofGeom.z,
		-BodyGeom.x/2+RoofGeom.x/2, BodyGeom.y, 0, 'armyJeep.jpg');
	// wheels
	var fl =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		+BodyGeom.x/2-WheelGeom.x,
		-BodyGeom.y/2,
		-BodyGeom.z/2-TireDistanceFactor*WheelGeom.z,
		Colors.black);
	var fr =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		+BodyGeom.x/2-WheelGeom.x,
		-BodyGeom.y/2,
		+BodyGeom.z/2+TireDistanceFactor*WheelGeom.z,
		Colors.black,
		WheelMass);
	var bl =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		-BodyGeom.x/2+WheelGeom.x,
		-BodyGeom.y/2,
		-BodyGeom.z/2-TireDistanceFactor*WheelGeom.z,
		Colors.black,
		WheelMass);
	var br =  createTire(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		-BodyGeom.x/2+WheelGeom.x,
		-BodyGeom.y/2,
		+BodyGeom.z/2+TireDistanceFactor*WheelGeom.z,
		Colors.black,
		WheelMass);
	var spareWheel = createCarLights(WheelGeom.x, WheelGeom.y, WheelGeom.z, WheelGeom.w,
		-BodyGeom.x/2-WheelGeom.z/2, BodyGeom.y/2, 0, Colors.black);
	// headlights
	var leftHeadLight = createCarLights(3,3, 1, 12,
		BodyGeom.x/2, BodyGeom.y/2-3, -BodyGeom.z/2+3, Colors.white);
	var rightHeadLight = createCarLights(3,3, 1, 12,
		BodyGeom.x/2, BodyGeom.y/2-3, +BodyGeom.z/2-3, Colors.white);
	// windows
	var windshield = createBox(1, 0.85*RoofGeom.y, 0.9*RoofGeom.z, RoofGeom.x/2, 0, 0, Colors.window);

	var leftWindow = createBox(0.4*RoofGeom.x, 0.8*RoofGeom.y, 1, RoofGeom.x/2-1.2*(0.4*RoofGeom.x)/2, 0, -RoofGeom.z/2, Colors.window);
	var rightWindow = createBox(0.4*RoofGeom.x, 0.8*RoofGeom.y, 1, RoofGeom.x/2-1.2*(0.4*RoofGeom.x)/2, 0, RoofGeom.z/2, Colors.window);
	var rearWindow = createBox(1, 0.7*RoofGeom.y, 0.7*RoofGeom.z, -RoofGeom.x/2, 0.05*RoofGeom.y, 0, Colors.window);

	// axles
	var frontAxle = createCylinder(WheelGeom.x/8, WheelGeom.y/8, 1.4*BodyGeom.z, WheelGeom.w,
		BodyGeom.x/2-WheelGeom.x,
		-BodyGeom.y/2,
		0,
		Colors.axle);
	frontAxle.rotation.x = Math.PI/2;
	var rearAxle = createCylinder(WheelGeom.x/8, WheelGeom.y/8, 1.4*BodyGeom.z, WheelGeom.w,
		-BodyGeom.x/2+WheelGeom.x,
		-BodyGeom.y/2,
		0,
		Colors.axle);
	rearAxle.rotation.x = Math.PI/2;

	//Spotlights
	var leftHeadLightLIGHT = new THREE.SpotLight(Colors.white, 2, 200, Math.PI/4);
    leftHeadLightLIGHT.position.set(0, 1, 0);
	var rightHeadLightLIGHT = new THREE.SpotLight(Colors.white, 2, 200, Math.PI/4);
    rightHeadLightLIGHT.position.set(0, 1, 0);
	leftHeadLightLIGHT.target.position.set(-30,-BodyGeom.x,0);
	rightHeadLightLIGHT.target.position.set(-30,-BodyGeom.x,0);

	//doors
	var leftDoor = createBox(DoorGeom.x, DoorGeom.y, DoorGeom.z,
		0, 0, -BodyGeom.z/2, Colors.armyGreen);
	var rightDoor = createBox(DoorGeom.x, DoorGeom.y, DoorGeom.z,
		0, 0, BodyGeom.z/2, Colors.armyGreen);
	// handles
	var leftHandle = createBox(HandleGeom.x, HandleGeom.y, HandleGeom.z,
		-DoorGeom.x/4, DoorGeom.y/3, -HandleGeom.z/2, Colors.black);
	var rightHandle = createBox(HandleGeom.x, HandleGeom.y, HandleGeom.z,
		-DoorGeom.x/4, DoorGeom.y/3, HandleGeom.z/2, Colors.black);

	var grid = createBoxTex(1, 0.6*BodyGeom.y, 0.6*BodyGeom.z,
		BodyGeom.x/2, -BodyGeom.y/2+(0.6*BodyGeom.y)/2 +1, 0, 'grilles.jpg');

	//Wheel Rims
	var fl_WheelRim = createRimTex(WheelRimGeom.x, WheelRimGeom.y, WheelRimGeom.z, WheelRimGeom.w,
		0, -WheelGeom.z/2, 0, 'wheelRim.jpg');
	fl_WheelRim.rotation.x = Math.PI;
	var fr_WheelRim = createRimTex(WheelRimGeom.x, WheelRimGeom.y, WheelRimGeom.z, WheelRimGeom.w,
		0, WheelGeom.z/2, 0, 'wheelRim.jpg');
	fr_WheelRim.rotation.x = Math.PI;
	var bl_WheelRim = createRimTex(WheelRimGeom.x, WheelRimGeom.y, WheelRimGeom.z, WheelRimGeom.w,
		0, -WheelGeom.z/2, 0, 'wheelRim.jpg');
	bl_WheelRim.rotation.x = Math.PI;
	var br_WheelRim = createRimTex(WheelRimGeom.x, WheelRimGeom.y, WheelRimGeom.z, WheelRimGeom.w,
		0, WheelGeom.z/2, 0, 'wheelRim.jpg');
	br_WheelRim.rotation.x = Math.PI;
	var spare_WheelRim = createRimTex(WheelRimGeom.x, WheelRimGeom.y, WheelRimGeom.z, WheelRimGeom.w,
		0, WheelGeom.z/2, 0, 'wheelRim.jpg');
	spare_WheelRim.rotation.y = Math.PI/2;
	spare_WheelRim.rotation.z = Math.PI/2;

	this.body = body;
	this.fl = fl;
	this.body.add(roof); // 0
	this.body.add(fl);
	this.body.add(fr);
	this.body.add(bl);
	this.body.add(br);
	this.body.add(spareWheel); // 5
	this.body.add(leftHeadLight); // 6
	this.body.add(rightHeadLight); // 7
	this.body.add(frontAxle);
	this.body.add(rearAxle);
	this.body.add(leftDoor); // 10
	this.body.add(rightDoor);
	this.body.add(grid);
	this.body.children[0].add(windshield);
	this.body.children[0].add(leftWindow);
	this.body.children[0].add(rightWindow);
	this.body.children[0].add(rearWindow);

	this.body.children[1].add(fl_WheelRim);
	this.body.children[2].add(fr_WheelRim);
	this.body.children[3].add(bl_WheelRim);
	this.body.children[4].add(br_WheelRim);
	this.body.children[5].add(spare_WheelRim);
	this.body.children[6].add(leftHeadLightLIGHT);
	this.body.children[7].add(rightHeadLightLIGHT);
	this.body.children[6].add(leftHeadLightLIGHT.target);
	this.body.children[7].add(rightHeadLightLIGHT.target);
	this.body.children[10].add(leftHandle);
	this.body.children[11].add(rightHandle);

	// add name to body children to better mangage animation
	this.body.name = "body";
	var bodyChildrenNames = ["roof", "fl", "fr", "bl", "br","spareWheel",
		"leftHeadLight", "rightHeadLight", "frontAxle", "rearAxle", "leftDoor",
		 "rightDoor", "grid"];
	var roofChildrenNames = ["windshield", "leftWindow", "rightWindow", "rearWindow"];
	for (var i = 0; i < bodyChildrenNames.length; i++){
		this.body.children[i].name = bodyChildrenNames[i];

		if (this.body.children[i].name == "roof"){
			for (var j = 0; j < roofChildrenNames.length; j++){
				this.body.children[i].children[j].name = roofChildrenNames[j];
			}
		}
	}
	this.body.children[1].name = "fl_WheelRim";
	this.body.children[2].name = "fr_WheelRim";
	this.body.children[3].name = "bl_WheelRim";
	this.body.children[4].name = "br_WheelRim";
	this.body.children[5].name = "spare_WheelRim";
	this.body.children[6].name = "leftHeadLightLIGHT";
	this.body.children[7].name = "rightHeadLightLIGHT";
	this.body.children[6].name = "TARGETleftHeadLightLIGHT";
	this.body.children[7].name = "TARGETrightHeadLightLIGHT";
	this.body.children[10].name = "leftHandle";
	this.body.children[11].name = "rightHandle";

	this.fl.position.x = this.body.position.x + this.fl.position.x;
	this.fl.position.y = this.body.position.y + this.fl.position.y;
	this.fl.position.z = this.body.position.z + this.fl.position.z;
	scene.add(this.fl);

console.log("Car:",this.body);
};

export { Car };
