import { Sky } from './models/sky.js';
import { Ground } from './models/ground.js';
import { Car } from './models/car.js';
import { Colors } from './colors.js';
import { Tree, Forest, Coin, Rock, Ramp } from './models/miscellaneous.js';

Physijs.scripts.worker = './js/physijs_worker.js';
// Physijs.scripts.ammo = '/js/ammo.js';


var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
	HEIGHT, WIDTH, renderer, container;
var rotationSpeed = 0;
var controls;
var axesHelper = new THREE.AxesHelper( 30 );
var steering = false;
var isGameOn = false;
var isCarRunning = false;
var health = 3;
var points = 0;
var record = 0;
var gameOver = false;
var win = false;
var rotationResetCar_Executed = false;
var collisionResetCar_Executed = false;
var fallingResetCar_Executed = false;

//var fontLoader = new THREE.FontLoader();

container = document.getElementById('world');
const loadingScreen = document.getElementById( 'loading-screen' );

var healthLabel = document.getElementById("healthLabel");
var healthBar = document.getElementById("health");
var coinsLabel = document.getElementById("coinsLabel");
var coinsCounter = document.getElementById("coins");
coinsCounter.textContent = points;

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetCar);

var restartButton = document.getElementById("restart");
restartButton.addEventListener("click", restart);

var restartWinButton = document.getElementById("restartWin");
restartWinButton.addEventListener("click", restart);

var gameOverPanel = document.getElementById("gameOver");
var gameOnPanel = document.getElementById("gameOn");
var recordLabel = document.getElementById("recordLabel");

var winPanel = document.getElementById("win");

function dynamicCarPosZ(){
		if(car.body.position.z > 30){
			return 30;
		}
		else return car.body.position.z;
};

