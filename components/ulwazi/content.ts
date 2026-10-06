export type FounderContent = {
  name: string;
  role: string;
  origin: string;
  image: string;
  quote: string;
  bio: string[];
  pillars: string[];
};

export type ProgrammePlan = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  audience: string;
};

export type Principle = {
  number: string;
  title: string;
  description: string;
};

export type GalleryItem = {
  src: string;
  title: string;
  category: "Holiday Programmes" | "Outings & Bus Trips" | "Learning & Workshops";
  desc: string;
};

export type Sponsor = {
  name: string;
  role: string;
  org: string;
  image: string;
  quote: string;
};

export type DonationTier = {
  amount: number;
  label: string;
  title: string;
  desc: string;
  popular?: boolean;
};

export const ORG_DETAILS = {
  name: "Ulwazi Learning Development",
  shortName: "Ulwazi",
  tagline: "Learning without limits",
  npoStatus: "Registered Non-Profit Organisation",
  location: "Mfuleni Township, Cape Town",
  locationFull: "Mfuleni Township, Cape Town, Western Cape, South Africa",
  email: "Lumka.johannes@ulwazilearningdevelopment.com",
  formCc: "johannesyonela.com",
  operatingHours: "Mon – Fri: 08:00 – 17:00",
  operatingNote: "School Holiday Programmes Active",
  socials: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  payPalButtonId: "3297RXXACGQ7Q",
  payPalUrl: "https://www.paypal.com/donate",
  contactFormUrl: "https://formsubmit.co/Lumka.johannes@ulwazilearningdevelopment.com",
  coreQuote:
    "Foundational Education is linked to all development goals—reducing hunger, fighting disease, ending poverty, encouraging economic growth, and building lasting peace.",
};

export const FOUNDER_CONTENT: FounderContent = {
  name: "Lumka Johannes",
  role: "Founder & Community Visionary",
  origin: "Eastern Cape & Cape Town Townships",
  image: "/images/lush.jpg",
  quote:
    "My entire life I have lived in the township, and I am a witness to children getting bored with nothing positive to do. They end up vulnerable to substances and gangsterism. I founded Ulwazi to give them hope, knowledge, and sanctuary.",
  bio: [
    "Lumka Johannes grew up in South African townships across the Eastern Cape and Cape Town. In these communities, parents frequently work in low-paying, demanding jobs that create financial and emotional strain at home.",
    "Despite these daily struggles, families strive to raise their children in challenging environments. Lumka recognized that during school holidays, children were left without constructive outlets, making them targets for gang recruitment, drug involvement, and crime.",
    "Driven by deep compassion and lived experience, Lumka established Ulwazi Learning Development—a non-profit initiative dedicated to keeping children engaged, educated, and safe during holiday periods.",
  ],
  pillars: [
    "Grassroots Township Engagement",
    "Holistic Child Mentorship",
    "Safe Space During Holidays",
    "Empowering Girls & Boys Equally",
  ],
};

export const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Safe Sanctuary",
    description:
      "Providing a secure, nurturing space during school holidays away from street dangers, gangsterism, and substance abuse.",
  },
  {
    number: "02",
    title: "Positive Role Models",
    description:
      "Connecting youth with healthy mentors who instill self-knowing, dignity, and positive life perspectives.",
  },
  {
    number: "03",
    title: "Foundational Education",
    description:
      "Empowering children with essential literacy, life skills, and constructive learning without limits.",
  },
  {
    number: "04",
    title: "Community Transformation",
    description:
      "Fostering long-term social growth that reduces poverty, fights disease, and promotes peace in township families.",
  },
];

