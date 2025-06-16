"use client"
import { Icon } from "@iconify/react";
import GridItem from "@/components/pagesComponents/grid/GridItem";

export default function CardOverview({ invoices = [], className }) {
    const total = invoices.length;
    const sales = invoices.filter(inv => inv.type === "sales").length;
    const purchases = invoices.filter(inv => inv.type === "purchase").length;

    const dashboardData = [
        {
            title: "Invoices",
            overview: `${total}`,
            time: `${sales} sales / ${purchases} purchases`,
            iconName: "material-symbols:account-circle-outline",
            cssClass: "p-3 mr-4 text-purple-500 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-500",
            linkTo: "",
        }
    ];

    return (
        <div className={`${className} container 2xl:max-w-7xl mx-auto mt-4 p-4`}>
            <ul className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
                {dashboardData.map((el, key) => (
                    <GridItem key={key} href={`/dashboard/accounts/invoice/${el.linkTo}`}>
                        <div>
                            <Icon icon={el.iconName} className={`rounded-xl sm:h-16 sm:w-16 sm:p-3 h-14 w-14 p-3 ${el.cssClass}`} />
                        </div>
                        <div>
                            <div className="flex flex-wrap justify-between">
                                <span>{el.title}</span>
                                <span>{el.overview}</span>
                            </div>
                            <p className="font-normal text-txt/70">{el.time}</p>
                        </div>
                    </GridItem>
                ))}
            </ul>
        </div>
    );
}
