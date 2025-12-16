import React, { type JSX } from "react";
import { Link } from "react-router";
import {
  Mail, Phone, MapPin, Linkedin, Globe,
  Cpu, Database, Smartphone, Server,
  Route, Code2, Cylinder, BrainCircuit,
  Terminal, GitBranch
} from "lucide-react";
import { motion } from "framer-motion";
import avatarUrl from "../assets/profile.jpg";
import umpsaLogo from "../assets/logo-umpsa.png";
import fsLogo from "../assets/logo-O.png";

const COLORS = {
  primary: "#0E2A47",     // dark blue
  accent: "#0A7C86",      // blue-green
  offwhite: "#F6F8FB",    // cool surface
  border: "#DCE3EA",      // cool border
  text: "#0F172A",        // main text
  mutedText: "#55657D",   // sub text
  white: "#FFFFFF",
  black: "#111111",       // keep if used elsewhere
};

export default function Home() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Full width of the page container, centered */}
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
              src={avatarUrl}
              alt="Profile avatar"
              className="h-28 w-28 rounded-full object-cover bg-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.text }}>Dhiyaurrahman Danial</h1>
            <p className="mt-1 text-sm tracking-wide" style={{ color: COLORS.mutedText }}>
              <a className="hover:underline break-all" target="_blank" rel="noreferrer" href="https://ditec.umpsa.edu.my/">IT Executive · Universiti Malaysia Pahang Al-Sultan Abdullah</a>
            </p>
          </div>
        </div>

        {/* View Resume */}
        <div className="pt-6 text-center">
          <a
            href="/resume.pdf"
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
        </div>

        <div className="my-6 h-px w-full" style={{ background: COLORS.border }} />

        {/* Contact grid: each card centered horizontally */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-3 justify-items-center">
          {/* Row 1 */}
          <div className="sm:col-start-1 sm:row-start-1">
            <ContactItem
              icon={<Mail size={18} />}
              label="UMPSA Email"
              value={
                <a href="mailto:dhiyadanial@umpsa.edu.my" target="_blank" rel="noreferrer">
                  dhiyadanial@umpsa.edu.my
                </a>
              }
            />
          </div>

          <div className="sm:col-start-2 sm:row-start-1">
            <ContactItem
              icon={<Mail size={18} />}
              label="Personal Email"
              value={
                <a href="mailto:dhiyadanial@gmail.com" target="_blank" rel="noreferrer">
                  dhiyadanial@gmail.com
                </a>
              }
            />
          </div>

          <div className="sm:col-start-3 sm:row-start-1">
            <ContactItem
              icon={<Phone size={18} />}
              label="Phone"
              value={<a href="https://wa.link/iwdz5c">+60 14-533 2637</a>}
            />
          </div>

          {/* Row 2 — center only */}
          <div className="sm:col-start-2 sm:row-start-2">
            <ContactItem
              icon={<MapPin size={18} />}
              label="Location"
              value={
                <a
                  href="https://maps.app.goo.gl/rHGxYkpvTUEuQ2WQA"
                  target="_blank"
                  rel="noreferrer"
                >
                  DiTec, UMPSA (Pekan)
                </a>
              }
            />
          </div>
        </div>

        {/* Socials */}
        <div className="relative z-10 mt-4 flex gap-3">
          <SocialLink href="https://www.linkedin.com/in/dhiyadanial/" label="LinkedIn" icon={<Linkedin size={18} />} wide />
          {/* <SocialLink href="#" label="GitHub" icon={<Github size={18} />} /> */}
          <SocialLink href="https://linktr.ee/dhiya.danial" label="Social Medias" icon={<Globe size={18} />} wide />
        </div>
      </div>
      <ExperienceTechStackCard />
      <AboutMeCard />
    </motion.section>
  );
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
      className="mx-auto flex items-start gap-2 rounded-xl border p-3 w-full sm:w-[18rem] max-w-full"
      style={{ borderColor: COLORS.border, background: COLORS.white }}
    >
      <div className="mt-0.5 text-white rounded-md p-1 shrink-0" style={{ background: COLORS.accent }}>
        {icon}
      </div>
      <div className="min-w-0"> {/* min-w-0 enables text wrapping/truncation inside flex */}
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
      {/* allow wrap so small phones still show text */}
      <span className="leading-tight">{label}</span>
    </a>
  );
}

const EXPERIENCE_LAYOUT: "inline" | "stacked" = "stacked";

