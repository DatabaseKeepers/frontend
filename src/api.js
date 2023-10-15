
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

async function signUpWithEmailAndPasswordLocally(
  email,
  password,
  dob,
  first_name,
  last_name,
  title,
  role
) {
  try {
    return await fetch(API_URL + "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        dob,
        first_name,
        last_name,
        title,
        role,
      }),
    }).then((res) => res.json());
  } catch (err) {
    console.error(err);
  }
}

export { signInWithEmailAndPasswordLocally, signUpWithEmailAndPasswordLocally };
