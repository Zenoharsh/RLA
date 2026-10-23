/**
 * Where the WordPress backend lives. The public domain (redlanternanalytica.com) is served by
 * this Next.js site; WordPress is reached on its own hostname. Changing hosts (e.g. moving
 * WordPress to new hosting) only needs this value or the WP_ORIGIN env var to change.
 *
 * Used by both src/lib/api.ts and next.config.ts, so keep it free of runtime-only imports.
 */
export const WP_ORIGIN = (process.env.WP_ORIGIN || "https://redlanternanalytica.com").replace(/\/$/, "");
