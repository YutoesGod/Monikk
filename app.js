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

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,10,7);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.5));

const material = new THREE.MeshStandardMaterial({
color:0xdddddd
});

const geometry = new THREE.CylinderGeometry(2,2,8,32);
const body = new THREE.Mesh(geometry,material);
scene.add(body);

camera.position.z = 10;

function animate(){
requestAnimationFrame(animate);
renderer.render(scene,camera);
}

animate();

const bust = document.getElementById("bust");
const waist = document.getElementById("waist");
const hip = document.getElementById("hip");
const shoulder = document.getElementById("shoulder");

function updateBody(){

let bustScale = bust.value / 36;
let waistScale = waist.value / 28;
let hipScale = hip.value / 40;

body.scale.x = (bustScale + hipScale)/2;
body.scale.z = (bustScale + hipScale)/2;
body.scale.y = waistScale;

}

bust.oninput = updateBody;
waist.oninput = updateBody;
hip.oninput = updateBody;
shoulder.oninput = updateBody;

document.getElementById("frontView").onclick = () =>{
camera.position.set(0,0,10);
};

document.getElementById("backView").onclick = () =>{
camera.position.set(0,0,-10);
};

document.getElementById("reset").onclick = () =>{
bust.value = 36;
waist.value = 28;
hip.value = 40;
shoulder.value = 16;
updateBody();
};

document.getElementById("exit").onclick = () =>{
window.close();
};
