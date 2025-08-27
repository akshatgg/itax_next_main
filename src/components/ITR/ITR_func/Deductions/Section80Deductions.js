// "use client";
// import { useContext, useState } from "react";
// import { StoreContext } from "@/store/store-context";
// import Actions from "@/store/actions";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputStyles } from "@/app/styles/InputStyles";

// export default function Section80Deductions({ setSection }) {
//   const [state, dispatch] = useContext(StoreContext);
//   const formik = useFormik({
//     initialValues: {
//       insurance: 0,
//       ulip: 0,
//       pf: 0,
//       mutualFund: 0,
//       gpf: 0,
//       ppf: 0,
//       houseRepayment: 0,
//       childrenEducation: 0,
//       interestEarnedOnSavingsBank: 0,
//       nameOfDonee: "",
//       panOfDonee: "",
//       donationAmountCash: 0,
//       donationAmountOther: 0,
//       limitOnDeduction: "",
//       qualifyingPercentage: "",

//       pinCode: 0,
//       addressLine: "",
//       townCity: "",
//       state: "",
//     },
//     validationSchema: new Yup.ObjectSchema({
//       insurance: Yup.number().typeError("Invalid number"),
//       ulip: Yup.number().typeError("Invalid number"),
//       pf: Yup.number().typeError("Invalid number"),
//       mutualFund: Yup.number().typeError("Invalid number"),
//       ppf: Yup.number().typeError("Invalid number"),
//       houseRepayment: Yup.number().typeError("Invalid number"),
//       childrenEducation: Yup.number().typeError("Invalid number"),

//       interestEarnedOnSavingsBank: Yup.number().typeError("Invalid number"),

//       nameOfDonee: Yup.string(),
//       donationAmountCash: Yup.number().typeError("Invalid number"),
//       donationAmountOther: Yup.number().typeError("Invalid number"),
//       panOfDonee: Yup.string(),
//       limitOnDeduction: Yup.string(),
//       qualifyingPercentage: Yup.string(),

//       pinCode: Yup.number().typeError("Invalid number"),
//       addressLine: Yup.string(),
//       townCity: Yup.string(),
//       state: Yup.string(),
//     }),
//     onSubmit: (values) => handleSubmit(values),
//   });

//   const handleSubmit = (values) => {
//     const total_deduction = totalDeduction(values);

//     dispatch({
//       type: Actions.ITR,
//       payload: {
//         ...state.itr,
//         deductions: {
//           ...state.itr.deductions,
//           section80Deductions: {
//             totalDeduction: total_deduction.finaltotal,
//             investmentsUnderSection80C: {
//               insurance: values?.insurance,
//               ulip: values?.ulip,
//               pf: values?.pf,
//               mutualFund: values?.mutualFund,
//               gpf: values?.gpf,
//               ppf: values?.ppf,
//               houseRepayment: values?.houseRepayment,
//               childrenEducation: values?.childrenEducation,
//             },
//             section80tta: {
//               interestEarnedOnSavingsAccount:
//                 values.interestEarnedOnSavingsBank,
//             },
//             section80GDonationsToCharitableOrganizations: {
//               detailsOfDonee: {
//                 nameOfDonee: values?.nameOfDonee,
//                 panOfDonee: values?.panOfDonee,
//                 limitOnDeduction: values?.limitOnDeduction,
//                 qualifyingPercentage: values?.qualifyingPercentage,
//               },
//               amountOfDonation: {
//                 totalAllowedDonation: total_deduction.total2,
//                 donationAmountCash: values?.donationAmountCash,
//                 donationAmountOther: values?.donationAmountOther,
//               },
//               addressOfDonee: {
//                 pincode: values?.pincode,
//                 addressLine: values?.addressLine,
//                 city: values?.city,
//                 state: values?.state,
//               },
//             },
//           },
//         },
//       },
//     });
//     setSection("More Deductions");
//   };

