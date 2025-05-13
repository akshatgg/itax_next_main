"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Shield, Heart, Umbrella, Coins, Filter, ArrowLeft } from "lucide-react"

import DashSection from "@/components/pagesComponents/pageLayout/DashSection"

// Base insurance plans data
const insurancePlans = [
  {
    id: 1,
    name: "Jeevan Anand",
    company: "LIC",
    icon: Shield,
    image: "/dashboard/easyInvestment/insurance/BimaJyoti.jpg",
    minAge: 18,
    maxAge: 50,
    minTerm: 15,
    maxTerm: 35,
    baseRate: 6.2,
    basePremium: 8500,
    baseSumAssured: 2500000,
    type: "Endowment",
    ageFactors: { 18: 0.85, 30: 1, 40: 1.25, 50: 1.5, 60: 1.9 },
    genderFactors: { male: 1, female: 0.9 },
    medicalFactors: { yes: 1.3, no: 1 },
    cityTiers: {
      tier1: 1.1, // Metro cities
      tier2: 1, // Large cities
      tier3: 0.9, // Small cities
    },
  },
  {
    id: 2,
    name: "Bima Jyoti",
    company: "LIC",
    icon: Heart,
    image: "/dashboard/easyInvestment/insurance/BimaJyoti.jpg",
    minAge: 20,
    maxAge: 55,
    minTerm: 10,
    maxTerm: 20,
    baseRate: 5.8,
    basePremium: 10000,
    baseSumAssured: 1800000,
    type: "Non-Linked",
    ageFactors: { 20: 0.9, 30: 1, 40: 1.2, 50: 1.45, 60: 1.85 },
    genderFactors: { male: 1, female: 0.9 },
    medicalFactors: { yes: 1.35, no: 1 },
    cityTiers: {
      tier1: 1.15,
      tier2: 1,
      tier3: 0.9,
    },
  },
  {
    id: 3,
    name: "Sanchay Plus",
    company: "HDFC",
    icon: Umbrella,
    image: "/dashboard/easyInvestment/insurance/HDFCLife.jpg",
    minAge: 25,
    maxAge: 60,
    minTerm: 10,
    maxTerm: 25,
    baseRate: 7.1,
    basePremium: 12000,
    baseSumAssured: 3000000,
    type: "Guaranteed Income",
    ageFactors: { 25: 0.9, 35: 1, 45: 1.3, 55: 1.6, 65: 2.0 },
    genderFactors: { male: 1, female: 0.85 },
    medicalFactors: { yes: 1.4, no: 1 },
    cityTiers: {
      tier1: 1.2,
      tier2: 1,
      tier3: 0.85,
    },
  },
  {
    id: 4,
    name: "Smart Wealth",
    company: "MAX",
    icon: Coins,
    image: "/dashboard/easyInvestment/insurance/MaxLife.jpg",
    minAge: 18,
    maxAge: 45,
    minTerm: 10,
    maxTerm: 20,
    baseRate: 6.5,
    basePremium: 15000,
    baseSumAssured: 2200000,
    type: "ULIP",
    ageFactors: { 18: 0.8, 25: 0.9, 35: 1, 45: 1.3, 55: 1.7 },
    genderFactors: { male: 1, female: 0.9 },
    medicalFactors: { yes: 1.25, no: 1 },
    cityTiers: {
      tier1: 1.1,
      tier2: 1,
      tier3: 0.9,
    },
  },
  {
    id: 5,
    name: "Retire Smart",
    company: "SBI",
    icon: Shield,
    image: "/dashboard/easyInvestment/insurance/SBILife.jpg",
    minAge: 30,
    maxAge: 65,
    minTerm: 10,
    maxTerm: 30,
    baseRate: 5.5,
    basePremium: 7000,
    baseSumAssured: 2000000,
    type: "Pension",
    ageFactors: { 30: 0.9, 40: 1, 50: 1.2, 60: 1.5, 70: 2.1 },
    genderFactors: { male: 1, female: 0.95 },
    medicalFactors: { yes: 1.3, no: 1 },
    cityTiers: {
      tier1: 1.05,
      tier2: 1,
      tier3: 0.95,
    },
  },
  {
    id: 6,
    name: "Life Protect",
    company: "ICICI",
    icon: Shield,
    image: "/dashboard/easyInvestment/insurance/ICICIPru.jpg",
    minAge: 20,
    maxAge: 60,
    minTerm: 5,
    maxTerm: 40,
    baseRate: 8.2,
    basePremium: 5000,
    baseSumAssured: 5000000,
    type: "Term",
    ageFactors: { 20: 0.7, 30: 0.9, 40: 1.2, 50: 1.8, 60: 2.5 },
    genderFactors: { male: 1, female: 0.8 },
    medicalFactors: { yes: 1.5, no: 1 },
    cityTiers: {
      tier1: 1.1,
      tier2: 1,
      tier3: 0.9,
    },
  },
]

