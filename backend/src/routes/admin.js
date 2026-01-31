import express from 'express';
import Profile from '../models/Profile.js';
import Contact from '../models/Contact.js';
import SocialLink from '../models/SocialLink.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import AboutMe from '../models/AboutMe.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup for admin uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Login Page
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    }
    res.render('login', {
        title: 'Login',
        layout: false // Don't use the main layout for login
    });
});

// Login Process
router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/admin/login');
    });
});

// Protect all routes below
router.use(isAuthenticated);

// Dashboard
router.get('/', async (req, res) => {
    res.render('admin/dashboard', {
        title: 'Dashboard',
        activePage: 'dashboard'
    });
});

// Profile
router.get('/profile', async (req, res) => {
    const profile = await Profile.findOne();
    res.render('admin/profile', {
        title: 'Edit Profile',
        activePage: 'profile',
        profile: profile || {}
    });
});

router.post('/profile', upload.single('profilePicture'), async (req, res) => {
    try {
        const profile = await Profile.findOne();
        const data = { ...req.body };
        if (req.file) {
            data.profilePicture = `/uploads/${req.file.filename}`;
        }

        if (profile) {
            await profile.update(data);
        } else {
            await Profile.create(data);
        }
        res.redirect('/admin/profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Contacts (CRUD)
router.get('/contacts', async (req, res) => {
    const contacts = await Contact.findAll({ order: [['displayOrder', 'ASC']] });
    res.render('admin/contacts/index', {
        title: 'Manage Contacts',
        activePage: 'contacts',
        contacts
    });
});

router.get('/contacts/new', (req, res) => {
    res.render('admin/contacts/form', {
        title: 'Add Contact',
        activePage: 'contacts',
        contact: {}
    });
});

router.post('/contacts', async (req, res) => {
    try {
        const lastItem = await Contact.findOne({ order: [['displayOrder', 'DESC']] });
        const displayOrder = lastItem ? lastItem.displayOrder + 1 : 0;
        await Contact.create({ ...req.body, displayOrder });
        res.redirect('/admin/contacts');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/contacts/reorder', async (req, res) => {
    try {
        const { order } = req.body;
        for (let i = 0; i < order.length; i++) {
            await Contact.update({ displayOrder: i }, { where: { id: order[i] } });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/contacts/:id/edit', async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);
    res.render('admin/contacts/form', {
        title: 'Edit Contact',
        activePage: 'contacts',
        contact
    });
});

router.put('/contacts/:id', async (req, res) => {
    await Contact.update(req.body, { where: { id: req.params.id } });
    res.redirect('/admin/contacts');
});

router.delete('/contacts/:id', async (req, res) => {
    try {
        await Contact.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/contacts');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Social Links (CRUD)
router.get('/social-links', async (req, res) => {
    const links = await SocialLink.findAll({ order: [['displayOrder', 'ASC']] });
    res.render('admin/social-links/index', {
        title: 'Manage Social Links',
        activePage: 'social-links',
        links
    });
});

router.post('/social-links', async (req, res) => {
    try {
        const lastItem = await SocialLink.findOne({ order: [['displayOrder', 'DESC']] });
        const displayOrder = lastItem ? lastItem.displayOrder + 1 : 0;
        await SocialLink.create({ ...req.body, displayOrder });
        res.redirect('/admin/social-links');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/social-links/:id', async (req, res) => {
    try {
        await SocialLink.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/social-links');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/social-links/reorder', async (req, res) => {
    try {
        const { order } = req.body;
        for (let i = 0; i < order.length; i++) {
            await SocialLink.update({ displayOrder: i }, { where: { id: order[i] } });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/social-links/:id', async (req, res) => {
    try {
        await SocialLink.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/social-links');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Experiences (CRUD)
router.get('/experiences', async (req, res) => {
    const experiences = await Experience.findAll({ order: [['displayOrder', 'ASC']] });
    res.render('admin/experiences/index', {
        title: 'Manage Experiences',
        activePage: 'experiences',
        experiences
    });
});

router.get('/experiences/new', (req, res) => {
    res.render('admin/experiences/form', {
        title: 'Add Experience',
        activePage: 'experiences',
        experience: {}
    });
});

router.post('/experiences', upload.single('companyLogo'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.companyLogo = `/uploads/${req.file.filename}`;

        const lastItem = await Experience.findOne({ order: [['displayOrder', 'DESC']] });
        data.displayOrder = lastItem ? lastItem.displayOrder + 1 : 0;

        await Experience.create(data);
        res.redirect('/admin/experiences');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/experiences/reorder', async (req, res) => {
    try {
        const { order } = req.body;
        for (let i = 0; i < order.length; i++) {
            await Experience.update({ displayOrder: i }, { where: { id: order[i] } });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/experiences/:id/edit', async (req, res) => {
    const experience = await Experience.findByPk(req.params.id);
    res.render('admin/experiences/form', {
        title: 'Edit Experience',
        activePage: 'experiences',
        experience
    });
});

router.put('/experiences/:id', upload.single('companyLogo'), async (req, res) => {
    const data = { ...req.body };
    if (req.file) data.companyLogo = `/uploads/${req.file.filename}`;
    await Experience.update(data, { where: { id: req.params.id } });
    res.redirect('/admin/experiences');
});

router.delete('/experiences/:id', async (req, res) => {
    try {
        await Experience.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/experiences');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Skills (CRUD)
router.get('/skills', async (req, res) => {
    const skills = await Skill.findAll({ order: [['displayOrder', 'ASC']] });
    res.render('admin/skills/index', {
        title: 'Manage Skills',
        activePage: 'skills',
        skills
    });
});

router.post('/skills', async (req, res) => {
    try {
        const lastItem = await Skill.findOne({ order: [['displayOrder', 'DESC']] });
        const displayOrder = lastItem ? lastItem.displayOrder + 1 : 0;
        await Skill.create({ ...req.body, displayOrder });
        res.redirect('/admin/skills');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/skills/:id', async (req, res) => {
    try {
        await Skill.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/skills');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/skills/reorder', async (req, res) => {
    try {
        const { order } = req.body;
        for (let i = 0; i < order.length; i++) {
            await Skill.update({ displayOrder: i }, { where: { id: order[i] } });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/skills/:id', async (req, res) => {
    try {
        await Skill.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/skills');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// About Me
router.get('/about-me', async (req, res) => {
    const paragraphs = await AboutMe.findAll({ order: [['displayOrder', 'ASC']] });
    res.render('admin/about-me/index', {
        title: 'Manage About Me',
        activePage: 'about-me',
        paragraphs
    });
});

router.post('/about-me', async (req, res) => {
    try {
        const lastItem = await AboutMe.findOne({ order: [['displayOrder', 'DESC']] });
        const displayOrder = lastItem ? lastItem.displayOrder + 1 : 0;
        await AboutMe.create({ ...req.body, displayOrder });
        res.redirect('/admin/about-me');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/about-me/:id', async (req, res) => {
    try {
        await AboutMe.update(req.body, { where: { id: req.params.id } });
        res.redirect('/admin/about-me');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/about-me/reorder', async (req, res) => {
    try {
        const { order } = req.body;
        for (let i = 0; i < order.length; i++) {
            await AboutMe.update({ displayOrder: i }, { where: { id: order[i] } });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/about-me/:id', async (req, res) => {
    try {
        await AboutMe.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/about-me');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
