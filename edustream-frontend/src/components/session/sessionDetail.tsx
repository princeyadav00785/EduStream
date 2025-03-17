"use client";
import { useState } from "react";
import { useRouter } from "next/router";

const DetailSession = () => {
  const [sessionId, setSessionId] = useState("");
  const router = useRouter();

  const handleJoinSession = () => {
    if (!sessionId.trim()) {
      alert("⚠️ Please enter a valid session ID.");
      return;
    }
    router.push(`/session/${sessionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">🎯 Enter Session Id</h2>

      <input
        type="text"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        placeholder="Enter Session ID"
        className="w-full max-w-md p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-6"
      />

      <button
        onClick={handleJoinSession}
        className="w-full max-w-md py-3 rounded-md bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all"
      >
        Get Session Info
      </button>
    </div>
  );
};

export default DetailSession;
