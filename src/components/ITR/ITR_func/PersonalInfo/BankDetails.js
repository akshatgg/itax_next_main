
// "use client";
// import { useContext, useState, useEffect, useRef } from "react";
// import { StoreContext } from "@/store/store-context";
// import Actions from "@/store/actions";
// import useAuth from "@/hooks/useAuth";
// import { toast } from "react-toastify";
// import { RxCross1 } from "react-icons/rx/index";
// import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { ifscRegex } from "../../../regexPatterns";
// import userAxios from "@/lib/userAxios";
// import { InputStyles } from "@/app/styles/InputStyles";

// export default function BankInfo({ setSection }) {
//     const { token } = useAuth();
//     const [state, dispatch] = useContext(StoreContext);
//     const ifsc = useRef();
//     const [bankName, setBankName] = useState("");

//     const handleSubmit = (values) => {
//         console.log(values);
//         dispatch({
//             type: Actions.ITR,
//             payload: {
//                 ...state.itr,
//                 taxesFiling: {
//                     ...state.itr.taxesFiling,
//                     bankInfo: {
//                         primaryBankAccount: {
//                             bankAccountNumber: values.bankAccountNumber,
//                             IFSCCode: values.ifscCodeOfYourBranch,
//                             nameOfYourBank: values.nameOfYourBank,
//                         },
//                         allOtherBankAccounts: values.allOtherBankAccounts,
//                         additionalInformationNeededForIncomeTaxReturn: {
//                             mobilePhoneNumberSecondary:
//                                 values.mobilePhoneNumberSecondary,
//                             stdCode: values.stdCode,
//                             landlineTelephoneNumber:
//                                 values.landlineTelephoneNumber,
//                         },
//                     },
//                 },
//             },
//         });
//         setSection("Address");
//     };

//     const checkIFSC = (ifsc) => {
//         return ifscRegex.test(ifsc);
//     };

//     const fetchBank = async () => {
//         if (!token) {
//             return toast("Login to fetch BANK details", { type: "error" });
//         }

//         const url = "https://mom.itaxeasy.com/api/bank/get-details";
//         const ifscCode = ifsc.current.value;

//         const res = await userAxios.post(url, JSON.stringify({ ifsc: ifscCode }));
//         const jsonData = await res.json();
//         setBankName(jsonData?.data?.BANK);
//     };

//     useEffect(() => {
//         if (checkIFSC(ifsc.current?.value)) {
//             toast("Valid IFSC Code", { type: "success" });
//             fetchBank();
//         } else {
//             return;
//         }
//     }, [ifsc.current?.value]);

//     return (
//         <Formik
//             initialValues={{
//                 bankAccountNumber: "",
//                 ifscCodeOfYourBranch: "",
//                 nameOfYourBank: bankName,
//                 allOtherBankAccounts: [
//                     {
//                         BankAccountNo: 0,
//                         IFSCCode: "",
//                         BankName: "",
//                         accountType: "",
//                     },
//                 ],
//                 mobilePhoneNumberSecondary: "",
//                 stdCode: "",
//                 landlineTelephoneNumber: "",
//             }}
//             validationSchema={Yup.object({
//                 bankAccountNumber: Yup.string(),
//                 ifscCodeOfYourBranch: Yup.string().matches(
//                     ifscRegex,
//                     "Invalid IFSC Code",
//                 ),
//                 nameOfYourBank: Yup.string(),
//                 allOtherBankAccounts: Yup.array().of(
//                     Yup.object().shape({
//                         BankAccountNo: Yup.number(),
//                         IFSCCode: Yup.string(),
//                         BankName: Yup.string(),
//                         accountType: Yup.string(),
//                     }),
//                 ),
//                 mobilePhoneNumberSecondary: Yup.string(),
//                 stdCode: Yup.string(),
//                 landlineTelephoneNumber: Yup.string(),
//             })}
//             onSubmit={(values) => handleSubmit(values)}
//         >
//             {({ values }) => (
//    <Form>
//   <div className={InputStyles.formWrapper}>
//     <h2 className={InputStyles.title}> 🏦 Bank Details</h2>

//     {/* Primary Bank Info */}
//     <div className={InputStyles.gridLayout}>
//       <div>
//         <label htmlFor="bankAccountNumber" className={InputStyles.label}>
//           Bank Account Number
//         </label>
//         <Field
//           type="text"
//           name="bankAccountNumber"
//           id="bankAccountNumber"
//           className={InputStyles.input}
//         />
//         <ErrorMessage name="bankAccountNumber" />
//       </div>

