import { Colors } from '../colors.js';

const TrunkGeom = new THREE.Vector4(7, 8, 80, 12);
const CrownGeom = new THREE.Vector2(40, 1);
const CoinGeom = new THREE.Vector4(15, 15, 2, 20);
var loader = new THREE.TextureLoader();

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

function createCoin(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture) {
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = new THREE.MeshPhongMaterial({ map: loader.load( 'textures/'+texture ) });
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 1, 1);
	var coin = new THREE.Mesh(geometry, material);
	coin.castShadow = coin.receiveShadow = true;
	coin.position.set(posX, posY, posZ);
    coin.rotation.z = Math.PI / 2;
    coin.rotation.y = Math.PI / 2;
	return coin;
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

function createTrunk(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture, mass){
    var trunk = createCylinderPhysTex(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture, mass);

    return trunk;
}

function createCrown(radius, detail, posX, posY, posZ, textureOrColor){
    var geometry = new THREE.DodecahedronGeometry(radius, detail);
    var material = new THREE.MeshPhongMaterial({ map: loader.load( 'textures/'+textureOrColor ) });
    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 4, 3);
    var dodecahedron = new THREE.Mesh( geometry, material );
    dodecahedron.castShadow = dodecahedron.receiveShadow = true;
	dodecahedron.position.set(posX, posY, posZ);
	return dodecahedron;
}

var Tree = function(){
    var trunk = createCylinderPhysTex(TrunkGeom.x, TrunkGeom.y , TrunkGeom.z, TrunkGeom.w,
        0, 40, 0, 'trunk.jpg', 100);
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

var Coin = function(){
    var coin = createCoin(CoinGeom.x, CoinGeom.y, CoinGeom.z, CoinGeom.w,
        20, CoinGeom.x, 50, 'coin.png')


    this.coin = coin;
}



export { Tree, Coin/*, Rock, Ramp*/ };