//   const totalDeduction = (values) => {
//     const SECTION_80_LIMIT = 150000;
//     const {
//       insurance,
//       ulip,
//       pf,
//       mutualFund,
//       gpf,
//       ppf,
//       houseRepayment,
//       childrenEducation,
//       interestEarnedOnSavingsBank,
//       donationAmountCash,
//       donationAmountOther,
//       qualifyingPercentage,
//     } = values;

//     let total =
//       Number(insurance) +
//       Number(ulip) +
//       Number(pf) +
//       Number(mutualFund) +
//       Number(gpf) +
//       Number(ppf) +
//       Number(houseRepayment) +
//       Number(childrenEducation);
//     let total2 = Number(donationAmountCash) + Number(donationAmountOther);
//     let total3 = Number(interestEarnedOnSavingsBank);

//     if (total >= SECTION_80_LIMIT) {
//       total = Number(SECTION_80_LIMIT);
//     }

//     if (qualifyingPercentage === "50%") {
//       total2 = Number(total2 / 2);
//     }

//     const finaltotal = Number(total) + Number(total2) + Number(total3);

//     return { finaltotal, total2 };
//   };

//   return (
//     // <div className="mx-auto max-w-4xl px-4 w-full">
//       <div className={InputStyles.section80Deduction}>
//       <form onSubmit={formik.handleSubmit}>
//         <h3
//         className={InputStyles.section80Deductiontitle}>
//          Investments under Section 80C
//       </h3>
//         <p className={InputStyles.section80DeductionP}>
//         You can claim a deduction of upto Rs. 1,50,000 under this section.
//       </p>

//      <div className={InputStyles.section80Deductioninput}>
//           <div className="grid grid-rows-2">
//             <label htmlFor="insurance" className={InputStyles.label}>
//               Insurance
//             </label>
//             <input
//               type="number"
//               name="insurance"
//               id="insurance"
//               className={InputStyles.input}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.insurance}
//             />
//             {formik.touched.insurance && formik.errors.insurance ? (
//               <div>{formik.errors.insurance}</div>
//             ) : null}
//           </div>
//           <div className="grid grid-rows-2">
//             <label htmlFor="ulip" className={InputStyles.label}>
//               ULIP
//             </label>
//             <input
//               type="number"
//               name="ulip"
//               id="ulip"
//               className={InputStyles.input}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.ulip}
//             />
//             {formik.touched.ulip && formik.errors.ulip ? (
//               <div>{formik.errors.ulip}</div>
//             ) : null}
//           </div>
//           <div className="grid grid-rows-2">
//             <label htmlFor="pf" className={InputStyles.label}>
//               PF
//             </label>
//             <input
//               type="number"
//               name="pf"
//               id="pf"
//               className={InputStyles.input}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.pf}
//             />
//             {formik.touched.pf && formik.errors.pf ? (
//               <div>{formik.errors.pf}</div>
//             ) : null}
//           </div>
//           <div className="grid grid-rows-2">
//             <label htmlFor="mutualFund" className={InputStyles.label}>
//               Mutual Fund
//             </label>
//             <input
//               type="number"
//               name="mutualFund"
//               id="mutualFund"
//               className={InputStyles.input}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.mutualFund}
//             />
//             {formik.touched.mutualFund && formik.errors.mutualFund ? (
//               <div>{formik.errors.mutualFund}</div>
//             ) : null}
//           </div>
//           <div className="grid grid-rows-2">
//             <label htmlFor="gpf" className={InputStyles.label}>
//               GPF
//             </label>
//             <input
//               type="number"
//               name="gpf"
//               id="gpf"
//               className={InputStyles.input}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.gpf}
//             />
//             {formik.touched.gpf && formik.errors.gpf ? (
//               <div>{formik.errors.gpf}</div>
//             ) : null}
//           </div>
//           <div className="grid grid-rows-2">
//             <label htmlFor="ppf" className={InputStyles.label}>
//               PPF
//             </label>
//             <input
//               type="number"
//               name="ppf"
//               id="ppf"
//               className={InputStyles.input}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.ppf}
//             />
//             {formik.touched.ppf && formik.errors.ppf ? (
//               <div>{formik.errors.ppf}</div>
//             ) : null}
//           </div>
//           <div className="grid grid-rows-2">
//             <label htmlFor="houseRepayment" className={InputStyles.label}>
//               House Repayment
//             </label>
//             <input
//               type="number"
//               name="houseRepayment"
//               className={InputStyles.input}
//               id="houseRepayment"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.houseRepayment}
//             />
//             {formik.touched.houseRepayment && formik.errors.houseRepayment ? (
//               <div>{formik.errors.houseRepayment}</div>
//             ) : null}
//           </div>
//           <div className="grid grid-rows-2">
//             <label htmlFor="childrenEducation" className={InputStyles.label}>
//               Children Education
//             </label>
//             <input
//               type="number"
//               name="childrenEducation"
//               className={InputStyles.input}
//               id="childrenEducation"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.childrenEducation}
//             />
//             {formik.touched.childrenEducation &&
//             formik.errors.childrenEducation ? (
//               <div>{formik.errors.childrenEducation}</div>
//             ) : null}
//           </div>
//         </div>

