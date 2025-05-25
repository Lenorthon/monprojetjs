const express = require('express');
const router = express.Router();
const listings = require('../data/listings.json');

// Route pour récupérer toutes les annonces
router.get('/', (req, res) => {
  res.json(listings);
});

// Route pour récupérer une annonce par son ID
router.get('/:id', (req, res) => {
  const listingId = req.params.id;
  const listing = listings.find(item => item.id.toString() === listingId);
  
  if (listing) {
    res.json(listing);
  } else {
    res.status(404).json({ message: 'Annonce non trouvée' });
  }
});

module.exports = router;

