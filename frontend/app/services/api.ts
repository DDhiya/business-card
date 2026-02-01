import type { HomeData } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Expected JSON but got:", text.substring(0, 100));
        throw new Error("API returned non-JSON response (likely an error page)");
    }
    return response.json();
};

export const api = {
    getProfile: () => {
        console.log(`Fetching profile from: ${API_BASE}/profile`);
        return fetch(`${API_BASE}/profile`).then(handleResponse);
    },
    getContacts: () => fetch(`${API_BASE}/contacts`).then(handleResponse),
    getSocialLinks: () => fetch(`${API_BASE}/social-links`).then(handleResponse),
    getExperiences: () => fetch(`${API_BASE}/experiences`).then(handleResponse),
    getSkills: () => fetch(`${API_BASE}/skills`).then(handleResponse),
    getAboutMe: () => fetch(`${API_BASE}/about-me`).then(handleResponse),

    getHomeData: async (): Promise<HomeData> => {
        try {
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
        } catch (error) {
            console.error("Failed to load home data:", error);
            throw error;
        }
    }
};
