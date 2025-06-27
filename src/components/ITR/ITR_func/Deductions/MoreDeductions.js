"use client";
import { useContext, useState } from "react";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputStyles } from "@/app/styles/InputStyles";

export default function MoreDeductions({ setSection }) {
  const [state, dispatch] = useContext(StoreContext);
  // const [form, setForm] = useState(state.itr.deductions.moreDeductions);

  const formik = useFormik({
    initialValues: {
      forParents: "",
      medicalInsurancePremium_forSelfAndFamily: 0,
      medicalInsurancePremium_forParents: 0,
      preventiveHealthCheckUpFees_forSelfAndFamily: 0,
      preventiveHealthCheckUpFees_forParents: 0,
      interestOnHigherEducationLoanPaidThisYear: 0,
      contributionAmountToPensionPlanAnnuityFundForSection80Ccc: 0,
      contributionTowardsSection80Ccd1: 0,
      employersContributionTowardsNpsUpto10OfSalary: 0,
      investmentMadeUnderRajivGandhiEquitySavingScheme: 0,
      rentPaidPerMonth: 0,
      numberOfMonthsRentPaid: 0,
      medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb: 0,
      aageOfPersonForWhomDeductionIsBeingClaimed: "",
      deductionsUnderSection80Ee: 0,
      section80QqbRoyaltyReceivedOnBooks: 0,
      section80RrbIncomeOnPatentsInventions: 0,
      contributionOrDonationsToPoliticalParty: 0,
      deductionExemptingProfitsFromBioDegradableWasteBusiness: 0,

      nameOfDonee: "",
      donationAmountCash: 0,
      donationAmountOtherModesLikeEPayChequeDdEtc: 0,
      panOfDonee: "",
      limitOnDeduction: "",
      qualifyingPercentage: "",

      pincode: 0,
      addressLine: "",
      city: "",
      state: "",
    },
    validationSchema: new Yup.ObjectSchema({
      medicalInsurancePremium_forSelfAndFamily:
        Yup.number().typeError("Invalid number"),
      preventiveHealthCheckUpFees_forSelfAndFamily:
        Yup.number().typeError("Invalid number"),
      forParents: Yup.string(),
      medicalInsurancePremium_forParents:
        Yup.number().typeError("Invalid number"),
      preventiveHealthCheckUpFees_forParents:
        Yup.number().typeError("Invalid number"),
      interestOnHigherEducationLoanPaidThisYear:
        Yup.number().typeError("Invalid number"),
      contributionAmountToPensionPlanAnnuityFundForSection80Ccc:
        Yup.number().typeError("Invalid number"),
      contributionTowardsSection80Ccd1:
        Yup.number().typeError("Invalid number"),
      employersContributionTowardsNpsUpto10OfSalary:
        Yup.number().typeError("Invalid number"),
      investmentMadeUnderRajivGandhiEquitySavingScheme:
        Yup.number().typeError("Invalid number"),
      amountOfRentPaid: Yup.number().typeError("Invalid number"),
      rentPaidPerMonth: Yup.number().typeError("Invalid number"),
      numberOfMonthsRentPaid: Yup.number().typeError("Invalid number"),
      medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb:
        Yup.number().typeError("Invalid number"),
      ageOfPersonForWhomDeductionIsBeingClaimed: Yup.string(),
      deductionsUnderSection80Ee: Yup.number().typeError("Invalid number"),
      section80QqbRoyaltyReceivedOnBooks:
        Yup.number().typeError("Invalid number"),
      section80RrbIncomeOnPatentsInventions:
        Yup.number().typeError("Invalid number"),
      contributionOrDonationsToPoliticalParty:
        Yup.number().typeError("Invalid number"),
      deductionExemptingProfitsFromBioDegradableWasteBusiness:
        Yup.number().typeError("Invalid number"),

      nameOfDonee: Yup.string(),
      donationAmountCash: Yup.number().typeError("Invalid number"),
      donationAmountOtherModesLikeEPayChequeDdEtc:
        Yup.number().typeError("Invalid number"),
      panOfDonee: Yup.string(),
      limitOnDeduction: Yup.string(),
      qualifyingPercentage: Yup.string(),

      pincode: Yup.number().typeError("Invalid number"),
      addressLine: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  function handleSubmit(values) {
    const deduction = totalDeduction(values);

    dispatch({
      type: Actions.ITR,
      payload: {
        ...state.itr,
        deductions: {
          ...state.itr.deductions,
          moreDeductions: {
            amountOfTotalMoreDeductions: deduction[0].total,
            section80DDeductionsForMedicalInsurance: {
              medicalInsurancePremium_forSelfAndFamily:
                values.medicalInsurancePremium_forSelfAndFamily,
              preventiveHealthCheckUpFees_forSelfAndFamily:
                values.preventiveHealthCheckUpFees_forSelfAndFamily,
              forParents: values.forParents,
              medicalInsurancePremium_forParents:
                values.medicalInsurancePremium_forParents,
              preventiveHealthCheckUpFees_forParents:
                values.preventiveHealthCheckUpFees_forParents,
            },
            section80EEducationLoanOnHigherStudiesGraduateOrPostGraduate: {
              interestOnHigherEducationLoanPaidThisYear:
                values.interestOnHigherEducationLoanPaidThisYear,
            },
            section80CccContributionToPensionPlanAnnuityFund: {
              contributionAmountToPensionPlanAnnuityFundForSection80Ccc:
                values.contributionAmountToPensionPlanAnnuityFundForSection80Ccc,
            },
            section80Ccd1And1BEmployeeContributionToNewPensionSchemeNps: {
              contributionTowardsSection80Ccd1:
                values.contributionTowardsSection80Ccd1,
            },
            section80Ccd2EmployerContributionInNps: {
              employersContributionTowardsNpsUpto10OfSalary:
                values.employersContributionTowardsNpsUpto10OfSalary,
            },
            section80CcgRajivGandhiEquitySavingScheme: {
              investmentMadeUnderRajivGandhiEquitySavingScheme:
                values.investmentMadeUnderRajivGandhiEquitySavingScheme,
            },
            section80GgDeductionForHouseRentSelfEmployedOrSalaryWithNoHra: {
              amountOfRentPaid:
                values.rentPaidPerMonth * values.numberOfMonthsRentPaid,
              rentPaidPerMonth: values.rentPaidPerMonth,
              numberOfMonthsRentPaid: values.numberOfMonthsRentPaid,
            },
            section80DdbDeductionsForTreatmentOfSpecifiedDiseasesAndAilments: {
              medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb:
                values.medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb,
              ageOfPersonForWhomDeductionIsBeingClaimed:
                values.aageOfPersonForWhomDeductionIsBeingClaimed,
            },
            section80EeInterestOnHomeLoan: {
              deductionsUnderSection80Ee: values.deductionsUnderSection80Ee,
            },
            section80QqbRoyaltyReceivedOnBooks: {
              deductionAmount: values.section80QqbRoyaltyReceivedOnBooks,
            },
            section80RrbIncomeOnPatentsInventions: {
              deductionAmount: values.section80RrbIncomeOnPatentsInventions,
            },
            section80GgcContributionToPoliticalParty: {
              contributionOrDonationsToPoliticalParty:
                values.contributionOrDonationsToPoliticalParty,
            },
            section80Jja: {
              deductionExemptingProfitsFromBioDegradableWasteBusiness:
                values.deductionExemptingProfitsFromBioDegradableWasteBusiness,
            },
            section80GgaDonationsForScientificResearchOrRuralDevelopment: {
              detailsOfDonee: {
                nameOfDonee: values.nameOfDonee,
                donationAmountCash: values.donationAmountCash,
                donationAmountOtherModesLikeEPayChequeDdEtc:
                  values.donationAmountOtherModesLikeEPayChequeDdEtc,
                panOfDonee: values.panOfDonee,
                limitOnDeduction: values.limitOnDeduction,
                qualifyingPercentage: values.qualifyingPercentage,
              },
              addressOfDonee: {
                pincode: values.pincode,
                addressLine: values.addressLine,
                city: values.city,
                state: values.state,
              },
            },
            allowedVal: {
              ...deduction[1]
            }
          },
        },
      },
    });
    setSection("Other Deductions");
  }

  function totalDeduction(values) {
    const moreDeduction = state.itr.deductions.moreDeductions;

    const LIMIT_donation_Gga = values.qualifyingPercentage;
    const LIMIT_1 = 25000;
    const LIMIT_2 = 50000;
    const LIMIT_3 = 200000;
    const LIMIT_4 = 300000;
    const LIMIT_SECTION_80GGC = "100%";

    let medicalInsurancePremiumSelf =
      values.medicalInsurancePremium_forSelfAndFamily;
    let medicalInsurancePremiumParents =
      values.medicalInsurancePremium_forParents;
    let HealthCheckUpFeesSelf =
      values.preventiveHealthCheckUpFees_forSelfAndFamily;
    let HealthCheckUpFeesParents =
      values.preventiveHealthCheckUpFees_forParents;
    let section80E = values.interestOnHigherEducationLoanPaidThisYear;
    let section80Ccc =
      values.contributionAmountToPensionPlanAnnuityFundForSection80Ccc;
    let section80Ccd1And1B = values.contributionTowardsSection80Ccd1;
    let section80Ccd2 = values.employersContributionTowardsNpsUpto10OfSalary;
    let section80Ccg = values.investmentMadeUnderRajivGandhiEquitySavingScheme;
    let section80Gg = values.rentPaidPerMonth * values.numberOfMonthsRentPaid;
    let section80Ddb =
      values.medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb;
    let section80Ee = values.deductionsUnderSection80Ee;
    let section80Qqb = values.section80QqbRoyaltyReceivedOnBooks;
    let section80Rrb = values.section80RrbIncomeOnPatentsInventions;
    let section80Ggc = values.contributionOrDonationsToPoliticalParty;
    let section80Jja =
      values.deductionExemptingProfitsFromBioDegradableWasteBusiness;
    let section80Gga =
      values.donationAmountCash +
      values.donationAmountOtherModesLikeEPayChequeDdEtc;

    let isSenior =
      moreDeduction.section80DDeductionsForMedicalInsurance.forParents ===
      "Senior Citizen";

    const LIMIT_PARENT_AGE = isSenior ? LIMIT_2 : LIMIT_1;

    // checks

    medicalInsurancePremiumSelf >= LIMIT_1
      ? (medicalInsurancePremiumSelf = LIMIT_1)
      : null;
    HealthCheckUpFeesSelf >= LIMIT_1 ? (HealthCheckUpFeesSelf = LIMIT_1) : null;
    medicalInsurancePremiumParents >= LIMIT_PARENT_AGE
      ? (medicalInsurancePremiumParents = LIMIT_PARENT_AGE)
      : null;
    HealthCheckUpFeesParents >= LIMIT_PARENT_AGE
      ? (HealthCheckUpFeesParents = LIMIT_PARENT_AGE)
      : null;
    section80Ccc >= LIMIT_2 ? (section80Ccc = LIMIT_2) : null;
    section80Ccd1And1B >= LIMIT_2 ? (section80Ccc = LIMIT_2) : null;
    section80Ccd2 >= LIMIT_2 ? (section80Ccd2 = LIMIT_2) : null;
    section80Ccg >= LIMIT_1 ? (section80Ccg = LIMIT_1) : null;
    section80Ddb >= LIMIT_1 ? (section80Ddb = LIMIT_1) : null;
    section80Ee >= LIMIT_3 ? (section80Ee = LIMIT_3) : null;
    section80Qqb >= LIMIT_4 ? (section80Qqb = LIMIT_4) : null;
    section80Rrb >= LIMIT_4 ? (section80Rrb = LIMIT_4) : null;
    section80Gga && LIMIT_donation_Gga === "50%"
      ? (section80Gga = section80Gga / 2)
      : null;

    const total = 
    Number(medicalInsurancePremiumSelf) +
    Number(medicalInsurancePremiumParents) +
    Number(HealthCheckUpFeesSelf) +
    Number(HealthCheckUpFeesParents) +
    Number(section80E) +
    Number(section80Ccc) +
    Number(section80Ccd1And1B) +
    Number(section80Ccd2) +
    Number(section80Ccg) +
    Number(section80Gg) +
    Number(section80Ddb) +
    Number(section80Ee) +
    Number(section80Qqb) +
    Number(section80Rrb) +
    Number(section80Ggc) +
    Number(section80Jja) +
    Number(section80Gga)

    return (
      [
        { total },
      {
        medicalInsurancePremiumSelf,
        medicalInsurancePremiumParents,
        HealthCheckUpFeesSelf,
        HealthCheckUpFeesParents,
        section80E,
        section80Ccc,
        section80Ccd1And1B,
        section80Ccd2,
        section80Ccg,
        section80Gg,
        section80Ddb,
        section80Ee,
        section80Qqb,
        section80Rrb,
        section80Ggc,
        section80Jja,
        section80Gga,
        }
    ]
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mx-auto max-w-4xl w-full px-4">
        <h3 className="border-b font-semibold mb-5">
          Section 80D: Deductions for Medical Insurance
        </h3>
        <div className="md:grid md:grid-cols-3 flex flex-col gap-5">
          <p></p>
          <p className="text-center">For Self and Family</p>
          <p className="text-center flex flex-col">
            For Parents
            <select
              className={InputStyles.selectInput}
              name="forParents"
              id="forParents"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.forParents}
            >
              <option value="Non-Senior Citizen">Non-Senior Citizen</option>
              <option value="Senior Citizen">Senior Citizen</option>
            </select>
            {formik.touched.forParents && formik.errors.forParents ? (
              <div>{formik.errors.forParents}</div>
            ) : null}
          </p>
          <label
            htmlFor="medicalInsurancePremium_forSelfAndFamily"
            className="font-medium flex items-center"
          >
            Medical Insurance Premium
          </label>
          <div className="flex flex-col">
            <input
              type="number"
              name="medicalInsurancePremium_forSelfAndFamily"
              id="medicalInsurancePremium_forSelfAndFamily"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.medicalInsurancePremium_forSelfAndFamily}
            />
            {formik.touched.medicalInsurancePremium_forSelfAndFamily &&
            formik.errors.medicalInsurancePremium_forSelfAndFamily ? (
              <div>
                {formik.errors.medicalInsurancePremium_forSelfAndFamily}
              </div>
            ) : null}
            <small className="ml-auto">Max: 25,000</small>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="medicalInsurancePremium_forParents"
              id="medicalInsurancePremium_forParents"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.medicalInsurancePremium_forParents}
            />
            {formik.touched.medicalInsurancePremium_forParents &&
            formik.errors.medicalInsurancePremium_forParents ? (
              <div>{formik.errors.medicalInsurancePremium_forParents}</div>
            ) : null}
            <small className="ml-auto">
              Max:{" "}
              {formik.values.forParents === "Non-Senior Citizen"
                ? "25,000"
                : "50,000"}
            </small>
          </div>
          <p className="col-span-3 text-sm">
            Medical insurance premium paid by you for Self, Spouse, Dependent
            Children and Parents.
          </p>
          <label
            htmlFor="preventiveHealthCheckUpFees_forSelfAndFamily"
            className="text-sm font-medium flex items-center"
          >
            Preventive Health Check-Up Fees
          </label>
          <div className="flex flex-col">
            <input
              type="text"
              name="preventiveHealthCheckUpFees_forSelfAndFamily"
              className={InputStyles.input}
              id="preventiveHealthCheckUpFees_forSelfAndFamily"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.preventiveHealthCheckUpFees_forSelfAndFamily}
            />
            {formik.touched.preventiveHealthCheckUpFees_forSelfAndFamily &&
            formik.errors.preventiveHealthCheckUpFees_forSelfAndFamily ? (
              <div>
                {formik.errors.preventiveHealthCheckUpFees_forSelfAndFamily}
              </div>
            ) : null}
            <small className="ml-auto">Max: 25,000</small>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="preventiveHealthCheckUpFees_forParents"
              id="preventiveHealthCheckUpFees_forParents"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.preventiveHealthCheckUpFees_forParents}
            />
            {formik.touched.preventiveHealthCheckUpFees_forParents &&
            formik.errors.preventiveHealthCheckUpFees_forParents ? (
              <div>{formik.errors.preventiveHealthCheckUpFees_forParents}</div>
            ) : null}
            <small className="ml-auto">
              Max:{" "}
              {formik.values.forParents === "Non-Senior Citizen"
                ? "25,000"
                : "50,000"}
            </small>
          </div>
          <p className="col-span-3 text-sm">
            Health check-up expenses paid by you for Self, Spouse, Dependent
            Children and Parents.
          </p>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80E - Education Loan on higher studies (Graduate or
          PostGraduate)
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="interestOnHigherEducationLoanPaidThisYear"
              className={InputStyles.label}
            >
              Interest on higher education loan paid this year
            </label>
            <input
              type="text"
              name="interestOnHigherEducationLoanPaidThisYear"
              id="interestOnHigherEducationLoanPaidThisYear"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.interestOnHigherEducationLoanPaidThisYear}
            />
            {formik.touched.interestOnHigherEducationLoanPaidThisYear &&
            formik.errors.interestOnHigherEducationLoanPaidThisYear ? (
              <div>
                {formik.errors.interestOnHigherEducationLoanPaidThisYear}
              </div>
            ) : null}
            <small className="ml-auto">Max: 100%</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80CCC - Contribution to Pension Plan / Annuity Fund
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="contributionAmountToPensionPlanAnnuityFundForSection80Ccc"
              className={InputStyles.label}
            >
              Contribution amount to Pension Plan / Annuity Fund for Section
              80CCC
            </label>
            <input
              type="text"
              name="contributionAmountToPensionPlanAnnuityFundForSection80Ccc"
              id="contributionAmountToPensionPlanAnnuityFundForSection80Ccc"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={
                formik.values
                  .contributionAmountToPensionPlanAnnuityFundForSection80Ccc
              }
            />
            {formik.touched
              .contributionAmountToPensionPlanAnnuityFundForSection80Ccc &&
            formik.errors
              .contributionAmountToPensionPlanAnnuityFundForSection80Ccc ? (
              <div>
                {
                  formik.errors
                    .contributionAmountToPensionPlanAnnuityFundForSection80Ccc
                }
              </div>
            ) : null}
            <small className="ml-auto">Max: 50,000</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80CCD (1) and (1B) - Employee Contribution to New Pension
          Scheme (NPS).
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="contributionTowardsSection80Ccd1"
              className={InputStyles.label}
            >
              Contribution towards Section 80CCD(1)
            </label>
            <input
              type="text"
              name="contributionTowardsSection80Ccd1"
              id="contributionTowardsSection80Ccd1"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contributionTowardsSection80Ccd1}
            />
            {formik.touched.contributionTowardsSection80Ccd1 &&
            formik.errors.contributionTowardsSection80Ccd1 ? (
              <div>{formik.errors.contributionTowardsSection80Ccd1}</div>
            ) : null}
            <small className="ml-auto">Max: 50,000</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80CCD(2) - Employer Contribution in NPS
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="employersContributionTowardsNpsUpto10OfSalary"
              className={InputStyles.label}
            >
              Employers contribution towards NPS (upto 10% of Salary).
            </label>
            <input
              type="text"
              name="employersContributionTowardsNpsUpto10OfSalary"
              id="employersContributionTowardsNpsUpto10OfSalary"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={
                formik.values.employersContributionTowardsNpsUpto10OfSalary
              }
            />
            {formik.touched.employersContributionTowardsNpsUpto10OfSalary &&
            formik.errors.employersContributionTowardsNpsUpto10OfSalary ? (
              <div>
                {formik.errors.employersContributionTowardsNpsUpto10OfSalary}
              </div>
            ) : null}
            <small className="ml-auto">Max: 50,000</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80CCG - Rajiv Gandhi Equity Saving Scheme
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="investmentMadeUnderRajivGandhiEquitySavingScheme"
              className={InputStyles.label}
            >
              Investment made under Rajiv Gandhi Equity Saving Scheme
            </label>
            <input
              type="text"
              name="investmentMadeUnderRajivGandhiEquitySavingScheme"
              id="investmentMadeUnderRajivGandhiEquitySavingScheme"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={
                formik.values.investmentMadeUnderRajivGandhiEquitySavingScheme
              }
            />
            {formik.touched.investmentMadeUnderRajivGandhiEquitySavingScheme &&
            formik.errors.investmentMadeUnderRajivGandhiEquitySavingScheme ? (
              <div>
                {formik.errors.investmentMadeUnderRajivGandhiEquitySavingScheme}
              </div>
            ) : null}
            <small className="ml-auto">Max: 25,000</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80GG - Deduction for House Rent. Self-employed or Salary with
          no HRA.
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="rentPaidPerMonth" className={InputStyles.label}>
              Rent Paid Per Month
            </label>
            <input
              type="text"
              name="rentPaidPerMonth"
              id="rentPaidPerMonth"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rentPaidPerMonth}
            />
            {formik.touched.rentPaidPerMonth &&
            formik.errors.rentPaidPerMonth ? (
              <div>{formik.errors.rentPaidPerMonth}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="numberOfMonthsRentPaid"
              className={InputStyles.label}
            >
              Number of Months Rent Paid
            </label>
            <select
              name="numberOfMonthsRentPaid"
              id="numberOfMonthsRentPaid"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.numberOfMonthsRentPaid}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            {formik.touched.numberOfMonthsRentPaid &&
            formik.errors.numberOfMonthsRentPaid ? (
              <div>{formik.errors.numberOfMonthsRentPaid}</div>
            ) : null}
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80DDB: Deductions for treatment of specified diseases and
          ailments
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb"
              className={InputStyles.label}
            >
              Medical Treatment Costs for specified Diseases under Section 80DDB
            </label>
            <input
              type="text"
              name="medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb"
              id="medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={
                formik.values
                  .medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb
              }
            />
            {formik.touched
              .medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb &&
            formik.errors
              .medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb ? (
              <div>
                {
                  formik.errors
                    .medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb
                }
              </div>
            ) : null}
            <small className="ml-auto">Max: 25,000</small>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="aageOfPersonForWhomDeductionIsBeingClaimed"
              className={InputStyles.label}
            >
              Age of person for whom deduction is being claimed
            </label>
            <select
              name="aageOfPersonForWhomDeductionIsBeingClaimed"
              id="aageOfPersonForWhomDeductionIsBeingClaimed"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.aageOfPersonForWhomDeductionIsBeingClaimed}
            >
              <option value="Below 60 years">Below 60 years</option>
              <option value="60 years and above">60 years and above</option>
            </select>
            {formik.touched.aageOfPersonForWhomDeductionIsBeingClaimed &&
            formik.errors.aageOfPersonForWhomDeductionIsBeingClaimed ? (
              <div>
                {formik.errors.aageOfPersonForWhomDeductionIsBeingClaimed}
              </div>
            ) : null}
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80EE - Interest on Home Loan
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="deductionsUnderSection80Ee"
              className={InputStyles.label}
            >
              Deductions under Section 80EE
            </label>
            <input
              type="text"
              name="deductionsUnderSection80Ee"
              className={InputStyles.input}
              id="deductionsUnderSection80Ee"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deductionsUnderSection80Ee}
            />
            {formik.touched.deductionsUnderSection80Ee &&
            formik.errors.deductionsUnderSection80Ee ? (
              <div>{formik.errors.deductionsUnderSection80Ee}</div>
            ) : null}
            <small className="ml-auto">Max: 2,00,000</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80QQB - Royalty Received on books
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="section80QqbRoyaltyReceivedOnBooks"
              className={InputStyles.label}
            >
              Enter the deduction amount
            </label>
            <input
              type="number"
              name="section80QqbRoyaltyReceivedOnBooks"
              id="section80QqbRoyaltyReceivedOnBooks"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.section80QqbRoyaltyReceivedOnBooks}
            />
            {formik.touched.section80QqbRoyaltyReceivedOnBooks &&
            formik.errors.section80QqbRoyaltyReceivedOnBooks ? (
              <div>{formik.errors.section80QqbRoyaltyReceivedOnBooks}</div>
            ) : null}
            <small className="ml-auto">Max: 3,00,000</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80RRB - Income on Patents/Inventions
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="section80RrbIncomeOnPatentsInventions"
              className={InputStyles.label}
            >
              Enter the deduction amount
            </label>
            <input
              type="text"
              name="section80RrbIncomeOnPatentsInventions"
              id="section80RrbIncomeOnPatentsInventions"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.section80RrbIncomeOnPatentsInventions}
            />
            {formik.touched.section80RrbIncomeOnPatentsInventions &&
            formik.errors.section80RrbIncomeOnPatentsInventions ? (
              <div>{formik.errors.section80RrbIncomeOnPatentsInventions}</div>
            ) : null}
            <small className="ml-auto">Max: 3,00,000</small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80GGC - Contribution To Political Party
        </h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="contributionOrDonationsToPoliticalParty"
              className={InputStyles.label}
            >
              Contribution or Donations to Political Party
            </label>
            <input
              type="text"
              name="contributionOrDonationsToPoliticalParty"
              id="contributionOrDonationsToPoliticalParty"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contributionOrDonationsToPoliticalParty}
            />
            {formik.touched.contributionOrDonationsToPoliticalParty &&
            formik.errors.contributionOrDonationsToPoliticalParty ? (
              <div>{formik.errors.contributionOrDonationsToPoliticalParty}</div>
            ) : null}
            <small className="ml-auto">
              100% but not more than 10% of total income of individual
            </small>
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">Section 80JJA</h3>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="deductionExemptingProfitsFromBioDegradableWasteBusiness"
              className={InputStyles.label}
            >
              Deduction exempting profits from bio-degradable waste business
            </label>
            <input
              type="text"
              name="deductionExemptingProfitsFromBioDegradableWasteBusiness"
              id="deductionExemptingProfitsFromBioDegradableWasteBusiness"
              className={InputStyles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={
                formik.values
                  .deductionExemptingProfitsFromBioDegradableWasteBusiness
              }
            />
            {formik.touched
              .deductionExemptingProfitsFromBioDegradableWasteBusiness &&
            formik.errors
              .deductionExemptingProfitsFromBioDegradableWasteBusiness ? (
              <div>
                {
                  formik.errors
                    .deductionExemptingProfitsFromBioDegradableWasteBusiness
                }
              </div>
            ) : null}
          </div>
        </div>

        <h3 className="border-b font-semibold mb-5 mt-8">
          Section 80GGA : Donations for Scientific Research or Rural Development
        </h3>
        <div className="">
          <p className={InputStyles.label}>
            Deduction exempting profits from bio-degradable waste business (Max:
            10,000)
          </p>
        </div>
        <h3 className="font-medium mb-5 mt-8">Details of Donee</h3>
        <div className="mx-auto max-w-4xl w-full">
          <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <label
                htmlFor="donationAmountCash"
                className={InputStyles.label}
              >
                Donation Amount (Cash)
              </label>
              <input
                type="number"
                name="donationAmountCash"
                id="donationAmountCash"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.donationAmountCash}
              />
              {formik.touched.donationAmountCash &&
              formik.errors.donationAmountCash ? (
                <div>{formik.errors.donationAmountCash}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="donationAmountOtherModesLikeEPayChequeDdEtc"
                className={InputStyles.label}
              >
                Donation Amount (Other modes like e-pay, cheque, DD etc)
              </label>
              <input
                type="number"
                name="donationAmountOtherModesLikeEPayChequeDdEtc"
                id="donationAmountOtherModesLikeEPayChequeDdEtc"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={
                  formik.values.donationAmountOtherModesLikeEPayChequeDdEtc
                }
              />
              {formik.touched.donationAmountOtherModesLikeEPayChequeDdEtc &&
              formik.errors.donationAmountOtherModesLikeEPayChequeDdEtc ? (
                <div>
                  {formik.errors.donationAmountOtherModesLikeEPayChequeDdEtc}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <label
                htmlFor="qualifyingPercentage"
                className={InputStyles.label}
              >
                Qualifying Percentage
              </label>
              <select
                name="qualifyingPercentage"
                id="qualifyingPercentage"
                className={InputStyles.input}
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
          <div className="md:grid md:grid-cols-2 flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="pincode" className={InputStyles.label}>
                Pincode
              </label>
              <input
                type="number"
                name="pincode"
                id="pincode"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pincode}
              />
              {formik.touched.pincode && formik.errors.pincode ? (
                <div>{formik.errors.pincode}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressLine" className={InputStyles.label}>
                Address Line
              </label>
              <input
                type="text"
                name="addressLine"
                id="addressLine"
                className={InputStyles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressLine}
              />
              {formik.touched.addressLine && formik.errors.addressLine ? (
                <div>{formik.errors.addressLine}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className={InputStyles.label}>
                Town / City
              </label>
              <input
                type="text"
                name="city"
                className={InputStyles.input}
                id="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div>{formik.errors.city}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
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
                {formik.touched.state && formik.errors.state ? (
                  <div>{formik.errors.state}</div>
                ) : null}
                <option value="">--Select--</option>
                {stateList.map((item) => (
                  <option key={item} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
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
