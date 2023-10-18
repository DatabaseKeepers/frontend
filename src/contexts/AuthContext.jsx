import React, { useEffect } from "react";
import {
  firebaseAuth,
  getIdToken,
  signInWithEmailAndPassword,
} from "../auth.js";
import { API_URL } from "../constants.js";

const FirebaseAuthContext = React.createContext(null);

export function FirebaseAuthProvider({ children }) {
  const [role, setRole] = React.useState();
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const signin = React.useCallback(async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  }, []);

  const signup = React.useCallback(
    async (email, password, dob, first_name, last_name, title, role) => {
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
    },
    []
  );

  const signout = React.useCallback(async () => {
    await firebaseAuth
      .signOut()
      .catch((err) => console.log(err))
      .finally(() => window.location.assign("/"));
  }, []);

  const renewToken = async () => {
    if (user) {
      try {
        await user.getIdToken(true);
      } catch (error) {
        console.error("Error renewing ID token:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(false);

      try {
        await getIdToken(user).then((token) => {
          setUser((prevUser) => ({ ...prevUser, accessToken: token }));
          fetch(API_URL + "/api/user/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            cache: "no-cache",
          })
            .then((res) => res.json())
            .then((data) => setRole(data.role));
        });
      } catch (err) {
        console.log(err);
      }

      // Schedule token renewal before it expires (55 minutes)
      const renewalInterval = setInterval(renewToken, 55 * 60 * 1000);

      return () => {
        clearInterval(renewalInterval);
      };
    });

    return unsubscribe;
  }, []);

  const memoizedValue = React.useMemo(
    () => ({ role, user, signin, signup, signout }),
    [role, user, signin, signup, signout]
  );

  return (
    <FirebaseAuthContext.Provider value={memoizedValue}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(FirebaseAuthContext);
}

export default FirebaseAuthContext;
