import { initThreeScene } from './threeConfig.js';

document.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.querySelector('#three-canvas');
    
    try {
        // Initialize Three.js scene
        const threeScene = initThreeScene(canvas);

        // Initialize custom cursor
        const cursor = document.querySelector('.custom-cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Add hover effects
        document.querySelectorAll('a, button').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });

        // Initialize content loader
        const loadContent = async (type) => {
            try {
                const response = await fetch(`./assets/data/${type}.json`);
                return await response.json();
            } catch (error) {
                console.error(`Error loading ${type}:`, error);
                return null;
            }
        };

        // Load and display content
        const projects = await loadContent('projects');
        console.log('Loaded projects:', projects);

    } catch (error) {
        console.error('Initialization error:', error);
    }
});