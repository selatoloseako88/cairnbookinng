import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SearchPanel } from "@/components/search-panel";
import {
  destinationById,
  fittingRooms,
  partySize,
  stayBySlug,
  type Room,
} from "@/lib/catalog";
import { labelRange, nightCount } from "@/lib/dates";
import { money } from "@/lib/money";
import { parseTripSearch, type TripSearch } from "@/lib/search";
import { saveTrip, tripCode, type Trip } from "@/lib/trips";

export const Route = createFileRoute("/stays/$slug")({
  validateSearch: parseTripSearch,
  head: ({ params }) => ({
    meta: [{ title: `${stayBySlug(params.slug)?.name ?? "Stay"} — Cairn` }],
  }),
  component: StayPage,
});

function StayPage() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/stays/$slug" });
  const stay = stayBySlug(slug);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [done, setDone] = useState<Trip | null>(null);

  const guests = partySize(search.adults, search.children);
  const nights = nightCount(search.in, search.out);
  const rooms = stay ? fittingRooms(stay, guests) : [];
  const selected = useMemo(() => {
    if (!stay) return undefined;
    return rooms.find((room) => room.id === roomId) ?? rooms[0];
  }, [stay, rooms, roomId]);

  if (!stay) {
    return (
      <main>
        <Header search={search} />
        <div className="mx-auto max-w-xl px-5 py-24">
          <h1 className="font-display text-4xl">That stay is not on the desk</h1>
          <Link to="/" search={search} className="mt-6 inline-flex h-11 items-center text-sm underline">
            Back to places
          </Link>
        </div>
      </main>
    );
  }

  const destination = destinationById(stay.destinationId);
  const total = selected ? selected.price * nights : 0;

  function update(next: Partial<TripSearch>) {
    navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
  }

  function reserve(event: FormEvent) {
    event.preventDefault();
    if (!selected || nights < 1) return;
    if (name.trim().length < 2) {
      setError("Add the name for the reservation.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Add an email so you can find this trip later.");
      return;
    }
    const trip = saveTrip({
      staySlug: stay?.slug ?? slug,
      roomId: selected.id,
      checkIn: search.in,
      checkOut: search.out,
      adults: search.adults,
      children: search.children,
      guestName: name.trim(),
      email: email.trim(),
      total,
    });
    setError("");
    setDone(trip);
  }

  return (
    <main>
      <Header search={search} />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
        <div>
          <Link to="/" search={search} hash="stays" className="text-sm text-muted hover:text-ink">
            All stays
          </Link>
          <img
            src={stay.image}
            alt={stay.imageAlt}
            className="photo-frame ratio-wide mt-4 w-full rounded-2xl object-cover"
          />
          <p className="mt-6 text-sm text-faint">
            {stay.kind} · {destination?.place}, {destination?.country}
          </p>
          <h1 className="mt-1 font-display text-5xl leading-none">{stay.name}</h1>
          <p className="mt-2 text-muted">{stay.neighborhood}</p>
          <p className="mt-4 max-w-xl text-base">{stay.summary}</p>
          <ul className="mt-6 flex flex-col gap-2 text-sm text-muted">
            {stay.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-3xl">Rooms</h2>
          <p className="mt-2 text-sm text-muted">
            {guests} {guests === 1 ? "guest" : "guests"}. Rooms that are too small stay closed.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {stay.rooms.map((room) => (
              <RoomChoice
                key={room.id}
                room={room}
                nights={nights}
                disabled={room.sleeps < guests}
                selected={selected?.id === room.id}
                onSelect={() => setRoomId(room.id)}
              />
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-3xl bg-foam p-4 shadow-card lg:sticky lg:top-6">
          {done && selected ? (
            <div>
              <p className="text-sm text-muted">Reserved on this device</p>
              <h2 className="mt-1 font-display text-4xl">You’re set</h2>
              <p className="mt-3 font-medium tabular-nums">{tripCode(done.id)}</p>
              <p className="mt-3 text-sm">
                {stay.name}, {selected.name}
              </p>
              <p className="text-sm text-muted">{labelRange(done.checkIn, done.checkOut)}</p>
              <p className="mt-2 text-sm tabular-nums">
                {money(done.total)} · {done.guestName}
              </p>
              <Link
                to="/trips"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam"
              >
                See your trips
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted">{labelRange(search.in, search.out)}</p>
              <p className="mt-1 text-sm">
                {search.adults} {search.adults === 1 ? "adult" : "adults"}
                {search.children > 0
                  ? `, ${search.children} ${search.children === 1 ? "child" : "children"}`
                  : ""}
              </p>
              <button
                type="button"
                className="mt-2 text-sm text-muted underline-offset-4 hover:underline"
                onClick={() => setEditing((value) => !value)}
              >
                {editing ? "Hide dates" : "Change dates or guests"}
              </button>
              {editing ? (
                <div className="mt-3">
                  <SearchPanel search={search} onChange={update} tone="paper" submitLabel="Update" onSubmit={() => setEditing(false)} />
                </div>
              ) : null}
              {selected ? (
                <p className="mt-5 text-sm">
                  <span className="block font-medium">{selected.name}</span>
                  <span className="tabular-nums text-muted">
                    {money(selected.price)} × {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                </p>
              ) : (
                <p className="mt-5 text-sm text-muted">No room here sleeps {guests}. Lower the party or pick another stay.</p>
              )}
              <p className="mt-3 font-display text-4xl tabular-nums">{selected ? money(total) : "—"}</p>
              <p className="text-xs text-faint">Taxes included. One room.</p>
              <form className="mt-5 flex flex-col gap-2" onSubmit={reserve}>
                <label className="text-sm">
                  <span className="mb-1 block text-muted">Name</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className="h-12 w-full rounded-xl bg-paper px-3 outline-none ring-1 ring-line focus-visible:ring-2 focus-visible:ring-ink"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted">Email</span>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    inputMode="email"
                    className="h-12 w-full rounded-xl bg-paper px-3 outline-none ring-1 ring-line focus-visible:ring-2 focus-visible:ring-ink"
                  />
                </label>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <button
                  type="submit"
                  disabled={!selected || nights < 1}
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-ink px-4 text-sm font-medium text-foam disabled:opacity-40"
                >
                  Reserve this room
                </button>
              </form>
              <p className="mt-3 text-xs text-muted">
                Saved on this device only. Nothing is sent to the hotel.
              </p>
            </>
          )}
        </aside>
      </div>
      <Footer />
    </main>
  );
}

function RoomChoice({
  room,
  nights,
  disabled,
  selected,
  onSelect,
}: {
  room: Room;
  nights: number;
  disabled: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left ${
        selected ? "bg-ink text-foam" : "bg-foam text-ink shadow-card"
      } disabled:opacity-45`}
    >
      <span>
        <span className="block font-medium">{room.name}</span>
        <span className={`block text-sm ${selected ? "text-foam/75" : "text-muted"}`}>
          {room.detail} · sleeps {room.sleeps}
        </span>
      </span>
      <span className="text-right text-sm tabular-nums">
        <span className="block font-medium">{money(room.price * Math.max(nights, 1))}</span>
        <span className={selected ? "text-foam/70" : "text-faint"}>{money(room.price)} / night</span>
      </span>
    </button>
  );
}
