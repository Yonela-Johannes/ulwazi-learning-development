export type StoryPerson = {
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
  category:
    | "Holiday Programmes"
    | "Outings & Bus Trips"
    | "Learning & Workshops";
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

  // Keep the organisation's scope broad rather than tying it to one city.
  location: "South Africa",
  locationFull: "Townships, villages & communities across South Africa",

  email: "Lumka.johannes@ulwazilearningdevelopment.com",

  // Replace this with a real CC email if the form actually uses one.
  formCc: "",

  operatingHours: "Mon – Fri: 08:00 – 17:00",
  operatingNote: "School Holiday Programmes Active",

  socials: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },

  payPalButtonId: "3297RXXACGQ7Q",
  payPalUrl: "https://www.paypal.com/donate",

  contactFormUrl:
    "https://formsubmit.co/Lumka.johannes@ulwazilearningdevelopment.com",

  coreQuote:
    "Foundational education helps children build confidence, develop life skills, discover new possibilities, and create stronger futures for themselves and their communities.",
} as const;


export const STORY_PERSON: StoryPerson = {
  name: "Lumka Johannes",
  role: "Founder & Community Leader",
  origin: "Eastern Cape & South African townships",
  image: "/images/lush.jpg",

  quote:
    "My entire life I have lived in the township, and I have seen how easily children can be left without positive things to do when school is out. I founded Ulwazi to give children a place to learn, grow, feel safe, and believe in what is possible.",

  bio: [
    "Lumka Johannes grew up in communities in the Eastern Cape and Cape Town, experiencing first-hand both the challenges families face and the strength that exists within township communities.",

    "She saw a need for children to have meaningful opportunities beyond the classroom, especially during school holidays when structured activities are often limited.",

    "From that experience, Ulwazi Learning Development was born — a community-focused organisation creating spaces where children can learn, connect, explore their interests, and build confidence for the future.",
  ],

  pillars: [
    "Community-led learning",
    "Safe and welcoming spaces",
    "Mentorship and positive role models",
    "Opportunities for every child",
  ],
};


export const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Safe Spaces",
    description:
      "Creating welcoming spaces where children can spend their holidays learning, playing, connecting, and simply being themselves.",
  },
  {
    number: "02",
    title: "Positive Role Models",
    description:
      "Connecting children and young people with caring adults and mentors who encourage confidence, self-belief, and positive choices.",
  },
  {
    number: "03",
    title: "Learning for Life",
    description:
      "Building literacy, life skills, creativity, curiosity, and practical knowledge that children can carry with them beyond the programme.",
  },
  {
    number: "04",
    title: "Stronger Communities",
    description:
      "Working with families, volunteers, partners, and local communities to create opportunities that help children and communities grow together.",
  },
];


export const PROGRAMMES_PLANS: ProgrammePlan[] = [
  {
    id: "start",
    title: "Where We Started",
    subtitle: "Learning begins with opportunity",
    image: "/images/mar2.jpg",
    description:
      "Ulwazi began with a simple idea: children deserve meaningful opportunities to learn, explore, and grow, no matter where they come from.",
    audience: "Children and young people",
  },
  {
    id: "mission",
    title: "What We Do",
    subtitle: "Learning, connection and possibility",
    image: "/images/bus.jpg",
    description:
      "Through holiday programmes, learning activities, outings, mentorship, and community experiences, we create spaces where children can discover new interests and enjoy learning together.",
    audience: "Children, young people and families",
  },
  {
    id: "vision",
    title: "Where We're Going",
    subtitle: "A future without limits",
    image: "/images/mat.jpg",
    description:
      "We want every child to have access to safe spaces, positive role models, meaningful learning, and opportunities to imagine a bigger future.",
    audience: "Communities across South Africa",
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
    title: "Holiday Programme",
    category: "Holiday Programmes",
    desc: "Children coming together for learning, games, meals, friendship, and fun during the school holidays.",
  },
  {
    src: "/images/img1.jpg",
    title: "Learning Together",
    category: "Learning & Workshops",
    desc: "Interactive activities that help children build confidence, practical skills, and curiosity.",
  },
  {
    src: "/images/img13.jpg",
    title: "Outdoor Fun",
    category: "Holiday Programmes",
    desc: "Giving children time to play, move, explore, and enjoy being part of a positive community.",
  },
  {
    src: "/images/bus.jpg",
    title: "Outings & New Experiences",
    category: "Outings & Bus Trips",
    desc: "Taking children beyond their everyday surroundings and introducing them to new places and experiences.",
  },
  {
    src: "/images/mat.jpg",
    title: "Learning in Action",
    category: "Learning & Workshops",
    desc: "Creating engaging spaces where children can learn, ask questions, create, and discover new interests.",
  },
  {
    src: "/images/mar2.jpg",
    title: "Mentorship & Connection",
    category: "Holiday Programmes",
    desc: "Building meaningful relationships through conversations, activities, encouragement, and shared experiences.",
  },
  {
    src: "/img/6.jpg",
    title: "Classroom Engagement",
    category: "Learning & Workshops",
    desc: "Hands-on learning and guidance that makes participation active, practical, and enjoyable.",
  },
  {
    src: "/img/11.jpg",
    title: "Holiday Camp Moments",
    category: "Holiday Programmes",
    desc: "Creating memories through friendship, laughter, learning, and shared experiences.",
  },
  {
    src: "/images/grow.jpg",
    title: "Growing Together",
    category: "Learning & Workshops",
    desc: "Helping children develop confidence, positive thinking, and the belief that their future can be bigger.",
  },
];


