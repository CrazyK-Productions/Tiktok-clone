const express = require('express');
const prisma = require('../lib/prisma');
const auth = require('../middleware/auth');
const router = express.Router();

// feed - simple cursor pagination (createdAt)
router.get('/feed', auth, async (req, res) => {
  const { cursor, limit = 6 } = req.query;
  const where = { visibility: 'public' };
  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: Number(limit) + 1,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {})
  });
  const next = posts.length > limit ? posts[limit].id : null;
  if (posts.length > limit) posts.pop();
  res.json({ posts, next });
});

// create post (after client uploads to storage)
router.post('/', auth, async (req, res) => {
  const { videoUrl, thumbUrl, caption, durationSecs } = req.body;
  if (!videoUrl) return res.status(400).json({ error: 'Missing videoUrl' });
  const post = await prisma.post.create({ data: {
    userId: req.user.id,
    videoUrl,
    thumbUrl,
    caption,
    durationSecs
  }});
  res.json(post);
});

// like
router.post('/:id/like', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.like.create({ data: { userId: req.user.id, postId: id } });
    await prisma.post.update({ where: { id }, data: { likesCount: { increment: 1 } } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Already liked or invalid' });
  }
});

// comment
router.post('/:id/comment', auth, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  const comment = await prisma.comment.create({ data: { postId: id, userId: req.user.id, text } });
  await prisma.post.update({ where: { id }, data: { commentsCount: { increment: 1 } } });
  res.json(comment);
});

module.exports = router;