// Map PIN codes to city tiers (simplified for demo)
const getCityTier = (pinCode) => {
  const firstDigit = pinCode ? pinCode.toString()[0] : "0"

  // Simple mapping for demo purposes
  if (["1", "4", "5"].includes(firstDigit)) {
    return "tier1" // Metro cities
  } else if (["2", "3", "6"].includes(firstDigit)) {
    return "tier2" // Large cities
  } else {
    return "tier3" // Small cities
  }
}

export default function ViewPlans() {
  const searchParams = useSearchParams()

  // Get form data from URL parameters
  const age = Number.parseInt(searchParams.get("age") || "35")
  const gender = searchParams.get("gender") || "male"
  const pinCode = searchParams.get("pinCode") || ""
  const medicalHistory = searchParams.get("medicalHistory") || "no"
  const initialPremium = Number.parseInt(searchParams.get("premium") || "10000")
  const initialTerm = Number.parseInt(searchParams.get("term") || "15")

  // State for form inputs
  const [premium, setPremium] = useState(initialPremium)
  const [term, setTerm] = useState(initialTerm)
  const [planType, setPlanType] = useState("All")

  // State for filtered and calculated plans
  const [filteredPlans, setFilteredPlans] = useState([])

  // Get city tier from PIN code
  const cityTier = getCityTier(pinCode)

  // Calculate insurance details based on age, term, premium, and other factors
  const calculateInsurance = (plan, userAge, userTerm, userPremium, userGender, userMedicalHistory, userCityTier) => {
    // Find the closest age factor
    const ageKeys = Object.keys(plan.ageFactors)
      .map(Number)
      .sort((a, b) => a - b)
    let ageFactor = 1

    // Find the closest age bracket
    for (let i = 0; i < ageKeys.length; i++) {
      if (userAge <= ageKeys[i] || i === ageKeys.length - 1) {
        if (i === 0) {
          ageFactor = plan.ageFactors[ageKeys[0]]
        } else {
          const lowerAge = ageKeys[i - 1]
          const upperAge = ageKeys[i]
          const lowerFactor = plan.ageFactors[lowerAge]
          const upperFactor = plan.ageFactors[upperAge]

          // Linear interpolation for ages between brackets
          if (userAge <= upperAge) {
            ageFactor = lowerFactor + ((upperFactor - lowerFactor) * (userAge - lowerAge)) / (upperAge - lowerAge)
          } else {
            ageFactor = upperFactor
          }
        }
        break
      }
    }

    // Gender factor
    const genderFactor = plan.genderFactors[userGender] || 1

    // Medical history factor
    const medicalFactor = plan.medicalFactors[userMedicalHistory] || 1

    // City tier factor
    const cityFactor = plan.cityTiers[userCityTier] || 1

    // Term adjustment factor (longer terms generally have better rates)
    const termFactor = 1 + ((userTerm - plan.minTerm) / (plan.maxTerm - plan.minTerm)) * 0.2

    // Premium adjustment
    const premiumRatio = userPremium / plan.basePremium

    // Calculate adjusted sum assured with all factors
    const adjustedSumAssured = Math.round(
      ((plan.baseSumAssured * premiumRatio * termFactor) / (ageFactor * medicalFactor)) *
        (1 / genderFactor) *
        cityFactor,
    )

    // Calculate adjusted rate (older age = lower returns)
    const adjustedRate =
      plan.baseRate *
      (1 - (ageFactor - 1) * 0.2) *
      (1 + (genderFactor - 1) * 0.1) *
      (1 - (medicalFactor - 1) * 0.15) *
      (1 + (cityFactor - 1) * 0.05)

    return {
      ...plan,
      premium: userPremium,
      term: userTerm,
      sumAssured: adjustedSumAssured,
      rate: adjustedRate.toFixed(1),
      eligible:
        userAge >= plan.minAge && userAge <= plan.maxAge && userTerm >= plan.minTerm && userTerm <= plan.maxTerm,
    }
  }

  // Filter and calculate plans when inputs change
  useEffect(() => {
    const calculated = insurancePlans
      .map((plan) => calculateInsurance(plan, age, term, premium, gender, medicalHistory, cityTier))
      .filter((plan) => plan.eligible && (planType === "All" || plan.type === planType))
      .sort((a, b) => b.rate - a.rate) // Sort by highest return rate

    setFilteredPlans(calculated)
  }, [premium, term, age, gender, medicalHistory, cityTier, planType])

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`
    } else {
      return `₹${amount}`
    }
  }

  return (
    <div>
      <DashSection title="Recommended Plans">
        <div className="mb-6">
          <Link href="create-insurance/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Form
          </Link>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-blue-800 mb-2">Your Profile</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-blue-600">Age</span>
                <p className="font-medium">{age} years</p>
              </div>
              <div>
                <span className="text-sm text-blue-600">Gender</span>
                <p className="font-medium capitalize">{gender}</p>
              </div>
              <div>
                <span className="text-sm text-blue-600">Medical History</span>
                <p className="font-medium capitalize">{medicalHistory}</p>
              </div>
              <div>
                <span className="text-sm text-blue-600">Location</span>
                <p className="font-medium">
                  {pinCode ? `PIN: ${pinCode} (${cityTier.replace("tier", "Tier ")})` : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="premium" className="block text-sm font-medium text-gray-500 mb-1">
                  Monthly Premium
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="premium"
                    id="premium"
                    value={premium}
                    onChange={(e) => setPremium(Number(e.target.value))}
                    className="pl-8 bg-white border border-gray-300 text-sm rounded-md focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="term" className="block text-sm font-medium text-gray-500 mb-1">
                  Policy Term
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="term"
                    id="term"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    min={5}
                    max={40}
                    className="bg-white border border-gray-300 text-sm rounded-md focus:ring-primary focus:border-primary block w-full p-2.5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">Years</span>
                </div>
              </div>

              <div>
                <label htmlFor="planType" className="block text-sm font-medium text-gray-500 mb-1">
                  Plan Type
                </label>
                <select
                  id="planType"
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value)}
                  className="bg-white border border-gray-300 text-sm rounded-md focus:ring-primary focus:border-primary block w-full p-2.5"
                >
                  <option value="All">All Plans</option>
                  <option value="Term">Term Insurance</option>
                  <option value="Endowment">Endowment</option>
                  <option value="ULIP">ULIP</option>
                  <option value="Pension">Pension</option>
                  <option value="Non-Linked">Non-Linked</option>
                  <option value="Guaranteed Income">Guaranteed Income</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-primary text-white py-2.5 px-4 rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium w-full"
                >
                  <Filter size={16} />
                  More Filters
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{filteredPlans.length}</span> plans available for your profile
              </div>
              <div className="text-sm text-gray-500">
                Based on your profile, we recommend a premium of{" "}
                <span className="font-medium text-primary">{formatCurrency(initialPremium)}/month</span>
              </div>
            </div>
          </div>
        </div>

        {filteredPlans.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="text-xl font-medium text-yellow-700 mb-2">No Matching Plans</div>
            <p className="text-yellow-600">
              Try adjusting your age, term length, or premium amount to see available plans.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    className="w-full h-40 object-cover filter brightness-50"
                    src={plan.image || "/placeholder.svg"}
                    alt={`${plan.company} ${plan.name} Insurance Plan`}
                  />
                  <div className="absolute left-4 top-4 bg-primary text-white rounded-xl px-4 py-2 font-medium text-2xl shadow-lg">
                    <plan.icon className="inline-block mr-1 h-5 w-5" />
                    {plan.company}
                  </div>
                  <div className="absolute right-4 top-4 bg-white/90 text-primary rounded-xl px-3 py-1 text-sm font-medium shadow-lg">
                    {plan.type}
                  </div>
                </div>

                <div className="p-4 text-center">
                  <div className="text-gray-700 font-semibold text-lg mb-1">{plan.name}</div>
                  <div className="mb-3">
                    <div className="text-gray-500">For</div>
                    <div className="text-primary text-5xl font-bold">{plan.term}</div>
                    <div className="text-gray-500">Years</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <div className="text-gray-500">Premium</div>
                      <div className="text-primary font-bold text-xl">{formatCurrency(plan.premium)}</div>
                      <div className="text-gray-500 text-sm">/Month</div>
                    </div>

                    <div>
                      <div className="text-gray-500">Sum Assured</div>
                      <div className="text-primary font-bold text-xl">{formatCurrency(plan.sumAssured)}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-primary font-bold text-2xl">{plan.rate}%</div>
                    <div className="text-gray-500">Return</div>
                  </div>

                  <Link
                    href={`/insurance/plan/${plan.id}?premium=${plan.premium}&term=${plan.term}`}
                    className="block w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashSection>
    </div>
  )
}