//       <h3 className={InputStyles.section80TTA}>
//       Section 80TTA: Deduction for Interest earned on Savings Bank Account
//       </h3>


//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-2 gap-y-4">
//           <div className="flex flex-col">
//             <label
//               htmlFor="interestEarnedOnSavingsBank"
//               className={InputStyles.label}
//             >
//               Interest earned on Savings Bank Account
//             </label>
//             <input
//               type="text"
//               name="interestEarnedOnSavingsBank"
//               id="interestEarnedOnSavingsBank"
//               className={InputStyles.input}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.interestEarnedOnSavingsBank}
//             />
//             {formik.touched.interestEarnedOnSavingsBank &&
//             formik.errors.interestEarnedOnSavingsBank ? (
//               <div>{formik.errors.interestEarnedOnSavingsBank}</div>
//             ) : null}
//           </div>
//         </div>

//         <h3 className={InputStyles.section80TTA}>
//           Section 80G : Donations to charitable organizations
//         </h3>
//         <div>
//           <p className={InputStyles.label}>
//             The government requires itemized details of donations for Section
//             80G.
//           </p>
//         </div>
//      <h3 className={InputStyles.section80details}>
//      Details of Done
//     </h3>
//         {/* <div className="mx-auto max-w-4xl w-full"> */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
//             <div className="grid grid-rows-2 ">
//               <label htmlFor="nameOfDonee" className={InputStyles.label}>
//                 Name of Done
//               </label>
//               <input
//                 type="text"
//                 name="nameOfDonee"
//                 id="nameOfDonee"
//                 className={InputStyles.input}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.nameOfDonee}
//               />
//               {formik.touched.nameOfDonee && formik.errors.nameOfDonee ? (
//                 <div>{formik.errors.nameOfDonee}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label
//                 htmlFor="donationAmountCash"
//                 className={InputStyles.label}
//               >
//                 Donation Amount (Cash)
//               </label>
//               <input
//                 type="number"
//                 name="donationAmountCash"
//                 className={InputStyles.input}
//                 id="donationAmountCash"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.donationAmountCash}
//               />
//               {formik.touched.donationAmountCash &&
//               formik.errors.donationAmountCash ? (
//                 <div>{formik.errors.donationAmountCash}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label
//                 htmlFor="donationAmountOtherModesLikeEPayChequeDdEtc"
//                 className={InputStyles.label}
//               >
//                 Donation Amount (Other modes like e-pay, cheque, DD etc)
//               </label>
//               <input
//                 type="number"
//                 name="donationAmountOther"
//                 id="donationAmountOther"
//                 className={InputStyles.input}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.donationAmountOther}
//               />
//               {formik.touched.donationAmountOther &&
//               formik.errors.donationAmountOther ? (
//                 <div>{formik.errors.donationAmountOther}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label htmlFor="panOfDonee" className={InputStyles.label}>
//                 PAN of Donee
//               </label>
//               <input
//                 type="text"
//                 name="panOfDonee"
//                 id="panOfDonee"
//                 className={InputStyles.input}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.panOfDonee}
//               />
//               {formik.touched.panOfDonee && formik.errors.panOfDonee ? (
//                 <div>{formik.errors.panOfDonee}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label htmlFor="limitOnDeduction" className={InputStyles.label}>
//                 Limit On Deduction
//               </label>
//               <select
//                 name="limitOnDeduction"
//                 id="limitOnDeduction"
//                 className={InputStyles.input}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.limitOnDeduction}
//               >
//                 <option value="">--Select--</option>
//                 <option value="No limit">No limit</option>
//                 <option value="Subject to Income">Subject to Income</option>
//               </select>
//               {formik.touched.limitOnDeduction &&
//               formik.errors.limitOnDeduction ? (
//                 <div>{formik.errors.limitOnDeduction}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label
//                 htmlFor="qualifyingPercentage"
//                 className={InputStyles.label}
//               >
//                 Qualifying Percentage
//               </label>
//               <select
//                 name="qualifyingPercentage"
//                 className={InputStyles.input}
//                 id="qualifyingPercentage"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.qualifyingPercentage}
//               >
//                 <option value="">--Select--</option>
//                 <option value="50%">50%</option>
//                 <option value="100%">100%</option>
//               </select>
//               {formik.touched.qualifyingPercentage &&
//               formik.errors.qualifyingPercentage ? (
//                 <div>{formik.errors.qualifyingPercentage}</div>
//               ) : null}
//             </div>
//           </div>

