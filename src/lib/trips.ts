export type Trip = {
  id: string;
  staySlug: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  guestName: string;
  email: string;
  total: number;
  createdAt: string;
};

const KEY = "cairn-trips";
const listeners = new Set<() => void>();

function read(): Trip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Trip[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(trips: Trip[]) {
  window.localStorage.setItem(KEY, JSON.stringify(trips));
  listeners.forEach((listener) => listener());
}

export function subscribeTrips(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function loadTrips(): Trip[] {
  return read().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveTrip(trip: Omit<Trip, "id" | "createdAt">): Trip {
  const next: Trip = {
    ...trip,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  write([next, ...read()]);
  return next;
}

export function removeTrip(id: string) {
  write(read().filter((trip) => trip.id !== id));
}

export function tripCode(id: string): string {
  return `CRN-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}