function handleCollision(collided_with){
	// "this" is the car

	switch ( collided_with ) {

		case forest.mesh:
		case rock.mesh:
			health -= 1;
			healthBar.value = health;
			console.log("health: "+health)
			isGameOn = false;
			setTimeout(resetCar, 3000);
			break;
	}
}

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	scene = new Physijs.Scene;
	scene.name = "scene";
	scene.setGravity(new THREE.Vector3( 0, -90, 0 ));

	// fog effect
	scene.fog = new THREE.Fog(0xdeedff, 100, 950);

	// camera
	fieldOfView = 60;
	aspectRatio = WIDTH / HEIGHT;
	nearPlane = 1;
	farPlane = 2000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);
	//camera.position.set(car.body.position.x -100, car.body.position.x + 70, car.body.position.x + 200);
	//camera.lookAt(0,0,0 );
	camera.up.set(0, 1, 0);

	renderer = new THREE.WebGLRenderer({
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true,
		antialias: true
	});

	renderer.setSize(WIDTH, HEIGHT);

	// Enable shadows
	renderer.shadowMap.enabled = true;

	// link renderer DOM element to container in html
	container.appendChild(renderer.domElement);
	//controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.update();

	// if resize, update camera and renderer size
	window.addEventListener('resize', winResize, false);

	window.addEventListener(
		'keydown',
		function( ev ) {
			switch( ev.keyCode ) {
				case 38:
					// up: start
					if (isGameOn) {
						isCarRunning = true;
						var speed = {s: rotationSpeed};
						var speed_target = {s: 1.5};
						var tween_speed = new TWEEN.Tween(speed).to(speed_target, 500).onUpdate(function(){
							rotationSpeed = speed.s;
						})
						tween_speed.start();
					}

					break;

				case 37:
					// Left: left steering

					if (isGameOn && isCarRunning) {
						// wheels turn left
						var w_rotation = {y: 0, z: 0};
						var w_target_rotation = {y: 0, z: -.5};
						var tween_wheels = new TWEEN.Tween(w_rotation).to(w_target_rotation, 125).onUpdate(function(){
							steering = true;
							car.body.children[1].rotation.y = w_rotation.y;
							car.body.children[2].rotation.y = w_rotation.y;
							car.body.children[1].rotation.z = w_rotation.z;
							car.body.children[2].rotation.z = w_rotation.z;
						});

						// car turns left
						var b_rotation = {y: 0};
						var b_target_rotation = {y: .2};
						var tween_body_r = new TWEEN.Tween(b_rotation).to(b_target_rotation, 250).onUpdate(function(){
							car.body.__dirtyRotation = true;
							car.body.rotation.y = b_rotation.y;
						});

						// car goes left
						var b_position = {z: car.body.position.z};
						var b_target_position = {z: car.body.position.z - 40};
						var tween_body_p = new TWEEN.Tween(b_position).to(b_target_position, 250)
						.onUpdate(function(){
							car.body.__dirtyPosition = true;
							car.body.position.z = b_position.z;
						});

						if (!steering) {
							tween_body_r.chain(tween_body_p);
							tween_wheels.chain(tween_body_r);
							tween_wheels.start();
						} else {
							tween_body_p.start();
						}
					}

					break;

				case 39:
					// Right: right steering

					if (isGameOn && isCarRunning) {
						// wheels turn right
						var w_rotation = {y: 0, z: 0};
						var w_target_rotation = {y: 0, z: .5};
						var tween_wheels = new TWEEN.Tween(w_rotation).to(w_target_rotation, 125).onUpdate(function(){
							steering = true;
							car.body.children[1].rotation.y = w_rotation.y;
							car.body.children[2].rotation.y = w_rotation.y;
							car.body.children[1].rotation.z = w_rotation.z;
							car.body.children[2].rotation.z = w_rotation.z;
						});

						// car turns right
						var b_rotation = {y: 0};
						var b_target_rotation = {y: -.2};
						var tween_body_r = new TWEEN.Tween(b_rotation).to(b_target_rotation, 250).onUpdate(function(){
							car.body.__dirtyRotation = true;
							car.body.rotation.y = b_rotation.y;
						});

						// car goes right
						var b_position = {z: car.body.position.z};
						var b_target_position = {z: car.body.position.z + 40};
						var tween_body_p = new TWEEN.Tween(b_position).to(b_target_position, 250)
						.onUpdate(function(){
							car.body.__dirtyPosition = true;
							car.body.position.z = b_position.z;
						});

						if (!steering) {
							tween_body_r.chain(tween_body_p);
							tween_wheels.chain(tween_body_r);
							tween_wheels.start();
						} else {
							tween_body_p.start();
						}
					}

					break;
					case 40:
					// Down: braking

					if (isGameOn) {
						rotationSpeed = 0;
						isCarRunning = false;
					}

					break;
			}
		}
	);

	document.addEventListener(
		'keyup',
		function( ev ) {
			switch( ev.keyCode ) {
				case 38:
					// up: stop

					if (isGameOn) {
						isCarRunning = true;
						var speed = {s: rotationSpeed};
						var speed_target = {s: .5};
						var tween_speed = new TWEEN.Tween(speed).to(speed_target, 100).onUpdate(function(){
							rotationSpeed = speed.s;
						}).easing(TWEEN.Easing.Quadratic.Out);
						tween_speed.start();
					}

					break;

				case 37:
				case 39:
					// Left/Right: turn normal

					if (isGameOn && isCarRunning) {
						// wheels turn normal
						var w_rotation = {z: car.body.children[1].rotation.z};
						var w_target_rotation = {z: 0};
						var tween_wheels = new TWEEN.Tween(w_rotation).to(w_target_rotation, 125).onUpdate(function(){
							car.body.children[1].rotation.z = w_rotation.z;
							car.body.children[2].rotation.z = w_rotation.z;
						});

						// car turns normal
						var b_rotation = {y: car.body.rotation.y};
						var b_target_rotation = {y: 0};
						var tween_body_r = new TWEEN.Tween(b_rotation).to(b_target_rotation, 250).onUpdate(function(){
							car.body.__dirtyRotation = true;
							car.body.rotation.y = b_rotation.y;
						}).onComplete(steering = false);

						tween_wheels.chain(tween_body_r);
						tween_wheels.start();
					}

					break;
			}
		}
	);
	//scene.add( axesHelper );
	console.log("scene: ",scene);
}

function winResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

// LIGHTS
var hemisphereLight, directionalLight;

function createLights() {
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	hemisphereLight.name = "hemisphereLight";
	directionalLight = new THREE.DirectionalLight(0xffffff, .9);
	directionalLight.name = "directionalLight";
	directionalLight.position.set(150, 350, 350);
	directionalLight.castShadow = true;

	directionalLight.shadow.camera.left = -400;
	directionalLight.shadow.camera.right = 400;
	directionalLight.shadow.camera.top = 400;
	directionalLight.shadow.camera.bottom = -400;
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 1000;

	directionalLight.shadow.mapSize.width = 2048;
	directionalLight.shadow.mapSize.height = 2048;

	scene.add(hemisphereLight);
	scene.add(directionalLight);
}

var ground, car, sky, forest, rock, coin, ramp, coinSeries;

function createGround(){
	ground = new Ground();
	ground.mesh.position.y = -1300;
	scene.add(ground.mesh);
}

function createCar(){
	car = new Car();
	car.body.addEventListener('collision', handleCollision);
	scene.add(car.body);
}

// push down sky to let clouds closer to the ground
function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -1300;
	scene.add(sky.mesh);
}

function createForest(){
	forest = new Forest();
	forest.mesh.position.y = -1300;
	scene.add(forest.mesh);
}

function createCoins(){
	coin = new Coin();
	coin.mesh.position.y = -1300;
	scene.add(coin.mesh);
	//collidableMeshList = coin.collidableMeshList;
	//console.log("collidableMeshList: ",collidableMeshList);

}

function createRocks(){
	rock = new Rock();
	rock.mesh.position.y = -1300;
	scene.add(rock.mesh);
}

function createRamp(){
	ramp = new Ramp();
	ramp.mesh.position.y = -1300;
	scene.add(ramp.mesh);
}

/*function createText(){

	fontLoader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

		var geometry = new THREE.TextGeometry( 'Hello three.js!', {
			font: font,
			size: 70,
			height: 10,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 5,
			bevelSize: 5,
			bevelOffset: 0,
			bevelSegments: 3
		} );
		geometry.center(mesh);
		var material = new THREE.MeshPhongMaterial({ color: Colors.red });
      	var textMesh = new THREE.Mesh( geometry, material );
		textMesh.position
		scene.add( textMesh );
	} );
}*/

function resetCar() {
	var carMesh = scene.getObjectByName("body");
	scene.remove(carMesh);
	carMesh.geometry.dispose();
	carMesh.material.dispose();
	createCar();
	isGameOn = true;
	steering = false;
	rotationSpeed = 0.5;
}
function restart(){
	loadingScreen.classList.remove('fade-out');
	gameOnPanel.hidden = true;
	gameOverPanel.hidden = true;
	winPanel.hidden = true;

	for( var i = scene.children.length - 1; i >= 0; i--){
		var obj = scene.children[i];
		scene.remove(obj);
	}
	createLights();
	createSky();
	createGround();
	createCar();
	createRamp();
	createCoins();
	createForest();
	createRocks();

	isGameOn = true;
}

// call init function when window is loaded
window.addEventListener('load', init, false);

function init() {
	createScene();
	createLights();
	createSky();
	createGround();
	createCar();
	createRamp();
	createCoins();
	createForest();
	createRocks();
	//createText();

	isGameOn = true;

	loop();
}

