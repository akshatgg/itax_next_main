"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const PersonalLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("100000")
  const [interestRate, setInterestRate] = useState("10")
  const [loanTenure, setLoanTenure] = useState("5")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateLoanDetails = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(interestRate) / 100
    const tenure = Number.parseFloat(loanTenure)

    if (isNaN(principal) || isNaN(rate) || isNaN(tenure) || principal <= 0 || rate <= 0 || tenure <= 0) {
      return
    }

    // Monthly interest rate
    const monthlyRate = rate / 12
    const totalMonths = tenure * 12

    // EMI Calculation
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1)

    const totalAmount = emi * totalMonths
    const totalInterest = totalAmount - principal

    // Generate chart data
    const newChartData = []
    let remainingBalance = principal

    for (let year = 0; year <= tenure; year++) {
      const monthsToDate = year * 12
      const balanceAtYear = principal * Math.pow(1 + monthlyRate, monthsToDate)
      const interestPaidToDate = balanceAtYear - principal
      const principalPaidToDate = totalAmount - interestPaidToDate

      newChartData.push({
        year,
        principal: principal,
        remainingBalance: Math.max(0, balanceAtYear - principalPaidToDate),
        interestPaid: interestPaidToDate,
        principalPaid: principalPaidToDate
      })
    }

    setResults({
      principal,
      rate: rate * 100,
      tenure,
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
    setLoanAmount("100000")
    setInterestRate("10")
    setLoanTenure("5")
    calculateLoanDetails()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <CalculatorLayout
      title="Personal Loan Calculator"
      description="Calculate your personal loan EMI, total interest, and loan progression."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Loan Amount", value: formatCurrency(results.principal) },
              { label: "Interest Rate", value: `${results.rate}%` },
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
                <XAxis dataKey="year" label={{ value: "Years", position: "insideBottomRight", offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, undefined]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="principal" 
                  name="Original Principal" 
                  stroke="#ffc658" 
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="remainingBalance" 
                  name="Remaining Balance" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="interestPaid" 
                  name="Interest Paid" 
                  stroke="#82ca9d" 
                />
                <Line 
                  type="monotone" 
                  dataKey="principalPaid" 
                  name="Principal Paid" 
                  stroke="#ff7300" 
                />
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
            min={1}
            tooltip="The total loan amount you want to borrow"
          />
          <InputField
            id="interestRate"
            label="Annual Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            type="number"
            suffix="%"
            min={0.01}
            step={0.01}
            tooltip="The annual interest rate for the loan"
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
            tooltip="The duration of the loan in years"
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

export default PersonalLoanCalculator