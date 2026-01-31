import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Experience = sequelize.define('Experience', {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyLogo: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
    },
    startDate: {
        type: DataTypes.STRING,
    },
    endDate: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    displayOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'experiences'
});

export default Experience;