function loop(){
	ground.mesh.__dirtyRotation = true;
	forest.mesh.__dirtyRotation = true;
	rock.mesh.__dirtyRotation = true;
	ramp.mesh.__dirtyRotation = true;
	coin.mesh.__dirtyRotation = true;
	car.body.__dirtyPosition = true;

	ground.mesh.rotation.z += .001*rotationSpeed;
	forest.mesh.rotation.z += .001*rotationSpeed;
	rock.mesh.rotation.z += .001*rotationSpeed;
	ramp.mesh.rotation.z += .001*rotationSpeed;
	coin.mesh.rotation.z += .001*rotationSpeed;

	coin.mesh.traverse(function(child){
		if(child.name == "coin"){
			child.rotation.z += 0.05;
		}
	});
	// Coins collisions
	var originPoint = car.body.position.clone();
	for (var vertexIndex = 0; vertexIndex < car.body.geometry.vertices.length; vertexIndex++)
	{
		var localVertex = car.body.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( car.body.matrix );
		var directionVector = globalVertex.sub( car.body.position );

		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		for(var i = 0; i < coin.mesh.children.length; i++){
			var collisionResults = ray.intersectObject( coin.mesh.children[i] );
			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
				/*var c = coin.mesh.children[i]
				c.position.lerp( new THREE.Vector3(
					c.position.x,
					c.position.y + 50,
					c.position.z
				), 1 );*/
				// remove coin from memory
				coin.mesh.children[i].geometry.dispose();
				coin.mesh.children[i].material.dispose();
				coin.mesh.children[i].material.map.dispose();
				coin.mesh.remove(coin.mesh.children[i]);
				// coins count increased
				points = coin.nCoins - coin.mesh.children.length;
				coinsCounter.textContent = points;
				console.log("points: "+points);
			}
		}
	}

	car.body.position.x = -100;
	if (!steering) {
		car.body.children[1].rotation.y -= .1*rotationSpeed;
		car.body.children[2].rotation.y -= .1*rotationSpeed;
	}
	car.body.children[3].rotation.y -= .1*rotationSpeed;
	car.body.children[4].rotation.y -= .1*rotationSpeed;
	sky.mesh.rotation.z += .00024;
	TWEEN.update();

	scene.simulate();
/*
	var touches = car.body._physijs.touches;
	if ( touches.length > 1 && (touches.includes(26) || touches.includes(47)) ) {
		health -= 1;
		console.log("health: "+health)
		isGameOn = false;
		setTimeout(resetCar, 3000);
	}
*/
	if (health <= 0){
		gameOver = true;
		//TODO: link to a button that calls restart function
		health = 3;
		if (points > record) {
			record = points;
		}
		setTimeout(function() {
			recordLabel.textContent = "Record: " + record + " coins";
			healthBar.value = health;
			points = 0;
			coinsCounter.textContent = points;
			container.hidden = true;
			gameOnPanel.hidden = true;
			gameOverPanel.hidden = false;
		}, 3000);
	}
	if (points == coin.nCoins){
		win = true;
		health = 3;
		if (points > record) {
			record = points;
		}
		points = 0;
		setTimeout(function() {
			healthBar.value = health;
			coinsCounter.textContent = points;
			container.hidden = true;
			gameOnPanel.hidden = true;
			winPanel.hidden = false;
		}, 3000);
	}
	var worldRotation = new THREE.Quaternion();
	car.body.getWorldQuaternion(worldRotation)
	if (worldRotation.x >0.5 ||
		worldRotation.x < -0.5 ||
		worldRotation.y > 0.5 ||
		worldRotation.y < -0.5)
	{
		if(rotationResetCar_Executed == false){
			isGameOn = false;
			setTimeout(resetCar, 2000);
			rotationResetCar_Executed = true;
		}
	}
	var worldPosition = new THREE.Vector3();
	if (worldPosition.y < -20){
		if(fallingResetCar_Executed == false){
			isGameOn = false;
			setTimeout(resetCar, 1500);
			fallingResetCar_Executed = true;
		}
	}

	camera.position.set(car.body.position.x-100 , car.body.position.y + 70 /*-( dynamicCarPosZ() )*/, car.body.position.z + 200);
	camera.lookAt(car.body.position.x+200,car.body.position.y,car.body.position.z);
	//controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}
