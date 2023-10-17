const MODE = import.meta.env.VITE_VERCEL_ENV ?? import.meta.env.MODE;

export const API_URL =
  MODE === "production"
    ? "https://api.radiologyarchive.com"
    : "https://dev-api.radiologyarchive.com";
