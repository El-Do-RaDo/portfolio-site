import { ThreeScene } from './threeConfig.js';
import { CustomCursor } from './components/cursor.js';
import { ProjectCards } from './components/projects.js';

class App {
    constructor() {
        this.initThree();
        this.initComponents();
        this.initEventListeners();
    }

    initThree() {
        this.threeScene = new ThreeScene();
        window.addEventListener('resize', () => this.threeScene.onWindowResize());
    }

    initComponents() {
        this.cursor = new CustomCursor();
        this.projects = new ProjectCards();
    }

    initEventListeners() {
        // Magnetic buttons
        document.querySelectorAll('[data-magnetic]').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                gsap.to(btn, {
                    x: x * 20,
                    y: y * 20,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });

        // Custom Cursor
        const cursor = document.querySelector('.cursor');

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Basic GSAP Animation Example
        window.addEventListener('load', () => {
            gsap.from('.hero__title', { duration: 1, y: -50, opacity: 0, ease: 'power3.out' });
            gsap.from('.hero__marquee', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.5 });
        });

        // Placeholder for Three.js 3D Effects
        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild(renderer.domElement);

        // function animate() {
        //     requestAnimationFrame(animate);
        //     renderer.render(scene, camera);
        // }
        // animate();
    }
}

new App();