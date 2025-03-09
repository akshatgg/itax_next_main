"use client"
import RecordNotFound from "@/components/recordNotFound/RecordNotFound";
import { Icon } from "@iconify/react";
function Options() {
    return (
        <div className="shadow-inner shadow-neutral-500/50 rounded-md p-1 grid justify-center gap-2 grid-cols-2 bg-gray-200">
            <button
                className={`rounded-md bg-neutral-50/50 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 border-2 py-0.5 px-1 font-medium text-xs sm:text-sm flex gap-2 items-center`}
                type="button"
            >   
                <Icon icon="material-symbols:search"/>
            </button>
            <button
                className={`rounded-md bg-neutral-50/50 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 border-2 py-0.5 px-1 font-medium text-xs sm:text-sm flex gap-2 items-center`}
                type="button"
            >   
                <Icon icon="mdi:filter-outline"/>
            </button>
        </div>
    );
}
export default function Page() {
    return (
        <main className="bg-neutral-50 p-4 min-h-screen">
            <div className=" max-w-7xl w-[calc(100%-2rem)] mx-auto flex gap-2 items-center flex-wrap justify-end">
                <Options />
            </div>
            <div className="grid justify-end p-2">
                <button className="btn-primary flex items-center gap-2">
                    <Icon className="text-2xl" icon="basil:add-solid"/>
                    Add
                </button>
            </div>
            <RecordNotFound className="mt-4">
                <div className="grid place-content-center p-2">
                    <button className="btn-primary flex items-center gap-2">
                        <Icon className="text-2xl" icon="basil:add-solid"/>
                        Add
                    </button>
                </div>
            </RecordNotFound>
        </main>
    )
}
