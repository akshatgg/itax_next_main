"use client";

import { useContext, useState } from "react";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputStyles } from "@/app/styles/InputStyles";

export default function Section80Deductions({ setSection }) {
  const [state, dispatch] = useContext(StoreContext);

  const formik = useFormik({
    initialValues: {
      insurance: 0,
      ulip: 0,
      pf: 0,
      mutualFund: 0,
      gpf: 0,
      ppf: 0,
      houseRepayment: 0,
      childrenEducation: 0,

      interestEarnedOnSavingsBank: 0,

      nameOfDonee: "",
      panOfDonee: "",
      donationAmountCash: 0,
      donationAmountOther: 0,
      limitOnDeduction: "",
      qualifyingPercentage: "",

      pinCode: 0,
      addressLine: "",
      townCity: "",
      state: "",
    },
    validationSchema: new Yup.ObjectSchema({
      insurance: Yup.number().typeError("Invalid number"),
      ulip: Yup.number().typeError("Invalid number"),
      pf: Yup.number().typeError("Invalid number"),
      mutualFund: Yup.number().typeError("Invalid number"),
      ppf: Yup.number().typeError("Invalid number"),
      houseRepayment: Yup.number().typeError("Invalid number"),
      childrenEducation: Yup.number().typeError("Invalid number"),

      interestEarnedOnSavingsBank: Yup.number().typeError("Invalid number"),

      nameOfDonee: Yup.string(),
      donationAmountCash: Yup.number().typeError("Invalid number"),
      donationAmountOther: Yup.number().typeError("Invalid number"),
      panOfDonee: Yup.string(),
      limitOnDeduction: Yup.string(),
      qualifyingPercentage: Yup.string(),

      pinCode: Yup.number().typeError("Invalid number"),
      addressLine: Yup.string(),
      townCity: Yup.string(),
      state: Yup.string(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    const total_deduction = totalDeduction(values);

    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        deductions: {
          ...state.itr.deductions,
          section80Deductions: {
            totalDeduction: total_deduction.finaltotal,
            investmentsUnderSection80C: {
              insurance: values?.insurance,
              ulip: values?.ulip,
              pf: values?.pf,
              mutualFund: values?.mutualFund,
              gpf: values?.gpf,
              ppf: values?.ppf,
              houseRepayment: values?.houseRepayment,
              childrenEducation: values?.childrenEducation,
            },
            section80tta: {
              interestEarnedOnSavingsAccount:
                values.interestEarnedOnSavingsBank,
            },
            section80GDonationsToCharitableOrganizations: {
              detailsOfDonee: {
                nameOfDonee: values?.nameOfDonee,
                panOfDonee: values?.panOfDonee,
                limitOnDeduction: values?.limitOnDeduction,
                qualifyingPercentage: values?.qualifyingPercentage,
              },
              amountOfDonation: {
                totalAllowedDonation: total_deduction.total2,
                donationAmountCash: values?.donationAmountCash,
                donationAmountOther: values?.donationAmountOther,
              },
              addressOfDonee: {
                pincode: values?.pincode,
                addressLine: values?.addressLine,
                city: values?.city,
                state: values?.state,
              },
            },
          },
        },
      },
    });
    setSection("More Deductions");
  };

  const totalDeduction = (values) => {
    const SECTION_80_LIMIT = 150000;
    const {
      insurance,
      ulip,
      pf,
      mutualFund,
      gpf,
      ppf,
      houseRepayment,
      childrenEducation,
      interestEarnedOnSavingsBank,
      donationAmountCash,
      donationAmountOther,
      qualifyingPercentage,
    } = values;

    let total =
      Number(insurance) +
      Number(ulip) +
      Number(pf) +
      Number(mutualFund) +
      Number(gpf) +
      Number(ppf) +
      Number(houseRepayment) +
      Number(childrenEducation);
    let total2 = Number(donationAmountCash) + Number(donationAmountOther);
    let total3 = Number(interestEarnedOnSavingsBank);

    if (total >= SECTION_80_LIMIT) {
      total = Number(SECTION_80_LIMIT);
    }

    if (qualifyingPercentage === "50%") {
      total2 = Number(total2 / 2);
    }

    const finaltotal = Number(total) + Number(total2) + Number(total3);

    return { finaltotal, total2 };
  };

  return (
    <div className="mx-auto max-w-4xl px-4 w-full">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="border-b font-semibold mb-5">
          Investments under Section 80C
        </h3>
        <p className="text-sm mb-5">
          You can claim a deduction of upto Rs. 1,50,000 under this section.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
          <div className="grid grid-rows-2">
            <label htmlFor="insurance" className={InputStyles.label}>
              Insurance
            </label>
            <input
              type="number"
              name="insurance"
              id="insurance"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.insurance}
            />
            {formik.touched.insurance && formik.errors.insurance ? (
              <div>{formik.errors.insurance}</div>
            ) : null}
          </div>
          <div className="grid grid-rows-2">
            <label htmlFor="ulip" className={InputStyles.label}>
              ULIP
            </label>
            <input
              type="number"
              name="ulip"
              id="ulip"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ulip}
            />
            {formik.touched.ulip && formik.errors.ulip ? (
              <div>{formik.errors.ulip}</div>
            ) : null}
          </div>
          <div className="grid grid-rows-2">
            <label htmlFor="pf" className={InputStyles.label}>
              PF
            </label>
            <input
              type="number"
              name="pf"
              id="pf"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pf}
            />
            {formik.touched.pf && formik.errors.pf ? (
              <div>{formik.errors.pf}</div>
            ) : null}
          </div>
          <div className="grid grid-rows-2">
            <label htmlFor="mutualFund" className={InputStyles.label}>
              Mutual Fund
            </label>
            <input
              type="number"
              name="mutualFund"
              id="mutualFund"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mutualFund}
            />
            {formik.touched.mutualFund && formik.errors.mutualFund ? (
              <div>{formik.errors.mutualFund}</div>
            ) : null}
          </div>
          <div className="grid grid-rows-2">
            <label htmlFor="gpf" className={InputStyles.label}>
              GPF
            </label>
            <input
              type="number"
              name="gpf"
              id="gpf"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gpf}
            />
            {formik.touched.gpf && formik.errors.gpf ? (
              <div>{formik.errors.gpf}</div>
            ) : null}
          </div>
          <div className="grid grid-rows-2">
            <label htmlFor="ppf" className={InputStyles.label}>
              PPF
            </label>
            <input
              type="number"
              name="ppf"
              id="ppf"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ppf}
            />
            {formik.touched.ppf && formik.errors.ppf ? (
              <div>{formik.errors.ppf}</div>
            ) : null}
          </div>
          <div className="grid grid-rows-2">
            <label htmlFor="houseRepayment" className={InputStyles.label}>
              House Repayment
            </label>
            <input
              type="number"
              name="houseRepayment"
              className={InputStyles.input}
              id="houseRepayment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.houseRepayment}
            />
            {formik.touched.houseRepayment && formik.errors.houseRepayment ? (
              <div>{formik.errors.houseRepayment}</div>
            ) : null}
          </div>
          <div className="grid grid-rows-2">
            <label htmlFor="childrenEducation" className={InputStyles.label}>
              Children Education
            </label>
            <input
              type="number"
              name="childrenEducation"
              className={InputStyles.input}
              id="childrenEducation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.childrenEducation}
            />
            {formik.touched.childrenEducation &&
            formik.errors.childrenEducation ? (
              <div>{formik.errors.childrenEducation}</div>
            ) : null}
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80TTA: Deduction for Interest earned on Savings Bank Account
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
          <div className="flex flex-col">
            <label
              htmlFor="interestEarnedOnSavingsBank"
              className={InputStyles.label}
            >
              Interest earned on Savings Bank Account
            </label>
            <input
              type="text"
              name="interestEarnedOnSavingsBank"
              id="interestEarnedOnSavingsBank"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.interestEarnedOnSavingsBank}
            />
            {formik.touched.interestEarnedOnSavingsBank &&
            formik.errors.interestEarnedOnSavingsBank ? (
              <div>{formik.errors.interestEarnedOnSavingsBank}</div>
            ) : null}
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80G : Donations to charitable organizations
        </h3>
        <div>
          <p className={InputStyles.label}>
            The government requires itemized details of donations for Section
            80G.
          </p>
        </div>
        <h3 className="font-medium mb-5 mt-8">Details of Donee</h3>
        <div className="mx-auto max-w-4xl w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
            <div className="grid grid-rows-2 ">
              <label htmlFor="nameOfDonee" className={InputStyles.label}>
                Name of Donee
              </label>
              <input
                type="text"
                name="nameOfDonee"
                id="nameOfDonee"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nameOfDonee}
              />
              {formik.touched.nameOfDonee && formik.errors.nameOfDonee ? (
                <div>{formik.errors.nameOfDonee}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label
                htmlFor="donationAmountCash"
                className={InputStyles.label}
              >
                Donation Amount (Cash)
              </label>
              <input
                type="number"
                name="donationAmountCash"
                className={InputStyles.input}
                id="donationAmountCash"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.donationAmountCash}
              />
              {formik.touched.donationAmountCash &&
              formik.errors.donationAmountCash ? (
                <div>{formik.errors.donationAmountCash}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label
                htmlFor="donationAmountOtherModesLikeEPayChequeDdEtc"
                className={InputStyles.label}
              >
                Donation Amount (Other modes like e-pay, cheque, DD etc)
              </label>
              <input
                type="number"
                name="donationAmountOther"
                id="donationAmountOther"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.donationAmountOther}
              />
              {formik.touched.donationAmountOther &&
              formik.errors.donationAmountOther ? (
                <div>{formik.errors.donationAmountOther}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label htmlFor="panOfDonee" className={InputStyles.label}>
                PAN of Donee
              </label>
              <input
                type="text"
                name="panOfDonee"
                id="panOfDonee"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.panOfDonee}
              />
              {formik.touched.panOfDonee && formik.errors.panOfDonee ? (
                <div>{formik.errors.panOfDonee}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label htmlFor="limitOnDeduction" className={InputStyles.label}>
                Limit On Deduction
              </label>
              <select
                name="limitOnDeduction"
                id="limitOnDeduction"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.limitOnDeduction}
              >
                <option value="">--Select--</option>
                <option value="No limit">No limit</option>
                <option value="Subject to Income">Subject to Income</option>
              </select>
              {formik.touched.limitOnDeduction &&
              formik.errors.limitOnDeduction ? (
                <div>{formik.errors.limitOnDeduction}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label
                htmlFor="qualifyingPercentage"
                className={InputStyles.label}
              >
                Qualifying Percentage
              </label>
              <select
                name="qualifyingPercentage"
                className={InputStyles.input}
                id="qualifyingPercentage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.qualifyingPercentage}
              >
                <option value="">--Select--</option>
                <option value="50%">50%</option>
                <option value="100%">100%</option>
              </select>
              {formik.touched.qualifyingPercentage &&
              formik.errors.qualifyingPercentage ? (
                <div>{formik.errors.qualifyingPercentage}</div>
              ) : null}
            </div>
          </div>

          <h3 className="font-medium mb-5 mt-8">Address of Donee</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
            <div className="grid grid-rows-2 ">
              <label htmlFor="pinCode" className={InputStyles.label}>
                Pincode
              </label>
              <input
                type="number"
                name="pinCode"
                className={InputStyles.input}
                id="pinCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pinCode}
              />
              {formik.touched.pinCode && formik.errors.pinCode ? (
                <div>{formik.errors.pinCode}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label htmlFor="addressLine" className={InputStyles.label}>
                Address Line
              </label>
              <input
                type="text"
                name="addressLine"
                className={InputStyles.input}
                id="addressLine"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressLine}
              />
              {formik.touched.addressLine && formik.errors.addressLine ? (
                <div>{formik.errors.addressLine}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label htmlFor="townCity" className={InputStyles.label}>
                Town / City
              </label>
              <input
                type="text"
                name="townCity"
                className={InputStyles.input}
                id="townCity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.townCity}
              />
              {formik.touched.townCity && formik.errors.townCity ? (
                <div>{formik.errors.townCity}</div>
              ) : null}
            </div>
            <div className="grid grid-rows-2 ">
              <label htmlFor="state" className={InputStyles.label}>
                State
              </label>
              <select
                name="state"
                id="state"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
              >
                <option value="">--Select--</option>
                {stateList.map((item) => (
                  <option key={item} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </select>
              {formik.touched.state && formik.errors.state ? (
                <div>{formik.errors.state}</div>
              ) : null}
            </div>
          </div>

          <div className="flex">
            <button
              type="submit"
              className="block bg-primary max-w-xs w-full px-10 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5 mx-auto"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const stateList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];