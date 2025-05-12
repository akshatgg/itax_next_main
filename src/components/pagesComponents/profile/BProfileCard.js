import Image from "next/image"
import { Icon } from "@iconify/react"

const BProfileCard = ({ businessProfile }) => {
  const address =
    `${businessProfile?.street ? businessProfile.street + "," : ""} ${businessProfile?.landmark ? businessProfile.landmark + "," : ""} ${businessProfile?.city ? businessProfile.city + "," : ""} ${businessProfile?.dst ? businessProfile.dst + "," : ""} ${businessProfile?.stcd ? businessProfile.stcd + "," : ""}`.trim()

  const profile = {
    businessName: "Name",
    pan: "PAN card",
    taxpayer_type: "Tax Payer Type",
    status: "Status",
    ctb: "CTB",
    gstin: "GST number",
  }

  return (
    <div className="mx-4 bg-white shadow-md border rounded-lg text-gray-900 hover:shadow-lg transition-shadow duration-300">
      <div className="rounded-t-lg h-36 overflow-hidden">
        <Image
          className="w-full object-cover"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Business Profile Cover"
          width={400}
          height={300}
          priority
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden shadow-md">
        {businessProfile?.user?.avatar ? (
          <Image
            className="w-full h-full object-cover"
            src={businessProfile?.user?.avatar || "/placeholder.svg"}
            alt="User Profile"
            width={128}
            height={128}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-50">
            <Icon className="text-6xl text-neutral-950" icon="mdi:user" />
          </div>
        )}
      </div>
      <div className="text-center mt-2 px-4">
        <h2 className="font-semibold text-lg">{businessProfile?.businessName || "No Business Name"}</h2>
      </div>

      <div className="p-4 border-t mt-2">
        <div className="grid grid-cols-3 gap-4 my-2">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key} className="flex flex-col pb-3">
              <dt className="mb-1 capitalize text-gray-500 md:text-xs dark:text-gray-400">{value}</dt>
              <dd className="text-xs font-semibold">
                <p>{businessProfile[key] || "-"}</p>
              </dd>
            </div>
          ))}
          <div className="flex flex-col pb-3 col-span-3">
            <dt className="mb-1 capitalize text-gray-500 md:text-xs dark:text-gray-400">Address:</dt>
            <dd className="text-xs font-semibold">
              <p className="capitalize">{address || "No address provided"}</p>
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BProfileCard
