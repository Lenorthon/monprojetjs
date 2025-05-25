const emailSpan = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');

// Si pas connecté, on redirige vers login
const email = localStorage.getItem('userEmail');
if (!email) {
  window.location.href = 'login.html';
} else {
  emailSpan.textContent = email;
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('userEmail');
  window.location.href = 'login.html';
});
