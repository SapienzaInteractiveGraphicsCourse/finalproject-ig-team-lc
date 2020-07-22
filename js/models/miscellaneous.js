import { Colors } from '../colors.js';

const TrunkGeom = new THREE.Vector4(7, 8, 80, 8);
const CrownGeom = new THREE.Vector2(40, 1);
const CoinGeom = new THREE.Vector4(15, 15, 2, 20);
const RockGeom = new THREE.Vector2(40, 1);
const RampGeom = new THREE.Vector3(150, 60, 100);
const CarStartPos = new THREE.Vector3( -100, 45, 0 );

var takenPosArray = [];
takenPosArray.push(CarStartPos);

var loader = new THREE.TextureLoader();

function rangedRandom(min, max){
    return Math.random() * (max-min+1) + min;
}

function radnomRoadSideZ(min, max, centralGap){
    if(Math.random() > 0.5){
        return rangedRandom(centralGap, max);
    }
    else return rangedRandom(min, -centralGap);
}

function checkPos(obj, posArray){
    var objPos = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z );
    console.log(objPos);
    for(var pos of posArray){
        while(objPos.distanceTo(pos) < 70){
            console.log("distance: "+objPos.distanceTo(pos));
            obj.position.x = Math.cos(angle+0.1*angle)*height;
            obj.position.y = Math.sin(angle+0.1*angle)*height;
            obj.position.z =  Math.random() * -(340 - 60) + (-60);
        }

    }
    takenPosArray.push(objPos);
}

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

function createTrunkPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, mass){
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			map: loader.load( 'textures/trunk.jpg' ),
			//bumpMap: loader.load( 'textures/trunkBump.png')
		}),
		.5, // high friction
		.5 // low restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set(4, 3);
	//material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	//material.bumpMap.repeat.set(4, 3);
	var trunk = new Physijs.CylinderMesh(geometry, material, mass);
	trunk.castShadow = trunk.receiveShadow = true;
	trunk.position.set(posX, posY, posZ);
	return trunk;
}

function createCrown(radius, detail, posX, posY, posZ, texture){
    var geometry = new THREE.IcosahedronGeometry(radius, detail);
    var material = new THREE.MeshPhongMaterial({
		map: loader.load( 'textures/'+texture ),
	 	//bumpMap: loader.load( 'textures/crownBump.jpg')
	});
    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 3, 3);
	//material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	//material.bumpMap.repeat.set(3, 3);
    var dodecahedron = new THREE.Mesh( geometry, material );
    dodecahedron.castShadow = dodecahedron.receiveShadow = true;
	dodecahedron.position.set(posX, posY, posZ);
	return dodecahedron;
}

function createCrown2(radius, detail, posX, posY, posZ, texture){
    var geometry = new THREE.IcosahedronGeometry(radius, detail);
    var material = new THREE.MeshPhongMaterial({
		map: loader.load( 'textures/'+texture ),
	 	//bumpMap: loader.load( 'textures/crownBump.jpg')
	});
    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 3, 3);
	//material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
	//material.bumpMap.repeat.set(3, 3);
    var dodecahedron = new THREE.Mesh( geometry, material );
    dodecahedron.castShadow = dodecahedron.receiveShadow = true;
	dodecahedron.position.set(posX, posY, posZ);
	return dodecahedron;
}

function createRock(radius, detail, posX, posY, posZ){
	var geometry = new THREE.IcosahedronGeometry(radius, detail);
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({
			map: loader.load( 'textures/rock.jpg'),
			//bumpMap: loader.load( 'textures/rockBump.jpg')
		}),
		.5, //  friction
		.5 //  restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 1, 1);
    //material.bumpMap.wrapS = material.bumpMap.wrapT = THREE.RepeatWrapping;
    //material.bumpMap.repeat.set(1, 1);
    var rock = new Physijs.ConvexMesh( geometry, material, 0);
    rock.castShadow = rock.receiveShadow = true;
	rock.position.set(posX, posY, posZ);
	return rock;
}

function createCoin(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, texture) {
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
	var material = new THREE.MeshStandardMaterial({
		map: loader.load( 'textures/coin.png' )
	});
    material.map.rotation = Math.PI /2;
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 1, 1);
	var coin = new THREE.Mesh(geometry, material);
	coin.castShadow = coin.receiveShadow = true;
	coin.position.set(posX, posY, posZ);
    //coin.rotation.x = Math.PI / 2;
	return coin;
}

