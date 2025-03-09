import { StoreContext } from "@/store/store-context";
import { useContext } from "react";
import Actions from "@/store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function NonSalaryTDS({ setSection }) {
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
            NonSalaryTDS: {
              TANOfDeductor: values.TANOfDeductor,
              nameOfDeductor: values.nameOfDeductor,
              totalTaxDeducted: values.totalTaxDeducted,
              taxDeductedClaimedForThisYear:
                values.taxDeductedClaimedForThisYear,
              incomeAgainstTDSDeducted: values.incomeAgainstTDSDeducted,
              typeOfIncome: values.typeOfIncome,
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
      TANOfDeductor: "",
      nameOfDeductor: "",
      totalTaxDeducted: "",
      taxDeductedClaimedForThisYear: "",
      incomeAgainstTDSDeducted: "",
      typeOfIncome: "",
      financialYearInWhichTDSDeducted: "",
    },
    validationSchema: Yup.object({
      TANOfDeductor: Yup.string(),
      nameOfDeductor: Yup.string(),
      totalTaxDeducted: Yup.string(),
      taxDeductedClaimedForThisYear: Yup.string(),
      incomeAgainstTDSDeducted: Yup.string(),
      typeOfIncome: Yup.string(),
      financialYearInWhichTDSDeducted: Yup.string(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="mx-auto max-w-4xl w-full px-4">
      <h3 className="border-b font-semibold mb-5">Tax Deducted At Source</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="TANOfDeductor" className="text-sm font-medium">
              TAN of Deductor
            </label>
            <input
              type="text"
              name="TANOfDeductor"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.TANOfDeductor}
              id="TANOfDeductor"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.TANOfDeductor && formik.errors.TANOfDeductor ? (
              <div>{formik.errors.TANOfDeductor}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="nameOfDeductor" className="text-sm font-medium">
              Name of Deductor
            </label>
            <input
              type="text"
              name="nameOfDeductor"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameOfDeductor}
              id="nameOfDeductor"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.nameOfDeductor && formik.errors.nameOfDeductor ? (
              <div>{formik.errors.nameOfDeductor}</div>
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
              id="incomeAgainstTDSDeducted"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.incomeAgainstTDSDeducted}
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            />
            {formik.touched.incomeAgainstTDSDeducted &&
            formik.errors.incomeAgainstTDSDeducted ? (
              <div>{formik.errors.incomeAgainstTDSDeducted}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="typeOfIncome" className="text-sm font-medium">
              Type of Income
            </label>
            <select
              id="typeOfIncome"
              name="typeOfIncome"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.typeOfIncome}
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
            >
              <option value="OtherSources">Other Sources</option>
              <option value="HouseProperty">House Property</option>
              <option value="BusinessAndProfession">
                Business &amp; Profession
              </option>
              <option value="CapitalGain">Capital Gain</option>
              <option value="ExemptIncome">Exempt Income</option>
              <option value="NotApplicableUs194N">
                Not Applicable - TDS us 194N
              </option>
            </select>
            {formik.touched.typeOfIncome && formik.errors.typeOfIncome ? (
              <div>{formik.errors.typeOfIncome}</div>
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
              onChange={formik.handleChange}
              name="financialYearInWhichTDSDeducted"
              id="financialYearInWhichTDSDeducted"
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
              <option value="2014">2014-2015</option>
              <option value="2013">2013-2014</option>
              <option value="2012">2012-2013</option>
              <option value="2011">2011-2012</option>
              <option value="2010">2010-2011</option>
              <option value="2009">2009-2010</option>
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
