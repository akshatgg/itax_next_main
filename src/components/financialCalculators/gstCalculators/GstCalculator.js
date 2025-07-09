"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const GstCalculator = () => {
  const [amount, setAmount] = useState("0")
  const [gstRate, setGstRate] = useState("0")
  const [calculationType, setCalculationType] = useState("exclusive")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateGST = () => {
    const baseAmount = Number.parseFloat(amount)
    const rate = Number.parseFloat(gstRate) / 100

    if (isNaN(baseAmount) || isNaN(rate) || baseAmount < 0 || rate < 0) {
      return
    }

    let gstAmount, totalAmount, netAmount

    if (calculationType === "exclusive") {
      // GST is added to the amount
      gstAmount = baseAmount * rate
      totalAmount = baseAmount + gstAmount
      netAmount = baseAmount
    } else {
      // GST is included in the amount
      netAmount = baseAmount / (1 + rate)
      gstAmount = baseAmount - netAmount
      totalAmount = baseAmount
    }

    setResults({
      netAmount,
      gstAmount,
      totalAmount,
      gstRate: rate * 100,
      calculationType,
    })

    setChartData([
      { name: "Net Amount", value: netAmount },
      { name: "GST Amount", value: gstAmount },
    ])
  }

  useEffect(() => {
    calculateGST()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setAmount("0")
    setGstRate("0")
    setCalculationType("exclusive")
    calculateGST()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const COLORS = ["#0088FE", "#00C49F"]

  return (
    <CalculatorLayout
      title="GST Calculator"
      description="Calculate GST amount and total price with or without GST included."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              {
                label: calculationType === "exclusive" ? "Original Amount" : "Amount (GST Inclusive)",
                value: formatCurrency(calculationType === "exclusive" ? results.netAmount : results.totalAmount),
              },
              { label: "GST Rate", value: `${results.gstRate}%` },
              { label: "GST Amount", value: formatCurrency(results.gstAmount), isHighlighted: true },
              {
                label: calculationType === "exclusive" ? "Total Amount" : "Net Amount (GST Exclusive)",
                value: formatCurrency(calculationType === "exclusive" ? results.totalAmount : results.netAmount),
                isHighlighted: true,
              },
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
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Calculation Type</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="exclusive">Add GST to amount (Exclusive)</option>
              <option value="inclusive">Extract GST from amount (Inclusive)</option>
            </select>
          </div>

          <InputField
            id="amount"
            label={calculationType === "exclusive" ? "Amount (Excluding GST)" : "Amount (Including GST)"}
            value={amount}
            onChange={setAmount}
            type="number"
            prefix="₹"
            min={0}
            tooltip={
              calculationType === "exclusive" ? "Enter the amount without GST" : "Enter the amount with GST included"
            }
          />

          <InputField
            id="gstRate"
            label="GST Rate"
            value={gstRate}
            onChange={setGstRate}
            type="number"
            suffix="%"
            min={0}
            step={0.1}
            tooltip="The GST rate to apply"
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
            onClick={calculateGST}
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

export default GstCalculator
