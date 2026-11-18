import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { destinations, destinationById } from "@/lib/catalog";
import {
  addDays,
  formatIso,
  labelDate,
  monthCells,
  monthLabel,
  nightCount,
  parseLocal,
  sameDay,
  startOfToday,
} from "@/lib/dates";
import type { TripSearch } from "@/lib/search";

type Props = {
  search: TripSearch;
  onChange: (next: Partial<TripSearch>) => void;
  tone?: "ink" | "paper";
  submitLabel?: string;
  onSubmit?: () => void;
};

export function SearchPanel({ search, onChange, tone = "ink", submitLabel = "Show stays", onSubmit }: Props) {
  const nights = nightCount(search.in, search.out);
  const dark = tone === "ink";

  return (
    <form
      className={`w-full max-w-md rounded-3xl p-3 ${dark ? "bg-ink text-foam shadow-pop" : "bg-foam text-ink shadow-card"}`}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="grid gap-2">
        <PlaceField search={search} onChange={onChange} dark={dark} />
        <DateField search={search} onChange={onChange} dark={dark} />
        <GuestField search={search} onChange={onChange} dark={dark} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 px-1">
        <p className={`text-sm tabular-nums ${dark ? "text-foam/70" : "text-muted"}`}>
          {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Choose dates"}
        </p>
        <button
          type="submit"
          className={`inline-flex h-11 items-center rounded-full px-4 text-sm font-medium ${
            dark ? "bg-foam text-ink" : "bg-ink text-foam"
          }`}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function fieldClass(dark: boolean) {
  return `flex h-14 w-full flex-col justify-center rounded-xl px-3 text-left ${
    dark ? "bg-foam/10 hover:bg-foam/15" : "bg-paper hover:bg-paper"
  }`;
}

function PlaceField({
  search,
  onChange,
  dark,
}: {
  search: TripSearch;
  onChange: (next: Partial<TripSearch>) => void;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, ref, () => setOpen(false));
  const current = search.where === "all" ? "All five places" : (destinationById(search.where)?.place ?? "All five places");

  return (
    <div className="relative" ref={ref}>
      <button type="button" className={fieldClass(dark)} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span className={`text-xs ${dark ? "text-foam/60" : "text-faint"}`}>Where</span>
        <span className="truncate text-sm font-medium">{current}</span>
      </button>
      {open ? (
        <ul className="absolute z-30 mt-2 w-full rounded-xl bg-foam p-1 text-ink shadow-pop" role="listbox">
          <li>
            <button
              type="button"
              className="flex h-11 w-full items-center rounded-lg px-3 text-left text-sm hover:bg-paper"
              onClick={() => {
                onChange({ where: "all" });
                setOpen(false);
              }}
            >
              All five places
            </button>
          </li>
          {destinations.map((destination) => (
            <li key={destination.id}>
              <button
                type="button"
                className="flex h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm hover:bg-paper"
                onClick={() => {
                  onChange({ where: destination.id });
                  setOpen(false);
                }}
              >
                <span>{destination.place}</span>
                <span className="text-faint">{destination.continent}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function DateField({
  search,
  onChange,
  dark,
}: {
  search: TripSearch;
  onChange: (next: Partial<TripSearch>) => void;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pickingOut, setPickingOut] = useState(false);
  const [cursor, setCursor] = useState(() => parseLocal(search.in));
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, ref, () => setOpen(false));
  const today = startOfToday();
  const checkIn = parseLocal(search.in);
  const checkOut = parseLocal(search.out);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const labelId = useId();

  function pick(day: Date) {
    if (day < today) return;
    const iso = formatIso(day);
    if (!pickingOut) {
      onChange({ in: iso, out: formatIso(addDays(day, 2)) });
      setPickingOut(true);
      return;
    }
    if (iso <= search.in) {
      onChange({ in: iso, out: formatIso(addDays(day, 2)) });
      return;
    }
    onChange({ out: iso });
    setPickingOut(false);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className={fieldClass(dark)}
          aria-expanded={open}
          onClick={() => {
            setCursor(checkIn);
            setPickingOut(false);
            setOpen(true);
          }}
        >
          <span className={`text-xs ${dark ? "text-foam/60" : "text-faint"}`}>Check in</span>
          <span className="text-sm font-medium tabular-nums">{labelDate(search.in)}</span>
        </button>
        <button
          type="button"
          className={fieldClass(dark)}
          aria-expanded={open}
          onClick={() => {
            setCursor(checkIn);
            setPickingOut(false);
            setOpen(true);
          }}
        >
          <span className={`text-xs ${dark ? "text-foam/60" : "text-faint"}`}>Check out</span>
          <span className="text-sm font-medium tabular-nums">{labelDate(search.out)}</span>
        </button>
      </div>
      {open ? (
        <div className="absolute z-30 mt-2 w-full rounded-xl bg-foam p-3 text-ink shadow-pop">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-paper"
              aria-label="Previous month"
              onClick={() => setCursor(new Date(year, month - 1, 1))}
            >
              <ChevronLeft className="size-4" />
            </button>
            <p id={labelId} className="text-sm font-medium">
              {monthLabel(year, month)}
            </p>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-paper"
              aria-label="Next month"
              onClick={() => setCursor(new Date(year, month + 1, 1))}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs text-faint" aria-hidden="true">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={`${day}${index}`} className="py-1">
                {day}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7" role="grid" aria-labelledby={labelId}>
            {monthCells(year, month).map((day, index) => {
              if (!day) return <span key={`empty-${index}`} />;
              const iso = formatIso(day);
              const disabled = day < today;
              const selected = sameDay(day, checkIn) || sameDay(day, checkOut);
              const inRange = day > checkIn && day < checkOut;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => pick(day)}
                  className={`mx-auto inline-flex size-11 items-center justify-center rounded-full text-sm tabular-nums ${
                    selected ? "bg-ink text-foam" : inRange ? "bg-paper" : "hover:bg-paper"
                  } disabled:text-faint/50`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted">
            {pickingOut ? "Now choose a check-out day." : "Choose a check-in day."}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function GuestField({
  search,
  onChange,
  dark,
}: {
  search: TripSearch;
  onChange: (next: Partial<TripSearch>) => void;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, ref, () => setOpen(false));
  const guestLabel =
    search.children === 0
      ? `${search.adults} adult${search.adults === 1 ? "" : "s"}`
      : `${search.adults} adult${search.adults === 1 ? "" : "s"}, ${search.children} ${
          search.children === 1 ? "child" : "children"
        }`;

  return (
    <div className="relative" ref={ref}>
      <button type="button" className={fieldClass(dark)} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span className={`text-xs ${dark ? "text-foam/60" : "text-faint"}`}>Guests</span>
        <span className="text-sm font-medium">{guestLabel}</span>
      </button>
      {open ? (
        <div className="absolute z-30 mt-2 w-full rounded-xl bg-foam p-3 text-ink shadow-pop">
          <Stepper
            label="Adults"
            value={search.adults}
            min={1}
            max={8}
            onChange={(adults) => onChange({ adults })}
          />
          <Stepper
            label="Children"
            value={search.children}
            min={0}
            max={6}
            onChange={(children) => onChange({ children })}
          />
          <p className="mt-2 text-xs text-muted">One room per reservation. Pick a room that sleeps your party.</p>
        </div>
      ) : null}
    </div>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex h-12 items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full bg-paper disabled:opacity-40"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center text-sm tabular-nums">{value}</span>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full bg-paper disabled:opacity-40"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

function useDismiss(open: boolean, ref: RefObject<HTMLElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) close();
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, ref, close]);
}
