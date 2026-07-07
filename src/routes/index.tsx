import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroCroissant from "@/assets/hero-croissant.jpg";
import heroCroissant from "@/assets/hero-croissant.jpg";
import dessert1 from "@/assets/hero-dessert-1.png"; // croissant on a plate
import dessert2 from "@/assets/hero-dessert-2.png"; // second dessert
import interior from "@/assets/bakery-interior.jpg";
import texture from "@/assets/texture-1.jpg";
import baker from "@/assets/baker-hands.jpg";

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
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden grain">
      {/* Cinematic backdrop */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={heroCroissant} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/40 to-cream" />
      </motion.div>

      <SlideInDessert src={dessert1} from="left" restLeft="22%" delay={0.5} />
      <SlideInDessert src={dessert2} from="right" restLeft="78%" delay={0.7} />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-ink/20 bg-cream/60 backdrop-blur px-4 py-2 text-[10px] tracking-[0.4em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            London · Est. 2020
          </div>
        </Reveal>

        <SplitHeading
          text="A Bakery, Reimagined."
          className="font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-[-0.04em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 max-w-xl text-balance text-lg text-muted-foreground leading-relaxed"
        >
          French technique. Asian soul. Baked fresh onsite daily in the heart of London.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton to="/products">Explore Menu →</MagneticButton>
          <MagneticButton to="/pre-order" variant="ghost">Pre-Order</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-ink/20">
            <span className="absolute inset-x-0 top-0 h-3 bg-ink animate-[marquee_2s_linear_infinite]" style={{ animation: "scrollDown 2s ease-in-out infinite" }} />
          </span>
        </motion.div>
      </motion.div>
      <style>{`@keyframes scrollDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }`}</style>
    </section>
  );
}

function SlideInDessert({
  src,
  from,
  restLeft,
  delay,
}: {
  src: string;
  from: "left" | "right";
  restLeft: string;
  delay: number;
}) {
  const offscreenX = from === "left" ? -500 : 500;
  return (
    <motion.div
      initial={{ x: offscreenX, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 1.3, ease: [0.19, 1, 0.22, 1] }}
      style={{ left: restLeft }}
      className="absolute top-1/2 z-20 w-[42vw] max-w-[420px] -translate-y-1/2"
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-contain drop-shadow-[0_35px_70px_oklch(0.4_0.06_60_/_45%)]"
      />
    </motion.div>
  );
}


function Marquee() {
  const items = ["Croissant 1930", "· Honey Butter Toast", "· Shokupan", "· Pistachio Escargot", "· Miso Bacon", "· Almond Croissant", "· Pain au Chocolat"];
  return (
    <section className="border-y border-ink/10 bg-ink text-cream py-8 overflow-hidden">
      <div className="marquee font-display text-4xl md:text-6xl tracking-tight">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t} <span className="text-gold">✦</span>
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
        <Reveal>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <img src={baker} alt="Baker at work" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Philosophy</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
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
      <div className="font-display text-4xl">{n}</div>
      <div className="mt-1 text-xs tracking-[0.2em] uppercase text-muted-foreground">{l}</div>
    </div>
  );
}

function FeaturedProducts() {
  const featured = products.slice(0, 6);
  return (
    <section className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <Reveal>
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Featured</div>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">Selected daily bakes.</h2>
            </div>
          </Reveal>
          <Reveal>
            <MagneticButton to="/products" variant="ghost">See all →</MagneticButton>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
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
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="font-mono text-sm text-muted-foreground">£{p.price.toFixed(2)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignatureBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <section ref={ref} className="relative h-[80svh] min-h-[500px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={texture} alt="" className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/40" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col items-center justify-center px-6 text-center text-cream">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold">— The Signature</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight">
            Honey <span className="italic">Butter</span> Toast
          </h2>
        </Reveal>
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
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
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
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={interior} alt="Bakery interior" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
