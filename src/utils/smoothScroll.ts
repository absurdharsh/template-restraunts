import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

export function initSmoothScroll(): { lenis: Lenis; cleanup: () => void } | null {
  if (typeof window === 'undefined') return null;

  // Respect reduced motion settings
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  activeLenis = lenis;

  // Connect Lenis to ScrollTrigger
  const handleScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on('scroll', handleScroll);

  // Drive Lenis from GSAP's ticker for perfectly synchronized frames
  const tickerHandler = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerHandler);
  gsap.ticker.lagSmoothing(0);

  // Auto-scroll to hash if present in URL on load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToTarget(window.location.hash, -80);
    }, 150);
  }

  const cleanup = () => {
    gsap.ticker.remove(tickerHandler);
    lenis.off('scroll', handleScroll);
    lenis.destroy();
    activeLenis = null;
  };

  return { lenis, cleanup };
}

export function getActiveLenis(): Lenis | null {
  return activeLenis;
}

export function scrollToTarget(
  target: number | string | HTMLElement,
  offset = 0,
  immediate = false
) {
  if (typeof window === 'undefined') return;

  let targetTop = 0;
  if (typeof target === 'number') {
    targetTop = target;
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      targetTop = el.getBoundingClientRect().top + window.scrollY + offset;
    }
  }

  if (activeLenis) {
    activeLenis.scrollTo(targetTop, { immediate, duration: immediate ? 0 : 1.15 });
  } else {
    window.scrollTo({ top: targetTop, behavior: immediate ? 'instant' : 'smooth' });
  }
}
