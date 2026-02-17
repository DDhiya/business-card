# Business Card App: Reference Implementation & Architecture

This document tracks the implemented architecture of the Business Card project, serving as a reference for future larger-scale applications. It reflects the refactored structure with a separated backend (Express/MySQL) and frontend (React Router v7).

---

## 1. Project Architecture

The project follows a **Client-Server** architecture:

- **Backend**: Node.js/Express.js REST API with MySQL (Sequelize ORM). Serves static assets (uploads) and a server-side rendered Admin Panel (EJS).
- **Frontend**: React Router v7 Single Page Application (SPA). Consumes the backend API.

### File Structure
```
business-card/
├── backend/                # Express.js Application
│   ├── public/             # Admin panel static assets (CSS)
│   ├── src/
│   │   ├── config/         # DB & Passport config
│   │   ├── middleware/     # Auth, API Key, Security
│   │   ├── models/         # Sequelize Models
│   │   ├── routes/         # API & Admin Routes
│   │   ├── views/          # EJS Admin Templates
│   │   └── index.js        # Entry Point
│   └── uploads/            # User uploaded content
│
└── frontend/               # React Router v7 Application
    ├── app/
    │   ├── routes/         # Screen components (Home, etc.)
    │   ├── services/       # API integration layer
    │   └── types/          # TypeScript interfaces
    └── vite.config.ts      # Build & Proxy config
```

---

## 2. Backend Implementation (Express.js)

### 2.1 Core Dependencies
- **Framework**: `express`
- **Database**: `sequelize`, `mysql2`
- **Security**: `helmet` (Headers/CSP), `express-rate-limit` (DDoS protection), `cors`
- **Auth**: `passport`, `passport-local`, `bcryptjs`, `express-session`
- **Templating**: `ejs`, `express-ejs-layouts` (Admin Panel)

### 2.2 Security & Middleware
The backend implements several layers of security:
- **Helmet**: secure HTTP headers (CSP configured for Google Fonts & Inline Scripts).
- **Rate Limiting**: Limited to 1000 requests per 15 minutes window.
- **CORS**: Whitelisted origins (Localhost + Production Domains).
- **API Key**: Custom `requireApiKey` middleware enforces `x-api-key` header for all `/api` routes.
- **Session**: `express-session` backed for Admin Panel authentication.

### 2.3 Database Models (Sequelize)
Located in `backend/src/models/`:
- **Profile**: Personal details, organizations, resume link.
- **Contact**: Email, Phone, Location (with specific icon mapping).
- **SocialLink**: External profiles (LinkedIn, etc.).
- **Experience**: Work history with company logos.
- **Skill**: Tech stack with icons.
- **AboutMe**: Paragraph-based bio sections.

### 2.4 API Routes
Protected by `x-api-key`.
- `GET /api/profile` (Public View)
- CRUD endpoints for `contacts`, `social-links`, `experiences`, `skills`, `about-me`.
- `POST /api/upload`: Multer-based file upload handling.

### 2.5 Admin Panel
Served at `/admin`.
- **Auth**: Protected by Passport.js (`isAuthenticated` middleware). Login required.
- **Views**: EJS templates in `src/views/admin/` with valid layouts.
- **Features**: Full CRUD for all database models, drag-and-drop reordering, file uploads.

---

## 3. Frontend Implementation (React Router)

### 3.1 Core Stack
- **Framework**: React Router v7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Motion (Framer Motion)
- **Utilities**: `qrcode.react`, Lucide React (Icons)

### 3.2 Data Layer
- **Service Pattern**: `app/services/api.ts` centralizes all fetch calls.
- **Loader Pattern**: Uses React Router's `clientLoader` to pre-fetch data before rendering routes.
- **Type Safety**: Shared interfaces in `app/types`.

### 3.3 Dynamic Features
- **VCard Generation**: Dynamically builds `.vcf` files from fetched Contact data.
- **Dynamic Theming**: Uses inline styles mapped to `COLORS` constants for programmatic control (gradients, accents) alongside Tailwind.
- **QR Code**: Modal popup with current page URL.
- **Sharing**: Native `navigator.share` integration.

### 3.4 Development Configuration
- **Proxy**: `vite.config.ts` proxies `/api` and `/uploads` requests to `http://localhost:3001` to avoid CORS issues during dev.

---

## 4. Deployment & Environment

### 4.1 Environment Variables (.env)
**Backend:**
```env
PORT=3001
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=business_card
SESSION_SECRET=your_secret
API_KEY=your_secure_api_key
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### 4.2 Production Considerations
- **Backend**:
  - Run with a process manager (PM2).
  - Reverse proxy via Nginx/Apache.
  - Redirect root `/` to `/admin` or landing page.
- **Frontend**:
  - Build via `npm run build`.
  - Serve static files from `frontend/build/client`.
  - Ensure `_redirects` or Nginx rewrites for SPA routing.

---

## 5. Future Scalability Plan

For larger scale implementations based on this template:

1.  **Auth Expansion**: Switch API Key to JWT (JSON Web Tokens) for client-side authentication if user accounts are needed.
2.  **Database**: Add migrations management for larger teams.
3.  **Testing**: Add Jest/Supertest for Backend API testing and Playwright for Frontend E2E.
4.  **CI/CD**: Implement GitHub Actions for automated linting and deployment.
