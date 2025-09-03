# React Property Listings (Vite + Tailwind) + json-server

This is a monorepo containing a React frontend (Vite + Tailwind) and a json-server backend.
It uses npm workspaces so you can install all dependencies from the root.

## Quick start (VS Code)
1. ```bash
   npm install
   npm run start
   ```
   This installs workspace dependencies and runs both the json-server and the frontend simultaneously.

2. Open the frontend URL printed by Vite (usually http://localhost:5173) and json-server runs on http://localhost:4000 (GET /api/properties).

## Structure
- frontend/  -> React + Tailwind app (Vite)
- backend/   -> json-server (db.json with sample data)

## Notes
- API endpoints:
  - GET http://localhost:4000/api/properties
  - POST http://localhost:4000/api/properties

- If you change ports or want to run separately:
  - `npm --workspace=backend run start`
  - `npm --workspace=frontend run dev`

Enjoy! 🎉
