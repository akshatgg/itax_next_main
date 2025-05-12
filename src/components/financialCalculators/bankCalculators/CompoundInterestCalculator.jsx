"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("10000")
  const [rate, setRate] = useState("5")
  const [time, setTime] = useState("5")
  const [compoundFrequency, setCompoundFrequency] = useState("1")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateCompoundInterest = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 100
    const t = Number.parseFloat(time)
    const n = Number.parseFloat(compoundFrequency)

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p <= 0 || r <= 0 || t <= 0 || n <= 0) {
      return
    }

    const amount = p * Math.pow(1 + r / n, n * t)
    const interest = amount - p

    // Generate chart data
    const newChartData = []
    for (let year = 0; year <= t; year++) {
      const yearAmount = p * Math.pow(1 + r / n, n * year)
      const yearInterest = yearAmount - p
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
      compoundFrequency: n,
      amount: amount,
      interest: interest,
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateCompoundInterest()
  }, [])

  const handleReset = () => {
    setPrincipal("10000")
    setRate("5")
    setTime("5")
    setCompoundFrequency("1")
    calculateCompoundInterest()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate how your investments will grow with compound interest over time."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Principal Amount", value: formatCurrency(results.principal) },
              { label: "Interest Rate", value: `${results.rate}%` },
              { label: "Time Period", value: `${results.time} years` },
              { label: "Compound Frequency", value: `${results.compoundFrequency} time(s) per year` },
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
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Years", position: "insideBottomRight", offset: -5 }} />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, undefined]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="amount" name="Total Amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="interest" name="Interest" stroke="#82ca9d" />
                <Line type="monotone" dataKey="principal" name="Principal" stroke="#ffc658" strokeDasharray="5 5" />
              </LineChart>
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
            prefix="$"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <InputField
            id="compoundFrequency"
            label="Compound Frequency"
            value={compoundFrequency}
            onChange={setCompoundFrequency}
            type="number"
            suffix="per year"
            min={1}
            tooltip="How many times the interest is compounded per year (1 = annually, 4 = quarterly, 12 = monthly)"
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
            onClick={calculateCompoundInterest}
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

export default CompoundInterestCalculator
