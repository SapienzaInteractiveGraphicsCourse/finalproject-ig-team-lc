var scene,
		camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	scene = new THREE.Scene();

	// fog effect
	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

	// camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);

	camera.position.set(0, 100, 200);

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

	// if resize, update camera and renderer size
	window.addEventListener('resize', winResize, false);
}

function winResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

var Colors = {
	white:0xd8d0d1,
	brown:0x40230d,
};

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

Ground = function(){

	// create ground cylinder;
	var geometry = new THREE.CylinderGeometry(1300,1300,700,100,10);

	// rotate on x axis
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	// material
	var material = new THREE.MeshPhongMaterial({
		color:Colors.brown,
		transparent:true,
		opacity:.6,
		shading:THREE.FlatShading,
	});

	this.mesh = new THREE.Mesh(geometry, material);

	// ground receive shadows
	this.mesh.receiveShadow = true;
}

var ground;

function createGround(){
	ground = new Ground();
	ground.mesh.position.y = -1300;
	scene.add(ground.mesh);
}

// call init function when window is loaded
window.addEventListener('load', init, false);

function init() {
	createScene();
	createLights();
	createGround();
	loop();
}

function loop(){
	ground.mesh.rotation.z += .005;
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}
