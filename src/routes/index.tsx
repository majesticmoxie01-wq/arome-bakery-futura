import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import interior from "@/assets/bakery-interior.jpg";
import texture from "@/assets/texture-1.jpg";
import baker from "@/assets/baker-hands.jpg";
import heroVideo from "@/assets/hero-bakery-loop.mp4";

import { MagneticButton } from "@/components/MagneticButton";
import { Reveal, SplitHeading } from "@/components/Reveal";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Philosophy />
      <FeaturedProducts />
      <SignatureBanner />
      <Locations />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden grain">
      {/* Cinematic bakery loop */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/35 to-background/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-background)_95%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-ink/20 bg-cream/50 backdrop-blur px-4 py-2 text-[10px] tracking-[0.4em] uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          London · Est. 2020
        </motion.div>

        <SplitHeading
          text="A Bakery, Reimagined."
          className="font-display italic text-[clamp(3rem,10vw,10rem)] leading-[1.05] tracking-[-0.02em] pb-[0.12em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl text-balance text-lg text-foreground/75 leading-relaxed"
        >
          French technique. Asian soul. Baked fresh onsite daily in the heart of London.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton to="/products">Explore Menu →</MagneticButton>
          <MagneticButton to="/pre-order" variant="ghost">Pre-Order</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-ink/20">
            <span className="absolute inset-x-0 top-0 h-3 bg-ink" style={{ animation: "scrollDown 2.4s ease-in-out infinite" }} />
          </span>
        </motion.div>
      </motion.div>
      <style>{`@keyframes scrollDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }`}</style>
    </section>
  );
}

function Marquee() {
  const items = ["Croissant 1930", "· Honey Butter Toast", "· Shokupan", "· Pistachio Escargot", "· Miso Bacon", "· Almond Croissant", "· Pain au Chocolat"];
  return (
    <section className="border-y border-ink/10 bg-ink text-cream py-8 overflow-hidden">
      <div className="marquee font-display italic text-4xl md:text-6xl tracking-tight">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t} <span className="text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-32 md:py-48">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <img src={baker} alt="Baker at work" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
        </motion.div>
        <div>
          <Reveal>
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Philosophy</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-tight pb-[0.1em]">
              Time-honoured <span className="italic gold-gradient">craft.</span><br />
              Restlessly curious.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-balance text-lg text-muted-foreground leading-relaxed">
              The heart of Arôme is Alix's obsession with time-honoured French baking and the world's finest ingredients — a quiet dialogue between Paris and the East.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8 max-w-lg">
              <Stat n="72h" l="Proof time" />
              <Stat n="100%" l="Onsite bake" />
              <Stat n="2" l="London homes" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display italic text-4xl">{n}</div>
      <div className="mt-1 text-xs tracking-[0.2em] uppercase text-muted-foreground">{l}</div>
    </div>
  );
}

function FeaturedProducts() {
  const featured = products.slice(0, 6);
  // Rotate three subtle entrance styles across cards
  const variants = [
    { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
    { initial: { opacity: 0, scale: 0.9, filter: "blur(12px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" } },
    { initial: { opacity: 0, x: 40, rotate: -2 }, animate: { opacity: 1, x: 0, rotate: 0 } },
  ];
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <Reveal>
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Featured</div>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] pb-[0.1em]">Selected daily bakes.</h2>
            </div>
          </Reveal>
          <Reveal>
            <MagneticButton to="/products" variant="ghost">See all →</MagneticButton>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => {
            const v = variants[i % variants.length];
            return (
              <motion.div
                key={p.id}
                initial={v.initial}
                whileInView={v.animate}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9 + (i % 3) * 0.15, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to="/products" className="group relative block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-beige">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-4 left-4 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.3em] uppercase">
                      {p.category}
                    </div>
                    <div className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-cream text-ink transition-all duration-500 group-hover:bg-gold group-hover:rotate-45">
                      ↗
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <h3 className="font-display text-2xl pb-[0.1em]">{p.name}</h3>
                    <span className="font-mono text-sm text-muted-foreground">£{p.price.toFixed(2)}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SignatureBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);

  return (
    <section ref={ref} className="relative h-[80svh] min-h-[500px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={texture} alt="" className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col items-center justify-center px-6 text-center text-cream">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold">— The Signature</div>
        </Reveal>
        <motion.h2
          initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(14px)" }}
          whileInView={{ opacity: 1, letterSpacing: "-0.02em", filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[1.02] tracking-tight pb-[0.12em]"
        >
          Honey <span className="italic">Butter</span> Toast
        </motion.h2>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-balance text-lg text-cream/80">
            A thick slice of soft, fluffy shokupan enveloped in a crunchy honey crust. Our most-photographed bake.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10">
            <MagneticButton to="/pre-order">Reserve yours</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32 md:py-48">
      <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:gap-24 items-center">
        <div>
          <Reveal>
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Visit</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] pb-[0.1em]">
              Two homes. <br /><span className="italic gold-gradient">One obsession.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-muted-foreground leading-relaxed">
              Find us tucked into The Yards in Covent Garden, or on Duke Street just off Oxford Street. Both baked from scratch, every day.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <MagneticButton to="/contact">All Locations →</MagneticButton>
            </div>
          </Reveal>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={interior} alt="Bakery interior" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
