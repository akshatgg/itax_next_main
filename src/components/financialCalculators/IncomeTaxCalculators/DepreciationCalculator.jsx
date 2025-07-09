"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const DepreciationCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("0")
  const [scrapValue, setScrapValue] = useState("0")
  const [estimatedUsefulLife, setEstimatedUsefulLife] = useState("0")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])

  const calculateDepreciation = () => {
    const p = Number.parseFloat(purchasePrice)
    const s = Number.parseFloat(scrapValue)
    const t = Number.parseFloat(estimatedUsefulLife)

    if (isNaN(p) || isNaN(s) || isNaN(t) || p <= 0 || s < 0 || t <= 0) {
      return
    }

    // Calculate cost of asset and depreciation rate
    const costOfAsset = p - s
    const yearlyDep = costOfAsset / t
    const depRate = yearlyDep / p

    // Generate chart data
    const newChartData = []
    let currentValue = p
    for (let year = 0; year <= t; year++) {
      newChartData.push({
        year,
        value: currentValue,
      })
      currentValue -= yearlyDep
    }

    setResults({
      purchasePrice: p,
      scrapValue: s,
      estimatedUsefulLife: t,
      costOfAsset: costOfAsset,
      depreciationRate: depRate * 100,
      yearlyDepreciation: yearlyDep
    })

    setChartData(newChartData)
  }

  useEffect(() => {
    calculateDepreciation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setPurchasePrice("0")
    setScrapValue("0")
    setEstimatedUsefulLife("0")
    calculateDepreciation()
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
      title="Depreciation Calculator"
      description="Calculate asset depreciation and value over time."
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Purchase Price", value: formatCurrency(results.purchasePrice) },
              { label: "Scrap Value", value: formatCurrency(results.scrapValue) },
              { label: "Estimated Useful Life", value: `${results.estimatedUsefulLife} years` },
              { label: "Cost of Asset", value: formatCurrency(results.costOfAsset), isHighlighted: true },
              { label: "Depreciation Rate", value: `${results.depreciationRate.toFixed(2)}%`, isHighlighted: true },
              { label: "Yearly Depreciation", value: formatCurrency(results.yearlyDepreciation) },
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
                <Line type="monotone" dataKey="value" name="Asset Value" stroke="#8884d8" activeDot={{ r: 8 }} />
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
            id="scrapValue"
            label="Scrap Value"
            value={scrapValue}
            onChange={setScrapValue}
            type="number"
            prefix="₹"
            min={0}
            tooltip="The estimated salvage or residual value of the asset"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="estimatedUsefulLife"
            label="Estimated Useful Life"
            value={estimatedUsefulLife}
            onChange={setEstimatedUsefulLife}
            type="number"
            suffix="years"
            min={1}
            tooltip="The expected number of years the asset will be used"
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
            onClick={calculateDepreciation}
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

export default DepreciationCalculator