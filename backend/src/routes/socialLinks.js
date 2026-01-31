import express from 'express';
import SocialLink from '../models/SocialLink.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await SocialLink.findAll({ order: [['displayOrder', 'ASC']] });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const item = await SocialLink.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await SocialLink.update(req.body, { where: { id: req.params.id } });
        const item = await SocialLink.findByPk(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await SocialLink.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
