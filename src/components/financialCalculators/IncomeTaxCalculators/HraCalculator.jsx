"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const HRACalculator = () => {
  const [basic, setBasic] = useState("50000")
  const [hra, setHra] = useState("20000")
  const [rent, setRent] = useState("15000")
  const [isMetro, setIsMetro] = useState(false)
  const [da, setDa] = useState("5000")
  const [otherAllowances, setOtherAllowances] = useState("0")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateHRA = () => {
    const basicSalary = Number.parseFloat(basic)
    const hraReceived = Number.parseFloat(hra)
    const rentPaid = Number.parseFloat(rent)
    const dearnessAllowance = Number.parseFloat(da)

    if (isNaN(basicSalary) || isNaN(hraReceived) || isNaN(rentPaid) || isNaN(dearnessAllowance)) {
      return
    }

    const salary = basicSalary + dearnessAllowance
    const metroAllowance = isMetro ? 0.5 * salary : 0.4 * salary
    const excessRent = rentPaid - 0.1 * salary
    const hraExempt = Math.min(hraReceived, metroAllowance, excessRent)

    // Generate chart data
    const newChartData = [
      { category: "Basic Salary", value: basicSalary },
      { category: "HRA Received", value: hraReceived },
      { category: "Rent Paid", value: rentPaid },
      { category: "HRA Exempt", value: hraExempt }
    ]

    setResults({
      basicSalary,
      hraReceived,
      rentPaid,
      dearnessAllowance,
      isMetro,
      hraExempt,
      metroAllowance
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateHRA()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setBasic("50000")
    setHra("20000")
    setRent("15000")
    setIsMetro(false)
    setDa("5000")
    setOtherAllowances("0")
    calculateHRA()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <CalculatorLayout
      title="HRA Calculator"
      description="Calculate your House Rent Allowance exemption"
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Basic Salary", value: formatCurrency(results.basicSalary) },
              { label: "HRA Received", value: formatCurrency(results.hraReceived) },
              { label: "Rent Paid", value: formatCurrency(results.rentPaid) },
              { label: "Dearness Allowance", value: formatCurrency(results.dearnessAllowance) },
              { label: "Metro City", value: results.isMetro ? "Yes" : "No" },
              { label: "HRA Exemption", value: formatCurrency(results.hraExempt), isHighlighted: true },
            ]}
          />
        )
      }
      chartComponent={
        chartData.length > 0 && (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toFixed(2)}`, undefined]}
                />
                <Legend />
                <Line type="monotone" dataKey="value" name="Amount" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="basic"
            label="Basic Salary"
            value={basic}
            onChange={setBasic}
            type="number"
            prefix="₹"
            min={0}
            tooltip="Total basic salary amount"
          />
          <InputField
            id="hra"
            label="HRA Received"
            value={hra}
            onChange={setHra}
            type="number"
            prefix="₹"
            min={0}
            tooltip="House Rent Allowance received"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="rent"
            label="Rent Paid"
            value={rent}
            onChange={setRent}
            type="number"
            prefix="₹"
            min={0}
            tooltip="Total rent paid during the year"
          />
          <InputField
            id="da"
            label="Dearness Allowance"
            value={da}
            onChange={setDa}
            type="number"
            prefix="₹"
            min={0}
            tooltip="Dearness allowance amount"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="otherAllowances"
            label="Other Allowances"
            value={otherAllowances}
            onChange={setOtherAllowances}
            type="number"
            prefix="₹"
            min={0}
            tooltip="Other additional allowances"
          />
          <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="isMetro"
              checked={isMetro}
              onChange={(e) => setIsMetro(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
            />
            <label htmlFor="isMetro" className="text-gray-700">
              Living in Metro City
            </label>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
          <button
            onClick={calculateHRA}
            className="px-4 py-2 bg-primary text-white rounded-md flex items-center justify-center gap-2 hover:bg-primary/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="16" height="16" x="4" y="4" rx="2" />
              <path d="M8 10h8" />
              <path d="M8 14h8" />
              <path d="M12 8v8" />
            </svg>
            Calculate
          </button>
        </div>
      </div>
    </CalculatorLayout>
  )
}

export default HRACalculator