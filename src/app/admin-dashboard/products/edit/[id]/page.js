"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditProductPage() {

  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
    });

  useEffect(() => {

    if (!params?.id) return;

    fetch(
      `http://127.0.0.1:8000/api/products/${params.id}/`
    )
      .then((res) => res.json())
      .then((data) => {

        setForm({
          name: data.name || "",
          category:
            data.category || "",
          price: data.price || "",
          image: data.image || "",
          description:
            data.description || "",
        });

        setLoading(false);

      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, [params?.id]);

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setSaving(true);

      const response =
        await fetch(
          `http://127.0.0.1:8000/api/products/${params.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              form
            ),
          }
        );

      if (!response.ok) {

        alert(
          "Update Failed"
        );

        return;
      }

      alert(
        "Product Updated Successfully"
      );

      router.push(
        "/admin-dashboard/products"
      );

    } catch (err) {

      console.error(err);

    } finally {

      setSaving(false);

    }

  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-4xl font-black mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={
              handleChange
            }
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={
              handleChange
            }
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={
              handleChange
            }
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={
              handleChange
            }
            className="w-full border p-4 rounded-xl"
          />

          <textarea
            name="description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            className="w-full border p-4 rounded-xl h-40"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            {saving
              ? "Updating..."
              : "Update Product"}
          </button>

        </form>

      </div>

    </main>
  );
}