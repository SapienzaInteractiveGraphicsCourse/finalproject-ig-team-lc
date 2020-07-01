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
	camera.position.set(0, 50, 200);
	camera.lookAt(0, 50, 0)
	camera.up.set(0, 0, 1)

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
	black:0xffffff,
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
	geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	geometry.mergeVertices();

	var l = geometry.vertices.length;

	this.irregularities = [];

	for (var i=0; i<l; i++){
		// get each vertex
		var v = geometry.vertices[i];
		var randomAngle = Math.random() * Math.PI * 2;
		var randomDistance = 5 + Math.random() * 15;

		// store some data associated to it
		this.irregularities.push({y: v.y, x: v.x, z: v.z,
			ang: randomAngle, dis: randomDistance });
	};

	// material
	var material = new THREE.MeshPhongMaterial({
		color:Colors.brown,
		flatShading:THREE.FlatShading,
	});
	this.mesh = new THREE.Mesh(geometry, material);
	// ground receive shadows
	this.mesh.receiveShadow = true;
}

// function that simulate the ground irregularities
Ground.prototype.addIrregularities = function (){
	// get the vertices
	var verts = this.mesh.geometry.vertices;
	var l = verts.length;

	for (var i=0; i<l; i++){
		var v = verts[i];

		// get the data associated to it
		var vprops = this.irregularities[i];

		// update the position of the vertex
		v.x = vprops.x + Math.cos(vprops.ang)*vprops.dis;
		v.y = vprops.y + Math.sin(vprops.ang)*vprops.dis;
	}
}

var ground;

function createGround(){
	ground = new Ground();
	ground.mesh.position.y = -1300;
	ground.addIrregularities();
	scene.add(ground.mesh);
}

Cloud = function(){
	// create a container to hold different parts of the cloud
	this.mesh = new THREE.Object3D();
	var geometry = new THREE.SphereGeometry(20,40,40);
	var material = new THREE.MeshPhongMaterial({
		color:Colors.white,
	});

	// create a random number of spheres
	var nSpheres = 3+Math.floor(Math.random()*3);
	for (var i = 0; i < nSpheres; i++ ){
		var mesh = new THREE.Mesh(geometry, material);

		//random spheres position
		mesh.position.x = i*15;
		mesh.position.y = Math.random()*10;
		mesh.position.z = Math.random()*10;

		// random sphere size
		var s = .1 + Math.random()*.9;
		mesh.scale.set(s,s,s);

		// cast/receive shadows
		mesh.castShadow = true;
		mesh.receiveShadow = true;

		// add sphere to the container
		this.mesh.add(mesh);
	}
}

Sky = function(){
	// container
	this.mesh = new THREE.Object3D();

	// number of clouds
	this.nClouds = 50;

	// distribute clouds
	var stepAngle = Math.PI*2 / this.nClouds;

	// create clouds
	for(var i=0; i<this.nClouds; i++){
		var cloud = new Cloud();

		// rotation and position of each cloud
		var angle = stepAngle*i;
		var height = 1900 + Math.random()*200;

		// polar coordinates to cartesian coordinates
		cloud.mesh.position.y = Math.sin(angle)*height;
		cloud.mesh.position.x = Math.cos(angle)*height;
		// clouds at random depths inside the scene
		cloud.mesh.position.z = -400-Math.random()*400;
		cloud.mesh.rotation.z = angle + Math.PI/2;

		// random scale for each cloud
		var scale = 1+Math.random()*2;
		cloud.mesh.scale.set(scale,scale,scale);

		// add mesh of each cloud to container
		this.mesh.add(cloud.mesh);
	}
}

var sky;
// push down sky to let clouds closer to the ground
function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -1650;
	scene.add(sky.mesh);
}

// call init function when window is loaded
window.addEventListener('load', init, false);

function init() {
	createScene();
	createLights();
	createGround();
	createSky();
	loop();
}

function loop(){
	ground.mesh.rotation.z += .0005;
	sky.mesh.rotation.z += .001;
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}
