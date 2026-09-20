export const CREATOR_LICENSE_PRICE = 17;

const licenses = [
  {
    id: 1,
    title: "Creator License",
    icon: "🎧",
    description: "Perfect for independent creators and personal content.",
    features: ["YouTube", "TikTok", "Instagram", "Facebook", "Podcasts", "Twitch", "Monetized Content"],
    button: "Get License",
    type: "creator",
    price: CREATOR_LICENSE_PRICE,
  },
  {
    id: 2,
    title: "Business License",
    icon: "🏢",
    description: "Designed for brands, agencies and commercial productions.",
    features: ["Advertising", "Brands", "Agencies", "Video Games", "Film", "TV", "Custom Agreements"],
    button: "Contact Sales",
    type: "business",
  },
];

export default licenses;
