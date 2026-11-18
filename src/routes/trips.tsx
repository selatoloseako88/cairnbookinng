import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { destinationById, stayBySlug } from "@/lib/catalog";
import { labelRange, nightCount } from "@/lib/dates";
import { money } from "@/lib/money";
import { defaultTripSearch } from "@/lib/search";
import { loadTrips, removeTrip, subscribeTrips, tripCode, type Trip } from "@/lib/trips";

export const Route = createFileRoute("/trips")({
  head: () => ({ meta: [{ title: "Your trips — Cairn" }] }),
  component: TripsPage,
});

function TripsPage() {
  const [ready, setReady] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    setTrips(loadTrips());
    setReady(true);
    return subscribeTrips(() => setTrips(loadTrips()));
  }, []);

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <h1 className="font-display text-5xl">Your trips</h1>
        <p className="mt-3 max-w-lg text-muted">
          Reservations you make on this device. They stay in the browser — close the tab and they are still here.
        </p>
        {!ready ? <p className="mt-10 text-sm text-muted">Loading trips…</p> : null}
        {ready && trips.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-foam p-6 shadow-card">
            <p className="font-medium">No trips yet</p>
            <p className="mt-1 text-sm text-muted">Pick a place, choose a room, and reserve. It will show up here.</p>
            <Link
              to="/"
              hash="stays"
              search={defaultTripSearch()}
              className="mt-5 inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam"
            >
              Browse stays
            </Link>
          </div>
        ) : null}
        <ul className="mt-8 flex flex-col gap-3">
          {trips.map((trip) => {
            const stay = stayBySlug(trip.staySlug);
            const destination = stay ? destinationById(stay.destinationId) : undefined;
            const room = stay?.rooms.find((item) => item.id === trip.roomId);
            const nights = nightCount(trip.checkIn, trip.checkOut);
            return (
              <li key={trip.id} className="rounded-2xl bg-foam p-4 shadow-card sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-faint tabular-nums">{tripCode(trip.id)}</p>
                    <h2 className="mt-1 font-display text-3xl">{stay?.name ?? "Stay removed"}</h2>
                    <p className="text-sm text-muted">
                      {room?.name ?? "Room"} · {destination?.place}
                    </p>
                  </div>
                  <p className="text-right font-medium tabular-nums">{money(trip.total)}</p>
                </div>
                <p className="mt-3 text-sm">{labelRange(trip.checkIn, trip.checkOut)}</p>
                <p className="text-sm text-muted">
                  {nights} {nights === 1 ? "night" : "nights"} · {trip.adults} {trip.adults === 1 ? "adult" : "adults"}
                  {trip.children > 0 ? `, ${trip.children} ${trip.children === 1 ? "child" : "children"}` : ""} ·{" "}
                  {trip.guestName}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {stay ? (
                    <Link
                      to="/stays/$slug"
                      params={{ slug: stay.slug }}
                      search={{
                        where: stay.destinationId,
                        in: trip.checkIn,
                        out: trip.checkOut,
                        adults: trip.adults,
                        children: trip.children,
                      }}
                      className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam"
                    >
                      View stay
                    </Link>
                  ) : null}
                  {pending === trip.id ? (
                    <>
                      <button
                        type="button"
                        className="inline-flex h-11 items-center rounded-full px-4 text-sm text-danger"
                        onClick={() => {
                          removeTrip(trip.id);
                          setPending(null);
                        }}
                      >
                        Confirm cancel
                      </button>
                      <button type="button" className="inline-flex h-11 items-center text-sm text-muted" onClick={() => setPending(null)}>
                        Keep it
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex h-11 items-center text-sm text-muted"
                      onClick={() => setPending(trip.id)}
                    >
                      Cancel trip
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
