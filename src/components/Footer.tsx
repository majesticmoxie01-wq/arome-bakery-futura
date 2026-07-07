import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-5xl leading-none">Arôme</div>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
              French technique. Asian soul. Baked fresh onsite daily in the heart of London — since 2020.
            </p>
            <a
              href="https://www.instagram.com/aromebakerylondon/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-ink hover:text-gold transition"
            >
              @aromebakerylondon <span>↗</span>
            </a>
          </div>
          <FooterCol title="Visit">
            <FooterLink href="https://goo.gl/maps/tP5M3ZRRupyCBeXj6">Covent Garden</FooterLink>
            <FooterLink href="https://goo.gl/maps/iTLgHX85quWc9hEF8">Duke Street</FooterLink>
          </FooterCol>
          <FooterCol title="Menu">
            <Link to="/products" className="text-sm text-muted-foreground hover:text-ink transition">All Products</Link>
            <Link to="/pre-order" className="text-sm text-muted-foreground hover:text-ink transition">Pre-Order</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-ink transition">Our Story</Link>
          </FooterCol>
          <FooterCol title="Contact">
            <a href="mailto:bonjour@aromebakery.co.uk" className="text-sm text-muted-foreground hover:text-ink transition">
              bonjour@aromebakery.co.uk
            </a>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-ink transition">Get in touch</Link>
          </FooterCol>
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-8 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Arôme Bakery Ltd</div>
          <div>Made with butter, patience & obsession.</div>
        </div>

        <div className="pointer-events-none mt-16 font-display text-[clamp(6rem,22vw,22rem)] leading-none tracking-tighter text-ink/[0.06] select-none">
          Arôme
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs tracking-[0.3em] uppercase text-ink/50">{title}</div>
      {children}
    </div>
  );
}
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-ink transition">
      {children}
    </a>
  );
}
