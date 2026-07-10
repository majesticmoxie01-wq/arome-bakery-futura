import shokupan from "@/assets/p-shokupan.jpg";
import honeyToast from "@/assets/p-honey-toast.jpg";
import brioche from "@/assets/p-brioche.jpg";
import croissant from "@/assets/p-croissant.jpg";
import painChoc from "@/assets/p-pain-choc.jpg";
import almondCroissant from "@/assets/p-almond-croissant.jpg";
import chocAlmond from "@/assets/p-choc-almond.jpg";
import pistachioEscargot from "@/assets/p-pistachio-escargot.jpg";
import sausageCheese from "@/assets/p-sausage-cheese.jpg";
import misoBacon from "@/assets/p-miso-bacon.jpg";
import quiche from "@/assets/p-quiche.jpg";
import eggTart from "@/assets/p-egg-tart.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Signature" | "Viennoiserie" | "Savoury" | "Sweet";
  description: string;
  allergens: string[];
  image: string;
};

export const products: Product[] = [
  { id: "shokupan", name: "Arôme Shokupan", price: 7.5, category: "Signature",
    description: "A pillow-soft Japanese milk loaf with a whisper-tender crumb — Alix's homage to Tokyo mornings, baked fresh daily.",
    allergens: ["gluten", "milk", "eggs"], image: shokupan },
  { id: "honey-butter-toast", name: "Arôme Honey Butter Toast", price: 4.9, category: "Signature",
    description: "A thick slice of shokupan cloaked in a crackling honey crust. The signature bake — indulgent, molten, unforgettable.",
    allergens: ["gluten", "milk", "eggs"], image: honeyToast },
  { id: "vanilla-chocolate-brioche", name: "Vanilla Chocolate Brioche", price: 5.5, category: "Viennoiserie",
    description: "Buttery brioche laced with Madagascan vanilla and dark chocolate — a slow, sculpted lamination.",
    allergens: ["gluten", "milk", "eggs"], image: brioche },
  { id: "croissant-1930", name: "Croissant 1930", price: 3.1, category: "Viennoiserie",
    description: "A time-honoured recipe. Seventy-two hours of proof, French butter, an audible shatter.",
    allergens: ["gluten", "milk", "eggs"], image: croissant },
  { id: "pain-au-chocolat", name: "Pain au Chocolat", price: 3.3, category: "Viennoiserie",
    description: "Two batons of Valrhona folded into our 1930 laminated dough. Simple. Impeccable.",
    allergens: ["gluten", "milk", "eggs"], image: painChoc },
  { id: "almond-croissant", name: "Almond Croissant", price: 4.7, category: "Viennoiserie",
    description: "Twice-baked croissant filled with silken almond cream and toasted flakes.",
    allergens: ["gluten", "milk", "nuts", "eggs"], image: almondCroissant },
  { id: "chocolate-almond-croissant", name: "Chocolate Almond Croissant", price: 4.9, category: "Viennoiserie",
    description: "Dark chocolate ganache meets almond frangipane. Rich, restrained, transcendent.",
    allergens: ["gluten", "milk", "nuts", "eggs"], image: chocAlmond },
  { id: "pistachio-escargot", name: "Pistachio Chocolate Escargot", price: 4.9, category: "Viennoiserie",
    description: "A spiralled pastry hiding pistachio praline and dark chocolate at every turn.",
    allergens: ["gluten", "milk", "nuts", "eggs"], image: pistachioEscargot },
  { id: "sausage-cheese-croissant", name: "Sausage & Cheese Croissant", price: 4.9, category: "Savoury",
    description: "Japanese BBQ sauce, aged cheese and cured sausage folded into a savoury lamination.",
    allergens: ["gluten", "fish", "milk", "molluscs", "sesame", "soya", "eggs"], image: sausageCheese },
  { id: "miso-bacon-escargot", name: "Miso Bacon Escargot", price: 5.5, category: "Savoury",
    description: "Slow-cured bacon, white miso glaze and Comté — an east–west spiral.",
    allergens: ["gluten", "fish", "milk", "molluscs", "sesame", "soya", "eggs"], image: misoBacon },
  { id: "quiche", name: "Quiche aux Fromages", price: 3.9, category: "Savoury",
    description: "A trio of aged cheeses set in silken custard on our house pâte brisée.",
    allergens: ["gluten", "milk", "eggs"], image: quiche },
  { id: "egg-custard-tart", name: "Egg Custard Tart", price: 5.1, category: "Sweet",
    description: "A quivering Madagascan vanilla custard, torched to a whisper-thin caramel top.",
    allergens: ["gluten", "milk", "eggs"], image: eggTart },
];

export const categories = ["Signature", "Viennoiserie", "Savoury", "Sweet"] as const;

export const locations = [
  {
    name: "Arôme Covent Garden",
    address: ["9 Mercer Street", "The Yards, Covent Garden", "London WC2H 9QJ"],
    hours: [["Mon", "Closed"], ["Tue – Sat", "8am – 5pm"], ["Sunday", "9am – 4pm"]],
    map: "https://goo.gl/maps/tP5M3ZRRupyCBeXj6",
    embed: "https://www.google.com/maps?q=9+Mercer+Street+London+WC2H+9QJ&output=embed",
  },
  {
    name: "Arôme Duke Street",
    address: ["27 Duke St", "London W1U 1LE"],
    hours: [["Mon – Tue", "Closed"], ["Wed – Fri", "8:30am – 5:30pm"], ["Saturday", "9am – 6pm"], ["Sunday", "9am – 4pm"]],
    map: "https://goo.gl/maps/iTLgHX85quWc9hEF8",
    embed: "https://www.google.com/maps?q=27+Duke+Street+London+W1U+1LE&output=embed",
  },
];
