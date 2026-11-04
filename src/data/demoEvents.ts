
import type { Event, EventType } from "../types/event";

// All available event categories
export const EVENT_TYPES: EventType[] = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Food Distribution",
  "Health Camp",
];

export const demoEvents: Event[] = [
  {
    _id: "winter-clothing-drive",
    title: "Winter Clothing Drive",
    description:
      "Join us in distributing warm clothes to families who need extra support during the winter season. Volunteers will help organize, pack, and distribute clothing items to children, elderly people, and low-income families.",

    eventType: "Donation",

    thumbnail:
      "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec7?auto=format&fit=crop&w=1200&q=80",

    location: "Mirpur 10, Dhaka",
    eventDate: "2026-12-15T09:00:00.000Z",

    duration: "4 hours",
    capacity: 50,

    requirements: [
      "Be willing to help community members",
      "Follow volunteer instructions",
      "Arrive 15 minutes before the event",
    ],

    whatToBring: [
      "Warm clothes for donation",
      "Reusable bags",
      "Water bottle",
    ],

    benefits: [
      "Help families during winter",
      "Build community connections",
      "Receive volunteer experience",
    ],

    schedule: [
      { time: "9:00 AM", activity: "Volunteer registration" },
      { time: "9:30 AM", activity: "Clothing sorting and packing" },
      { time: "11:00 AM", activity: "Clothing distribution" },
      { time: "1:00 PM", activity: "Event closing" },
    ],

    creator: {
      name: "Shobai Community Team",
      email: "community@shobai.org",
    },

    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    _id: "community-tree-plantation",
    title: "Community Tree Plantation",
    description:
      "Help us make our neighborhood greener by planting trees in selected community spaces. Volunteers will work together to plant trees, prepare the soil, and promote environmental awareness.",

    eventType: "Plantation",

    thumbnail:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=80",

    location: "Uttara Sector 7, Dhaka",
    eventDate: "2026-12-20T07:30:00.000Z",

    duration: "3 hours",
    capacity: 40,

    requirements: [
      "Interest in environmental protection",
      "Willingness to participate in outdoor activities",
      "Follow planting instructions",
    ],

    whatToBring: [
      "Comfortable clothes",
      "Gardening gloves",
      "Water bottle",
    ],

    benefits: [
      "Contribute to a greener environment",
      "Learn basic tree planting techniques",
      "Meet environmentally conscious people",
    ],

    schedule: [
      { time: "7:30 AM", activity: "Volunteer registration" },
      { time: "8:00 AM", activity: "Introduction and instructions" },
      { time: "8:30 AM", activity: "Tree plantation activities" },
      { time: "10:30 AM", activity: "Group photo and closing" },
    ],

    creator: {
      name: "Green Dhaka Volunteers",
      email: "greendhaka@example.com",
    },

    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    _id: "clean-neighborhood",
    title: "Clean Our Neighborhood",
    description:
      "Residents and volunteers will work together to clean public spaces, collect waste, and promote responsible waste management. Join us in creating a cleaner and healthier community.",

    eventType: "Cleanup",

    thumbnail:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80",

    location: "Dhanmondi Lake Area, Dhaka",
    eventDate: "2027-01-05T08:00:00.000Z",

    duration: "3 hours",
    capacity: 60,

    requirements: [
      "Be physically comfortable with light outdoor activities",
      "Follow safety guidelines",
      "Work cooperatively with other volunteers",
    ],

    whatToBring: [
      "Reusable gloves",
      "Comfortable shoes",
      "Water bottle",
    ],

    benefits: [
      "Improve neighborhood cleanliness",
      "Promote environmental awareness",
      "Work with local volunteers",
    ],

    schedule: [
      { time: "8:00 AM", activity: "Volunteer registration" },
      { time: "8:30 AM", activity: "Cleaning area assignments" },
      { time: "9:00 AM", activity: "Neighborhood cleanup" },
      { time: "10:30 AM", activity: "Waste collection and closing" },
    ],

    creator: {
      name: "Clean Dhaka Initiative",
      email: "cleandhaka@example.com",
    },

    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    _id: "community-health-camp",
    title: "Free Community Health Camp",
    description:
      "Join our volunteer-supported community health camp offering basic health checks, general health awareness, and guidance from healthcare professionals. Help us make basic healthcare support more accessible to local residents.",

    eventType: "Health Camp",

    thumbnail:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",

    location: "Mohammadpur Community Center, Dhaka",
    eventDate: "2027-01-12T10:00:00.000Z",

    duration: "5 hours",
    capacity: 100,

    requirements: [
      "Interest in community health awareness",
      "Volunteers should follow organizer instructions",
      "Healthcare professionals are welcome",
    ],

    whatToBring: [
      "Personal identification if required",
      "Previous medical reports if attending for a checkup",
      "Water bottle",
    ],

    benefits: [
      "Support community health awareness",
      "Help residents access basic health services",
      "Connect with healthcare volunteers",
    ],

    schedule: [
      { time: "10:00 AM", activity: "Registration" },
      { time: "10:30 AM", activity: "Health awareness session" },
      { time: "11:00 AM", activity: "Basic health checks" },
      { time: "2:30 PM", activity: "Closing session" },
    ],

    creator: {
      name: "Care Together",
      email: "caretogether@example.com",
    },

    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    _id: "hot-meal-distribution",
    title: "Hot Meal Distribution",
    description:
      "Volunteers will prepare and distribute nutritious meals to people experiencing financial hardship. Join our team to prepare food packages, organize distribution, and serve meals with kindness and dignity.",

    eventType: "Food Distribution",

    thumbnail:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1200&q=80",

    location: "Kamalapur, Dhaka",
    eventDate: "2027-01-18T11:30:00.000Z",

    duration: "4 hours",
    capacity: 45,

    requirements: [
      "Willingness to help with food distribution",
      "Follow basic food hygiene instructions",
      "Work cooperatively with the team",
    ],

    whatToBring: [
      "Comfortable clothing",
      "Reusable water bottle",
      "Disposable gloves if available",
    ],

    benefits: [
      "Help people facing food insecurity",
      "Support community welfare",
      "Gain volunteer experience",
    ],

    schedule: [
      { time: "11:30 AM", activity: "Volunteer registration" },
      { time: "12:00 PM", activity: "Meal preparation and packing" },
      { time: "1:00 PM", activity: "Food distribution" },
      { time: "3:00 PM", activity: "Cleanup and closing" },
    ],

    creator: {
      name: "Meals for All",
      email: "mealsforall@example.com",
    },

    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    _id: "weekend-learning-support",
    title: "Weekend Learning Support",
    description:
      "Volunteer educators will spend the afternoon helping school students with reading, mathematics, and basic computer skills. Help young learners build confidence and develop essential educational skills.",

    eventType: "Education",

    thumbnail:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",

    location: "Kallyanpur, Dhaka",
    eventDate: "2027-01-25T14:00:00.000Z",

    duration: "3 hours",
    capacity: 30,

    requirements: [
      "Interest in teaching and education",
      "Good communication with children",
      "Basic knowledge of reading and mathematics",
    ],

    whatToBring: [
      "Notebooks",
      "Pens and pencils",
      "Learning materials if available",
    ],

    benefits: [
      "Support children's education",
      "Develop teaching experience",
      "Make a positive community impact",
    ],

    schedule: [
      { time: "2:00 PM", activity: "Volunteer registration" },
      { time: "2:15 PM", activity: "Student introduction" },
      { time: "2:30 PM", activity: "Learning and tutoring sessions" },
      { time: "4:45 PM", activity: "Feedback and closing" },
    ],

    creator: {
      name: "Learning Together",
      email: "learningtogether@example.com",
    },

    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
