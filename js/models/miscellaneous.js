import { Colors } from '../colors.js';

const TrunkGeom = new THREE.Vector4(7, 8, 80, 8);
const CrownGeom = new THREE.Vector2(40, 1);
const CoinGeom = new THREE.Vector4(15, 15, 2, 20);
const RockGeom = new THREE.Vector2(40, 1);
var loader = new THREE.TextureLoader();

function generateRandomNumber(min, max) {
    var rnd = Math.random() * (max - min) + min;
	return rnd;
};

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
	material.map.repeat.set( 3, 4);
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

function createTrunkPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture, mass){
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			map: loader.load( 'textures/'+texture ),
			bumpMap: loader.load( 'textures/trunkBump.png')
		}),
		.8, // high friction
		.2 // low restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set(4, 3);
	material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	material.bumpMap.repeat.set(4, 3);
	var trunk = new Physijs.CylinderMesh(geometry, material, mass);
	trunk.castShadow = trunk.receiveShadow = true;
	trunk.position.set(posX, posY, posZ);
	return trunk;
}
function createTrunk(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture){
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = new THREE.MeshPhongMaterial({
			map: loader.load( 'textures/'+texture ),
			bumpMap: loader.load( 'textures/trunkBump.png')
		});
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set(4, 3);
	material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	material.bumpMap.repeat.set(4, 3);
	var trunk = new THREE.Mesh(geometry, material);
	trunk.castShadow = trunk.receiveShadow = true;
	trunk.position.set(posX, posY, posZ);
	return trunk;
}

function createCrown(radius, detail, posX, posY, posZ, texture){
    var geometry = new THREE.IcosahedronGeometry(radius, detail);
    var material = new THREE.MeshPhongMaterial({
		map: loader.load( 'textures/'+texture ),
	 	bumpMap: loader.load( 'textures/crownBump.jpg')
	});
    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 3, 3);
	material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	material.bumpMap.repeat.set(3, 3);
    var dodecahedron = new THREE.Mesh( geometry, material );
    dodecahedron.castShadow = dodecahedron.receiveShadow = true;
	dodecahedron.position.set(posX, posY, posZ);
	return dodecahedron;
}

function createRock(radius, detail, posX, posY, posZ, texture){
	var geometry = new THREE.IcosahedronGeometry(radius, detail);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			map: loader.load( 'textures/'+texture ),
			bumpMap: loader.load( 'textures/rockBump.jpg')
		}),
		.5, //  friction
		.5 //  restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 1, 1);
	material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	material.bumpMap.repeat.set(1, 1);
    var rock = new Physijs.ConvexMesh( geometry, material, 0);
    rock.castShadow = rock.receiveShadow = true;
	rock.position.set(posX, posY, posZ);
	return rock;
}

function createCoin(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture) {
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = new THREE.MeshStandardMaterial({
		map: loader.load( 'textures/'+texture )
	});
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 1, 1);
	var coin = new THREE.Mesh(geometry, material);
	coin.castShadow = coin.receiveShadow = true;
	coin.position.set(posX, posY, posZ);
    coin.rotation.z = Math.PI / 2;
    coin.rotation.y = Math.PI / 2;
	return coin;
}

function createRamp(posX, posY, posZ, color){
	/*
    var rampShape = new THREE.Shape();
	rampShape.moveTo(0, 0);
	rampShape.lineTo(200, 70);
    rampShape.moveTo(200, 70);
    rampShape.lineTo(200, 0);
	rampShape.moveTo(200, 0);
	rampShape.lineTo(0, 0);
	var extrudeSettings = {
		steps: 2,
		depth: 120,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1
	};
    */
	var geometry = new THREE.BoxGeometry( 300, 100, 100 );
    geometry.vertices[4] = geometry.vertices[6];
    geometry.vertices[5] = geometry.vertices[7];
	var material = new THREE.MeshPhongMaterial({ map: loader.load( 'textures/ramp.jpg' ) });
	/*var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ map: loader.load( 'textures/'+texture ) }),
		.5, //  friction
		.5 //  restitution
	);*/
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 15, 1);
	var ramp = new Physijs.ConvexMesh( geometry, material, 0);
	ramp.castShadow = ramp.receiveShadow = true;
	ramp.position.set(posX, posY, posZ);
	return ramp;
}

