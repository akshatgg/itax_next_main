"use client"
import RecordNotFound from "@/components/recordNotFound/RecordNotFound";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react"


function Pills(props) {
    const {PillsData,currentPill,handleCurrentPill} = props
    return (
        <div className="shadow-inner shadow-neutral-500/50 rounded-md p-1 grid justify-center gap-2 grid-cols-2 bg-gray-200">
            {PillsData?.map((item,i) => (
                <button
                    key={item?.title+i}
                    onClick={() => handleCurrentPill(i)}
                    className={`rounded-md ${currentPill===i ? "border-blue-600 text-blue-600 bg-blue-50/50" : " bg-neutral-50/50"} border-2 py-0.5 px-1 font-medium text-xs sm:text-sm flex gap-2 items-center`}
                    type="button"
                >   
                    <Icon icon={item.iconName}/>
                    {item?.title}
                </button>
            ))}
        </div>
    );
}
function PreviewEdit(props) {
    const {TabsData,currentTab,handleCurrentTab} = props
    return (
        <div className=" shadow-inner shadow-neutral-500/50 rounded-md p-1 grid gap-2 grid-cols-2 bg-gray-200">
            {TabsData?.map((item,i) => (
                <button
                    key={item?.title+i}
                    onClick={() => handleCurrentTab(i)}
                    className={`rounded-md ${currentTab===i ? "bg-blue-500 text-white" : " bg-neutral-50/50"} grid place-content-center py-0.5 px-1 font-medium text-xs sm:text-sm`}
                    type="button"
                >
                    {item?.title}
                </button>
            ))}
        </div>
    );
}
const PillsData = [
    {
        title:"Customer",
        iconName:"teenyicons:user-circle-solid",
    },
    {
        title:"Supplier",
        iconName:"mdi:user-lock",
    },
]
const TabsData = [
    {
        title:"edit",
    },
    {
        title:"Preview",
    },
]
export default function Page() {
    const [currentTab,setCurrentTab] = useState(0)
    const [currentPill,setCurrentPill] = useState(0)
    const handleCurrentTab=(tab)=>{
        return setCurrentTab(tab)
    }
    const handleCurrentPill=(tab)=>{
        return setCurrentPill(tab)
    }
    return (
        <main className="bg-neutral-50 p-4 min-h-screen">
            <div className=" max-w-7xl w-[calc(100%-2rem)] mx-auto flex gap-2 items-center flex-wrap justify-between">
                <Pills PillsData={PillsData} currentPill={currentPill}  handleCurrentPill={handleCurrentPill} />
                <PreviewEdit TabsData={TabsData} currentTab={currentTab}  handleCurrentTab={handleCurrentTab} />
            </div>
            <div className="grid justify-end p-2">
                <button className="btn-primary flex items-center gap-2">
                    <Icon className="text-2xl" icon="basil:add-solid"/>
                    Add
                </button>
            </div>
            <RecordNotFound className="mt-4">
                <div className="grid place-content-center p-2">
                    <Link href="customer-suppler/create" className="btn-primary flex items-center gap-2">
                        <Icon className="text-2xl" icon="basil:add-solid"/>
                        Add
                    </Link>
                </div>
            </RecordNotFound>
        </main>
    )
}
