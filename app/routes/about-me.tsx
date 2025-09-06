import React from "react";
import { Cpu, Bot, Database, Smartphone, CircuitBoard, Code2, Server, SquareTerminal, Github, Boxes, Terminal } from "lucide-react";
// If the image is in app/assets:
import logoOUrl from "../assets/logo-O.png?url"; // or "../assets/logo-O.jpg?url"

const COLORS = { accent: "#F05B2D", offwhite: "#F7F7F3", black: "#111111" };

export default function AboutMe() {
    return (
        <section
            className="w-full rounded-3xl p-6 shadow-2xl border relative overflow-hidden isolate"
            style={{ background: COLORS.offwhite, borderColor: "#EAEAE5" }}
        >
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

            {/* Foreground */}
            <div className="relative z-10">
                <header className="mb-4 text-center">
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.black }}>About Me</h1>
                    <p className="mt-1 text-sm" style={{ color: "#555" }}>Dhiyaurrahman Danial</p>
                </header>

                <div className="mt-3 flex justify-center">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                        style={{ background: "#F05B2D" }}
                    >
                        View Résumé
                    </a>
                </div>
                <br></br>
                {/* Summary */}
                <p className="text-[15px] leading-relaxed text-justify" style={{ color: "#333" }}>
                    I’m a project engineer at Flow Studios who turns fuzzy ideas into products people actually use. I lead end-to-end initiatives across web, mobile, and IoT R&D—aligning requirements, shaping user journeys, and driving delivery to production. Recently I led a company-wide Pre-Delivery Inspection platform from concept and stakeholder workshops through rollout and change management. I also engineered a WhatsApp chatbot powered by ChatGPT that serves as an aquaculture assistant for farmers, drawing on live farm data to provide tailored answers. I focus on clear communication, fast iteration, and measurable outcomes.
                </p>

                <div className="my-6 h-px w-full" style={{ background: "#E4E4DE" }} />

                {/* Tech Stack */}
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#666" }}>
                    Tech Stack
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <StackPill icon={<Server size={16} />} label="Express.js (Node.js)" />
                    <StackPill icon={<Smartphone size={16} />} label="React Native" />
                    <StackPill icon={<Code2 size={16} />} label="Remix.js" />
                    <StackPill icon={<Database size={16} />} label="MySQL" />
                    <StackPill icon={<CircuitBoard size={16} />} label="Arduino/C++ (IoT)" />
                    <StackPill icon={<Bot size={16} />} label="Python (AI/ML basics)" />
                    <StackPill icon={<SquareTerminal size={16} />} label="PHP (Laravel)" />
                    <StackPill icon={<Terminal size={16} />} label="Ubuntu · Git" />
                </div>
            </div>
        </section>
    );
}

function StackPill({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium w-full bg-white"
            style={{ borderColor: "#EAEAE5", color: COLORS.black }}
        >
            <span className="rounded-md p-1 text-white" style={{ background: COLORS.accent }}>
                {icon}
            </span>
            <span className="leading-tight">{label}</span>
        </div>
    );
}
