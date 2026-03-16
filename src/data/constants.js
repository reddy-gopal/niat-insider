/** Opens in new tab when user clicks "Book Your Slot" / "Book Slot" */
export const BOOK_SLOT_URL = 'https://docs.google.com/forms/d/14VcKHM6JR_8I3u51IxcbPRRH9siwtLyOH3A21BpWTnE/viewform?edit_requested=true';

export const faqsData = [
  "What's the difference between a regular college and one that offers the NIAT program?",
  "Do we actually get paid internships in the first year?",
  "Can I start my own startup while studying?",
  "How do I crack the NAT? Any tips?"
];

/** Senior profile data — keep in seniorsData.json; update via: npm run import-seniors [path/to.csv] */
import seniorsDataJson from './seniorsData.json';
export const seniorsData = seniorsDataJson;

export const storiesData = [
  { name: "Abhinav", year: "2nd Year", color: "#7678ed" },
  { name: "Shruthi", year: "3rd Year", color: "#f18701" },
  { name: "Kiran", year: "4th Year", color: "#f35b04" }
];
