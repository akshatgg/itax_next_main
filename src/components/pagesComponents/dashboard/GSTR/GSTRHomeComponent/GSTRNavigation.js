"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getCookie } from "cookies-next";
import Filter from "../Filter";
import ActionBtn from "../Button";
import { apiFetch } from "@/lib/gstApi";
import { useRouter } from "next/navigation";

export default function NavigationBar() {
  // Filters state
  const [gstin, setGstin] = useState("23BNJPS3408M1ZP");
  const [fy, setFy] = useState("2025-26");
  const [period, setPeriod] = useState("Q2");
  const [month, setMonth] = useState("July");
  const [regType, setRegType] = useState("Regular");
  const [retType, setRetType] = useState("GSTR-1");

  // API state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const token = getCookie("token");
  console.log("Token from cookie:", token);

  // ✅ API call
  const fetchReturns = useCallback(async () => {
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);


    try {
      const result = await apiFetch("POST", "gst/return/track", {
        token,
        body: { gstin },
      });
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, gstin, fy, period, month, regType, retType]);

  // auto call on mount
  useEffect(() => {
    fetchReturns();
  }, [fetchReturns]);

  return (
    <section className="rounded-2xl border bg-white p-3 shadow-sm">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <label className="text-sm mr-1">GSTIN:</label>
          <input
            type="text"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
            className="border rounded p-1 text-sm"
            placeholder="Enter GSTIN"
          />
        </div>

        <Filter label="F.Y:" value={fy} onChange={setFy} options={["2025-26", "2024-25", "2023-24", "2022-23"]} />
        <Filter label="Period:" value={period} onChange={setPeriod} options={["Q1", "Q2", "Q3", "Q4"]} />
        <Filter label="Month:" value={month} onChange={setMonth} options={["April", "May", "June"]} />
        <Filter label="Reg. Type:" value={regType} onChange={setRegType} options={["Regular", "Composition"]} />
        <Filter label="Return:" value={retType} onChange={setRetType} options={["GSTR-1", "GSTR-3B", "GSTR-9"]} />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center pt-2 gap-2">
        <ActionBtn onClick={fetchReturns} disabled={loading}>
          {loading ? "Checking..." : "Check Return Status"}
        </ActionBtn>
        <ActionBtn onClick={
          () => router.push("/gst-dashboard/permanentinfo")
        } variant="secondary">Permanent Information</ActionBtn>
        <ActionBtn onClick={
          () => router.push("/gst-dashboard/registration")
        } variant="secondary">Registration Details</ActionBtn>
        <ActionBtn onClick={() => setIsOpen(true)} variant="primary">Login</ActionBtn>
      </div>

      {/* Result / Error */}
      <div className="mt-4">
        {error && <p className="text-red-500">❌ {error}</p>}
        {loading && <p className="text-blue-500">Loading return status...</p>}
        {data && (
          <div className="p-3 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">📊 Return Status</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>GSTIN:</strong> {data.gstin || gstin}</li>
              <li><strong>Financial Year:</strong> {data.fy || fy}</li>
              <li><strong>Return Type:</strong> {data.type || retType}</li>
              <li><strong>Status:</strong> {data.status || "N/A"}</li>
              <li><strong>Filed Date:</strong> {data.filedDate || "Not available"}</li>
            </ul>
          </div>
        )}
      </div>


      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Blur */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md z-10">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
              GST Login
            </h2>

            <form className="space-y-4">
              {/* GSTIN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GSTIN
                </label>
                <input
                  type="text"
                  placeholder="Enter your GSTIN"
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
