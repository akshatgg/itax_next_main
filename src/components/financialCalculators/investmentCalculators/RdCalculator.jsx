"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const RecurringDepositCalculator = () => {
  const [principal, setPrincipal] = useState("1000")
  const [rate, setRate] = useState("7")
  const [months, setMonths] = useState("12")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateRecurringDeposit = () => {
    const monthlyDeposit = Number.parseFloat(principal)
    const interestRate = Number.parseFloat(rate)
    const totalMonths = Number.parseFloat(months)

    if (isNaN(monthlyDeposit) || isNaN(interestRate) || isNaN(totalMonths) || 
        monthlyDeposit <= 0 || interestRate <= 0 || totalMonths <= 0) {
      return
    }

    // Recurring Deposit calculation formula
    const interestEarned = 
      (monthlyDeposit * ((totalMonths * (totalMonths + 1)) / 24) * interestRate) / 100

    const totalInvested = monthlyDeposit * totalMonths
    const totalValue = totalInvested + interestEarned

    // Prepare chart data
    const newChartData = [
      { 
        name: 'Invested Amount', 
        value: Number(totalInvested),
        color: 'rgba(255, 99, 132, 0.6)'
      },
      { 
        name: 'Interest Earned', 
        value: Number(interestEarned),
        color: 'rgba(54, 162, 235, 0.6)'
      }
    ]

    setResults({
      monthlyDeposit,
      interestRate,
      totalMonths,
      interestEarned,
      totalInvested,
      totalValue
    })

    setChartData(newChartData)
  }

  const handleReset = () => {
    setPrincipal("1000")
    setRate("7")
    setMonths("12")
    calculateRecurringDeposit()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Trigger initial calculation on component mount
  useState(() => {
    calculateRecurringDeposit()
  })

  return (
    <CalculatorLayout
      title="Recurring Deposit Calculator"
      description="Calculate your returns from a recurring deposit investment."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Monthly Deposit", value: formatCurrency(results.monthlyDeposit) },
              { label: "Interest Rate", value: `${results.interestRate}%` },
              { label: "Total Months", value: `${results.totalMonths} months` },
              { label: "Total Invested", value: formatCurrency(results.totalInvested) },
              { label: "Interest Earned", value: formatCurrency(results.interestEarned), isHighlighted: true },
              { label: "Total Value", value: formatCurrency(results.totalValue), isHighlighted: true },
            ]}
          />
        )
      }
      chartComponent={
        chartData.length > 0 && (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), undefined]}
                  labelFormatter={(label) => label}
                />
                <Legend 
                  formatter={(value) => value}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="principal"
            label="Monthly Deposit"
            value={principal}
            onChange={setPrincipal}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The amount you'll deposit monthly"
          />
          <InputField
            id="rate"
            label="Annual Interest Rate"
            value={rate}
            onChange={setRate}
            type="number"
            suffix="%"
            min={0.01}
            step={0.01}
            tooltip="The annual interest rate for the recurring deposit"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="months"
            label="Number of Months"
            value={months}
            onChange={setMonths}
            type="number"
            suffix="months"
            min={1}
            tooltip="Total number of months for the recurring deposit"
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
            onClick={calculateRecurringDeposit}
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

export default RecurringDepositCalculator