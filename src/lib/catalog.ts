export type DestinationId = "cape-town" | "kyoto" | "berlin" | "united-states" | "rio";

export type Room = {
  id: string;
  name: string;
  detail: string;
  sleeps: number;
  price: number;
};

export type Stay = {
  slug: string;
  destinationId: DestinationId;
  name: string;
  kind: "Hotel" | "Lodge" | "Ryokan";
  neighborhood: string;
  image: string;
  imageAlt: string;
  summary: string;
  amenities: string[];
  rooms: Room[];
  rating: number;
  reviews: number;
};

export type Destination = {
  id: DestinationId;
  continent: string;
  place: string;
  country: string;
  image: string;
  imageAlt: string;
  blurb: string;
};

export const destinations: Destination[] = [
  {
    id: "cape-town",
    continent: "Africa",
    place: "Cape Town",
    country: "South Africa",
    image: "/photos/cape-coast.jpg",
    imageAlt: "Rocky Cape Town coastline with the Atlantic and mountains beyond",
    blurb: "Atlantic hotels and a lodge on the mountain slope.",
  },
  {
    id: "kyoto",
    continent: "Asia",
    place: "Kyoto",
    country: "Japan",
    image: "/photos/kyoto-garden.jpg",
    imageAlt: "A wooden gate and raked garden at a Kyoto temple",
    blurb: "A ryokan and two small hotels near the temples.",
  },
  {
    id: "berlin",
    continent: "Europe",
    place: "Berlin",
    country: "Germany",
    image: "/photos/berlin-spree.jpg",
    imageAlt: "The Spree river and Museum Island in Berlin",
    blurb: "Two walkable hotels on the museum side of the river.",
  },
  {
    id: "united-states",
    continent: "North America",
    place: "United States",
    country: "New York",
    image: "/photos/nyc-bridge.jpg",
    imageAlt: "Brooklyn Bridge and the Manhattan skyline",
    blurb: "Two New York hotels — one by the bridge, one on the water.",
  },
  {
    id: "rio",
    continent: "South America",
    place: "Rio de Janeiro",
    country: "Brazil",
    image: "/photos/rio-bay.jpg",
    imageAlt: "Sugarloaf and the bay in Rio de Janeiro",
    blurb: "A bay hotel, a hillside lodge, and a room by Ipanema.",
  },
];

