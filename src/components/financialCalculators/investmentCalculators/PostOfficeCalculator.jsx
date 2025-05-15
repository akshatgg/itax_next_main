"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const PostOfficeMonthlyIncomeSchemeCal = () => {
  const [investmentAmount, setInvestmentAmount] = useState("100000")
  const [interestRate, setInterestRate] = useState("7.4")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateMonthlyIncome = () => {
    const investment = Number.parseFloat(investmentAmount)
    const rate = Number.parseFloat(interestRate)

    if (isNaN(investment) || isNaN(rate) || investment <= 0 || rate <= 0) {
      return
    }

    // Calculate monthly income
    const monthlyIncome = investment * (rate / 1200)
    const annualIncome = monthlyIncome * 12

    // Generate chart data
    const newChartData = [
      { category: 'Monthly Income', amount: monthlyIncome },
      { category: 'Annual Income', amount: annualIncome }
    ]

    setResults({
      investmentAmount: investment,
      interestRate: rate,
      monthlyIncome: monthlyIncome,
      annualIncome: annualIncome
    })

    setChartData(newChartData)
  }

  const handleReset = () => {
    setInvestmentAmount("100000")
    setInterestRate("7.4")
    calculateMonthlyIncome()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Trigger initial calculation on component mount
  useState(() => {
    calculateMonthlyIncome()
  })

  return (
    <CalculatorLayout
      title="Post Office Monthly Income Scheme Calculator"
      description="Calculate your monthly and annual income from Post Office Monthly Income Scheme."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Investment Amount", value: formatCurrency(results.investmentAmount) },
              { label: "Interest Rate", value: `${results.interestRate}%` },
              { label: "Monthly Income", value: formatCurrency(results.monthlyIncome), isHighlighted: true },
              { label: "Annual Income", value: formatCurrency(results.annualIncome), isHighlighted: true },
            ]}
          />
        )
      }
      chartComponent={
        chartData.length > 0 && (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, undefined]}
                />
                <Legend />
                <Bar dataKey="amount" name="Income" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="investmentAmount"
            label="Investment Amount"
            value={investmentAmount}
            onChange={setInvestmentAmount}
            type="number"
            prefix="$"
            min={1}
            tooltip="Total amount invested in the Post Office Monthly Income Scheme"
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
            tooltip="Annual interest rate for the scheme"
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
            onClick={calculateMonthlyIncome}
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

export default PostOfficeMonthlyIncomeSchemeCal