function createRamp(x, y, z, posX, posY, posZ){
	var geometry = new THREE.BoxGeometry( x, y, z, 2);
    geometry.vertices[4] = geometry.vertices[6];
    geometry.vertices[5] = geometry.vertices[7];
    // Since box has 2 width segments, set the middle width vertices to be aligned with the straight line
    // from vertex (-75, -25) to (75, 25) which is (0, 0)
    geometry.vertices[8].y = geometry.vertices[9].y = 0;
    // adjust the base line to follow the ground cylinder curvature
    //geometry.vertices[10].y = geometry.vertices[11].y = -20;
	//var material = new THREE.MeshPhongMaterial({ map: loader.load( 'textures/ramp.jpg' ) });
	var material = Physijs.createMaterial(
		new THREE.MeshPhongMaterial({ map: loader.load( 'textures/ramp.jpg' ) }),
		.5, //  friction
		.5 //  restitution
	);
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 15, 1);
	var ramp = new Physijs.ConvexMesh( geometry, material, 0);
	ramp.castShadow = ramp.receiveShadow = true;
	ramp.position.set(posX, posY, posZ);
	return ramp;
}

function createSphere(radius, posX, posY, posZ){
    var geometry = new THREE.SphereGeometry( radius , 32, 32 );
	var material = new THREE.MeshBasicMaterial({
			color: Colors.white
		});
    var sphere = new Physijs.SphereMesh( geometry, material, 0);
    sphere.castShadow = sphere.receiveShadow = true;
	sphere.position.set(posX, posY, posZ);
	return sphere;
}

