import React from "react";
import { Link } from "react-router";
import avatarUrl from "../assets/profile-contact.png";
import logoOUrl from "../assets/logo-O.png";

const COLORS = { accent: "#F05B2D", offwhite: "#F7F7F3", black: "#111111" };

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-xl rounded-3xl border p-6"
        style={{ background: COLORS.offwhite, borderColor: "#EAEAE5" }}>
        <span><h2 className="inline-block text-xl font-bold" style={{ color: COLORS.black }}>Contact Flow Studios Sdn. Bhd.</h2> <p className="inline-block" style={{ color: COLORS.black }}> (961772-U)</p></span>
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

          <div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.black }}>Saifullah Zahari</h1>
            <p className="mt-1 text-sm tracking-wide" style={{ color: "#444" }}>
              Business Development
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: "#666" }}>Email</p>
            <a href="mailto:saifulzahari@flowstudios.com.my" className="text-sm font-medium hover:underline"
              style={{ color: COLORS.black }}>
              saifulzahari@flowstudios.com.my
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: "#666" }}>Office</p>
            <a href="tel:+60388009897" className="text-sm font-medium hover:underline"
              style={{ color: COLORS.black }}>
              +60 3-8800 9897
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: "#666" }}>Phone</p>
            <a href="https://wa.link/b3tqlq" className="text-sm font-medium hover:underline"
              style={{ color: COLORS.black }}>
              +60 17-473 5054
            </a>
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
