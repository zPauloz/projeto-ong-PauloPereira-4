// pages/home.js
export function renderHome() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <section class="home">
      <h1>Bem-vindo</h1>
      <p>Conteúdo carregado via SPA - Home.</p>
    </section>
  `;
}