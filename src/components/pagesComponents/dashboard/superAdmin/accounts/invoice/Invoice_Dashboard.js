"use client"

import dynamic from "next/dynamic"
import { H4 } from "@/components/pagesComponents/pageLayout/Headings"
import Link from "next/link"

const GridContainer = dynamic(() => import("@/components/pagesComponents/grid/GridContainer"), { ssr: false })
const Icon = dynamic(() => import("@iconify/react").then(m => m.Icon), { ssr: false })

const dashboardData = [
    { linkTo: "all-users", title: "All Users", icon: "mdi:users" },
    { linkTo: "active-users", title: "Active Users", icon: "mdi:account-check" },
    { linkTo: "non-active-users", title: "Non Active Users", icon: "mingcute:user-x-fill" },
]

export default function InvoiceDashboard() {
    return (
        <div className="container 2xl:max-w-7xl mx-auto mt-12 p-4">
            <H4>Invoice</H4>
            <GridContainer className="capitalize">
                {dashboardData.map(({ linkTo, title, icon }) => (
                    <li key={linkTo} className="list-none">
                        <Link
                            href={`/dashboard/invoice/${linkTo}`}
                            className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl p-4 shadow-sm shadow-primary/20 hover:shadow-primary/90 transition duration-200"
                        >
                            <span className="text-txt/90 text-lg sm:text-xl">{title}</span>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-primary">
                                <Icon icon={icon} className="text-2xl" />
                            </span>
                        </Link>
                    </li>
                ))}
            </GridContainer>
        </div>
    )
}
