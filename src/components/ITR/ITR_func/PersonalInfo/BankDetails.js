
"use client";




import { useContext, useState, useEffect, useRef } from "react";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx/index";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { ifscRegex } from "../../../regexPatterns";
import userAxios from "@/lib/userAxios";
import { InputStyles } from "@/app/styles/InputStyles";

export default function BankInfo({ setSection }) {
    const { token } = useAuth();
    const [state, dispatch] = useContext(StoreContext);
    const ifsc = useRef();
    const [bankName, setBankName] = useState("");

    const handleSubmit = (values) => {
        console.log(values);
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
                            mobilePhoneNumberSecondary:
                                values.mobilePhoneNumberSecondary,
                            stdCode: values.stdCode,
                            landlineTelephoneNumber:
                                values.landlineTelephoneNumber,
                        },
                    },
                },
            },
        });
        setSection("Address");
    };

    const checkIFSC = (ifsc) => {
        return ifscRegex.test(ifsc);
    };

    const fetchBank = async () => {
        if (!token) {
            return toast("Login to fetch BANK details", { type: "error" });
        }

        const url = "https://mom.itaxeasy.com/api/bank/get-details";
        const ifscCode = ifsc.current.value;

        const res = await userAxios.post(url, JSON.stringify({ ifsc: ifscCode }));
        const jsonData = await res.json();
        setBankName(jsonData?.data?.BANK);
    };

    useEffect(() => {
        if (checkIFSC(ifsc.current?.value)) {
            toast("Valid IFSC Code", { type: "success" });
            fetchBank();
        } else {
            return;
        }
    }, [ifsc.current?.value]);

    return (
        <Formik
            initialValues={{
                bankAccountNumber: "",
                ifscCodeOfYourBranch: "",
                nameOfYourBank: bankName,
                allOtherBankAccounts: [
                    {
                        BankAccountNo: 0,
                        IFSCCode: "",
                        BankName: "",
                        accountType: "",
                    },
                ],
                mobilePhoneNumberSecondary: "",
                stdCode: "",
                landlineTelephoneNumber: "",
            }}
            validationSchema={Yup.object({
                bankAccountNumber: Yup.string(),
                ifscCodeOfYourBranch: Yup.string().matches(
                    ifscRegex,
                    "Invalid IFSC Code",
                ),
                nameOfYourBank: Yup.string(),
                allOtherBankAccounts: Yup.array().of(
                    Yup.object().shape({
                        BankAccountNo: Yup.number(),
                        IFSCCode: Yup.string(),
                        BankName: Yup.string(),
                        accountType: Yup.string(),
                    }),
                ),
                mobilePhoneNumberSecondary: Yup.string(),
                stdCode: Yup.string(),
                landlineTelephoneNumber: Yup.string(),
            })}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values }) => (
                <Form>
                    <div className="mx-auto max-w-4xl w-full">
                        <div className="md:grid md:grid-cols-2 flex flex-col px-4 gap-5">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="bankAccountNumber"
                                    className={InputStyles.label}
                                >
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
                            <div className="flex flex-col">
                                <label
                                    htmlFor="ifscCodeOfYourBranch"
                                    className={InputStyles.label}
                                >
                                    IFSC code of your Branch
                                </label>
                                <Field
                                    type="text"
                                    ref={ifsc}
                                    name="ifscCodeOfYourBranch"
                                    className={InputStyles.input}
                                    id="ifscCodeOfYourBranch"
                                />
                                <ErrorMessage
                                    component="span"
                                    className="text-red-500"
                                    name="ifscCodeOfYourBranch"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="nameOfYourBank"
                                    className={InputStyles.label}
                                >
                                    Name of your Bank
                                </label>
                                <Field
                                    type="text"
                                    name="nameOfYourBank"
                                    id="nameOfYourBank"
                                    className={InputStyles.input}
                                />
                                <ErrorMessage name="nameOfYourBank" />
                            </div>
                        </div>

                        <h3 className="border-b px-4 font-semibold mb-5 mt-8">
                            All Other Bank Accounts
                        </h3>
                        <div>
                            <FieldArray
                                name="allOtherBankAccounts"
                                render={(arrayHelpers) => {
                                    const allOtherBankAccounts =
                                        values.allOtherBankAccounts;
                                    return (
                                        <>
                                            {allOtherBankAccounts.map(
                                                (items, index) => (
                                                    <div
                                                        key={index}
                                                        className="md:grid md:grid-cols-4 flex flex-col px-4 gap-5 mb-5 relative"
                                                    >
                                                        <button
                                                            className="absolute right-1 -top-5 font-bold my-3 bg-blue-600 rounded-md px-2 text-white"
                                                            name={index}
                                                            onClick={() =>
                                                                arrayHelpers.remove(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            &#10007;
                                                        </button>
                                                        <div className="flex flex-col">
                                                            <label
                                                                htmlFor={
                                                                    "BankAccountNo"
                                                                }
                                                                className={
                                                                    InputStyles.label
                                                                }
                                                            >
                                                                Bank A/C Number
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                name={`allOtherBankAccounts.${index}.BankAccountNo`}
                                                                id={
                                                                    "BankAccountNo"
                                                                }
                                                                className={
                                                                    InputStyles.input
                                                                }
                                                            />
                                                            <ErrorMessage name="BankAccountNo" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label
                                                                htmlFor={
                                                                    "IFSCCode"
                                                                }
                                                                className={
                                                                    InputStyles.label
                                                                }
                                                            >
                                                                IFSC code
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                name={`allOtherBankAccounts.${index}.IFSCCode`}
                                                                id={"IFSCCode"}
                                                                className={
                                                                    InputStyles.input
                                                                }
                                                            />
                                                            <ErrorMessage name="IFSCCode" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label
                                                                htmlFor={
                                                                    "BankName"
                                                                }
                                                                className={
                                                                    InputStyles.label
                                                                }
                                                            >
                                                                Bank Name
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                name={`allOtherBankAccounts.${index}.BankName`}
                                                                id={"BankName"}
                                                                className={
                                                                    InputStyles.selectInput
                                                                }
                                                            />
                                                            <ErrorMessage name="BankName" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label
                                                                htmlFor={
                                                                    "accountType"
                                                                }
                                                                className={
                                                                    InputStyles.label
                                                                }
                                                            >
                                                                Account Type
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                name={`allOtherBankAccounts.${index}.accountType`}
                                                                id={
                                                                    "accountType"
                                                                }
                                                                className={
                                                                    InputStyles.selectInput
                                                                }
                                                            >
                                                                <option value="Saving Account">
                                                                    Saving
                                                                    Account
                                                                </option>
                                                                <option value="Current Account">
                                                                    Current
                                                                    Account
                                                                </option>
                                                            </Field>
                                                            <ErrorMessage name="accountType" />
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                            <button
                                                type="button"
                                                className="block font-semibold px-5 text-blue-600 mt-3 ml-auto"
                                                onClick={() =>
                                                    arrayHelpers.push({
                                                        BankAccountNo: 0,
                                                        IFSCCode: "",
                                                        BankName: "",
                                                        accountType: "",
                                                    })
                                                }
                                            >
                                                Add an Owner
                                            </button>
                                        </>
                                    );
                                }}
                            />
                        </div>

                        <h3 className="border-b px-4 font-semibold mb-5 mt-8">
                            Additional Information needed for Income Tax Return
                        </h3>
                        <div className="md:grid md:grid-cols-2 flex flex-col px-4 gap-5">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="mobilePhoneNumberSecondary"
                                    className={InputStyles.label}
                                >
                                    Mobile Phone number (secondary)
                                </label>
                                <Field
                                    type="text"
                                    name="mobilePhoneNumberSecondary"
                                    id="mobilePhoneNumberSecondary"
                                    className={InputStyles.input}
                                />
                                <ErrorMessage name="mobilePhoneNumberSecondary" />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="stdCode"
                                    className={InputStyles.label}
                                >
                                    STD code
                                </label>
                                <Field
                                    type="text"
                                    name="stdCode"
                                    id="stdCode"
                                    className={InputStyles.input}
                                />
                                <ErrorMessage name="stdCode" />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="landlineTelephoneNumber"
                                    className={InputStyles.label}
                                >
                                    Landline Telephone number
                                </label>
                                <Field
                                    type="text"
                                    name="landlineTelephoneNumber"
                                    id="landlineTelephoneNumber"
                                    className={InputStyles.input}
                                />
                                <ErrorMessage name="landlineTelephoneNumber" />
                            </div>
                        </div>
                        <div className="flex mt-10">
                            <button
                                type="submit"
                                className="transition-colors bg-primary hover:bg-blue-950 px-16 py-3 text-white rounded-md font-semibold text-sm cursor-pointer col-span-2 mx-auto"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
