"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="login-username"
            >
              Username
            </label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="login-username"
              name="login-username"
              type="text"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="login-password"
              name="login-password"
              type="password"
            />
          </div>
          <div className="flex justify-end">
            <a
              className="text-sm text-indigo-600 hover:text-indigo-500"
              href="forget.html"
            >
              Forgot Password?
            </a>
          </div>
          <div>
            <button
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        {/* <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            className="font-medium text-indigo-600 hover:text-indigo-500"
            href="signup.html"
          >
            Sign Up
          </a>
        </p> */}
      </div>
    </div>
  );
}