//           <h3 className={InputStyles.section80details}>Address of Donee</h3>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
//             <div className="grid grid-rows-2 ">
//               <label htmlFor="pinCode" className={InputStyles.label}>
//                 Pincode
//               </label>
//               <input
//                 type="number"
//                 name="pinCode"
//                 className={InputStyles.input}
//                 id="pinCode"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.pinCode}
//               />
//               {formik.touched.pinCode && formik.errors.pinCode ? (
//                 <div>{formik.errors.pinCode}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label htmlFor="addressLine" className={InputStyles.label}>
//                 Address Line
//               </label>
//               <input
//                 type="text"
//                 name="addressLine"
//                 className={InputStyles.input}
//                 id="addressLine"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.addressLine}
//               />
//               {formik.touched.addressLine && formik.errors.addressLine ? (
//                 <div>{formik.errors.addressLine}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label htmlFor="townCity" className={InputStyles.label}>
//                 Town / City
//               </label>
//               <input
//                 type="text"
//                 name="townCity"
//                 className={InputStyles.input}
//                 id="townCity"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.townCity}
//               />
//               {formik.touched.townCity && formik.errors.townCity ? (
//                 <div>{formik.errors.townCity}</div>
//               ) : null}
//             </div>
//             <div className="grid grid-rows-2 ">
//               <label htmlFor="state" className={InputStyles.label}>
//                 State
//               </label>
//               <select
//                 name="state"
//                 id="state"
//                 className={InputStyles.input}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.state}
//               >
//                 <option value="">--Select--</option>
//                 {stateList.map((item) => (
//                   <option key={item} value={item.toLowerCase()}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.state && formik.errors.state ? (
//                 <div>{formik.errors.state}</div>
//               ) : null}
//             </div>
//           </div>

//        <div className="flex justify-center pt-4">
//       <button type="submit" className={InputStyles.submitBtn}>
//         Save
//       </button>
//     </div>
//       </form>
//     </div>
//   );
// }

// const stateList = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jammu and Kashmir",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttarakhand",
//   "Uttar Pradesh",
//   "West Bengal",
//   "Andaman and Nicobar Islands",
//   "Chandigarh",
//   "Dadra and Nagar Haveli",
//   "Daman and Diu",
//   "Delhi",
//   "Lakshadweep",
//   "Puducherry",
// ];

