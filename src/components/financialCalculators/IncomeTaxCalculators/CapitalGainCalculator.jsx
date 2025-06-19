"use client"

import { useState, useEffect, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const CapitalGainsCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("100000")
  const [salePrice, setSalePrice] = useState("150000")
  const [capitalGainsTaxRate, setCapitalGainsTaxRate] = useState("15")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateCapitalGains = () => {
    const p = Number.parseFloat(purchasePrice)
    const s = Number.parseFloat(salePrice)
    const t = Number.parseFloat(capitalGainsTaxRate)

    if (isNaN(p) || isNaN(s) || isNaN(t) || p <= 0 || s <= 0 || t < 0) {
      return
    }

    const totalCapitalGains = s - p
    const taxOwed = (totalCapitalGains * t) / 100

    // Generate chart data
    const newChartData = [
      { category: "Purchase Price", value: p },
      { category: "Sale Price", value: s },
      { category: "Total Capital Gains", value: totalCapitalGains },
      { category: "Tax Owed", value: taxOwed }
    ]

    setResults({
      purchasePrice: p,
      salePrice: s,
      capitalGainsTaxRate: t,
      totalCapitalGains: totalCapitalGains,
      taxOwed: taxOwed,
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateCapitalGains()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setPurchasePrice("100000")
    setSalePrice("150000")
    setCapitalGainsTaxRate("15")
    calculateCapitalGains()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <CalculatorLayout
      title="Capital Gains Calculator"
      description="Calculate your capital gains and potential tax liability."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Purchase Price", value: formatCurrency(results.purchasePrice) },
              { label: "Sale Price", value: formatCurrency(results.salePrice) },
              { label: "Capital Gains Tax Rate", value: `${results.capitalGainsTaxRate}%` },
              { label: "Total Capital Gains", value: formatCurrency(results.totalCapitalGains), isHighlighted: true },
              { label: "Tax Owed", value: formatCurrency(results.taxOwed), isHighlighted: true },
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
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, undefined]}
                />
                <Legend />
                <Line type="monotone" dataKey="value" name="Value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      }
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="purchasePrice"
            label="Purchase Price"
            value={purchasePrice}
            onChange={setPurchasePrice}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The original purchase price of the asset"
          />
          <InputField
            id="salePrice"
            label="Sale Price"
            value={salePrice}
            onChange={setSalePrice}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The price at which the asset was sold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="capitalGainsTaxRate"
            label="Capital Gains Tax Rate"
            value={capitalGainsTaxRate}
            onChange={setCapitalGainsTaxRate}
            type="number"
            suffix="%"
            min={0}
            step={0.01}
            tooltip="The tax rate applied to capital gains"
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
            onClick={calculateCapitalGains}
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

export default CapitalGainsCalculator