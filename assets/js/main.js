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
    }
}

new App();