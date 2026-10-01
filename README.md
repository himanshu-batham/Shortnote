# ShortNote — Full-Stack Note App

A simple, fast note-taking app. JavaScript / MongoDB / Express / React / Node — matches the ShortNote project on your resume.

- Clean layout, notebook-inspired look
- Notes capped at 250 characters (enforced on both frontend and backend)
- Full CRUD: Create, Read, Update, Delete

## Project structure

```
shortnote/
├── backend/          Express API + MongoDB (Mongoose)
│   ├── models/Note.js
│   ├── routes/notes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/         React app (Vite)
    ├── src/
    │   ├── components/NoteForm.jsx
    │   ├── components/NoteCard.jsx
    │   ├── components/NoteList.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Prerequisites

- Node.js 18+
- MongoDB running locally, or a free MongoDB Atlas cluster (get a connection string from atlas.mongodb.com)

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env if your MongoDB URI is different (e.g. paste your Atlas connection string)
npm run dev
```

The API runs on `http://localhost:5000`. Test it's alive by opening that URL — you should see "ShortNote API is running".

## 2. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` and proxies `/api` requests to the backend automatically (configured in `vite.config.js`).

## API reference

| Method | Route             | Description         |
|--------|-------------------|----------------------|
| GET    | /api/notes        | List all notes       |
| GET    | /api/notes/:id    | Get one note         |
| POST   | /api/notes        | Create a note        |
| PUT    | /api/notes/:id    | Update a note        |
| DELETE | /api/notes/:id    | Delete a note        |

Request body for POST/PUT:
```json
{ "title": "Optional title", "content": "Note text, max 250 chars" }
```

## Notes on deploying

- **Backend**: Render, Railway, or Fly.io all support Node + MongoDB easily. Set `MONGO_URI` and `PORT` as environment variables.
- **Frontend**: `npm run build` in `frontend/` produces a static `dist/` folder — deploy it to Vercel, Netlify, or GitHub Pages. Update the axios `baseURL` in `src/api.js` to your deployed backend URL if the frontend and backend aren't on the same domain.
- **Database**: MongoDB Atlas free tier is enough for a project like this.
