# Royalty Studioz — MERN Final Project

**Project Overview**
- **Project:** Royalty Studioz — a MERN-stack web app for sharing short films, testimonies and community content.
- **Purpose:** Final project demonstrating a full-stack MERN application with user authentication, admin moderation, film embedding and story submissions.

**Features**
- **User authentication:** Register and login with JWT-based auth.
- **Role-based access:** Admin users can add films, approve stories and access admin routes.
- **Film listings:** Public films with embed URLs, thumbnails, categories and metadata.
- **Story submissions:** Visitors submit testimonies or prayer requests which admins can approve before publishing.
- **Email (optional):** Welcome email sent after user registration (configurable via environment variables).

**Tech Stack**
- **Frontend:** React (create-react-app), `axios`, `react-router-dom`.
- **Backend:** Node.js + Express.
- **Database:** MongoDB (via `mongoose`).
- **Auth:** JWT (`jsonwebtoken`) and `bcryptjs` for password hashing.

**Repository Structure**
```
client/                 # React front-end (CRA)
server/                 # Express backend
  server.js             # App entry (lightweight test server)
  routes/               # Route modules: auth, films, stories
  models/               # Mongoose models: User, Film, Story
  middleware/           # Auth middleware
  utils/                # Email service helper
```

**Prerequisites**
- Node.js (>= 16 recommended) and npm
- MongoDB instance (local or hosted Atlas)
- Optional: an email SMTP account for welcome emails

**Environment Variables**
Create a `.env` file in the `server/` folder (not committed to source control). Useful variables:

- `PORT` — server port (default: `5000`).
- `MONGODB_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017/royalty-studios` or Atlas URI).
- `JWT_SECRET` — secret used to sign JWT tokens.
- `JWT_EXPIRE` — token expiry (optional, default in code: `30d`).
- `EMAIL_USER` / `EMAIL_PASS` — credentials for SMTP if using the welcome-email feature.

Example `.env` (server):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/royalty-studios
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRE=30d
EMAIL_USER=you@example.com
EMAIL_PASS=your-email-password
```

**Install & Run (Development)**

1. Open two terminal windows.

2. Start the backend server:

```powershell
cd server
npm install
# Start with nodemon for auto-reload while developing
npm run dev
```

3. Start the React client:

```powershell
cd client
npm install
npm start
```

Notes:
- The client `package.json` contains a `proxy` entry pointing to `http://localhost:5000`, so API calls from the React app to `/api/*` are proxied to the server in development.
- Server default port: `5000`.

**Install & Run (Production / Build)**

1. Build the client bundle:

```powershell
cd client
npm run build
```

2. Serve the built static files from Express.

Add the following to the end of `server/server.js` (example):

```javascript
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
```

3. Start the server in production mode:

```powershell
cd server
npm install --production
npm start
```

**Available Scripts**
- Server:
  - `npm run dev` — start the server with `nodemon` for development.
  - `npm start` — run `node server.js` (production).
- Client:
  - `npm start` — start CRA dev server.
  - `npm run build` — build production bundle.

**API Overview**

The backend contains route modules in `server/routes`. The example server entry (`server/server.js`) currently includes lightweight test routes; the route modules are present and can be mounted from `server.js` as shown below.

Mounting example (add to `server/server.js`):

```javascript
app.use('/api/auth', require('./routes/auth'));
app.use('/api/films', require('./routes/films'));
app.use('/api/stories', require('./routes/stories'));
```

Documented endpoints (implemented in `server/routes`):

- `GET /` — basic server status message (exists in `server.js`).
- `GET /api/health` — simple health check.

- Auth (`server/routes/auth.js`):
  - `POST /api/auth/register` — register a new user. Returns user object + token.
  - `POST /api/auth/login` — login with `email` + `password`. Returns user object + token.
  - `GET /api/auth/profile` — (protected) get current user's profile. Requires `Authorization: Bearer <token>` header.

- Films (`server/routes/films.js`):
  - `GET /api/films` — get all public films (sorted newest first).
  - `GET /api/films/:id` — get a single film by ID.
  - `POST /api/films` — create a film (admin-only, protected route).

- Stories (`server/routes/stories.js`):
  - `POST /api/stories` — submit a story (open to visitors).
  - `GET /api/stories` — list approved/published stories.
  - `GET /api/stories/all` — list all stories (admin-only).
  - `PATCH /api/stories/:id/approve` — approve a story (admin-only).

Authentication: Protected endpoints require the HTTP header:

```
Authorization: Bearer <JWT_TOKEN>
```

The server middleware `server/middleware/auth.js` expects a `Bearer` token and injects `req.user` when valid.

**Models (Mongoose)**

- `User` (`server/models/User.js`): `username`, `email`, `password` (hashed), `role` (enum: `user` | `admin`).
- `Film` (`server/models/Film.js`): `title`, `description`, `embedUrl`, `category` (`short-film` | `trailer` | `featured`), `thumbnail`, `duration`, `isPublic`, `uploadedBy` (ref `User`).
- `Story` (`server/models/Story.js`): `name`, `email`, `title`, `story`, `isApproved`, `category` (`testimony` | `prayer-request` | `story-idea`).

**Auth Flow**
- Registration: `POST /api/auth/register` validates input, creates a `User`, returns a JWT token and user info. A welcome email is optionally sent via `utils/emailService.js`.
- Login: `POST /api/auth/login` checks credentials and returns a JWT token.
- Protected routes: Use `Authorization: Bearer <token>` header; `middleware/auth.js` verifies the token and attaches `req.user`.

**Email Service**
- There is a helper in `server/utils/emailService.js`. To enable email sending, set `EMAIL_USER` and `EMAIL_PASS` (or configure your preferred SMTP provider). The `auth` route sends a welcome email after successful registration (non-blocking).

**Development Tips**
- If your `server.js` does not mount routes yet, add the `app.use('/api/...', require(...))` lines shown above.
- Use Postman or HTTPie to test protected routes. Example with `curl`:

```powershell
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/films
```

**Deployment Notes**
- Build the React client (`npm run build`) and let Express serve the static files (example shown in this README).
- For deployment to services like Heroku or Render, ensure the `MONGODB_URI` and `JWT_SECRET` environment variables are set in the service dashboard.
- When deploying to platforms that auto-detect Node, ensure your `start` script in `server/package.json` runs the production server (it runs `node server.js` by default).

**Common Commands (summary)**
- Install server deps: `cd server && npm install`
- Run server (dev): `cd server && npm run dev`
- Install client deps: `cd client && npm install`
- Run client: `cd client && npm start`
- Build client: `cd client && npm run build`

**Contributing**
- Fork the repo, open a branch for your feature/fix, and create a pull request. Keep changes focused and provide a clear description.

**License & Contact**
- This project uses the `ISC` license (see `server/package.json`).
- For questions about this project contact the maintainer or open an issue in the repository.

---

If you want, I can also:
- Add the route mounting code directly to `server/server.js`.
- Wire static serving of the client into the server.
- Add example `.env.example` and `README` badges.

Happy to make those additions — tell me which you'd like next.
