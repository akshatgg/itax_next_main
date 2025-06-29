"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import CalculatorLayout from "../components/CalculatorLayout"
import { InputField } from "../components/InputField"
import { CalculatorResultCard } from "../components/CalculatorResultCard"

const LoanAgainstProperty = () => {
  const [loanAmount, setLoanAmount] = useState("500000")
  const [interestRate, setInterestRate] = useState("8.5")
  const [loanTenure, setLoanTenure] = useState("20")
  const [results, setResults] = useState(null)
  const [monthlyData, setMonthlyData] = useState([])

  const calculateLoanDetails = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const tenure = Number.parseFloat(loanTenure) * 12

    if (isNaN(principal) || isNaN(rate) || isNaN(tenure) || principal <= 0 || rate <= 0 || tenure <= 0) {
      return
    }

    // EMI Calculation
    const emi = principal * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1)
    const totalAmount = emi * tenure
    const totalInterest = totalAmount - principal

    // Generate monthly amortization data
    const monthlyAmortizationData = []
    let remainingBalance = principal

    for (let month = 1; month <= tenure; month++) {
      const monthlyInterest = remainingBalance * rate
      const monthlyPrincipal = emi - monthlyInterest
      remainingBalance -= monthlyPrincipal

      monthlyAmortizationData.push({
        month,
        monthlyEMI: emi,
        interest: monthlyInterest,
        principal: monthlyPrincipal,
        remainingBalance: Math.max(remainingBalance, 0)
      })
    }

    setResults({
      principal,
      rate: Number.parseFloat(interestRate),
      tenure: Number.parseFloat(loanTenure),
      monthlyEMI: emi,
      totalInterest,
      totalAmount
    })

    setMonthlyData(monthlyAmortizationData)
  }

  useEffect(() => {
    calculateLoanDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReset = () => {
    setLoanAmount("500000")
    setInterestRate("8.5")
    setLoanTenure("20")
    calculateLoanDetails()
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
      title="Loan Against Property Calculator"
      description="Calculate your loan details, monthly EMI, and total interest payable"
      resultComponent={
        results && (
          <CalculatorResultCard
            results={[
              { label: "Loan Amount", value: formatCurrency(results.principal) },
              { label: "Interest Rate", value: `${results.rate}%` },
              { label: "Loan Tenure", value: `${results.tenure} years` },
              { label: "Monthly EMI", value: formatCurrency(results.monthlyEMI), isHighlighted: true },
              { label: "Total Interest", value: formatCurrency(results.totalInterest), isHighlighted: true },
              { label: "Total Amount", value: formatCurrency(results.totalAmount), isHighlighted: true },
            ]}
          />
        )
      }
      chartComponent={
        monthlyData.length > 0 && (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: "Months", position: "insideBottomRight", offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value.toFixed(0)}`} />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toFixed(2)}`, undefined]}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend />
                <Line type="monotone" dataKey="remainingBalance" name="Remaining Balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="principal" name="Principal Repaid" stroke="#82ca9d" />
                <Line type="monotone" dataKey="interest" name="Interest Paid" stroke="#ffc658" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
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
            tooltip="The total loan amount you want to borrow"
          />
          <InputField
            id="interestRate"
            label="Annual Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            type="number"
            suffix="%"
            min={0.01}
            step={0.01}
            tooltip="The annual interest rate for the loan"
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
            tooltip="The total duration of the loan in years"
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
            onClick={calculateLoanDetails}
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

export default LoanAgainstProperty