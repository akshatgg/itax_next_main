
"use client";
import { useEffect, useState } from "react";

export default function PersonalInfoMicroservice() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/microservices/personal-info")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading Personal Info...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-4 text-center text-gray-400">No Personal Info found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4 text-blue-700">Personal Info (from microservice)</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-2 last:border-b-0">
            <span className="font-medium">{item.name}</span>
            <span className="text-blue-600">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