'use client';
import { useContext, useMemo, useCallback } from 'react';
import { StoreContext } from '@/store/store-context';
import Actions from '@/store/actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputStyles } from '@/app/styles/InputStyles';

/** ---------- helpers ---------- */
// treat empty string as 0 for number fields; still show error on non-numeric text
const num = () =>
  Yup.number()
    .transform((value, original) => {
      if (original === '' || original === null || typeof original === 'undefined') return 0;
      const n = Number(original);
      return Number.isNaN(n) ? NaN : n;
    })
    .typeError('Invalid number');

const stateList = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
  'Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal',
  'Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli','Daman and Diu','Delhi',
  'Lakshadweep','Puducherry',
];

/** ---------- schema (memoized) ---------- */
const buildSchema = () =>
  Yup.object({
    // 80C block
    insurance: num(),
    ulip: num(),
    pf: num(),
    mutualFund: num(),
    gpf: num(),
    ppf: num(),
    houseRepayment: num(),
    childrenEducation: num(),

    // 80TTA
    interestEarnedOnSavingsBank: num(),

    // 80G
    nameOfDonee: Yup.string().trim(),
    panOfDonee: Yup.string().trim(),
    donationAmountCash: num(),
    donationAmountOther: num(),
    limitOnDeduction: Yup.string().oneOf(['', 'No limit', 'Subject to Income']),
    qualifyingPercentage: Yup.string().oneOf(['', '50%', '100%']),

    // Donee address
    pinCode: num(),
    addressLine: Yup.string().trim(),
    townCity: Yup.string().trim(),
    state: Yup.string().oneOf(['', ...stateList]),
  });

