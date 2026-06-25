"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {

const [email, setEmail] =
useState("");

const handleSubmit = (e) => {


e.preventDefault();

try {

  setLoading(true);

  const response =
    await fetch(
      "http://127.0.0.1:8000/api/forgot-password/",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

return (


<main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

  <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10">

    <h1 className="text-4xl font-black text-blue-700 mb-3">
      Forgot Password
    </h1>

    <p className="text-gray-600 mb-8">
      Enter your email address and we'll send you a password reset link.
    </p>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
        className="w-full border border-gray-300 rounded-xl p-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-4 rounded-xl text-xl font-bold"
      >
        Send Reset Link
      </button>

    </form>

    <div className="text-center mt-6">

      <Link
        href="/login"
        className="text-blue-600 font-bold"
      >
        Back To Login
      </Link>

    </div>

  </div>

</main>


);

}
