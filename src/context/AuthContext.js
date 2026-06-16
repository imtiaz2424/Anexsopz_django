"use client";

import {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token =
          localStorage.getItem(
            "access_token"
          );

        const userId =
          localStorage.getItem(
            "user_id"
          );

        if (!token) {
          setLoading(false);
          return;
        }

        setIsLoggedIn(true);

        if (userId) {
          const res = await fetch(
            `http://127.0.0.1:8000/api/profile/${userId}/`
          );

          const data =
            await res.json();

          setUser(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async () => {
    try {
      const userId =
        localStorage.getItem(
          "user_id"
        );

      setIsLoggedIn(true);

      if (userId) {
        const res = await fetch(
          `http://127.0.0.1:8000/api/profile/${userId}/`
        );

        const data =
          await res.json();

        setUser(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    localStorage.removeItem(
      "user_id"
    );

    localStorage.removeItem(
      "cart"
    );

    localStorage.removeItem(
      "wishlist"
    );

    setUser(null);
    setIsLoggedIn(false);

    window.location.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}