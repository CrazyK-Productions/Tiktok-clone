const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main(){
  const hash = await bcrypt.hash('password', 10);
  const alice = await prisma.user.upsert({ where: { email: 'alice@example.com' }, update: {}, create: { username: 'alice', email: 'alice@example.com', passwordHash: hash, displayName: 'Alice' } });
  const bob = await prisma.user.upsert({ where: { email: 'bob@example.com' }, update: {}, create: { username: 'bob', email: 'bob@example.com', passwordHash: hash, displayName: 'Bob' } });
  await prisma.post.createMany({ data: [
    { userId: alice.id, videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', caption: 'Sample 1' },
    { userId: alice.id, videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', caption: 'Sample 2' },
    { userId: bob.id, videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', caption: 'Sample 3' },
    { userId: bob.id, videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', caption: 'Sample 4' }
  ]});
  console.log('Seeded');
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
