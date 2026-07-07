import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import interior from "@/assets/bakery-interior.jpg";
import baker from "@/assets/baker-hands.jpg";
import texture from "@/assets/texture-1.jpg";
import { Reveal, SplitHeading } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Arôme Bakery London" },
      { name: "description", content: "The story of Arôme: French technique meets Asian ingredients, born from Alix's obsession with time-honoured baking." },
      { property: "og:title", content: "About — Arôme Bakery" },
      { property: "og:description", content: "French technique. Asian soul. The story behind Arôme London." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Intro />
      <Story />
      <Timeline />
      <GalleryStrip />
      <ClosingCTA />
    </>
  );
}

function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  return (
    <section ref={ref} className="relative min-h-[90svh] overflow-hidden pt-32 md:pt-40 pb-20 grain">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-30">
        <img src={baker} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-cream/70 to-cream" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Since 2020</div>
        </Reveal>
        <SplitHeading text="An obsession, baked daily." className="mt-6 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9]" />
        <Reveal delay={0.6}>
          <p className="mt-10 max-w-2xl text-xl md:text-2xl leading-relaxed text-ink/80">
            The heart and soul of Arôme is steeped in Alix's fascination with time-honoured French baking — and a restless hunt for the world's finest ingredients.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32">
      <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={interior} alt="Interior" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— East meets West</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-tight">
              A dialogue between <span className="italic gold-gradient">Paris</span> and the <span className="italic gold-gradient">East.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Croissant 1930 sits alongside Miso Bacon Escargot. Gula Melaka Coconut Twist next to Pain au Chocolat. Every bake is baked fresh onsite daily with premium ingredients inspired by the seasons.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const items = [
    { year: "2020", title: "The oven lights.", body: "Alix opens Arôme with a single obsession: the perfect croissant." },
    { year: "2021", title: "Covent Garden.", body: "Our first home settles into The Yards on Mercer Street." },
    { year: "2022", title: "The signature.", body: "Honey Butter Toast is born — instantly London's most-photographed bake." },
    { year: "2023", title: "Duke Street.", body: "A second home opens off Oxford Street. Same obsession, twice as many mornings." },
    { year: "Today", title: "Baked fresh, daily.", body: "Every pastry begins at dawn. Nothing frozen. Nothing rushed." },
  ];
  return (
    <section className="relative bg-ink text-cream py-32 md:py-48 grain">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold">— Chronology</div>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">Slow ascent.</h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cream/20 to-transparent" />
          {items.map((it, i) => (
            <Reveal key={it.year} delay={i * 0.08}>
              <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 py-10 ${i % 2 ? "md:text-left md:[&>*:first-child]:col-start-2" : "md:text-right"}`}>
                <div className="absolute left-4 md:left-1/2 top-12 -translate-x-1/2 h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_var(--gold)]" />
                <div className={i % 2 ? "md:pl-16" : "md:pr-16"}>
                  <div className="text-gold font-mono tracking-widest text-sm">{it.year}</div>
                  <h3 className="mt-3 font-display text-3xl md:text-4xl">{it.title}</h3>
                  <p className="mt-3 text-cream/70 leading-relaxed max-w-md md:inline-block">{it.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const imgs = [
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/others-43-scaled.jpg?fit=1200%2C960",
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/photographer_s-picks-105-scaled.jpg?fit=1200%2C960",
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/photographer_s-picks-123-scaled.jpg?fit=1200%2C1500",
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/others-94-scaled.jpg?fit=1200%2C960",
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/others-113-scaled.jpg?fit=1200%2C1500",
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/photographer_s-picks-75-scaled.jpg?fit=1200%2C960",
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/photographer_s-picks-55-scaled.jpg?fit=1200%2C1500",
    "https://i0.wp.com/aromebakery.co.uk/wp-content/uploads/2021/06/others-105-scaled.jpg?fit=1200%2C800",
  ];
  return (
    <section className="py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-14">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Fragments</div>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight">Moments from the bench.</h2>
        </Reveal>
      </div>
      <div className="marquee">
        {[...imgs, ...imgs].map((src, i) => (
          <div key={i} className="relative h-[420px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl">
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  return (
    <section ref={ref} className="relative h-[70svh] min-h-[500px] overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={texture} alt="" className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/50" />
      <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center text-cream">
        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
            Come <span className="italic gold-gradient">taste</span> the obsession.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <MagneticButton to="/pre-order">Pre-Order →</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
