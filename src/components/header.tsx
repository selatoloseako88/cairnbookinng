import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Mark } from "@/components/mark";
import { defaultTripSearch, type TripSearch } from "@/lib/search";

export function Header({ overlay = false, search }: { overlay?: boolean; search?: TripSearch }) {
  const [open, setOpen] = useState(false);
  const tone = overlay ? "text-foam" : "text-ink";
  const trip = search ?? defaultTripSearch();
  const linkTone = overlay ? "text-foam/85 hover:text-foam" : "text-muted hover:text-ink";

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-20" : "relative z-20 border-b border-line bg-paper"}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" search={trip} className={`flex items-center gap-2 font-display text-xl ${tone}`}>
          <Mark />
          Cairn
        </Link>
        <nav className="hidden items-center gap-7 sm:flex">
          <Link to="/" hash="places" search={trip} className={`text-sm ${linkTone}`}>
            Places
          </Link>
          <Link to="/" hash="stays" search={trip} className={`text-sm ${linkTone}`}>
            Stays
          </Link>
          <Link to="/trips" className={`text-sm ${linkTone}`}>
            Trips
          </Link>
          <Link
            to="/"
            hash="stays"
            search={trip}
            className={`inline-flex h-11 items-center rounded-full px-4 text-sm font-medium ${
              overlay ? "bg-foam text-ink" : "bg-ink text-foam"
            }`}
          >
            Book
          </Link>
        </nav>
        <button
          type="button"
          className={`inline-flex size-11 items-center justify-center rounded-full sm:hidden ${
            overlay ? "text-foam" : "text-ink"
          }`}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-paper px-5 py-3 sm:hidden">
          <nav className="flex flex-col">
            <Link to="/" hash="places" search={trip} className="flex h-12 items-center text-ink" onClick={() => setOpen(false)}>
              Places
            </Link>
            <Link to="/" hash="stays" search={trip} className="flex h-12 items-center text-ink" onClick={() => setOpen(false)}>
              Stays
            </Link>
            <Link to="/trips" className="flex h-12 items-center text-ink" onClick={() => setOpen(false)}>
              Trips
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
