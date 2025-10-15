// main.js - SPA router and initialization
import { routerInit, navigateTo } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  routerInit();

  // enhance existing anchor links in nav to use SPA navigation
  document.body.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    // Only intercept internal links (starting with / and not containing http)
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigateTo(href);
    }
  });
});