//       <div>
//         <label htmlFor="ifscCodeOfYourBranch" className={InputStyles.label}>
//           IFSC code of your Branch
//         </label>
//         <Field
//           type="text"
//           name="ifscCodeOfYourBranch"
//           id="ifscCodeOfYourBranch"
//           className={InputStyles.input}
//         />
//         <ErrorMessage name="ifscCodeOfYourBranch" />
//       </div>

//       <div>
//         <label htmlFor="nameOfYourBank" className={InputStyles.label}>
//           Name of your Bank
//         </label>
//         <Field
//           type="text"
//           name="nameOfYourBank"
//           id="nameOfYourBank"
//           className={InputStyles.input}
//         />
//         <ErrorMessage name="nameOfYourBank" />
//       </div>
//     </div>

//     {/* Other Bank Accounts */}
//  <h2 className={InputStyles.sectionTitle}>
//   🧾 All Other Bank Accounts
// </h2>

// <FieldArray
//   name="allOtherBankAccounts"
//   render={(arrayHelpers) => (
//     <>
//       {values.allOtherBankAccounts.map((item, index) => (
//         <div
//           key={index}
//           className={InputStyles.fieldArrayWrapper}
//         >
//           <button
//             type="button"
//             className={InputStyles.removeBtn}
//             onClick={() => arrayHelpers.remove(index)}
//           >
//             ✕
//           </button>

//           <div>
//             <label className={InputStyles.label}>Bank A/C Number</label>
//             <Field
//               type="text"
//               name={`allOtherBankAccounts.${index}.BankAccountNo`}
//               className={InputStyles.input}
//             />
//             <ErrorMessage name={`allOtherBankAccounts.${index}.BankAccountNo`} />
//           </div>

//           <div>
//             <label className={InputStyles.label}>IFSC Code</label>
//             <Field
//               type="text"
//               name={`allOtherBankAccounts.${index}.IFSCCode`}
//               className={InputStyles.input}
//             />
//             <ErrorMessage name={`allOtherBankAccounts.${index}.IFSCCode`} />
//           </div>

//           <div>
//             <label className={InputStyles.label}>Bank Name</label>
//             <Field
//               type="text"
//               name={`allOtherBankAccounts.${index}.BankName`}
//               className={InputStyles.input}
//             />
//             <ErrorMessage name={`allOtherBankAccounts.${index}.BankName`} />
//           </div>

//           <div>
//             <label className={InputStyles.label}>Account Type</label>
//             <Field
//               as="select"
//               name={`allOtherBankAccounts.${index}.accountType`}
//               className={InputStyles.selectInput}
//             >
//               <option value="">Select</option>
//               <option value="Saving Account">Saving Account</option>
//               <option value="Current Account">Current Account</option>
//             </Field>
//             <ErrorMessage name={`allOtherBankAccounts.${index}.accountType`} />
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         className={InputStyles.addBtn}
//         onClick={() =>
//           arrayHelpers.push({
//             BankAccountNo: "",
//             IFSCCode: "",
//             BankName: "",
//             accountType: "",
//           })
//         }
//       >
//         + Add Another Bank Account
//       </button>
//     </>
//   )}
// />

//     {/* Additional Info */}
//     <h2 className={InputStyles.sectionTitle}>
//       📞 Additional Information
//     </h2>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//       <div>
//         <label className={InputStyles.label}>
//           Mobile Phone number (secondary)
//         </label>
//         <Field
//           type="text"
//           name="mobilePhoneNumberSecondary"
//           className={InputStyles.input}
//         />
//         <ErrorMessage name="mobilePhoneNumberSecondary" />
//       </div>

//       <div>
//         <label className={InputStyles.label}>STD code</label>
//         <Field
//           type="text"
//           name="stdCode"
//           className={InputStyles.input}
//         />
//         <ErrorMessage name="stdCode" />
//       </div>

//       <div>
//         <label className={InputStyles.label}>Landline Telephone Number</label>
//         <Field
//           type="text"
//           name="landlineTelephoneNumber"
//           className={InputStyles.input}
//         />
//         <ErrorMessage name="landlineTelephoneNumber" />
//       </div>
//     </div>

