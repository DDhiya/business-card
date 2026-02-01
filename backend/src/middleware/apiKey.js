import dotenv from 'dotenv';
dotenv.config();

export const requireApiKey = (req, res, next) => {
    // Skip API key check for preflight requests
    if (req.method === 'OPTIONS') {
        return next();
    }

    const apiKey = req.headers['x-api-key'];
    const expectedApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== expectedApiKey) {
        return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }

    next();
};
