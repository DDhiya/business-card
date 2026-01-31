# Backend & Frontend Refactoring Task

## Phase 1: Backend Setup & Database Schema
- [ ] Initialize Express.js project in `/backend`
- [ ] Configure Sequelize with MySQL connection
- [ ] Define database models (Profile, Contacts, SocialLinks, Experiences, Skills, AboutMe, Sections)
- [ ] Create database migrations
- [ ] Seed initial data from current hardcoded values

## Phase 2: Backend API Development
- [ ] Implement CRUD endpoints for Profile
- [ ] Implement CRUD endpoints for Contacts
- [ ] Implement CRUD endpoints for Social Links
- [ ] Implement CRUD endpoints for Work Experiences
- [ ] Implement CRUD endpoints for Skills
- [ ] Implement CRUD endpoints for About Me
- [ ] Add file upload support for profile pictures and logos
- [ ] Add CORS configuration for frontend

## Phase 2.5: EJS Admin Panel
- [ ] Configure EJS view engine
- [ ] Create layout.ejs with admin navigation
- [ ] Create admin dashboard page
- [ ] Create profile edit form
- [ ] Create contacts CRUD pages
- [ ] Create social links CRUD pages
- [ ] Create experiences CRUD pages (with logo upload)
- [ ] Create skills CRUD pages
- [ ] Create about me edit pages
- [ ] Add admin.css styling

## Phase 3: Frontend Refactoring
- [ ] Move React Router app to `/frontend` directory
- [ ] Update paths and configuration
- [ ] Create API service layer
- [ ] Convert home.tsx to fetch data from backend
- [ ] Update vcard.ts to use dynamic data
- [ ] Test frontend integration with backend

## Phase 4: Testing & Verification
- [ ] Test all CRUD operations via API
- [ ] Verify frontend displays data correctly
- [ ] Test file uploads (profile pictures, logos)
- [ ] End-to-end testing
