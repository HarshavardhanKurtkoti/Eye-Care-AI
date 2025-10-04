# Frontend — Vision-AI

This README covers the React + Vite frontend.

## Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

## Run locally (development)
```bash
cd frontend
npm install
npm run dev
```
- Dev server typically runs on `http://localhost:5173`.

## Build for production
```bash
cd frontend
npm run build
```
- Output is placed in `frontend/dist/` (this folder is ignored by Git and Docker).

## Configure API URL
- The frontend expects the backend base URL in an environment variable:
```
VITE_REACT_APP_API_URL=https://your-backend.example.com
```
- Create `frontend/.env` and set the variable for local development. If not set, the frontend defaults to `http://127.0.0.1:5000`.

## Deploy to Vercel
1. Push the `frontend/` directory to GitHub.
2. Create a new project in Vercel and select the `frontend` directory.
3. Set the environment variable `VITE_REACT_APP_API_URL` in the Vercel dashboard to point to your backend URL.
4. Trigger a deploy.

## Notes
- `frontend/node_modules/` and `frontend/dist/` are ignored from Git and Docker builds.
- For local integration testing, run the backend locally or point `VITE_REACT_APP_API_URL` to your backend container URL.

## Reference
See repository `README.md` in project root for full project details and backend deployment instructions.
