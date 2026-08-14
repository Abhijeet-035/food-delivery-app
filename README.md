# Food Delivery Website

A full-stack food delivery clone project with separate frontend, admin, and backend apps.

## What changed
- Backend now uses `process.env.MONGO_URI` for MongoDB Atlas or any MongoDB connection string.
- Frontend and admin now use `REACT_APP_API_URL` for the backend API base URL.
- Added `.env.example` files for `backend`, `frontend`, and `admin`.
- Backend CORS is now handled with the `cors` package.

## Local setup

1. Create a MongoDB Atlas cluster or use your own MongoDB URI.
2. Copy `backend/.env.example` to `backend/.env`.
3. Set the values in `backend/.env`:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `STRIPE_SECRET_KEY`
   - `PORT` (optional)
4. Copy `frontend/.env.example` to `frontend/.env`.
5. Copy `admin/.env.example` to `admin/.env`.
6. Set `REACT_APP_API_URL` to your backend URL, for example:
   - `REACT_APP_API_URL=http://localhost:4000`
7. Install packages:
   - `cd backend && npm install`
   - `cd frontend && npm install`
   - `cd admin && npm install`
8. Run locally:
   - `cd backend && npm start`
   - `cd frontend && npm start`
   - `cd admin && npm start`

## Deployment guide

### 1) GitHub
- Push the repository to GitHub.
- Do not commit `.env` files.
- Keep `.env.example` files for documentation.

### 2) Backend deployment (Render / Railway / Vercel Serverless)
- Use a free Node host such as Render or Railway for the backend.
- Set the root directory to `backend`.
- Set the build command to `npm install`.
- Set the start command to `node server.js`.
- Add environment variables in the host dashboard:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `STRIPE_SECRET_KEY`
  - `PORT` (optional)

### 3) Frontend deployment (Vercel)
- Create a new Vercel project from GitHub.
- Choose the `frontend` folder as the project root.
- Set environment variable:
  - `REACT_APP_API_URL=<your backend url>`
- Deploy.

### 4) Admin deployment (Vercel)
- Create another Vercel project from GitHub.
- Choose the `admin` folder as the project root.
- Set the same environment variable:
  - `REACT_APP_API_URL=<your backend url>`
- Deploy.

## Notes
- The database tables/schemas are created automatically by Mongoose when the app writes data.
- For MongoDB Atlas, whitelist your deployment host IP or enable access from anywhere during testing.
- For Stripe, set `STRIPE_SECRET_KEY` with your Stripe secret key.

## Useful files
- `backend/.env.example`
- `frontend/.env.example`
- `admin/.env.example`
