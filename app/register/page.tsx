"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

  

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            ساخت حساب کاربری
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="rounded-md shadow-sm space-y-4" dir="rtl">
            <div>
              <label htmlFor="name" className="sr-only">
                نام کاربری
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="نام کاربری"
                dir="rtl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                رمز جیب
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="رمز ورود"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                شماره همراه
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="شماره همراه"
                dir="rtl"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? "در حال ساخت حساب کاربری" : "ثبت نام"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              یک جیب دارم منو ببر تو همون
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