export const SPONSORS: Sponsor[] = [
  {
    name: "Nicky Davies",
    role: "Health & Community Advocate",
    org: "Towards Health INTERNATIONAL",
    image: "/images/Nicky Davies.jpg",
    quote:
      "What keeps me going is this worthy cause — Ulwazi. Supporting children creates a ripple effect of health, hope, confidence, and opportunity.",
  },
  {
    name: "Yonela Johannes",
    role: "Technology & Digital Partner",
    org: "Ulwazi Digital & Technology",
    image: "/img/yonela.jpg",
    quote:
      "I'm passionate about giving my time and skills to Ulwazi. I'm proud to support the work and see how meaningful opportunities can change young lives.",
  },
  {
    name: "WebAfro",
    role: "Digital & Technology Partner",
    org: "WebAfro",
    image: "/images/webafro.png",
    quote:
      "We believe technology should create opportunities, connect communities, and help organisations doing meaningful work reach more people.",
  },
];


export const DONATION_TIERS: DonationTier[] = [
  {
    amount: 150,
    label: "R150",
    title: "Help a Child Learn",
    desc: "Help provide learning materials, activities, and refreshments during a programme.",
  },
  {
    amount: 350,
    label: "R350",
    title: "Support a Learning Kit",
    desc: "Help provide stationery, books, creative materials, and other resources for learning.",
    popular: true,
  },
  {
    amount: 750,
    label: "R750",
    title: "Support a Programme",
    desc: "Help contribute towards transport, meals, activities, outings, and a full programme experience.",
  },
];


export const CONTACT_INTEREST_OPTIONS = [
  "General Query",
  "Volunteering / Mentorship",
  "Sponsoring a Programme",
  "Donation Inquiry",
] as const;


export type HeadlineLine = { text: string; accent?: boolean }[];


export const STORY_PANELS = {
  who: {
    eyebrow: "Where It Began",
    counter: "Our story",
    headline: [
      [{ text: "It started with" }],
      [{ text: "a belief" }],
      [{ text: "in every child.", accent: true }],
    ] satisfies HeadlineLine[],
  },

  why: {
    eyebrow: "Why We Started",
    counter: "Why we started",
    headline: [
      [{ text: "When school" }],
      [{ text: "is out," }],
      [{ text: "opportunity shouldn't be.", accent: true }],
    ] satisfies HeadlineLine[],

    callout:
      "For many children, school holidays can mean long periods without structured activities, learning opportunities, or safe spaces to spend time together.",

    image: {
      src: "/images/img1.jpg",
      alt: "Children taking part in an Ulwazi activity",
      caption: "Creating positive spaces during school holidays",
    },
  },

  words: {
    eyebrow: "A Founder’s Voice",
    counter: "Her words",
  },

  vision: {
    eyebrow: "Where We're Going",
    counter: "Our vision",
    headline: [
      [{ text: "More space for" }],
      [{ text: "hope,", accent: true }, { text: " learning" }],
      [{ text: "and possibility." }],
    ] satisfies HeadlineLine[],

    image: {
      src: "/images/mainimg.jpg",
      alt: "Children taking part in an Ulwazi programme",
      caption: "Learning, connection and community",
    },
  },
} as const;