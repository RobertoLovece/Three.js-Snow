import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Snow from './src/snow/snow.js';
import {SIZE, RESOLUTIONX, RESOLUTIONZ} from './src/const.js'

//

require('normalize.css/normalize.css');
require("./src/css/index.css");

//

let scene, camera, renderer;
let controls, container, stats;
let plane, snow;

let clock = new THREE.Clock();

//

window.onload = function () {

    initScene();
    initStats();

    initObjects();
    initControls();

    animate();

}

//

function initScene() {

    scene = new THREE.Scene();

    container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    camera.position.z = 3;
    camera.position.x = 3;
    camera.position.y = 3;
    camera.lookAt(0,0,0)

}

//

function initStats() {

    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    stats = new Stats();
    document.body.appendChild(stats.dom);

}

//

function initObjects() {

    let geometry = new THREE.PlaneBufferGeometry(SIZE, SIZE, RESOLUTIONX, RESOLUTIONZ);
    let material = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    });

    plane = new THREE.Mesh( geometry, material );
    plane.rotation.set(-Math.PI / 2, 0, 0);

    scene.add(plane);

    //

    snow = new Snow();
    scene.add(snow);

}

//

function initControls() {

    controls = new OrbitControls(camera, renderer.domElement);

    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;

}

//

function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();

    controls.update();
    stats.update();

    snow.update(delta);

    renderer.render(scene, camera);
}

//
// EVENT LISTENERS
//

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('click', onClick, false);

//

function onWindowResize() {
    container = document.getElementById('canvas');

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height);
}

//

function onClick(e) {
    // console.log(snow.geometry.attributes.position);
}   
