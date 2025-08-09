# TikTok-style App — Full Repo (Backend + Expo Mobile)

This is a minimal, ready-to-deploy starter for a short-video app (backend + Expo mobile).
Follow the instructions in `.env.example` and the Backend README section to deploy.

## Structure
- backend/: Express + Prisma backend
- mobile/: Expo React Native app (open in Expo Go)

## Quick start (local)
1. Install Node.js (>=18), npm.
2. Backend:
   - cd backend
   - npm install
   - copy .env.example to .env and fill values (DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY, JWT_SECRET)
   - npx prisma migrate dev --name init
   - node prisma/seed.js
   - npm run dev
3. Mobile:
   - cd mobile
   - npm install
   - edit src/config.js -> set API_BASE_URL to your backend URL (http://localhost:4000 for local)
   - npx expo start
   - open in Expo Go on your phone

## Free deployment
- Database: Neon (free tier) (paste DATABASE_URL into Render)
- Storage: Supabase (free tier) (create bucket and paste SUPABASE_URL & ANON KEY)
- Web host: Render (free web service) or Fly/Vercel

