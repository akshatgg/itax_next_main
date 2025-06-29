"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("10000")
  const [rate, setRate] = useState("5")
  const [time, setTime] = useState("5")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateSimpleInterest = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 100
    const t = Number.parseFloat(time)

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      return
    }

    const interest = p * r * t
    const amount = p + interest

    // Generate chart data
    const newChartData = []
    for (let year = 0; year <= t; year++) {
      const yearInterest = p * r * year
      const yearAmount = p + yearInterest
      newChartData.push({
        year,
        principal: p,
        interest: yearInterest,
        amount: yearAmount,
      })
    }

    setResults({
      principal: p,
      rate: r * 100,
      time: t,
      amount: amount,
      interest: interest,
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateSimpleInterest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setPrincipal("10000")
    setRate("5")
    setTime("5")
    calculateSimpleInterest()
  }

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};


  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate the interest earned on your principal amount over time."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Principal Amount", value: formatCurrency(results.principal) },
              { label: "Interest Rate", value: `${results.rate}%` },
              { label: "Time Period", value: `${results.time} years` },
              { label: "Total Interest", value: formatCurrency(results.interest), isHighlighted: true },
              { label: "Final Amount", value: formatCurrency(results.amount), isHighlighted: true },
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
                <XAxis dataKey="year" label={{ value: "Years", position: "insideBottomRight", offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toFixed(2)}`, undefined]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Bar dataKey="principal" name="Principal" fill="#ffc658" />
                <Bar dataKey="interest" name="Interest" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="principal"
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The initial investment amount"
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
            tooltip="The annual interest rate (in percentage)"
          />
        </div>

        <InputField
          id="time"
          label="Time Period"
          value={time}
          onChange={setTime}
          type="number"
          suffix="years"
          min={1}
          tooltip="The time period for the investment (in years)"
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
            onClick={calculateSimpleInterest}
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

export default SimpleInterestCalculator
