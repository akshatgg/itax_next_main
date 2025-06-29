"use client"

import { useState, useEffect } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const HomeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("500000")
  const [interestRate, setInterestRate] = useState("6.5")
  const [loanTerm, setLoanTerm] = useState("20")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])
  const [pieData, setPieData] = useState([])

  const calculateLoan = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(interestRate) / 100 / 12 // Monthly interest rate
    const term = Number.parseFloat(loanTerm) * 12 // Term in months

    if (isNaN(principal) || isNaN(rate) || isNaN(term) || principal <= 0 || rate <= 0 || term <= 0) {
      return
    }

    // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
    const totalPayment = monthlyPayment * term
    const totalInterest = totalPayment - principal

    // Generate chart data for amortization
    const newChartData = []
    let remainingBalance = principal
    let totalPrincipalPaid = 0
    let totalInterestPaid = 0

    for (let month = 1; month <= term; month++) {
      const interestPayment = remainingBalance * rate
      const principalPayment = monthlyPayment - interestPayment

      remainingBalance -= principalPayment
      totalPrincipalPaid += principalPayment
      totalInterestPaid += interestPayment

      if (month % 12 === 0 || month === term) {
        newChartData.push({
          year: Math.ceil(month / 12),
          remainingBalance,
          totalPrincipalPaid,
          totalInterestPaid,
        })
      }
    }

    setResults({
      principal,
      interestRate: Number.parseFloat(interestRate),
      loanTerm: Number.parseFloat(loanTerm),
      monthlyPayment,
      totalPayment,
      totalInterest,
    })

    setChartData(newChartData)
    setPieData([
      { name: "Principal", value: principal },
      { name: "Interest", value: totalInterest },
    ])
  }

  useEffect(() => {
    calculateLoan()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setLoanAmount("500000")
    setInterestRate("6.5")
    setLoanTerm("20")
    calculateLoan()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const COLORS = ["#0088FE", "#FF8042"]

  return (
    <CalculatorLayout
      title="Home Loan Calculator"
      description="Calculate your monthly payments, total interest, and view amortization schedule."
      resultComponent={
        results && (
          <div className="space-y-6">
            <CalculatorResultCard
              results={[
                { label: "Loan Amount", value: formatCurrency(results.principal) },
                { label: "Interest Rate", value: `${results.interestRate}%` },
                { label: "Loan Term", value: `${results.loanTerm} years` },
                { label: "Monthly Payment", value: formatCurrency(results.monthlyPayment), isHighlighted: true },
                { label: "Total Interest", value: formatCurrency(results.totalInterest) },
                { label: "Total Payment", value: formatCurrency(results.totalPayment), isHighlighted: true },
              ]}
            />

            <div className="h-[150px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      }
      chartComponent={
        chartData.length > 0 && (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Years", position: "insideBottomRight", offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="remainingBalance"
                  name="Remaining Balance"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="totalPrincipalPaid"
                  name="Principal Paid"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="totalInterestPaid"
                  name="Interest Paid"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
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
            tooltip="The total amount you wish to borrow"
          />
          <InputField
            id="interestRate"
            label="Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            type="number"
            suffix="%"
            min={0.1}
            step={0.1}
            tooltip="Annual interest rate for the loan"
          />
        </div>

        <InputField
          id="loanTerm"
          label="Loan Term"
          value={loanTerm}
          onChange={setLoanTerm}
          type="number"
          suffix="years"
          min={1}
          max={30}
          tooltip="The duration of the loan in years"
        />

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
            onClick={calculateLoan}
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

export default HomeLoanCalculator
