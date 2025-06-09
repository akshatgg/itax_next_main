"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const BusinessLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("500000")
  const [rateOfInterest, setRateOfInterest] = useState("10")
  const [loanTenure, setLoanTenure] = useState("5")
  const [results, setResults] = useState(null)
  const [monthlyPaymentDetails, setMonthlyPaymentDetails] = useState([])
  const [pieChartData, setPieChartData] = useState([])

  const calculateBusinessLoan = () => {
    const loanAmountNum = Number.parseFloat(loanAmount)
    const rateNum = Number.parseFloat(rateOfInterest) / 100 / 12
    const loanTenureNum = Number.parseFloat(loanTenure)

    if (
      isNaN(loanAmountNum) || 
      isNaN(rateNum) || 
      isNaN(loanTenureNum) || 
      loanAmountNum <= 0 || 
      loanTenureNum <= 0
    ) {
      return
    }

    const totalMonths = loanTenureNum * 12
    const emi = (loanAmountNum * rateNum * Math.pow(1 + rateNum, totalMonths)) / 
                (Math.pow(1 + rateNum, totalMonths) - 1)
    const totalAmount = emi * totalMonths
    const totalInterest = totalAmount - loanAmountNum

    // Generate monthly payment details
    let openingBalance = loanAmountNum
    const monthlyDetails = []

    for (let i = 0; i < totalMonths; i++) {
      const interest = Math.floor(openingBalance * rateNum)
      const principal = Math.ceil(emi - interest)
      const closingBalance = Math.max(0, openingBalance - principal)

      monthlyDetails.push({
        month: i + 1,
        openingBalance: openingBalance,
        emi: Math.round(emi),
        interest: interest,
        principal: principal,
        closingBalance: closingBalance
      })

      openingBalance = closingBalance
    }

    // Prepare results
    const results = {
      loanAmount: loanAmountNum,
      rateOfInterest: rateNum * 12 * 100,
      loanTenure: loanTenureNum,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    }

    setResults(results)
    setMonthlyPaymentDetails(monthlyDetails)
    setPieChartData([
      { name: 'Loan Amount', value: loanAmountNum },
      { name: 'Total Interest', value: totalInterest }
    ])
  }

  useEffect(() => {
    calculateBusinessLoan()
  }, [])

  const handleReset = () => {
    setLoanAmount("500000")
    setRateOfInterest("10")
    setLoanTenure("5")
    calculateBusinessLoan()
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
      title="Business Loan Calculator"
      description="Calculate your business loan EMI and repayment schedule"
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Loan Amount", value: formatCurrency(results.loanAmount) },
              { label: "Interest Rate", value: `${results.rateOfInterest.toFixed(2)}%` },
              { label: "Loan Tenure", value: `${results.loanTenure} years` },
              { label: "Monthly EMI", value: formatCurrency(results.emi), isHighlighted: true },
              { label: "Total Interest", value: formatCurrency(results.totalInterest), isHighlighted: true },
              { label: "Total Amount", value: formatCurrency(results.totalAmount), isHighlighted: true },
            ]}
          />
        )
      }
      chartComponent={
        (monthlyPaymentDetails.length > 0 && results) && (
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
                <LineChart data={monthlyPaymentDetails} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: "Months", position: "insideBottomRight", offset: -5 }} />
                  <YAxis tickFormatter={(value) => `₹${value}`} />
                  <Tooltip
                    formatter={(value) => [`₹${Number(value).toFixed(2)}`, undefined]}
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="openingBalance" name="Opening Balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="emi" name="EMI" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="closingBalance" name="Closing Balance" stroke="#ffc658" />
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
            id="loanAmount"
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            type="number"
            prefix="₹"
            min={1}
            tooltip="The total loan amount for your business"
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
            tooltip="Annual interest rate for the business loan"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="loanTenure"
            label="Loan Tenure"
            value={loanTenure}
            onChange={setLoanTenure}
            type="number"
            suffix="years"
            min={1}
            tooltip="Duration of the business loan in years"
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
            onClick={calculateBusinessLoan}
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

export default BusinessLoanCalculator