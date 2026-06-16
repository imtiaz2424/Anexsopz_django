"use client";

import {
  useContext,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const router = useRouter();

  const {
    isLoggedIn,
    loading,
  } = useContext(AuthContext);

  useEffect(() => {
    if (
      !loading &&
      !isLoggedIn
    ) {
      router.replace("/login");
    }
  }, [
    loading,
    isLoggedIn,
    router,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return children;
}