/*
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
*/
var Tree = function(){
    var trunk = createTrunkPhys(TrunkGeom.x, TrunkGeom.y , TrunkGeom.z, TrunkGeom.w,
        0, 40, 0, 'trunk.jpg', 0);
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

/*
Tree.prototype.addConstraint = function(_scene, object, position) {
    var costraint = new Physijs.PointConstraint(this.trunk, object, position);
	_scene.addConstraint( costraint );
}
*/

var Forest = function(){

    var centralMesh = createSphere(2, 0, 0, 0);

    this.mesh = centralMesh;

	this.nTrees = 20;
	var stepAngle =2*Math.PI / this.nTrees;
	for(var i=0; i<this.nTrees; i++){
		var tree = new Tree();
        tree.name = "tree";
		var angle = stepAngle*i;
		var height = 1300 + tree.trunk.geometry.parameters.height/2;
		tree.trunk.position.x = Math.cos(angle)*height;
		tree.trunk.position.y = Math.sin(angle)*height;
		tree.trunk.position.z = radnomRoadSideZ(-340, 340, 70); // trees distributed on ground cylinder height: 350
		tree.trunk.rotation.z = angle - Math.PI/2;
        var objPos = new THREE.Vector3(tree.trunk.position.x, tree.trunk.position.y, tree.trunk.position.z );
        var newAngle = 0.3*angle;
        var k
        for(var pos of takenPosArray){
            while(objPos.distanceTo(pos) < 70 || objPos.distanceTo(CarStartPos) < 70 ){
                objPos.x = tree.trunk.position.x = Math.cos(angle+newAngle)*height;
        		objPos.y = tree.trunk.position.y = Math.sin(angle+newAngle)*height;
                objPos.z = tree.trunk.position.z = radnomRoadSideZ(-340, 340, 70);
                tree.trunk.rotation.z = angle+newAngle - Math.PI/2;
                k++;
                console.log("ramp "+ k);
            }
        }
        takenPosArray.push(objPos);
		this.mesh.add(tree.trunk);
	}
}


var Coin = function(){
    var centralMesh = createSphere(2, 0, 0, 0);

    this.mesh = centralMesh;

	this.nCoins = 50;
	var stepAngle =2*Math.PI / this.nCoins;
	for(var i=0; i<this.nCoins; i++){
		var coin = createCoin(CoinGeom.x, CoinGeom.y, CoinGeom.z, CoinGeom.w, -100, CoinGeom.x, 100);
        coin.name = "coin";
		var angle = stepAngle*i;
		var height = 1300 + coin.geometry.parameters.radiusTop;
		coin.position.x = Math.cos(angle)*height;
		coin.position.y = Math.sin(angle)*height;
		coin.position.z = radnomRoadSideZ(-340, 340, 70); // trees distributed on ground cylinder height: 350
        coin.rotation.x = Math.PI/2;
		coin.rotation.y = angle - Math.PI/2;

        var objPos = new THREE.Vector3(coin.position.x, coin.position.y, coin.position.z );
        var newAngle = 0.3*angle;
        var k;
        for(var pos of takenPosArray){
            while(objPos.distanceTo(pos) < 70 || objPos.distanceTo(CarStartPos) < 70 ){
                console.log("distance Coin: "+objPos.distanceTo(pos));
                objPos.x = coin.position.x = Math.cos(angle+newAngle)*height;
                objPos.y = coin.position.y = Math.sin(angle+newAngle)*height;
                objPos.z = coin.position.z = radnomRoadSideZ(-340, 340, 70);
                coin.rotation.y = angle+newAngle - Math.PI/2;
                k++;
                console.log("ramp "+ k);
            }
        }
        takenPosArray.push(objPos);

		this.mesh.add(coin);

	}
}

var Rock = function(){

    var centralMesh = createSphere(2, 0, 0, 0);

    this.mesh = centralMesh;

	this.nRocks = 19;
	var stepAngle =2*Math.PI / this.nRocks;
	for(var i=0; i<this.nRocks; i++){
		var rock = createRock(RockGeom.x, RockGeom.y, 150, 0, RockGeom.x/2);
        rock.name = "rock";
		var angle = stepAngle*i;
		var height = 1300;
		rock.position.x = Math.cos(angle)*height;
		rock.position.y = Math.sin(angle)*height;
		rock.position.z = radnomRoadSideZ(-340, 340, 70); // trees distributed on ground cylinder height: 350
		rock.rotation.z = angle - Math.PI/2;
        var objPos = new THREE.Vector3(rock.position.x, rock.position.y, rock.position.z );
        var newAngle = 0.3*angle;
        var k;
        for(var pos of takenPosArray){
            while(objPos.distanceTo(pos) < 70 || objPos.distanceTo(CarStartPos) < 70 ){
                objPos.x = rock.position.x = Math.cos(angle+newAngle)*height;
                objPos.y = rock.position.y = Math.sin(angle+newAngle)*height;
                objPos.z = rock.position.z =  radnomRoadSideZ(-340, 340, 70);
                rock.rotation.z = angle+newAngle - Math.PI/2;
                k++;
                console.log("ramp "+ k);
            }

        }
        takenPosArray.push(objPos);
		this.mesh.add(rock);
	}
}

var Ramp = function(){
   var centralMesh = createSphere(2, 0, 0, 0);
   this.mesh = centralMesh;
   this.nRamps = 15;
   var stepAngle =2*Math.PI / this.nRamps;
   for(var i=0; i<this.nRamps; i++){
       var ramp = createRamp(RampGeom.x, RampGeom.y, RampGeom.z, 0, RampGeom.y/2, 0);
       ramp.name = "ramp";
       var angle = stepAngle*i;
       var height = 1300 + ramp.geometry.parameters.height/2-3;
       ramp.position.x = Math.cos(angle)*height;
       ramp.position.y = Math.sin(angle)*height;
       ramp.position.z = radnomRoadSideZ(-340, 340, 70); // trees distributed on ground cylinder height: 350
       ramp.rotation.z = angle - Math.PI/2;
       var objPos = new THREE.Vector3(ramp.position.x, ramp.position.y, ramp.position.z );
       var newAngle = 1.5*angle;
       var k;
       for(var pos of takenPosArray){
           while(objPos.distanceTo(pos) < 70 || objPos.distanceTo(CarStartPos) < 100 ){
               console.log("distance RAMP before: "+objPos.distanceTo(pos));
               objPos.x = ramp.position.x = Math.cos(angle+newAngle)*height;
               objPos.y = ramp.position.y = Math.sin(angle+newAngle)*height;
               objPos.z = ramp.position.z = radnomRoadSideZ(-340, 340, 70);
               ramp.rotation.z = angle+newAngle - Math.PI/2;
               k++;
               console.log("ramp "+ k);
           }

       }
       takenPosArray.push(objPos);
       this.mesh.add(ramp);
    }
    console.log("array: ",takenPosArray)
}


export { Tree, Forest, Coin, Rock, Ramp };
