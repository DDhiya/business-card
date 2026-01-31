import Profile from '../models/Profile.js';
import Contact from '../models/Contact.js';
import SocialLink from '../models/SocialLink.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import AboutMe from '../models/AboutMe.js';
import Section from '../models/Section.js';

const seedData = async () => {
    try {
        // Clear existing data
        await Profile.destroy({ where: {} });
        await Contact.destroy({ where: {} });
        await SocialLink.destroy({ where: {} });
        await Experience.destroy({ where: {} });
        await Skill.destroy({ where: {} });
        await AboutMe.destroy({ where: {} });
        await Section.destroy({ where: {} });

        // Seed Profile
        await Profile.create({
            name: "Dhiyaurrahman Danial",
            title: "IT Executive",
            organization: "Universiti Malaysia Pahang Al-Sultan Abdullah",
            organizationUrl: "https://ditec.umpsa.edu.my/",
            profilePicture: "/uploads/profile.jpg",
            resumeUrl: "/resume.pdf"
        });

        // Seed Contacts
        await Contact.bulkCreate([
            { type: 'email', label: 'UMPSA Email', value: 'dhiyadanial@umpsa.edu.my', link: 'mailto:dhiyadanial@umpsa.edu.my', icon: 'Mail', displayOrder: 1 },
            { type: 'email', label: 'Personal Email', value: 'dhiyadanial@gmail.com', link: 'mailto:dhiyadanial@gmail.com', icon: 'Mail', displayOrder: 2 },
            { type: 'phone', label: 'Phone', value: '+60 14-533 2637', link: 'https://wa.link/iwdz5c', icon: 'Phone', displayOrder: 3 },
            { type: 'location', label: 'Location', value: 'DiTec, UMPSA (Pekan)', link: 'https://maps.app.goo.gl/rHGxYkpvTUEuQ2WQA', icon: 'MapPin', displayOrder: 4 }
        ]);

        // Seed Social Links
        await SocialLink.bulkCreate([
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/dhiyadanial/', icon: 'Linkedin', label: 'LinkedIn', displayOrder: 1 },
            { platform: 'Linktree', url: 'https://linktr.ee/dhiya.danial', icon: 'Globe', label: 'Social Medias', displayOrder: 2 }
        ]);

        // Seed Experiences
        await Experience.bulkCreate([
            {
                companyName: "Universiti Malaysia Pahang Al-Sultan Abdullah",
                companyLogo: "/uploads/logo-umpsa.png",
                role: "IT Executive",
                location: "Pekan, Pahang",
                startDate: "Dec 2025",
                endDate: "Current",
                description: "Leading the Database Unit at Centre for Digital Technology (DiTec) managing Oracle systems, performance tuning, and all database-related projects.",
                displayOrder: 1
            },
            {
                companyName: "Flow Studios Sdn. Bhd.",
                companyLogo: "/uploads/logo-O.png",
                role: "Project Engineer",
                location: "Cyberjaya, Selangor",
                startDate: "Feb 2024",
                endDate: "Nov 2025",
                description: "Developed backend systems, led a mobile app team, handled deployments, and supported IoT R&D installations.",
                displayOrder: 2
            }
        ]);

        // Seed Skills
        await Skill.bulkCreate([
            { name: "Express.js", icon: "Server", displayOrder: 1 },
            { name: "React Router", icon: "Route", displayOrder: 2 },
            { name: "React Native", icon: "Smartphone", displayOrder: 3 },
            { name: "PHP/Laravel", icon: "Code2", displayOrder: 4 },
            { name: "MySQL", icon: "Database", displayOrder: 5 },
            { name: "Oracle DB", icon: "Cylinder", displayOrder: 6 },
            { name: "Arduino/C++ (IoT)", icon: "Cpu", displayOrder: 7 },
            { name: "Python (AI/ML basics)", icon: "BrainCircuit", displayOrder: 8 },
            { name: "Ubuntu", icon: "Terminal", displayOrder: 9 },
            { name: "Git", icon: "GitBranch", displayOrder: 10 }
        ]);

        // Seed About Me
        await AboutMe.bulkCreate([
            { content: "I'm the Head of the Database Unit at the Centre for Digital Technology (DiTec) at UMPSA (Pekan), where I focus on Oracle database performance, backup and recovery, upgrades, and overall system reliability. My role includes planning and coordinating database projects and upgrade initiatives, ensuring data integrity, improving operational stability, and supporting application teams through optimized database architecture and effective troubleshooting.", displayOrder: 1 },
            { content: "Previously at Flow Studios I build full-stack solutions end-to-end, working across backend APIs, frontend interfaces, and mobile applications. Some of the systems I developed and contributed include Pre-Delivery Inspection System (PDI), Farm Management System (FMS) and Air Pressure Monitoring System (APMS). These projects strengthened my experience with Express.js, React, React Native, and embedded IoT systems, allowing me to bridge software, hardware, and data into complete, practical solutions.", displayOrder: 2 }
        ]);

        // Seed Sections
        await Section.bulkCreate([
            { name: 'profile', displayName: 'Profile', displayOrder: 1 },
            { name: 'contacts', displayName: 'Contacts', displayOrder: 2 },
            { name: 'social_links', displayName: 'Social Links', displayOrder: 3 },
            { name: 'experiences', displayName: 'Professional Experience', displayOrder: 4 },
            { name: 'skills', displayName: 'Tech Stack', displayOrder: 5 },
            { name: 'about_me', displayName: 'About Me', displayOrder: 6 }
        ]);

        console.log('Database seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
