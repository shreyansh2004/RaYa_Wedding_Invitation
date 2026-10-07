export const invitation = {
  bride: {
    name: "Riya Kothari",
    parents: ["Nilesh Kothari", "Sunita Kothari"],
  },
  groom: {
    name: "Rahul Mehta",
    parents: ["sample name", "sample name"],
  },
  wedding: {
    date: "2026-12-27",
    day: "Sunday",
    muhurat: "12:00 PM",
    durationMinutes: 60,
  },
  venue: {
    name: "Neemuch",
    address: "sample address",
    mapsUrl: "sample link",
  },
  events: [
    { name: "Chaak", date: "2026-12-26", time: "10:00 AM" },
    { name: "Haldi", date: "2026-12-26", time: "1:00 PM" },
    { name: "Mamera", date: "2026-12-26", time: "3:00 PM" },
    { name: "Reception", date: "2026-12-26", time: "5:00 PM" },
    { name: "Jaimala", date: "2026-12-27", time: "10:00 AM" },
    { name: "Wedding Ceremony", date: "2026-12-27", time: "12:00 PM" },
  ],
} as const;

export const weddingStart = "2026-12-27T12:00:00+05:30";

export function isPlaceholder(value: string) {
  return value.trim().toLowerCase().startsWith("sample");
}

export function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${date}T12:00:00+05:30`));
}

export function formatEventTimeForDateTime(time: string) {
  const [clock, meridiem] = time.split(" ");
  const [rawHours, minutes] = clock.split(":").map(Number);
  const hours =
    meridiem === "PM" ? (rawHours % 12) + 12 : rawHours % 12;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+05:30`;
}
