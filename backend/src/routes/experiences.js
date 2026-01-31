import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Experience.findAll({ order: [['displayOrder', 'ASC']] });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const item = await Experience.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Experience.update(req.body, { where: { id: req.params.id } });
        const item = await Experience.findByPk(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Experience.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
