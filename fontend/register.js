const regError = document.getElementById('error');
document.getElementById('registerBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;

  if (password !== confirm) {
    regError.textContent = 'Les mots de passe ne correspondent pas';
    return;
  }

  fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) {
        regError.textContent = data.message || 'Échec de l’inscription';
      } else {
        alert('Inscription réussie ! Connectez-vous.');
        window.location.href = 'login.html';
      }
    })
    .catch(() => {
      regError.textContent = 'Impossible de joindre le serveur';
    });
});
