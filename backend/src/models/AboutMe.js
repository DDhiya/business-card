import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AboutMe = sequelize.define('AboutMe', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    displayOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'about_me'
});

export default AboutMe;
