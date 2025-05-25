const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const router = express.Router();

const usersFile = './backend/data/users.json';

// Lire les utilisateurs
function getUsers() {
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

// Sauvegarder les utilisateurs
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 🔐 Inscription
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email déjà utilisé.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  saveUsers(users);

  res.status(201).json({ message: 'Utilisateur enregistré.' });
});

// 🔑 Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Utilisateur non trouvé.' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Mot de passe incorrect.' });
  }

  res.status(200).json({ message: 'Connexion réussie.' });
});

module.exports = router;
