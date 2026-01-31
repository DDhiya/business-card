import React from "react";
import { Link } from "react-router";
import avatarUrl from "../assets/profile-contact.png";
import logoOUrl from "../assets/logo-O.png";
import { Mail, Phone } from "lucide-react";

const COLORS = { accent: "#F05B2D", offwhite: "#F7F7F3", black: "#111111" };

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-xl rounded-3xl border p-6"
        style={{ background: COLORS.offwhite, borderColor: "#EAEAE5" }}>
        <span><h3 className="inline-block text-l font-bold" style={{ color: COLORS.black }}>Contact Flow Studios</h3> <p className="inline-block text-sm" style={{ color: COLORS.black }}> (961772-U)</p></span>
        <p className="mt-1 text-sm" style={{ color: "#444" }}>
          SME in AgriTech & Digital Engineering. Feel free to reach out for queries and collaboration opportunities!
        </p>
        {/* Background logo */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <img
            src={logoOUrl}
            alt=""
            aria-hidden="true"
            className="max-w-[80%] max-h-[80%] object-contain"
            style={{ opacity: 0.07 }}
          />
        </div>
        {/* <p className="mt-1 text-sm" style={{ color: "#444" }}>
          Feel free to reach out for queries and collaboration opportunities!
        </p> */}
        <br></br>
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

          <div className="relative z-10">
            <h1 className="text-2xl font-bold" style={{ color: COLORS.black }}>Saifullah Zahari</h1>
            <p className="mt-1 text-sm tracking-wide" style={{ color: "#444" }}>
              Business Development
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-3 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center">
            <ContactItem
              icon={<Mail size={18} />}
              label="Email"
              value={
                <a className="hover:underline break-all" href="mailto:saifulzahari@flowstudios.com.my">
                  saifulzahari@flowstudios.com.my
                </a>
              }
            />
            <ContactItem
              icon={<Phone size={18} />}
              label="Phone"
              value={<a className="hover:underline break-words" href="tel:+60388009897">+60 3-8800 9897</a>}
            />
            <ContactItem
              icon={<Phone size={18} />}
              label="Phone"
              value={<a className="hover:underline break-words" href="https://wa.link/b3tqlq">+60 17-473 5054</a>}
            />
          </div>
        </div>

        <div className="mt-6">
          <Link to="/" className="rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{ background: COLORS.accent }}>
            ← Back to Card
          </Link>
        </div>
      </div>
    </section>
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