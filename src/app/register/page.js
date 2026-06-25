"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {

const router = useRouter();

const [username, setUsername] =
useState("");

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [loading, setLoading] =
useState(false);

const [phone, setPhone] =
useState("");

const handleSubmit = async (e) => {

e.preventDefault();

try {

  setLoading(true);

  const response =
    await fetch(
      "http://127.0.0.1:8000/api/register/",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
        username,
        email,
        password,
        phone,
      }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    alert(
      data.error ||
      "Registration Failed"
    );

    return;
  }

  alert(
    "Registration Successful"
  );

  router.push("/login");

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

      {/* LEFT SIDE IMAGE */}

        <div className="hidden lg:flex w-1/2 items-center justify-center bg-white">
          <Image
            src="/images/register-illustration.png"
            alt="Register"
            width={650}
            height={650}
            className="object-contain"
          />
        </div>

      {/* RIGHT SIDE FORM */}

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10">

      
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 md:p-10">

        <h1 className="text-5xl font-black text-blue-700 mb-3">
          Hello There,
        </h1>

        <p className="text-xl font-medium mb-8">
          Register now to explore more
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="border border-gray-300 rounded-xl p-4 flex items-center gap-3">

              <span className="text-xl">
                🇧🇩
              </span>

              <span className="text-gray-500">
                +880
              </span>

            <input
            type="tel"
            placeholder="1XXXXXXXXX"
            value={phone}
            onChange={(e) =>
            setPhone(e.target.value)
            }
            className="flex-1 outline-none bg-transparent"
            />

            </div>


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div>
            <label className="font-bold text-lg">
              How did you first hear about us?
              <span className="font-normal">
                {" "} (Optional)
              </span>
            </label>

            <select className="w-full border border-gray-300 rounded-xl p-4 mt-3">
              <option>Select an option</option>
              <option>Facebook</option>
              <option>YouTube</option>
              <option>Google</option>
              <option>Friend</option>
            </select>
          </div>

          <div className="flex gap-3">
            <input
              type="checkbox"
              required
              className="mt-1"
            />

            <p className="text-sm text-gray-600">
              I agree to
              <span className="text-blue-600">
                {" "}Terms and Conditions
              </span>,
              <span className="text-blue-600">
                {" "}Refund Policy
              </span>
              &
              <span className="text-blue-600">
                {" "}Privacy Policy
              </span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-xl font-bold transition"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        <div className="text-center mt-8">
          <p className="text-lg">
            Already have an account?

            <Link
              href="/login"
              className="text-blue-600 font-bold ml-2"
            >
              Log in
            </Link>
          </p>
        </div>

      </div>


        </div>

</main>

);
}