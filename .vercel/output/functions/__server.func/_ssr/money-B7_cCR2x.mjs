import { i as __toESM } from "../_runtime.mjs";
import { r as defaultTripSearch } from "./catalog-n6drUDUe.mjs";
import { J as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Menu, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/money-B7_cCR2x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className = "size-5" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7 17.5h10M8.5 13.5h7M10.2 9.5h3.6",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round"
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-muted sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-display text-lg text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), "Cairn"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl",
					children: "Cape Town, Kyoto, Berlin, New York, and Rio de Janeiro. The places are real. The hotels and lodges are sample stays for this desk — a reservation is saved on this device and is not sent to a property."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prices in USD. The nightly rate already includes taxes." })
			]
		})
	});
}
function Header({ overlay = false, search }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const tone = overlay ? "text-foam" : "text-ink";
	const trip = search ?? defaultTripSearch();
	const linkTone = overlay ? "text-foam/85 hover:text-foam" : "text-muted hover:text-ink";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: overlay ? "absolute inset-x-0 top-0 z-20" : "relative z-20 border-b border-line bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					search: trip,
					className: `flex items-center gap-2 font-display text-xl ${tone}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), "Cairn"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-7 sm:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "places",
							search: trip,
							className: `text-sm ${linkTone}`,
							children: "Places"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "stays",
							search: trip,
							className: `text-sm ${linkTone}`,
							children: "Stays"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trips",
							className: `text-sm ${linkTone}`,
							children: "Trips"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "stays",
							search: trip,
							className: `inline-flex h-11 items-center rounded-full px-4 text-sm font-medium ${overlay ? "bg-foam text-ink" : "bg-ink text-foam"}`,
							children: "Book"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `inline-flex size-11 items-center justify-center rounded-full sm:hidden ${overlay ? "text-foam" : "text-ink"}`,
					"aria-expanded": open,
					"aria-label": open ? "Close menu" : "Open menu",
					onClick: () => setOpen((value) => !value),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line bg-paper px-5 py-3 sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "places",
						search: trip,
						className: "flex h-12 items-center text-ink",
						onClick: () => setOpen(false),
						children: "Places"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "stays",
						search: trip,
						className: "flex h-12 items-center text-ink",
						onClick: () => setOpen(false),
						children: "Stays"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/trips",
						className: "flex h-12 items-center text-ink",
						onClick: () => setOpen(false),
						children: "Trips"
					})
				]
			})
		}) : null]
	});
}
function money(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(amount);
}
//#endregion
export { Header as n, money as r, Footer as t };
