# Business Card App: Backend & Frontend Refactoring Plan

Refactor the current React Router monolithic app into a separated frontend and backend architecture. The backend will be an Express.js API with MySQL via Sequelize, and the frontend will consume it.

---

## Phase 1: Backend Setup & Database Schema

### 1.1 Initialize Express.js Project

#### [NEW] [package.json](file:///c:/laragon/www/business-card/backend/package.json)

```json
{
  "name": "business-card-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "db:migrate": "npx sequelize-cli db:migrate",
    "db:seed": "npx sequelize-cli db:seed:all"
  },
  "dependencies": {
    "express": "^4.21.0",
    "sequelize": "^6.37.0",
    "mysql2": "^3.11.0",
    "dotenv": "^16.4.0",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1",
    "ejs": "^3.1.10",
    "express-session": "^1.18.0",
    "method-override": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "sequelize-cli": "^6.6.2"
  }
}
```

#### [NEW] [src/index.js](file:///c:/laragon/www/business-card/backend/src/index.js)

Main Express server entry point:
- Load environment variables from `.env`
- Initialize Sequelize connection
- **Configure EJS as view engine**
- Register API routes and admin routes
- Configure CORS for frontend (localhost:5173)
- Serve static uploads folder for images
- Listen on port 3001

---

### 1.2 Sequelize Models

Create models in `/backend/src/models/`:

#### [NEW] [models/Profile.js](file:///c:/laragon/www/business-card/backend/src/models/Profile.js)

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-increment |
| name | STRING | "Dhiyaurrahman Danial" |
| title | STRING | "IT Executive" |
| organization | STRING | "Universiti Malaysia Pahang Al-Sultan Abdullah" |
| organizationUrl | STRING | "https://ditec.umpsa.edu.my/" |
| profilePicture | STRING | Path to uploaded image |
| resumeUrl | STRING | "/resume.pdf" |

#### [NEW] [models/Contact.js](file:///c:/laragon/www/business-card/backend/src/models/Contact.js)

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-increment |
| type | ENUM | 'email', 'phone', 'location' |
| label | STRING | "UMPSA Email", "Phone", etc. |
| value | STRING | Display text |
| link | STRING | href URL |
| icon | STRING | Lucide icon name (Mail, Phone, MapPin) |
| displayOrder | INTEGER | Sort order |

#### [NEW] [models/SocialLink.js](file:///c:/laragon/www/business-card/backend/src/models/SocialLink.js)

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-increment |
| platform | STRING | "LinkedIn", "Linktree" |
| url | STRING | Full URL |
| icon | STRING | Lucide icon name |
| label | STRING | Display label |
| displayOrder | INTEGER | Sort order |

#### [NEW] [models/Experience.js](file:///c:/laragon/www/business-card/backend/src/models/Experience.js)

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-increment |
| companyName | STRING | Company name |
| companyLogo | STRING | Path to uploaded logo |
| role | STRING | Job title |
| location | STRING | City, State |
| startDate | STRING | "Dec 2025" |
| endDate | STRING | "Current" or date |
| description | TEXT | Job description |
| displayOrder | INTEGER | Sort order |

#### [NEW] [models/Skill.js](file:///c:/laragon/www/business-card/backend/src/models/Skill.js)

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-increment |
| name | STRING | "Express.js", "React Router", etc. |
| icon | STRING | Lucide icon name |
| displayOrder | INTEGER | Sort order |

#### [NEW] [models/AboutMe.js](file:///c:/laragon/www/business-card/backend/src/models/AboutMe.js)

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-increment |
| content | TEXT | Paragraph text |
| displayOrder | INTEGER | Sort order for paragraphs |

#### [NEW] [models/Section.js](file:///c:/laragon/www/business-card/backend/src/models/Section.js)

> [!NOTE]
> Sections are fixed for now (Contacts, Experience/Skills, About Me). This model is prepared for future CRUD expansion.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Auto-increment |
| name | STRING | Section identifier |
| displayName | STRING | User-facing title |
| displayOrder | INTEGER | Sort order |
| isVisible | BOOLEAN | Toggle visibility |

---

### 1.3 Database Seed Data

#### [NEW] [seeders/initial-data.js](file:///c:/laragon/www/business-card/backend/src/seeders/initial-data.js)

