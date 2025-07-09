"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const LumpSumCalculator = () => {
  const [principal, setPrincipal] = useState("0")
  const [rate, setRate] = useState("0")
  const [time, setTime] = useState("0")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateLumpSum = () => {
    const invested = Number.parseFloat(principal)
    const interestRate = Number.parseFloat(rate) / 100
    const years = Number.parseFloat(time)

    if (isNaN(invested) || isNaN(interestRate) || isNaN(years) || invested <= 0 || interestRate <= 0 || years <= 0) {
      return
    }

    const total = invested * Math.pow(1 + interestRate, years)
    const gain = total - invested

    // Generate chart data
    const newChartData = []
    for (let year = 0; year <= years; year++) {
      const yearAmount = invested * Math.pow(1 + interestRate, year)
      const yearGain = yearAmount - invested
      newChartData.push({
        year,
        invested: invested,
        gain: yearGain,
        total: yearAmount,
      })
    }

    setResults({
      invested,
      total,
      gain,
      rate: interestRate * 100,
      time: years
    })

    setChartData(newChartData)
  }

  const handleReset = () => {
    setPrincipal("0")
    setRate("0")
    setTime("0")
    calculateLumpSum()
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
    calculateLumpSum()
  })

  return (
    <CalculatorLayout
      title="Lump Sum Investment Calculator"
      description="Calculate the future value of a one-time investment over time."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Initial Investment", value: formatCurrency(results.invested) },
              { label: "Interest Rate", value: `${results.rate}%` },
              { label: "Investment Period", value: `${results.time} years` },
              { label: "Total Gain", value: formatCurrency(results.gain), isHighlighted: true },
              { label: "Final Value", value: formatCurrency(results.total), isHighlighted: true },
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
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toFixed(2)}`, undefined]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="total" name="Total Value" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="gain" name="Gain" stroke="#82ca9d" />
                <Line type="monotone" dataKey="invested" name="Initial Investment" stroke="#ffc658" strokeDasharray="5 5" />
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
            label="Initial Investment"
            value={principal}
            onChange={setPrincipal}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The amount you're investing as a lump sum"
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
            tooltip="The expected annual return rate"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="time"
            label="Investment Period"
            value={time}
            onChange={setTime}
            type="number"
            suffix="years"
            min={1}
            tooltip="The number of years you plan to invest"
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
            onClick={calculateLumpSum}
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

export default LumpSumCalculator