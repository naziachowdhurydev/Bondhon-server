import { Event } from "../types/event";

export const demoEvents: Event[] = [
  {
    title: "Winter Clothes Distribution",
    description:
      "Join us in distributing warm clothes to families who need extra support during the winter season. Volunteers will help organize, pack, and distribute clothing items.",
    eventType: "Donation",
    thumbnail:
      "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec7?auto=format&fit=crop&w=1200&q=80",
    location: "Mirpur 10, Dhaka",
    eventDate: "2026-12-15T09:00:00.000Z",
    creator: {
      name: "Shobai Community Team",
      email: "community@shobai.org",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    title: "Community Tree Plantation",
    description:
      "Help us make our neighborhood greener by planting trees in selected community spaces. Volunteers will receive planting instructions and basic equipment.",
    eventType: "Plantation",
    thumbnail:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=80",
    location: "Uttara Sector 7, Dhaka",
    eventDate: "2026-12-20T07:30:00.000Z",
    creator: {
      name: "Green Dhaka Volunteers",
      email: "greendhaka@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    title: "Clean Our Neighborhood",
    description:
      "Residents and volunteers will work together to clean public spaces, collect waste, and promote responsible waste management in the neighborhood.",
    eventType: "Cleanup",
    thumbnail:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80",
    location: "Dhanmondi Lake Area, Dhaka",
    eventDate: "2027-01-05T08:00:00.000Z",
    creator: {
      name: "Clean Dhaka Initiative",
      email: "cleandhaka@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    title: "Free Community Health Camp",
    description:
      "A volunteer-supported health camp offering basic health checks and health awareness sessions for members of the local community.",
    eventType: "Health Camp",
    thumbnail:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    location: "Mohammadpur Community Center, Dhaka",
    eventDate: "2027-01-12T10:00:00.000Z",
    creator: {
      name: "Care Together",
      email: "caretogether@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    title: "Hot Meal Distribution",
    description:
      "Volunteers will prepare and distribute nutritious meals to people experiencing financial hardship. Help us pack meals and serve them with dignity.",
    eventType: "Food Distribution",
    thumbnail:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80",
    location: "Kamalapur, Dhaka",
    eventDate: "2027-01-18T11:30:00.000Z",
    creator: {
      name: "Meals for All",
      email: "mealsforall@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    title: "Weekend Learning Support",
    description:
      "Volunteer educators will spend the afternoon helping school students with reading, mathematics, and basic computer skills.",
    eventType: "Education",
    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    location: "Kallyanpur, Dhaka",
    eventDate: "2027-01-25T14:00:00.000Z",
    creator: {
      name: "Learning Together",
      email: "learningtogether@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];