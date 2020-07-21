import { Sky } from './models/sky.js';
import { Ground } from './models/ground.js';
import { Car } from './models/car.js';
import { Tree, Forest, Coin, Rock, Ramp, CoinSeries } from './models/miscellaneous.js';

Physijs.scripts.worker = './js/physijs_worker.js';
// Physijs.scripts.ammo = '/js/ammo.js';


var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
	HEIGHT, WIDTH, renderer, container;
var rotationSpeed = 0;
var controls;
var axesHelper = new THREE.AxesHelper( 30 );
var steering = false;

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	scene = new Physijs.Scene;
	scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

	// fog effect
	scene.fog = new THREE.Fog(0xdeedff, 100, 950);

	// camera
	fieldOfView = 60;
	aspectRatio = WIDTH / HEIGHT;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);
	camera.position.set(0, 50, 200);
	camera.lookAt(0, 50, 0)
	camera.up.set(0, 1, 0)

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
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.update();

	// if resize, update camera and renderer size
	window.addEventListener('resize', winResize, false);

	window.addEventListener(
		'keydown',
		function( ev ) {
			switch( ev.keyCode ) {
				case 39:
					// Right arrow: start
					if (rotationSpeed < 1.5) {
						rotationSpeed += .5;
					}
					break;

				case 38:
					// Up: left steering
					steering = true;
					car.body.__dirtyRotation = true;
					car.body.__dirtyPosition = true;

					// wheels turn left
					var rotation = 0;
					var target_rotation = -.5;
					var tween_wheels = new TWEEN.Tween(rotation).to(target_rotation, 2000);

					tween_wheels.onUpdate(function(){
						car.body.children[1].rotation.z = rotation;
						car.body.children[2].rotation.z = rotation;
					});

					// car turns left
					// car.body.rotation.y = .2;

					// car goes left
					// car.body.position.z -= 10;
					break;

				case 40:
					// Down: turn right
					steering = true;
					car.body.__dirtyRotation = true;
					car.body.__dirtyPosition = true;
					car.body.children[1].rotation.y = 0;
					car.body.children[2].rotation.y = 0;
					car.body.children[1].rotation.z = .5;
					car.body.children[2].rotation.z = .5;
					// car.body.rotation.y = -.2;
					// car.body.position.z += 10;
					break;
			}
		}
	);

	document.addEventListener(
		'keyup',
		function( ev ) {
			switch( ev.keyCode ) {
				case 39:
					// Right: stop
					rotationSpeed = .5;
					break;
				case 38:
					// Up: turn left
					steering = false;
					car.body.__dirtyRotation = true;
					// car.body.children[1].rotation.z = 0;
					// car.body.children[2].rotation.z = 0;
					car.body.rotation.y = 0;
					break;

				case 40:
					// Down: turn right
					steering = false;
					car.body.__dirtyRotation = true;
					car.body.children[1].rotation.z = 0;
					car.body.children[2].rotation.z = 0;
					car.body.rotation.y = 0;
					break;
			}
		}
	);
}

function winResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

// LIGHTS
var hemisphereLight, shadowLight;

function createLights() {
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	shadowLight = new THREE.DirectionalLight(0xffffff, .9);
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;

	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	scene.add(hemisphereLight);
	scene.add(shadowLight);
}

var ground, car, sky, forest, rock, coin, ramp, coinSeries;

function createGround(){
	ground = new Ground();
	ground.mesh.position.y = -1300;
	scene.add(ground.mesh);
}

function createCar(){
	car = new Car();
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


		/*
		tree.addConstraint(scene, ground.mesh,
			new THREE.Vector3(
				tree.trunk.position.x,
				tree.trunk.position.y - tree.trunk.geometry.parameters.height/2,
				tree.trunk.position.z
			)
		);
		// top of tree to ground
		tree.addConstraint(scene, ground.mesh,
			new THREE.Vector3(
				tree.trunk.position.x,
				tree.trunk.position.y + tree.trunk.geometry.parameters.height/2,
				tree.trunk.position.z
			)
		);*/

	/*
			// base of tree to ground
			tree.addConstraint(scene, ground.mesh,
				new THREE.Vector3(
					tree.trunk.position.x,
					tree.trunk.position.y - tree.trunk.geometry.parameters.height/2,
					tree.trunk.position.z
				)
			);
			// top of tree to ground
			tree.addConstraint(scene, ground.mesh,
				new THREE.Vector3(
					tree.trunk.position.x,
					tree.trunk.position.y + tree.trunk.geometry.parameters.height/2,
					tree.trunk.position.z
				)
			);
	*/

	//forest.forest.position.y = -1300;
	//scene.add(forest.forest);


/*
	for( var i = 0; i < forest.nTrees; i++){
		forest.forest.children[i].addConstraint(scene, ground.mesh, new THREE.Vector3( forest.forest.children[i].position.x,
			forest.forest.children[i].position.y - forest.forest.children[i].geometry.parameters.height/2,
			forest.forest.children[i].position.z ));
		forest.forest.children[i].addConstraint(scene, ground.mesh, new THREE.Vector3( forest.children[i].position.x,
			forest.forest.children[i].position.y + forest.forest.children[i].geometry.parameters.height/2,
			forest.forest.children[i].position.z ));
	}


	// base of tree to ground
	tree.addConstraint(scene, ground.mesh, new THREE.Vector3( tree.trunk.position.x,
		tree.trunk.position.y - tree.trunk.geometry.parameters.height/2,
		tree.trunk.position.z ));
	// top of tree to ground
	tree.addConstraint(scene, ground.mesh, new THREE.Vector3( forest.trunk.position.x,
		tree.trunk.position.y + tree.trunk.geometry.parameters.height/2,
		tree.trunk.position.z ));
*/
}



function createCoins(){
	coin = new Coin();
	coin.mesh.position.y = -1300;
	scene.add(coin.mesh);
	//coin.mesh.add( axesHelper );
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
function createCoinSeries(){
	coinSeries = new CoinSeries;
	scene.add(coinSeries.mesh);
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
	createCoinSeries();

	loop();
}

function loop(){
	ground.mesh.__dirtyRotation = true;
	forest.mesh.__dirtyRotation = true;
	rock.mesh.__dirtyRotation = true;
	ramp.mesh.__dirtyRotation = true;
	coin.mesh.__dirtyRotation = true;
	//ramp.ramp.__dirtyRotation = true;
	ground.mesh.rotation.z += .001*rotationSpeed; // lower speed make car pass through tree meshes
	forest.mesh.rotation.z += .001*rotationSpeed;
	rock.mesh.rotation.z += .001*rotationSpeed;
	ramp.mesh.rotation.z += .001*rotationSpeed;
	coin.mesh.rotation.z += .001*rotationSpeed;
	coin.mesh.traverse(function(child){
		if(child.name == "coin"){
			child.rotation.z += 0.05;
		}
	})
	if (!steering) {
		car.body.children[1].rotation.y -= .1*rotationSpeed;
		car.body.children[2].rotation.y -= .1*rotationSpeed;
	}
	car.body.children[3].rotation.y -= .1*rotationSpeed;
	car.body.children[4].rotation.y -= .1*rotationSpeed;
	sky.mesh.rotation.z += .00024;
	//coin.coin.rotation.y += .05;

	/*
	ground.mesh.traverse(function(child){
		if(child.name == "coin"){
			child.rotation.z += 0.05;
		}
	})
	*/

	scene.simulate();
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}
