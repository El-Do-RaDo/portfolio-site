// components/projects.js
export class ProjectCards {
    constructor() {
        this.initCards();
        this.initHoverEffects();
    }

    initCards() {
        this.cards = document.querySelectorAll('.project-card');
        this.cards.forEach(card => {
            const inner = document.createElement('div');
            inner.className = 'project-card__inner';
            inner.innerHTML = `
                <div class="project-card__front">
                    <img src="${card.dataset.image}" alt="${card.dataset.title}">
                </div>
                <div class="project-card__back">
                    <h3>${card.dataset.title}</h3>
                    <p>${card.dataset.description}</p>
                </div>
            `;
            card.appendChild(inner);
        });
    }

    initHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                gsap.to(card.querySelector('.project-card__inner'), {
                    rotationY: (x - centerX) * 0.05,
                    rotationX: (y - centerY) * -0.05,
                    transformPerspective: 1000,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card.querySelector('.project-card__inner'), {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }
}