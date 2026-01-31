import type { HomeData } from '../types';

const API_BASE = 'http://localhost:3001/api';

export const api = {
    getProfile: () => fetch(`${API_BASE}/profile`).then(r => r.json()),
    getContacts: () => fetch(`${API_BASE}/contacts`).then(r => r.json()),
    getSocialLinks: () => fetch(`${API_BASE}/social-links`).then(r => r.json()),
    getExperiences: () => fetch(`${API_BASE}/experiences`).then(r => r.json()),
    getSkills: () => fetch(`${API_BASE}/skills`).then(r => r.json()),
    getAboutMe: () => fetch(`${API_BASE}/about-me`).then(r => r.json()),

    getHomeData: async (): Promise<HomeData> => {
        const [profile, contacts, socialLinks, experiences, skills, aboutMe] =
            await Promise.all([
                api.getProfile(),
                api.getContacts(),
                api.getSocialLinks(),
                api.getExperiences(),
                api.getSkills(),
                api.getAboutMe()
            ]);
        return { profile, contacts, socialLinks, experiences, skills, aboutMe };
    }
};
