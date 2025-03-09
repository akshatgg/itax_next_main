"use client"
import { useForm } from "react-hook-form";
import PartyDetails from "./PartyDetails";
import InvoiceDetails from "./InvoiceDetails";
import ItemsInTheInvoice from "./ItemsInTheInvoice";
import GST from "./GST";
import OtherDetails from "./OtherDetails";
import FinalDetails from "./FinalDetails";
import { useEffect, useState } from "react";
import userAxios from "@/lib/userAxios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditSaleForm({PreviewsInvoiceData}) {
    const router = useRouter();
    const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
        getValues,
		setError,
		clearErrors,
	} = useForm({
        defaultValues: {
            credit: false,
            invoiceNumber: "INV-" + new Date().getTime(),
        }
    });
    const [addedItemsInInvoice, setAddedItemsInInvoice] = useState([]);
    const [party_State, setParty_State] = useState({});
    const totalAmount = addedItemsInInvoice.reduce((accumulator, current) => accumulator + current.amount,  0);
    useEffect(()=>{
        setValue("totalAmount", totalAmount);
    },[setValue,totalAmount])


    const [isLoading_Submit,setIsLoading_Submit]=useState(false);
    const onSubmit = async (formData)=>{
        try {
            setIsLoading_Submit(true);
            const formInvoiceData = {
                invoiceNumber: formData.invoiceNumber,
                gstNumber: formData.partyGstin,
                type: "sales",
                partyId: formData.id,
                totalAmount: parseInt(formData.totalAmount)||0,
                totalGst: 180,
                stateOfSupply: formData.stateOfSupply,
                cgst: parseInt(formData.cgst)|| null,
                sgst: parseInt(formData.sgst)|| null,
                igst: parseInt(formData.igst)|| null,
                utgst: parseInt(formData.utgst)|| null,
                details: formData.details,
                extraDetails: formData.extraDetails,
                invoiceItems: addedItemsInInvoice,
                modeOfPayment: formData.modeOfPayment,// cash || bank || upi || credit
                credit: formData.credit==="true"?true:false,
                status:  modeOfPayment==="cash" || modeOfPayment==="bank" || modeOfPayment==="upi"  || modeOfPayment==="credit" ? "paid" : "unpaid"// paid , unpaid ,overdue
            }
            const resp = await userAxios.post("/invoice/invoices", formInvoiceData);
            console.log(resp);
            if (resp.status === 201) {
                toast.success("Invoice Created");
                router.push(`/dashboard/accounts/invoice/invoice/${resp.data.id}`);
                
            }
            
        } catch (error) {

            toast.success("Error "+ error?.response?.data?.error);
            console.log(error)
        }finally {
            setIsLoading_Submit(false);
        }
    }
    return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid gap-4 grid-cols-1 md:grid-cols-2 p-2"
			>
				{/* <PartyDetails
					register={register}
					setError={setError}
					clearErrors={clearErrors}
					errors={errors}
					setValue={setValue}
					parties={parties}
					getValues={getValues}
                    setParty_State={setParty_State}
				/> */}
				<InvoiceDetails
					register={register}
					setError={setError}
					clearErrors={clearErrors}
					errors={errors}
					setValue={setValue}
				/>
				<GST 
                    register={register}
                    setError={setError}
                    clearErrors={clearErrors}
                    errors={errors}
                    setValue={setValue}
                    party_State={party_State}
                />
				<OtherDetails
                    register={register}
                    errors={errors}
                />
				<ItemsInTheInvoice
                    addedItemsInInvoice={addedItemsInInvoice}
                    setAddedItemsInInvoice={setAddedItemsInInvoice}
                />

                <FinalDetails
                    register={register}
                    errors={errors}
                />

                <div className="flex justify-end md:col-span-2 p-2 rounded-t-md border-2 shadow-blue-600">
                    <button type="submit" className="btn-primary">
                        {isLoading_Submit? "submitting..." : "submit"}
                    </button>
                </div>
			</form>
		</div>
	);
}