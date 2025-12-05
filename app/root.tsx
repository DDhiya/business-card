// app/root.tsx
import type { LinksFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link } from "react-router";
import appStylesHref from "./app.css?url";
import logo from "./assets/logo.png";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

const COLORS = { accent: "#F05B2D", offwhite: "#F7F7F3", black: "#111111" };
// 👇 one source of truth for the page width + side padding
const CONTAINER = "mx-auto w-full max-w-[900px] px-4 sm:px-6";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        {/* Force proper mobile scaling */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="min-h-[100svh] flex flex-col" style={{ background: COLORS.black }}>
        {/* HEADER (same width as card) */}
        <header className={`${CONTAINER} pt-6`}>
          <nav className="w-full flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 backdrop-blur-md">
            {/* left: logo + brand */}
            <div className="flex items-center gap-2">
              {/* <div className="h-8 w-8 rounded-lg" style={{ background: COLORS.accent }} aria-hidden /> */}
              <img
                src={logo}
                alt="logo"
                className="h-6 w-8"
              />
              <Link
                to="/"
                className="text-sm font-semibold tracking-wide whitespace-nowrap"
                style={{ color: "#F7F7F3" }}
              >
                UMPSA
              </Link>
            </div>
            {/* right: links */}
            <div className="flex items-center gap-3 text-sm" style={{ color: "#F7F7F3" }}>
              <Link to="/" className="hover:opacity-80 transition-opacity">Card</Link>
              {/* <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact Us!</Link> */}
            </div>
          </nav>
        </header>

        {/* MAIN (same width) */}
        <main className={`${CONTAINER} py-10 flex-1`}>
          {children}
        </main>

        {/* FOOTER (same width) */}
        <footer className={`${CONTAINER} pb-10 text-xs text-white/60 text-center`}>
          © {new Date().getFullYear()} Dhiyaurrahman Danial. Built with React Router v7.
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
