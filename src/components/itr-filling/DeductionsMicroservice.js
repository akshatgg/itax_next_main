
"use client";
import { useEffect, useState } from "react";

export default function DeductionsMicroservice() {
  const [deductions, setDeductions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example microservice call (replace URL with real endpoint)
    fetch("/api/microservices/deductions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setDeductions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading deductions...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (!deductions) return <div className="p-4 text-center text-gray-400">No deductions found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4 text-blue-700">Deductions (from microservice)</h2>
      <ul className="space-y-2">
        {deductions.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-2 last:border-b-0">
            <span className="font-medium">{item.name}</span>
            <span className="text-blue-600">₹{item.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
