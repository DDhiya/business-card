import React from "react";
import { Link } from "react-router";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import { motion } from "framer-motion";
import avatarUrl from "../assets/profile.jpg";
import logoOUrl from "../assets/logo-O.png?url";


const COLORS = { accent: "#F05B2D", offwhite: "#F7F7F3", black: "#111111" };

export default function Home() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Full width of the page container, centered */}
      <div
        className="w-full rounded-3xl p-6 shadow-2xl border mx-auto"
        style={{ background: COLORS.offwhite, borderColor: "#EAEAE5" }}
      >
        {/* Background logo (centered, never larger than 80% of card in either dimension) */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <img
            src={logoOUrl /* or "/assets/logo-O.jpg" if in /public */}
            alt=""
            aria-hidden="true"
            className="max-w-[80%] max-h-[80%] object-contain"
            style={{ opacity: 0.07 }}
          />
        </div>
        {/* Avatar + Basic Info */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div className="p-[2px] rounded-full"
            style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent}33)` }}>
            <img
              src={avatarUrl}
              alt="Profile avatar"
              className="h-28 w-28 rounded-full object-cover bg-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.black }}>Dhiyaurrahman Danial</h1>
            <p className="mt-1 text-sm tracking-wide" style={{ color: "#444" }}>
              Project Engineer · Flow Studios Sdn. Bhd.
            </p>
          </div>

          {/* CTAs */}
          {/* <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a href="#" target="_blank" rel="noreferrer"
               className="rounded-full px-4 py-2 text-sm font-semibold text-white"
               style={{ background: COLORS.accent }}>
              View Résumé
            </a>
            <Link to="/contact"
                  className="rounded-full px-4 py-2 text-sm font-semibold"
                  style={{ color: COLORS.black, background: "#EDEDE8" }}>
              Get In Touch
            </Link>
          </div> */}
        </div>

        <div className="my-6 h-px w-full" style={{ background: "#E4E4DE" }} />

        {/* Contact grid: each card centered horizontally */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center">
          <ContactItem
            icon={<Mail size={18} />}
            label="Email"
            value={
              <a className="hover:underline break-all" href="mailto:dhiya@flowstudios.com.my">
                dhiya@flowstudios.com.my
              </a>
            }
          />
          <ContactItem
            icon={<Phone size={18} />}
            label="Phone"
            value={<a className="hover:underline break-words" href="https://wa.link/iwdz5c">+60 14-533 2637</a>}
          />
          <ContactItem
            icon={<MapPin size={18} />}
            label="Location"
            value={<span className="hover:underline break-words"><a href="https://maps.app.goo.gl/yoVqWArU99VGdyoA7">Cyberjaya, Selangor, MY</a></span>}
          />
        </div>

        {/* Socials */}
        <div className="mt-4 flex gap-3">
          <SocialLink href="https://www.linkedin.com/in/dhiyadanial/" label="LinkedIn" icon={<Linkedin size={18} />} wide />
          {/* <SocialLink href="#" label="GitHub" icon={<Github size={18} />} /> */}
          <SocialLink href="https://welcome.flowstudios.com.my" label="Website" icon={<Globe size={18} />} wide />
        </div>
      </div>
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
      style={{ borderColor: "#EAEAE5", background: "#FCFCFA" }}
    >
      <div className="mt-0.5 text-white rounded-md p-1 shrink-0" style={{ background: COLORS.accent }}>
        {icon}
      </div>
      <div className="min-w-0"> {/* min-w-0 enables text wrapping/truncation inside flex */}
        <p className="text-xs uppercase tracking-wider" style={{ color: "#666" }}>{label}</p>
        <div className="text-sm font-medium break-words" style={{ color: COLORS.black }}>
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
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
        wide ? "flex-1 justify-center text-center min-w-0" : ""
      }`}
      style={{ borderColor: "#EAEAE5", color: COLORS.black, background: "#FFFFFF" }}
    >
      <span className="rounded-md p-1 text-white" style={{ background: COLORS.accent }}>
        {icon}
      </span>
      {/* allow wrap so small phones still show text */}
      <span className="leading-tight">{label}</span>
    </a>
  );
}

