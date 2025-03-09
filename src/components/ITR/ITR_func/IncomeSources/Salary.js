import { useContext, useState } from "react";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import generateFY from "@/helper/generateFY";
export default function Salary({ setSection }) {
  const [state, dispatch] = useContext(StoreContext);
  const formik = useFormik({
    initialValues: {
      itr_AY: state.itr?.incomeSources?.itr_AY||"",
      taxPayerType: state.itr?.incomeSources?.taxPayerType || "",
      nameOfTheEmployer: state.itr?.incomeSources?.salary?.employerDetails?.nameOfTheEmployer ||"",
      employerType: state.itr?.incomeSources?.salary?.employerDetails?.employerType || "" ,
      salaryAsPerSection17_1: state.itr?.incomeSources?.salary?.salaryInformation?.salaryAsPerSection17_1 || 0,
      valueOfPerquisitesUnderSection17_2: state.itr?.incomeSources?.salary?.salaryInformation?.valueOfPerquisitesUnderSection17_2 || "",
      profitsInLieuOfSalaryUnderSection17_3: state.itr?.incomeSources?.salary?.salaryInformation?.profitsInLieuOfSalaryUnderSection17_3 || 0,
      exemptAllowancesUnderSection10: state.itr?.incomeSources?.salary?.salaryInformation?.exemptAllowancesUnderSection10 || 0,
      standardDeductionUnderSection16ia: 50000,
      professionalTaxUnderSection16iii: 0,
      taxDeductedAtSourceOnSalary: state.itr?.incomeSources?.salary?.tdsDetails?.taxDeductedAtSourceOnSalary || "",
      tanOfTheEmployer: state.itr?.incomeSources?.salary?.tdsDetails?.tanOfTheEmployer || "",
    },
    validationSchema: new Yup.ObjectSchema({
      nameOfTheEmployer: Yup.string(),
      employerType: Yup.string(),
      salaryAsPerSection17_1: Yup.number(),
      valueOfPerquisitesUnderSection17_2: Yup.string(),
      profitsInLieuOfSalaryUnderSection17_3: Yup.number(),
      exemptAllowancesUnderSection10: Yup.number(),
      standardDeductionUnderSection16ia: Yup.number(),
      professionalTaxUnderSection16iii: Yup.number(),
      taxDeductedAtSourceOnSalary: Yup.number(),
      tanOfTheEmployer: Yup.string(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const balance = () => {
    return (
      Number(formik.values.salaryAsPerSection17_1) +
      Number(formik.values.profitsInLieuOfSalaryUnderSection17_3) -
      Number(formik.values.exemptAllowancesUnderSection10)
    );
  };

  const chargeAbleSalary = () => {
    const balanceSal = balance();
    const deduction = Number(formik.values.standardDeductionUnderSection16ia);
    let professionalTax = Number(
      formik.values.professionalTaxUnderSection16iii
    );
    professionalTax > 5000 && (professionalTax = 5000);
    return Number(balanceSal) - Number(professionalTax + deduction);
  };

  const handleSubmit = (values) => {
    const balanceSal = balance();
    const chargeAbleSal = chargeAbleSalary();
    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        incomeSources: {
          ...state.itr.incomeSources,
          itr_AY: values.itr_AY,
          taxPayerType: values.taxPayerType,
          salary: {
            employerDetails: {
              nameOfTheEmployer: values.nameOfTheEmployer,
              employerType: values.employerType,
            },
            salaryInformation: {
              salaryAsPerSection17_1: values.salaryAsPerSection17_1,
              valueOfPerquisitesUnderSection17_2:
                values.valueOfPerquisitesUnderSection17_2,
              profitsInLieuOfSalaryUnderSection17_3:
                values.profitsInLieuOfSalaryUnderSection17_3,
              exemptAllowancesUnderSection10:
                values.exemptAllowancesUnderSection10,
              standardDeductionUnderSection16ia:
                values.standardDeductionUnderSection16ia,
              professionalTaxUnderSection16iii:
                values.professionalTaxUnderSection16iii,
              balance: balanceSal,
              incomeChargeableUnderTheHeadSalaries: chargeAbleSal,
            },
            tdsDetails: {
              taxDeductedAtSourceOnSalary: values.taxDeductedAtSourceOnSalary,
              tanOfTheEmployer: values.tanOfTheEmployer,
            },
          },
        },
      },
    });
    setSection("House Property");
  };
  const AY = generateFY(2018)

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mx-auto max-w-4xl w-full px-4">
        <h3 className="border-b font-semibold mb-5">Employer Details</h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
                <label className="min-w-max" for="itr_AY">Assessment Year</label>
                <select
                     className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    value={formik.values.itr_AY}
                    name="itr_AY"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="">--select--</option>
                    {AY.map((el) => (
                        <option key={el.startYear} value={`${el.startYear}-${el.endYear}`}>
                            {`${el.startYear}-${el.endYear}`}
                        </option>
                    ))}
                </select>
          </div>
          <div className="flex flex-col">
                <label htmlFor="taxPayerType">Tax Payer</label>
                <select
                    name="taxPayerType"
                    id="taxPayerType"
                    value={formik.values.taxPayerType}
                    onBlur={formik.handleBlur}

                    onChange={formik.handleChange}
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                >
                    <option value={""}>Select</option>
                    <option value={"General"}>Individual</option>
                    <option value={"HUF(Hindu undivided family)"}>
                    HUF(Hindu undivided family)
                    </option>
                    {/* <option value={"AOP/BOI"}>AOP/BOI</option>
                    <option value={"Domestic Company"}>Domestic Company</option>
                    <option value={"Foreign Company"}>Foreign Company</option>                   
                    <option value={"LLP"}>Firm/LLP</option>
                    <option value={"Co-operative Society"}>
                    Co-operative Society{" "}
                    </option> */}
                </select>
                {formik.touched.taxPayerType &&
                    formik.errors.taxPayerType && (
                        <span className={InputStyles.error_msg}>
                            {formik.errors.taxPayerType}
                        </span>
                    )
                }
          </div>
          <div className="flex flex-col">
            <label htmlFor="nameOfTheEmployer" className="text-sm font-medium">
              Name of the Employer
            </label>
            <input
              type="text"
              name="nameOfTheEmployer"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
              id="nameOfTheEmployer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameOfTheEmployer}
            />
            {formik.touched.nameOfTheEmployer &&
            formik.errors.nameOfTheEmployer ? (
              <div>{formik.errors.nameOfTheEmployer}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="employerType" className="text-sm font-medium">
              Employer Type/Category
            </label>
            <select
              name="employerType"
              id="employerType"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.employerType}
            >
              <option value="">--Select--</option>
              <option value="Private">Private</option>
              <option value="Central Goverment">Central Goverment</option>
              <option value="State Goverment">State Goverment</option>
              <option value="Public Sector Unit">Public Sector Unit</option>
              <option value="Pensioner">Pensioner</option>
            </select>
            {formik.touched.employerType && formik.errors.employerType ? (
              <div>{formik.errors.employerType}</div>
            ) : null}
          </div>
        </div>
        <h3 className="border-b font-semibold mb-5 mt-10">
          Salary Information
        </h3>
        <div>
          <div>
            <span className="font-semibold my-3">1. Gross salary</span>
            <div className="grid gap-5 md:pl-10">
              <div className="flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="salaryAsPerSection17_1"
                  className="text-sm font-semibold my-3 w-full"
                >
                  1(a) - Salary as per section 17(1)
                </label>
                <input
                  type="number"
                  name="salaryAsPerSection17_1"
                  id="salaryAsPerSection17_1"
                  className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salaryAsPerSection17_1}
                />
                {formik.touched.salaryAsPerSection17_1 &&
                formik.errors.salaryAsPerSection17_1 ? (
                  <div>{formik.errors.salaryAsPerSection17_1}</div>
                ) : null}
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="valueOfPerquisitesUnderSection17_2"
                  className="text-sm font-semibold my-3 w-full"
                >
                  1(b) - Value of perquisites under section 17(2)
                </label>
                {/* <select
                  name="valueOfPerquisitesUnderSection17_2"
                  id="valueOfPerquisitesUnderSection17_2"
                  className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.valueOfPerquisitesUnderSection17_2}
                >
                  <option value="">--Select--</option>
                  <option value="Value of furnished RFA">Value of furnished RFA</option>
                  <option value="Value of Furnished accommodation">Value of Furnished accommodation</option>
                  <option value="Accommodation in a Hotel">Accommodation in a Hotel</option>
                  <option value="Company car or vehicle">Company car or vehicle</option>
                  <option value="Health insurance or medical benefits">Health insurance or medical benefits</option>
                  <option value="Interest-free or concessional loans">Interest-free or concessional loans</option>
                  <option value="Club membership">Club membership</option>
                </select> */}
                <input
                  type="number"
                  name="valueOfPerquisitesUnderSection17_2"
                  id="valueOfPerquisitesUnderSection17_2"
                  className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.valueOfPerquisitesUnderSection17_2}
                />
                {formik.touched.valueOfPerquisitesUnderSection17_2 &&
                formik.errors.valueOfPerquisitesUnderSection17_2 ? (
                  <div>{formik.errors.valueOfPerquisitesUnderSection17_2}</div>
                ) : null}
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="profitsInLieuOfSalaryUnderSection17_3"
                  className="text-sm font-semibold my-3 w-full"
                >
                  1(c) - Profits in lieu of salary under section 17(3)
                </label>
                <input
                  type="number"
                  name="profitsInLieuOfSalaryUnderSection17_3"
                  id="profitsInLieuOfSalaryUnderSection17_3"
                  className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.profitsInLieuOfSalaryUnderSection17_3}
                />
                {formik.touched.profitsInLieuOfSalaryUnderSection17_3 &&
                formik.errors.profitsInLieuOfSalaryUnderSection17_3 ? (
                  <div>
                    {formik.errors.profitsInLieuOfSalaryUnderSection17_3}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between my-5">
            <label
              htmlFor="exemptAllowancesUnderSection10"
              className="text-sm font-semibold my-3 w-full"
            >
              2. Exempt allowances under section 10
            </label>
            <input
              type="number"
              name="exemptAllowancesUnderSection10"
              id="exemptAllowancesUnderSection10"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.exemptAllowancesUnderSection10}
            />
            {formik.touched.exemptAllowancesUnderSection10 &&
            formik.errors.exemptAllowancesUnderSection10 ? (
              <div>{formik.errors.exemptAllowancesUnderSection10}</div>
            ) : null}
          </div>
          <div className="flex items-center justify-between my-5">
            <p className="font-semibold my-3">3. Balance (1 - 2)</p>
            <span className="font-semibold my-3">
              {balance().toLocaleString()}
            </span>
          </div>
          <div>
            <p className="font-semibold my-3">4. Deductions under section 16</p>
            <div className="grid gap-5 md:pl-10">
              <div className="flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="standardDeductionUnderSection16ia"
                  className="text-sm font-semibold my-3 w-full"
                >
                  Standard deduction under section 16(ia)
                </label>
                <input
                  type="number"
                  name="standardDeductionUnderSection16ia"
                  className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  id="standardDeductionUnderSection16ia"
                  disabled
                  onBlur={formik.handleBlur}
                  value={formik.values.standardDeductionUnderSection16ia}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <label
                  htmlFor="professionalTaxUnderSection16iii"
                  className="text-sm font-semibold my-3 w-full"
                >
                  Professional tax under section 16(iii)
                </label>
                <input
                  type="number"
                  name="professionalTaxUnderSection16iii"
                  id="professionalTaxUnderSection16iii"
                  className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.professionalTaxUnderSection16iii}
                />
                {formik.touched.professionalTaxUnderSection16iii &&
                formik.errors.professionalTaxUnderSection16iii ? (
                  <div>{formik.errors.professionalTaxUnderSection16iii}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between my-5">
            <p className="font-semibold my-3">
              5. Income Chargeable under the head &apos;Salaries&apos;
            </p>
            <span className="font-semibold my-3">
              {chargeAbleSalary().toLocaleString()}
            </span>
          </div>
        </div>
        <h3 className="border-b font-semibold mb-5">TDS Details</h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="taxDeductedAtSourceOnSalary"
              className="text-sm font-medium"
            >
              Tax Deducted at source on Salary
            </label>
            <input
              type="number"
              name="taxDeductedAtSourceOnSalary"
              id="taxDeductedAtSourceOnSalary"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taxDeductedAtSourceOnSalary}
            />
            {formik.touched.taxDeductedAtSourceOnSalary &&
            formik.errors.taxDeductedAtSourceOnSalary ? (
              <div>{formik.errors.taxDeductedAtSourceOnSalary}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="tanOfTheEmployer" className="text-sm font-medium">
              TAN of the Employer
            </label>
            <input
              name="tanOfTheEmployer"
              id="tanOfTheEmployer"
              className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tanOfTheEmployer}
            />
            {formik.touched.tanOfTheEmployer &&
            formik.errors.tanOfTheEmployer ? (
              <div>{formik.errors.tanOfTheEmployer}</div>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
        >
          Save
        </button>
      </div>
    </form>
  );
}
