const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const container = document.getElementById('details-container');
const reserveBtn = document.getElementById('reserveBtn'); // Bouton Réserver

if (!id) {
  container.innerHTML = '<p>Maison introuvable.</p>';
  reserveBtn.style.display = 'none';
} else {
  fetch(`http://localhost:3000/api/listings/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('Annonce non trouvée');
      return res.json();
    })
    .then(listing => {
      document.title = `Détails – ${listing.title}`;
      container.innerHTML = `
        <h2>${listing.title}</h2>
        <img src="${listing.image}" alt="${listing.title}" style="max-width:100%; height:auto; border-radius:12px;">
        <p><strong>Prix :</strong> ${listing.price} € / nuit</p>
        <p><strong>Lieu :</strong> ${listing.location}</p>
        <p><strong>Description :</strong><br>${listing.description}</p>
      `;

     
      reserveBtn.href = `reservation.html?id=${listing.id}&title=${encodeURIComponent(listing.title)}`;
    })
    .catch(err => {
      container.innerHTML = `<p>Erreur : ${err.message}</p>`;
      reserveBtn.style.display = 'none';
    });
}

