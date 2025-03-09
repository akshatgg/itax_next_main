import { useState } from "react";
import Remuneration from "./BusinessProfession/AddBusiness/Remuneration";
import IncomeUnder44AD from "./BusinessProfession/AddBusiness/IncomeUnder44AD";
import IncomeUnder44ADA from "./BusinessProfession/AddBusiness/IncomeUnder44ADA";
import IncomeUnder44AE from "./BusinessProfession/AddBusiness/IncomeUnder44AE";
import BSPLIncome from "./BusinessProfession/AddBusiness/BSPLIncome";
import NoBooksofAccountIncome from "./BusinessProfession/AddBusiness/NoBooksofAccountIncome";
import SpeculativeIncome from "./BusinessProfession/AddBusiness/SpeculativeIncome";
import GSTDetails from "./BusinessProfession/FinancialStatements&Schedules/GSTDetails";
import ScheduleBP from "./BusinessProfession/FinancialStatements&Schedules/ScheduleBP";
import ScheduleOI from "./BusinessProfession/FinancialStatements&Schedules/ScheduleOI";
import AuditorDetails from "./BusinessProfession/AuditInformation/AuditorDetails";
import TradingConcern from "./BusinessProfession/QuantitativeDetails/TradingConcern";
import ManufacturingConcernRaw from "./BusinessProfession/QuantitativeDetails/ManufacturingConcernRaw";
import ManufacturingConcernFinished from "./BusinessProfession/QuantitativeDetails/ManufacturingConcernFinished";

export default function BusinessProfession({setSection}) {
  const [subSection, setSubSection] = useState();

  return (
    <>
      {subSection === "Remuneration" ? (
        <Remuneration setSection={setSubSection} />
      ) : subSection === "IncomeUnder44AD" ? (
        <IncomeUnder44AD setSection={setSubSection} />
      ) : subSection === "IncomeUnder44ADA" ? (
        <IncomeUnder44ADA setSection={setSubSection} />
      ) : subSection === "IncomeUnder44AE" ? (
        <IncomeUnder44AE setSection={setSubSection} />
      ) : subSection === "BSPLIncome" ? (
        <BSPLIncome setSection={setSubSection} />
      ) : subSection === "NoBooksofAccountIncome" ? (
        <NoBooksofAccountIncome setSection={setSubSection} />
      ) : subSection === "SpeculativeIncome" ? (
        <SpeculativeIncome setSection={setSubSection} />
      ) : subSection === "GSTDetails" ? (
        <GSTDetails setSection={setSubSection} />
      ) : subSection === "ScheduleBP" ? (
        <ScheduleBP setSection={setSubSection} />
      ) : subSection === "ScheduleOI" ? (
        <ScheduleOI setSection={setSubSection} />
      ) : subSection === "AuditorDetails" ? (
        <AuditorDetails setSection={setSubSection} />
      ) : subSection === "TradingConcern" ? (
        <TradingConcern setSection={setSubSection} />
      ) : subSection === "ManufacturingConcernRaw" ? (
        <ManufacturingConcernRaw setSection={setSubSection} />
      ) : subSection === "ManufacturingConcernFinished" ? (
        <ManufacturingConcernFinished setSection={setSubSection} />
      ) : (
        <div className="mx-auto max-w-4xl w-full px-4">
          <h3 className="border-b font-semibold mb-5">Add a Business</h3>
          <div className="md:grid md:grid-cols-3 flex flex-col gap-10">
            <div className="col-span-2">
              <p className="font-semibold">
                1. Remuneration from Partnership Firms
              </p>
              <small>
                If you are partner in a firm(s), enter the details of the
                remuneration, income or profits from it.
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("Remuneration")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add Remuneration
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">
                2. Presumptive Income under Section 44AD (For Businesses)
              </p>
              <small>
                For businesses whose revenue is less than or equal to ₹2Cr. and
                profit is greater than or equal to 8% of the revenue (6% of the
                revenue from digital transactions).
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("IncomeUnder44AD")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add Income under 44AD
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">
                3. Presumptive Income Under Section 44ADA (For Professionals)
              </p>
              <small>
                For professions whose gross receipts/revenue is less than or
                equal to ₹50 Lakhs and profit is greater than or equal to 50% of
                the revenue.
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("IncomeUnder44ADA")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add Income under 44ADA
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">
                4. Presumptive Income Under Section 44AE (For Goods Carrier)
              </p>
              <small>
                This is applicable to goods carriers which have less than or
                equal to 10 vehicles.
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("IncomeUnder44AE")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add Income under 44AE
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">
                5. Balance Sheet with Profit & Loss Account
              </p>
              <small>
                This section contains details about sources & application of
                funds, credits & debits to your Manufacturing, Trading, and P&L
                Accounts.
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("BSPLIncome")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add BSPL Income
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">
                6. Books of Account are Not Maintained
              </p>
              <small>
                This is applicable to Business/Profession whose gross receipts
                /revenue is less than or equal to ₹25 Lakhs (10 Lakhs for
                Profession) and profit is less than or equal to ₹2.5 Lakhs (1.5
                Lakhs for Profession).
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("NoBooksofAccountIncome")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add No Books of Account Income
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">7. Speculative Income</p>
              <small>This section is for intraday share trading etc</small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("SpeculativeIncome")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add Speculative Income
              </button>
            </div>
          </div>

          <h3 className="border-b font-semibold mb-5 mt-10">
            Financial Statements & Schedules
          </h3>
          <div className="md:grid md:grid-cols-3 flex flex-col gap-10">
            <div className="col-span-2">
              <p className="font-semibold">GST Details</p>
              <small>
                Information Regarding Turnover/Gross Receipt Reported For GST
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("GSTDetails")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Add GST Details
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">Schedule BP</p>
              <small>
                Adjustment of income from sources other than business and
                profession.
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("ScheduleBP")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Fill Schedule BP
              </button>
            </div>

            <div className="col-span-2">
              <p className="font-semibold">Schedule OI (Other Information)</p>
              <small>
                This section includes addition to P&L in Schedule BP,
                disallowances from P&L under section 36, 37, 40, 40A, 43B and
                other adjustments.
              </small>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("ScheduleOI")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Fill Schedule OI
              </button>
            </div>
          </div>

          <h3 className="border-b font-semibold mb-5 mt-10">
            Audit Information
          </h3>
          <div className="md:grid md:grid-cols-3 flex flex-col gap-10">
            <div className="col-span-2 flex items-center">
              <p className="font-semibold">Auditor Details</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("AuditorDetails")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Fill Audit Details
              </button>
            </div>
          </div>

          <h3 className="border-b font-semibold mb-5 mt-10">
            Quantitative Details
          </h3>
          <div className="md:grid md:grid-cols-3 flex flex-col gap-10">
            <div className="col-span-2 flex items-center">
              <p className="font-semibold">Details of Trading Concern</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("TradingConcern")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Fill Details
              </button>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-semibold">
                Details of Manufacturing Concern (Raw Materials)
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("ManufacturingConcernRaw")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Fill Details
              </button>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-semibold">
                Details of Manufacturing Concern (Finished Products)
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSubSection("ManufacturingConcernFinished")}
                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
              >
                Fill Details
              </button>
            </div>
          </div>
          <div className="flex mt-3">
            <button
              onClick={() => {setSection('Capital Gain')}}
              className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer col-span-2 mx-auto"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