function ExperienceTechStackCard() {
  const tech = [
    "Express.js", "React Router", "React Native", "PHP/Laravel",
    "MySQL", "Oracle DB", "Arduino/C++ (IoT)", "Python (AI/ML basics)",
    "Ubuntu", "Git",
  ];

  return (
    <section
      className="mt-8 w-full rounded-3xl p-6 shadow-2xl border border-t-0 relative overflow-hidden"
      style={{ background: COLORS.offwhite, borderColor: COLORS.border }}
    >
      <div
        className="absolute inset-x-0 -top-[1px] h-[2px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
      />

      {/* Professional Experience */}
      <header className="mb-4">
        <h2 className="text-xl font-bold" style={{ color: COLORS.text }}>
          Professional Experience
        </h2>
      </header>

      <div className="space-y-6">
        <EmployerItem
          layout={EXPERIENCE_LAYOUT}
          logoSrc={umpsaLogo}                // import umpsaLogo from "../assets/logo.png"
          logoAlt="UMPSA"
          name="Universiti Malaysia Pahang Al-Sultan Abdullah"
          meta="IT Executive · Pekan, Pahang · Dec 2025 — Current"
          desc="Leading the Database Unit at Centre for Digital Technology (DiTec) managing Oracle systems, performance tuning, and all database-related projects."
        />

        <EmployerItem
          layout={EXPERIENCE_LAYOUT}
          logoSrc={fsLogo}                   // import fsLogo from "../assets/flow-studios.png"
          logoAlt="Flow Studios"
          name="Flow Studios Sdn. Bhd."
          meta="Project Engineer · Cyberjaya, Selangor · Feb 2024 — Nov 2025"
          desc="Developed backend systems, led a mobile app team, handled deployments, and supported IoT R&D installations."
        />
      </div>

      <div className="my-4 h-px w-full" style={{ background: COLORS.border }} />

      {/* Tech stack */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: COLORS.mutedText }}>
          Tech stack
        </h3>
        <ul className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <li key={t}>
              <TechPill label={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Reusable job block supporting two layouts */
function EmployerItem({
  layout,
  logoSrc,
  logoAlt,
  name,
  meta,
  desc,
}: {
  layout: "inline" | "stacked";
  logoSrc: string;
  logoAlt: string;
  name: string;
  meta: string;
  desc: string;
}) {
  if (layout === "inline") {
    // Logo left, name + meta on same line (wraps nicely on small screens)
    return (
      <div>
        <div className="flex items-start gap-3">
          <img src={logoSrc} alt={logoAlt} className="h-8 w-8 rounded-md object-contain shrink-0" />
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-md font-semibold" style={{ color: COLORS.text }}>
              {name}
            </h3>
            <span className="text-sm italic" style={{ color: COLORS.mutedText }}>
              · {meta}
            </span>
          </div>
        </div>
        <p className="mt-1 text-sm leading-6" style={{ color: COLORS.text }}>
          {desc}
        </p>
      </div>
    );
  }

  // 'stacked' layout: logo above name, meta on its own line
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

function AboutMeCard() {
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

      <p className="mt-1 text-sm text-justify" style={{ color: COLORS.mutedText }}>
        I'm the Head of the Database Unit at the Centre for Digital Technology (DiTec) at UMPSA (Pekan), where I focus on Oracle database performance, backup and recovery, upgrades, and overall system reliability. My role includes planning and coordinating database projects and upgrade initiatives, ensuring data integrity, improving operational stability, and supporting application teams through optimized database architecture and effective troubleshooting.
      </p>
      <br />
      <p className="mt-1 text-sm text-justify" style={{ color: COLORS.mutedText }}>
        Previously at Flow Studios I build full-stack solutions end-to-end, working across backend APIs, frontend interfaces, and mobile applications. Some of the systems I developed and contributed include Pre-Delivery Inspection System (PDI), Farm Management System (FMS) and Air Pressure Monitoring System (APMS). These projects strengthened my experience with Express.js, React, React Native, and embedded IoT systems, allowing me to bridge software, hardware, and data into complete, practical solutions.
      </p>
    </section>
  );
}

function TechPill({ label }: { label: string }) {
  const iconMap: Record<string, JSX.Element> = {
    "Express.js": <Server size={16} />,
    "React Router": <Route size={16} />,
    "React Native": <Smartphone size={16} />,
    "PHP/Laravel": <Code2 size={16} />,
    "MySQL": <Database size={16} />,
    "Oracle DB": <Cylinder size={16} />,
    "Arduino/C++ (IoT)": <Cpu size={16} />,
    "Python (AI/ML basics)": <BrainCircuit size={16} />,
    "Ubuntu": <Terminal size={16} />,
    "Git": <GitBranch size={16} />,
  };

  const icon = iconMap[label] || <Code2 size={16} />;

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

function ProfessionalExperienceCard() {
  return (
    <section
      className="mt-8 w-full rounded-3xl p-6 shadow-2xl border relative overflow-hidden"
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
        {/* UMPSA */}
        <div>
          <h3 className="text-lg font-semibold" style={{ color: COLORS.text }}>
            Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA)
          </h3>
          <p className="text-sm italic" style={{ color: COLORS.mutedText }}>
            IT Executive · Pekan, Pahang · Dec 2025 — Current
          </p>
          <p className="mt-1 text-sm leading-6" style={{ color: COLORS.text }}>
            Lead the Database Unit managing Oracle systems, performance tuning, and all database-related projects.
          </p>
        </div>

        {/* Flow Studios */}
        <div>
          <h3 className="text-lg font-semibold" style={{ color: COLORS.text }}>
            Flow Studios Sdn. Bhd.
          </h3>
          <p className="text-sm italic" style={{ color: COLORS.mutedText }}>
            Project Engineer · Cyberjaya, Selangor · Feb 2024 — Nov 2025
          </p>
          <p className="mt-1 text-sm leading-6" style={{ color: COLORS.text }}>
            Developed backend systems, led a mobile app team, handled deployments, and supported IoT R&D installations.
          </p>
        </div>
      </div>
    </section>
  );
}



