import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { categories, products, type Product } from "@/lib/products";
import { Reveal, SplitHeading } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Arôme Bakery London" },
      { name: "description", content: "Explore the daily menu at Arôme: viennoiserie, savoury croissants, sweet tarts and our signature honey butter toast." },
      { property: "og:title", content: "Products — Arôme Bakery" },
      { property: "og:description", content: "Explore the daily menu — viennoiserie, savoury, and signature bakes." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [active, setActive] = useState<"All" | typeof categories[number]>("All");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div className="pt-32 md:pt-40 pb-20">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Menu</div>
        </Reveal>
        <SplitHeading text="The Collection." className="mt-6 font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9]" />
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Baked fresh onsite each morning. Availability may vary — everything on the shelf begins at dawn.
          </p>
        </Reveal>

        {/* Filters */}
        <div className="mt-14 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                active === c ? "bg-ink text-cream" : "border border-ink/20 hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.button
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelected(p)}
                className="group text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-beige">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-4 left-4 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.3em] uppercase">
                    {p.category}
                  </div>
                  <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-cream text-xs tracking-[0.2em] uppercase">
                    View details →
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="font-mono text-sm text-muted-foreground">£{p.price.toFixed(2)}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Popup */}
      <AnimatePresence>
        {selected && (
          <ProductModal product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center p-4"
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-2xl" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-cream md:grid-cols-2"
      >
        <div className="relative aspect-square md:aspect-auto bg-beige">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col p-8 md:p-12">
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">{product.category}</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">{product.name}</h2>
          <div className="mt-4 font-mono text-lg">£{product.price.toFixed(2)}</div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 border-t border-ink/10 pt-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Allergens</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.allergens.map((a) => (
                <span key={a} className="rounded-full border border-ink/20 px-3 py-1 text-xs">{a}</span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-10 flex items-center gap-4">
            <MagneticButton to="/pre-order">Pre-Order →</MagneticButton>
            <button onClick={onClose} className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-ink">
              Close
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream/80 backdrop-blur">
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}
