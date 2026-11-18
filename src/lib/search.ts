import { addDays, defaultRange, formatIso, isIsoDate, nightCount, parseLocal, startOfToday } from "@/lib/dates";

export type TripSearch = {
  where: string;
  in: string;
  out: string;
  adults: number;
  children: number;
};

function clamp(value: unknown, fallback: number, min: number, max: number): number {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

export function parseTripSearch(search: Record<string, unknown>): TripSearch {
  const range = defaultRange();
  const today = formatIso(startOfToday());
  let checkIn = typeof search.in === "string" && isIsoDate(search.in) ? search.in : range.checkIn;
  let checkOut = typeof search.out === "string" && isIsoDate(search.out) ? search.out : range.checkOut;
  if (checkIn < today) checkIn = today;
  if (nightCount(checkIn, checkOut) < 1) checkOut = formatIso(addDays(parseLocal(checkIn), 2));
  const where = typeof search.where === "string" && search.where.length > 0 ? search.where : "all";
  return {
    where,
    in: checkIn,
    out: checkOut,
    adults: clamp(search.adults, 2, 1, 8),
    children: clamp(search.children, 0, 0, 6),
  };
}

export function defaultTripSearch(): TripSearch {
  const range = defaultRange();
  return { where: "all", in: range.checkIn, out: range.checkOut, adults: 2, children: 0 };
}
