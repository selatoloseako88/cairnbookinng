import { Mark } from "@/components/mark";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-muted sm:px-8">
        <p className="flex items-center gap-2 font-display text-lg text-ink">
          <Mark />
          Cairn
        </p>
        <p className="max-w-xl">
          Cape Town, Kyoto, Berlin, New York, and Rio de Janeiro. The places are real. The hotels and lodges
          are sample stays for this desk — a reservation is saved on this device and is not sent to a property.
        </p>
        <p>Prices in USD. The nightly rate already includes taxes.</p>
      </div>
    </footer>
  );
}
