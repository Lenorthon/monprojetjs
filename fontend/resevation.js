// Récupération des params
const params     = new URLSearchParams(window.location.search);
const listingId  = params.get('id');
const title      = params.get('title');
const email      = localStorage.getItem('userEmail');
const errorDiv   = document.getElementById('resError');
const listingTitle = document.getElementById('listingTitle');
const backLink   = document.getElementById('backLink');

// Initialisation
if (!listingId) {
  errorDiv.textContent = 'Annonce introuvable.';
} else {
  listingTitle.textContent = title || '…';
  backLink.href = `details.html?id=${listingId}`;
}

// Envoi de la réservation
document.getElementById('bookBtn').addEventListener('click', () => {
  if (!email) {
    errorDiv.textContent = 'Vous devez être connecté pour réserver.';
    return;
  }
  const startDate = document.getElementById('start').value;
  const endDate   = document.getElementById('end').value;
  if (!startDate || !endDate) {
    errorDiv.textContent = 'Veuillez sélectionner les deux dates.';
    return;
  }

  fetch('http://localhost:3000/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listingId, userEmail: email, startDate, endDate })
  })
  .then(res => res.json().then(data => ({ ok: res.ok, data })))
  .then(({ ok, data }) => {
    if (!ok) {
      errorDiv.textContent = data.message || 'Erreur lors de la réservation';
    } else {
      alert('Réservation confirmée ! 🎉');
      window.location.href = 'account.html';
    }
  })
  .catch(() => {
    errorDiv.textContent = 'Impossible de joindre le serveur';
  });
});
