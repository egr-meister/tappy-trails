/**
 * Tiny date helpers. Defensive: never crash on missing or invalid dates.
 */

/**
 * Current time as an ISO string.
 */
export function getNowIso() {
  try {
    return new Date().toISOString();
  } catch (e) {
    return "";
  }
}

/**
 * Format an ISO string as a friendly, locale-aware date + time. Returns a
 * gentle fallback when the input is missing or invalid.
 */
export function formatDateTime(isoString) {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";
    const datePart = date.toLocaleDateString();
    const timePart = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} ${timePart}`;
  } catch (e) {
    return "";
  }
}
