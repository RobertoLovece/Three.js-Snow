import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Particle from './src/particle';
import {SIZE, HEIGHT, RESOLUTION} from './src/const.js'

//

import vertex from "./src/shader/vertexShader.glsl";
import fragment from "./src/shader/fragmentShader.glsl";

//

require('normalize.css/normalize.css');
require("./src/css/index.css");

//

let scene, camera, renderer;
let controls, container, stats;
let plane, snow, geometry, material, particles, position;
let clock = new THREE.Clock();

//

window.onload = function () {

    initScene();
    initStats();

    initPlane();
    initSnow();
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

    camera.position.z = 5;
    camera.position.x = 4;
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

function initPlane() {

    let pGeometry = new THREE.PlaneBufferGeometry(SIZE, SIZE, RESOLUTION, RESOLUTION);
    let pMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    });

    plane = new THREE.Mesh(pGeometry, pMaterial);
    plane.rotation.set(-Math.PI / 2, 0, 0);

    scene.add(plane);

}

function initSnow() {

    particles = [];

    const numberOfParticles = 2000;

    geometry = new THREE.BufferGeometry();

    position = new Float32Array(numberOfParticles * 3);
    var rands = new Float32Array(numberOfParticles);

    var x, y, z, particle;

    for (let i = 0 ; i < numberOfParticles ; i++) {
        // x y z

        x = getRandomRange(-SIZE/2, SIZE/2);
        y = getRandomRange(0.2, HEIGHT);
        z = getRandomRange(-SIZE/2, SIZE/2);

        position[i * 3] = x;
        position[(i * 3) + 1] = y;
        position[(i * 3) + 2] = z;

        particle = new Particle(x, y, z);   
        
        particles.push(particle);

        rands[i] = getRandomRange(0.5, 2);
    };

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(position, 3)
    );

    geometry.setAttribute(
        "rands",
        new THREE.BufferAttribute(rands, 1)
    );

    material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
            u_time: { value: 0 } 
        }
    });

    snow = new THREE.Points(geometry, material);

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

    controls.update();
    stats.update();

    material.uniforms.u_time.value += clock.getDelta();
    // geometry.attributes.position.needUpdate = true;

    particles.forEach(function(particle, i) {
        particle.updatePosition();
        position.set([particle.pos.x, particle.pos.y, particle.pos.z], i * 3);
    });

    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

//

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
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
    console.log(geometry.attributes.position);
}   
