"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
const router = useRouter();

const [form, setForm] = useState({
username: "",
email: "",
password: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const response = await fetch(
    "http://127.0.0.1:8000/api/register/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || "Registration Failed");
    return;
  }

  alert("Registration Successful");

  router.push("/login");

} catch (error) {
  console.error(error);
  alert("Something went wrong");
} finally {
  setLoading(false);
}


};

return ( <main className="min-h-screen bg-gray-100 flex items-center justify-center p-5">


  <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">

    <h1 className="text-4xl font-black mb-8 text-center">
      Create Account
    </h1>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-4 rounded-xl"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-4 rounded-xl"
      >
        {loading
          ? "Creating Account..."
          : "Register"}
      </button>

    </form>

    <p className="text-center mt-6">
      Already have an account?
      <Link
        href="/login"
        className="text-blue-600 ml-2"
      >
        Login
      </Link>
    </p>

  </div>

</main>


);
}
