import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
    },
    organization: {
        type: DataTypes.STRING,
    },
    organizationUrl: {
        type: DataTypes.STRING,
    },
    profilePicture: {
        type: DataTypes.STRING,
    },
    resumeUrl: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'profiles'
});

export default Profile;
