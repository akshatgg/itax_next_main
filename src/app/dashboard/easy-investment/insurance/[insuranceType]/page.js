import SelectInsurance from "@/components/pagesComponents/dashboard/easyInvestment/insurance/selectInsurance/SelectInsurance";

export default function insuranceType({params}) {
    const {insuranceType} = params
    if (insuranceType === "general-insurance" || insuranceType === "life-insurance") {
        return (
            <SelectInsurance insuranceType={insuranceType}/>
        )
    }
    return (
        <h1>{insuranceType} NOT found</h1>
    )
}
