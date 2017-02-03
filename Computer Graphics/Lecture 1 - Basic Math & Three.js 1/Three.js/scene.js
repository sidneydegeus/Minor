var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75, // field of view
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

var controls = new THREE.OrbitControls(camera);
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.noKeys = true;

var renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);

var materialPhong = new THREE.MeshPhongMaterial({color: 0xaaaaaa, shininess: 100});
var mesh1 = new THREE.Mesh(geometry.clone(), materialPhong);
mesh1.position.x = -2;
scene.add(mesh1);

var geometrySphere = new THREE.SphereGeometry(.6, 24, 18);
var materialLambert = new THREE.MeshLambertMaterial({color: 0x888888});
var mesh2 = new THREE.Mesh(geometrySphere, materialLambert);
mesh2.position.x = 2;
scene.add(mesh2);

var light = new THREE.DirectionalLight(0xffff00, 1);
light.position.set(0, 0, 1);
scene.add(light);

camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;

var clock = new THREE.Clock();

var render = function() {
	requestAnimationFrame(render);
	var delta = clock.getDelta();
	cube.rotation.x += 3.2 * delta;
	cube.rotation.y += 3.2 * delta;
    mesh2.rotation.x += delta;
    mesh2.rotation.y += delta;
	var time = clock.getElapsedTime() * 3;
    cube.position.x = Math.cos(time) * .5;
    cube.position.y = Math.sin(time) * .5;

    controls.update();
	renderer.render(scene, camera);
};

//render(scene, camera);
render();