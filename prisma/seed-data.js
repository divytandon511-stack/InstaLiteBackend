const users = [
  { username: "riya_travels", email: "riya@example.com", fullname: "Riya Sharma", bio: "Chasing sunsets 🌅", isPrivate: false, createdAt: "2026-01-03T09:00:00.000Z" },
  { username: "arjun_clicks", email: "arjun@example.com", fullname: "Arjun Mehta", bio: "Street photographer 📸", isPrivate: false, createdAt: "2026-01-07T10:30:00.000Z" },
  { username: "meera.eats", email: "meera@example.com", fullname: "Meera Iyer", bio: "Food first, always", isPrivate: true, createdAt: "2026-01-12T08:15:00.000Z" },
  { username: "kabir_sings", email: "kabir@example.com", fullname: "Kabir Khan", bio: null, isPrivate: false, createdAt: "2026-01-18T19:45:00.000Z" },
  { username: "ananya_reads", email: "ananya@example.com", fullname: "Ananya Rao", bio: "Books & chai", isPrivate: true, createdAt: "2026-01-25T07:20:00.000Z" },
  { username: "rohan_runs", email: "rohan@example.com", fullname: "Rohan Desai", bio: "Marathoner in training", isPrivate: false, createdAt: "2026-02-02T06:00:00.000Z" },
  { username: "sara_sketches", email: "sara@example.com", fullname: "Sara Thomas", bio: null, isPrivate: false, createdAt: "2026-02-09T14:10:00.000Z" },
  { username: "vikram.trek", email: "vikram@example.com", fullname: "Vikram Singh", bio: "Mountains > beaches", isPrivate: false, createdAt: "2026-02-15T11:00:00.000Z" },
  { username: "neha_designs", email: "neha@example.com", fullname: "Neha Kapoor", bio: "UI/UX designer", isPrivate: true, createdAt: "2026-02-21T16:30:00.000Z" },
  { username: "aditya_codes", email: "aditya@example.com", fullname: "Aditya Verma", bio: "I write bugs for a living", isPrivate: false, createdAt: "2026-03-01T22:05:00.000Z" },
  { username: "isha_dances", email: "isha@example.com", fullname: "Isha Patel", bio: null, isPrivate: false, createdAt: "2026-03-08T12:40:00.000Z" },
  { username: "dev_shoots", email: "dev@example.com", fullname: "Dev Malhotra", bio: "Wildlife photography", isPrivate: true, createdAt: "2026-03-15T05:55:00.000Z" },
];

const postAuthors = [
  "riya_travels", "arjun_clicks", "vikram.trek", "riya_travels",
  "arjun_clicks", "arjun_clicks", "rohan_runs", "riya_travels",
  "arjun_clicks", "meera.eats", "vikram.trek", "sara_sketches",
  "riya_travels", "meera.eats", "ananya_reads", "riya_travels",
  "vikram.trek", "dev_shoots", "riya_travels", "rohan_runs",
  "kabir_sings", "isha_dances", "riya_travels", "dev_shoots",
];

const postRows = [
  ["Sunset at Baga beach 🌅", "Goa", "2026-02-01T18:30:00.000Z"],
  ["Cutting chai at the station", "Mumbai", "2026-02-04T08:10:00.000Z"],
  ["Snow everywhere ❄️", "Manali", "2026-02-08T10:00:00.000Z"],
  ["Pink city vibes", "Jaipur", "2026-02-12T13:25:00.000Z"],
  [null, "Pune", "2026-02-15T07:45:00.000Z"],
  ["Marine Drive at night", "Mumbai", "2026-02-19T21:00:00.000Z"],
  ["Morning run done ✅", null, "2026-02-23T06:30:00.000Z"],
  ["Lake Pichola sunset", "Udaipur", "2026-02-27T17:50:00.000Z"],
  ["Shaniwar Wada on a Sunday", "Pune", "2026-03-03T11:15:00.000Z"],
  ["Fish thali > everything", "Goa", "2026-03-07T13:40:00.000Z"],
  ["Trek to Hampta Pass begins", "Manali", "2026-03-11T05:20:00.000Z"],
  ["New sketchbook, who dis", null, "2026-03-15T15:05:00.000Z"],
  ["Hawa Mahal at sunrise", "Jaipur", "2026-03-19T06:10:00.000Z"],
  ["Vada pav hunt 🍔", "Mumbai", "2026-03-23T19:30:00.000Z"],
  ["Rainy day + chai + book", "Pune", "2026-03-27T16:20:00.000Z"],
  ["Old Goa churches", "goa", "2026-03-31T10:50:00.000Z"],
  ["Solang valley paragliding 🪂", "Manali", "2026-04-04T12:00:00.000Z"],
  [null, null, "2026-04-08T09:35:00.000Z"],
  ["City Palace details", "Udaipur", "2026-04-12T14:45:00.000Z"],
  ["Sunset from Sinhagad fort", "Pune", "2026-04-16T18:15:00.000Z"],
  ["Gateway of India, finally", "Mumbai", "2026-04-20T08:55:00.000Z"],
  ["Dance practice behind the scenes", null, "2026-04-24T20:25:00.000Z"],
  ["Palolem beach mornings", "Goa", "2026-04-28T07:05:00.000Z"],
  ["Tiger spotted at Tadoba 🐅", "Chandrapur", "2026-05-02T06:40:00.000Z"],
];

const posts = postRows.map(([caption, location, createdAt], index) => ({
  author: postAuthors[index],
  imageUrl: `https://picsum.photos/seed/insta${String(index + 1).padStart(2, "0")}/600/600`,
  caption,
  location,
  createdAt,
}));

const likes = [
  ["meera.eats", "insta01"], ["vikram.trek", "insta01"], ["arjun_clicks", "insta01"],
  ["isha_dances", "insta01"], ["neha_designs", "insta01"], ["riya_travels", "insta03"],
  ["rohan_runs", "insta03"], ["arjun_clicks", "insta08"], ["kabir_sings", "insta08"],
  ["meera.eats", "insta08"], ["riya_travels", "insta10"], ["ananya_reads", "insta10"],
  ["kabir_sings", "insta10"], ["dev_shoots", "insta13"], ["arjun_clicks", "insta14"],
  ["meera.eats", "insta15"], ["neha_designs", "insta15"], ["aditya_codes", "insta15"],
  ["rohan_runs", "insta17"], ["isha_dances", "insta17"], ["vikram.trek", "insta20"],
  ["riya_travels", "insta20"], ["neha_designs", "insta22"], ["riya_travels", "insta24"],
  ["aditya_codes", "insta24"], ["vikram.trek", "insta24"], ["arjun_clicks", "insta24"],
  ["sara_sketches", "insta24"], ["rohan_runs", "insta24"],
].map(([user, post]) => ({ user, post }));

module.exports = { users, posts, likes };
