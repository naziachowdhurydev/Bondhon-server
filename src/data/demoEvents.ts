
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9DPJVt6gNVf4VaoONKg1pfhxLgUuRLJsHyIA3E7wKJOHGkSTP8MhXQYP8&s=10",

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

    // =========================
  // CLEANUP EVENTS
  // =========================
  {
    _id: "river-cleanup-campaign",
    title: "River Cleanup Campaign",
    description:
      "Join local volunteers to clean the riverside, collect plastic waste, and raise awareness about water pollution. Together, we can protect our natural environment.",
    eventType: "Cleanup",
    thumbnail:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80",
    location: "Buriganga Riverside, Dhaka",
    eventDate: "2027-02-05T08:00:00.000Z",
    duration: "4 hours",
    capacity: 50,
    requirements: [
      "Be comfortable with outdoor activities",
      "Follow environmental safety guidelines",
      "Work together with other volunteers",
    ],
    whatToBring: ["Reusable gloves", "Comfortable shoes", "Water bottle"],
    benefits: [
      "Help reduce river pollution",
      "Protect local wildlife",
      "Promote environmental awareness",
    ],
    schedule: [
      { time: "8:00 AM", activity: "Volunteer registration" },
      { time: "8:30 AM", activity: "Safety briefing" },
      { time: "9:00 AM", activity: "Riverside cleanup" },
      { time: "11:30 AM", activity: "Waste collection and closing" },
    ],
    creator: {
      name: "Save Our Rivers",
      email: "saveourrivers@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "school-cleaning-day",
    title: "Community School Cleaning Day",
    description:
      "Help create a cleaner learning environment for local students. Volunteers will clean classrooms, organize learning materials, and improve the school surroundings.",
    eventType: "Cleanup",
    thumbnail:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    location: "Badda, Dhaka",
    eventDate: "2027-02-15T09:00:00.000Z",
    duration: "3 hours",
    capacity: 35,
    requirements: [
      "Willingness to help with cleaning",
      "Follow organizer instructions",
      "Work respectfully with the team",
    ],
    whatToBring: ["Cleaning gloves", "Reusable cloth", "Water bottle"],
    benefits: [
      "Support local education",
      "Improve school facilities",
      "Build community relationships",
    ],
    schedule: [
      { time: "9:00 AM", activity: "Volunteer registration" },
      { time: "9:30 AM", activity: "Cleaning assignments" },
      { time: "10:00 AM", activity: "Classroom and playground cleaning" },
      { time: "11:30 AM", activity: "Final inspection and closing" },
    ],
    creator: {
      name: "Better Schools Initiative",
      email: "betterschools@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // =========================
  // PLANTATION EVENTS
  // =========================
  {
    _id: "urban-gardening-project",
    title: "Urban Gardening Project",
    description:
      "Help transform unused community spaces into small green gardens. Volunteers will plant flowers, vegetables, and other plants while learning basic gardening techniques.",
    eventType: "Plantation",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    location: "Gulshan, Dhaka",
    eventDate: "2027-02-20T08:00:00.000Z",
    duration: "3 hours",
    capacity: 30,
    requirements: [
      "Interest in gardening",
      "Willingness to work outdoors",
      "Follow gardening instructions",
    ],
    whatToBring: ["Gardening gloves", "Small gardening tools", "Water bottle"],
    benefits: [
      "Create greener community spaces",
      "Learn gardening skills",
      "Encourage sustainable living",
    ],
    schedule: [
      { time: "8:00 AM", activity: "Volunteer registration" },
      { time: "8:30 AM", activity: "Gardening introduction" },
      { time: "9:00 AM", activity: "Planting activities" },
      { time: "10:30 AM", activity: "Garden organization and closing" },
    ],
    creator: {
      name: "Green City Project",
      email: "greencity@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "school-tree-plantation",
    title: "Plant a Tree for the Future",
    description:
      "Join students and community members to plant trees around a local school. Help create a healthier environment and inspire the next generation to care for nature.",
    eventType: "Plantation",
    thumbnail:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    location: "Dhanmondi, Dhaka",
    eventDate: "2027-03-01T07:30:00.000Z",
    duration: "3 hours",
    capacity: 45,
    requirements: [
      "Interest in environmental protection",
      "Follow planting instructions",
      "Participate in group activities",
    ],
    whatToBring: ["Gardening gloves", "Comfortable clothes", "Water bottle"],
    benefits: [
      "Support environmental protection",
      "Increase green spaces",
      "Inspire young environmental volunteers",
    ],
    schedule: [
      { time: "7:30 AM", activity: "Volunteer registration" },
      { time: "8:00 AM", activity: "Tree planting demonstration" },
      { time: "8:30 AM", activity: "Planting activities" },
      { time: "10:00 AM", activity: "Watering and closing" },
    ],
    creator: {
      name: "Future Green Bangladesh",
      email: "futuregreen@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // =========================
  // DONATION EVENTS
  // =========================
  {
    _id: "eid-clothing-donation",
    title: "Share Happiness Clothing Drive",
    description:
      "Help collect and distribute clean clothes to families in need. Volunteers will sort donations, prepare packages, and support the distribution process.",
    eventType: "Donation",
    thumbnail:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    location: "Farmgate, Dhaka",
    eventDate: "2027-03-10T09:00:00.000Z",
    duration: "4 hours",
    capacity: 60,
    requirements: [
      "Willingness to help others",
      "Respectful communication",
      "Follow distribution guidelines",
    ],
    whatToBring: ["Clean clothes for donation", "Reusable bags", "Water bottle"],
    benefits: [
      "Support families in need",
      "Encourage community kindness",
      "Gain volunteer experience",
    ],
    schedule: [
      { time: "9:00 AM", activity: "Volunteer registration" },
      { time: "9:30 AM", activity: "Donation sorting" },
      { time: "11:00 AM", activity: "Package preparation" },
      { time: "12:30 PM", activity: "Distribution and closing" },
    ],
    creator: {
      name: "Share Together Foundation",
      email: "sharetogether@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "book-donation-drive",
    title: "Books for Every Child",
    description:
      "Help provide educational books and storybooks to children from underprivileged families. Volunteers will collect, organize, and distribute books to young learners.",
    eventType: "Donation",
    thumbnail:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    location: "Mohakhali, Dhaka",
    eventDate: "2027-03-18T10:00:00.000Z",
    duration: "3 hours",
    capacity: 40,
    requirements: [
      "Interest in supporting children's education",
      "Ability to organize books",
      "Follow volunteer instructions",
    ],
    whatToBring: ["Storybooks", "Educational books", "Reusable bags"],
    benefits: [
      "Support children's learning",
      "Promote reading habits",
      "Make education more accessible",
    ],
    schedule: [
      { time: "10:00 AM", activity: "Volunteer registration" },
      { time: "10:30 AM", activity: "Book sorting" },
      { time: "11:30 AM", activity: "Book distribution" },
      { time: "12:30 PM", activity: "Closing session" },
    ],
    creator: {
      name: "Books for All",
      email: "booksforall@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // =========================
  // EDUCATION EVENTS
  // =========================
  {
    _id: "free-computer-learning",
    title: "Free Basic Computer Learning Workshop",
    description:
      "Support young learners by helping them understand basic computer operations, internet safety, and essential digital skills through practical activities.",
    eventType: "Education",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    location: "Mirpur, Dhaka",
    eventDate: "2027-03-25T10:00:00.000Z",
    duration: "4 hours",
    capacity: 25,
    requirements: [
      "Interest in teaching",
      "Basic computer knowledge",
      "Good communication skills",
    ],
    whatToBring: ["Laptop if available", "Notebook", "Pen"],
    benefits: [
      "Improve digital literacy",
      "Support young learners",
      "Develop teaching experience",
    ],
    schedule: [
      { time: "10:00 AM", activity: "Student registration" },
      { time: "10:30 AM", activity: "Computer basics introduction" },
      { time: "11:30 AM", activity: "Practical learning session" },
      { time: "1:30 PM", activity: "Questions and closing" },
    ],
    creator: {
      name: "Digital Learning Bangladesh",
      email: "digitallearning@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "english-learning-session",
    title: "English Speaking Practice for Students",
    description:
      "Help students improve their English communication skills through friendly conversations, group discussions, vocabulary games, and speaking activities.",
    eventType: "Education",
    thumbnail:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    location: "Uttara, Dhaka",
    eventDate: "2027-04-02T14:00:00.000Z",
    duration: "3 hours",
    capacity: 35,
    requirements: [
      "Interest in English education",
      "Good communication skills",
      "Willingness to work with students",
    ],
    whatToBring: ["Notebook", "Pens", "English learning materials"],
    benefits: [
      "Build students' speaking confidence",
      "Encourage collaborative learning",
      "Gain teaching experience",
    ],
    schedule: [
      { time: "2:00 PM", activity: "Registration and introduction" },
      { time: "2:30 PM", activity: "Vocabulary activities" },
      { time: "3:15 PM", activity: "Group speaking practice" },
      { time: "4:30 PM", activity: "Feedback and closing" },
    ],
    creator: {
      name: "Learn Together Bangladesh",
      email: "learntogether@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // =========================
  // FOOD DISTRIBUTION EVENTS
  // =========================
  {
    _id: "community-iftar-distribution",
    title: "Community Meal Sharing",
    description:
      "Volunteers will prepare and distribute meal packages to people who need support. Help organize food packages and serve the community with kindness.",
    eventType: "Food Distribution",
    thumbnail:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    location: "Old Dhaka",
    eventDate: "2027-04-10T16:00:00.000Z",
    duration: "3 hours",
    capacity: 50,
    requirements: [
      "Willingness to help with food distribution",
      "Follow food hygiene guidelines",
      "Work cooperatively with volunteers",
    ],
    whatToBring: ["Comfortable clothing", "Water bottle", "Disposable gloves"],
    benefits: [
      "Support people facing food insecurity",
      "Build community connections",
      "Promote kindness and sharing",
    ],
    schedule: [
      { time: "4:00 PM", activity: "Volunteer registration" },
      { time: "4:30 PM", activity: "Food package preparation" },
      { time: "5:30 PM", activity: "Meal distribution" },
      { time: "6:30 PM", activity: "Cleanup and closing" },
    ],
    creator: {
      name: "Food for Everyone",
      email: "foodforeveryone@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "breakfast-for-everyone",
    title: "Breakfast for Everyone",
    description:
      "Join our volunteers to prepare and distribute breakfast packages to low-income workers and people experiencing hardship. Every helping hand makes a difference.",
    eventType: "Food Distribution",
    thumbnail:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
    location: "Sayedabad, Dhaka",
    eventDate: "2027-04-18T07:00:00.000Z",
    duration: "3 hours",
    capacity: 40,
    requirements: [
      "Interest in community service",
      "Follow food safety instructions",
      "Arrive on time",
    ],
    whatToBring: ["Comfortable clothing", "Reusable water bottle", "Gloves"],
    benefits: [
      "Help people start their day with a meal",
      "Support vulnerable communities",
      "Build teamwork skills",
    ],
    schedule: [
      { time: "7:00 AM", activity: "Volunteer registration" },
      { time: "7:30 AM", activity: "Breakfast package preparation" },
      { time: "8:30 AM", activity: "Food distribution" },
      { time: "9:30 AM", activity: "Cleanup and closing" },
    ],
    creator: {
      name: "Morning Care Initiative",
      email: "morningcare@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // =========================
  // HEALTH CAMP EVENTS
  // =========================
  {
    _id: "community-eye-checkup",
    title: "Free Eye Checkup Camp",
    description:
      "Support a community eye health awareness program with volunteer registration, patient guidance, and basic assistance for visitors attending the checkup camp.",
    eventType: "Health Camp",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    location: "Banani, Dhaka",
    eventDate: "2027-04-25T09:00:00.000Z",
    duration: "5 hours",
    capacity: 80,
    requirements: [
      "Interest in community health awareness",
      "Good communication skills",
      "Follow healthcare staff instructions",
    ],
    whatToBring: ["Notebook", "Pen", "Water bottle"],
    benefits: [
      "Support access to basic eye care",
      "Promote health awareness",
      "Help community members",
    ],
    schedule: [
      { time: "9:00 AM", activity: "Registration" },
      { time: "9:30 AM", activity: "Health awareness session" },
      { time: "10:00 AM", activity: "Eye checkup sessions" },
      { time: "1:30 PM", activity: "Closing and volunteer feedback" },
    ],
    creator: {
      name: "Healthy Vision Foundation",
      email: "healthyvision@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "blood-donation-awareness",
    title: "Community Blood Donation Awareness",
    description:
      "Help spread awareness about voluntary blood donation. Volunteers will assist with registration, information sharing, and guiding visitors during the awareness program.",
    eventType: "Health Camp",
    thumbnail:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
    location: "Shyamoli, Dhaka",
    eventDate: "2027-05-05T10:00:00.000Z",
    duration: "4 hours",
    capacity: 60,
    requirements: [
      "Interest in public health awareness",
      "Good communication skills",
      "Follow medical staff instructions",
    ],
    whatToBring: ["Notebook", "Pen", "Water bottle"],
    benefits: [
      "Promote voluntary blood donation",
      "Support community health initiatives",
      "Raise awareness about saving lives",
    ],
    schedule: [
      { time: "10:00 AM", activity: "Volunteer registration" },
      { time: "10:30 AM", activity: "Blood donation awareness session" },
      { time: "11:30 AM", activity: "Visitor guidance and registration support" },
      { time: "1:30 PM", activity: "Feedback and closing" },
    ],
    creator: {
      name: "Life Saver Community",
      email: "lifesaver@example.com",
    },
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
