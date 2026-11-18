import { Link } from "@tanstack/react-router";
import { destinationById, type Stay } from "@/lib/catalog";
import { money } from "@/lib/money";
import type { TripSearch } from "@/lib/search";

type Props = {
  stay: Stay;
  nights: number;
  quote: number | null;
  nightly: number | null;
  fits: boolean;
  search: TripSearch;
};

export function StayCard({ stay, nights, quote, nightly, fits, search }: Props) {
  const destination = destinationById(stay.destinationId);
  return (
    <article className="card-lift flex flex-col rounded-2xl bg-foam p-2 shadow-card">
      <img
        src={stay.image}
        alt={stay.imageAlt}
        className="photo-frame ratio-stay w-full rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col px-3 pt-3 pb-3">
        <p className="text-xs text-faint">
          {stay.kind} · {destination?.place}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-tight">{stay.name}</h3>
        <p className="mt-1 text-sm text-muted">{stay.neighborhood}</p>
        <p className="mt-3 text-sm text-muted">
          <span className="tabular-nums text-ink">{stay.rating.toFixed(1)}</span>
          <span className="text-faint"> · {stay.reviews} reviews</span>
        </p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-sm">
            {fits && quote != null && nightly != null ? (
              <>
                <span className="block font-medium tabular-nums">{money(quote)} total</span>
                <span className="text-faint tabular-nums">
                  {money(nightly)} / night · {nights} {nights === 1 ? "night" : "nights"}
                </span>
              </>
            ) : (
              <span className="text-muted">No room sleeps this party</span>
            )}
          </p>
          <Link
            to="/stays/$slug"
            params={{ slug: stay.slug }}
            search={search}
            className="inline-flex h-11 shrink-0 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam"
          >
            See rooms
          </Link>
        </div>
      </div>
    </article>
  );
}
