"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const FixedDepositCalculator = () => {
  const [principal, setPrincipal] = useState("100000")
  const [interestRate, setInterestRate] = useState("7")
  const [timePeriod, setTimePeriod] = useState("5")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateFixedDeposit = () => {
    const principalAmount = Number.parseFloat(principal)
    const rate = Number.parseFloat(interestRate)
    const years = Number.parseFloat(timePeriod)

    if (isNaN(principalAmount) || isNaN(rate) || isNaN(years) || principalAmount <= 0 || rate <= 0 || years <= 0) {
      return
    }

    // Simple interest calculation
    const interestEarned = (principalAmount * rate * years) / 100
    const totalAmount = principalAmount + interestEarned

    // Generate chart data
    const newChartData = []
    for (let year = 0; year <= years; year++) {
      const yearlyInterest = (principalAmount * rate * year) / 100
      newChartData.push({
        year,
        principal: principalAmount,
        interestEarned: yearlyInterest,
        totalValue: principalAmount + yearlyInterest
      })
    }

    setResults({
      principal: principalAmount,
      interestRate: rate,
      timePeriod: years,
      interestEarned: interestEarned,
      totalAmount: totalAmount
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateFixedDeposit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setPrincipal("100000")
    setInterestRate("7")
    setTimePeriod("5")
    calculateFixedDeposit()
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
      title="Fixed Deposit Calculator"
      description="Calculate your fixed deposit returns and interest earnings"
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Principal Amount", value: formatCurrency(results.principal) },
              { label: "Interest Rate", value: `${results.interestRate}%` },
              { label: "Time Period", value: `${results.timePeriod} years` },
              { label: "Interest Earned", value: formatCurrency(results.interestEarned), isHighlighted: true },
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
                  name="Principal" 
                  stroke="#ffc658" 
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="interestEarned" 
                  name="Cumulative Interest" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="totalValue" 
                  name="Total Value" 
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
            id="principal"
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The initial deposit amount"
          />
          <InputField
            id="interestRate"
            label="Interest Rate (P.A.)"
            value={interestRate}
            onChange={setInterestRate}
            type="number"
            suffix="%"
            min={0.01}
            step={0.01}
            tooltip="Annual interest rate for the fixed deposit"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="timePeriod"
            label="Time Period"
            value={timePeriod}
            onChange={setTimePeriod}
            type="number"
            suffix="years"
            min={1}
            tooltip="Duration of the fixed deposit"
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
            onClick={calculateFixedDeposit}
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

export default FixedDepositCalculator