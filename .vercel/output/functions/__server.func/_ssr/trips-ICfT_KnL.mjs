//#region node_modules/.nitro/vite/services/ssr/assets/trips-ICfT_KnL.js
var KEY = "cairn-trips";
var listeners = /* @__PURE__ */ new Set();
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function write(trips) {
	window.localStorage.setItem(KEY, JSON.stringify(trips));
	listeners.forEach((listener) => listener());
}
function subscribeTrips(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
function loadTrips() {
	return read().sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
}
function saveTrip(trip) {
	const next = {
		...trip,
		id: crypto.randomUUID(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	write([next, ...read()]);
	return next;
}
function removeTrip(id) {
	write(read().filter((trip) => trip.id !== id));
}
function tripCode(id) {
	return `CRN-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}
//#endregion
export { tripCode as a, subscribeTrips as i, removeTrip as n, saveTrip as r, loadTrips as t };
