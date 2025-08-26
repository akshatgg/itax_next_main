"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { getCookie } from "cookies-next";
import Filter from "../Filter";
import ActionBtn from "../Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import handleExport from "@/helper/ExcelExport";
import userAxios from "@/lib/userAxios";

/* ----------------------- Helpers ----------------------- */
const validateFinancialYear = (year) => {
  if (!year || year === "Choose..") return false;
  const patterns = [
    /^FY\s?\d{4}-\d{2}$/, // FY 2024-25
    /^\d{4}-\d{2}$/, // 2024-25
    /^\d{4}-\d{4}$/ // 2024-2025
  ];
  return patterns.some((pattern) => pattern.test(year));
};

const validateGSTIN = (gstin) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  return regex.test(gstin);
};

const quarterToMonths = {
  Q1: ["April", "May", "June"],
  Q2: ["July", "August", "September"],
  Q3: ["October", "November", "December"],
  Q4: ["January", "February", "March"],
};

/* ------------------- NavigationBar (updated) ------------------- */
export function NavigationBar() {
  // ---------------- Dynamic FY Options (India) ----------------
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Jan = 0 → +1 makes Jan = 1

  // If current month is Jan–Mar → FY still belongs to (prev year - current year)
  const fyStartYear = currentMonth < 4 ? currentYear - 1 : currentYear;

  const fyOptions = [];

  // Generate from FY 2010–11 till the latest available
  for (let y = 2010; y <= fyStartYear; y++) {
    const label = `${y}-${(y + 1).toString().slice(-2)}`; // e.g. 2024-25
    fyOptions.unshift(label); // newest first
  }



  // Filters state (default to latest fy and Q2/month as before)
  const [gstin, setGstin] = useState("23BNJPS3408M1ZP");
  const [fy, setFy] = useState(fyOptions[0]);
  const [period, setPeriod] = useState("Q1");
  const [month, setMonth] = useState(quarterToMonths["Q1"][0]);
  const [regType, setRegType] = useState("Regular");
  const [retType, setRetType] = useState("GSTR-1");

  // dependent options
  const [monthOptions, setMonthOptions] = useState(quarterToMonths[period]);
  const regTypeOptions = ["Regular", "Composition"];
  const returnOptionsForReg = {
    Regular: ["GSTR-1", "GSTR-3B", "GSTR-9"],
    Composition: ["GSTR-4"]
  };
  const [retTypeOptions, setRetTypeOptions] = useState(returnOptionsForReg[regType]);

  // API state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const token = getCookie("token");
  const pdf_ref = useRef(null);

  const headers = {
    "Return Type": "rtntype",
    "Arn Number": "arn",
    "Date of Filing": "dof",
    "Mode of Filing": "mof",
    "Return Period": "ret_prd",
    Status: "status",
    Valid: "valid"
  };

  // keep month options in sync when quarter changes
  useEffect(() => {
    const months = quarterToMonths[period] || [];
    setMonthOptions(months);
    // if currently selected month is not in new months list, pick the first
    if (!months.includes(month)) setMonth(months[0] || "");
  }, [period]);

  // keep return types in sync when regType changes
  useEffect(() => {
    const retOpts = returnOptionsForReg[regType] || [];
    setRetTypeOptions(retOpts);
    if (!retOpts.includes(retType)) setRetType(retOpts[0] || "");
  }, [regType]);

  // API call with validation - on success store response and navigate to results page
  const fetchReturns = useCallback(async () => {
    if (!token) {
      setError("No token found. Please login.");
      toast.error("No token found. Please login.");
      return;
    }

    if (!validateGSTIN(gstin) || !validateFinancialYear(fy)) {
      toast.error("Invalid GSTIN or Financial Year");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await userAxios.post(`/gst/return/track`, {
        gstin,
        financial_year: fy,
        period,
        month,
        reg_type: regType,
        return_type: retType
      });

      // store raw response in sessionStorage and navigate
      const payload = result?.data || result;
      sessionStorage.setItem("gstTrackData", JSON.stringify(payload));
      setData(payload);

      // navigate to results page (create this route /gst-dashboard/track-results)
      router.push("/gst-dashboard/track-results");
    } catch (err) {
      console.error(err);
      const msg = err?.message || "Failed to fetch return status";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [token, gstin, fy, period, month, regType, retType]);

  // Excel export (quick) - will use the most recent data from sessionStorage
  const handleExcelExport = async () => {
    const stored = sessionStorage.getItem("gstTrackData");
    const parsed = stored ? JSON.parse(stored) : data;
    const body = parsed?.data?.data?.data?.EFiledlist || [];
    const excelData = {
      "Track Gst Return": {
        headers,
        bodyData: body,
        bannerData: [
          { text: "Blaze", fontSize: 25, fontBold: true, textColor: "fffffff", backgroundColor: "FF3C7CDD", startRow: 1, endRow: 1, startCol: 1, endCol: 24, height: 60 },
          { text: "Track GST return", fontSize: 11, backgroundColor: "fef9c3", startRow: 2, endRow: 2, startCol: 1, endCol: 24, height: 40 }
        ]
      }
    };
    await handleExport(excelData, "Track_GST_Return");
  };

  const generatePDF = useReactToPrint({ content: () => pdf_ref.current, documentTitle: "track-gst-return" });

  return (
    <section className="rounded-2xl border bg-white p-3 shadow-sm">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <label className="text-sm mr-1">GSTIN:</label>
          <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value.toUpperCase())} className="border rounded p-1 text-sm" placeholder="Enter GSTIN" />
        </div>

        <Filter label="F.Y:" value={fy} onChange={setFy} options={fyOptions} />
        <Filter label="Period:" value={period} onChange={setPeriod} options={["Q1", "Q2", "Q3", "Q4"]} />

        {/* month dropdown now dynamic based on quarter */}
        <Filter label="Month:" value={month} onChange={setMonth} options={monthOptions} />

        <Filter label="Reg. Type:" value={regType} onChange={setRegType} options={regTypeOptions} />

        {/* return types change based on regType */}
        <Filter label="Return:" value={retType} onChange={setRetType} options={retTypeOptions} />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center pt-2 gap-2">
        <ActionBtn onClick={fetchReturns} disabled={loading}>{loading ? " Return Status Checking..." : "Check Return Status"}</ActionBtn>
        <ActionBtn onClick={() => router.push("/gst-dashboard/permanentinfo")} variant="secondary">Permanent Information</ActionBtn>
        <ActionBtn onClick={() => router.push("/gst-dashboard/registration")} variant="secondary">Registration Details</ActionBtn>
        <ActionBtn onClick={() => setIsOpen(true)} variant="primary">Login</ActionBtn>
        <ActionBtn onClick={handleExcelExport} variant="secondary">Export Excel</ActionBtn>
        <ActionBtn onClick={generatePDF} variant="secondary">Export PDF</ActionBtn>
      </div>

      {/* Modal Overlay (unchanged) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md z-10">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">GST Login</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GSTIN</label>
                <input type="text" placeholder="Enter your GSTIN" className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                <input type="text" placeholder="Enter your username" className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input type="password" placeholder="Enter your password" className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
            </form>
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">✕</button>
          </div>
        </div>
      )}

    </section>
  );
}

