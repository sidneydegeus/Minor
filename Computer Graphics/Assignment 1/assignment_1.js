// define variables
var scene, camera, renderer;
var mesh;

// init function is meant for initializing things such as
// the camera, scene, renderer and meshes
function init() {
    initScene();
    initCamera();
    initRenderer()

    initMeshes();
/*    var geometry = new THREE.Box(1, 1, 1);
    var material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);*/

    //

    //renderer.render(scene, camera);
    // call render function once all initialization is complete
    render();
}

// initScene that initiates all scene related things
function initScene() {
    // Initializing Scene
    scene = new THREE.Scene();
}

// initCamera function that initiates all camera related things
function initCamera() {
    // Initializing perspective camera. So that object in distance look further away
    // in order to make the scene more realistic for this assignment
    camera = new THREE.PerspectiveCamera(
        75, // field of view
        window.innerWidth / window.innerHeight, // // aspect — Camera frustum aspect ratio (size of window)
        0.1, // near — Camera frustum near plane.
        3000 // far — Camera frustum far plane.
    );
    // setting position of the camera
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 5;
}

// initRenderer function that initiates all rendere related things
function initRenderer() {
    // Initializing renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    // Adding more properties to the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initMeshes() {
    initPlane();
    initTrees();
    //
}

function initTrees() {
   var cylinderGeometry = new THREE.CylinderGeometry(1,1,2);
    var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff})
    var cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial)


    scene.add(cylinder);
}

function initPlane() {
    var material = new THREE.MeshLambertMaterial({ color : 0x447733 });
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
    plane.material.side = THREE.DoubleSide;
    plane.position.x = 0;
    plane.rotation.z = Math.PI / 2;
    //scene.add(plane)
}

// render function will render the scene
function render() {
    requestAnimationFrame(render);
    // rendering the scene
    renderer.render(scene, camera);

}

// call the init() function
init();
