import React from "react";
import { Link } from "react-router";

const COLORS = { accent: "#F05B2D", offwhite: "#F7F7F3", black: "#111111" };

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-xl rounded-3xl border p-6"
           style={{ background: COLORS.offwhite, borderColor: "#EAEAE5" }}>
        <h2 className="text-xl font-bold" style={{ color: COLORS.black }}>Contact Me</h2>
        <p className="mt-1 text-sm" style={{ color: "#444" }}>
          Feel free to reach out for collaborations or just a friendly hello 👋
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: "#666" }}>Email</p>
            <a href="mailto:yourname@company.com" className="text-sm font-medium hover:underline"
               style={{ color: COLORS.black }}>
              yourname@company.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: "#666" }}>Phone</p>
            <a href="tel:+60123456789" className="text-sm font-medium hover:underline"
               style={{ color: COLORS.black }}>
              +60 12-345 6789
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
