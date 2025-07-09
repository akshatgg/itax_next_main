"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const CAGRCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("0")
  const [finalInvestment, setFinalInvestment] = useState("0")
  const [timePeriod, setTimePeriod] = useState("0")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateCAGR = () => {
    const initial = Number.parseFloat(initialInvestment)
    const final = Number.parseFloat(finalInvestment)
    const years = Number.parseFloat(timePeriod)

    if (isNaN(initial) || isNaN(final) || isNaN(years) || initial <= 0 || final <= 0 || years <= 0) {
      return
    }

    // Calculate CAGR
    const cagr = ((final / initial) ** (1 / years) - 1) * 100

    // Generate chart data
    const newChartData = []
    for (let year = 0; year <= years; year++) {
      const value = initial * Math.pow(1 + cagr / 100, year)
      newChartData.push({
        year,
        initialInvestment: initial,
        currentValue: value,
        growthDifference: value - initial
      })
    }

    setResults({
      initialInvestment: initial,
      finalInvestment: final,
      timePeriod: years,
      cagr: cagr.toFixed(2),
      totalGrowth: ((final / initial - 1) * 100).toFixed(2)
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateCAGR()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setInitialInvestment("0")
    setFinalInvestment("0")
    setTimePeriod("0")
    calculateCAGR()
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
      title="CAGR Calculator"
      description="Calculate Compound Annual Growth Rate (CAGR) for your investments"
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Initial Investment", value: formatCurrency(results.initialInvestment) },
              { label: "Final Investment", value: formatCurrency(results.finalInvestment) },
              { label: "Time Period", value: `${results.timePeriod} years` },
              { label: "CAGR", value: `${results.cagr}%`, isHighlighted: true },
              { label: "Total Growth", value: `${results.totalGrowth}%`, isHighlighted: true },
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
                  dataKey="initialInvestment" 
                  name="Initial Investment" 
                  stroke="#ffc658" 
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="currentValue" 
                  name="Current Value" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="growthDifference" 
                  name="Growth" 
                  stroke="#82ca9d" 
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
            id="initialInvestment"
            label="Initial Investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The initial amount of investment"
          />
          <InputField
            id="finalInvestment"
            label="Final Investment"
            value={finalInvestment}
            onChange={setFinalInvestment}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The final value of the investment"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="timePeriod"
            label="Investment Duration"
            value={timePeriod}
            onChange={setTimePeriod}
            type="number"
            suffix="years"
            min={1}
            tooltip="The duration of the investment in years"
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
            onClick={calculateCAGR}
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

export default CAGRCalculator