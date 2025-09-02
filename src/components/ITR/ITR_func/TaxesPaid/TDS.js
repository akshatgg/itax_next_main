"use client";
import { useState } from "react";
import NonSalaryTDS from "./TDS/NonSalaryTDS";
import TDSonSale from "./TDS/TDSonSale";
import TCS from "./TDS/TCS";
import { InputStyles } from "@/app/styles/InputStyles";
import { I } from "@/components/iconify/I";

export default function TDS() {
  const [section, setSection] = useState();

  return (
    <>
      {section === "Non Salary TDS" ? (
        <NonSalaryTDS setSection={setSection} />
      ) : section === "TDS on Sale" ? (
        <TDSonSale setSection={setSection} />
      ) : section === "TCS" ? (
        <TCS setSection={setSection} />
      ) : (
        <div className={InputStyles.section80Deduction}>
          <h6 
        //   className="text-2xl font-bold text-blue-900 mb-6 text-center border-b pb-2"
          className={InputStyles.tdstitle}>
            TDS & TCS Information
          </h6>
          {/* Salary Table */}
          <div className={InputStyles.table}>
            <table className="text-sm text-left mt-1">
              <thead className={InputStyles.tableHeader}>
                <tr>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">S.No.</th>
                  <th className="px-4 py-2 border">Name of Employer</th>
                  <th className="px-4 py-2 border">TDS Deducted</th>
                  <th className="px-4 py-2 border">Salary Income</th>
                </tr>
              </thead>
              <tbody>
                <tr className={InputStyles.tableRow}>
                  <td className="px-4 py-2 border">Active</td>
                  <td className="px-4 py-2 border">1</td>
                  <td className="px-4 py-2 border">ABC Corp</td>
                  <td className="px-4 py-2 border">₹10,000</td>
                  <td className="px-4 py-2 border">₹8,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sections */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* Non Salary TDS */}
            <div className={InputStyles.card}>
              <div>
                <h3 className={InputStyles.cardTitle}>Non Salary TDS</h3>
                <p className={InputStyles.cardDesc}>
                  Add TDS entries on interest income, professional/consulting income etc. Excludes salary and property sale.
                </p>
              </div>
              <button
                onClick={() => setSection("Non Salary TDS")}
                className={InputStyles.submitBtn}
              >
                Add Entry
              </button>
            </div>

            {/* TDS on Sale */}
            <div className={InputStyles.card}>
              <div>
                <h3 className={InputStyles.cardTitle}>TDS on Sale/Rent of Property</h3>
                <p className={InputStyles.cardDesc}>
                  Add details of TDS deducted by buyer/tenant on sale or rent of immovable property.
                </p>
              </div>
              <button
                onClick={() => setSection("TDS on Sale")}
                className={InputStyles.submitBtn}
              >
                Add Entry
              </button>
            </div>

            {/* TCS */}
            <div className={InputStyles.card}>
              <div>
                <h3 className={InputStyles.cardTitle}>Tax Collected at Source (TCS)</h3>
                <p className={InputStyles.cardDesc}>
                  Add TCS entries like purchase of high-value items (e.g. cars).
                </p>
              </div>
              <button
                onClick={() => setSection("TCS")}
                className={InputStyles.submitBtn}
              >
                Add Entry
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
