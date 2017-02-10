var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
		75, // fov — Camera frustum vertical field of view.
		window.innerWidth / window.innerHeight, // aspect — Camera frustum aspect ratio.
		0.1, // near — Camera frustum near plane.
		10000); // far — Camera frustum far plane.

var renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

var light = new THREE.PointLight(0xffffff);
light.position.set(0, 250, 0);
scene.add(light);

var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var directions = ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'];
var materialArray = [];
for (var i = 0; i < 6; i++) {
	materialArray.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture(directions[i]),
		side: THREE.BackSide
	}));
}

var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skyBox);

/////////////////////////////////////////////////////////

/*var material = new THREE.MeshPhongMaterial({
	color:0xcccccc,
	ambient: 0x444444,
	side: THREE.DoubleSide
});

var loader = new THREE.JSONLoader();
loader.load('teapot.js', function (geometry, materials) {
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
});

var ambientLight = new THREE.AmbientLight(0x404040, 100);
scene.add(ambientLight);

var keyLight = new THREE.DirectionalLight(0xdddddd, .7);
keyLight.position.set(-80, 60, 80);
scene.add(keyLight);

var fillLight = new THREE.DirectionalLight(0x00dd00, .3);
fillLight.position.set(80, 40, 40);
scene.add(fillLight);

var rimLight = new THREE.DirectionalLight(0xdddddd, .6);
rimLight.position.set(-20, 80, -80);
scene.add(rimLight);*/

///////////////////////////////////////////////////////

/*var colorMap = new THREE.ImageUtils.loadTexture('earth.jpg');
var normalMap = new THREE.ImageUtils.loadTexture('earth_normal.jpg');

var material = new THREE.MeshPhongMaterial({
	map: colorMap,
	normalMap: normalMap
});
var geometry = new THREE.SphereGeometry(60, 32, 24);
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var ambientLight = new THREE.AmbientLight(0x404040, 100);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0x404040, 1.5);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);*/

/////////////////////////////////////////////////////////////////

/*var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0)); // lower left
geometry.vertices.push(new THREE.Vector3(2.0, 0.0, 0.0)); // lower right
geometry.vertices.push(new THREE.Vector3(2.0, 1.0, 0.0)); // upper right
var uvs = [];
uvs.push(new THREE.Vector2(0.0, 0.0));
uvs.push(new THREE.Vector2(1.0, 0.0));
uvs.push(new THREE.Vector2(1.0, 1.0));
geometry.faces.push(new THREE.Face3(0, 1, 2));
geometry.faceVertexUvs[0].push([uvs[0], uvs[1], uvs[2]]);

var texture = THREE.ImageUtils.loadTexture('Yellobrk.bmp');
var material = new THREE.MeshBasicMaterial({map: texture});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var light = new THREE.DirectionalLight(0xdddddd, 1);
light.position.set(0, 0, 1);
scene.add(light);
 */

/////////////////////////////////////////////////////////////////////

camera.position.x = 0.5; //move right from center of scene
camera.position.y = -50; //move up from center of scene
camera.position.z = 400; //move camera away from centere of scene

var clock = new THREE.Clock();

var render = function () {
	requestAnimationFrame(render);
	var delta = clock.getDelta();
/*	cube.rotation.x += 3.2 * delta;
	cube.rotation.y += 3.2 * delta;*/
	controls.update();
	renderer.render(scene, camera);
};
render();
