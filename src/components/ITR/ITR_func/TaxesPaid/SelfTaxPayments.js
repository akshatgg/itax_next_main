import { useRouter } from "next/navigation";
import { StoreContext } from "@/store/store-context";
import { useContext } from "react";
import Actions from "@/store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputStyles } from "@/app/styles/InputStyles";
export default function SelfTaxPayments() {
  const [state, dispatch] = useContext(StoreContext);
  const router = useRouter();


  const handleSubmit = (values) => {
    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        taxesPaid: {
          ...state.itr.taxesPaid,
          selfTaxPayments: {
              amountPaid: values.amountPaid,
              dateOfPayment: values.dateOfPayment,
              bsrCodeOfTheBankDeposit: values.bsrCodeOfTheBankDeposit,
              challanSerialNumber: values.challanSerialNumber,
          },
        },
      },
    });
    router.push("/dashboard/itr/itr-filling/taxes-filling");
  };

  const formik = useFormik({
    initialValues: {
      amountPaid: 0,
      dateOfPayment: "",
      bsrCodeOfTheBankDeposit: "",
      challanSerialNumber: "",
    },
    validationSchema: Yup.object({
      amountPaid: Yup.number(),
      dateOfPayment: Yup.string(),
      bsrCodeOfTheBankDeposit: Yup.string(),
      challanSerialNumber: Yup.string(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div 
    // className="mx-auto max-w-4xl px-8 md:px-0 w-full container"
      className={InputStyles.section80Deduction}    >
      <h3 
      // className="border-b font-semibold mb-5"
       className=
       {InputStyles.tdstitle}
      >Taxes Paid</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid sm:grid-cols-2 sm:gap-5 gap-2 gap-y-5">
          <div className="flex flex-col">
            <label htmlFor="amountPaid" className={InputStyles.label}>
              Amount Paid
            </label>
            <input
              type="text"
              name="amountPaid"
              id="amountPaid"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amountPaid}
              className={InputStyles.input}
            />
            {formik.touched.amountPaid && formik.errors.amountPaid ? (
              <div className={InputStyles.error_msg}>{formik.errors.amountPaid}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="dateOfPayment" className={InputStyles.label}>
              Date of Payment
            </label>
            <input
              type="text"
              name="dateOfPayment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfPayment}
              id="dateOfPayment"
              className={InputStyles.input}
            />
            {formik.touched.dateOfPayment && formik.errors.dateOfPayment ? (
              <div className={InputStyles.error_msg}>{formik.errors.dateOfPayment}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="bsrCodeOfTheBankDeposit"
              className={InputStyles.label}
            >
              BSR Code of the bank you deposited with
            </label>
            <input
              type="text"
              name="bsrCodeOfTheBankDeposit"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bsrCodeOfTheBankDeposit}
              id="bsrCodeOfTheBankDeposit"
              className={InputStyles.input}
            />
            {formik.touched.bsrCodeOfTheBankDeposit &&
            formik.errors.bsrCodeOfTheBankDeposit ? (
              <div className={InputStyles.error_msg}>{formik.errors.bsrCodeOfTheBankDeposit}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="challanSerialNumber"
              className={InputStyles.label}
            >
              Challan Serial No
            </label>
            <input
              type="text"
              name="challanSerialNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.challanSerialNumber}
              id="challanSerialNumber"
              className={InputStyles.input}
            />
            {formik.touched.challanSerialNumber &&
            formik.errors.challanSerialNumber ? (
              <div className={InputStyles.error_msg}>{formik.errors.challanSerialNumber}</div>
            ) : null}
          </div>
        </div>
             <div className="flex justify-center items-center mt-4">
        <button
          type="submit"
          // className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
           className={InputStyles.selftaxbutton}
       >
          Save
        </button>
</div>
      </form>
    </div>
  );
}
