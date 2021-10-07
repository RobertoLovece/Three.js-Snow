import * as THREE from 'three';
import Particle from './particle.js';
import {SIZE, HEIGHT, NUMBEROFPARTICLES} from '../const.js'

//

import vertex from './shader/vertexShader.glsl';
import fragment from './shader/fragmentShader.glsl';
import { Clock } from 'three';

//

export default class Snow extends THREE.Points {
    constructor() {
        
        super();

        this.particles = [];
        this.geometry = this.initGeometry();
        this.material = this.initMaterial();

    }

    initGeometry() {

        let geometry = new THREE.BufferGeometry();

        var position = new Float32Array(NUMBEROFPARTICLES * 3);
        var rands = new Float32Array(NUMBEROFPARTICLES);
    
        var x, y, z, particle;
    
        for (let i = 0 ; i < NUMBEROFPARTICLES ; i++) {
            // x y z
    
            x = this.getRandomRange(-SIZE/2, SIZE/2);
            y = this.getRandomRange(0.2, HEIGHT);
            z = this.getRandomRange(-SIZE/2, SIZE/2);
    
            position[i * 3] = x;
            position[(i * 3) + 1] = y;
            position[(i * 3) + 2] = z;
    
            particle = new Particle(x, y, z);   
            
            this.particles.push(particle);
    
            rands[i] = this.getRandomRange(2, 4);
        };
    
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(position, 3)
        );
    
        geometry.setAttribute(
            "rands",
            new THREE.BufferAttribute(rands, 1)
        );

        return geometry;

    }

    initMaterial() {
        
        let material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                u_time: { value: 0 } 
            }
        });

        return material;

    }

    getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    update(delta) {

        this.material.uniforms.u_time.value += delta;

        var particle;
        for (let i = 0 ; i < this.particles.length ; i++) {
            particle = this.particles[i]
            particle.updatePosition();

            this.geometry.attributes.position.set([particle.pos.x, particle.pos.y, particle.pos.z], i * 3);
        }

        this.geometry.attributes.position.needsUpdate = true;

    }
}

