// imu.js

const BUNNY_OBJ_NAME = "bunny";

var curX = 0;
var curY = 0;
var curZ = 0;


var scene    = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
var renderer = new THREE.WebGLRenderer();

var bunnyId = 0;

function initCanvas() {
    camera.position.z = 600;
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    document.getElementById("imuBunny").appendChild(renderer.domElement);
}


function initLights() {
    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );
}

function initBunny() {

    var objLoader = new THREE.OBJLoader();
    objLoader.load('../res/bunny.obj', function (object) {
        object.position.y = -120;
        object.scale.x = 30;
        object.scale.y = 30;
        object.scale.z = 30;
        bunnyId = object.id;
        scene.add(object);
    });
}


function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function rotateBunny(x, y, z) {
    bunny = scene.getObjectById(bunnyId);
    if (bunny != null) {
        // bunny.rotation.x = x;
        // bunny.rotation.y = y;
        // bunny.rotation.z = z;

        bunny.rotateX(THREE.Math.degToRad(x - curX));
        bunny.rotateY(THREE.Math.degToRad(y - curY));
        bunny.rotateZ(THREE.Math.degToRad(z - curZ));

        curX = x;
        curY = y;
        curZ = z;

        // bunny.rotation.order = "YXZ";
        // bunny.applyMatrix( new THREE.Matrix4().makeTranslation(velocityx, velocityy, velocityz) );
        // bunny.applyMatrix( new THREE.Matrix4().makeRotationY( velocityyaw ) );
        // bunny.applyMatrix( new THREE.Matrix4().makeRotationX( velocitypitch ) );
        // bunny.applyMatrix( new THREE.Matrix4().makeRotationZ( velocityroll ) );
    }
}

initCanvas();
initLights();
initBunny();
render(); 



