"use client"
import gstStateCodes from "@/utils/gstStateCodes"
import { useState } from "react"

function ToUnregisteredPerson(props) {
    const {currentTab,handleToggleTabs} = props

    return (
        <li className={`grid gap-2 ${currentTab===1?"grid-rows-[auto,1fr]":"grid-rows-[auto,0fr]"} transition-[grid-template-rows] border border-blue-300`}>
            <div className=" underline cursor-pointer border-2 bg-blue-500 text-white p-2 flex justify-between font-medium" onClick={()=>handleToggleTabs(1)}>
                Supply made to Unregistered Person
                <div className="text-2xl inline">+</div>
            </div>
            <div className="overflow-hidden">
                <ul className="grid grid-cols-[1fr,2fr,2fr,2fr] p-2">
                    <li className="grid grid-cols-1">
                    </li>
                    <li className="grid grid-cols-1">Place of Supply (state/UT)</li>
                    <li className="grid grid-cols-1">Total Taxable Value (&#8377;)</li>
                    <li className="grid grid-cols-1">Amount of Integrated Tax (&#8377;)</li>
                </ul>

                <ul className="grid gap-2 grid-cols-[1fr,2fr,2fr,2fr] p-2">
                    <li className="grid grid-cols-1">
                    </li>
                    <li className="grid grid-cols-1">
                        <select className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500">
                            <option>--Select--</option>
                            {gstStateCodes.map(state=>(
                            <option key={state.state}>
                                {state.code}-{state.state}
                            </option>
                            ))}
                        </select>
                    </li>
                    <li className="grid grid-cols-1">
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                    <li className="grid grid-cols-1">
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                </ul>

                <div className="flex gap-2 justify-end">
                    <div className=" cursor-not-allowed opacity-50">
                        <button disabled={true} className="btn-primary">ADD</button>
                    </div>
                    <div className=" cursor-not-allowed opacity-50">
                        <button disabled={true} className="btn-danger">REMOVE</button>
                    </div>
                </div>
            </div>
        </li>
    )
}
function ToCompositionTaxablePerson(props) {
    const {currentTab,handleToggleTabs} = props
    return (
        <li className={`grid gap-2 ${currentTab===2?"grid-rows-[auto,1fr]":"grid-rows-[auto,0fr]"} transition-[grid-template-rows] border border-blue-300`}>
            <div className=" underline cursor-pointer border-2 bg-blue-500 text-white p-2 flex justify-between font-medium" onClick={()=>handleToggleTabs(2)}>
                Supply made to Composition Taxable Person
                <div className="text-2xl inline">+</div>
            </div>
            <div className="overflow-hidden">
                <ul className="grid grid-cols-[1fr,2fr,2fr,2fr] p-2">
                    <li className="grid grid-cols-1">
                    </li>
                    <li className="grid grid-cols-1">Place of Supply (state/UT)</li>
                    <li className="grid grid-cols-1">Total Taxable Value (&#8377;)</li>
                    <li className="grid grid-cols-1">Amount of Integrated Tax (&#8377;)</li>
                </ul>

                <ul className="grid gap-2 grid-cols-[1fr,2fr,2fr,2fr] p-2">
                    <li className="grid grid-cols-1">
                    </li>
                    <li className="grid grid-cols-1">
                        <select className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500">
                            <option>--Select--</option>
                            {gstStateCodes.map(state=>(
                            <option key={state.state}>
                                {state.code}-{state.state}
                            </option>
                            ))}
                        </select>
                    </li>
                    <li className="grid grid-cols-1">
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                    <li className="grid grid-cols-1">
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                </ul>

                <div className="flex gap-2 justify-end">
                    <div className=" cursor-not-allowed opacity-50">
                        <button disabled={true} className="btn-primary">ADD</button>
                    </div>
                    <div className=" cursor-not-allowed opacity-50">
                        <button disabled={true} className="btn-danger">REMOVE</button>
                    </div>
                </div>
            </div>
        </li>
    )
}
function ToUINHolder(props) {
    const {currentTab,handleToggleTabs} = props

    return (
        <li className={`grid gap-2 ${currentTab===3?"grid-rows-[auto,1fr]":"grid-rows-[auto,0fr]"} transition-[grid-template-rows] border border-blue-300`}>
            <div className=" underline cursor-pointer border-2 bg-blue-500 text-white p-2 flex justify-between font-medium" onClick={()=>handleToggleTabs(3)}>
                Supply made to UIN holder
                <div className="text-2xl inline">+</div>
            </div>
            <div className="overflow-hidden">
                <ul className="grid grid-cols-[1fr,2fr,2fr,2fr] p-2">
                    <li className="grid grid-cols-1">
                    </li>
                    <li className="grid grid-cols-1">Place of Supply (state/UT)</li>
                    <li className="grid grid-cols-1">Total Taxable Value (&#8377;)</li>
                    <li className="grid grid-cols-1">Amount of Integrated Tax (&#8377;)</li>
                </ul>

                <ul className="grid gap-2 grid-cols-[1fr,2fr,2fr,2fr] p-2">
                    <li className="grid grid-cols-1">
                    </li>
                    <li className="grid grid-cols-1">
                        <select className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500">
                            <option>--Select--</option>
                            {gstStateCodes.map(state=>(
                            <option key={state.state}>
                                {state.code}-{state.state}
                            </option>
                            ))}
                        </select>
                    </li>
                    <li className="grid grid-cols-1">
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                    <li className="grid grid-cols-1">
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                </ul>

                <div className="flex gap-2 justify-end">
                    <div className=" cursor-not-allowed opacity-50">
                        <button disabled={true} className="btn-primary">ADD</button>
                    </div>
                    <div className=" cursor-not-allowed opacity-50">
                        <button disabled={true} className="btn-danger">REMOVE</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default function Page() {
    const [currentTab,setCurrentTab] = useState(0);
    const handleToggleTabs = (tab)=>{
        if (tab===currentTab) {
            setCurrentTab(0)
            return
        }
        setCurrentTab(tab)
    }
    return (
        <div className="max-w-7xl mx-auto mb-4 p-2">
            <p className="bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">
                3.2 of the supplier shown in 3.1(a) and (3.1.1)(i),details of inter state supplies made to Unregistered Person, Composition Taxable Persons and UIN holder
            </p>
            <div className=" space-y-2 my-4">
                <ToUnregisteredPerson currentTab={currentTab} handleToggleTabs={handleToggleTabs}/>
                <ToCompositionTaxablePerson currentTab={currentTab} handleToggleTabs={handleToggleTabs}/>
                <ToUINHolder currentTab={currentTab} handleToggleTabs={handleToggleTabs}/>
            </div>
            <div className="flex gap-2 justify-end">
                <div>
                    <button className="btn-primary">CANCEL</button>
                </div>
                <div>
                    {"isFilled"==="isFilled"?
                    <button className="btn-secondary">CONFIRM</button>
                    :
                    <button className="btn-primary">CONFIRM</button>
                    }
                </div>
            </div>
        </div>
    )
}
