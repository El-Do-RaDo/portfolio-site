export function initAnimations(threeScene) {
  // GSAP animations for section transitions
  gsap.utils.toArray('.fullscreen-section').forEach((section, i) => {
      ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          onEnter: () => {
              gsap.from(section, {
                  duration: 1,
                  autoAlpha: 0,
                  y: 100,
                  ease: 'power4.out'
              });
          }
      });
  });
}