// import { ThreeScene } from './threeConfig.js';
import { CustomCursor } from './components/cursor.js';
import { ProjectCards } from './components/projects.js';

class App {
    constructor() {
        this.initThree();
        this.initComponents();
        this.initEventListeners();
    }

    initThree() {
        // Initialize Three.js scene for floating objects
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl') });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create floating objects
        const objects = [];
        for (let i = 0; i < 10; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
            scene.add(sphere);
            objects.push(sphere);
        }

        camera.position.z = 15;

        function animate() {
            requestAnimationFrame(animate);
            objects.forEach(obj => {
                obj.rotation.x += 0.01;
                obj.rotation.y += 0.01;
            });
            renderer.render(scene, camera);
        }
        animate();

        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            objects.forEach((obj, index) => {
                obj.position.y = Math.sin(scrollY * 0.001 + index) * 5;
            });
        });
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

        // Fetch and display project cards
fetch('./assets/data/projects.json')
.then(response => {
    console.log('Fetch response:', response);
    return response.json();
})
.then(data => {
    console.log('Project data:', data);
    const projectsGrid = document.querySelector('.projects__grid');
    if (data.projects) {
        data.projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
            projectsGrid.appendChild(card);
        });

        // Animate cards
        gsap.from('.card', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.projects__grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    } else {
        console.error('Projects data is not in the expected format.');
    }
})
.catch(error => console.error('Error loading projects:', error));

        // Initialize Hammer.js for swipe detection
        const projectsGrid = document.querySelector('.projects__grid');
        const hammer = new Hammer(projectsGrid);

        hammer.on('swipeleft swiperight', (event) => {
            const cards = document.querySelectorAll('.projects__grid .card');
            if (cards.length > 0) {
                const topCard = cards[0];
                gsap.to(topCard, {
                    x: event.type === 'swipeleft' ? '-100%' : '100%',
                    duration: 0.5,
                    onComplete: () => {
                        projectsGrid.appendChild(topCard);
                        gsap.set(topCard, { x: 0 });
                        reorderCards();
                    }
                });
            }
        });

        function reorderCards() {
            const cards = document.querySelectorAll('.projects__grid .card');
            cards.forEach((card, index) => {
                gsap.to(card, {
                    scale: index === 0 ? 1 : 0.95,
                    opacity: index === 0 ? 1 : 0.8,
                    duration: 0.3
                });
            });
        }
    }
}

new App();