import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
    try {
        const username = process.env.ADMIN_USERNAME;
        const password = process.env.ADMIN_PASSWORD;

        if (!username || !password) {
            console.error('ADMIN_USERNAME or ADMIN_PASSWORD not found in .env');
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.sync();

        const [user, created] = await User.findOrCreate({
            where: { username },
            defaults: {
                password: hashedPassword
            }
        });

        if (created) {
            console.log(`Admin user '${username}' created successfully.`);
        } else {
            // Update password in case it changed in .env
            user.password = hashedPassword;
            await user.save();
            console.log(`Admin user '${username}' already exists. Password updated.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
};

seedAdmin();
