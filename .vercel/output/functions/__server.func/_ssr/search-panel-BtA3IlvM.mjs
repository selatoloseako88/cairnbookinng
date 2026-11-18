import { i as __toESM } from "../_runtime.mjs";
import { _ as startOfToday, a as destinations, c as labelDate, d as monthLabel, f as nightCount, g as sameDay, i as destinationById, p as parseLocal, s as formatIso, t as addDays, u as monthCells } from "./catalog-n6drUDUe.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Minus, o as ChevronRight, r as Plus, s as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-panel-BtA3IlvM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPanel({ search, onChange, tone = "ink", submitLabel = "Show stays", onSubmit }) {
	const nights = nightCount(search.in, search.out);
	const dark = tone === "ink";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: `w-full max-w-md rounded-3xl p-3 ${dark ? "bg-ink text-foam shadow-pop" : "bg-foam text-ink shadow-card"}`,
		onSubmit: (event) => {
			event.preventDefault();
			onSubmit?.();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceField, {
					search,
					onChange,
					dark
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
					search,
					onChange,
					dark
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestField, {
					search,
					onChange,
					dark
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center justify-between gap-3 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-sm tabular-nums ${dark ? "text-foam/70" : "text-muted"}`,
				children: nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Choose dates"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: `inline-flex h-11 items-center rounded-full px-4 text-sm font-medium ${dark ? "bg-foam text-ink" : "bg-ink text-foam"}`,
				children: submitLabel
			})]
		})]
	});
}
function fieldClass(dark) {
	return `flex h-14 w-full flex-col justify-center rounded-xl px-3 text-left ${dark ? "bg-foam/10 hover:bg-foam/15" : "bg-paper hover:bg-paper"}`;
}
function PlaceField({ search, onChange, dark }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	useDismiss(open, ref, () => setOpen(false));
	const current = search.where === "all" ? "All five places" : destinationById(search.where)?.place ?? "All five places";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: fieldClass(dark),
			"aria-expanded": open,
			onClick: () => setOpen((value) => !value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-xs ${dark ? "text-foam/60" : "text-faint"}`,
				children: "Where"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-sm font-medium",
				children: current
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "absolute z-30 mt-2 w-full rounded-xl bg-foam p-1 text-ink shadow-pop",
			role: "listbox",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex h-11 w-full items-center rounded-lg px-3 text-left text-sm hover:bg-paper",
				onClick: () => {
					onChange({ where: "all" });
					setOpen(false);
				},
				children: "All five places"
			}) }), destinations.map((destination) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm hover:bg-paper",
				onClick: () => {
					onChange({ where: destination.id });
					setOpen(false);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: destination.place }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-faint",
					children: destination.continent
				})]
			}) }, destination.id))]
		}) : null]
	});
}
function DateField({ search, onChange, dark }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [pickingOut, setPickingOut] = (0, import_react.useState)(false);
	const [cursor, setCursor] = (0, import_react.useState)(() => parseLocal(search.in));
	const ref = (0, import_react.useRef)(null);
	useDismiss(open, ref, () => setOpen(false));
	const today = startOfToday();
	const checkIn = parseLocal(search.in);
	const checkOut = parseLocal(search.out);
	const year = cursor.getFullYear();
	const month = cursor.getMonth();
	const labelId = (0, import_react.useId)();
	function pick(day) {
		if (day < today) return;
		const iso = formatIso(day);
		if (!pickingOut) {
			onChange({
				in: iso,
				out: formatIso(addDays(day, 2))
			});
			setPickingOut(true);
			return;
		}
		if (iso <= search.in) {
			onChange({
				in: iso,
				out: formatIso(addDays(day, 2))
			});
			return;
		}
		onChange({ out: iso });
		setPickingOut(false);
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: fieldClass(dark),
				"aria-expanded": open,
				onClick: () => {
					setCursor(checkIn);
					setPickingOut(false);
					setOpen(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-xs ${dark ? "text-foam/60" : "text-faint"}`,
					children: "Check in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium tabular-nums",
					children: labelDate(search.in)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: fieldClass(dark),
				"aria-expanded": open,
				onClick: () => {
					setCursor(checkIn);
					setPickingOut(false);
					setOpen(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-xs ${dark ? "text-foam/60" : "text-faint"}`,
					children: "Check out"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium tabular-nums",
					children: labelDate(search.out)
				})]
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute z-30 mt-2 w-full rounded-xl bg-foam p-3 text-ink shadow-pop",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-full hover:bg-paper",
							"aria-label": "Previous month",
							onClick: () => setCursor(new Date(year, month - 1, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: labelId,
							className: "text-sm font-medium",
							children: monthLabel(year, month)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-full hover:bg-paper",
							"aria-label": "Next month",
							onClick: () => setCursor(new Date(year, month + 1, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 text-center text-xs text-faint",
					"aria-hidden": "true",
					children: [
						"S",
						"M",
						"T",
						"W",
						"T",
						"F",
						"S"
					].map((day, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "py-1",
						children: day
					}, `${day}${index}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7",
					role: "grid",
					"aria-labelledby": labelId,
					children: monthCells(year, month).map((day, index) => {
						if (!day) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `empty-${index}`);
						const iso = formatIso(day);
						const disabled = day < today;
						const selected = sameDay(day, checkIn) || sameDay(day, checkOut);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled,
							onClick: () => pick(day),
							className: `mx-auto inline-flex size-11 items-center justify-center rounded-full text-sm tabular-nums ${selected ? "bg-ink text-foam" : day > checkIn && day < checkOut ? "bg-paper" : "hover:bg-paper"} disabled:text-faint/50`,
							children: day.getDate()
						}, iso);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: pickingOut ? "Now choose a check-out day." : "Choose a check-in day."
				})
			]
		}) : null]
	});
}
function GuestField({ search, onChange, dark }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	useDismiss(open, ref, () => setOpen(false));
	const guestLabel = search.children === 0 ? `${search.adults} adult${search.adults === 1 ? "" : "s"}` : `${search.adults} adult${search.adults === 1 ? "" : "s"}, ${search.children} ${search.children === 1 ? "child" : "children"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: fieldClass(dark),
			"aria-expanded": open,
			onClick: () => setOpen((value) => !value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-xs ${dark ? "text-foam/60" : "text-faint"}`,
				children: "Guests"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: guestLabel
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute z-30 mt-2 w-full rounded-xl bg-foam p-3 text-ink shadow-pop",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
					label: "Adults",
					value: search.adults,
					min: 1,
					max: 8,
					onChange: (adults) => onChange({ adults })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
					label: "Children",
					value: search.children,
					min: 0,
					max: 6,
					onChange: (children) => onChange({ children })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "One room per reservation. Pick a room that sleeps your party."
				})
			]
		}) : null]
	});
}
function Stepper({ label, value, min, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-12 items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-full bg-paper disabled:opacity-40",
					"aria-label": `Fewer ${label.toLowerCase()}`,
					disabled: value <= min,
					onClick: () => onChange(value - 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-6 text-center text-sm tabular-nums",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-full bg-paper disabled:opacity-40",
					"aria-label": `More ${label.toLowerCase()}`,
					disabled: value >= max,
					onClick: () => onChange(value + 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})
			]
		})]
	});
}
function useDismiss(open, ref, close) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onPointer(event) {
			if (!ref.current?.contains(event.target)) close();
		}
		function onKey(event) {
			if (event.key === "Escape") close();
		}
		document.addEventListener("pointerdown", onPointer);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onPointer);
			document.removeEventListener("keydown", onKey);
		};
	}, [
		open,
		ref,
		close
	]);
}
//#endregion
export { SearchPanel as t };
