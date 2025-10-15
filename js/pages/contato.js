// pages/contato.js
import { validateForm, showFieldError, clearFieldError } from '../utils/validation.js';

export function renderContato() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <section class="contato">
      <h1>Contato</h1>
      <form id="contatoForm" novalidate>
        <div>
          <label for="nome">Nome</label>
          <input id="nome" name="nome" required />
          <small class="error" data-for="nome"></small>
        </div>
        <div>
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required />
          <small class="error" data-for="email"></small>
        </div>
        <div>
          <label for="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" required></textarea>
          <small class="error" data-for="mensagem"></small>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div id="contatoStatus" aria-live="polite"></div>
    </section>
  `;

  const form = document.querySelector('#contatoForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const errors = validateForm(values, {
      nome: { required: true },
      email: { required: true, email: true },
      mensagem: { required: true, minLength: 5 }
    });

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => el.textContent = '');
    form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('invalid'));

    if (Object.keys(errors).length > 0) {
      // show errors
      for (const [field, msg] of Object.entries(errors)) {
        showFieldError(field, msg);
      }
      document.querySelector('#contatoStatus').textContent = 'Corrija os erros e tente novamente.';
      return;
    }

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('contatos') || '[]');
    submissions.push(values);
    localStorage.setItem('contatos', JSON.stringify(submissions));

    document.querySelector('#contatoStatus').textContent = 'Enviado com sucesso!';
    form.reset();
  });

  // simple inline validation on blur
  form.addEventListener('input', (e) => {
    const target = e.target;
    const name = target.name;
    if (!name) return;
    clearFieldError(name);
  });
}