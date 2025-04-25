import { readable } from 'svelte/store';

export const isMobile = readable(window.innerWidth < 640, (set) => {
  const update = () => set(window.innerWidth < 640);
  window.addEventListener('resize', update);
  return () => window.removeEventListener('resize', update);
});