Seed with current hardcoded values from [home.tsx](file:///c:/laragon/www/business-card/app/routes/home.tsx):

**Profile:**
```js
{
  name: "Dhiyaurrahman Danial",
  title: "IT Executive",
  organization: "Universiti Malaysia Pahang Al-Sultan Abdullah",
  organizationUrl: "https://ditec.umpsa.edu.my/",
  profilePicture: "/uploads/profile.jpg",
  resumeUrl: "/resume.pdf"
}
```

**Contacts (5 items):**
1. UMPSA Email - dhiyadanial@umpsa.edu.my
2. Personal Email - dhiyadanial@gmail.com
3. Phone - +60 14-533 2637
4. Location - DiTec, UMPSA (Pekan)

**Social Links (2 items):**
1. LinkedIn - https://www.linkedin.com/in/dhiyadanial/
2. Social Medias - https://linktr.ee/dhiya.danial

**Experiences (2 items):**
1. UMPSA - IT Executive (Dec 2025 - Current)
2. Flow Studios - Project Engineer (Feb 2024 - Nov 2025)

**Skills (10 items):**
Express.js, React Router, React Native, PHP/Laravel, MySQL, Oracle DB, Arduino/C++ (IoT), Python (AI/ML basics), Ubuntu, Git

**About Me (2 paragraphs):**
- Paragraph 1: Database Unit role at DiTec
- Paragraph 2: Flow Studios experience

---

## Phase 2: Backend API Development

### 2.1 API Routes Structure

Create routes in `/backend/src/routes/`:

| Route File | Endpoints |
|------------|-----------|
| profile.js | GET /api/profile, PUT /api/profile |
| contacts.js | GET, POST, PUT, DELETE /api/contacts/:id |
| socialLinks.js | GET, POST, PUT, DELETE /api/social-links/:id |
| experiences.js | GET, POST, PUT, DELETE /api/experiences/:id |
| skills.js | GET, POST, PUT, DELETE /api/skills/:id |
| aboutMe.js | GET, POST, PUT, DELETE /api/about-me/:id |
| upload.js | POST /api/upload |

### 2.2 Controller Pattern

Each route file follows this pattern:

```js
// GET all
router.get('/', async (req, res) => {
  const items = await Model.findAll({ order: [['displayOrder', 'ASC']] });
  res.json(items);
});

// GET one
router.get('/:id', async (req, res) => {
  const item = await Model.findByPk(req.params.id);
  res.json(item);
});

// POST create
router.post('/', async (req, res) => {
  const item = await Model.create(req.body);
  res.status(201).json(item);
});

// PUT update
router.put('/:id', async (req, res) => {
  await Model.update(req.body, { where: { id: req.params.id } });
  const item = await Model.findByPk(req.params.id);
  res.json(item);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Model.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});
```

### 2.3 File Upload Endpoint

#### [NEW] [routes/upload.js](file:///c:/laragon/www/business-card/backend/src/routes/upload.js)

- Use Multer for file handling
- Save to `/backend/uploads/`
- Accept image types: jpg, jpeg, png, gif, webp
- Return uploaded file path

---

## Phase 2.5: EJS Admin Panel

> [!IMPORTANT]
> The admin panel is served at `/admin` from the backend. No authentication is implemented in this phase.

### 2.5.1 Admin Views Structure

Create EJS templates in `/backend/src/views/`:

| View | Purpose |
|------|----------|
| layout.ejs | Base layout with nav, CSS |
| admin/dashboard.ejs | Overview with links to all sections |
| admin/profile.ejs | Edit profile info form |
| admin/contacts.ejs | List/Add/Edit/Delete contacts |
| admin/social-links.ejs | Manage social links |
| admin/experiences.ejs | Manage work experiences |
| admin/skills.ejs | Manage tech stack |
| admin/about-me.ejs | Edit about paragraphs |

### 2.5.2 Admin Routes

#### [NEW] [routes/admin.js](file:///c:/laragon/www/business-card/backend/src/routes/admin.js)

```js
// Dashboard
GET  /admin                    → render dashboard

// Profile
GET  /admin/profile            → render profile form
POST /admin/profile            → update profile

// Contacts (CRUD)
GET  /admin/contacts           → list all contacts
GET  /admin/contacts/new       → new contact form
POST /admin/contacts           → create contact
GET  /admin/contacts/:id/edit  → edit form
POST /admin/contacts/:id       → update (method-override PUT)
POST /admin/contacts/:id/delete → delete (method-override DELETE)

// Same pattern for: social-links, experiences, skills, about-me
```

### 2.5.3 Admin Styling

#### [NEW] [public/admin.css](file:///c:/laragon/www/business-card/backend/public/admin.css)

Simple, clean admin styling:
- Responsive sidebar navigation
- Form styling with consistent inputs
- Table styling for list views
- Flash message styling (success/error)
- Image preview for uploads

### 2.5.4 Layout Template

#### [NEW] [views/layout.ejs](file:///c:/laragon/www/business-card/backend/src/views/layout.ejs)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Business Card Admin</title>
  <link rel="stylesheet" href="/admin.css">
</head>
<body>
  <nav class="admin-nav">
    <a href="/admin">Dashboard</a>
    <a href="/admin/profile">Profile</a>
    <a href="/admin/contacts">Contacts</a>
    <a href="/admin/social-links">Social Links</a>
    <a href="/admin/experiences">Experiences</a>
    <a href="/admin/skills">Skills</a>
    <a href="/admin/about-me">About Me</a>
  </nav>
  <main class="admin-content">
    <%- body %>
  </main>
</body>
</html>
```

### 2.5.5 Example Form Template

#### [NEW] [views/admin/profile.ejs](file:///c:/laragon/www/business-card/backend/src/views/admin/profile.ejs)

```html
<h1>Edit Profile</h1>
<form action="/admin/profile" method="POST" enctype="multipart/form-data">
  <label>Name</label>
  <input type="text" name="name" value="<%= profile.name %>" required>
  
  <label>Title</label>
  <input type="text" name="title" value="<%= profile.title %>">
  
  <label>Organization</label>
  <input type="text" name="organization" value="<%= profile.organization %>">
  
  <label>Profile Picture</label>
  <input type="file" name="profilePicture" accept="image/*">
  <% if (profile.profilePicture) { %>
    <img src="<%= profile.profilePicture %>" width="100">
  <% } %>
  
  <button type="submit">Save</button>
</form>
```

---

## Phase 3: Frontend Refactoring

### 3.1 Move React App to /frontend

Copy these files/folders to `/frontend`:
- `app/` → `/frontend/app/`
- `public/` → `/frontend/public/`
- `package.json` → `/frontend/package.json`
- `vite.config.ts` → `/frontend/vite.config.ts`
- `tsconfig.json` → `/frontend/tsconfig.json`
- `react-router.config.ts` → `/frontend/react-router.config.ts`

### 3.2 Create API Service Layer

#### [NEW] [app/services/api.ts](file:///c:/laragon/www/business-card/frontend/app/services/api.ts)

```typescript
const API_BASE = 'http://localhost:3001/api';

export const api = {
  // Profile
  getProfile: () => fetch(`${API_BASE}/profile`).then(r => r.json()),
  
  // Contacts
  getContacts: () => fetch(`${API_BASE}/contacts`).then(r => r.json()),
  
  // Social Links
  getSocialLinks: () => fetch(`${API_BASE}/social-links`).then(r => r.json()),
  
  // Experiences
  getExperiences: () => fetch(`${API_BASE}/experiences`).then(r => r.json()),
  
  // Skills
  getSkills: () => fetch(`${API_BASE}/skills`).then(r => r.json()),
  
  // About Me
  getAboutMe: () => fetch(`${API_BASE}/about-me`).then(r => r.json()),
  
  // All data for homepage
  getHomeData: async () => {
    const [profile, contacts, socialLinks, experiences, skills, aboutMe] = 
      await Promise.all([
        api.getProfile(),
        api.getContacts(),
        api.getSocialLinks(),
        api.getExperiences(),
        api.getSkills(),
        api.getAboutMe()
      ]);
    return { profile, contacts, socialLinks, experiences, skills, aboutMe };
  }
};
```

### 3.3 Update home.tsx

#### [MODIFY] [home.tsx](file:///c:/laragon/www/business-card/frontend/app/routes/home.tsx)

Changes:
1. Import `api` service and types
2. Use React Router's `loader` function to fetch data server-side
3. Replace all hardcoded values with dynamic data from loader
4. Map over arrays for contacts, experiences, skills, etc.
5. Use backend URLs for images (profile picture, logos)

```tsx
import { api } from '~/services/api';
import type { Route } from "./+types/home";

export async function loader() {
  return await api.getHomeData();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { profile, contacts, socialLinks, experiences, skills, aboutMe } = loaderData;
  // ... render with dynamic data
}
```

### 3.4 Update vcard.ts

#### [MODIFY] [vcard.ts](file:///c:/laragon/www/business-card/frontend/app/utils/vcard.ts)

- Accept profile data as parameter instead of hardcoded values
- Generate vCard dynamically from passed data

```typescript
export const generateVCard = (profile: ProfileData, contacts: ContactData[]) => {
  const emails = contacts.filter(c => c.type === 'email');
  const phones = contacts.filter(c => c.type === 'phone');
  // Build vCard from dynamic data
};
```

### 3.5 TypeScript Types

#### [NEW] [app/types/index.ts](file:///c:/laragon/www/business-card/frontend/app/types/index.ts)

```typescript
export interface Profile {
  id: number;
  name: string;
  title: string;
  organization: string;
  organizationUrl: string;
  profilePicture: string;
  resumeUrl: string;
}

export interface Contact {
  id: number;
  type: 'email' | 'phone' | 'location';
  label: string;
  value: string;
  link: string;
  icon: string;
  displayOrder: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
  label: string;
  displayOrder: number;
}

export interface Experience {
  id: number;
  companyName: string;
  companyLogo: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  displayOrder: number;
}

export interface Skill {
  id: number;
  name: string;
  icon: string;
  displayOrder: number;
}

export interface AboutMe {
  id: number;
  content: string;
  displayOrder: number;
}
```

---

## Phase 4: Testing & Verification

### 4.1 Backend Verification

```bash
# Start backend
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev

# Test endpoints with curl
curl http://localhost:3001/api/profile
curl http://localhost:3001/api/contacts
curl http://localhost:3001/api/experiences
curl http://localhost:3001/api/skills
curl http://localhost:3001/api/about-me
```

### 4.2 Frontend Verification

```bash
# Start frontend
cd frontend
npm install
npm run dev

# Open http://localhost:5173 and verify:
# - Profile info displays correctly
# - All contacts render
# - Work experiences show with logos
# - Skills list populates
# - About me text displays
```

### 4.3 Admin Panel Verification

```bash
# Access admin panel
Open http://localhost:3001/admin

# Verify each section:
# - Dashboard loads with links
# - Profile form saves changes
# - Contacts CRUD works
# - Social links CRUD works
# - Experiences CRUD works (with logo upload)
# - Skills CRUD works
# - About Me paragraphs editable
```

### 4.4 Integration Checklist

- [ ] Backend starts without errors on port 3001
- [ ] All Sequelize models sync correctly
- [ ] Seed data populates database
- [ ] All GET endpoints return correct data
- [ ] POST/PUT/DELETE operations work
- [ ] File uploads save to /uploads and return paths
- [ ] **Admin panel accessible at /admin**
- [ ] **All admin forms save data correctly**
- [ ] Frontend fetches data from backend
- [ ] Homepage renders identically to current version
- [ ] vCard generation uses dynamic data
- [ ] CORS allows frontend requests

---

## File Structure After Refactoring

```
business-card/
├── backend/
│   ├── .env                    # Existing MySQL config
│   ├── package.json
│   ├── uploads/                # Uploaded images
│   │   ├── profile.jpg
│   │   ├── logo-umpsa.png
│   │   └── logo-O.png
│   ├── public/                 # Static assets for admin
│   │   └── admin.css
│   └── src/
│       ├── index.js            # Express entry point
│       ├── config/
│       │   └── database.js     # Sequelize config
│       ├── models/
│       │   ├── index.js        # Model exports
│       │   ├── Profile.js
│       │   ├── Contact.js
│       │   ├── SocialLink.js
│       │   ├── Experience.js
│       │   ├── Skill.js
│       │   ├── AboutMe.js
│       │   └── Section.js
│       ├── routes/
│       │   ├── admin.js        # Admin panel routes
│       │   ├── profile.js
│       │   ├── contacts.js
│       │   ├── socialLinks.js
│       │   ├── experiences.js
│       │   ├── skills.js
│       │   ├── aboutMe.js
│       │   └── upload.js
│       ├── views/              # EJS templates
│       │   ├── layout.ejs
│       │   └── admin/
│       │       ├── dashboard.ejs
│       │       ├── profile.ejs
│       │       ├── contacts.ejs
│       │       ├── social-links.ejs
│       │       ├── experiences.ejs
│       │       ├── skills.ejs
│       │       └── about-me.ejs
│       └── seeders/
│           └── initial-data.js
│
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── react-router.config.ts
    ├── public/
    │   └── resume.pdf
    └── app/
        ├── root.tsx
        ├── routes.ts
        ├── app.css
        ├── services/
        │   └── api.ts
        ├── types/
        │   └── index.ts
        ├── components/
        │   └── QRCodeModal.tsx
        ├── utils/
        │   └── vcard.ts
        └── routes/
            ├── home.tsx
            ├── contact.tsx
            └── about-me.tsx
```

---

## Notes for Executing Agents

1. **Phase execution order is critical** - Complete each phase before moving to the next
2. **Copy static assets** - Move profile.jpg, logo-umpsa.png, logo-O.png to `/backend/uploads/`
3. **Database must be running** - Ensure MySQL is accessible at 127.0.0.1:3306
4. **Preserve UI exactly** - Frontend should look identical after refactoring
5. **Test incrementally** - Verify each API endpoint before frontend integration
