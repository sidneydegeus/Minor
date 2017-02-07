// define variables
var scene, camera, renderer;
var light;
var controls;
var cars = [];
var clock;
var sky;
var sun;

// init function is meant for initializing things such as
// the camera, scene, renderer and meshes
function init() {
    initScene();
    initCamera();
    initRenderer();
    initControls();
    initLight();

    initMeshes();

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
    camera.position.x = 0;
    camera.position.y = 0;
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

function initControls() {
    controls = new THREE.OrbitControls(camera);
    controls.autoRotateSpeed = 2;
    controls.noKeys = true;
}

function initMeshes() {
    initPlane();
    initSun();
    initStreet();

    //Create houses, starts at x-45 every house +3 x for nice placement
    var xPlace = -45;
    for (i = 0; i < 31; i++) {
        if(i % 3 == 0) {
            createTree(xPlace, 1, -2.6);
            createTree(xPlace, 1, 0.4);
        }

        //2 house methods because you need to rotate the house for the front and the back
        createHouseF(xPlace, 1, -5);
        createHouseB(xPlace, 1, 2.8);
        xPlace += 3;
    }

    cars[0] = createCar(-11, 0, -5, true, true); // true is to the right
    cars[1] = createCar(11, 0, -8, false, true); // false is to the left
    cars[2] = createCar(11, 0, -2, false, false); // false is to the left
    //
}

// initLight function initiates the light on the
function initLight() {
    // add hemi lights
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.05 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );

    // this is the Sun
    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 0.75, 1 );
    scene.add( dirLight );
    // dirLight.shadowCameraVisible = true;
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;
    var d = 30;
    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    // the magic is here - this needs to be tweaked if you change dimensions
    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.000001;
    dirLight.shadowDarkness = 0.35;
    scene.add( dirLight );
    scene.fog = new THREE.Fog(0x222233, 0, 20000);
    renderer.setClearColor( scene.fog.color, 1 );

    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
        topColor:    { type: "c", value: new THREE.Color( 0x0077ff ) },
        bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
        offset:      { type: "f", value: 33 },
        exponent:    { type: "f", value: 0.6 }
    }

    uniforms.topColor.value.copy( hemiLight.color );
    scene.fog.color.copy( uniforms.bottomColor.value );
    var skyGeo = new THREE.SphereGeometry( 0,0,0 );
    var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
    sky = new THREE.Mesh( skyGeo, skyMat );
    scene.add( sky );

    clock = new THREE.Clock();
}

function initPlane() {
    var material = new THREE.MeshNormalMaterial({ color : 0x447733 });
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(95, 20), material);
    plane.material.side = THREE.DoubleSide;
    plane.position.x = 0;
    plane.position.y = -1;
    plane.position.z = -6.5;
    // rotating the plane
    plane.rotation.x = Math.PI / 2;
    scene.add(plane)

    var box = new THREE.Box3().setFromObject( plane );
    console.log( box.min, box.max, box.size() );
    console.log(plane.getWorldPosition());
}

function initSun() {
    var geometrySphere = new THREE.SphereGeometry(3, 30, 18);
    var materialPhong = new THREE.MeshPhongMaterial({color: 0xff9900, shininess: 100});
    sun = new THREE.Mesh(geometrySphere, materialPhong);
    sun.position.x = 0;
    sun.position.z = 0;
    sun.position.y = 15;
    scene.add(sun);
}

function initStreet(){
    var cubeGeometry = new THREE.BoxGeometry(93,0.1,1);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff808080});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 0;
    cube.position.y = 0.1;
    cube.position.z = -3.4;
    scene.add(cube);

    var cube2Geometry = new THREE.BoxGeometry(93,0.1,2);
    var cube2Material = new THREE.MeshLambertMaterial({color:  0xffff7f00});
    var cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
    cube2.position.x = 0;
    cube2.position.y = 0.1;
    cube2.position.z = -1;
    scene.add(cube2);

    var cube3Geometry = new THREE.BoxGeometry(93,0.1,1);
    var cube3Material = new THREE.MeshLambertMaterial({color: 0xff808080});
    var cube3 = new THREE.Mesh(cube3Geometry, cube3Material);
    cube3.position.x = 0;
    cube3.position.y = 0.1;
    cube3.position.z = 1.3;
    scene.add(cube3);
}

