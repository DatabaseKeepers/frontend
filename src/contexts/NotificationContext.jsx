import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../auth.js";
import { API_URL } from "../constants.js";
import { useAuth } from "./AuthContext.jsx";

const POLL_INTERVAL = 20 * 1000; // Poll every 20 seconds

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    try {
      const token = await firebaseAuth.currentUser.getIdToken();
      const response = await fetch(`${API_URL}/api/notification/polling`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        if (response.status === 204) {
        } else {
          const data = await response.json();
          setNotifications(data);
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();

      const pollInterval = setInterval(() => {
        fetchNotifications();
      }, POLL_INTERVAL);

      return () => {
        clearInterval(pollInterval);
      };
    }
  }, []);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export default NotificationContext;
