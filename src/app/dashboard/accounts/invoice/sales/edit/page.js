import EditSaleForm from "./components/EditSaleForm";
export default function page({searchParams}) {
    const data = {
        invoiceNumber: "INV123",
        gstNumber: "12ABCDE1234F1Z9",
        type: "sales",
        partyId: "5ba1d91d-e207-403c-aca3-7a0c27093533",
        totalAmount: 1000,
        totalGst: 180,
        stateOfSupply: "Some State",
        cgst: 9,
        sgst: 9,
        igst: 0,
        utgst: 0,
        details: "'Some extra details",
        extraDetails: "'Some extra details",
        invoiceItems: [
            {
                itemId:"0981fdae-a893-4795-90e2-512556850481",
                quantity: 2,
                discount: 5
            }
           
        ],
        modeOfPayment: "cash",
        credit: false,
        status: "paid"
    }
    return (
        <div>
            <EditSaleForm PreviewsInvoiceData={data} />
        </div>
    );
}