export const CREATOR_LICENSE_PRICE = 17;
export const BUSINESS_LICENSE_PRICE = 149;

const licenses = [
  {
    id: 1,
    title: "Creator License",
    icon: "🎧",
    description: "For individual creators producing content for their own channels and accounts.",
    features: [
      "Social media & online content",
      "YouTube, Instagram, TikTok, Twitch & similar platforms",
      "Platform monetization allowed",
      "Multiple content on your own channels",
      "No attribution required",
      "Perpetual coverage for authorized uses",
    ],
    boundary: "For individual creators and their own channels. Business, client and special commercial uses require a Business or custom license.",
    button: "Get License",
    type: "creator",
    price: CREATOR_LICENSE_PRICE,
  },
  {
    id: 2,
    title: "Business License",
    icon: "🏢",
    description: "For freelancers, brands, companies and organizations producing standard commercial content.",
    features: [
      "Everything in Creator",
      "Client & company content",
      "Brand and sponsored content",
      "Standard digital advertising & commercial websites",
      "Commercial podcasts & professional commercial content",
      "No attribution required",
      "Perpetual coverage for authorized uses",
    ],
    boundary: "Standard commercial uses only. Film, broadcast, games, apps, software, large campaigns and exclusive rights require custom licensing.",
    button: "Get License",
    type: "business",
    price: BUSINESS_LICENSE_PRICE,
  },
];

export default licenses;