export const stays: Stay[] = [
  {
    slug: "signal-house",
    destinationId: "cape-town",
    name: "Signal House",
    kind: "Hotel",
    neighborhood: "Sea Point",
    image: "/photos/cape-coast.jpg",
    imageAlt: "Atlantic coastline below the Cape Town hills",
    summary:
      "A small hotel above the rocks on the Atlantic side. The promenade is a short walk; the mountain is the view from breakfast.",
    amenities: ["Breakfast included", "Quiet after 10", "Walk to the promenade"],
    rating: 4.8,
    reviews: 126,
    rooms: [
      { id: "cliff", name: "Cliff double", detail: "One queen bed, sea-facing window", sleeps: 2, price: 240 },
      { id: "corner", name: "Corner room", detail: "King bed and a daybed", sleeps: 3, price: 340 },
    ],
  },
  {
    slug: "table-yard",
    destinationId: "cape-town",
    name: "Table Yard",
    kind: "Hotel",
    neighborhood: "City Bowl",
    image: "/photos/cape-city.jpg",
    imageAlt: "Cape Town buildings with Table Mountain behind them",
    summary:
      "Rooms in the city bowl, aimed at the mountain. Gardens and the station are on foot, so you can skip a car.",
    amenities: ["City-center walk", "Desk in every room", "Late checkout on request"],
    rating: 4.6,
    reviews: 88,
    rooms: [
      { id: "mountain", name: "Mountain double", detail: "Queen bed, mountain outlook", sleeps: 2, price: 190 },
      { id: "family", name: "Family room", detail: "Two queens, blackout curtains", sleeps: 4, price: 280 },
    ],
  },
  {
    slug: "kloof-lodge",
    destinationId: "cape-town",
    name: "Kloof Lodge",
    kind: "Lodge",
    neighborhood: "Above Kloof Nek",
    image: "/photos/cape-table.jpg",
    imageAlt: "Sunlit rock faces of Table Mountain",
    summary:
      "A low lodge on the slope for people who want the mountain more than the street. Evenings are quiet. The city is a short drive down.",
    amenities: ["Lodge breakfast", "Trail notes at the desk", "Parking included"],
    rating: 4.9,
    reviews: 64,
    rooms: [
      { id: "lodge", name: "Lodge room", detail: "Queen bed, timber walls", sleeps: 2, price: 310 },
      { id: "cabin", name: "Cabin", detail: "Two rooms, a small porch", sleeps: 4, price: 420 },
    ],
  },
  {
    slug: "north-gate-ryokan",
    destinationId: "kyoto",
    name: "North Gate Ryokan",
    kind: "Ryokan",
    neighborhood: "North of the palace",
    image: "/photos/kyoto-room.jpg",
    imageAlt: "Tatami floors and shoji screens in a wooden Japanese room",
    summary:
      "Tatami rooms and a garden path. Shoes come off at the step. Breakfast is included, and the palace park is a morning walk.",
    amenities: ["Futon or low bed", "Breakfast included", "Garden path"],
    rating: 4.9,
    reviews: 141,
    rooms: [
      { id: "tatami", name: "Tatami room", detail: "Futons for two, garden side", sleeps: 2, price: 260 },
      { id: "garden", name: "Garden room", detail: "Low beds, sits three", sleeps: 3, price: 340 },
    ],
  },
  {
    slug: "pagoda-machiya",
    destinationId: "kyoto",
    name: "Pagoda Machiya",
    kind: "Hotel",
    neighborhood: "Temple quarter",
    image: "/photos/kyoto-pagoda.jpg",
    imageAlt: "A wooden pagoda among pines in Kyoto",
    summary:
      "A townhouse hotel beside the wooden temples. Beds, not futons. The lanes are the reason to stay on this side of the city.",
    amenities: ["Shoes-off house", "Tea in the room", "Bicycle loan"],
    rating: 4.7,
    reviews: 97,
    rooms: [
      { id: "machiya", name: "Machiya double", detail: "Queen bed, paper screens", sleeps: 2, price: 220 },
      { id: "upper", name: "Upper room", detail: "King bed under the eaves", sleeps: 2, price: 300 },
    ],
  },
  {
    slug: "garden-house-kyoto",
    destinationId: "kyoto",
    name: "Garden House",
    kind: "Hotel",
    neighborhood: "Temple gardens",
    image: "/photos/kyoto-garden.jpg",
    imageAlt: "Raked gravel and a wooden temple gate in Kyoto",
    summary:
      "A calm hotel opened onto a raked garden. Useful if you want a Western bed and an early, quiet start.",
    amenities: ["Garden courtyard", "Western beds", "Early breakfast"],
    rating: 4.5,
    reviews: 73,
    rooms: [
      { id: "court", name: "Court double", detail: "Queen bed facing the garden", sleeps: 2, price: 200 },
      { id: "suite", name: "Suite", detail: "Two queens, separate sitting room", sleeps: 4, price: 320 },
    ],
  },
  {
    slug: "spree-house",
    destinationId: "berlin",
    name: "Spree House",
    kind: "Hotel",
    neighborhood: "Museum Island",
    image: "/photos/berlin-spree.jpg",
    imageAlt: "Museum Island and the Spree in autumn light",
    summary:
      "A hotel a few minutes from the island museums. Trains stop across the bridge, so most of the center is an easy ride.",
    amenities: ["River walk", "Transit two minutes away", "Desk and blackout"],
    rating: 4.6,
    reviews: 154,
    rooms: [
      { id: "river", name: "River double", detail: "Queen bed, street or river side", sleeps: 2, price: 210 },
      { id: "family", name: "Family room", detail: "Two queens", sleeps: 4, price: 360 },
    ],
  },
  {
    slug: "bode-rooms",
    destinationId: "berlin",
    name: "Bode Rooms",
    kind: "Hotel",
    neighborhood: "Museum quarter",
    image: "/photos/berlin-bode.jpg",
    imageAlt: "Stone museum facade beside a bridge in Berlin",
    summary:
      "A smaller hotel in the stone quarter. Built for walking: museums, the island, and dinner without a map marathon.",
    amenities: ["Walkable quarter", "Quiet rooms at the back", "Kettle and coffee"],
    rating: 4.4,
    reviews: 81,
    rooms: [
      { id: "classic", name: "Classic double", detail: "Queen bed, courtyard side", sleeps: 2, price: 180 },
      { id: "quiet", name: "Quiet king", detail: "King bed, top floor", sleeps: 2, price: 240 },
    ],
  },
  {
    slug: "bridge-house",
    destinationId: "united-states",
    name: "Bridge House",
    kind: "Hotel",
    neighborhood: "Brooklyn",
    image: "/photos/nyc-bridge.jpg",
    imageAlt: "Brooklyn Bridge towers with Manhattan behind them",
    summary:
      "On the Brooklyn side of the bridge. Manhattan is one stop away. The walk across is the reason most guests pick this hotel.",
    amenities: ["Bridge walk", "Subway nearby", "Blackout curtains"],
    rating: 4.7,
    reviews: 203,
    rooms: [
      { id: "bridge", name: "Bridge double", detail: "Queen bed, city outlook", sleeps: 2, price: 290 },
      { id: "suite", name: "Suite", detail: "King bed and a sofa bed", sleeps: 3, price: 410 },
    ],
  },
  {
    slug: "harbor-rooms",
    destinationId: "united-states",
    name: "Harbor Rooms",
    kind: "Hotel",
    neighborhood: "Lower Manhattan waterfront",
    image: "/photos/nyc-dusk.jpg",
    imageAlt: "Manhattan skyline and the Brooklyn Bridge at dusk",
    summary:
      "Compact rooms on the water, with the skyline doing most of the work. Good if you want downtown on foot.",
    amenities: ["Waterfront", "Compact rooms", "Late arrival desk"],
    rating: 4.5,
    reviews: 118,
    rooms: [
      { id: "city", name: "City double", detail: "Queen bed", sleeps: 2, price: 270 },
      { id: "king", name: "King room", detail: "King bed, higher floor", sleeps: 2, price: 350 },
    ],
  },
  {
    slug: "urca-house",
    destinationId: "rio",
    name: "Urca House",
    kind: "Hotel",
    neighborhood: "Urca",
    image: "/photos/rio-bay.jpg",
    imageAlt: "Sugarloaf Mountain across the bay in Rio de Janeiro",
    summary:
      "Below Sugarloaf, on the bay. Urca is the quiet neighborhood. The bondinho is a walk, not a cross-town trip.",
    amenities: ["Bay neighborhood", "Walk to Sugarloaf", "Breakfast included"],
    rating: 4.8,
    reviews: 92,
    rooms: [
      { id: "bay", name: "Bay double", detail: "Queen bed", sleeps: 2, price: 190 },
      { id: "lookout", name: "Lookout room", detail: "King bed, higher floor", sleeps: 3, price: 280 },
    ],
  },
  {
    slug: "hill-lodge",
    destinationId: "rio",
    name: "Hill Lodge",
    kind: "Lodge",
    neighborhood: "Hillside above the bay",
    image: "/photos/rio-sugar.jpg",
    imageAlt: "The rock face of Sugarloaf rising over green hills",
    summary:
      "A small lodge set into the hill, for mornings when the bay is still. Fewer rooms, a longer view, a short ride down to the water.",
    amenities: ["Hill quiet", "Breakfast included", "Ride notes to the beach"],
    rating: 4.7,
    reviews: 57,
    rooms: [
      { id: "lodge", name: "Lodge room", detail: "Queen bed, balcony", sleeps: 2, price: 230 },
      { id: "cabin", name: "Family cabin", detail: "Two bedrooms", sleeps: 4, price: 360 },
    ],
  },
  {
    slug: "ipanema-shore",
    destinationId: "rio",
    name: "Ipanema Shore",
    kind: "Hotel",
    neighborhood: "Ipanema",
    image: "/photos/rio-ipanema.jpg",
    imageAlt: "Ipanema beach with Dois Irmãos mountains across the water",
    summary:
      "Across from the beach. Rooms stay simple on purpose — the shore is the amenity, and the mountains close the view.",
    amenities: ["Beach across the street", "Rinse shower", "Fan and air"],
    rating: 4.6,
    reviews: 133,
    rooms: [
      { id: "shore", name: "Shore double", detail: "Queen bed", sleeps: 2, price: 220 },
      { id: "ocean", name: "Ocean king", detail: "King bed, beach side", sleeps: 2, price: 310 },
    ],
  },
];

export function destinationById(id: string): Destination | undefined {
  return destinations.find((destination) => destination.id === id);
}

export function stayBySlug(slug: string): Stay | undefined {
  return stays.find((stay) => stay.slug === slug);
}

export function staysFor(where: string): Stay[] {
  if (where === "all") return stays;
  return stays.filter((stay) => stay.destinationId === where);
}

export function partySize(adults: number, children: number): number {
  return adults + children;
}

export function fittingRooms(stay: Stay, guests: number): Room[] {
  return stay.rooms.filter((room) => room.sleeps >= guests);
}

export function cheapestRoom(stay: Stay, guests: number): Room | undefined {
  return fittingRooms(stay, guests).sort((a, b) => a.price - b.price)[0];
}
