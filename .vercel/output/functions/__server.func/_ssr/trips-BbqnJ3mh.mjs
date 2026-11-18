import { i as __toESM } from "../_runtime.mjs";
import { f as nightCount, i as destinationById, l as labelRange, r as defaultTripSearch, v as stayBySlug } from "./catalog-n6drUDUe.mjs";
import { J as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Header, r as money, t as Footer } from "./money-B7_cCR2x.mjs";
import { a as tripCode, i as subscribeTrips, n as removeTrip, t as loadTrips } from "./trips-ICfT_KnL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trips-BbqnJ3mh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TripsPage() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [trips, setTrips] = (0, import_react.useState)([]);
	const [pending, setPending] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setTrips(loadTrips());
		setReady(true);
		return subscribeTrips(() => setTrips(loadTrips()));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-5 py-12 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl",
					children: "Your trips"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-lg text-muted",
					children: "Reservations you make on this device. They stay in the browser — close the tab and they are still here."
				}),
				!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-sm text-muted",
					children: "Loading trips…"
				}) : null,
				ready && trips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-2xl bg-foam p-6 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "No trips yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Pick a place, choose a room, and reserve. It will show up here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "stays",
							search: defaultTripSearch(),
							className: "mt-5 inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam",
							children: "Browse stays"
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 flex flex-col gap-3",
					children: trips.map((trip) => {
						const stay = stayBySlug(trip.staySlug);
						const destination = stay ? destinationById(stay.destinationId) : void 0;
						const room = stay?.rooms.find((item) => item.id === trip.roomId);
						const nights = nightCount(trip.checkIn, trip.checkOut);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl bg-foam p-4 shadow-card sm:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-faint tabular-nums",
											children: tripCode(trip.id)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-1 font-display text-3xl",
											children: stay?.name ?? "Stay removed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted",
											children: [
												room?.name ?? "Room",
												" · ",
												destination?.place
											]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-right font-medium tabular-nums",
										children: money(trip.total)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm",
									children: labelRange(trip.checkIn, trip.checkOut)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										nights,
										" ",
										nights === 1 ? "night" : "nights",
										" · ",
										trip.adults,
										" ",
										trip.adults === 1 ? "adult" : "adults",
										trip.children > 0 ? `, ${trip.children} ${trip.children === 1 ? "child" : "children"}` : "",
										" ·",
										" ",
										trip.guestName
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-3",
									children: [stay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/stays/$slug",
										params: { slug: stay.slug },
										search: {
											where: stay.destinationId,
											in: trip.checkIn,
											out: trip.checkOut,
											adults: trip.adults,
											children: trip.children
										},
										className: "inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam",
										children: "View stay"
									}) : null, pending === trip.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex h-11 items-center rounded-full px-4 text-sm text-danger",
										onClick: () => {
											removeTrip(trip.id);
											setPending(null);
										},
										children: "Confirm cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex h-11 items-center text-sm text-muted",
										onClick: () => setPending(null),
										children: "Keep it"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex h-11 items-center text-sm text-muted",
										onClick: () => setPending(trip.id),
										children: "Cancel trip"
									})]
								})
							]
						}, trip.id);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
//#endregion
export { TripsPage as component };
