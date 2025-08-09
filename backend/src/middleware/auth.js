const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { JWT_SECRET } = process.env;

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing auth' });
  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
