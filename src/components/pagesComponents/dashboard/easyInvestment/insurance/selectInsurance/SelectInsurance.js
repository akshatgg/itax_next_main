"use client"
import { InputStyles } from "@/app/styles/InputStyles";
import Image from "next/image";
import Link from "next/link";

const insuranceTypeData = {
    ["life-insurance"]: [
        {
            access: ["superAdmin"],
            upcoming: false,
            title: "L. I. C.",
            overview: "Life Insurance Corporation of India is an Indian multinational public sector life insurance company..",
            image: "/icons/lic_logo.png",
            linkTo: "lic",
            iconName: "material-symbols:dashboard",
        },
        {
            access: ["superAdmin"],
            upcoming: false,
            title: "Star Health",
            overview: "Star Health Insurance offers flexible insurance policies for securing you and your loved ones...",
            image: "/icons/starHealth.png",
            linkTo: "star-health",
            iconName: "material-symbols:dashboard",
        },
    ],
    ["general-insurance"]: [
        {
            access: ["superAdmin"],
            upcoming: false,
            title: "BAJAJ CAPITAL",
            overview: "Bajaj Capital with over 59 years of experience is your one-stop solution for Mutual Funds your one-stop solution for Mutual Funds...",
            image: "/icons/bajaj_capital-logo.png",
            linkTo: "bajaj-capital",
            iconName: "material-symbols:dashboard",
        },
    ],
};

export default function SelectInsurance({ insuranceType }) {
    return (
        <section className={InputStyles.insuranceWrapper}
        >
            <div className="container 2xl:max-w-7xl mx-auto px-6">
                <div
                    className={InputStyles.insuranceGrid}                 >
                    {insuranceTypeData[insuranceType].map((item, index) => (
                        <Link href={item.upcoming ? "" : `general-insurance/${item.linkTo}`} key={index}
                            className={`group relative transition-transform duration-300 ${item.upcoming ? "cursor-default opacity-70" : "hover:scale-[1.03]"
                                }`}>

                            <div
                                className="h-[380px] flex flex-col bg-white/30 border border-blue-400 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-blue-500/70 relative overflow-hidden"
                            >

                                {item.upcoming && (
                                    <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                                        Coming Soon
                                    </span>
                                )}

                                {/* Top-left image */}
                                <div className="flex items-start justify-start px-5 pt-5">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={70}
                                        height={70}
                                        className="object-contain rounded-md"
                                    />
                                </div>

                                {/* Title + Overview (together) */}
                                <div className="px-5 pt-3">
                                    <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-900 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                                        {item.overview}
                                    </p>
                                </div>

                                {/* Spacer at bottom to maintain height */}
                                <div className="flex-grow" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
