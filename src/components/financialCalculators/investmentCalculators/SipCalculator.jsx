"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("0")
  const [expectedReturn, setExpectedReturn] = useState("0")
  const [timePeriod, setTimePeriod] = useState("0")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateSIP = () => {
    const investment = Number.parseFloat(monthlyInvestment)
    const returnRate = Number.parseFloat(expectedReturn) / 100 / 12 // Monthly return rate
    const months = Number.parseFloat(timePeriod) * 12 // Total months

    if (isNaN(investment) || isNaN(returnRate) || isNaN(months) || investment <= 0 || returnRate <= 0 || months <= 0) {
      return
    }

    // Calculate future value using the formula: P * ((1 + r)^n - 1) / r * (1 + r)
    const futureValue = investment * ((Math.pow(1 + returnRate, months) - 1) / returnRate) * (1 + returnRate)
    const totalInvestment = investment * months
    const estimatedReturns = futureValue - totalInvestment

    // Generate chart data
    const newChartData = []
    for (let year = 1; year <= Number.parseFloat(timePeriod); year++) {
      const yearMonths = year * 12
      const yearInvestment = investment * yearMonths
      const yearFutureValue = investment * ((Math.pow(1 + returnRate, yearMonths) - 1) / returnRate) * (1 + returnRate)
      const yearReturns = yearFutureValue - yearInvestment

      newChartData.push({
        year,
        investment: yearInvestment,
        returns: yearReturns,
        total: yearFutureValue,
      })
    }

    setResults({
      monthlyInvestment: investment,
      expectedReturn: Number.parseFloat(expectedReturn),
      timePeriod: Number.parseFloat(timePeriod),
      totalInvestment,
      estimatedReturns,
      futureValue,
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateSIP()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setMonthlyInvestment("0")
    setExpectedReturn("0")
    setTimePeriod("0")
    calculateSIP()
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
      title="SIP Calculator"
      description="Calculate the future value of your Systematic Investment Plan (SIP)."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Monthly Investment", value: formatCurrency(results.monthlyInvestment) },
              { label: "Expected Return", value: `${results.expectedReturn}%` },
              { label: "Time Period", value: `${results.timePeriod} years` },
              { label: "Total Investment", value: formatCurrency(results.totalInvestment) },
              { label: "Estimated Returns", value: formatCurrency(results.estimatedReturns), isHighlighted: true },
              { label: "Future Value", value: formatCurrency(results.futureValue), isHighlighted: true },
            ]}
          />
        )
      }
      chartComponent={
        chartData.length > 0 && (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Years", position: "insideBottomRight", offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), undefined]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Bar dataKey="investment" name="Investment" stackId="a" fill="#0088FE" />
                <Bar dataKey="returns" name="Returns" stackId="a" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="monthlyInvestment"
            label="Monthly Investment"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            type="number"
            prefix="₹"
            min={100}
            tooltip="The amount you plan to invest every month"
          />
          <InputField
            id="expectedReturn"
            label="Expected Annual Return"
            value={expectedReturn}
            onChange={setExpectedReturn}
            type="number"
            suffix="%"
            min={1}
            max={50}
            step={0.1}
            tooltip="The expected annual return rate on your investment"
          />
        </div>

        <InputField
          id="timePeriod"
          label="Investment Time Period"
          value={timePeriod}
          onChange={setTimePeriod}
          type="number"
          suffix="years"
          min={1}
          max={50}
          tooltip="The duration for which you plan to invest"
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
            onClick={calculateSIP}
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

export default SipCalculator