//     {/* Save Button */}
//     <div div className="flex justify-center pt-4">
//       <button
//         type="submit"
//         className={InputStyles.submitBtn}
//       >
//         Save
//       </button>
//     </div>
//   </div>
// </Form>

//             )}
//         </Formik>
//     );
// }

'use client';
import { useContext, useState, useEffect, useRef } from 'react';
import { StoreContext } from '@/store/store-context';
import Actions from '@/store/actions';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { Field, FieldArray, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ifscRegex } from '../../../regexPatterns';
import userAxios from '@/lib/userAxios';
import { InputStyles } from '@/app/styles/InputStyles';

export default function BankInfo({ setSection }) {
  const { token } = useAuth();
  const [state, dispatch] = useContext(StoreContext);
  const debounceRef = useRef(null);

  const handleSubmit = (values) => {
    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        taxesFiling: {
          ...state.itr.taxesFiling,
          bankInfo: {
            primaryBankAccount: {
              bankAccountNumber: values.bankAccountNumber,
              IFSCCode: values.ifscCodeOfYourBranch,
              nameOfYourBank: values.nameOfYourBank,
            },
            allOtherBankAccounts: values.allOtherBankAccounts,
            additionalInformationNeededForIncomeTaxReturn: {
              mobilePhoneNumberSecondary: values.mobilePhoneNumberSecondary,
              stdCode: values.stdCode,
              landlineTelephoneNumber: values.landlineTelephoneNumber,
            },
          },
        },
      },
    });
    setSection('Address');
  };

  const validationSchema = Yup.object({
    bankAccountNumber: Yup.string().trim(),
    ifscCodeOfYourBranch: Yup.string()
      .trim()
      .matches(ifscRegex, 'Invalid IFSC Code'),
    nameOfYourBank: Yup.string().trim(),
    allOtherBankAccounts: Yup.array().of(
      Yup.object().shape({
        BankAccountNo: Yup.string().trim(),
        IFSCCode: Yup.string().trim(),
        BankName: Yup.string().trim(),
        accountType: Yup.string().oneOf(['Saving Account', 'Current Account', ''], 'Invalid type'),
      })
    ),
    mobilePhoneNumberSecondary: Yup.string().trim(),
    stdCode: Yup.string().trim(),
    landlineTelephoneNumber: Yup.string().trim(),
  });

  const fetchBank = async (ifscCode, setFieldValue) => {
    if (!ifscCode || !ifscRegex.test(ifscCode)) return;

    try {
      if (!token) {
        toast.error('Login to fetch BANK details');
        return;
      }

      const url = 'https://mom.itaxeasy.com/api/bank/get-details';

      const res = await userAxios.post(
        url,
        { ifsc: ifscCode },
        { headers: { Authorization: `Bearer ${token}` } } // remove if API is public
      );

      const data = res?.data;
      const bank = data?.data?.BANK || '';

      if (bank) {
        toast.success('Bank details fetched');
        setFieldValue('nameOfYourBank', bank, false);
      } else {
        toast.info('No bank found for this IFSC');
      }
    } catch (err) {
      toast.error('Failed to fetch bank details');
      // console.error(err);
    }
  };

  return (
    <Formik
      initialValues={{
        bankAccountNumber: '',
        ifscCodeOfYourBranch: '',
        nameOfYourBank: '',
        allOtherBankAccounts: [
          { BankAccountNo: '', IFSCCode: '', BankName: '', accountType: '' },
        ],
        mobilePhoneNumberSecondary: '',
        stdCode: '',
        landlineTelephoneNumber: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        // Debounced IFSC watcher
        useEffect(() => {
          const code = values.ifscCodeOfYourBranch?.trim();

          if (debounceRef.current) clearTimeout(debounceRef.current);

          // only fetch when IFSC looks valid length (usually 11)
          if (code && code.length >= 11) {
            debounceRef.current = setTimeout(() => {
              if (ifscRegex.test(code)) {
                fetchBank(code, setFieldValue);
              }
            }, 400);
          }

          return () => clearTimeout(debounceRef.current);
        }, [values.ifscCodeOfYourBranch, setFieldValue]);

        return (
          <Form>
            <div className={InputStyles.formWrapper}>
              {/* <h2 className={InputStyles.title}>🏦 Bank Details</h2> */}

              {/* Primary Bank Info */}
              <div className={InputStyles.gridLayout}>
                <div>
                  <label htmlFor="bankAccountNumber" className={InputStyles.label}>
                    Bank Account Number
                  </label>
                  <Field
                    type="text"
                    name="bankAccountNumber"
                    id="bankAccountNumber"
                    className={InputStyles.input}
                  />
                  <ErrorMessage name="bankAccountNumber" />
                </div>

                <div>
                  <label htmlFor="ifscCodeOfYourBranch" className={InputStyles.label}>
                    IFSC code of your Branch
                  </label>
                  <Field
                    type="text"
                    name="ifscCodeOfYourBranch"
                    id="ifscCodeOfYourBranch"
                    className={InputStyles.input}
                    placeholder="e.g., HDFC0001234"
                  />
                  <ErrorMessage name="ifscCodeOfYourBranch" />
                </div>

                <div>
                  <label htmlFor="nameOfYourBank" className={InputStyles.label}>
                    Name of your Bank
                  </label>
                  <Field
                    type="text"
                    name="nameOfYourBank"
                    id="nameOfYourBank"
                    className={InputStyles.input}
                    readOnly
                  />
                  <ErrorMessage name="nameOfYourBank" />
                </div>
              </div>

              {/* Other Bank Accounts */}
              <h2 className={InputStyles.sectionTitle}>🧾 All Other Bank Accounts</h2>

              <FieldArray
                name="allOtherBankAccounts"
                render={(arrayHelpers) => (
                  <>
                    {values.allOtherBankAccounts.map((item, index) => (
                      <div key={index} className={InputStyles.fieldArrayWrapper}>
                        <button
                          type="button"
                          className={InputStyles.removeBtn}
                          onClick={() => arrayHelpers.remove(index)}
                          aria-label="Remove bank account"
                        >
                          ✕
                        </button>

                        <div>
                          <label className={InputStyles.label}>Bank A/C Number</label>
                          <Field
                            type="text"
                            name={`allOtherBankAccounts.${index}.BankAccountNo`}
                            className={InputStyles.input}
                          />
                          <ErrorMessage name={`allOtherBankAccounts.${index}.BankAccountNo`} />
                        </div>

                        <div>
                          <label className={InputStyles.label}>IFSC Code</label>
                          <Field
                            type="text"
                            name={`allOtherBankAccounts.${index}.IFSCCode`}
                            className={InputStyles.input}
                          />
                          <ErrorMessage name={`allOtherBankAccounts.${index}.IFSCCode`} />
                        </div>

                        <div>
                          <label className={InputStyles.label}>Bank Name</label>
                          <Field
                            type="text"
                            name={`allOtherBankAccounts.${index}.BankName`}
                            className={InputStyles.input}
                          />
                          <ErrorMessage name={`allOtherBankAccounts.${index}.BankName`} />
                        </div>

                        <div>
                          <label className={InputStyles.label}>Account Type</label>
                          <Field
                            as="select"
                            name={`allOtherBankAccounts.${index}.accountType`}
                            className={InputStyles.selectInput}
                          >
                            <option value="">Select</option>
                            <option value="Saving Account">Saving Account</option>
                            <option value="Current Account">Current Account</option>
                          </Field>
                          <ErrorMessage name={`allOtherBankAccounts.${index}.accountType`} />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className={InputStyles.addBtn}
                      onClick={() =>
                        arrayHelpers.push({
                          BankAccountNo: '',
                          IFSCCode: '',
                          BankName: '',
                          accountType: '',
                        })
                      }
                    >
                      + Add Another Bank Account
                    </button>
                  </>
                )}
              />

              {/* Additional Info */}
              <h2 className={InputStyles.sectionTitle}>📞 Additional Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={InputStyles.label}>Mobile Phone number (secondary)</label>
                  <Field
                    type="text"
                    name="mobilePhoneNumberSecondary"
                    className={InputStyles.input}
                  />
                  <ErrorMessage name="mobilePhoneNumberSecondary" />
                </div>

                <div>
                  <label className={InputStyles.label}>STD code</label>
                  <Field type="text" name="stdCode" className={InputStyles.input} />
                  <ErrorMessage name="stdCode" />
                </div>

                <div>
                  <label className={InputStyles.label}>Landline Telephone Number</label>
                  <Field
                    type="text"
                    name="landlineTelephoneNumber"
                    className={InputStyles.input}
                  />
                  <ErrorMessage name="landlineTelephoneNumber" />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center pt-4">
                <button type="submit" className={InputStyles.submitBtn}>
                  Save
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
