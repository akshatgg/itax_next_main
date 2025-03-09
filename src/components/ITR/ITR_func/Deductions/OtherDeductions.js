import { useContext, useState } from "react";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { InputStyles } from "@/app/styles/InputStyles";

export default function OtherDeductions() {
  const router = useRouter();
  const [state, dispatch] = useContext(StoreContext);

  const handleSubmit = (values) => {
    const deduction = totalDeduction(values);

    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        deductions: {
          ...state.itr.deductions,
          otherDeductions: {
            amountOfTotalOtherDeductions: deduction,
            section80DdDisabledDependentDeduction: {
              typeofDisability: values?.section80DdDisabledDependentDeduction,
            },
            section80UDisability: {
              typeofDisability: values?.section80UDisability,
            },
          },
        },
      },
    });
    router.push("/dashboard/itr/itr-filling/tax-payable");
  };

  const totalDeduction = (values) => {
    const LIMIT_1 = 75000;
    const LIMIT_2 = 125000;
    let deduction = 0;
    let deduction2 = 0;
    const disabilityUnderSection80U = values.section80UDisability;
    const disabilityUnderSection80DD =
      values.section80DdDisabledDependentDeduction;

    disabilityUnderSection80U === "DisabilityUnderSection80U_40"
      ? (deduction += LIMIT_1)
      : null;
    disabilityUnderSection80U === "DisabilityUnderSection80U_Severe"
      ? (deduction += LIMIT_2)
      : null;
    disabilityUnderSection80DD === "DisabilityUnderSection80DD_40"
      ? (deduction2 += LIMIT_1)
      : null;
    disabilityUnderSection80DD === "DisabilityUnderSection80DD_Severe"
      ? (deduction2 += LIMIT_2)
      : null;

    return deduction + deduction2;
  };

  return (
    <Formik
      initialValues={{
        section80DdDisabledDependentDeduction: "",
        section80UDisability: "",
      }}
      validationSchema={Yup.object({
        section80DdDisabledDependentDeduction: Yup.string(),
        section80UDisability: Yup.string(),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values }) => (
        <Form>
          <div className="mx-auto max-w-4xl w-full px-4 md:text-base text-sm">
            <h3 className=" text-center border-b font-semibold mb-5 text-gray-500">
              Section 80DD - Disabled dependent deduction.
              (Spouse/Children/Parents)
            </h3>
            <div className="grid sm:grid-cols-2 sm:gap-5 gap-2 gap-y-5">
              <div className="flex justify-center">
                <Field
                  type="radio"
                  name="section80DdDisabledDependentDeduction"
                  id="DisabilityUnderSection80DD_40"
                  value="DisabilityUnderSection80DD_40"
                  className="mr-2"
                />
                <label className={InputStyles.label} htmlFor="DisabilityUnderSection80DD_40">
                  Add a dependent with 40% disability
                </label>
              </div>
              <div className="flex justify-center">
                <Field
                  type="radio"
                  name="section80DdDisabledDependentDeduction"
                  id="DisabilityUnderSection80DD_Severe"
                  value="DisabilityUnderSection80DD_Severe"
                  className="mr-2"
                />
                <label className={InputStyles.label} htmlFor="DisabilityUnderSection80DD_Severe">
                  Add a dependent with Severe disability
                </label>
              </div>
            </div>

            <h3 className=" text-center border-b font-semibold mb-5 mt-8 text-gray-500">
              Section 80U - Disability
            </h3>
            <div className="grid sm:grid-cols-2 sm:gap-5 gap-2 gap-y-5">
              <div className="flex justify-center">
                <Field
                  type="radio"
                  name="section80UDisability"
                  id="DisabilityUnderSection80U_40"
                  value="DisabilityUnderSection80U_40"
                  className="mr-2"
                />
                <label className={InputStyles.label} htmlFor="DisabilityUnderSection80U_40">
                  Add 40% disability under Section 80U
                </label>
              </div>
              <div className="flex justify-center">
                <Field
                  type="radio"
                  name="section80UDisability"
                  id="DisabilityUnderSection80U_Severe"
                  value="DisabilityUnderSection80U_Severe"
                  className="mr-2"
                />
                <label className={InputStyles.label} htmlFor="DisabilityUnderSection80U_Severe">
                  Add Severe disability under Section 80U
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}