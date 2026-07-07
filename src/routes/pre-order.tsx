import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { locations, products, type Product } from "@/lib/products";
import { Reveal, SplitHeading } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/pre-order")({
  head: () => ({
    meta: [
      { title: "Pre-Order — Arôme Bakery London" },
      { name: "description", content: "Reserve your Arôme pastries for same-day Click & Collect at Covent Garden or Duke Street." },
    ],
  }),
  component: PreOrder,
});

const steps = ["Pickup", "Select", "Basket", "Confirm"] as const;

function PreOrder() {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [placed, setPlaced] = useState(false);

  const total = useMemo(
    () => Object.entries(cart).reduce((s, [id, q]) => s + (products.find((p) => p.id === id)?.price ?? 0) * q, 0),
    [cart]
  );
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const dates = useMemo(() => {
    const arr: { key: string; label: string }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      arr.push({
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
      });
    }
    return arr;
  }, []);
  const times = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"];

  const canAdvance =
    (step === 0 && location && date && time) ||
    (step === 1 && itemCount > 0) ||
    (step === 2 && contact.name && contact.email);

  return (
    <div className="pt-32 md:pt-40 pb-20">
      <section className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Click &amp; Collect</div>
        </Reveal>
        <SplitHeading text="Pre-Order." className="mt-6 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9]" />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Same-day Click &amp; Collect. Pastries are ready half an hour after we accept your order.
          </p>
        </Reveal>

        {/* Progress */}
        <div className="mt-16 mb-12">
          <div className="flex items-center gap-4">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-full text-xs transition-all duration-500 ${
                      i <= step ? "bg-ink text-cream" : "border border-ink/20 text-muted-foreground"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <div className={`hidden sm:block text-xs tracking-[0.2em] uppercase ${i <= step ? "text-ink" : "text-muted-foreground"}`}>{s}</div>
                </div>
                {i < steps.length - 1 && (
                  <div className="relative flex-1 h-px bg-ink/10 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={false}
                      animate={{ width: i < step ? "100%" : "0%" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Panels */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!placed && step === 0 && (
              <StepPanel key="pickup">
                <h2 className="font-display text-3xl md:text-4xl">Where &amp; when?</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {locations.map((l) => (
                    <button
                      key={l.name}
                      onClick={() => setLocation(l.name)}
                      className={`text-left rounded-2xl border p-6 transition-all duration-500 ${
                        location === l.name ? "border-gold bg-gold/10" : "border-ink/15 hover:border-ink/40"
                      }`}
                    >
                      <div className="font-display text-2xl">{l.name}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{l.address.join(", ")}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-10">
                  <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Date</div>
                  <div className="flex flex-wrap gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.key}
                        onClick={() => setDate(d.key)}
                        className={`rounded-full px-5 py-2.5 text-xs transition ${
                          date === d.key ? "bg-ink text-cream" : "border border-ink/20 hover:border-ink"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Time</div>
                  <div className="flex flex-wrap gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-full px-5 py-2.5 text-xs font-mono transition ${
                          time === t ? "bg-ink text-cream" : "border border-ink/20 hover:border-ink"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </StepPanel>
            )}

            {!placed && step === 1 && (
              <StepPanel key="select">
                <h2 className="font-display text-3xl md:text-4xl">Choose your pastries.</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <ProductRow key={p.id} p={p} qty={cart[p.id] ?? 0} setQty={(q) => setCart((c) => ({ ...c, [p.id]: q }))} />
                  ))}
                </div>
              </StepPanel>
            )}

            {!placed && step === 2 && (
              <StepPanel key="basket">
                <h2 className="font-display text-3xl md:text-4xl">Your basket.</h2>
                <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-2xl border border-ink/10 divide-y divide-ink/10">
                    {Object.entries(cart).filter(([, q]) => q > 0).map(([id, q]) => {
                      const p = products.find((x) => x.id === id)!;
                      return (
                        <div key={id} className="flex items-center gap-4 p-4">
                          <img src={p.image} alt="" className="h-16 w-16 rounded-xl object-cover bg-beige" />
                          <div className="flex-1">
                            <div className="font-display text-lg">{p.name}</div>
                            <div className="text-xs text-muted-foreground">£{p.price.toFixed(2)} × {q}</div>
                          </div>
                          <div className="font-mono">£{(p.price * q).toFixed(2)}</div>
                        </div>
                      );
                    })}
                    {itemCount === 0 && <div className="p-8 text-center text-muted-foreground text-sm">Basket empty.</div>}
                  </div>
                  <div className="rounded-2xl bg-ink text-cream p-6">
                    <div className="text-[10px] tracking-[0.4em] uppercase text-cream/60">Details</div>
                    <div className="mt-4 space-y-3 text-sm">
                      <div><span className="text-cream/60">Pickup:</span> {location}</div>
                      <div><span className="text-cream/60">When:</span> {date} · {time}</div>
                      <div><span className="text-cream/60">Items:</span> {itemCount}</div>
                    </div>
                    <div className="mt-6 border-t border-cream/20 pt-6 flex items-baseline justify-between">
                      <div className="text-xs tracking-[0.3em] uppercase text-cream/60">Total</div>
                      <div className="font-display text-3xl">£{total.toFixed(2)}</div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <Field label="Name" value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} />
                      <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
                      <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
                    </div>
                  </div>
                </div>
              </StepPanel>
            )}

            {!placed && step === 3 && (
              <StepPanel key="confirm">
                <h2 className="font-display text-3xl md:text-4xl">Ready to place?</h2>
                <p className="mt-4 text-muted-foreground max-w-lg">You'll only be charged once we've confirmed your order.</p>
                <div className="mt-10 rounded-2xl border border-ink/10 p-8">
                  <Row k="Pickup" v={location ?? "—"} />
                  <Row k="Date" v={date ?? "—"} />
                  <Row k="Time" v={time ?? "—"} />
                  <Row k="Items" v={String(itemCount)} />
                  <Row k="Total" v={`£${total.toFixed(2)}`} />
                </div>
              </StepPanel>
            )}

            {placed && (
              <StepPanel key="done">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
                  className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gold text-ink font-display text-4xl"
                >✓</motion.div>
                <h2 className="mt-8 text-center font-display text-4xl md:text-5xl">Merci, {contact.name || "friend"}.</h2>
                <p className="mt-4 text-center text-muted-foreground max-w-md mx-auto">
                  Your reservation is queued. We'll email you at <span className="text-ink">{contact.email || "your inbox"}</span> once we've accepted.
                </p>
              </StepPanel>
            )}
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        {!placed && (
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`text-xs tracking-[0.3em] uppercase transition ${step === 0 ? "pointer-events-none opacity-30" : "hover:text-gold"}`}
            >
              ← Back
            </button>
            {step < 3 ? (
              <MagneticButton
                onClick={() => canAdvance && setStep(step + 1)}
                className={canAdvance ? "" : "pointer-events-none opacity-40"}
              >
                Continue →
              </MagneticButton>
            ) : (
              <MagneticButton onClick={() => setPlaced(true)}>Place Order</MagneticButton>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function StepPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProductRow({ p, qty, setQty }: { p: Product; qty: number; setQty: (q: number) => void }) {
  return (
    <div className={`rounded-2xl border p-4 transition-all duration-500 ${qty > 0 ? "border-gold bg-gold/5" : "border-ink/10"}`}>
      <div className="flex gap-3">
        <img src={p.image} alt="" className="h-16 w-16 rounded-xl object-cover bg-beige" />
        <div className="flex-1 min-w-0">
          <div className="font-display text-lg truncate">{p.name}</div>
          <div className="text-xs text-muted-foreground">£{p.price.toFixed(2)}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button onClick={() => setQty(Math.max(0, qty - 1))} className="grid h-8 w-8 place-items-center rounded-full border border-ink/20">–</button>
        <span className="font-mono">{qty}</span>
        <button onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-ink text-cream">+</button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <div className="text-[10px] tracking-[0.3em] uppercase text-cream/60 mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-cream/20 bg-transparent py-2 text-cream outline-none focus:border-gold"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-ink/10 last:border-none">
      <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{k}</div>
      <div className="font-display text-lg">{v}</div>
    </div>
  );
}
