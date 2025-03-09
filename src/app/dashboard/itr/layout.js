"use client"
import { useContext, useState } from "react";
import Link from "next/link";
import {useRouter, usePathname } from "next/navigation";

import Actions from "@/store/actions";
import { StoreContext } from "@/store/store-context";
import { Icon } from "@iconify/react";
const menu = [
    {
      link: "/dashboard/itr/itr-filling/upload-form-16",
      label: "Import Form 16",
    },
    {
      link: "/dashboard/itr/itr-filling/personal-info",
      label: "Personal Information",
    },
    {
      link: "/dashboard/itr/itr-filling/form-16",
      label: "Form 16",
    },
    {
      link: "/dashboard/itr/itr-filling/income-sources",
      label: "Income Sources",
    },
    {
      link: "/dashboard/itr/itr-filling/deductions",
      label: "Deductions",
    },
    {
      link: "/dashboard/itr/itr-filling/tax-payable",
      label: "Tax Payable",
    },
    {
      link: "/dashboard/itr/itr-filling/taxes-paid",
      label: "Taxes Paid",
    },
    {
      link: "/dashboard/itr/itr-filling/taxes-filling",
      label: "Taxes Filing",
    },
];
function ItrNavbar() {
    const [state, dispatch] = useContext(StoreContext);
    const router = useRouter();
    let pathnames = usePathname();

    const form_type = state.itr_type.form_type;

    const handleFormChange = async (value) => {
        dispatch({
        type: Actions.ITR_TYPE,
        payload: {
            form_type: value,
        },
        });
        value === "without-form-16"
        ? router.push(menu[1].link)
        : router.push(menu[0].link);
    };

    // const handleToggle = () => {
    //     setIsDrawerOpen(!isDrawerOpen);
    //     return;
    // };
    // console.log(state)
    return (
        <div className="mt-4 px-2 mx-auto max-w-7xl space-y-2">
            <div className="max-w-max min-w-max">
                <select
                    onChange={(e) => handleFormChange(e.target.value)}
                    className="select"
                    name="itr1"
                    value={form_type}
                    id="itr1"
                >
                    <option value="without-form-16">Without Form 16</option>
                    <option value="form-16">Form 16</option>
                </select>
            </div>
            <ul className="grid gap-x-2 gap-y-4 justify-center grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] mx-auto">
                {menu.map((items) => (
                <li key={items.label} className={`
                    
                    ${ form_type === "form-16" && items.label === "Income Sources" ? "hidden" : "" } 
                    ${ form_type === "without-form-16" && items.label === "Form 16" ? "hidden": ""} 
                    ${ form_type === "without-form-16" &&items.label === "Import Form 16"? "hidden": ""} 
                    `}>
                    <Link
                        href={items.link}
                        className={`
                            p-2 font-normal w-full flex justify-between items-center min-w-max shadow-md
                            ${ pathnames === items.link ? "border-t-4 border-t-blue-500" : "border-t-zinc-100 border-t-4 hover:border-t-zinc-200 " }
                        `}
                    >
                        {items.label}
                        {items.label==="Taxes Filing" ?
                            <Icon
                            className={`
                                text-2xl
                                ${ pathnames === items.link ? "text-blue-500" : "" }
                            `}
                            icon="iconoir:submit-document"
                            />
                            :<Icon
                            className={`
                                text-2xl
                                ${ pathnames === items.link ? "text-blue-500" : "" }
                            `}
                            icon="mdi:keyboard-arrow-right"
                            />
                        }
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default function ItrLayout({ children }) {
    return (
        <div className="max-w-7xl mx-auto">
            <ItrNavbar/>
            <section className="w-full py-10">
                {children}
            </section>
        </div>
    );
}
