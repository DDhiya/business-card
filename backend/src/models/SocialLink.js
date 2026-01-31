import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SocialLink = sequelize.define('SocialLink', {
    platform: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
    },
    label: {
        type: DataTypes.STRING,
    },
    displayOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'social_links'
});

export default SocialLink;
