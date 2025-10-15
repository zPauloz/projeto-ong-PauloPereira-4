// pages/sobre.js
export function renderSobre() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <section class="sobre">
      <h1>Sobre</h1>
      <p>Esta é a página Sobre — carregada via JavaScript (SPA).</p>
    </section>
  `;
}