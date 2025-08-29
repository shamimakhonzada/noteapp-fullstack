"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGetStarted = async () => {
    setLoading(true);

    try {
      // simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // navigate to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Navigation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 p-6">
      <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
        Welcome to Your Notes App
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        Organize your thoughts, manage your notes, and stay productive. Click
        below to get started!
      </p>

      <button
        onClick={handleGetStarted}
        disabled={loading}
        className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-2"
      >
        {loading && (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}
        {loading ? "Loading..." : "Get Started"}
      </button>
    </div>
  );
}
