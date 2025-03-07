// components/loader.js
export class CustomCursor {
    constructor() {
        this.loader = document.createElement('div');
        this.loader.className = 'loader';
        this.loader.innerHTML = `
            <div class="loader__progress"></div>
            <div class="loader__text">INITIALIZING SYSTEM</div>
        `;
        document.body.appendChild(this.loader);
        
        this.animateLoader();
    }

    animateLoader() {
        gsap.to('.loader__progress', {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to(this.loader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => this.loader.remove()
                });
            }
        });
    }
}