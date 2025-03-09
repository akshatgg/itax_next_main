"use client"
import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";

import { InputStyles } from "@/app/styles/InputStyles";

const Form16Component = () => {
  const router = useRouter();
  const [state, dispatch] = useContext(StoreContext);
  const form = state.itr.form16.formData;

  const grossSalary = (values) => {
    const total =
      Number(values.salary) +
      Number(values.valueOfPerquisitesUnderSection17_2) +
      Number(values.profitsInLieuOfSalaryUnderSection17_3);
    if (isNaN(total)) return 0;
    return total;
  };

  const totalExemption = (values) => {
    const total = Object.values(values.allowanceExempt).reduce(
      (acc, currentVal) => {
        return (acc += Number(currentVal));
      },
      0
    );
    if (isNaN(total)) return 0;
    return total;
  };

  const netSalary = (values) => {
    const total = grossSalary(values) - totalExemption(values);
    if (isNaN(total)) return 0;
    return total;
  };

  const totalIncome = (values) => {
    const total =
      netSalary(values) -
      (Number(values.entertainmentAllowanceUnderSection16ii) +
        Number(values.professionalTaxUnderSection16iii));

    if (isNaN(total)) return 0;
    return total;
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        form16: {
          ...state.itr.form16,
          formData: {
            nameOfEmployer: values.nameOfEmployer,
            employerStatus: {
              employerType: values.employerType,
              centerGovEmployee: values.centerGovEmployee,
            },
            salaryAsPerSection17_1: {
              salary: values.salary,
              pensioner: values.pensioner,
            },
            valueOfPerquisitesUnderSection17_2:
              values.valueOfPerquisitesUnderSection17_2,
            profitsInLieuOfSalaryUnderSection17_3:
              values.profitsInLieuOfSalaryUnderSection17_3,
            grossSalary: grossSalary(values),
            exemptAllowancesUnderSection_10: totalExemption(values),
            houseRentAllowance: values.allowanceExempt.houseRentAllowance,
            leaveTravelConcessionAssistance:
              values.allowanceExempt.leaveTravelConcessionAssistance,
            taxPaidByEmployerOnNonMonetaryPerks:
              values.allowanceExempt.taxPaidByEmployerOnNonMonetaryPerks,
            gratuity: values.allowanceExempt.gratuity,
            pension: values.allowanceExempt.pension,
            leaveEncashmentOnRetirement:
              values.allowanceExempt.leaveEncashmentOnRetirement,
            retrechmentCompensation_SchemeNotApprove:
              values.allowanceExempt.retrechmentCompensation_SchemeNotApprove,
            retrechmentCompensation_SchemeApprove:
              values.allowanceExempt.retrechmentCompensation_SchemeApprove,
            voluntaryRetirement: values.allowanceExempt.voluntaryRetirement,
            otherAllowance: values.allowanceExempt.otherAllowance,
            netSalary: netSalary(values),
            entertainmentAllowanceUnderSection16ii:
              values.entertainmentAllowanceUnderSection16ii,
            professionalTaxUnderSection16iii:
              values.professionalTaxUnderSection16iii,
            totalIncome: totalIncome(values),
          },
        },
      },
    });

    router.push("/dashboard/itr/itr-filling/deductions");
  };

  return (
    <Formik
      initialValues={{
        nameOfEmployer: form.nameOfEmployer,
        employerType: form.employerStatus.employerType,
        centerGovEmployee: false,
        salary: form.salaryAsPerSection17_1.salary,
        pensioner: false,
        valueOfPerquisitesUnderSection17_2:
          form.valueOfPerquisitesUnderSection17_2,
        profitsInLieuOfSalaryUnderSection17_3:
          form.profitsInLieuOfSalaryUnderSection17_3,
        allowanceExempt: {
          houseRentAllowance: form.houseRentAllowance,
          leaveTravelConcessionAssistance: form.leaveTravelConcessionAssistance,
          taxPaidByEmployerOnNonMonetaryPerks:
            form.taxPaidByEmployerOnNonMonetaryPerks,
          gratuity: form.gratuity,
          pension: form.pension,
          leaveEncashmentOnRetirement: form.leaveEncashmentOnRetirement,
          retrechmentCompensation_SchemeNotApprove: 0,
          retrechmentCompensation_SchemeApprove: 0,
          voluntaryRetirement: 0,
          otherAllowance: 0,
        },
        entertainmentAllowanceUnderSection16ii:
          form.entertainmentAllowanceUnderSection16ii,
        professionalTaxUnderSection16iii: form.professionalTaxUnderSection16iii,
      }}
      validationSchema={Yup.object({
        nameOfEmployer: Yup.string(),
        employerType: Yup.string(),
        centerGovEmployee: Yup.string(),
        salary: Yup.number().typeError("A number is required"),
        pensioner: Yup.string(),
        valueOfPerquisitesUnderSection17_2: Yup.number().typeError(
          "A number is required"
        ),
        profitsInLieuOfSalaryUnderSection17_3: Yup.number().typeError(
          "A number is required"
        ),
        grossSalary: Yup.number().typeError("A number is required"),
        exemptAllowancesUnderSection_10: Yup.number().typeError(
          "A number is required"
        ),
        houseRentAllowance: Yup.number().typeError("A number is required"),
        leaveTravelConcessionAssistance: Yup.number().typeError(
          "A number is required"
        ),
        taxPaidByEmployerOnNonMonetaryPerks: Yup.number().typeError(
          "A number is required"
        ),
        gratuity: Yup.number().typeError("A number is required"),
        pension: Yup.number().typeError("A number is required"),
        leaveEncashmentOnRetirement: Yup.number().typeError(
          "A number is required"
        ),
        retrechmentCompensation_SchemeNotApprove: Yup.number().typeError(
          "A number is required"
        ),
        retrechmentCompensation_SchemeApprove: Yup.number().typeError(
          "A number is required"
        ),
        voluntaryRetirement: Yup.number().typeError("A number is required"),
        otherAllowance: Yup.number().typeError("A number is required"),
        netSalary: Yup.number().typeError("A number is required"),
        entertainmentAllowanceUnderSection16ii: Yup.number().typeError(
          "A number is required"
        ),
        professionalTaxUnderSection16iii: Yup.number().typeError(
          "A number is required"
        ),
        totalIncome: Yup.number().typeError("A number is required"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {(values) => (
        <Form>
          <div className="mx-auto max-w-3xl flex flex-col w-full px-2">
            <div className="grid grid-cols-3 outline outline-1 outline-gray-400">
              <div className="col-span-3 p-2 text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                <div className=" flex items-center gap-2 flex-wrap">
                  <label className={InputStyles.label}>Name of Employer:</label>
                  <Field
                    type="text"
                    name="nameOfEmployer"
                    className={`ml-auto sm:w-2/3 ${InputStyles.input}`}
                  />
                  <ErrorMessage
                    name="nameOfEmployer"
                    component="span"
                    className="absolute left-full w-full mx-1 top-3 text-red-600"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex h-20 md:h-10 flex-col md:flex-row justify-center md:justify-start items-center outline gap-4 outline-1 outline-gray-400 px-3">
                  <label className="text-sm font-medium">
                    Employer Status:
                  </label>
                  <div className="flex gap-2 w-max items-center justify-center">
                    <label htmlFor="govt" className={InputStyles.label}>
                      Govt
                    </label>
                    <Field type="radio" value="govt" name="job" id="govt" />
                    <label htmlFor="psu" className={InputStyles.label}>
                      PSU
                    </label>
                    <Field type="radio" value="psu" name="job" id="psu" />
                    <label htmlFor="other" className={InputStyles.label}>
                      Other
                    </label>
                    <Field type="radio" value="other" name="job" id="other" />
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="flex h-20 md:h-10 px-2 items-center justify-center outline outline-1 outline-gray-400">
                  <label
                    htmlFor="centerGov"
                    className={`mx-2 ${InputStyles.label}`}
                  >
                    Whether Cent. Gov. Employee
                  </label>
                  <Field
                    type="checkbox"
                    name="centerGovEmployee"
                    id="centerGov"
                    checked={values.centerGovEmployee}
                  />

                  <ErrorMessage
                    name="centerGovEmployee"
                    component="span"
                    className="absolute left-full w-full mx-1 top-3 text-red-600"
                  />
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-2 outline outline-1 outline-gray-400">
                <div className="flex justify-start h-12 items-center">
                  <label htmlFor="salary" className="text-sm font-medium ml-2">
                    <span className="font-sans">1.</span> Salary as per Section{" "}
                    <span className="font-sans">17(1)</span>
                  </label>
                </div>
                <div className="col-span-1 flex gap-1 items-center">
                  <label htmlFor="pensioner" className={InputStyles.label}>
                    Whether a Pensioner
                  </label>
                  <Field
                    type="checkbox"
                    name="pensioner"
                    id="pensioner"
                    checked={values.pensioner}
                  />
                  <ErrorMessage
                    name="pensioner"
                    component="span"
                    className="absolute left-full w-full mx-1 top-3 text-red-600"
                  />
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="salary"
                  id="salary"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="salary"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="valueOfPerquisitesUnderSection17_2"
                    className="text-sm font-medium ml-2"
                  >
                    <span className="font-sans">2.</span>
                    Value of Prequisites as per Section
                    <span className="font-sans"> 17(2)</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="valueOfPerquisitesUnderSection17_2"
                  id="valueOfPerquisitesUnderSection17_2"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="valueOfPerquisitesUnderSection17_2"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="profitsInLieuOfSalaryUnderSection17_3"
                    className="text-sm font-medium ml-2"
                  >
                    <span className="font-sans">3.</span> Profit in lieu of
                    Salary as per Section{" "}
                    <span className="font-sans">17(3)</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1 p-2 outline outline-1 outline-gray-400">
                <Field
                  type="text"
                  name="profitsInLieuOfSalaryUnderSection17_3"
                  id="profitsInLieuOfSalaryUnderSection17_3"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="profitsInLieuOfSalaryUnderSection17_3"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 items-center outline outline-1 outline-gray-400">
                  <label
                    htmlFor="grossSalary"
                    className="text-sm font-medium ml-2"
                  >
                    <span className="font-sans">4.</span> Gross Salary{" "}
                    <span className="font-sans font-semibold">(1 + 2 + 3)</span>
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <div
                  name="grossSalary"
                  id="grossSalary"
                  className="h-8 px-3 bg-slate-300 outline-none border border-gray-400 rounded w-full font-sans"
                >
                  {grossSalary(values.values).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="exemptAllowancesUnderSection_10"
                    className="text-sm font-medium ml-2"
                  >
                    <span className="font-sans">5.</span> Allowance Exempt as
                    per Section 10
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <div
                  name="exemptAllowancesUnderSection_10"
                  id="exemptAllowancesUnderSection_10"
                  className="h-8 px-3 outline-none border border-gray-400 bg-slate-300 rounded w-full font-sans"
                >
                  {totalExemption(values.values).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="houseRentAllowance"
                    className="text-sm font-medium ml-4"
                  >
                    (i) House Rent Allowance
                  </label>
                </div>
              </div>
              <div className="col-span-1 relative outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.houseRentAllowance"
                  id="houseRentAllowance"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.houseRentAllowance"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="leaveTravelConcessionAssistance"
                    className="text-sm font-medium ml-4"
                  >
                    (ii) Leave Travel Concession/assistance
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.leaveTravelConcessionAssistance"
                  id="leaveTravelConcessionAssistance"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.leaveTravelConcessionAssistance"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="taxPaidByEmployerOnNonMonetaryPerks"
                    className="text-sm font-medium ml-4"
                  >
                    (iii) Tax paid by Employer on Non Monetary Perks
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.taxPaidByEmployerOnNonMonetaryPerks"
                  id="taxPaidByEmployerOnNonMonetaryPerks"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.taxPaidByEmployerOnNonMonetaryPerks"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="gratuity"
                    className="text-sm font-medium ml-4"
                  >
                    (iv) Gratuity
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.gratuity"
                  id="gratuity"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.gratuity"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label htmlFor="pension" className="text-sm font-medium ml-4">
                    (v) Pension
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.pension"
                  id="pension"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.pension"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="leaveEncashmentOnRetirement"
                    className="text-sm font-medium ml-4"
                  >
                    (vi) Leave Encashment on Retirement
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.leaveEncashmentOnRetirement"
                  id="leaveEncashmentOnRetirement"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.leaveEncashmentOnRetirement"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="retrechmentCompensation_SchemeNotApprove"
                    className="text-sm font-medium ml-4"
                  >
                    (vii) Retrechment Compensation (Scheme not approve)
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.retrechmentCompensation_SchemeNotApprove"
                  id="retrechmentCompensation_SchemeNotApprove"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.retrechmentCompensation_SchemeNotApprove"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="retrechmentCompensation_SchemeApprove"
                    className="text-sm font-medium ml-4"
                  >
                    (viii) Retrechment Compensation (Scheme approve)
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.retrechmentCompensation_SchemeApprove"
                  id="retrechmentCompensation_SchemeApprove"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.retrechmentCompensation_SchemeApprove"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="voluntaryRetirement"
                    className="text-sm font-medium ml-4"
                  >
                    (ix) Voluntary Retirement
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.voluntaryRetirement"
                  id="voluntaryRetirement"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.voluntaryRetirement"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="otherAllowance"
                    className="text-sm font-medium ml-4"
                  >
                    (x) Other Allowance
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="allowanceExempt.otherAllowance"
                  id="otherAllowance"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="allowanceExempt.otherAllowance"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="netSalary"
                    className="text-sm font-semibold ml-4"
                  >
                    6. Net Salary
                  </label>
                  <span className="font-sans ml-auto mr-2 font-semibold">
                    6=(4-5)
                  </span>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <div
                  name="netSalary"
                  id="netSalary"
                  className="h-8 px-3 bg-slate-300 outline-none border border-gray-400 rounded w-full font-sans"
                >
                  {netSalary(values.values).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="entertainmentAllowanceUnderSection16ii"
                    className="text-sm font-medium ml-4"
                  >
                    <span className="font-sans">7.</span> Entertainment
                    Allowance u/s <span className="font-sans">16</span>(ii)
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="entertainmentAllowanceUnderSection16ii"
                  id="entertainmentAllowanceUnderSection16ii"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="entertainmentAllowanceUnderSection16ii"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="professionalTaxUnderSection16iii"
                    className="text-sm font-medium ml-4"
                  >
                    Professional Tax u/s <span className="font-sans">16</span>
                    (iii)
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <Field
                  type="text"
                  name="professionalTaxUnderSection16iii"
                  id="professionalTaxUnderSection16iii"
                  className={InputStyles.input}
                />
                <ErrorMessage
                  name="professionalTaxUnderSection16iii"
                  component="span"
                  className="absolute left-full w-full mx-1 top-3 text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="flex justify-start h-12 outline outline-1 outline-gray-400 items-center">
                  <label
                    htmlFor="professionalTaxUnderSection16iii"
                    className="text-sm font-bold ml-4"
                  >
                    Income Chargeable under the head &apos;Salaries&apos;
                  </label>
                </div>
              </div>
              <div className="col-span-1 outline outline-1 outline-gray-400 p-2">
                <div
                  name="netSalary"
                  id="netSalary"
                  className="h-8 px-3 bg-slate-300 outline-none border border-gray-400 rounded w-full font-sans"
                >
                  {totalIncome(values.values).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
            <button
              className="px-3 py-2 mt-4 mx-auto bg-primary text-white rounded-md w-1/3 hover:opacity-80"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form16Component;
