const errorDiv = document.getElementById('error');
document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) {
        errorDiv.textContent = data.message || 'Échec de la connexion';
      } else {
        // Sauvegarde l’email en localStorage pour la page compte
        localStorage.setItem('userEmail', email);
        window.location.href = 'account.html';
      }
    })
    .catch(() => {
      errorDiv.textContent = 'Impossible de joindre le serveur';
    });
});
