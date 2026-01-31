import express from 'express';
import Skill from '../models/Skill.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Skill.findAll({ order: [['displayOrder', 'ASC']] });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const item = await Skill.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Skill.update(req.body, { where: { id: req.params.id } });
        const item = await Skill.findByPk(req.params.id);
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Skill.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
