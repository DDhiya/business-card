import express from 'express';
import Profile from '../models/Profile.js';
import { apiIsAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// GET profile
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update profile
router.put('/', apiIsAuthenticated, async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (profile) {
            await profile.update(req.body);
            res.json(profile);
        } else {
            const newProfile = await Profile.create(req.body);
            res.status(201).json(newProfile);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
