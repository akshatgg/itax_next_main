"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { InputStyles } from "@/app/styles/InputStyles";

const insuranceTypeData = [
  {
    access: ["superAdmin"],
    upcoming: false,
    title: "general insurance",
    overview:
   "Covers a variety of assets and liabilities including health, vehicles, and property.",
    image: "mdi:hand-heart-outline",
    linkTo:"general-insurance",
    glow: "from-sky-200 via-blue-100 to-blue-50",
    border: "border-blue-300",
    shadow: "shadow-[0_0_25px_rgba(100,180,255,0.3)]",
    iconColor: "text-sky-500",
  },
  {
    access: ["superAdmin"],
    upcoming: false,
    title: "life insurance",
    overview:
      "Provides financial protection to your family in the event of your demise.",
    image: "material-symbols:ecg-heart-sharp",
    linkTo:"life-insurance",
    glow: "from-indigo-200 via-blue-100 to-sky-50",
    border: "border-indigo-300",
    shadow: "shadow-[0_0_25px_rgba(130,140,255,0.25)]",
    iconColor: "text-indigo-400",
  },
  
];

export default function SelectInsuranceType() {
  return (
    <div className={InputStyles.insuranceWrapper} >
      <div className={InputStyles.insuranceGrid} >
        {insuranceTypeData.map((item, index) => (
          <Link
            // key={index}
            href={item.upcoming ? "" : `insurance/${item.linkTo}`}
            className={`relative rounded-xl border ${item.border} ${item.shadow} bg-gradient-to-br ${item.glow} p-[2px] transform hover:scale-105 transition-all duration-300 group`}
          >
            <div 
            className={InputStyles.insurancecontainer}
            >
              <div>
                <div className={`text-4xl mb-4 ${item.iconColor}`}>
                  <Icon icon={item.image} />
                </div>

                <h3 className={InputStyles.insurancetitle}
                // className="text-2xl font-bold mb-3 capitalize"
                >
                  {item.title}
                </h3>
            <p className={InputStyles.insurancedescription}
             >
                  {item.overview}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
