import sequelize from '../config/database.js';
import Profile from '../models/Profile.js';
import Contact from '../models/Contact.js';
import SocialLink from '../models/SocialLink.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import AboutMe from '../models/AboutMe.js';
import Section from '../models/Section.js';

const syncDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all models
        await sequelize.sync({ force: true }); // Use force: true to drop existing tables for a clean start
        console.log('All models were synchronized successfully.');

        process.exit(0);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

syncDB();
