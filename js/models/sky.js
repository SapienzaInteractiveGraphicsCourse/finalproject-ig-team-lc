import { Cloud } from './cloud.js';

const CloudHeight = 1500;

function rangedRandom(min, max){
    return Math.random() * (max-min+1) + min;
}

var Sky = function(){
	// container
	this.mesh = new THREE.Group();
    this.mesh.name = "skyGroup";

	// number of clouds
	this.nClouds = 60;

	// distribute clouds
	var stepAngle = Math.PI*2 / this.nClouds;

	// create clouds
	for(var i=0; i<this.nClouds; i++){
		var cloud = new Cloud();

		// rotation and position of each cloud
		var angle = stepAngle*i;
		var height = CloudHeight + Math.random()*200;

		// polar coordinates to cartesian coordinates
		cloud.mesh.position.y = Math.sin(angle)*height;
		cloud.mesh.position.x = Math.cos(angle)*height;
		// clouds at random depths inside the scene
		cloud.mesh.position.z = rangedRandom(-500, 200);
		cloud.mesh.rotation.z = angle + Math.PI/2;

		// random scale for each cloud
		var scale = 1+Math.random()*2;
		cloud.mesh.scale.set(scale,scale,scale);

		// add mesh of each cloud to container
		this.mesh.add(cloud.mesh);
	}
}

export { Sky };
