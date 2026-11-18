import { a as destinations, f as nightCount, h as partySize, i as destinationById, n as cheapestRoom, y as staysFor } from "./catalog-n6drUDUe.mjs";
import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2 } from "./router-ClboVcB8.mjs";
import { n as Header, r as money, t as Footer } from "./money-B7_cCR2x.mjs";
import { t as SearchPanel } from "./search-panel-BtA3IlvM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-8euNzjaO.js
var import_jsx_runtime = require_jsx_runtime();
function StayCard({ stay, nights, quote, nightly, fits, search }) {
	const destination = destinationById(stay.destinationId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-lift flex flex-col rounded-2xl bg-foam p-2 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: stay.image,
			alt: stay.imageAlt,
			className: "photo-frame aspect-3/2 w-full rounded-lg object-cover",
			loading: "lazy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-3 pt-3 pb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-faint",
					children: [
						stay.kind,
						" · ",
						destination?.place
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-2xl leading-tight",
					children: stay.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: stay.neighborhood
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-ink",
						children: stay.rating.toFixed(1)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-faint",
						children: [
							" · ",
							stay.reviews,
							" reviews"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: fits && quote != null && nightly != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block font-medium tabular-nums",
							children: [money(quote), " total"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-faint tabular-nums",
							children: [
								money(nightly),
								" / night · ",
								nights,
								" ",
								nights === 1 ? "night" : "nights"
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "No room sleeps this party"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/stays/$slug",
						params: { slug: stay.slug },
						search,
						className: "inline-flex h-11 shrink-0 items-center rounded-full bg-ink px-4 text-sm font-medium text-foam",
						children: "See rooms"
					})]
				})
			]
		})]
	});
}
function Home() {
	const search = Route$2.useSearch();
	const navigate = useNavigate({ from: "/" });
	const nights = nightCount(search.in, search.out);
	const guests = partySize(search.adults, search.children);
	const active = destinationById(search.where);
	const hero = active ?? destinations[0];
	const list = staysFor(search.where);
	function update(next) {
		navigate({
			search: (prev) => ({
				...prev,
				...next
			}),
			replace: true
		});
	}
	function choosePlace(id) {
		update({ where: id });
		document.getElementById("stays")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero.image,
						alt: "",
						className: "hero-photo h-full w-full object-cover"
					}, hero.image), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/55" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					overlay: true,
					search
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-end gap-8 px-5 pt-24 pb-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:pb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl text-foam",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foam/75",
								children: active ? `${active.continent} · ${active.country}` : "Africa, Asia, Europe, the Americas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-5xl leading-none tracking-tight sm:text-6xl",
								children: active ? `Stay in ${active.place}.` : "Book the room. Skip the scramble."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-md text-base text-foam/80",
								children: active ? active.blurb : "Five places only — Cape Town, Kyoto, Berlin, New York, and Rio. You see the total for your nights before you reserve."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, {
						search,
						onChange: update,
						onSubmit: () => document.getElementById("stays")?.scrollIntoView({
							behavior: "smooth",
							block: "start"
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "places",
			className: "scroll-mt-6 mx-auto max-w-6xl px-5 py-16 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Where you can stay"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-muted",
					children: "One place on each continent. Choose it and the list below keeps only those hotels and lodges."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5",
					children: destinations.map((destination) => {
						const selected = search.where === destination.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => choosePlace(selected ? "all" : destination.id),
							"aria-pressed": selected,
							className: `w-full rounded-2xl bg-foam p-2 text-left shadow-card ${selected ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: destination.image,
									alt: destination.imageAlt,
									className: "photo-frame aspect-3/4 w-full rounded-lg object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-3 block px-1 text-xs text-faint",
									children: destination.continent
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block px-1 pb-2 font-medium",
									children: destination.place
								})
							]
						}) }, destination.id);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl",
							children: "01"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-medium",
							children: "Pick a place"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Not a world map. Five destinations, already chosen."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl",
							children: "02"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-medium",
							children: "Read the total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "The price is for your nights and your party. Taxes are in it."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl",
							children: "03"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-medium",
							children: "Reserve the room"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Name, email, done. Find it again under Trips on this device."
						})
					] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "stays",
			className: "scroll-mt-6 mx-auto max-w-6xl px-5 py-16 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: active ? `Stays in ${active.place}` : "Stays"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted tabular-nums",
					children: [
						list.length,
						" ",
						list.length === 1 ? "stay" : "stays",
						" · ",
						guests,
						" ",
						guests === 1 ? "guest" : "guests",
						nights > 0 ? ` · ${nights} ${nights === 1 ? "night" : "nights"}` : ""
					]
				})] }), search.where !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 text-sm text-muted underline-offset-4 hover:underline",
					onClick: () => update({ where: "all" }),
					children: "Show all five places"
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: list.map((stay) => {
					const room = cheapestRoom(stay, guests);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StayCard, {
						stay,
						nights,
						fits: Boolean(room),
						nightly: room?.price ?? null,
						quote: room ? room.price * nights : null,
						search
					}, stay.slug);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
	] });
}
//#endregion
export { Home as component };
