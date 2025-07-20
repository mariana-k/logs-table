# Logs Table App

## Prerequisites

- Node.js (v18+ recommended)
- npm
- PostgreSQL database (local or remote)

---

## Deployment

The app is deployed on AWS EC2

### Frontend: 
http://ec2-54-87-144-124.compute-1.amazonaws.com:5173
### Backend: 
http://ec2-54-87-144-124.compute-1.amazonaws.com:4000/api-docs/

## UI Screenshot
<img width="857" height="1006" alt="Screenshot 2025-07-20 at 19 24 41" src="https://github.com/user-attachments/assets/04bf0018-6e60-48e2-99df-bd9ab32fbd2a" />


## Backend Setup

```sh
cd apps/backend
npm install
```

1. **Configure Database:**
   - Copy `.env.example` to `.env` (if present) or create `.env`:
     ```
     DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
     ```
2. **Prisma:**
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```
3. **Run backend:**
   ```sh
   npm run dev
   # or
   npm start
   ```
   - API: http://localhost:4000/logs
   - Swagger: http://localhost:4000/api-docs

---

## Frontend Setup

```sh
cd apps/frontend
npm install
```

1. **Configure API URL:**
   - Create `.env`:
     ```
     VITE_API_URL=http://localhost:4000
     ```
2. **Run frontend:**
   ```sh
   npm run dev
   ```
   - App: http://localhost:5173

---

## Linting

- **Frontend:**
  ```sh
  cd apps/frontend
  npm run lint
  ```
- **Backend:**
  ```sh
  cd apps/backend
  npm run lint
  ```

---

## Notes

- Make sure your database is running and accessible.
- For shadcn/ui or Sonner toasts, see their docs if you want to customize further.
- For production, set proper environment variables and use a process manager (e.g., pm2).
