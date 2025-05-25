const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const bookingsFile = path.join(__dirname, '../data/bookings.json');

// Lire les réservations
function getBookings() {
  return JSON.parse(fs.readFileSync(bookingsFile));
}

// Sauvegarder les réservations
function saveBookings(bookings) {
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
}

// POST /api/bookings
// Body attendu : { listingId, userEmail, startDate, endDate }
router.post('/', (req, res) => {
  const { listingId, userEmail, startDate, endDate } = req.body;
  if (!listingId || !userEmail || !startDate || !endDate) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }
  const bookings = getBookings();
  const newBooking = {
    id: bookings.length + 1,
    listingId,
    userEmail,
    startDate,
    endDate
  };
  bookings.push(newBooking);
  saveBookings(bookings);
  res.status(201).json({ message: 'Réservation enregistrée.', booking: newBooking });
});

module.exports = router;