function createHouseF(xValue, yValue, zValue){
    var cubeGeometry = new THREE.BoxGeometry(2,2,2);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = xValue;
    cube.position.y = yValue;
    cube.position.z = zValue;
    scene.add(cube);

    var doorGeometry = new THREE.BoxGeometry(0.3,0.9,0.1);
    var doorMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.x = xValue;
    door.position.y = yValue - 0.5;
    door.position.z = zValue + 1;
    scene.add(door);

    var windowGeometry = new THREE.BoxGeometry(0.5,0.5,0.1);
    var windowMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.x = xValue - 0.6;
    window.position.y = yValue - 0.5;
    window.position.z = zValue + 1;
    scene.add(window);

    var window2Geometry = new THREE.BoxGeometry(0.5,0.5,0.1);
    var window2Material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var window2 = new THREE.Mesh(window2Geometry, window2Material);
    window2.position.x = xValue - 0.6;
    window2.position.y = yValue + 0.4;
    window2.position.z = zValue + 1;
    scene.add(window2);

    var window3Geometry = new THREE.BoxGeometry(0.5,0.5,0.1);
    var window3Material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var window3 = new THREE.Mesh(window3Geometry, window3Material);
    window3.position.x = xValue + 0.6;
    window3.position.y = yValue + 0.4;
    window3.position.z = zValue + 1;
    scene.add(window3);

    var cylinderGeometry = new THREE.CylinderGeometry(0.1,1.5,0.5);
    var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
    cylinder.position.x = xValue;
    cylinder.position.y = yValue + 1.25;
    cylinder.position.z = zValue + 0.1;
    scene.add(cylinder);
}

function createHouseB(xValue, yValue, zValue){
    var cubeGeometry = new THREE.BoxGeometry(2,2,2);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = xValue;
    cube.position.y = yValue;
    cube.position.z = zValue;
    scene.add(cube);

    var doorGeometry = new THREE.BoxGeometry(0.3,0.9,0.1);
    var doorMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.x = xValue;
    door.position.y = yValue - 0.5;
    door.position.z = zValue - 1.1;
    scene.add(door);

    var windowGeometry = new THREE.BoxGeometry(0.5,0.5,0.1);
    var windowMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.x = xValue + 0.6;
    window.position.y = yValue - 0.5;
    window.position.z = zValue - 1.1;
    scene.add(window);

    var window2Geometry = new THREE.BoxGeometry(0.5,0.5,0.1);
    var window2Material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var window2 = new THREE.Mesh(window2Geometry, window2Material);
    window2.position.x = xValue - 0.6;
    window2.position.y = yValue + 0.4;
    window2.position.z = zValue - 1.1;
    scene.add(window2);

    var window3Geometry = new THREE.BoxGeometry(0.5,0.5,0.1);
    var window3Material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var window3 = new THREE.Mesh(window3Geometry, window3Material);
    window3.position.x = xValue + 0.6;
    window3.position.y = yValue + 0.4;
    window3.position.z = zValue - 1.1;
    scene.add(window3);

    var cylinderGeometry = new THREE.CylinderGeometry(0.1,1.5,0.5);
    var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
    cylinder.position.x = xValue;
    cylinder.position.y = yValue + 1.25;
    cylinder.position.z = zValue + 0.1;
    scene.add(cylinder);
}

function createTree(xValue, yValue, zValue) {
    var cylinderGeometry = new THREE.CylinderGeometry(0.4,0.4,2);
    var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
    cylinder.position.x = xValue;
    cylinder.position.y = yValue;
    cylinder.position.z = zValue;
    scene.add(cylinder);

    var geometrySphere = new THREE.SphereGeometry(0.9, 12, 18);
    var materialLambert = new THREE.MeshLambertMaterial({color: 0x458B00});
    var sphere = new THREE.Mesh(geometrySphere, materialLambert);
    sphere.position.x = xValue;
    sphere.position.y = yValue + 1.5;
    sphere.position.z = zValue;
    scene.add(sphere);
}

/*function initTrees() {
    var cylinderGeometry = new THREE.CylinderGeometry(0.4,0.4,2);
    var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
    cylinder.position.x = 0;
    cylinder.position.y = 0;
    cylinder.position.z = -10;
    scene.add(cylinder);

    var geometrySphere = new THREE.SphereGeometry(.9, 12, 18);
    var materialLambert = new THREE.MeshLambertMaterial({color: 0x888888});
    var sphere = new THREE.Mesh(geometrySphere, materialLambert);
    sphere.position.x = 0;
    sphere.position.y = 1.5;
    sphere.position.z = -10;
    scene.add(sphere);
}*/