export const PROGRAMMES_PLANS: ProgrammePlan[] = [
  {
    id: "start",
    title: "OUR START",
    subtitle: "Educational Excellence",
    image: "/images/mar2.jpg",
    description:
      "Ulwazi Learning Development was founded as an NGO to directly impact communities by creating educational excellence in disadvantaged, poverty-stricken townships.",
    audience: "Township children in Mfuleni & Cape Town",
  },
  {
    id: "mission",
    title: "OUR MISSION",
    subtitle: "Life-Changing Opportunities",
    image: "/images/bus.jpg",
    description:
      "Together, we can create life-changing opportunities, holiday learning programmes, and joyful experiences for children who need them most.",
    audience: "Vulnerable township youth",
  },
  {
    id: "vision",
    title: "OUR VISION",
    subtitle: "Everlasting Sanctuary",
    image: "/images/mat.jpg",
    description:
      "To mould a society where every child finds an everlasting sanctuary, positive role models, and the freedom to learn without limits.",
    audience: "All township youth & families",
  },
];

export const GALLERY_CATEGORIES = [
  "All",
  "Holiday Programmes",
  "Outings & Bus Trips",
  "Learning & Workshops",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/mainimg.jpg",
    title: "Community Holiday Assembly",
    category: "Holiday Programmes",
    desc: "Bringing township children together for games, meals, and structured holiday learning.",
  },
  {
    src: "/images/img1.jpg",
    title: "Youth Empowerment Session",
    category: "Learning & Workshops",
    desc: "Teaching core life skills, self-respect, and positive goals for the future.",
  },
  {
    src: "/images/img13.jpg",
    title: "Outdoor Recreation & Sports",
    category: "Holiday Programmes",
    desc: "Keeping children active, healthy, and energized in a safe sanctuary.",
  },
  {
    src: "/images/bus.jpg",
    title: "Educational Bus Excursion",
    category: "Outings & Bus Trips",
    desc: "Exposing children to new horizons beyond township borders.",
  },
  {
    src: "/images/mat.jpg",
    title: "Interactive Classroom Learning",
    category: "Learning & Workshops",
    desc: "Foundational literacy and group learning sessions.",
  },
  {
    src: "/images/mar2.jpg",
    title: "Circle of Care & Mentorship",
    category: "Holiday Programmes",
    desc: "Sharing stories, role model talks, and building healthy self-esteem.",
  },
  {
    src: "/img/6.jpg",
    title: "Classroom Engagement",
    category: "Learning & Workshops",
    desc: "Hands-on guidance and educational support.",
  },
  {
    src: "/img/11.jpg",
    title: "Ulwazi Holiday Camp Smiles",
    category: "Holiday Programmes",
    desc: "Joy, friendship, and safety during school holidays.",
  },
  {
    src: "/images/grow.jpg",
    title: "Nurturing Mindsets",
    category: "Learning & Workshops",
    desc: "Molding positive-thinking, forward-looking youth.",
  },
];

export const SPONSORS: Sponsor[] = [
  {
    name: "Nicky Davies",
    role: "Chief Empowering Officer & Personal Change Catalyst",
    org: "Towards Health INTERNATIONAL",
    image: "/images/Nicky Davies.jpg",
    quote:
      "For now what keeps me going is this worthy cause – ULWAZI. Supporting these children creates a real ripple effect of health, hope, and emotional well-being.",
  },
  {
    name: "Yonela Johannes",
    role: "FrontEnd Web Engineer & Volunteer",
    org: "Ulwazi Digital & Technology Partner",
    image: "/img/yonela.jpg",
    quote:
      "I'm passionate about volunteering my time & talents to Ulwazi, and I'm very proud to serve this community and see young lives transformed.",
  },
];

export const DONATION_TIERS: DonationTier[] = [
  {
    amount: 150,
    label: "R150 (~$10)",
    title: "Nutrition Pack",
    desc: "Feeds 1 child with healthy meals and daily snacks during holiday camp.",
  },
  {
    amount: 350,
    label: "R350 (~$22)",
    title: "Learning Kit",
    desc: "Provides stationery, books, and art supplies for workshops.",
    popular: true,
  },
  {
    amount: 750,
    label: "R750 (~$45)",
    title: "Full Camp Pass",
    desc: "Covers transport, meals, excursions, and full holiday sanctuary.",
  },
];

export const CONTACT_INTEREST_OPTIONS = [
  "General Query",
  "Volunteering / Mentorship",
  "Sponsorship a Holiday Programme",
  "Donation Inquiry",
] as const;
