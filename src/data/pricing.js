import { CREATOR_LICENSE_PRICE } from "./licenses";

const pricing = [
  {
    id: 1,
    type: "creator",
    icon: "🎧",
    title: "Creator License",
    subtitle: "Starting at",
    price: `$${CREATOR_LICENSE_PRICE}`,
    description: "Perfect for creators publishing content on YouTube, Twitch, Podcasts and Social Media.",
    features: ["One-time payment", "Lifetime license", "Commercial use", "No attribution required", "Instant delivery", "Personal projects"],
    button: "Get License",
  },
  {
    id: 2,
    type: "business",
    icon: "🏢",
    title: "Business License",
    subtitle: "Starting from",
    price: "$149",
    description: "Tailored licensing for brands, agencies, advertising, games and commercial productions.",
    features: ["Commercial campaigns", "Games & Film", "Professional stems", "Priority support", "Custom agreements", "Flexible licensing"],
    button: "Request Quote",
  },
];

export default pricing;
