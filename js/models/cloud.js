import { Colors } from '../colors.js';

var Cloud = function(){
	// create a container to hold different parts of the cloud
	this.mesh = new THREE.Object3D();
	var geometry = new THREE.SphereGeometry(20,40,40);
	var loader = new THREE.TextureLoader();
	var material = new THREE.MeshPhongMaterial({ map: loader.load( "textures/clouds.jpg" )});
	material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
	material.map.repeat.set( 1, 1);

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

export { Cloud };
