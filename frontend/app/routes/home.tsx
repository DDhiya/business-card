import { useState, type JSX } from "react";
import { useLoaderData } from "react-router";
import {
  Mail, Phone, MapPin, Linkedin, Globe,
  Cpu, Database, Smartphone, Server,
  Route as RouteIcon, Code2, Cylinder, BrainCircuit,
  Terminal, GitBranch, UserPlus, QrCode, Share2
} from "lucide-react";
import { generateVCard } from "../utils/vcard";
import { QRCodeModal } from "../components/QRCodeModal";
import { motion } from "framer-motion";
import { api } from "../services/api";
import type { Contact, SocialLink as SocialLinkType, Experience, Skill, AboutMe, Profile } from "../types";

const COLORS = {
  primary: "#0E2A47",     // dark blue
  accent: "#0A7C86",      // blue-green
  offwhite: "#F6F8FB",    // cool surface
  border: "#DCE3EA",      // cool border
  text: "#0F172A",        // main text
  mutedText: "#55657D",   // sub text
  white: "#FFFFFF",
  black: "#111111",
};

const BACKEND_URL = "http://localhost:3001";

export async function loader() {
  return await api.getHomeData();
}

export default function Home() {
  const { profile, contacts, socialLinks, experiences, skills, aboutMe } = useLoaderData() as any;
  const [showQR, setShowQR] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareData = {
      title: profile.name,
      text: 'Check out my digital business card!',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const getProfilePic = (path: string) => {
    if (!path) return "";
    return path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
  };

  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <QRCodeModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        url={typeof window !== "undefined" ? window.location.href : "https://ditec.umpsa.edu.my/"}
      />

      <div
        className="w-full rounded-3xl p-6 shadow-2xl border border-t-0 mx-auto relative overflow-hidden"
        style={{ background: COLORS.offwhite, borderColor: COLORS.border }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
        />

        {/* Avatar + Basic Info */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="p-[2px] rounded-full"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
            <img
              src={getProfilePic(profile.profilePicture)}
              alt="Profile avatar"
              className="h-28 w-28 rounded-full object-cover bg-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.text }}>{profile.name}</h1>
            <p className="mt-1 text-sm tracking-wide" style={{ color: COLORS.mutedText }}>
              <a className="hover:underline break-all" target="_blank" rel="noreferrer" href={profile.organizationUrl}>
                {profile.title} · {profile.organization}
              </a>
            </p>
            {profile.bio && (
              <div className="mt-4 px-6 py-2 rounded-full border bg-white/40 backdrop-blur-[2px]"
                style={{ borderColor: COLORS.border }}>
                <p className="text-sm font-medium leading-relaxed" style={{ color: COLORS.primary }}>
                  {profile.bio}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 flex flex-wrap justify-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              borderColor: COLORS.border,
              color: COLORS.text,
              background: COLORS.white
            }}
          >
            View Résumé
          </a>

          <button
            onClick={() => generateVCard(profile, contacts)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              borderColor: COLORS.border,
              color: COLORS.white,
              background: COLORS.primary
            }}
          >
            <UserPlus size={16} />
            Save Contact
          </button>

          <button
            onClick={() => setShowQR(true)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              borderColor: COLORS.border,
              color: COLORS.text,
              background: COLORS.white
            }}
            title="Show QR Code"
          >
            <QrCode size={16} />
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              borderColor: COLORS.border,
              color: COLORS.text,
              background: COLORS.white
            }}
            title="Share"
          >
            <Share2 size={16} />
          </button>
        </div>

        <div className="my-6 h-px w-full" style={{ background: COLORS.border }} />

        {/* Contact grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-stretch sm:justify-items-center">
          {contacts.map((contact: Contact) => (
            <ContactItem
              key={contact.id}
              icon={getIcon(contact.icon)}
              label={contact.label}
              value={
                <a href={contact.link} target="_blank" rel="noreferrer">
                  {contact.value}
                </a>
              }
            />
          ))}
        </div>

        {/* Socials */}
        <div className="relative z-10 mt-4 flex flex-wrap gap-3">
          {socialLinks.map((social: SocialLinkType) => (
            <SocialLink
              key={social.id}
              href={social.url}
              label={social.label}
              icon={getIcon(social.icon)}
              wide
            />
          ))}
        </div>
      </div>

      <ExperienceTechStackCard experiences={experiences} skills={skills} />
      <AboutMeCard content={aboutMe} />
    </motion.section>
  );
}

