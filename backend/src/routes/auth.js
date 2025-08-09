const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const router = express.Router();
const { JWT_SECRET, JWT_EXPIRES_IN='7d' } = process.env;

router.post('/signup', async (req, res) => {
  const { username, email, password, displayName } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { username, email, passwordHash: hash, displayName } });
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token, user: { id: user.id, username: user.username } });
});

module.exports = router;
