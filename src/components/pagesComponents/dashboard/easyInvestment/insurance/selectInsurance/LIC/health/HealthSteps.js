"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"

const stepsData = [
  { id: "Step 1", step: 1, name: "Personal Details" },
  { id: "Step 2", step: 2, name: "Insure?" },
  { id: "Step 3", step: 3, name: "Location" },
  { id: "Step 4", step: 4, name: "Medical History" },
]

function Steps({ stepsData, currentStep, handleStep }) {
  return (
    <nav aria-label="Progress">
      <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8 md:px-16">
        {stepsData.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.step <= currentStep ? (
              <div
                onClick={() => handleStep(step.step)}
                className="cursor-pointer group pl-4 py-2 flex flex-col border-l-4 border-primary hover:border-primary/80 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
              >
                <span className="text-xs text-primary font-semibold tracking-wide uppercase group-hover:text-primary/80">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div
                onClick={() => handleStep(step.step)}
                className="cursor-pointer group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
              >
                <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function HealthStep_1({ formData, updateFormData }) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-500/90 mt-4">Personal Details</h1>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        <li className="flex gap-4 mt-4">
          <label className="grid grid-cols-[1fr_auto] cursor-pointer" htmlFor="male">
            <Icon className="text-2xl" icon="mdi:face-male" />
            <div>
              Male
              <input
                className="ml-2"
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={() => updateFormData({ gender: "male" })}
              />
            </div>
          </label>

          <label className="grid grid-cols-[1fr_auto] cursor-pointer" htmlFor="female">
            <Icon className="text-2xl" icon="mdi:face-female" />
            <div>
              Female
              <input
                className="ml-2"
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={() => updateFormData({ gender: "female" })}
              />
            </div>
          </label>
        </li>
        <li className="col-span-2 grid gri-col-1 mt-4">
          <label htmlFor="name" className="capitalize">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </li>
        <li className="sm:col-span-1 col-span-2 grid gri-col-1 mt-4">
          <label htmlFor="email" className="capitalize">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </li>
        <li className="sm:col-span-1 col-span-2 grid gri-col-1 mt-4">
          <label htmlFor="mobile" className="capitalize">
            Mobile
          </label>
          <input
            type="tel"
            name="mobile"
            id="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => updateFormData({ mobile: e.target.value })}
            className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </li>
        <li className="sm:col-span-1 col-span-2 grid gri-col-1 mt-4">
          <label htmlFor="dob" className="capitalize">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={(e) => {
              const birthDate = new Date(e.target.value)
              const today = new Date()
              let age = today.getFullYear() - birthDate.getFullYear()
              const m = today.getMonth() - birthDate.getMonth()
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--
              }
              updateFormData({ dob: e.target.value, age: age })
            }}
            className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </li>
        <li className="sm:col-span-1 col-span-2 grid gri-col-1 mt-4">
          <label htmlFor="age" className="capitalize">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => updateFormData({ age: Number.parseInt(e.target.value) })}
            className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </li>
      </ul>
    </>
  )
}

