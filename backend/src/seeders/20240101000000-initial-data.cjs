'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        // Seed Profile
        await queryInterface.bulkInsert('profiles', [{
            name: "Dhiyaurrahman Danial",
            title: "IT Executive",
            organization: "Universiti Malaysia Pahang Al-Sultan Abdullah",
            organizationUrl: "https://ditec.umpsa.edu.my/",
            profilePicture: "/uploads/profile.jpg",
            resumeUrl: "/resume.pdf",
            createdAt: now,
            updatedAt: now
        }], {});

        // Seed Contacts
        await queryInterface.bulkInsert('contacts', [
            { type: 'email', label: 'UMPSA Email', value: 'dhiyadanial@umpsa.edu.my', link: 'mailto:dhiyadanial@umpsa.edu.my', icon: 'Mail', displayOrder: 1, createdAt: now, updatedAt: now },
            { type: 'email', label: 'Personal Email', value: 'dhiyadanial@gmail.com', link: 'mailto:dhiyadanial@gmail.com', icon: 'Mail', displayOrder: 2, createdAt: now, updatedAt: now },
            { type: 'phone', label: 'Phone', value: '+60 14-533 2637', link: 'https://wa.link/iwdz5c', icon: 'Phone', displayOrder: 3, createdAt: now, updatedAt: now },
            { type: 'location', label: 'Location', value: 'DiTec, UMPSA (Pekan)', link: 'https://maps.app.goo.gl/rHGxYkpvTUEuQ2WQA', icon: 'MapPin', displayOrder: 4, createdAt: now, updatedAt: now }
        ], {});

        // Seed Social Links
        await queryInterface.bulkInsert('social_links', [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/dhiyadanial/', icon: 'Linkedin', label: 'LinkedIn', displayOrder: 1, createdAt: now, updatedAt: now },
            { platform: 'Linktree', url: 'https://linktr.ee/dhiya.danial', icon: 'Globe', label: 'Social Medias', displayOrder: 2, createdAt: now, updatedAt: now }
        ], {});

        // Seed Experiences
        await queryInterface.bulkInsert('experiences', [
            {
                companyName: "Universiti Malaysia Pahang Al-Sultan Abdullah",
                companyLogo: "/uploads/logo-umpsa.png",
                role: "IT Executive",
                location: "Pekan, Pahang",
                startDate: "Dec 2025",
                endDate: "Current",
                description: "Leading the Database Unit at Centre for Digital Technology (DiTec) managing Oracle systems, performance tuning, and all database-related projects.",
                displayOrder: 1,
                createdAt: now,
                updatedAt: now
            },
            {
                companyName: "Flow Studios Sdn. Bhd.",
                companyLogo: "/uploads/logo-O.png",
                role: "Project Engineer",
                location: "Cyberjaya, Selangor",
                startDate: "Feb 2024",
                endDate: "Nov 2025",
                description: "Developed backend systems, led a mobile app team, handled deployments, and supported IoT R&D installations.",
                displayOrder: 2,
                createdAt: now,
                updatedAt: now
            }
        ], {});

        // Seed Skills
        await queryInterface.bulkInsert('skills', [
            { name: "Express.js", icon: "Server", displayOrder: 1, createdAt: now, updatedAt: now },
            { name: "React Router", icon: "Route", displayOrder: 2, createdAt: now, updatedAt: now },
            { name: "React Native", icon: "Smartphone", displayOrder: 3, createdAt: now, updatedAt: now },
            { name: "PHP/Laravel", icon: "Code2", displayOrder: 4, createdAt: now, updatedAt: now },
            { name: "MySQL", icon: "Database", displayOrder: 5, createdAt: now, updatedAt: now },
            { name: "Oracle DB", icon: "Cylinder", displayOrder: 6, createdAt: now, updatedAt: now },
            { name: "Arduino/C++ (IoT)", icon: "Cpu", displayOrder: 7, createdAt: now, updatedAt: now },
            { name: "Python (AI/ML basics)", icon: "BrainCircuit", displayOrder: 8, createdAt: now, updatedAt: now },
            { name: "Ubuntu", icon: "Terminal", displayOrder: 9, createdAt: now, updatedAt: now },
            { name: "Git", icon: "GitBranch", displayOrder: 10, createdAt: now, updatedAt: now }
        ], {});

        // Seed About Me
        await queryInterface.bulkInsert('about_me', [
            { content: "I'm the Head of the Database Unit at the Centre for Digital Technology (DiTec) at UMPSA (Pekan), where I focus on Oracle database performance, backup and recovery, upgrades, and overall system reliability. My role includes planning and coordinating database projects and upgrade initiatives, ensuring data integrity, improving operational stability, and supporting application teams through optimized database architecture and effective troubleshooting.", displayOrder: 1, createdAt: now, updatedAt: now },
            { content: "Previously at Flow Studios I build full-stack solutions end-to-end, working across backend APIs, frontend interfaces, and mobile applications. Some of the systems I developed and contributed include Pre-Delivery Inspection System (PDI), Farm Management System (FMS) and Air Pressure Monitoring System (APMS). These projects strengthened my experience with Express.js, React, React Native, and embedded IoT systems, allowing me to bridge software, hardware, and data into complete, practical solutions.", displayOrder: 2, createdAt: now, updatedAt: now }
        ], {});

        // Seed Sections
        await queryInterface.bulkInsert('sections', [
            { name: 'profile', displayName: 'Profile', displayOrder: 1, createdAt: now, updatedAt: now },
            { name: 'contacts', displayName: 'Contacts', displayOrder: 2, createdAt: now, updatedAt: now },
            { name: 'social_links', displayName: 'Social Links', displayOrder: 3, createdAt: now, updatedAt: now },
            { name: 'experiences', displayName: 'Professional Experience', displayOrder: 4, createdAt: now, updatedAt: now },
            { name: 'skills', displayName: 'Tech Stack', displayOrder: 5, createdAt: now, updatedAt: now },
            { name: 'about_me', displayName: 'About Me', displayOrder: 6, createdAt: now, updatedAt: now }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('sections', null, {});
        await queryInterface.bulkDelete('about_me', null, {});
        await queryInterface.bulkDelete('skills', null, {});
        await queryInterface.bulkDelete('experiences', null, {});
        await queryInterface.bulkDelete('social_links', null, {});
        await queryInterface.bulkDelete('contacts', null, {});
        await queryInterface.bulkDelete('profiles', null, {});
    }
};
