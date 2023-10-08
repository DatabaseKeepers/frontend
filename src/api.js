const MODE = import.meta.env.VITE_VERCEL_ENV ?? import.meta.env.MODE;

const API_URL =
  MODE === "production"
    ? "https://api.radiologyarchive.com"
    : "https://dev-api.radiologyarchive.com";

async function signInWithEmailAndPasswordLocally(email, password) {
  try {
    return await fetch(API_URL + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  } catch (err) {
    console.error(err);
  }
}

async function signUpWithEmailAndPasswordLocally(email, password) {
  try {
    return await fetch(API_URL + "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  } catch (err) {
    console.error(err);
  }
}

export { signInWithEmailAndPasswordLocally, signUpWithEmailAndPasswordLocally };
