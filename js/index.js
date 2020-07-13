import { Sky } from './models/sky.js';
import { Ground } from './models/ground.js';
import { Car } from './models/car.js';
import { Tree, Coin, Rock, Ramp } from './models/miscellaneous.js';

Physijs.scripts.worker = './js/physijs_worker.js';
// Physijs.scripts.ammo = '/js/ammo.js';

var scene,
		camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;
var rotationSpeed = 0;
var controls;

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
				case 37:
					// Left
					rotationSpeed -= .5;
					// car.wheel_fl_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, 1, 200 );
					// car.wheel_fr_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, 1, 200 );
					// car.wheel_fl_constraint.enableAngularMotor( 1 );
					// car.wheel_fr_constraint.enableAngularMotor( 1 );
					break;

				case 39:
					// Right
					rotationSpeed += .5;
					// car.wheel_fl_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, -1, 200 );
					// car.wheel_fr_constraint.configureAngularMotor( 1, -Math.PI / 2, Math.PI / 2, -1, 200 );
					// car.wheel_fl_constraint.enableAngularMotor( 1 );
					// car.wheel_fr_constraint.enableAngularMotor( 1 );
					break;

				case 38:
					// Up
					// car.wheel_bl_constraint.configureAngularMotor( 2, 1, 0, 5, 2000 );
					// car.wheel_br_constraint.configureAngularMotor( 2, 1, 0, 5, 2000 );
					// car.wheel_bl_constraint.enableAngularMotor( 2 );
					// car.wheel_br_constraint.enableAngularMotor( 2 );
					break;

				case 40:
					// Down
					// car.wheel_bl_constraint.configureAngularMotor( 2, 1, 0, -5, 2000 );
					// car.wheel_br_constraint.configureAngularMotor( 2, 1, 0, -5, 2000 );
					// car.wheel_bl_constraint.enableAngularMotor( 2 );
					//car.wheel_br_constraint.enableAngularMotor( 2 );
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

var ground, car, tree, coin, rock, ramp;

function createGround(){
	ground = new Ground();
	ground.mesh.position.y = -1300;
	//ground.addIrregularities();
	scene.add(ground.mesh);
}

function createCar(){
	car = new Car();

	// body
	scene.add(car.body);
/*
	// front left wheel
	scene.add(car.wheel_fl);
	var wheel_fl_constraint = new Physijs.DOFConstraint(
		car.wheel_fl, car.body, new THREE.Vector3(car.wheel_fl.position.x, car.wheel_fl.position.y, car.wheel_fl.position.z)
	);
	scene.addConstraint( wheel_fl_constraint );
	wheel_fl_constraint.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
	wheel_fl_constraint.setAngularUpperLimit({ x: 0, y: Math.PI / 8, z: 0 });

	// front right wheel
	scene.add(car.wheel_fr);
	var wheel_fr_constraint = new Physijs.DOFConstraint(
		car.wheel_fr, car.body, new THREE.Vector3(car.wheel_fr.position.x, car.wheel_fr.position.y, car.wheel_fr.position.z)
	);
	scene.addConstraint( wheel_fr_constraint );
	wheel_fr_constraint.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
	wheel_fr_constraint.setAngularUpperLimit({ x: 0, y: Math.PI / 8, z: 0 });

	// back left wheel
	scene.add(car.wheel_bl);
	var wheel_bl_constraint = new Physijs.DOFConstraint(
		car.wheel_bl, car.body, new THREE.Vector3(car.wheel_bl.position.x, car.wheel_bl.position.y, car.wheel_bl.position.z)
	);
	scene.addConstraint( wheel_bl_constraint );
	wheel_bl_constraint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
	wheel_bl_constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });

	// back right wheel
	scene.add(car.wheel_br);
	var wheel_br_constraint = new Physijs.DOFConstraint(
		car.wheel_br, car.body, new THREE.Vector3(car.wheel_br.position.x, car.wheel_br.position.y, car.wheel_br.position.z)
	);
	scene.addConstraint( wheel_br_constraint );
	wheel_br_constraint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
	wheel_br_constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });
*/
}

var sky;
// push down sky to let clouds closer to the ground
function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -1300;
	scene.add(sky.mesh);
}

function createTrees(){
	tree = new Tree();
	scene.add(tree.trunk);
	// Constraints:
	// base of tree to ground
	tree.addConstraint(scene, ground.mesh, new THREE.Vector3( tree.trunk.position.x,
		tree.trunk.position.y - tree.trunk.geometry.parameters.height/2,
		tree.trunk.position.z ));
	// top of tree to ground
	tree.addConstraint(scene, ground.mesh, new THREE.Vector3( tree.trunk.position.x,
		tree.trunk.position.y + tree.trunk.geometry.parameters.height/2,
		tree.trunk.position.z ));
}

function createCoins(){
	coin = new Coin();
	scene.add(coin.coin);

}

function createRocks(){
	rock = new Rock();
	scene.add(rock.rock);
}

function createRamp(){
	ramp = new Ramp();
	scene.add(ramp.ramp);
}

// call init function when window is loaded
window.addEventListener('load', init, false);

function init() {
	createScene();
	createLights();
	createGround();
	createCar();
	createSky();
	createTrees();
	createCoins();
	createRocks();
	createRamp();
	loop();
}

function loop(){
	ground.mesh.__dirtyRotation = true;
	ground.mesh.rotation.z += .0005*rotationSpeed;
	sky.mesh.rotation.z += .00024;
	coin.coin.rotation.y += .05;
	scene.simulate();
	// controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}
