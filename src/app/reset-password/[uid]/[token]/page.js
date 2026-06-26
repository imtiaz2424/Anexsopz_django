"use client";

import {useState} from "react";
import {useRouter,useParams} from "next/navigation";

export default function ResetPasswordPage() {

const router = useRouter();
const params = useParams();
const uid = params.uid;
const token = params.token;
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {

  e.preventDefault();

  if (
    password !==
    confirmPassword
  ) {

    alert(
      "Passwords do not match"
    );

    return;
  }

  try {

    setLoading(true);

    const response =
      await fetch(
        "http://127.0.0.1:8000/api/reset-password/",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            uid,
            token,
            password,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      alert(
        data.error ||
        "Password Reset Failed"
      );

      return;
    }

    alert(
      "Password Reset Successful"
    );

    router.push(
      "/login"
    );

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


<main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

  <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-10">

    <h1 className="text-5xl font-black text-blue-700 mb-3">
      Reset Password
    </h1>

    <p className="text-gray-600 text-lg mb-8">
      Enter your new password below.
    </p>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        required
        className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
        required
        className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-xl font-bold transition"
      >
        {loading
          ? "Resetting..."
          : "Reset Password"}
      </button>

    </form>

  </div>

</main>


);

}
