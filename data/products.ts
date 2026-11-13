export interface WholesaleTier {
  quantity: string;
  pricePerUnit: string;
  discount: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  sku: string;
  price: string; // in INR (e.g. "₹15,400")
  rawPrice: number;
  moq: string;
  material: string;
  finish: string[];
  dimensions: string;
  dimensionsInches: string;
  weight: string;
  hsnCode: string;
  leadTime: string;
  packaging: string;
  description: string;
  bulletPoints: string[];
  careInstructions: string;
  wholesaleTiers: WholesaleTier[];
  images: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export const CATEGORIES = [
  "All Collections",
  "Brass Vases & Urns",
  "Decorative Bowls & Urlis",
  "Artistic Sculptures",
  "Candle Holders & Lighting",
  "Tableware & Trays",
  "Traditional Artifacts",
];

export const FINISHES = [
  "All Finishes",
  "Antique Patina",
  "Polished Mirror Gold",
  "Brushed Satin Brass",
  "Aged Verdigris",
  "Hand-Hammered Raw",
];

export const PRODUCTS: Product[] = [
  {
    id: "gbr-804",
    slug: "antique-brass-sculptural-urli-vase",
    name: "Handcrafted Antique Brass Sculptural Urli Vase",
    subtitle: "Minimalist Abstract Patina Decor for Living Room, Shelf & Tabletop Styling",
    category: "Brass Vases & Urns",
    sku: "GBR-BR-804",
    price: "₹15,400",
    rawPrice: 15400,
    moq: "12 Units",
    material: "100% Solid Virgin Brass (CuZn40 Alloy - Lead Free)",
    finish: ["Antique Patina", "Brushed Satin Brass", "Aged Verdigris"],
    dimensions: "38 cm (H) × 28 cm (Dia)",
    dimensionsInches: "15.0\" (H) × 11.0\" (Dia)",
    weight: "4.85 kg / 10.7 lbs",
    hsnCode: "7418 20 00 (Sanitary & Brass Artware)",
    leadTime: "Ready Stock: 3-5 Days | Bulk Export: 14-18 Days",
    packaging: "Individual 5-ply inner box, multi-layer high-density bubble wrap, master 7-ply export carton with reinforced corner guards.",
    careInstructions: "Wipe with a soft dry lint-free cloth. Do not use abrasive scouring powders, lemon, or vinegar. The archival microcrystalline wax coating protects against oxidation.",
    wholesaleTiers: [
      { quantity: "12 – 24 Units", pricePerUnit: "₹14,200", discount: "8% Off" },
      { quantity: "25 – 50 Units", pricePerUnit: "₹13,100", discount: "15% Off" },
      { quantity: "50+ Units (FCL/LCL)", pricePerUnit: "₹11,900", discount: "Foundry Wholesale" },
    ],
    description:
      "Sculpted by master brass smiths in the historic foundry cluster of Moradabad, this monumental amphora vase marries traditional Indian lost-wax sand casting with European architectural minimalism. Each vessel is submerged in an organic botanical-acid bath to yield an authentic antique bronze patina, then heat-sealed with museum-grade Renaissance microcrystalline wax.",
    bulletPoints: [
      "100% Solid Virgin Brass with zero synthetic resin core or hollow fillers",
      "Hand-turned and chiselled by generational Moradabad artisans (20+ years guild experience)",
      "Multi-stage organic acid patina finish that never peels or chips",
      "Stable heavy-weighted foot rim (weighted for balance on console tables)",
      "Certified IS-319 Grade I alloy with spectroscopic metallurgical report on request",
    ],
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1200&auto=format&fit=crop",
    ],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "gbr-902",
    slug: "abstract-brass-continuous-curve-sculpture",
    name: "Abstract Brass Continuous Curve Kinetic Sculpture",
    subtitle: "Fluid Biomorphic Form Cast in Heavy Solid Brass with Mirror Luster",
    category: "Artistic Sculptures",
    sku: "GBR-SC-902",
    price: "₹19,800",
    rawPrice: 19800,
    moq: "8 Units",
    material: "High-Density Cast Virgin Brass (Ingot IS-319 Grade I)",
    finish: ["Polished Mirror Gold", "Brushed Satin Brass"],
    dimensions: "32 cm (H) × 18 cm (W) × 14 cm (D)",
    dimensionsInches: "12.6\" (H) × 7.1\" (W) × 5.5\" (D)",
    weight: "3.60 kg / 7.9 lbs",
    hsnCode: "7419 99 30 (Brass Artistic Castings)",
    leadTime: "10–14 Days",
    packaging: "Die-cut EPE foam contour casing, rigid luxury presentation box, 7-ply corrugated outer sleeve.",
    careInstructions: "Maintain brilliance by buffing lightly with a microfiber cloth. Sealed with anti-fingerprint transparent lacquer.",
    wholesaleTiers: [
      { quantity: "8 – 20 Units", pricePerUnit: "₹18,200", discount: "8% Off" },
      { quantity: "21 – 50 Units", pricePerUnit: "₹16,800", discount: "15% Off" },
      { quantity: "50+ Units", pricePerUnit: "₹15,400", discount: "Foundry Wholesale" },
    ],
    description:
      "An homage to mid-century modernism, this biomorphic loop sculpture explores negative space and fluid metal balance. Cast seamlessly as a single solid piece with zero weld lines, the exterior is polished through 7 stages of cotton buffing wheels to produce an astonishing liquid-gold reflective luster.",
    bulletPoints: [
      "Seamless single-piece investment casting with zero visible seams",
      "Weighted monolithic base lined with soft non-marking velvet",
      "High-clarity optical polish with protective clear coat",
      "Chosen by international luxury hotels, penthouses, and executive suites",
    ],
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    ],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "gbr-418",
    slug: "traditional-brass-urli-decorative-bowl",
    name: "Hand-Hammered Traditional Brass Urli Bowl",
    subtitle: "Artisanal Water Vessel with Scalloped Petal Rim for Floating Florals",
    category: "Decorative Bowls & Urlis",
    sku: "GBR-BW-418",
    price: "₹13,500",
    rawPrice: 13500,
    moq: "15 Units",
    material: "Solid Heavy-Gauge Brass Sheet (2.5mm Thick)",
    finish: ["Hand-Hammered Raw", "Antique Patina"],
    dimensions: "42 cm (Dia) × 14 cm (H)",
    dimensionsInches: "16.5\" (Dia) × 5.5\" (H)",
    weight: "3.40 kg / 7.5 lbs",
    hsnCode: "7418 10 22 (Traditional Brass Tableware & Urlis)",
    leadTime: "7–12 Days",
    packaging: "Thermocol edge rings, bubble cushion, moisture-proof poly barrier, 7-ply export shipper.",
    careInstructions: "Suitable for water and fresh flowers. Rinse and wipe dry after floral use. Pure brass will develop a royal aged sheen.",
    wholesaleTiers: [
      { quantity: "15 – 30 Units", pricePerUnit: "₹12,400", discount: "8% Off" },
      { quantity: "31 – 75 Units", pricePerUnit: "₹11,300", discount: "16% Off" },
      { quantity: "75+ Units", pricePerUnit: "₹10,200", discount: "Foundry Wholesale" },
    ],
    description:
      "A timeless emblem of Indian heritage, this Urli bowl is shaped through thousand-strike anvil hammering. Crafted with twin cast temple-ring handles and an undulating scalloped rim, it creates an unforgettable welcoming centerpiece when filled with water, floating rose petals, and brass floating tea lights.",
    bulletPoints: [
      "Traditional hand-hammered peen texture reflecting shimmering ambient candlelight",
      "100% leak-proof water-tight brass spun and hammered construction",
      "Twin solid cast brass handles riveted by hand using heritage joinery",
      "Food-safe natural metal finish suitable for dry fruit display as well",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    ],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "gbr-104",
    slug: "artisan-taper-brass-candle-holders",
    name: "Artisan Precision Taper Brass Candle Holders (Pair)",
    subtitle: "Architectural Turned Brass with Weighted Monolithic Base",
    category: "Candle Holders & Lighting",
    sku: "GBR-CH-104",
    price: "₹5,800",
    rawPrice: 5800,
    moq: "24 Pairs",
    material: "Lathe-Turned Solid Brass Rod (CuZn39Pb3)",
    finish: ["Brushed Satin Brass", "Antique Patina"],
    dimensions: "26 cm (H) × 7.5 cm (Base Dia)",
    dimensionsInches: "10.2\" (H) × 3.0\" (Base Dia)",
    weight: "1.25 kg / 2.75 lbs (Per Pair)",
    hsnCode: "9405 50 00 (Non-Electrical Lamps & Candle Fittings)",
    leadTime: "5–10 Days",
    packaging: "Satin-lined presentation gift box with molded foam inserts, master cartons of 12 pairs.",
    careInstructions: "Wipe candle wax gently with warm water. Polish with dry microfiber cloth.",
    wholesaleTiers: [
      { quantity: "24 – 50 Pairs", pricePerUnit: "₹5,200", discount: "10% Off" },
      { quantity: "51 – 150 Pairs", pricePerUnit: "₹4,600", discount: "20% Off" },
      { quantity: "150+ Pairs", pricePerUnit: "₹3,950", discount: "Foundry Wholesale" },
    ],
    description:
      "Turned from solid continuous brass rods on precision manual lathes, these taper holders exhibit Danish modernist proportions infused with Indian metallurgical heft. Precision-bored 22mm sockets accommodate international standard taper candles without tilting.",
    bulletPoints: [
      "Machined from solid brass rod with remarkable stability and weight",
      "Subtle brushed directional grain that resists fingerprint smudges",
      "Integrated recessed drip ring prevents wax runoff onto fine surfaces",
      "Scratch-protective felt bottom pre-fitted to each base",
    ],
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
    ],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "gbr-550",
    slug: "heritage-fluted-brass-artisanal-urn",
    name: "Heritage Fluted Brass Artisanal Urn",
    subtitle: "Classic Amphora Silhouette with Hand-Chiseled Vertical Grooves",
    category: "Brass Vases & Urns",
    sku: "GBR-VS-550",
    price: "₹17,200",
    rawPrice: 17200,
    moq: "10 Units",
    material: "100% Solid Cast Brass",
    finish: ["Antique Patina", "Polished Mirror Gold"],
    dimensions: "34 cm (H) × 22 cm (Dia)",
    dimensionsInches: "13.4\" (H) × 8.6\" (Dia)",
    weight: "3.90 kg / 8.6 lbs",
    hsnCode: "7418 20 00 (Brass Artware)",
    leadTime: "12–16 Days",
    packaging: "Reinforced 7-ply export box with molded styrofoam and desiccant pouch.",
    careInstructions: "Clean with a dry cloth. Keep away from humid bathrooms or direct rainfall.",
    wholesaleTiers: [
      { quantity: "10 – 25 Units", pricePerUnit: "₹15,800", discount: "8% Off" },
      { quantity: "26 – 60 Units", pricePerUnit: "₹14,400", discount: "16% Off" },
      { quantity: "60+ Units", pricePerUnit: "₹13,100", discount: "Foundry Wholesale" },
    ],
    description:
      "Echoing ancient Greco-Indian trade artifacts, this amphora vase features finely chiseled vertical fluting carved by hand. Cast in two symmetrical halves and joined with an invisible brass braze, each urn is hand-honed to perfection.",
    bulletPoints: [
      "Sand-cast virgin brass with hand-filed fluted contouring",
      "Aged brass patina with rich multi-tonal shadows in carved recesses",
      "Heavy flared pedestal base prevents accidental tipping",
      "Ideal for dramatic pampas grass, eucalyptus, or standalone shelf display",
    ],
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    ],
    isNewArrival: true,
    isFeatured: true,
  },
  {
    id: "gbr-310",
    slug: "sand-cast-brass-architectural-vessel",
    name: "Heavy Sand-Cast Brass Architectural Vessel",
    subtitle: "Raw Textured Tactile Surface with Deep Verdigris Interior",
    category: "Brass Vases & Urns",
    sku: "GBR-VS-310",
    price: "₹22,900",
    rawPrice: 22900,
    moq: "6 Units",
    material: "Solid Heavy Brass Alloy (CuZn37)",
    finish: ["Aged Verdigris", "Hand-Hammered Raw"],
    dimensions: "45 cm (H) × 30 cm (Dia)",
    dimensionsInches: "17.7\" (H) × 11.8\" (Dia)",
    weight: "6.20 kg / 13.6 lbs",
    hsnCode: "7418 20 00",
    leadTime: "15–20 Days",
    packaging: "Heavy wooden crate lined with EPE foam shock absorbers.",
    careInstructions: "Dust with dry bristle brush. The verdigris finish is chemically stabilized and will not rub off.",
    wholesaleTiers: [
      { quantity: "6 – 15 Units", pricePerUnit: "₹21,000", discount: "8% Off" },
      { quantity: "16 – 40 Units", pricePerUnit: "₹19,200", discount: "16% Off" },
      { quantity: "40+ Units", pricePerUnit: "₹17,500", discount: "Foundry Wholesale" },
    ],
    description:
      "A monumental showpiece engineered for luxury foyer consoles and architectural niches. The exterior intentionally retains the coarse, organic grain of Moradabad river sand molding, while the interior is treated with an accelerated turquoise-verdigris wash for dramatic contrast.",
    bulletPoints: [
      "Substantial 6.2 kg mass provides supreme presence and stability",
      "Striking dual-tone contrast: Dark bronze exterior with turquoise verdigris interior",
      "Each casting is one-of-a-kind due to spontaneous sand-grain flow during pour",
      "Supplied in fumigated seaworthy wooden crate with drop-test certification",
    ],
    images: [
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop",
    ],
    isNewArrival: true,
  },
  {
    id: "gbr-508",
    slug: "handcrafted-brass-decorative-tray",
    name: "Etched Geometric Brass Vanity & Serving Tray",
    subtitle: "Raised Sculpted Rim with Intricate Geometric Metal Inlay",
    category: "Tableware & Trays",
    sku: "GBR-TR-508",
    price: "₹7,900",
    rawPrice: 7900,
    moq: "20 Units",
    material: "1.8mm Gauge Rolled Brass Plate & Solid Cast Handles",
    finish: ["Brushed Satin Brass", "Antique Patina"],
    dimensions: "48 cm (L) × 32 cm (W) × 3.5 cm (H)",
    dimensionsInches: "18.9\" (L) × 12.6\" (W) × 1.4\" (H)",
    weight: "2.10 kg / 4.6 lbs",
    hsnCode: "7418 10 21 (Brass Tableware)",
    leadTime: "8–12 Days",
    packaging: "Individual corrugated gift box, polybag, 5 units nested per master shipping box.",
    careInstructions: "Wipe with damp cloth and dry immediately. Food-contact safe top lacquer.",
    wholesaleTiers: [
      { quantity: "20 – 50 Units", pricePerUnit: "₹7,100", discount: "10% Off" },
      { quantity: "51 – 150 Units", pricePerUnit: "₹6,400", discount: "19% Off" },
      { quantity: "150+ Units", pricePerUnit: "₹5,600", discount: "Foundry Wholesale" },
    ],
    description:
      "Deeply acid-etched with sacred geometry, this rectangular tray serves with equal distinction on a living room cocktail ottoman, credenza, or executive desk. Raised sculpted edges prevent items from sliding during hospitality service.",
    bulletPoints: [
      "Precision-etched geometric labyrinth pattern with dark patina infill",
      "Comfortable curved brass handles securely joined to the main tray",
      "Scratch-resistant clear coat formulated to resist alcoholic beverage spills",
      "Stackable nested design engineered for efficient freight packing",
    ],
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    isNewArrival: true,
  },
  {
    id: "gbr-712",
    slug: "aged-verdigris-brass-centerpiece-bowl",
    name: "Aged Verdigris Brass Lotus Centerpiece Bowl",
    subtitle: "Organic Flared Edges with Natural Weathered Emerald Oxide Patina",
    category: "Decorative Bowls & Urlis",
    sku: "GBR-BW-712",
    price: "₹11,800",
    rawPrice: 11800,
    moq: "15 Units",
    material: "Hand-Spun & Hammered Heavy Brass",
    finish: ["Aged Verdigris", "Antique Patina"],
    dimensions: "36 cm (Dia) × 12 cm (H)",
    dimensionsInches: "14.2\" (Dia) × 4.7\" (H)",
    weight: "2.75 kg / 6.0 lbs",
    hsnCode: "7418 20 00",
    leadTime: "10–14 Days",
    packaging: "Individual inner box with bubble wrap and corner protectors.",
    careInstructions: "Dust with dry cotton cloth. Do not soak in acidic water.",
    wholesaleTiers: [
      { quantity: "15 – 35 Units", pricePerUnit: "₹10,800", discount: "8% Off" },
      { quantity: "36 – 80 Units", pricePerUnit: "₹9,900", discount: "16% Off" },
      { quantity: "80+ Units", pricePerUnit: "₹8,900", discount: "Foundry Wholesale" },
    ],
    description:
      "Evoking water lilies floating on temple ponds, this low-profile bowl is spun on wooden chucks and shaped with chasing chisels. The emerald verdigris bloom is accelerated in atmospheric chambers for rich natural gradation.",
    bulletPoints: [
      "Sculpted undulating lip inspired by floating botanical waterlily leaves",
      "Permanent non-flaking chemical patination with wax seal",
      "Smooth contact ring base prevents scratches on delicate surfaces",
      "Stunning standalone centerpiece or fruit bowl for luxury dining tables",
    ],
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    isNewArrival: true,
  },
  {
    id: "gbr-620",
    slug: "hammered-brass-sanctuary-hanging-bell",
    name: "Hand-Carved Brass Temple Sanctuary Hanging Bell",
    subtitle: "Resonant Bronze-Alloy Bell with Ornate Hanging Chain & Clapper",
    category: "Traditional Artifacts",
    sku: "GBR-BL-620",
    price: "₹10,500",
    rawPrice: 10500,
    moq: "16 Units",
    material: "Bell-Metal Brass Alloy (78% Copper, 22% Zinc & Tin)",
    finish: ["Antique Patina", "Hand-Hammered Raw"],
    dimensions: "22 cm (Dia) × 28 cm (H) • Chain: 60 cm",
    dimensionsInches: "8.7\" (Dia) × 11.0\" (H) • Chain: 23.6\"",
    weight: "4.30 kg / 9.5 lbs",
    hsnCode: "8306 10 00 (Bells, Gongs & Non-Electric Statuettes)",
    leadTime: "12–16 Days",
    packaging: "Heavy wooden box, individual air-cushioned pouch for clapper and heavy link chain.",
    careInstructions: "Dust clean with a dry microfiber cloth.",
    wholesaleTiers: [
      { quantity: "16 – 35 Units", pricePerUnit: "₹9,600", discount: "8% Off" },
      { quantity: "36 – 80 Units", pricePerUnit: "₹8,700", discount: "17% Off" },
      { quantity: "80+ Units", pricePerUnit: "₹7,800", discount: "Foundry Wholesale" },
    ],
    description:
      "Tuned to produce a warm, reverberating chime that purifies ambient spaces, this sanctuary bell is cast using lost-wax clay molding. Accompanied by a 60cm braided brass hanging link chain tested to withstand over 50kg load.",
    bulletPoints: [
      "Acoustically tuned bell-metal alloy producing a sustained melodic chime",
      "Heavy load-tested welded link chain with swivel ceiling mount bracket",
      "Hand-chiseled medallions featuring eternal lotus petals and relief motifs",
      "Dark olive antique patina with bright gold highlights along relief edges",
    ],
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
  },
  {
    id: "gbr-880",
    slug: "royal-moroccan-brass-lantern",
    name: "Royal Hand-Pierced Brass Lattice Lantern",
    subtitle: "Pierced Jali Metalwork Casting Warm Ambient Shadow Patterns",
    category: "Candle Holders & Lighting",
    sku: "GBR-LT-880",
    price: "₹14,200",
    rawPrice: 14200,
    moq: "12 Units",
    material: "100% Solid Brass with Pierced Filigree",
    finish: ["Antique Patina", "Polished Mirror Gold"],
    dimensions: "52 cm (H) × 24 cm (W) × 24 cm (D)",
    dimensionsInches: "20.5\" (H) × 9.5\" (W) × 9.5\" (D)",
    weight: "3.80 kg / 8.4 lbs",
    hsnCode: "9405 50 00",
    leadTime: "12–18 Days",
    packaging: "Custom styrofoam capsule, 7-ply drop-tested export box.",
    careInstructions: "Suitable for candles or internal LED puck lights. Wipe clean with dry soft duster.",
    wholesaleTiers: [
      { quantity: "12 – 30 Units", pricePerUnit: "₹13,100", discount: "8% Off" },
      { quantity: "31 – 70 Units", pricePerUnit: "₹11,900", discount: "16% Off" },
      { quantity: "70+ Units", pricePerUnit: "₹10,500", discount: "Foundry Wholesale" },
    ],
    description:
      "Perforated by hand with hundreds of intricate floral apertures, this majestic lantern transforms candlelight into mesmerizing shadow play across walls and ceilings. Features a hinged access door and crown hanging ring.",
    bulletPoints: [
      "Hand-pierced Mughal and Moroccan jali filigree pattern",
      "Hinged side access door with miniature brass latch",
      "Heat-dissipating fluted chimney dome for safe candle burning",
      "Spectacular accent for luxury dining verandas and spa entrances",
    ],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
    ],
    isFeatured: true,
  },
];