var Tree = function(){
    var trunk = createTrunk(TrunkGeom.x, TrunkGeom.y , TrunkGeom.z, TrunkGeom.w,
        0, 40, 0, 'trunk.jpg');
    var crown1 = createCrown(CrownGeom.x, CrownGeom.y,
        0, TrunkGeom.z/2+CrownGeom.x/2, 0, 'crown.jpg');
    var crown2 = createCrown(0.8*CrownGeom.x, CrownGeom.y,
        0.8*CrownGeom.x/2, 0.8*CrownGeom.x/2, -CrownGeom.x/2, 'crown.jpg');
    var crown3 = createCrown(0.8*CrownGeom.x, CrownGeom.y,
        -0.8*CrownGeom.x/2, 0.6*CrownGeom.x/2, +CrownGeom.x/2, 'crown.jpg');
    var crown4 = createCrown(0.8*CrownGeom.x, CrownGeom.y,
        0, 0.8*CrownGeom.x, 0, 'crown.jpg');
    var crown5 = createCrown(0.7*CrownGeom.x, CrownGeom.y,
        0.8*CrownGeom.x/2, 0.8*CrownGeom.x/2, 0.8*CrownGeom.x/2, 'crown.jpg');
    var crown6 = createCrown(0.6*CrownGeom.x, CrownGeom.y,
        -CrownGeom.x/2, 0.6*CrownGeom.x/2, -CrownGeom.x/2, 'crown.jpg');
    var crown7 = createCrown(0.6*CrownGeom.x, CrownGeom.y,
        -0.6*CrownGeom.x/2, -CrownGeom.x/2, 0.6*CrownGeom.x/2, 'crown.jpg');

    this.trunk = trunk;
    this.trunk.add(crown1);
    this.trunk.children[0].add(crown2);
    this.trunk.children[0].add(crown3);
    this.trunk.children[0].add(crown4);
    this.trunk.children[0].add(crown5);
    this.trunk.children[0].add(crown6);
    this.trunk.children[0].add(crown7);
};

Tree.prototype.addConstraint = function(_scene, object, position) {
    var costraint = new Physijs.PointConstraint(this.trunk, object, position);
	_scene.addConstraint( costraint );
}
/*
var Forest = function(){
	this.forest = new THREE.Object3D();
	this.nTrees = 40;
	var stepAngle = generateRandomNumber(0.05, 2*Math.PI / this.nTrees); // max ~ 0.15
	for(var i=0; i<this.nTrees; i++){
		var tree = new Tree();
		var angle = stepAngle*i;
		var height = 1300 + tree.trunk.geometry.parameters.height/2;
		tree.trunk.position.x = Math.cos(angle)*height;
		tree.trunk.position.y = Math.sin(angle)*height;
		tree.trunk.position.z = Math.random()*-350; // trees distributed on ground cylinder height: 350
		tree.trunk.rotation.z = angle - Math.PI/2;
		//var scale = 0.7+Math.random()*1.2;
		//tree.trunk.scale.set(scale,scale,scale);

		this.forest.add(tree.trunk);
	}
}
*/

var Coin = function(){
    var coin = createCoin(CoinGeom.x, CoinGeom.y, CoinGeom.z, CoinGeom.w,
        -100, CoinGeom.x, 100, 'coin.png')


    this.coin = coin;
}

var Rock = function(){
	var rock = createRock(RockGeom.x, RockGeom.y, 150, 0, RockGeom.x/2, 'rock.jpg')

	this.rock = rock;
}

var Ramp = function(){
	var ramp = createRamp(-100, -10, 0, Colors.woodRamp);

	this.ramp = ramp;
}


export { Tree, Coin, Rock, Ramp };
