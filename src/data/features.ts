export interface Feature {
  title: string;
  description: string;
  icon:
    | "quran"
    | "clock"
    | "dua"
    | "tasbih"
    | "compass"
    | "calendar"
    | "heart"
    | "chart"
    | "moon"
    | "globe"
    | "drop"
    | "link"
    | "offline"
    | "mosque"
    | "restaurant";
}

export const FEATURES: Feature[] = [
  {
    title: "Linked Accounts",
    description:
      "Connect with family and friends using a profile code, choose exactly what to share, and grow in worship together — with pokes and shared progress.",
    icon: "link",
  },
  {
    title: "Offline-first",
    description:
      "The Qur'an, fonts, duas, tasbih and your records all work without a network — and sync automatically when you're back online.",
    icon: "offline",
  },
  {
    title: "Qur'an",
    description:
      "Read the mushaf with tajweed colouring, multiple translations, transliteration and audio recitation — with voice search to jump straight to any ayah.",
    icon: "quran",
  },
  {
    title: "Prayer Times",
    description:
      "Accurate Waktu Solat powered by official national authorities (JAKIM, Kemenag, MUIS, KHEU) with an elegant, time-aware progress arc for today's prayers.",
    icon: "clock",
  },
  {
    title: "Duas",
    description:
      "A rich, categorised library of supplications with Arabic, translation and transliteration for daily life, travel, protection and more.",
    icon: "dua",
  },
  {
    title: "Tasbih",
    description:
      "A digital counter with curated adhkar, vibration feedback and per-dhikr targets to keep your zikir flowing anywhere.",
    icon: "tasbih",
  },
  {
    title: "Qiblat",
    description:
      "A smooth compass that points to the Kaabah from your current location, so you are always facing the right direction.",
    icon: "compass",
  },
  {
    title: "Mosque",
    description:
      "Find nearby mosques in a tap — locate the closest masjid for your next prayer, wherever you are.",
    icon: "mosque",
  },
  {
    title: "Halal Restaurant",
    description:
      "Discover halal restaurants and eateries nearby, with one tap that takes you straight to the map.",
    icon: "restaurant",
  },
  {
    title: "Islamic Events",
    description:
      "Key Islamic dates and events at a glance, with Hijri and Gregorian dates for the year ahead.",
    icon: "calendar",
  },
  {
    title: "Prayer & Fasting Trackers",
    description:
      "Log your daily prayers and fasting, track streaks and review your consistency over time in the analytics tab.",
    icon: "heart",
  },
  {
    title: "Menstrual Tracker",
    description:
      "Log your haid and istihadah days, get cycle predictions and smart reminders so you never miss a prayer or fast.",
    icon: "drop",
  },
  {
    title: "Analytics",
    description:
      "Beautiful charts of your Qur'an reading, prayer and fasting habits — insight to help you grow, day by day.",
    icon: "chart",
  },
  {
    title: "Asma-ul-Husna",
    description:
      "Explore the 99 Beautiful Names of Allah with curated meaning, at your own pace.",
    icon: "moon",
  },
  {
    title: "3 Languages",
    description:
      "Fully localised in English, Bahasa Malaysia and Arabic — with a personalised home screen and font-size controls.",
    icon: "globe",
  },
];

export const FEATURE_STATS = [
  { value: "114", label: "Surahs" },
  { value: "5", label: "Daily prayers" },
  { value: "99", label: "Names of Allah" },
  { value: "3", label: "Languages" },
];
