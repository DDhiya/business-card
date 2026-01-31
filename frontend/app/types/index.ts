export interface Profile {
    id: number;
    name: string;
    title: string;
    organization: string;
    organizationUrl: string;
    profilePicture: string;
    resumeUrl: string;
    bio: string;
}

export interface Contact {
    id: number;
    type: 'email' | 'phone' | 'location';
    label: string;
    value: string;
    link: string;
    icon: string;
    displayOrder: number;
}

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
    label: string;
    displayOrder: number;
}

export interface Experience {
    id: number;
    companyName: string;
    companyLogo: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    displayOrder: number;
}

export interface Skill {
    id: number;
    name: string;
    icon: string;
    displayOrder: number;
}

export interface AboutMe {
    id: number;
    content: string;
    displayOrder: number;
}

export interface HomeData {
    profile: Profile;
    contacts: Contact[];
    socialLinks: SocialLink[];
    experiences: Experience[];
    skills: Skill[];
    aboutMe: AboutMe[];
}
