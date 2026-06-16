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

  const { isLoggedIn } =
    useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Redirecting...
        </h1>
      </div>
    );
  }

  return children;
}