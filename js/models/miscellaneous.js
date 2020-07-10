import { Colors } from '../colors.js';

function createBoxPhys(x, y, z, posX, posY, posZ, color, transparentBool){
    var geometry = new THREE.BoxGeometry(x, y, z);
    var material = Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
            color: color,
            transparent: transparentBool
        }),
        .5, // medium friction
        .5 // medium restitution
    );
    var box =  new Physijs.BoxMesh(geometry, material);
    box.castShadow = box.receiveShadow = true;
    box.position.set(posX, posY, posZ);
    return box;
}
function createBox(x, y, z, posX, posY, posZ, color, transparentBool){
    var geometry = new THREE.BoxGeometry(x, y, z);
    var material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: transparentBool
        });
    var box = new THREE.Mesh(geometry, material);
    box.castShadow = box.receiveShadow = true;
    box.position.set(posX, posY, posZ);
    return box;
}

function createCylinderPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color) {
    var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom , height, radialSegments);
    var material = Physijs.createMaterial(
        new THREE.MeshPhongMaterial({ color: color }),
        .8, // medium friction
        .2 // medium restitution
    );
    var cylinder = new Physijs.CylinderMesh(geometry, material, 0);
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

function createTrunk(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color){
    var trunk = createCylinderPhys(radiusTop, radiusBottom , height, radialSegments, posX, posY, posZ, color);

    return trunk;
}

var Tree = function(){
    var trunk = createCylinderPhys(5, 5 , 80, 12, 0, 25, 0, Colors.brown);

    this.trunk = trunk;

};

export { Tree/*, Coin, Rock, Ramp*/ };
