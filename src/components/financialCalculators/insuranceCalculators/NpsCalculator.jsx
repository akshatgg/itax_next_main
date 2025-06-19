"use client"

import { useState, useRef, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const NpsCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000")
  const [rateOfInterest, setRateOfInterest] = useState("8")
  const [currentAge, setCurrentAge] = useState("30")
  const [results, setResults] = useState(null)
  const [chartData, setChartData] = useState([])
  const [pieChartData, setPieChartData] = useState([])

  const calculateNPS = () => {
    const monthlyInvestmentNum = Number.parseFloat(monthlyInvestment)
    const rateNum = Number.parseFloat(rateOfInterest) / 100 / 12
    const currentAgeNum = Number.parseFloat(currentAge)

    if (
      isNaN(monthlyInvestmentNum) || 
      isNaN(rateNum) || 
      isNaN(currentAgeNum) || 
      monthlyInvestmentNum <= 0 || 
      currentAgeNum < 18 || 
      currentAgeNum >= 60
    ) {
      return
    }

    const retirementAge = 60
    const investmentYears = retirementAge - currentAgeNum
    const monthsToInvest = investmentYears * 12

    let totalInvested = monthlyInvestmentNum * monthsToInvest
    let futureValue = 0
    const yearlyGain = []

    // Calculate future value using compound interest
    for (let month = 1; month <= monthsToInvest; month++) {
      futureValue += monthlyInvestmentNum * Math.pow(1 + rateNum, monthsToInvest - month + 1)
    }

    // Generate yearly data for chart
    for (let year = 1; year <= investmentYears; year++) {
      const yearlyInvestment = monthlyInvestmentNum * 12
      const yearlyInterestEarned = futureValue * (rateNum * 12) * (year / investmentYears)
      
      yearlyGain.push({
        year,
        investment: yearlyInvestment,
        interest: yearlyInterestEarned,
        totalAmount: yearlyInvestment + yearlyInterestEarned
      })
    }

    const totalAmount = Math.round(futureValue)
    const totalInterest = Math.round(totalAmount - totalInvested)

    const results = {
      monthlyInvestment: monthlyInvestmentNum,
      rateOfInterest: rateNum * 12 * 100,
      currentAge: currentAgeNum,
      totalInvested: totalInvested,
      totalAmount: totalAmount,
      totalInterest: totalInterest
    }

    setResults(results)
    setChartData(yearlyGain)
    setPieChartData([
      { name: 'Total Invested', value: totalInvested },
      { name: 'Total Interest', value: totalInterest }
    ])
  }

  useEffect(() => {
    calculateNPS()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setMonthlyInvestment("5000")
    setRateOfInterest("8")
    setCurrentAge("30")
    calculateNPS()
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <CalculatorLayout
      title="NPS Calculator"
      description="Calculate your National Pension Scheme (NPS) investment growth"
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Monthly Investment", value: formatCurrency(results.monthlyInvestment) },
              { label: "Interest Rate", value: `${results.rateOfInterest.toFixed(2)}%` },
              { label: "Current Age", value: `${results.currentAge} years` },
              { label: "Total Invested", value: formatCurrency(results.totalInvested), isHighlighted: true },
              { label: "Total Interest", value: formatCurrency(results.totalInterest), isHighlighted: true },
              { label: "Maturity Amount", value: formatCurrency(results.totalAmount), isHighlighted: true },
            ]}
          />
        )
      }
      chartComponent={
        (chartData.length > 0 && results) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), undefined]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
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
                  <Line type="monotone" dataKey="totalAmount" name="Total Amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="investment" name="Investment" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="interest" name="Interest" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
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
            min={1}
            tooltip="The amount you plan to invest monthly"
          />
          <InputField
            id="rateOfInterest"
            label="Rate of Interest (P.A.)"
            value={rateOfInterest}
            onChange={setRateOfInterest}
            type="number"
            suffix="%"
            min={0.01}
            step={0.01}
            tooltip="Expected annual rate of return"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="currentAge"
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            type="number"
            suffix="years"
            min={18}
            max={59}
            tooltip="Your current age (between 18-59)"
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
            onClick={calculateNPS}
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

export default NpsCalculator