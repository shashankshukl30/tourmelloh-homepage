/** Canonical address helpers, safe for client components (no catalogue imports). */
export const SITE_URL = "https://tourmelloh.com";
export const absolute = (path: string) => new URL(path, SITE_URL).toString();
