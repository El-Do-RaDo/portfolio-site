import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export class ThreeScene {
    constructor() {
        this.init();
        this.createObjects();
        this.setupPostProcessing();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.querySelector('.webgl'),
            antialias: true,
            alpha: true
        });
        
        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        this.pointLight = new THREE.PointLight(0xff0000, 1);
        this.pointLight.position.set(5, 5, 5);
        this.scene.add(this.pointLight);
    }

    createObjects() {
        // Floating geometry
        this.geometries = [];
        const geometryTypes = [THREE.IcosahedronGeometry, THREE.TorusKnotGeometry];
        
        for(let i = 0; i < 5; i++) {
            const geometry = new geometryTypes[i % 2](1.5, 0);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
                metalness: 0.3,
                roughness: 0.2,
                transparent: true,
                opacity: 0.9
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            
            this.scene.add(mesh);
            this.geometries.push(mesh);
        }
    }

    setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.85
        );
        this.composer.addPass(bloomPass);
    }

    animate() {
        this.geometries.forEach((mesh, idx) => {
            mesh.rotation.x += 0.005 * (idx % 2 ? 1 : -1);
            mesh.rotation.y += 0.005 * (idx % 2 ? -1 : 1);
        });

        this.composer.render();
        requestAnimationFrame(this.animate.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }
}