function HealthStep_2({ formData, updateFormData }) {
  const insuranceFor = [
    { name: "self", label: "Self" },
    { name: "spouse", label: "Spouse" },
    { name: "son", label: "Son" },
    { name: "daughter", label: "Daughter" },
    { name: "father", label: "Father" },
    { name: "mother", label: "Mother" },
  ]

  const handleMemberSelection = (memberName, isSelected, dob = "") => {
    const updatedMembers = { ...formData.members }

    if (isSelected) {
      updatedMembers[memberName] = { dob }
    } else {
      delete updatedMembers[memberName]
    }

    updateFormData({ members: updatedMembers })
  }

  const handleMemberDob = (memberName, dob) => {
    const updatedMembers = { ...formData.members }
    updatedMembers[memberName] = { dob }
    updateFormData({ members: updatedMembers })
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-500/90 mt-4">Who would you like to insure?</h1>
      <ul className="grid grid-cols-2 gap-y-4 gap-x-12 mt-4">
        {insuranceFor.map((member) => (
          <li
            key={member.name}
            className="md:col-span-1 col-span-2 flex items-center p-2.5 mt-4 border border-gray-300 rounded-lg"
          >
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                id={`check-${member.name}`}
                checked={!!formData.members[member.name]}
                onChange={(e) => handleMemberSelection(member.name, e.target.checked)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor={`check-${member.name}`} className="capitalize">
                {member.label}
              </label>
            </div>
            {formData.members[member.name] && (
              <input
                type="date"
                name={`dob-${member.name}`}
                id={`dob-${member.name}`}
                value={formData.members[member.name].dob || ""}
                onChange={(e) => handleMemberDob(member.name, e.target.value)}
                className="cursor-pointer bg-bg_1 text-tx text-sm block"
              />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

function HealthStep_3({ formData, updateFormData }) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-500/90 mt-4">Tell us where you live</h1>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        <li className="md:col-span-1 col-span-2 grid gri-col-1 mt-4">
          <label htmlFor="pinCode" className="capitalize">
            Enter PIN Code
          </label>
          <input
            type="number"
            name="pinCode"
            id="pinCode"
            placeholder="Enter PIN Code"
            value={formData.pinCode}
            onChange={(e) => updateFormData({ pinCode: e.target.value })}
            className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </li>
        <li className="md:col-span-1 col-span-2 grid gri-col-1 mt-4">
          <label htmlFor="cityName" className="capitalize">
            City Name
          </label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            placeholder="City Name"
            value={formData.cityName}
            onChange={(e) => updateFormData({ cityName: e.target.value })}
            className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </li>
      </ul>
    </>
  )
}

function HealthStep_4({ formData, updateFormData }) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-500/90 mt-4">
        Any of the insured member have a medical history?
      </h1>
      <ul className="grid grid-cols-2 gap-4 mt-4">
        <li className="flex gap-4 mt-4">
          <label className="grid grid-cols-[1fr_auto] cursor-pointer" htmlFor="medical-yes">
            <div>
              Yes
              <input
                className="ml-2"
                type="radio"
                id="medical-yes"
                name="medicalHistory"
                value="yes"
                checked={formData.medicalHistory === "yes"}
                onChange={() => updateFormData({ medicalHistory: "yes" })}
              />
            </div>
          </label>

          <label className="grid grid-cols-[1fr_auto] cursor-pointer" htmlFor="medical-no">
            <div>
              No
              <input
                className="ml-2"
                type="radio"
                id="medical-no"
                name="medicalHistory"
                value="no"
                checked={formData.medicalHistory === "no"}
                onChange={() => updateFormData({ medicalHistory: "no" })}
              />
            </div>
          </label>
        </li>

        {formData.medicalHistory === "yes" && (
          <li className="col-span-2 mt-4">
            <label htmlFor="medicalDetails" className="block mb-2">
              Please provide details:
            </label>
            <textarea
              id="medicalDetails"
              name="medicalDetails"
              rows="3"
              value={formData.medicalDetails || ""}
              onChange={(e) => updateFormData({ medicalDetails: e.target.value })}
              placeholder="Please describe any pre-existing conditions or medical history"
              className="bg-bg_1 text-tx border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            ></textarea>
          </li>
        )}
      </ul>
    </>
  )
}

export default function HealthSteps() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    gender: "male",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    age: 35,
    members: { self: { dob: "" } },
    pinCode: "",
    cityName: "",
    medicalHistory: "no",
    medicalDetails: "",
  })

  const handleStep = (step) => {
    setCurrentStep(step)
  }

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Encode form data for URL
    const queryParams = new URLSearchParams()

    // Add basic fields
    queryParams.append("age", formData.age)
    queryParams.append("gender", formData.gender)
    queryParams.append("pinCode", formData.pinCode)
    queryParams.append("medicalHistory", formData.medicalHistory)

    // Calculate premium based on age and other factors
    let suggestedPremium = 5000 // Base premium

    // Age factor
    if (formData.age < 30) {
      suggestedPremium = 5000
    } else if (formData.age < 45) {
      suggestedPremium = 10000
    } else if (formData.age < 60) {
      suggestedPremium = 15000
    } else {
      suggestedPremium = 20000
    }

    // Medical history factor
    if (formData.medicalHistory === "yes") {
      suggestedPremium *= 1.3 // 30% increase for medical history
    }

    // Family members factor
    const memberCount = Object.keys(formData.members).length
    if (memberCount > 1) {
      suggestedPremium *= 1 + (memberCount - 1) * 0.2 // 20% increase per additional member
    }

    // Round to nearest 500
    suggestedPremium = Math.round(suggestedPremium / 500) * 500

    queryParams.append("premium", suggestedPremium)
    queryParams.append("term", 15) // Default term

    // Navigate to plans page with form data
    router.push(`create-insurance/plans?${queryParams.toString()}`)
  }

  const isFormValid = () => {
    if (currentStep === 1) {
      return formData.name && formData.email && formData.mobile && formData.age
    } else if (currentStep === 2) {
      return Object.keys(formData.members).length > 0
    } else if (currentStep === 3) {
      return formData.pinCode && formData.cityName
    } else if (currentStep === 4) {
      return formData.medicalHistory === "no" || (formData.medicalHistory === "yes" && formData.medicalDetails)
    }
    return false
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-8 py-20">
      <form onSubmit={handleSubmit}>
        <Steps stepsData={stepsData} currentStep={currentStep} handleStep={handleStep} />

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          {currentStep === 1 ? (
            <HealthStep_1 formData={formData} updateFormData={updateFormData} />
          ) : currentStep === 2 ? (
            <HealthStep_2 formData={formData} updateFormData={updateFormData} />
          ) : currentStep === 3 ? (
            <HealthStep_3 formData={formData} updateFormData={updateFormData} />
          ) : (
            <HealthStep_4 formData={formData} updateFormData={updateFormData} />
          )}

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`${currentStep === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600"} capitalize rounded-lg px-8 py-2 text-white transition-colors`}
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isFormValid()}
                className={`${isFormValid() ? "bg-primary hover:bg-primary/90" : "bg-primary/40 cursor-not-allowed"} capitalize rounded-lg px-8 py-2 text-white transition-colors`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`${isFormValid() ? "bg-primary hover:bg-primary/90" : "bg-primary/40 cursor-not-allowed"} capitalize rounded-lg px-8 py-2 text-white transition-colors`}
              >
                View Plans
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
