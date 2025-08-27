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
  <div className="relative w-fit">
  <select
    onChange={(e) => handleFormChange(e.target.value)}
    name="itr1"
    value={form_type}
    id="itr1"
    className="appearance-none px-5 py-2.5 pr-10 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-medium rounded-lg border border-blue-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition duration-300 ease-in-out hover:shadow-md cursor-pointer"
  >
    <option value="without-form-16" className="text-gray-800 font-medium">
      🚫 Without Form 16
    </option>
    <option value="form-16" className="text-gray-800 font-medium">
      📄 Form 16
    </option>
  </select>

  {/* Down arrow icon */}
  <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-blue-500">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

<div className="w-full px-4 py-3 overflow-x-auto sm:overflow-x-visible scrollbar-thin sm:scrollbar-none scrollbar-thumb-blue-300 scrollbar-track-blue-50">
  <ul className="flex flex-nowrap sm:flex-wrap items-stretch gap-2 sm:gap-3">
    {menu.map((items) => {
      const isActive = pathnames === items.link;
      const isHidden =
        (form_type === "form-16" && items.label === "Income Sources") ||
        (form_type === "without-form-16" &&
          (items.label === "Form 16" || items.label === "Import Form 16"));

      if (isHidden) return null;

      return (
        <li
          key={items.label}
          className="flex-shrink-0 sm:flex-shrink sm:flex-grow shadow-md rounded-lg"
        >
          <Link
            href={items.link}
            className={`flex items-center justify-between gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg border-t-4 transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "border-t-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-semibold"
                  : "border-t-zinc-200 hover:border-t-blue-400 hover:bg-blue-50 text-zinc-700"
              }`}
          >
            <span className="text-sm sm:text-base whitespace-nowrap">{items.label}</span>
            <Icon
              className={`text-lg sm:text-xl transition-colors duration-300 ${
                isActive ? "text-blue-600" : "text-zinc-400"
              }`}
              icon={
                items.label === "Taxes Filing"
                  ? "iconoir:submit-document"
                  : "mdi:keyboard-arrow-right"
              }
            />
          </Link>
        </li>
      );
    })}
  </ul>
</div>
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
