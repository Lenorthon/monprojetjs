const express         = require('express');
const cors            = require('cors');
const bodyParser      = require('body-parser');
const listingsRoutes  = require('./routes/listings');
const authRoutes      = require('./routes/auth');
const bookingsRoutes  = require('./routes/bookings');   // ← ajouté

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/listings', listingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);              // ← ajouté

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