function createCar(xValue, yValue, zValue, direction, isDriving) {
    // geometry and mesh for the body of the car
    var geometryCarBody = new THREE.BoxGeometry(1.5, 0.7, 1);
    var material = new THREE.MeshNormalMaterial();
    var carBody = new THREE.Mesh(geometryCarBody, material);
    carBody.position.x = xValue;
    carBody.position.y = yValue -0.5;
    carBody.position.z = zValue;

    // geometry and mesh for the roof of the car
    var geometryCarRoof = new THREE.BoxGeometry(0.7, 0.5, 1);
    var material = new THREE.MeshNormalMaterial();
    var carRoof = new THREE.Mesh(geometryCarRoof, material);
    carRoof.position.x = xValue;
    carRoof.position.y = yValue + 0.1;
    carRoof.position.z = zValue;

    var carLightGeometry = new THREE.CylinderGeometry(0.15, 0.075, 0.15);
    var carLightMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var carLights = [];
    for (var i = 0; i < 2; i++) {
        var carLight = new THREE.Mesh(carLightGeometry, carLightMaterial);
        carLight.position.x = direction ? xValue + .65 : xValue - .65;
        carLight.position.y = yValue;
        carLight.position.z = zValue;
        carLight.rotation.x = Math.PI / 2;
        carLights[i] = carLight;
        scene.add(carLight);
    }

    // geometry and mesh for the wheels of the car
    var wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2);
    var wheelMaterial = new THREE.MeshLambertMaterial({color: 0x5F1700});
    var wheels = [];
    // a car has 4 wheels, so we'll add them to the scene and to an array
    for (var i = 0; i < 4; i++) {
        var wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        if (i == 0 || i == 2) {
            wheel.position.z = zValue + 0.45;
        } else {
            wheel.position.z = zValue - 0.45;
        }
        if (i > 1) {
            wheel.position.x = xValue + 0.45;
        } else {
            wheel.position.x = xValue - 0.45;
        }
        wheel.position.y = -0.82;
        wheel.rotation.x = Math.PI / 2;
        wheels[i] = wheel;
        scene.add(wheel);
    }
    scene.add(carBody);
    scene.add(carRoof);
    // return a new car object with the car body, car roof, car wheels and the direction it's going
    return new car(carBody, carRoof, wheels, direction, isDriving);
}

// a car object that contains specific variables
function car(carBody, carRoof, wheels, direction, isDriving) {
    this.carBody = carBody;
    this.carRoof = carRoof
    this.wheels = wheels;
    this.direction = direction;
    this.isDriving = isDriving;
}

// render function will render the scene
function render() {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    var time = new Date().getTime() * 0.0002;
    changeDayTime(time);
    moveSun(time, delta);
    moveCar();
    // updating the scene based on controls
    controls.update();
    // rendering the scene
    renderer.render(scene, camera);

}

function changeDayTime(time) {
    // var time = 2.1;
    var nsin = Math.sin(time);
    var ncos = Math.cos(time);

    // set the sun
    dirLight.position.set( 1500*nsin, 2000*nsin, 2000*ncos);
    if (nsin > 0.2 ) { // day
        sky.material.uniforms.topColor.value.setRGB(0.25,0.55,1);
        sky.material.uniforms.bottomColor.value.setRGB(1,1,1);
        var f = 1;
        dirLight.intensity = f;
        dirLight.shadowDarkness = f*0.7;
    }
    else if (nsin < 0.2 && nsin > 0.0 ) {
        var f = nsin/0.2;
        dirLight.intensity = f;
        dirLight.shadowDarkness = f*0.7;
        sky.material.uniforms.topColor.value.setRGB(0.25*f,0.55*f,1*f);
        sky.material.uniforms.bottomColor.value.setRGB(1*f, 1*f, 1*f);
    }
    else { // night
        var f = 0;
        dirLight.intensity = f;
        dirLight.shadowDarkness = f*0.7;
        sky.material.uniforms.topColor.value.setRGB(0,0,0);
        sky.material.uniforms.bottomColor.value.setRGB(0,0,0);
    }
}

function moveSun(time, delta) {
    sun.position.z = Math.cos(time) * 20.5;
    sun.position.y = Math.sin(time) * 20.5;
    sun.rotation.x += 6.4 * delta;
}

function moveCar() {
    var moveDirection = 0;
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].isDriving) {

        /*      if(cars[i].carBody.position.x >= 11) {

         } else {

         }*/
            cars[i].direction ? moveDirection = 0.03 : moveDirection = -0.03;
            cars[i].carBody.position.x += moveDirection;
            cars[i].carRoof.position.x += moveDirection;
            cars[i].wheels[0].position.x += moveDirection;
            cars[i].wheels[1].position.x += moveDirection;
            cars[i].wheels[2].position.x += moveDirection;
            cars[i].wheels[3].position.x += moveDirection;
        }
    }
}

// call the init() function
init();
