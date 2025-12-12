import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const COLORS = {
    primary: "#0E2A47",
    accent: "#0A7C86",
    offwhite: "#F6F8FB",
    border: "#DCE3EA",
    text: "#0F172A",
    mutedText: "#55657D",
    white: "#FFFFFF",
};

export default function Demos() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div
                className="w-full rounded-3xl p-6 shadow-2xl border mx-auto relative"
                style={{ background: COLORS.offwhite, borderColor: COLORS.border }}
            >
                {/* <div
          className="absolute inset-x-0 top-0 h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
        /> */}
                <header className="mb-4">
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.text }}>
                        My Projects
                    </h1>
                    <p className="mt-1 text-sm" style={{ color: COLORS.mutedText }}>
                        Some software projects that i've involved in before
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Card 1 */}
                    <DemoCard
                        title="Pre-Delivery Inspection System (PDI)"
                        feature="Lead Developer"
                        video={{
                            webm: "/assets/pdi-checklist.webm",      // replace with your file
                            mp4: "/assets/pdi-checklist.mp4",        // replace with your file
                            poster: "/assets/pdi-poster.jpg",        // optional poster
                        }}
                        descriptionPlaceholder="Digitalization of manual paper-based process of checking vehicles before they are sent to the dealerships. Led a team at Flow Studios Sdn. Bhd. to build the web & mobile app for this system catering to different user roles."
                    />

                    {/* Card 2 */}
                    {/* <DemoCard
                        title="APMS (Air Pressure Monitoring System)"
                        feature="Live Telemetry & Alerts"
                        video={{
                            webm: "/assets/apms-telemetry.webm",     // replace with your file
                            mp4: "/assets/apms-telemetry.mp4",       // replace with your file
                            poster: "/assets/apms-poster.jpg",       // optional poster
                        }}
                        descriptionPlaceholder="Brief information about APMS, data flow (sensor → gateway → API), and how users view alerts. (Replace this text.)"
                    /> */}
                </div>
            </div>

            <div className="pt-6 flex justify-center">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                    style={{
                        borderColor: COLORS.border,
                        color: COLORS.text,
                        background: COLORS.white
                    }}
                >
                    ← Return Home
                </Link>
            </div>

        </motion.section>
    );
}

function DemoCard({
    title,
    feature,
    video,
    descriptionPlaceholder,
}: {
    title: string;
    feature: string;
    video: { webm?: string; mp4?: string; poster?: string };
    descriptionPlaceholder: string;
}) {
    return (
        <section
            className="rounded-3xl p-4 shadow-xl border relative overflow-hidden isolate flex flex-col gap-4"
            style={{ background: COLORS.white, borderColor: COLORS.border }}
        >
            <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
            />

            <header className="px-1">
                <h2 className="text-lg font-semibold" style={{ color: COLORS.text }}>
                    {title}
                </h2>
                <p className="text-sm" style={{ color: COLORS.mutedText }}>
                    Role: {feature}
                </p>
            </header>

            {/* Autoplaying, looping video */}
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: COLORS.border }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={video.poster}
                    className="w-full h-auto block"
                >
                    {video.webm && <source src={video.webm} type="video/webm" />}
                    {video.mp4 && <source src={video.mp4} type="video/mp4" />}
                    {/* Fallback text */}
                    Your browser does not support embedded videos.
                </video>
            </div>

            {/* Info section (placeholder) */}
            <div className="px-1 pb-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: COLORS.mutedText }}>
                    About this app
                </h3>
                <p className="text-sm leading-6 text-justify" style={{ color: COLORS.text }}>
                    {descriptionPlaceholder}
                </p>
            </div>
        </section>
    );
}
