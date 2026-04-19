import { COLORS } from "./theme";

// ── Mock Users (displayed on map and nearby list) ─────────────────────────────
export const MOCK_USERS = [
  {
    id: "1",
    name: "Alex",
    age: 27,
    gender: "Man",
    initials: "AL",
    color: COLORS.neon,
    bio: "Here for the concert. Down for drinks after 🎵",
    tags: ["Flirt", "Drink"],
    distance: "120m",
    online: true,
    x: 0.38,
    y: 0.32,
  },
  {
    id: "2",
    name: "Mia",
    age: 24,
    gender: "Woman",
    initials: "MI",
    color: COLORS.pink,
    bio: "Spontaneous energy. Let's see what happens tonight ✨",
    tags: ["Slip Away", "Flirt"],
    distance: "200m",
    online: true,
    x: 0.62,
    y: 0.45,
  },
  {
    id: "3",
    name: "Jordan",
    age: 29,
    gender: "Non-binary",
    initials: "JO",
    color: COLORS.purple,
    bio: "Festival vibes only. Come find me near the stage 🎪",
    tags: ["Hang Out", "Drink"],
    distance: "350m",
    online: false,
    x: 0.25,
    y: 0.58,
  },
  {
    id: "4",
    name: "Sam",
    age: 31,
    gender: "Man",
    initials: "SA",
    color: "#FFB347",
    bio: "Just moved to the city. Looking for good people 🌆",
    tags: ["Hang Out", "Flirt"],
    distance: "500m",
    online: true,
    x: 0.72,
    y: 0.28,
  },
  {
    id: "5",
    name: "Zara",
    age: 26,
    gender: "Woman",
    initials: "ZA",
    color: "#FF6B9D",
    bio: "Art lover, night owl. Let's talk about everything 🎨",
    tags: ["Drink", "Hang Out"],
    distance: "680m",
    online: true,
    x: 0.48,
    y: 0.65,
  },
  {
    id: "6",
    name: "Chris",
    age: 33,
    gender: "Man",
    initials: "CH",
    color: "#4FC3F7",
    bio: "Sports fan. Here for the game, staying for the vibes 🏟️",
    tags: ["Drink", "Flirt"],
    distance: "800m",
    online: false,
    x: 0.82,
    y: 0.55,
  },
];

// ── Mock Conversations ────────────────────────────────────────────────────────
export const MOCK_CONVERSATIONS = [
  {
    id: "1",
    name: "Alex",
    initials: "AL",
    color: COLORS.neon,
    online: true,
    lastMessage: "Where are you right now? 👀",
    time: "8:42 PM",
    unread: 2,
  },
  {
    id: "2",
    name: "Mia",
    initials: "MI",
    color: COLORS.pink,
    online: true,
    lastMessage: "Come find me near the main stage!",
    time: "8:31 PM",
    unread: 0,
  },
  {
    id: "3",
    name: "Jordan",
    initials: "JO",
    color: COLORS.purple,
    online: false,
    lastMessage: "That sounds fun 😊",
    time: "7:55 PM",
    unread: 0,
  },
  {
    id: "4",
    name: "Sam",
    initials: "SA",
    color: "#FFB347",
    online: true,
    lastMessage: "Let's grab drinks after the show",
    time: "7:20 PM",
    unread: 1,
  },
];

// ── Mock Messages per user ────────────────────────────────────────────────────
export const MOCK_MESSAGES = {
  "1": [
    { id: "m1", from: "them", text: "Hey! I saw you on the map 👀", time: "8:30 PM" },
    { id: "m2", from: "me", text: "Haha yeah I'm near the bar area", time: "8:32 PM" },
    { id: "m3", from: "them", text: "Nice! What are you drinking?", time: "8:33 PM" },
    { id: "m4", from: "me", text: "Whiskey sour. You?", time: "8:35 PM" },
    { id: "m5", from: "them", text: "Where are you right now? 👀", time: "8:42 PM" },
  ],
  "2": [
    { id: "m1", from: "them", text: "This concert is insane 🎵", time: "8:00 PM" },
    { id: "m2", from: "me", text: "Right?! Best set of the night", time: "8:02 PM" },
    { id: "m3", from: "them", text: "Come find me near the main stage!", time: "8:31 PM" },
  ],
  "3": [
    { id: "m1", from: "me", text: "Hey, saw your profile on the map!", time: "7:45 PM" },
    { id: "m2", from: "them", text: "That sounds fun 😊", time: "7:55 PM" },
  ],
  "4": [
    { id: "m1", from: "them", text: "Great game tonight!", time: "7:10 PM" },
    { id: "m2", from: "me", text: "Absolutely! That last quarter was wild", time: "7:15 PM" },
    { id: "m3", from: "them", text: "Let's grab drinks after the show", time: "7:20 PM" },
  ],
};

// ── Mock Event Board Messages ─────────────────────────────────────────────────
export const MOCK_EVENT_MESSAGES = [
  {
    id: "e1",
    from: "them",
    name: "Alex",
    initials: "AL",
    color: COLORS.neon,
    text: "Anyone else here for the opener? 🎵",
    time: "7:45 PM",
  },
  {
    id: "e2",
    from: "them",
    name: "Mia",
    initials: "MI",
    color: COLORS.pink,
    text: "YES! Section 112 here 🙋‍♀️",
    time: "7:46 PM",
  },
  {
    id: "e3",
    from: "them",
    name: "Jordan",
    initials: "JO",
    color: COLORS.purple,
    text: "The energy tonight is unreal 🔥",
    time: "7:52 PM",
  },
  {
    id: "e4",
    from: "them",
    name: "Sam",
    initials: "SA",
    color: "#FFB347",
    text: "Anyone want to meet up at the bar after the set?",
    time: "8:01 PM",
  },
  {
    id: "e5",
    from: "them",
    name: "Zara",
    initials: "ZA",
    color: "#FF6B9D",
    text: "I'm in! Near the east entrance 📍",
    time: "8:05 PM",
  },
];

// ── Radius Options ────────────────────────────────────────────────────────────
export const RADIUS_OPTIONS = [
  {
    label: "Building",
    icon: "🏢",
    sublabel: "Same building only",
  },
  {
    label: "Neighborhood",
    icon: "🏘️",
    sublabel: "2 mile radius",
  },
  {
    label: "City",
    icon: "🌆",
    sublabel: "Entire city",
  },
  {
    label: "State",
    icon: "🗺️",
    sublabel: "Statewide visibility",
  },
];

// ── Interest Tags ─────────────────────────────────────────────────────────────
export const INTEREST_TAGS = ["Flirt", "Drink", "Slip Away", "Hang Out"];
