import { useContext } from "react";
import { StoreContext } from "@/store/store-context";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import Actions from "@/store/actions";

export default function OtherIncome({ setSection }) {
  const [state, dispatch] = useContext(StoreContext);

  const handleSubmit = (values) => {
    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        incomeSources: {
          ...state.itr.incomeSources,
          otherIncome: {
            totalOfAllOtherIncome: totalOtherIncome(values),
            interestIncome: {
              interestIncomeFromSavingBank: values.interestIncomeFromSavingBank,
              interestIncomeFromDeposits: values.interestIncomeFromDeposits,
              interestOnIncomeTaxRefund: values.interestOnIncomeTaxRefund,
              anyOtherInterestIncome: values.anyOtherInterestIncome,
            },
            otherIncome: {
              anyOtherIncome: values.anyOtherIncome,
            },
            exemptIncome: {
              dividendIncomeFromDomesticCompany:
                values.dividendIncomeFromDomesticCompany,
              dividendIncomeFromMutualFunds:
                values.dividendIncomeFromMutualFunds,
              interestIncomeFromPpf: values.interestIncomeFromPpf,
              anyOtherExemptIncome: values.anyOtherExemptIncome,
            },
            agricultureIncome: {
              grossAgricultureReceipt: values.grossAgricultureReceipt,
              expenditureOnAgriculture: values.expenditureOnAgriculture,
              unabsorbedAgricultureLoss: values.unabsorbedAgricultureLoss,
              netAgricultureReceipt: getAgriCulterIncome(values),
            },
            agricultureLandDetails: values.agricultureLandDetails,
          },
        },
      },
    });
    setSection("Business Profession");
  };

  const getAgriCulterIncome = (values) => {
    return (
      Number(values.grossAgricultureReceipt) +
      Number(values.expenditureOnAgriculture) +
      Number(values.unabsorbedAgricultureLoss)
    );
  };

  const totalOtherIncome = (values) => {
    const totalAgriCulterIncome = getAgriCulterIncome(values)
    return (
      Number(values.interestIncomeFromSavingBank) +
      Number(values.interestIncomeFromDeposits) +
      Number(values.interestOnIncomeTaxRefund) +
      Number(values.anyOtherInterestIncome) +
      Number(values.anyOtherIncome) +
      Number(values.dividendIncomeFromDomesticCompany) +
      Number(values.dividendIncomeFromMutualFunds) +
      Number(values.interestIncomeFromPpf) +
      Number(values.anyOtherExemptIncome) +
      Number(totalAgriCulterIncome)
    );
  };

  return (
    <Formik
      initialValues={{
        interestIncomeFromSavingBank: 0,
        interestIncomeFromDeposits: 0,
        interestOnIncomeTaxRefund: 0,
        anyOtherInterestIncome: 0,
        anyOtherIncome: 0,
        dividendIncomeFromDomesticCompany: 0,
        dividendIncomeFromMutualFunds: 0,
        interestIncomeFromPpf: 0,
        anyOtherExemptIncome: 0,
        grossAgricultureReceipt: 0,
        expenditureOnAgriculture: 0,
        unabsorbedAgricultureLoss: 0,
        agricultureLandDetails: [
          {
            nameOfDistrict: "",
            pincode: 0,
            measurement: 0,
            ownershipStatus: "",
            sourceOfWater: "",
          },
        ],
      }}
      validationSchema={Yup.object({
        interestIncomeFromSavingBank: Yup.number(),
        interestIncomeFromDeposits: Yup.number(),
        interestOnIncomeTaxRefund: Yup.number(),
        anyOtherInterestIncome: Yup.number(),
        anyOtherIncome: Yup.number(),
        dividendIncomeFromDomesticCompany: Yup.number(),
        dividendIncomeFromMutualFunds: Yup.number(),
        interestIncomeFromPpf: Yup.number(),
        anyOtherExemptIncome: Yup.number(),
        grossAgricultureReceipt: Yup.number(),
        expenditureOnAgriculture: Yup.number(),
        unabsorbedAgricultureLoss: Yup.number(),
        agricultureLandDetails: Yup.array().of(
          Yup.object().shape({
            nameOfDistrict: Yup.string(),
            pincode: Yup.number(),
            measurement: Yup.number(),
            ownershipStatus: Yup.string(),
            sourceOfWater: Yup.string(),
          })
        ),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values }) => (
        <>
          <Form>
            <div className="mx-auto max-w-4xl w-full px-4">
              <h3 className="border-b font-semibold mb-5">Interest Income</h3>
              <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="interestIncomeFromSavingBank"
                    className="text-sm font-medium"
                  >
                    Interest Income from Saving Bank
                  </label>
                  <Field
                    type="number"
                    name="interestIncomeFromSavingBank"
                    id="interestIncomeFromSavingBank"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="interestIncomeFromSavingBank" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="interestIncomeFromDeposits"
                    className="text-sm font-medium"
                  >
                    Interest Income from Deposits
                  </label>
                  <Field
                    type="number"
                    name="interestIncomeFromDeposits"
                    id="interestIncomeFromDeposits"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="interestIncomeFromDeposits" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="interestOnIncomeTaxRefund"
                    className="text-sm font-medium"
                  >
                    Interest on Income Tax Refund
                  </label>
                  <Field
                    type="number"
                    name="interestOnIncomeTaxRefund"
                    id="interestOnIncomeTaxRefund"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="interestOnIncomeTaxRefund" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="anyOtherInterestIncome"
                    className="text-sm font-medium"
                  >
                    Any Other Interest Income
                  </label>
                  <Field
                    type="number"
                    name="anyOtherInterestIncome"
                    id="anyOtherInterestIncome"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="anyOtherInterestIncome" />
                </div>
              </div>
              <h3 className="border-b font-semibold mb-5 mt-8">Other Income</h3>
              <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="anyOtherIncome"
                    className="text-sm font-medium"
                  >
                    Any Other Income
                  </label>
                  <Field
                    type="number"
                    id="anyOtherIncome"
                    name="anyOtherIncome"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="anyOtherIncome" />
                </div>
              </div>
              <h3 className="border-b font-semibold mb-5 mt-8">
                Exempt Income
              </h3>
              <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Dividend Income from Domestic Company
                  </label>
                  <Field
                    type="number"
                    name="dividendIncomeFromDomesticCompany"
                    id="dividendIncomeFromDomesticCompany"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="dividendIncomeFromDomesticCompany" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="dividendIncomeFromMutualFunds"
                    className="text-sm font-medium"
                  >
                    Dividend Income from Mutual Funds
                  </label>
                  <Field
                    type="number"
                    name="dividendIncomeFromMutualFunds"
                    id="dividendIncomeFromMutualFunds"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="dividendIncomeFromMutualFunds" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="interestIncomeFromPpf"
                    className="text-sm font-medium"
                  >
                    Interest Income from PPF
                  </label>
                  <Field
                    type="number"
                    name="interestIncomeFromPpf"
                    id="interestIncomeFromPpf"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="interestIncomeFromPpf" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="anyOtherExemptIncome"
                    className="text-sm font-medium"
                  >
                    Any Other Exempt Income
                  </label>
                  <Field
                    type="number"
                    name="anyOtherExemptIncome"
                    id="anyOtherExemptIncome"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="anyOtherExemptIncome" />
                </div>
              </div>
              <h3 className="border-b font-semibold mb-5 mt-8">
                Agriculture Income
              </h3>
              <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="grossAgricultureReceipt"
                    className="text-sm font-medium"
                  >
                    Gross Agriculture Receipt
                  </label>
                  <Field
                    type="number"
                    name="grossAgricultureReceipt"
                    id="grossAgricultureReceipt"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="grossAgricultureReceipt" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="expenditureOnAgriculture"
                    className="text-sm font-medium"
                  >
                    Expenditure On Agriculture
                  </label>
                  <Field
                    type="number"
                    name="expenditureOnAgriculture"
                    id="expenditureOnAgriculture"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="expenditureOnAgriculture" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="unabsorbedAgricultureLoss"
                    className="text-sm font-medium"
                  >
                    Unabsorbed Agriculture Loss
                  </label>
                  <Field
                    type="number"
                    name="unabsorbedAgricultureLoss"
                    id="unabsorbedAgricultureLoss"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  />
                  <ErrorMessage name="unabsorbedAgricultureLoss" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="netAgricultureReceipt"
                    className="text-sm font-medium"
                  >
                    Net Agriculture Receipt
                  </label>
                  <div
                    type="number"
                    id="netAgricultureReceipt"
                    className="h-12 flex items-center px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                  >
                    {getAgriCulterIncome(values)}
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <h3 className="border-b font-semibold mb-5 mt-8">
                    Agriculture Land Details
                  </h3>

                  <FieldArray
                    name="agricultureLandDetails"
                    render={(arrayHelpers) => {
                      const agricultureLandDetails =
                        values.agricultureLandDetails;
                      return (
                        <div>
                          {agricultureLandDetails &&
                            agricultureLandDetails.map((item, index) => (
                              <div key={index}>
                                <button
                                  type="button"
                                  className="block font-bold my-3 bg-blue-600 rounded-md px-2 text-white ml-auto"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  &#10007;
                                </button>
                                <div
                                  key={index}
                                  className="md:grid md:grid-cols-5 flex flex-col gap-5 mb-5"
                                >
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor={"nameOfDistrict"}
                                      className="text-sm font-medium"
                                    >
                                      Name Of District
                                    </label>
                                    <Field
                                      type="text"
                                      name={`agricultureLandDetails.${index}.nameOfDistrict`}
                                      id={"nameOfDistrict"}
                                      className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                                    />
                                    <ErrorMessage
                                      name={`agricultureLandDetails.${index}.nameOfDistrict`}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor={"pincode"}
                                      className="text-sm font-medium"
                                    >
                                      Pincode
                                    </label>
                                    <Field
                                      type="number"
                                      name={`agricultureLandDetails.${index}.pincode`}
                                      id={"pincode"}
                                      className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                                    />
                                    <ErrorMessage
                                      name={`agricultureLandDetails.${index}.pincode`}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor={"measurement"}
                                      className="text-sm font-medium"
                                    >
                                      Measurement (Acres)
                                    </label>
                                    <Field
                                      type="number"
                                      name={`agricultureLandDetails.${index}.measurement`}
                                      id={"measurement"}
                                      className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                                    />
                                    <ErrorMessage
                                      name={`agricultureLandDetails.${index}.measurement`}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor={"ownershipStatus"}
                                      className="text-sm font-medium"
                                    >
                                      Ownership Status
                                    </label>
                                    <Field
                                      as="select"
                                      name={`agricultureLandDetails.${index}.ownershipStatus`}
                                      id={"ownershipStatus"}
                                      className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                                    >
                                      <option value="">--Select--</option>
                                      <option value="Owned">Owned</option>
                                      <option value="Held on Lease">
                                        Held on Lease
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name={`agricultureLandDetails.${index}.ownershipStatus`}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <label
                                      htmlFor={"sourceOfWater"}
                                      className="text-sm font-medium"
                                    >
                                      Source of water
                                    </label>
                                    <Field
                                      id={"sourceOfWater"}
                                      name={`agricultureLandDetails.${index}.sourceOfWater`}
                                      as="select"
                                      className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                                    >
                                      <option value="">--Select--</option>
                                      <option value="Irrigated">
                                        Irrigated
                                      </option>
                                      <option value="Rain-Fed">Rain-Fed</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`agricultureLandDetails.${index}.sourceOfWater`}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          <button
                            type="button"
                            className="block font-semibold px-5 text-blue-600 mt-3 ml-auto"
                            onClick={() =>
                              arrayHelpers.push({
                                nameOfDistrict: "",
                                pincode: "",
                                measurement: 0,
                                ownershipStatus: "",
                                sourceOfWater: "",
                              })
                            }
                          >
                            Add an Owner
                          </button>
                        </div>
                      );
                    }}
                  />
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
        </>
      )}
    </Formik>
  );
}
