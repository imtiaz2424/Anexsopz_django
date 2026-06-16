"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId =
      localStorage.getItem("user_id");

    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(
      `http://127.0.0.1:8000/api/profile/${userId}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    localStorage.removeItem(
      "user_id"
    );

    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">
          Please Login First
        </h1>

        <Link
          href="/login"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

        <h1 className="text-5xl font-black mb-10">
          My Profile
        </h1>

        <div className="space-y-6">

          <div>
            <p className="text-gray-500">
              User ID
            </p>

            <h2 className="text-2xl font-bold">
              {user.id}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Username
            </p>

            <h2 className="text-2xl font-bold">
              {user.username}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>

            <h2 className="text-2xl font-bold">
              {user.email}
            </h2>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 text-white px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

    </main>
    </ProtectedRoute>
  );
}