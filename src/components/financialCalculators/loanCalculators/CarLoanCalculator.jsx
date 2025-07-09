'use client'

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const CarLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("0")
  const [interestRate, setInterestRate] = useState("0")
  const [loanTenure, setLoanTenure] = useState("0")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateLoanDetails = () => {
    const p = Number.parseFloat(loanAmount)
    const r = Number.parseFloat(interestRate) / 100 / 12
    const n = Number.parseFloat(loanTenure) * 12

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) {
      return
    }

    // EMI Calculation
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalAmount = emi * n
    const totalInterest = totalAmount - p

    // Generate chart data
    const newChartData = []
    let remainingBalance = p

    for (let month = 0; month <= n; month++) {
      const interest = remainingBalance * r
      const principal = emi - interest

      newChartData.push({
        month,
        principal: p,
        interest: month === 0 ? 0 : newChartData[month - 1].interest + interest,
        emi: emi,
        remainingBalance: month === 0 ? p : Math.max(remainingBalance - principal, 0)
      })

      remainingBalance -= principal
    }

    setResults({
      principal: p,
      interestRate: Number.parseFloat(interestRate),
      tenure: Number.parseFloat(loanTenure),
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateLoanDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setLoanAmount("0")
    setInterestRate("0")
    setLoanTenure("0")
    calculateLoanDetails()
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
      title="Car Loan Calculator"
      description="Calculate your car loan EMI, total interest, and amortization schedule."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Loan Amount", value: formatCurrency(results.principal) },
              { label: "Interest Rate", value: `${results.interestRate}%` },
              { label: "Loan Tenure", value: `${results.tenure} years` },
              { label: "Monthly EMI", value: formatCurrency(results.emi), isHighlighted: true },
              { label: "Total Interest", value: formatCurrency(results.totalInterest), isHighlighted: true },
              { label: "Total Amount", value: formatCurrency(results.totalAmount), isHighlighted: true },
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
                <XAxis dataKey="month" label={{ value: "Months", position: "insideBottomRight", offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="remainingBalance" name="Remaining Balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="interest" name="Cumulative Interest" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="loanAmount"
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            type="number"
            prefix="₹"
            min={1000}
            tooltip="The total amount of the car loan"
          />
          <InputField
            id="interestRate"
            label="Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            type="number"
            suffix="%"
            min={0.01}
            step={0.01}
            tooltip="Annual interest rate for the car loan"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="loanTenure"
            label="Loan Tenure"
            value={loanTenure}
            onChange={setLoanTenure}
            type="number"
            suffix="years"
            min={1}
            tooltip="Duration of the car loan in years"
          />
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
            onClick={calculateLoanDetails}
            // className="px-4 py-2 bg-primary text-white rounded-md flex items-center justify-center gap-2 hover:bg-primary/90"
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-blue-700"

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

export default CarLoanCalculator