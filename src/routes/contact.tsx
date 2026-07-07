import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { locations } from "@/lib/products";
import { Reveal, SplitHeading } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Arôme Bakery London" },
      { name: "description", content: "Visit Arôme at Covent Garden or Duke Street in London. Opening hours, addresses, and contact." },
      { property: "og:title", content: "Contact — Arôme Bakery" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-32 md:pt-40 pb-20">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Say hello</div>
        </Reveal>
        <SplitHeading text="Bonjour." className="mt-6 font-display text-[clamp(4rem,14vw,14rem)] leading-[0.9]" />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Two bakeries in London. One inbox that reads every note. Come by, or write to us.
          </p>
        </Reveal>

        {/* Locations */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {locations.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="group overflow-hidden rounded-3xl bg-cream border border-ink/10 shadow-[0_20px_60px_-30px_oklch(0.4_0.05_60_/_30%)]"
              >
                <div className="aspect-[16/10] bg-beige overflow-hidden">
                  <iframe
                    src={l.embed}
                    className="h-full w-full grayscale contrast-95 transition-all duration-1000 group-hover:grayscale-0"
                    loading="lazy"
                    title={l.name}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-3xl">{l.name}</h2>
                    <a href={l.map} target="_blank" rel="noreferrer" className="text-xs tracking-[0.2em] uppercase text-gold hover:text-ink transition">
                      Directions ↗
                    </a>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {l.address.map((a) => <div key={a}>{a}</div>)}
                  </div>
                  <div className="mt-6 border-t border-ink/10 pt-6 space-y-2">
                    {l.hours.map(([d, h]) => (
                      <div key={d} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{d}</span>
                        <span className="font-mono">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Contact form */}
        <div className="mt-32 grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24 items-start">
          <div>
            <Reveal>
              <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Direct</div>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-tight">Write to us.</h2>
              <p className="mt-6 text-muted-foreground">
                For events, press, wholesale, or simply to say bonjour.
              </p>
              <div className="mt-10 space-y-4">
                <a href="mailto:bonjour@aromebakery.co.uk" className="block group">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Email</div>
                  <div className="font-display text-2xl group-hover:text-gold transition">bonjour@aromebakery.co.uk</div>
                </a>
                <a href="https://www.instagram.com/aromebakerylondon/" target="_blank" rel="noreferrer" className="block group">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Instagram</div>
                  <div className="font-display text-2xl group-hover:text-gold transition">@aromebakerylondon</div>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-3xl bg-ink text-cream p-8 md:p-12 grain"
            >
              {!sent ? (
                <div className="space-y-8">
                  <FormField label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <FormField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <FormField label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
                  <div className="pt-4">
                    <MagneticButton>Send message →</MagneticButton>
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-ink font-display text-2xl">✓</div>
                  <h3 className="mt-6 font-display text-3xl">Merci.</h3>
                  <p className="mt-3 text-cream/70">We read every message. We'll be in touch soon.</p>
                </motion.div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label, value, onChange, type = "text", textarea = false,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  return (
    <label className="block relative">
      <div className={`absolute left-0 pointer-events-none transition-all duration-300 ${active ? "-top-2 text-[10px] tracking-[0.3em] uppercase text-gold" : "top-3 text-sm text-cream/50"}`}>
        {label}
      </div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          rows={4}
          className="mt-4 w-full resize-none border-b border-cream/20 bg-transparent py-2 text-cream outline-none focus:border-gold transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="mt-4 w-full border-b border-cream/20 bg-transparent py-2 text-cream outline-none focus:border-gold transition-colors"
        />
      )}
    </label>
  );
}
