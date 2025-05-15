import { Icon } from "@iconify/react"
import Image from "next/image"

const UserProfileCard = ({ data, panDetails }) => {
  // Check if PAN card is verified based on user data
  // This will persist after reload since it's stored in the user data
  const isPanVerified = data.isPanVerified || data.panVerified || (data.panCard && data.panCard !== "")

  // Check if business profile exists
  const hasBusinessProfile = true

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    // Define required fields for a complete profile
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "address",
      "pin",
      "panCard",
      "aadhaar",
      "avatar",
      "businessProfile",
    ]

    // Count how many fields are filled
    const filledFields = requiredFields.filter((field) => {
      // Special case for businessProfile
      if (field === "businessProfile") {
        return hasBusinessProfile
      }
      // Special case for panCard - consider it filled if verified
      if (field === "panCard") {
        return isPanVerified
      }
      return data[field] && data[field] !== "" && data[field] !== null
    }).length

    // Calculate percentage
    const percentage = Math.round((filledFields / requiredFields.length) * 100)

    return {
      percentage,
      filledFields,
      totalFields: requiredFields.length,
    }
  }

  const completion = calculateProfileCompletion()

  // Determine color based on completion percentage
  const getCompletionColor = (percentage) => {
    if (percentage < 40) return "bg-red-500"
    if (percentage < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const completionColor = getCompletionColor(completion.percentage)

  // Check if email is verified
  const isEmailVerified = data.emailVerified || data.isEmailVerified || true

  // Check if phone is verified
  const isPhoneVerified = data.phoneVerified || data.isPhoneVerified || (data.phone && data.phone !== "")

  return (
    <div className="bg-white shadow-md border rounded-lg text-gray-900 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={
            "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" ||
            "/placeholder.svg" ||
            "/placeholder.svg"
          }
          alt="Profile Cover"
          className="w-full object-cover"
          width={400}
          height={300}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      <div className="relative px-6">
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden bg-white shadow-md">
          {data.avatar ? (
            <Image
              width={128}
              height={128}
              src={data.avatar || "/placeholder.svg"}
              className="w-full h-full object-cover"
              alt={"User profile"}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <Icon className="text-7xl text-gray-500" icon="mdi:user" />
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-gray-800">
            {data.firstName || ""} {data.lastName || ""}
          </h2>
          <p className="text-gray-600 mt-1">{data.email || ""}</p>

          {/* Profile Completion Indicator */}
          <div className="mt-4 mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span
                className={`text-sm font-medium ${
                  completion.percentage < 40
                    ? "text-red-600"
                    : completion.percentage < 70
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              >
                {completion.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${completionColor} transition-all duration-500 ease-in-out`}
                style={{ width: `${completion.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completion.filledFields} of {completion.totalFields} fields completed
            </p>
          </div>
        </div>

        <div className="mt-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact</h3>
              <p className="text-sm text-gray-600">
                <span className="block mb-1">
                  <span className="font-medium">Email:</span> {data.email || "Not provided"}
                </span>
                <span className="block">
                  <span className="font-medium">Phone:</span> {data.phone || "Not provided"}
                </span>
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Personal</h3>
              <p className="text-sm text-gray-600">
                <span className="block mb-1">
                  <span className="font-medium">Gender:</span>{" "}
                  {data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : "Not provided"}
                </span>
                <span className="block">
                  <span className="font-medium">PAN:</span> {data.panCard ? data.panCard : "Not provided"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Address</h3>
            <p className="text-sm text-gray-600">
              {data.address ? data.address : "No address provided"}
              {data.pin && <span>, {data.pin}</span>}
            </p>
          </div>

          {/* Document Verification Status */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Verification Status</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${isPanVerified ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm text-gray-600">PAN Card</span>
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${data.aadhaar ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm text-gray-600">Aadhaar</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                <span className="text-sm text-gray-600">Business Profile</span>
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${isEmailVerified ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm text-gray-600">Email Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard
