import { i as __toESM } from "./_runtime.mjs";
import { f as nightCount, h as partySize, i as destinationById, l as labelRange, o as fittingRooms, v as stayBySlug } from "./_ssr/catalog-n6drUDUe.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-ClboVcB8.mjs";
import { n as Header, r as money, t as Footer } from "./_ssr/money-B7_cCR2x.mjs";
import { t as SearchPanel } from "./_ssr/search-panel-BtA3IlvM.mjs";
import { a as tripCode, r as saveTrip } from "./_ssr/trips-ICfT_KnL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BZYyaAtf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StayPage() {
	const { slug } = Route.useParams();
	const search = Route.useSearch();
	const navigate = useNavigate({ from: "/stays/$slug" });
	const stay = stayBySlug(slug);
	const [roomId, setRoomId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(null);
	const guests = partySize(search.adults, search.children);
	const nights = nightCount(search.in, search.out);
	const rooms = stay ? fittingRooms(stay, guests) : [];
	const selected = (0, import_react.useMemo)(() => {
		if (!stay) return void 0;
		return rooms.find((room) => room.id === roomId) ?? rooms[0];
	}, [
		stay,
		rooms,
		roomId
	]);
	if (!stay) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { search }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-5 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "That stay is not on the desk"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			search,
			className: "mt-6 inline-flex h-11 items-center text-sm underline",
			children: "Back to places"
		})]
	})] });
	const destination = destinationById(stay.destinationId);
	const total = selected ? selected.price * nights : 0;
	function update(next) {
		navigate({
			search: (prev) => ({
				...prev,
				...next
			}),
			replace: true
		});
	}
	function reserve(event) {
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
			total
		});
		setError("");
		setDone(trip);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { search }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search,
					hash: "stays",
					className: "text-sm text-muted hover:text-ink",
					children: "All stays"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: stay.image,
					alt: stay.imageAlt,
					className: "photo-frame mt-4 aspect-16/10 w-full rounded-2xl object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-faint",
					children: [
						stay.kind,
						" · ",
						destination?.place,
						", ",
						destination?.country
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-5xl leading-none",
					children: stay.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: stay.neighborhood
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-base",
					children: stay.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 flex flex-col gap-2 text-sm text-muted",
					children: stay.amenities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 font-display text-3xl",
					children: "Rooms"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						guests,
						" ",
						guests === 1 ? "guest" : "guests",
						". Rooms that are too small stay closed."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: stay.rooms.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomChoice, {
						room,
						nights,
						disabled: room.sleeps < guests,
						selected: selected?.id === room.id,
						onSelect: () => setRoomId(room.id)
					}, room.id))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "h-fit rounded-3xl bg-foam p-4 shadow-card lg:sticky lg:top-6",
				children: done && selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Reserved on this device"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-4xl",
						children: "You’re set"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-medium tabular-nums",
						children: tripCode(done.id)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							stay.name,
							", ",
							selected.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: labelRange(done.checkIn, done.checkOut)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm tabular-nums",
						children: [
							money(done.total),
							" · ",
							done.guestName
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/trips",
						className: "mt-6 inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam",
						children: "See your trips"
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: labelRange(search.in, search.out)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							search.adults,
							" ",
							search.adults === 1 ? "adult" : "adults",
							search.children > 0 ? `, ${search.children} ${search.children === 1 ? "child" : "children"}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-sm text-muted underline-offset-4 hover:underline",
						onClick: () => setEditing((value) => !value),
						children: editing ? "Hide dates" : "Change dates or guests"
					}),
					editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, {
							search,
							onChange: update,
							tone: "paper",
							submitLabel: "Update",
							onSubmit: () => setEditing(false)
						})
					}) : null,
					selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: selected.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								money(selected.price),
								" × ",
								nights,
								" ",
								nights === 1 ? "night" : "nights"
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-sm text-muted",
						children: [
							"No room here sleeps ",
							guests,
							". Lower the party or pick another stay."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-4xl tabular-nums",
						children: selected ? money(total) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: "Taxes included. One room."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-5 flex flex-col gap-2",
						onSubmit: reserve,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-muted",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (event) => setName(event.target.value),
									autoComplete: "name",
									className: "h-12 w-full rounded-xl bg-paper px-3 outline-none ring-1 ring-line focus-visible:ring-2 focus-visible:ring-ink"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-muted",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: email,
									onChange: (event) => setEmail(event.target.value),
									autoComplete: "email",
									inputMode: "email",
									className: "h-12 w-full rounded-xl bg-paper px-3 outline-none ring-1 ring-line focus-visible:ring-2 focus-visible:ring-ink"
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: !selected || nights < 1,
								className: "mt-2 inline-flex h-12 items-center justify-center rounded-full bg-ink px-4 text-sm font-medium text-foam disabled:opacity-40",
								children: "Reserve this room"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Saved on this device only. Nothing is sent to the hotel."
					})
				] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
function RoomChoice({ room, nights, disabled, selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick: onSelect,
		"aria-pressed": selected,
		className: `flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left ${selected ? "bg-ink text-foam" : "bg-foam text-ink shadow-card"} disabled:opacity-45`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-medium",
			children: room.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `block text-sm ${selected ? "text-foam/75" : "text-muted"}`,
			children: [
				room.detail,
				" · sleeps ",
				room.sleeps
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-right text-sm tabular-nums",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-medium",
				children: money(room.price * Math.max(nights, 1))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: selected ? "text-foam/70" : "text-faint",
				children: [money(room.price), " / night"]
			})]
		})]
	});
}
//#endregion
export { StayPage as component };
