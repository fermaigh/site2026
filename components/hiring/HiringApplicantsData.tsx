/** Row and drawer content for the applicants demo. The drawer reads from the
 *  same record as the row it belongs to, so the two can never drift apart. */

export type ScoreTone = "strong" | "good" | "fair" | "weak";

export type Applicant = {
  id: string;
  name: string;
  isNew?: boolean;
  role: string;
  score: string;
  tone: ScoreTone;
  flagged?: boolean;
  applied: string;
  source: string;
  hasNote?: boolean;
  /** Present only for the two applicants the demo opens. */
  detail?: {
    rating: string;
    verdict: string;
    overall: string[];
    has: string[];
    lookFor: string[];
    survey: string;
    zip: string;
    email: string;
    phone: string;
  };
};

export const SCORE_TONES: Record<ScoreTone, { bg: string; fg: string }> = {
  strong: { bg: "#4ADE80", fg: "#08351A" },
  good: { bg: "#C7F0D2", fg: "#123F20" },
  fair: { bg: "#FDE68A", fg: "#7C630F" },
  weak: { bg: "#FBD5D5", fg: "#8A2020" },
};

export const APPLICANTS: Applicant[] = [
  {
    id: "corey",
    name: "Corey Dias",
    isNew: true,
    role: "Crew member ( Papa Johns 2434 )",
    score: "6/10",
    tone: "weak",
    flagged: true,
    applied: "May 23, 2023",
    source: "Indeed",
    detail: {
      rating: "6.4",
      verdict: "Fair match",
      overall: [
        "This applicant is a moderate fit based on their score. They may need more screening before your team moves forward.",
        "Consider a structured interview to probe the traits your top performers share. 🔍",
      ],
      has: ["Care"],
      lookFor: ["Thoughtful", "Ambitiousness"],
      survey: "Completed survey on Tuesday, May 23, 2023",
      zip: "63108",
      email: "corey.dias@gmail.com",
      phone: "470-123-0142",
    },
  },
  {
    id: "cooper",
    name: "Cooper Philips",
    isNew: true,
    role: "Crew member ( Papa Johns 2434 )",
    score: "8/10",
    tone: "good",
    applied: "May 22, 2023",
    source: "Indeed",
    hasNote: true,
  },
  {
    id: "rayna",
    name: "Rayna Mango",
    role: "Crew member ( Papa Johns 2434 )",
    score: "9/10",
    tone: "strong",
    applied: "May 22, 2023",
    source: "Indeed",
    detail: {
      rating: "9.2",
      verdict: "Excellent match",
      overall: [
        "This applicant is an excellent fit based on their score. If they are hired, they will likely perform as well as your current top performers.",
        "This type of candidate can be an instant hire or you can reach out for a quick interview! 👍",
      ],
      has: ["Thoughtful", "Ambitiousness", "Care"],
      lookFor: ["Thoughtful", "Ambitiousness", "Care"],
      survey: "Completed survey on Monday, May 22, 2023",
      zip: "63224",
      email: "rayna.mango@gmail.com",
      phone: "323-123-3654",
    },
  },
  {
    id: "mira",
    name: "Mira Kenter",
    role: "Crew member ( Papa Johns 2434 )",
    score: "7/10",
    tone: "fair",
    flagged: true,
    applied: "May 23, 2023",
    source: "Indeed",
  },
  {
    id: "alena",
    name: "Alena Philips",
    role: "Crew member ( Papa Johns 2434 )",
    score: "4/10",
    tone: "weak",
    applied: "May 22, 2023",
    source: "Indeed",
    hasNote: true,
  },
];
