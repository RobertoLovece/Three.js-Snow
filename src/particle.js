import * as THREE from 'three';
import {SIZE, HEIGHT} from './const.js'

export default class Particle extends THREE.Object3D{
    constructor(x, y, z) {

        super();

        this.pos = new THREE.Vector3();        
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;

        this.velX = this.getRandomBetween( 0.005, 0.012 );
        this.gravity = this.getRandomBetween( 0.007, 0.012 );
        this.velZ = this.getRandomBetween( 0.000, 0.005 );

    }

    updatePosition() {

        // x

        // replace variables with constants
        var offsetX = Number(this.pos.x > SIZE/2);
        this.pos.x -= offsetX * SIZE;
        this.pos.x += Math.sin(this.velX); // should times this by a random offset multiplier 

        // y

        var offsetY = Number(this.pos.y < -0.01);
        this.pos.y += offsetY * HEIGHT;
        this.pos.y -= this.gravity; 

        // z
        var offsetZ = Number(this.pos.z > SIZE/2);
        this.pos.z -= offsetZ * SIZE;
        this.pos.z += Math.sin(this.velZ); 

    }

    getRandomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomFavourMax(min, max, bias) {
        return min + (max - min) * Math.pow(Math.random(), bias)
    }
}