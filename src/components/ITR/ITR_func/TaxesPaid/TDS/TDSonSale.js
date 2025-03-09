import { StoreContext } from "@/store/store-context";
import { useContext } from "react";
import Actions from "@/store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TDSonSale({ setSection }) {
  const [state, dispatch] = useContext(StoreContext);

  const handleSubmit = (values) => {
    dispatch({
      type: actions.ITR,
      payload: {
        ...state.itr,
        taxesPaid: {
          ...state.itr.taxesPaid,
          tds: {
            ...state.itr.taxesPaid.tds,
            taxDeductedAtSourceForSaleOrRentOfImmovableProperty: {
              panOfBuyerOrTenant: values.panOfBuyerOrTenant,
              nameOfPropertyBuyerOrTenant: values.nameOfPropertyBuyerOrTenant,
              totalTaxDeducted: values.totalTaxDeducted,
              taxDeductedClaimedForThisYear:
                values.taxDeductedClaimedForThisYear,
              incomeAgainstTDSDeducted: values.incomeAgainstTDSDeducted,
              incomeAgainstTDSDeducted_2: values.incomeAgainstTDSDeducted_2,
              financialYearInWhichTDSDeducted:
                values.financialYearInWhichTDSDeducted,
            },
          },
        },
      },
    });
    setSection("");
  };

  const formik = useFormik({
    initialValues: {
      panOfBuyerOrTenant: "",
      nameOfPropertyBuyerOrTenant: "",
      totalTaxDeducted: "",
      taxDeductedClaimedForThisYear: "",
      incomeAgainstTDSDeducted: "",
      incomeAgainstTDSDeducted_2: "",
      financialYearInWhichTDSDeducted: "",
    },
    validationSchema: Yup.object({
      panOfBuyerOrTenant: Yup.string(),
      nameOfPropertyBuyerOrTenant: Yup.string(),
      totalTaxDeducted: Yup.string(),
      taxDeductedClaimedForThisYear: Yup.string(),
      incomeAgainstTDSDeducted: Yup.string(),
      incomeAgainstTDSDeducted_2: Yup.string(),
      financialYearInWhichTDSDeducted: Yup.string(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="mx-auto max-w-4xl w-full px-4">
      <h3 className="border-b font-semibold mb-5">
        Tax Deducted At Source for Sale/Rent of Immovable Property
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="panOfBuyerOrTenant" className="text-sm font-medium">
              PAN of Property Buyer / Tenant
            </label>
            <input
              type="text"
              name="panOfBuyerOrTenant"
              id="panOfBuyerOrTenant"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.panOfBuyerOrTenant}
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.panOfBuyerOrTenant &&
            formik.errors.panOfBuyerOrTenant ? (
              <div>{formik.errors.panOfBuyerOrTenant}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="nameOfPropertyBuyerOrTenant"
              className="text-sm font-medium"
            >
              Name of the Property Buyer / Tenant
            </label>
            <input
              type="text"
              name="nameOfPropertyBuyerOrTenant"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameOfPropertyBuyerOrTenant}
              id="nameOfPropertyBuyerOrTenant"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.nameOfPropertyBuyerOrTenant &&
            formik.errors.nameOfPropertyBuyerOrTenant ? (
              <div>{formik.errors.nameOfPropertyBuyerOrTenant}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="totalTaxDeducted" className="text-sm font-medium">
              Total Tax Deducted
            </label>
            <input
              type="text"
              name="totalTaxDeducted"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.totalTaxDeducted}
              id="totalTaxDeducted"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.totalTaxDeducted &&
            formik.errors.totalTaxDeducted ? (
              <div>{formik.errors.totalTaxDeducted}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="taxDeductedClaimedForThisYear"
              className="text-sm font-medium"
            >
              Tax Deducted claimed for this year
            </label>
            <input
              type="text"
              name="taxDeductedClaimedForThisYear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taxDeductedClaimedForThisYear}
              id="taxDeductedClaimedForThisYear"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.taxDeductedClaimedForThisYear &&
            formik.errors.taxDeductedClaimedForThisYear ? (
              <div>{formik.errors.taxDeductedClaimedForThisYear}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="incomeAgainstTDSDeducted"
              className="text-sm font-medium"
            >
              Income against which TDS was deducted
            </label>
            <input
              type="text"
              name="incomeAgainstTDSDeducted"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.incomeAgainstTDSDeducted}
              id="incomeAgainstTDSDeducted"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.incomeAgainstTDSDeducted &&
            formik.errors.incomeAgainstTDSDeducted ? (
              <div>{formik.errors.incomeAgainstTDSDeducted}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="incomeAgainstTDSDeducted_2"
              className="text-sm font-medium"
            >
              Income against which TDS was deducted
            </label>
            <select
              id="incomeAgainstTDSDeducted_2"
              name="incomeAgainstTDSDeducted_2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.incomeAgainstTDSDeducted_2}
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            >
              <option value="OtherSources">Capital Gain</option>
              <option value="HouseProperty">House Property</option>
            </select>
            {formik.touched.incomeAgainstTDSDeducted_2 &&
            formik.errors.incomeAgainstTDSDeducted_2 ? (
              <div>{formik.errors.incomeAgainstTDSDeducted_2}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="financialYearInWhichTDSDeducted"
              className="text-sm font-medium"
            >
              Financial Year in which TDS was deducted
            </label>
            <select
              id="financialYearInWhichTDSDeducted"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.financialYearInWhichTDSDeducted}
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            >
              <option selected="selected" value="2019">
                2019-2020
              </option>
              <option value="2018">2018-2019</option>
              <option value="2017">2017-2018</option>
              <option value="2016">2016-2017</option>
              <option value="2015">2015-2016</option>
            </select>
            {formik.touched.financialYearInWhichTDSDeducted &&
            formik.errors.financialYearInWhichTDSDeducted ? (
              <div>{formik.errors.financialYearInWhichTDSDeducted}</div>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
        >
          Save
        </button>
      </form>
    </div>
  );
}
