import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    const scrollDuration = 2000; // Duration of the scroll animation in milliseconds

    const start = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / scrollDuration, 1);
      const easeInOutQuad = (t) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Ease-in-out function
      const scrollPosition = start * (1 - easeInOutQuad(progress));

      window.scrollTo(0, scrollPosition);

      if (timeElapsed < scrollDuration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);
};

export default useSmoothScroll;
