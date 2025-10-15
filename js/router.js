// router.js - basic SPA router using History API and templates
import { renderHome } from './pages/home.js';
import { renderContato } from './pages/contato.js';
import { renderSobre } from './pages/sobre.js';

const routes = {
  '/': renderHome,
  '/contato': renderContato,
  '/sobre': renderSobre
};

export function routerInit() {
  // Ensure there is a main#app
  let app = document.querySelector('#app');
  if (!app) {
    app = document.createElement('main');
    app.id = 'app';
    // move existing main content if present
    const existingMain = document.querySelector('main');
    if (existingMain) {
      app.innerHTML = existingMain.innerHTML;
      existingMain.replaceWith(app);
    } else {
      document.body.appendChild(app);
    }
  }

  // load initial route
  const path = window.location.pathname === '/' ? '/' : window.location.pathname;
  navigateTo(path, {replace: true});

  window.addEventListener('popstate', () => {
    const p = window.location.pathname;
    const fn = routes[p] || routes['/'];
    fn();
  });
}

export function navigateTo(path, options = {}) {
  const fn = routes[path] || routes['/'];
  if (!options.replace) {
    window.history.pushState({}, '', path);
  } else {
    window.history.replaceState({}, '', path);
  }
  fn();
}