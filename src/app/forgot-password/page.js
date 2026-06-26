"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {

const router = useRouter();

const [email, setEmail] =
useState("");

const [loading, setLoading] =
useState(false);

const handleSubmit = async (e) => {


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

  const data =
    await response.json();

  if (!response.ok) {

    alert(
      data.error ||
      "Failed to send reset link"
    );

    return;
  }

  alert(
    "Password reset link sent to your email"
  );

  router.push("/login");

} catch (error) {

  console.log(error);

  alert(
    "Something went wrong"
  );

} finally {

  setLoading(false);

}


};

return (


<main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

  <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-10">

    <h1 className="text-5xl font-black text-blue-700 mb-3">
      Forgot Password
    </h1>

    <p className="text-lg text-gray-600 mb-8">
      Enter your email address and we will send you a password reset link.
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
          setEmail(
            e.target.value
          )
        }
        required
        className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-xl font-bold"
      >
        {loading
          ? "Sending..."
          : "Send Reset Link"}
      </button>

    </form>

    <div className="text-center mt-8">

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