export default function Section80Deductions({ setSection }) {
  const [state, dispatch] = useContext(StoreContext);

  const validationSchema = useMemo(buildSchema, []);

  const calcTotals = useCallback((values) => {
    const SECTION_80_LIMIT = 150_000;

    const total80C =
      Number(values.insurance) +
      Number(values.ulip) +
      Number(values.pf) +
      Number(values.mutualFund) +
      Number(values.gpf) +
      Number(values.ppf) +
      Number(values.houseRepayment) +
      Number(values.childrenEducation);

    let capped80C = Math.min(SECTION_80_LIMIT, total80C);

    // 80G
    let donationTotal = Number(values.donationAmountCash) + Number(values.donationAmountOther);
    if (values.qualifyingPercentage === '50%') {
      donationTotal = donationTotal / 2;
    }

    // 80TTA
    const interest = Number(values.interestEarnedOnSavingsBank);

    const finaltotal = Number(capped80C) + Number(donationTotal) + Number(interest);

    return { finaltotal, total2: donationTotal };
  }, []);

  const handleSubmit = useCallback(
    (values) => {
      const total_deduction = calcTotals(values);

      dispatch({
        type: Actions.ITR,
        payload: {
          ...state.itr,
          deductions: {
            ...(state.itr?.deductions ?? {}),
            section80Deductions: {
              totalDeduction: total_deduction.finaltotal,
              investmentsUnderSection80C: {
                insurance: values.insurance,
                ulip: values.ulip,
                pf: values.pf,
                mutualFund: values.mutualFund,
                gpf: values.gpf,
                ppf: values.ppf,
                houseRepayment: values.houseRepayment,
                childrenEducation: values.childrenEducation,
              },
              section80tta: {
                interestEarnedOnSavingsAccount: values.interestEarnedOnSavingsBank,
              },
              section80GDonationsToCharitableOrganizations: {
                detailsOfDonee: {
                  nameOfDonee: values.nameOfDonee,
                  panOfDonee: values.panOfDonee,
                  limitOnDeduction: values.limitOnDeduction,
                  qualifyingPercentage: values.qualifyingPercentage,
                },
                amountOfDonation: {
                  totalAllowedDonation: total_deduction.total2,
                  donationAmountCash: values.donationAmountCash,
                  donationAmountOther: values.donationAmountOther,
                },
                addressOfDonee: {
                  pincode: values.pinCode,            // ✅ correct key mapping
                  addressLine: values.addressLine,
                  city: values.townCity,              // ✅ map townCity → city
                  state: values.state,
                },
              },
            },
          },
        },
      });

      setSection('More Deductions');
    },
    [calcTotals, dispatch, setSection, state.itr]
  );

  const formik = useFormik({
    initialValues: {
      // 80C
      insurance: 0,
      ulip: 0,
      pf: 0,
      mutualFund: 0,
      gpf: 0,
      ppf: 0,
      houseRepayment: 0,
      childrenEducation: 0,

      // 80TTA
      interestEarnedOnSavingsBank: 0,

      // 80G
      nameOfDonee: '',
      panOfDonee: '',
      donationAmountCash: 0,
      donationAmountOther: 0,
      limitOnDeduction: '',
      qualifyingPercentage: '',

      // Donee address
      pinCode: 0,
      addressLine: '',
      townCity: '',
      state: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const nChange = (name) => (e) => {
    const v = e.target.value;
    formik.setFieldValue(name, v === '' ? '' : Number(v));
  };

  return (
    <div className={InputStyles.section80Deduction}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <h3 className={InputStyles.section80Deductiontitle}>Investments under Section 80C</h3>
        <p className={InputStyles.section80DeductionP}>
          You can claim a deduction of upto Rs. 1,50,000 under this section.
        </p>

        <div className={InputStyles.section80Deductioninput}>
          {[
            ['insurance', 'Insurance'],
            ['ulip', 'ULIP'],
            ['pf', 'PF'],
            ['mutualFund', 'Mutual Fund'],
            ['gpf', 'GPF'],
            ['ppf', 'PPF'],
            ['houseRepayment', 'House Repayment'],
            ['childrenEducation', 'Children Education'],
          ].map(([name, label]) => (
            <div className="grid grid-rows-2" key={name}>
              <label htmlFor={name} className={InputStyles.label}>{label}</label>
              <input
                type="number"
                inputMode="numeric"
                id={name}
                name={name}
                className={InputStyles.input}
                onChange={nChange(name)}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                onWheel={(e) => e.currentTarget.blur()}
              />
              {formik.touched[name] && formik.errors[name] ? <div>{formik.errors[name]}</div> : null}
            </div>
          ))}
        </div>

        <h3 className={InputStyles.section80TTA}>
          Section 80TTA: Deduction for Interest earned on Savings Bank Account
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-2 gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="interestEarnedOnSavingsBank" className={InputStyles.label}>
              Interest earned on Savings Bank Account
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="interestEarnedOnSavingsBank"
              name="interestEarnedOnSavingsBank"
              className={InputStyles.input}
              onChange={nChange('interestEarnedOnSavingsBank')}
              onBlur={formik.handleBlur}
              value={formik.values.interestEarnedOnSavingsBank}
              onWheel={(e) => e.currentTarget.blur()}
            />
            {formik.touched.interestEarnedOnSavingsBank && formik.errors.interestEarnedOnSavingsBank ? (
              <div>{formik.errors.interestEarnedOnSavingsBank}</div>
            ) : null}
          </div>
        </div>

        <h3 className={InputStyles.section80TTA}>Section 80G : Donations to charitable organizations</h3>
        <p className={InputStyles.label}>
          The government requires itemized details of donations for Section 80G.
        </p>

        <h3 className={InputStyles.section80details}>Details of Donee</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
          <div className="grid grid-rows-2">
            <label htmlFor="nameOfDonee" className={InputStyles.label}>Name of Donee</label>
            <input
              type="text"
              id="nameOfDonee"
              name="nameOfDonee"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameOfDonee}
              autoComplete="name"
            />
            {formik.touched.nameOfDonee && formik.errors.nameOfDonee ? <div>{formik.errors.nameOfDonee}</div> : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="donationAmountCash" className={InputStyles.label}>Donation Amount (Cash)</label>
            <input
              type="number"
              inputMode="numeric"
              id="donationAmountCash"
              name="donationAmountCash"
              className={InputStyles.input}
              onChange={nChange('donationAmountCash')}
              onBlur={formik.handleBlur}
              value={formik.values.donationAmountCash}
              onWheel={(e) => e.currentTarget.blur()}
            />
            {formik.touched.donationAmountCash && formik.errors.donationAmountCash ? (
              <div>{formik.errors.donationAmountCash}</div>
            ) : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="donationAmountOther" className={InputStyles.label}>
              Donation Amount (Other modes like e-pay, cheque, DD etc)
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="donationAmountOther"
              name="donationAmountOther"
              className={InputStyles.input}
              onChange={nChange('donationAmountOther')}
              onBlur={formik.handleBlur}
              value={formik.values.donationAmountOther}
              onWheel={(e) => e.currentTarget.blur()}
            />
            {formik.touched.donationAmountOther && formik.errors.donationAmountOther ? (
              <div>{formik.errors.donationAmountOther}</div>
            ) : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="panOfDonee" className={InputStyles.label}>PAN of Donee</label>
            <input
              type="text"
              id="panOfDonee"
              name="panOfDonee"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.panOfDonee}
            />
            {formik.touched.panOfDonee && formik.errors.panOfDonee ? <div>{formik.errors.panOfDonee}</div> : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="limitOnDeduction" className={InputStyles.label}>Limit On Deduction</label>
            <select
              id="limitOnDeduction"
              name="limitOnDeduction"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.limitOnDeduction}
            >
              <option value="">--Select--</option>
              <option value="No limit">No limit</option>
              <option value="Subject to Income">Subject to Income</option>
            </select>
            {formik.touched.limitOnDeduction && formik.errors.limitOnDeduction ? (
              <div>{formik.errors.limitOnDeduction}</div>
            ) : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="qualifyingPercentage" className={InputStyles.label}>Qualifying Percentage</label>
            <select
              id="qualifyingPercentage"
              name="qualifyingPercentage"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.qualifyingPercentage}
            >
              <option value="">--Select--</option>
              <option value="50%">50%</option>
              <option value="100%">100%</option>
            </select>
            {formik.touched.qualifyingPercentage && formik.errors.qualifyingPercentage ? (
              <div>{formik.errors.qualifyingPercentage}</div>
            ) : null}
          </div>
        </div>

        <h3 className={InputStyles.section80details}>Address of Donee</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 gap-2 gap-y-5">
          <div className="grid grid-rows-2">
            <label htmlFor="pinCode" className={InputStyles.label}>Pincode</label>
            <input
              type="number"
              inputMode="numeric"
              id="pinCode"
              name="pinCode"
              className={InputStyles.input}
              onChange={nChange('pinCode')}
              onBlur={formik.handleBlur}
              value={formik.values.pinCode}
              onWheel={(e) => e.currentTarget.blur()}
            />
            {formik.touched.pinCode && formik.errors.pinCode ? <div>{formik.errors.pinCode}</div> : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="addressLine" className={InputStyles.label}>Address Line</label>
            <input
              type="text"
              id="addressLine"
              name="addressLine"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.addressLine}
              autoComplete="street-address"
            />
            {formik.touched.addressLine && formik.errors.addressLine ? <div>{formik.errors.addressLine}</div> : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="townCity" className={InputStyles.label}>Town / City</label>
            <input
              type="text"
              id="townCity"
              name="townCity"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.townCity}
            />
            {formik.touched.townCity && formik.errors.townCity ? <div>{formik.errors.townCity}</div> : null}
          </div>

          <div className="grid grid-rows-2">
            <label htmlFor="state" className={InputStyles.label}>State</label>
            <select
              id="state"
              name="state"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            >
              <option value="">--Select--</option>
              {stateList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {formik.touched.state && formik.errors.state ? <div>{formik.errors.state}</div> : null}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button type="submit" className={InputStyles.submitBtn}>Save</button>
        </div>
      </form>
    </div>
  );
}
