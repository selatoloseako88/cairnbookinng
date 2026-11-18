import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SearchPanel } from "@/components/search-panel";
import { StayCard } from "@/components/stay-card";
import {
  cheapestRoom,
  destinationById,
  destinations,
  partySize,
  staysFor,
  type DestinationId,
} from "@/lib/catalog";
import { nightCount } from "@/lib/dates";
import { parseTripSearch, type TripSearch } from "@/lib/search";

export const Route = createFileRoute("/")({
  validateSearch: parseTripSearch,
  head: () => ({
    meta: [{ title: "Cairn — Book a hotel or lodge" }],
  }),
  component: Home,
});

function Home() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const nights = nightCount(search.in, search.out);
  const guests = partySize(search.adults, search.children);
  const active = destinationById(search.where);
  const hero = active ?? destinations[0];
  const list = staysFor(search.where);

  function update(next: Partial<TripSearch>) {
    navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
  }

  function choosePlace(id: DestinationId | "all") {
    update({ where: id });
    document.getElementById("stays")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <section className="relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <img
            key={hero.image}
            src={hero.image}
            alt=""
            className="hero-photo h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
        </div>
        <Header overlay search={search} />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-end gap-8 px-5 pt-24 pb-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:pb-12">
          <div className="max-w-xl text-foam">
            <p className="text-sm text-foam/75">
              {active ? `${active.continent} · ${active.country}` : "Africa, Asia, Europe, the Americas"}
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none tracking-tight sm:text-6xl">
              {active ? `Stay in ${active.place}.` : "Book the room. Skip the scramble."}
            </h1>
            <p className="mt-4 max-w-md text-base text-foam/80">
              {active
                ? active.blurb
                : "Five places only — Cape Town, Kyoto, Berlin, New York, and Rio. You see the total for your nights before you reserve."}
            </p>
          </div>
          <SearchPanel
            search={search}
            onChange={update}
            onSubmit={() => document.getElementById("stays")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        </div>
      </section>

      <section id="places" className="scroll-mt-6 mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-4xl">Where you can stay</h2>
        <p className="mt-3 max-w-xl text-muted">
          One place on each continent. Choose it and the list below keeps only those hotels and lodges.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {destinations.map((destination) => {
            const selected = search.where === destination.id;
            return (
              <li key={destination.id}>
                <button
                  type="button"
                  onClick={() => choosePlace(selected ? "all" : destination.id)}
                  aria-pressed={selected}
                  className={`w-full rounded-2xl bg-foam p-2 text-left shadow-card ${
                    selected ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""
                  }`}
                >
                  <img
                    src={destination.image}
                    alt={destination.imageAlt}
                    className="photo-frame ratio-place w-full rounded-lg object-cover"
                  />
                  <span className="mt-3 block px-1 text-xs text-faint">{destination.continent}</span>
                  <span className="block px-1 pb-2 font-medium">{destination.place}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-y border-line">
        <ol className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
          <li>
            <p className="font-display text-3xl">01</p>
            <h3 className="mt-2 font-medium">Pick a place</h3>
            <p className="mt-1 text-sm text-muted">Not a world map. Five destinations, already chosen.</p>
          </li>
          <li>
            <p className="font-display text-3xl">02</p>
            <h3 className="mt-2 font-medium">Read the total</h3>
            <p className="mt-1 text-sm text-muted">The price is for your nights and your party. Taxes are in it.</p>
          </li>
          <li>
            <p className="font-display text-3xl">03</p>
            <h3 className="mt-2 font-medium">Reserve the room</h3>
            <p className="mt-1 text-sm text-muted">Name, email, done. Find it again under Trips on this device.</p>
          </li>
        </ol>
      </section>

      <section id="stays" className="scroll-mt-6 mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-4xl">{active ? `Stays in ${active.place}` : "Stays"}</h2>
            <p className="mt-2 text-sm text-muted tabular-nums">
              {list.length} {list.length === 1 ? "stay" : "stays"} · {guests} {guests === 1 ? "guest" : "guests"}
              {nights > 0 ? ` · ${nights} ${nights === 1 ? "night" : "nights"}` : ""}
            </p>
          </div>
          {search.where !== "all" ? (
            <button type="button" className="h-11 text-sm text-muted underline-offset-4 hover:underline" onClick={() => update({ where: "all" })}>
              Show all five places
            </button>
          ) : null}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((stay) => {
            const room = cheapestRoom(stay, guests);
            return (
              <StayCard
                key={stay.slug}
                stay={stay}
                nights={nights}
                fits={Boolean(room)}
                nightly={room?.price ?? null}
                quote={room ? room.price * nights : null}
                search={search}
              />
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
