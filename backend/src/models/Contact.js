import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Contact = sequelize.define('Contact', {
    type: {
        type: DataTypes.ENUM('email', 'phone', 'location'),
        allowNull: false
    },
    label: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
    },
    icon: {
        type: DataTypes.STRING,
    },
    displayOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'contacts'
});

export default Contact;
