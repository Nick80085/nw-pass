import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCheckout = async (type) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, type }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Get Your Word Pass</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Choose a one-time pass or a monthly subscription. Your pass will be emailed to you.
      </p>

      <div className="flex flex-col w-80 space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <div className="flex justify-between space-x-2">
          <button
            onClick={() => handleCheckout("one-time")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          >
            Buy One-Time Pass
          </button>
          <button
            onClick={() => handleCheckout("monthly")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          >
            Buy Monthly Pass
          </button>
        </div>
      </div>
    </div>
  );
}
