const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth*0.7,600);
document.getElementById("viewer").appendChild(renderer.domElement);

scene.background = new THREE.Color(0xf2f2f2);

const light1 = new THREE.DirectionalLight(0xffffff,1);
light1.position.set(5,10,7);
scene.add(light1);

scene.add(new THREE.AmbientLight(0xffffff,0.8));

const material = new THREE.MeshStandardMaterial({
color:0xe6e1d9,
roughness:0.8
});

const mannequin = new THREE.Group();


// BODY SHAPE PROFILE (important)
let bodyPoints = [

new THREE.Vector2(0.0,0),
new THREE.Vector2(2.0,0),

new THREE.Vector2(2.2,1.2),  // hip

new THREE.Vector2(1.7,2.5),  // waist

new THREE.Vector2(2.0,3.5),  // bust

new THREE.Vector2(1.8,4.3),  // upper chest

new THREE.Vector2(0.8,4.8)   // neck
];

let bodyGeometry = new THREE.LatheGeometry(bodyPoints,64);

const body = new THREE.Mesh(bodyGeometry,material);
body.position.y = 0;
mannequin.add(body);


// HEAD
const head = new THREE.Mesh(
new THREE.SphereGeometry(0.9,32,32),
material
);

head.position.y = 5.9;
mannequin.add(head);


// NECK
const neck = new THREE.Mesh(
new THREE.CylinderGeometry(0.45,0.5,0.7,32),
material
);

neck.position.y = 5.2;
mannequin.add(neck);


// SIMPLE ARMS

const armMaterial = new THREE.MeshStandardMaterial({
color:0xd8c8b0
});

function createArm(xSide){

const armGroup = new THREE.Group();

const upper = new THREE.Mesh(
new THREE.CylinderGeometry(0.3,0.35,2,16),
armMaterial
);

upper.position.y = 3.5;

const lower = new THREE.Mesh(
new THREE.CylinderGeometry(0.25,0.3,2,16),
armMaterial
);

lower.position.y = 2;

armGroup.add(upper);
armGroup.add(lower);

armGroup.position.x = xSide;

return armGroup;
}

const armLeft = createArm(-2.4);
const armRight = createArm(2.4);

mannequin.add(armLeft);
mannequin.add(armRight);


scene.add(mannequin);

camera.position.z = 9;



// MEASUREMENT CONTROLS

const bust = document.getElementById("bust");
const waist = document.getElementById("waist");
const hip = document.getElementById("hip");
const shoulder = document.getElementById("shoulder");

function updateBody(){

let bustScale = bust.value / 36;
let waistScale = waist.value / 28;
let hipScale = hip.value / 40;
let shoulderScale = shoulder.value / 16;

body.scale.x = (bustScale + hipScale)/2;
body.scale.z = (bustScale + hipScale)/2;

body.scale.y = waistScale;

armLeft.position.x = -2.4 * shoulderScale;
armRight.position.x = 2.4 * shoulderScale;

}

bust.oninput = updateBody;
waist.oninput = updateBody;
hip.oninput = updateBody;
shoulder.oninput = updateBody;



// ANIMATION

function animate(){

requestAnimationFrame(animate);

mannequin.rotation.y += 0.003;

renderer.render(scene,camera);

}

animate();
