import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/pre-order", label: "Pre-Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 transition-all duration-500 ${scrolled ? "glass rounded-full py-2.5 pl-6 pr-3" : ""}`}>
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream font-display text-lg">A</span>
          <span className="font-display text-xl tracking-tight">
            Arôme <span className="text-muted-foreground text-sm tracking-[0.3em] uppercase">London</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="relative px-4 py-2 text-sm tracking-wide"
              >
                <span className={active ? "text-ink" : "text-muted-foreground hover:text-ink transition-colors"}>{l.label}</span>
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold" />
                )}
              </Link>
            );
          })}
          <Link
            to="/pre-order"
            className="ml-3 rounded-full bg-ink px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-cream transition-all hover:bg-gold hover:text-ink"
          >
            Order
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-full border border-ink/20 p-3"
          aria-label="Menu"
        >
          <div className="relative h-4 w-5">
            <span className={`absolute inset-x-0 top-0 h-px bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-1/2 h-px bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 bottom-0 h-px bg-ink transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className={`absolute inset-x-4 top-24 rounded-3xl glass p-8 transition-transform duration-500 ${open ? "translate-y-0" : "-translate-y-6"}`}>
          <div className="flex flex-col gap-1">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className="flex items-center justify-between border-b border-ink/10 py-4 font-display text-2xl"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span>{l.label}</span>
                <span className="text-gold">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
