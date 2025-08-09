const express = require('express');
const prisma = require('../lib/prisma');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, username: true, displayName: true, bio: true, avatarUrl: true } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  const posts = await prisma.post.findMany({ where: { userId: id }, orderBy: { createdAt: 'desc' }, take: 20 });
  res.json({ user, posts });
});

module.exports = router;