function getIcon(name: string) {
  const icons: Record<string, JSX.Element> = {
    Mail: <Mail size={18} />,
    Phone: <Phone size={18} />,
    MapPin: <MapPin size={18} />,
    Linkedin: <Linkedin size={18} />,
    Globe: <Globe size={18} />,
    Server: <Server size={16} />,
    Route: <RouteIcon size={16} />,
    Smartphone: <Smartphone size={16} />,
    Code2: <Code2 size={16} />,
    Database: <Database size={16} />,
    Cylinder: <Cylinder size={16} />,
    Cpu: <Cpu size={16} />,
    BrainCircuit: <BrainCircuit size={16} />,
    Terminal: <Terminal size={16} />,
    GitBranch: <GitBranch size={16} />,
  };
  return icons[name] || <Globe size={18} />;
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div
      className="flex items-start gap-2 rounded-xl border p-3 w-full sm:w-[18rem] max-w-full"
      style={{ borderColor: COLORS.border, background: COLORS.white }}
    >
      <div className="mt-0.5 text-white rounded-md p-1 shrink-0" style={{ background: COLORS.accent }}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.mutedText }}>{label}</p>
        <div className="text-sm font-medium break-words" style={{ color: COLORS.text }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
  wide = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${wide ? "flex-1 justify-center text-center min-w-0" : ""
        }`}
      style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.white }}
    >
      <span className="rounded-md p-1 text-white" style={{ background: COLORS.accent }}>
        {icon}
      </span>
      <span className="leading-tight">{label}</span>
    </a>
  );
}

function ExperienceTechStackCard({ experiences, skills }: { experiences: Experience[], skills: Skill[] }) {
  return (
    <section
      className="mt-8 w-full rounded-3xl p-6 shadow-2xl border border-t-0 relative overflow-hidden"
      style={{ background: COLORS.offwhite, borderColor: COLORS.border }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
      />

      <header className="mb-4">
        <h2 className="text-xl font-bold" style={{ color: COLORS.text }}>
          Professional Experience
        </h2>
      </header>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <EmployerItem
            key={exp.id}
            logoSrc={exp.companyLogo.startsWith('http') ? exp.companyLogo : `${BACKEND_URL}${exp.companyLogo}`}
            logoAlt={exp.companyName}
            name={exp.companyName}
            meta={`${exp.role} · ${exp.location} · ${exp.startDate} — ${exp.endDate}`}
            desc={exp.description}
          />
        ))}
      </div>

      <div className="my-4 h-px w-full" style={{ background: COLORS.border }} />

      {/* Tech stack */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: COLORS.mutedText }}>
          Tech stack
        </h3>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li key={skill.id}>
              <TechPill label={skill.name} iconName={skill.icon} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EmployerItem({
  logoSrc,
  logoAlt,
  name,
  meta,
  desc,
}: {
  logoSrc: string;
  logoAlt: string;
  name: string;
  meta: string;
  desc: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <img src={logoSrc} alt={logoAlt} className="h-10 w-10 rounded-md object-contain" />
        <h3 className="text-md font-semibold" style={{ color: COLORS.text }}>
          {name}
        </h3>
      </div>
      <p className="text-sm italic" style={{ color: COLORS.mutedText }}>
        {meta}
      </p>
      <p className="mt-1 text-sm leading-6" style={{ color: COLORS.text }}>
        {desc}
      </p>
    </div>
  );
}

function AboutMeCard({ content }: { content: AboutMe[] }) {
  return (
    <section
      className="mt-8 w-full rounded-3xl p-6 shadow-2xl border border-t-0 relative overflow-hidden"
      style={{ background: COLORS.offwhite, borderColor: COLORS.border }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
      />

      <header className="mb-4">
        <h2 className="text-xl font-bold" style={{ color: COLORS.text }}>
          About me
        </h2>
      </header>

      {content.map((item, index) => (
        <div key={item.id}>
          <p className="mt-1 text-sm text-justify" style={{ color: COLORS.mutedText }}>
            {item.content}
          </p>
          {index < content.length - 1 && <br />}
        </div>
      ))}
    </section>
  );
}

function TechPill({ label, iconName }: { label: string, iconName: string }) {
  const icon = getIcon(iconName);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium cursor-pointer select-none"
      style={{
        borderColor: COLORS.border,
        background: COLORS.white,
        color: COLORS.text,
      }}
    >
      <span
        className="rounded-md p-1 text-white"
        style={{ background: COLORS.accent }}
      >
        {icon}
      </span>
      <span className="leading-tight">{label}</span>
    </motion.div>
  );
}
