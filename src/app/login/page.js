"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {

const router = useRouter();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [loading, setLoading] =
useState(false);

const handleSubmit = async (e) => {


e.preventDefault();

try {

  setLoading(true);

  const response =
    await fetch(
      "http://127.0.0.1:8000/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    alert(
      data.error ||
      "Login Failed"
    );

    return;
  }

  localStorage.setItem(
    "user_id",
    data.user_id
  );

  localStorage.setItem(
    "username",
    data.username
  );

  localStorage.setItem(
    "email",
    data.email
  );

  alert(
    "Login Successful"
  );

  router.push("/");

} catch (error) {

  console.log(error);

  alert(
    "Something Went Wrong"
  );

} finally {

  setLoading(false);

}


};

return (


<main className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">

  <div className="hidden lg:flex w-1/2 items-center justify-center bg-white">

    <Image
      src="/images/login-illustration.png"
      alt="Login"
      width={600}
      height={600}
      priority
      className="object-contain"
    />

  </div>

  <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10">

    <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 md:p-10">

      <h1 className="text-5xl font-black text-blue-700 mb-3">
        Welcome Back
      </h1>

      <p className="text-xl mb-8">
        Login to continue shopping
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between text-sm">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
            />

            Remember Me

          </label>

          <Link
              href="/forgot-password"
              className="text-blue-600"
            >
              Forgot Password?
          </Link>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-xl font-bold transition"
        >
          {loading
            ? "Logging In..."
            : "Log In"}
        </button>

      </form>

      <div className="text-center mt-8">
          <p className="text-lg">
            Don't have an account?

            <Link
              href="/register"
              className="text-blue-600 font-bold ml-2"
            >
              Register Now
            </Link>
          </p>
      </div>

    </div>

  </div>

</main>


);

}
