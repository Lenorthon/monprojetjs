fetch('http://localhost:3000/api/listings')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('listing-container');

    data.forEach(listing => {
      const card = document.createElement('a');
      card.className = 'card';
      card.href = `details.html?id=${listing.id}`;
      card.style.textDecoration = 'none';  // Pour enlever le soulignement du lien
      card.style.color = 'inherit';         // Pour garder la couleur du texte normale

      card.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}">
        <div class="card-content">
          <div class="card-title">${listing.title}</div>
          <div class="card-description">${listing.description}</div>
          <div class="card-price">${listing.price} € / nuit</div>
          <div class="card-location">${listing.location}</div>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Erreur lors du chargement des annonces:', err);
  });
  document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const listingsContainer = document.getElementById("listings");

  let listings = [];

  // Charger les annonces depuis l'API
  fetch("/api/listings")
    .then(res => res.json())
    .then(data => {
      listings = data;
      displayListings(listings);
    });

  // Affiche les annonces
  function displayListings(data) {
    listingsContainer.innerHTML = "";

    if (data.length === 0) {
      listingsContainer.innerHTML = "<p>Aucune destination trouvée.</p>";
      return;
    }

    data.forEach(listing => {
      const div = document.createElement("div");
      div.className = "listing";
      div.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}" />
        <h3>${listing.title}</h3>
        <p>${listing.location}</p>
        <p><strong>${listing.price}€/nuit</strong></p>
        <a href="details.html?id=${listing.id}">Voir les détails</a>
      `;
      listingsContainer.appendChild(div);
    });
  }

  // Filtrer les annonces pendant la saisie
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = listings.filter(listing =>
      listing.title.toLowerCase().includes(keyword) ||
      listing.location.toLowerCase().includes(keyword)
    );
    displayListings(filtered);
  });
});

