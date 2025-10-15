// utils/validation.js
export function validateForm(values, rules) {
  const errors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const val = (values[field] || '').trim();
    if (rule.required && !val) {
      errors[field] = 'Campo obrigatório.';
      continue;
    }
    if (rule.email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(val)) errors[field] = 'Email inválido.';
    }
    if (rule.minLength && val.length < rule.minLength) {
      errors[field] = `Mínimo ${rule.minLength} caracteres.`;
    }
  }
  return errors;
}

export function showFieldError(field, message) {
  const small = document.querySelector(`small.error[data-for="${field}"]`);
  if (small) small.textContent = message;
  const input = document.querySelector(`[name="${field}"]`);
  if (input) input.classList.add('invalid');
}

export function clearFieldError(field) {
  const small = document.querySelector(`small.error[data-for="${field}"]`);
  if (small) small.textContent = '';
  const input = document.querySelector(`[name="${field}"]`);
  if (input) input.classList.remove('invalid');
}