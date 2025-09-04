"use client";

import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/store/store-context";
import { itr1 as itrObj } from "../../../../ITR_Template";
import Link from "next/link";
import { Icon } from "@iconify/react";
export default function EFiling() {
  const [state, dispatch] = useContext(StoreContext);
  const personalInfo = state.itr.personalInfo.personalInfo;
  const assesseeName = `${state.itr.personalInfo.personalInfo.firstName} ${state.itr.personalInfo.personalInfo.middleName} ${state.itr.personalInfo.personalInfo.lastName}`;

  const calculateTax = (income) => {
    const RATE_1 = 0.0;
    const RATE_2 = 0.05;
    const RATE_3 = 0.1;
    const RATE_4 = 0.15;
    const RATE_5 = 0.2;
    const RATE_6 = 0.25;
    const RATE_7 = 0.3;
    const CESS = 0.04;

    const LIMIT_1 = 250000;
    const LIMIT_2 = 500000;
    const LIMIT_3 = 750000;
    const LIMIT_4 = 1000000;
    const LIMIT_5 = 1250000;
    const LIMIT_6 = 1500000;

    let tax = 0;
    if (income <= LIMIT_1) {
      tax = RATE_1 * income;
    } else if (income <= LIMIT_2) {
      tax = RATE_2 * (income - LIMIT_1);
    } else if (income <= LIMIT_3) {
      tax = RATE_3 * (income - LIMIT_2) + calculateTax(LIMIT_2);
    } else if (income <= LIMIT_4) {
      tax = RATE_4 * (income - LIMIT_3) + calculateTax(LIMIT_3);
    } else if (income <= LIMIT_5) {
      tax = RATE_5 * (income - LIMIT_4) + calculateTax(LIMIT_4);
    } else if (income <= LIMIT_6) {
      tax = RATE_6 * (income - LIMIT_5) + calculateTax(LIMIT_5);
    } else {
      tax = RATE_7 * (income - LIMIT_6) + calculateTax(LIMIT_6);
    }
    tax + CESS * tax;
    return tax;
  };

  const form16_type = state.itr_type.form_type;

  // three types of income (limited values)
  const incomeChargeableUnderTheHeadSalaries =
    state.itr.incomeSources.salary.salaryInformation
      .incomeChargeableUnderTheHeadSalaries;
  const incomeFromOtherSources =
    state.itr.incomeSources.otherIncome.totalOfAllOtherIncome;
  const headhouseProperty =
    state.itr.incomeSources.houseProperty
      .incomeChargeableUnderTheHeadHouseProperty;
  const totalSalary =
    Number(incomeChargeableUnderTheHeadSalaries) +
    Number(incomeFromOtherSources) +
    Number(headhouseProperty);

  // values from from-16

  const FORM_16_salary = Number(
    state.itr.form16.formData.salaryAsPerSection17_1.salary
  );
  const FORM_16_valueOfPrequisites = Number(
    state.itr.form16.formData.valueOfPerquisitesUnderSection17_2
  );
  const FORM_16_profitsInSalary = Number(
    state.itr.form16.formData.profitsInLieuOfSalaryUnderSection17_3
  );
  const FORM_16_grossSalary = Number(state.itr.form16.formData.grossSalary);
  const FORM_16_exemptAllowance = Number(
    state.itr.form16.formData.exemptAllowancesUnderSection10
  );
  const FORM_16_netSalary = Number(state.itr.form16.formData.netSalary);
  const FORM_16_entertainmentAllowance = Number(
    state.itr.form16.formData.entertainmentAllowanceUnderSection16ii
  );
  const FORM_16_professionalTax = Number(
    state.itr.form16.formData.professionalTaxUnderSection16iii
  );
  const FORM_16_totalIncome = Number(state.itr.form16.formData.totalIncome);

  // three type of deductions (limited values)
  const deduction1 = state.itr.deductions.section80Deductions.totalDeduction;
  const deduction2 =
    state.itr.deductions.moreDeductions.amountOfTotalMoreDeductions;
  const deduction3 =
    state.itr.deductions.otherDeductions.amountOfTotalOtherDeductions;

  const totalGrossIncome =
    form16_type === "form-16" ? FORM_16_totalIncome : totalSalary;
  const totalDeduction =
    Number(deduction1) + Number(deduction2) + Number(deduction3);
  const taxableIncome = totalGrossIncome - totalDeduction;

  const rebateLimit_1 = 500000;
  const rebateLimit_2 = 700000;

  const rebate =
    taxableIncome > 250000
      ? taxableIncome <= rebateLimit_1
        ? 12500
        : taxableIncome <= rebateLimit_2
        ? 25000
        : 0
      : 0;

  const tds = Number(state.itr.taxesPaid.tds.nonSalaryTDS.totalTaxDeducted);
  const tcs = Number(
    state.itr.taxesPaid.tds.taxCollectedAtSource.totalTaxCollected
  );
  const selftax = Number(state.itr.taxesPaid.selfTaxPayments.amountPaid);

  const tax = calculateTax(taxableIncome);
  const totalTaxPaid = (tds + tcs + selftax).toFixed(2);
  const balanceTaxPayable = (tax - totalTaxPaid).toFixed(2);

  const parentFlag =
    state.itr.deductions.moreDeductions.section80DDeductionsForMedicalInsurance.forParents.substring(
      0,
      1
    );
  const forParents =
    state.itr.deductions.moreDeductions.section80DDeductionsForMedicalInsurance
      .forParents;

  // user_input deductions page no.(2) without limits
  const user_medicalInsurancePremiumSelf = Number(
    state.itr.deductions.moreDeductions.section80DDeductionsForMedicalInsurance
      .medicalInsurancePremium_forSelfAndFamily
  );
  const user_medicalInsurancePremiumParents = Number(
    state.itr.deductions.moreDeductions.section80DDeductionsForMedicalInsurance
      .medicalInsurancePremium_forParents
  );
  const user_HealthCheckUpFeesSelf = Number(
    state.itr.deductions.moreDeductions.section80DDeductionsForMedicalInsurance
      .preventiveHealthCheckUpFees_forSelfAndFamily
  );
  const user_HealthCheckUpFeesParents = Number(
    state.itr.deductions.moreDeductions.section80DDeductionsForMedicalInsurance
      .preventiveHealthCheckUpFees_forParents
  );
  const user_section80E = Number(
    state.itr.deductions.moreDeductions
      .section80EEducationLoanOnHigherStudiesGraduateOrPostGraduate
      .interestOnHigherEducationLoanPaidThisYear
  );
  const user_section80Ccc = Number(
    state.itr.deductions.moreDeductions
      .section80CccContributionToPensionPlanAnnuityFund
      .contributionAmountToPensionPlanAnnuityFundForSection80Ccc
  );
  const user_section80Ccd1And1B = Number(
    state.itr.deductions.moreDeductions
      .section80Ccd1And1BEmployeeContributionToNewPensionSchemeNps
      .contributionTowardsSection80Ccd1
  );
  const user_section80Ccd2 = Number(
    state.itr.deductions.moreDeductions.section80Ccd2EmployerContributionInNps
      .employersContributionTowardsNpsUpto10OfSalary
  );
  const user_section80Gg = Number(
    state.itr.deductions.moreDeductions
      .section80GgDeductionForHouseRentSelfEmployedOrSalaryWithNoHra
      .amountOfRentPaid
  );
  const user_section80Ddb = Number(
    state.itr.deductions.moreDeductions
      .section80DdbDeductionsForTreatmentOfSpecifiedDiseasesAndAilments
      .medicalTreatmentCostsForSpecifiedDiseasesUnderSection80Ddb
  );
  const user_section80Ee = Number(
    state.itr.deductions.moreDeductions.section80EeInterestOnHomeLoan
      .deductionsUnderSection80Ee
  );
  const user_section80Rrb = Number(
    state.itr.deductions.moreDeductions.section80RrbIncomeOnPatentsInventions
      .deductionAmount
  );
  const user_section80Ggc = Number(
    state.itr.deductions.moreDeductions.section80GgcContributionToPoliticalParty
      .contributionOrDonationsToPoliticalParty
  );
  const user_section80Jja = Number(
    state.itr.deductions.moreDeductions.section80Jja
      .deductionExemptingProfitsFromBioDegradableWasteBusiness
  );
  const user_section80Gga =
    Number(
      state.itr.deductions.moreDeductions
        .section80GgaDonationsForScientificResearchOrRuralDevelopment
        .detailsOfDonee.donationAmountCash
    ) +
    Number(
      state.itr.deductions.moreDeductions
        .section80GgaDonationsForScientificResearchOrRuralDevelopment
        .detailsOfDonee.donationAmountOtherModesLikeEPayChequeDdEtc
    );
  // const user_section80Qqb = state.itr.deductions.moreDeductions.section80QqbRoyaltyReceivedOnBooks.deductionAmount;
  // const user_section80Ccg = state.itr.deductions.moreDeductions.section80CcgRajivGandhiEquitySavingScheme.investmentMadeUnderRajivGandhiEquitySavingScheme;

  // limited value deductions from deduction page no.(2)
  const {
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
  } = state.itr.deductions.moreDeductions.allowedVal;

  // used in deduction page 1 and 3 returns limited and not limited values in an object
  const section80CDeduction = () => {
    const SECTION_80_LIMIT = 150000;
    const section80 =
      state.itr.deductions.section80Deductions.investmentsUnderSection80C;
    const {
      insurance,
      ulip,
      pf,
      mutualFund,
      gpf,
      ppf,
      houseRepayment,
      childrenEducation,
    } = section80;

    let total =
      Number(insurance) +
      Number(ulip) +
      Number(pf) +
      Number(mutualFund) +
      Number(gpf) +
      Number(ppf) +
      Number(houseRepayment) +
      Number(childrenEducation);

    let allowedTotal =
      total > SECTION_80_LIMIT ? Number(SECTION_80_LIMIT) : total;

    if (total >= SECTION_80_LIMIT) {
      total = Number(SECTION_80_LIMIT);
    }

    return { total, allowedTotal };
  };

  const section80GDeduction = () => {
    const qualifyingPercentage =
      state.itr.deductions.section80Deductions
        .section80GDonationsToCharitableOrganizations.detailsOfDonee
        .qualifyingPercentage;
    const total =
      Number(
        state.itr.deductions.section80Deductions
          .section80GDonationsToCharitableOrganizations.amountOfDonation
          .donationAmountCash
      ) +
      Number(
        state.itr.deductions.section80Deductions
          .section80GDonationsToCharitableOrganizations.amountOfDonation
          .donationAmountOther
      );
    const allowedTotal =
      qualifyingPercentage === "50%" ? Number(total / 2) : total;
    return { total, allowedTotal };
  };

  const section80DD_80UDeductions = () => {
    const LIMIT_1 = 75000;
    const LIMIT_2 = 125000;
    let section80U = 0;
    let section80DD = 0;

    const disabilityUnderSection80U =
      state.itr.deductions.otherDeductions.section80DdDisabledDependentDeduction
        .typeofDisability;
    const disabilityUnderSection80DD =
      state.itr.deductions.otherDeductions.section80UDisability
        .typeofDisability;

    disabilityUnderSection80U === "DisabilityUnderSection80U_40"
      ? (section80U = LIMIT_1)
      : null;
    disabilityUnderSection80U === "DisabilityUnderSection80U_Severe"
      ? (section80U = LIMIT_2)
      : null;
    disabilityUnderSection80DD === "DisabilityUnderSection80DD_40"
      ? (section80DD = LIMIT_1)
      : null;
    disabilityUnderSection80DD === "DisabilityUnderSection80DD_Severe"
      ? (section80DD = LIMIT_2)
      : null;

    return { section80U, section80DD };
  };

  const section80G = section80GDeduction();
  const section80C = section80CDeduction();
  const section80DD_80U = section80DD_80UDeductions();

  const totalUser_deduction_2 =
    Number(user_medicalInsurancePremiumSelf) +
    Number(user_medicalInsurancePremiumParents) +
    Number(user_HealthCheckUpFeesSelf) +
    Number(user_HealthCheckUpFeesParents) +
    Number(user_section80E) +
    Number(user_section80Ccc) +
    Number(user_section80Ccd1And1B) +
    Number(user_section80Ccd2) +
    Number(user_section80Gg) +
    Number(user_section80Ddb) +
    Number(user_section80Ee) +
    Number(user_section80Rrb) +
    Number(user_section80Ggc) +
    Number(user_section80Jja) +
    Number(user_section80Gga) +
    Number(section80C.total) +
    Number(section80DD_80U.section80DD) +
    Number(section80G.total);

  const section80dAllowedTotal =
    Number(medicalInsurancePremiumSelf) +
    Number(medicalInsurancePremiumParents) +
    Number(HealthCheckUpFeesSelf) +
    Number(HealthCheckUpFeesParents);

  // 1. personal info -
  itrObj.PersonalInfo.AssesseeName.FirstName =
    state.itr.personalInfo.personalInfo.firstName;
  itrObj.PersonalInfo.AssesseeName.MiddleName =
    state.itr.personalInfo.personalInfo.middleName;
  itrObj.PersonalInfo.AssesseeName.SurNameOrOrgName =
    state.itr.personalInfo.personalInfo.lastName;
  itrObj.PersonalInfo.PAN;
  itrObj.PersonalInfo.Address.ResidenceNo = state.itr.personalInfo.address.flat;
  itrObj.PersonalInfo.Address.ResidenceName =
    state.itr.personalInfo.address.premiseName;
  itrObj.PersonalInfo.Address.RoadOrStreet =
    state.itr.personalInfo.address.road;
  itrObj.PersonalInfo.Address.LocalityOrArea =
    state.itr.personalInfo.address.area;
  itrObj.PersonalInfo.Address.CityOrTownOrDistrict =
    state.itr.personalInfo.address.city;
  itrObj.PersonalInfo.Address.StateCode = state.itr.personalInfo.address.state;
  itrObj.PersonalInfo.Address.CountryCode =
    state.itr.personalInfo.address.country;
  itrObj.PersonalInfo.Address.PinCode = state.itr.personalInfo.address.pincode;
  itrObj.PersonalInfo.Address.CountryCodeMobile =
    state.itr.personalInfo.address.country;
  itrObj.PersonalInfo.Address.MobileNo = state.itr.personalInfo.address.mobile;
  itrObj.PersonalInfo.Address.EmailAddress =
    state.itr.personalInfo.address.email;
  itrObj.PersonalInfo.DOB = state.itr.personalInfo.personalInfo.dob;
  itrObj.PersonalInfo.EmployerCategory =
    state.itr.incomeSources.salary.employerDetails.employerType;
  itrObj.PersonalInfo.AadhaarCardNo =
    state.itr.personalInfo.personalInfo.aadhaarCardNumber;

  //2. income and deductions -
  itrObj.ITR1_IncomeDeductions.GrossSalary =
    form16_type === "form-16"
      ? FORM_16_grossSalary
      : state.itr.incomeSources.salary.salaryInformation
          .salaryAsPerSection17_1 +
        state.itr.incomeSources.salary
          .salaryInformationprofitsInLieuOfSalaryUnderSection17_3;

  itrObj.ITR1_IncomeDeductions.Salary =
    form16_type === "form-16"
      ? FORM_16_salary
      : state.itr.incomeSources.salary.salaryInformation.balance;

  itrObj.ITR1_IncomeDeductions.PerquisitesValue =
    form16_type === "form-16"
      ? FORM_16_valueOfPrequisites
      : state.itr.incomeSources.salary.salaryInformation
          .valueOfPerquisitesUnderSection17_2;

  itrObj.ITR1_IncomeDeductions.AllwncExemptUs10.TotalAllwncExemptUs10 =
    form16_type === "form-16"
      ? FORM_16_exemptAllowance
      : state.itr.incomeSources.salary.salaryInformation
          .exemptAllowancesUnderSection10;

  itrObj.ITR1_IncomeDeductions.NetSalary =
    form16_type === "form-16"
      ? FORM_16_totalIncome
      : incomeChargeableUnderTheHeadSalaries;

  itrObj.ITR1_IncomeDeductions.DeductionUs16 =
    form16_type === "form-16"
      ? Number(FORM_16_entertainmentAllowance) + Number(FORM_16_professionalTax)
      : Number(
          state.itr.incomeSources.salary.salaryInformation
            .standardDeductionUnderSection16ia
        ) +
        Number(
          state.itr.incomeSources.salary.salaryInformation
            .professionalTaxUnderSection16iii
        );

  itrObj.ITR1_IncomeDeductions.DeductionUs16ia =
    form16_type === "form-16"
      ? 0
      : state.itr.incomeSources.salary.salaryInformation
          .standardDeductionUnderSection16ia;

  // itrObj.ITR1_IncomeDeductions.EntertainmentAlw16ii
  itrObj.ITR1_IncomeDeductions.ProfessionalTaxUs16iii =
    form16_type === "form-16"
      ? FORM_16_professionalTax
      : state.itr.incomeSources.salary.salaryInformation
          .professionalTaxUnderSection16iii;

  itrObj.ITR1_IncomeDeductions.IncomeFromSal =
    form16_type === "form-16"
      ? FORM_16_totalIncome
      : incomeChargeableUnderTheHeadSalaries;

  itrObj.ITR1_IncomeDeductions.GrossRentReceived =
    form16_type === "form-16"
      ? 0
      : state.itr.incomeSources.houseProperty
          .estimatedIncomeFromTheHouseProperty.estimatedAnnualRentReceivable;
  itrObj.ITR1_IncomeDeductions.TaxPaidlocalAuth =
    form16_type === "form-16"
      ? 0
      : state.itr.incomeSources.houseProperty
          .estimatedIncomeFromTheHouseProperty.houseTaxPaidByYou;
  itrObj.ITR1_IncomeDeductions.AnnualValue =
    form16_type === "form-16"
      ? 0
      : state.itr.incomeSources.houseProperty
          .estimatedIncomeFromTheHouseProperty.estimatedAnnualRentReceivable;
  // itrObj.ITR1_IncomeDeductions.StandardDeduction
  itrObj.ITR1_IncomeDeductions.InterestPayable =
    form16_type === "form-16"
      ? 0
      : state.itr.incomeSources.houseProperty
          .interestPaidOnHousingLoanForThisHouseProperty
          .interestPaidOnLoanForThisHouseProperty;
  // itrObj.ITR1_IncomeDeductions.ArrearsUnrealizedRentRcvd
  itrObj.ITR1_IncomeDeductions.TotalIncomeOfHP =
    form16_type === "form-16" ? 0 : headhouseProperty;
  itrObj.ITR1_IncomeDeductions.IncomeOthSrc =
    form16_type === "form-16"
      ? 0
      : state.itr.incomeSources.otherIncome.totalOfAllOtherIncome;
  itrObj.ITR1_IncomeDeductions.OthersInc.OthersIncDtlsOthSrc.OthSrcOthAmount =
    form16_type === "form-16"
      ? 0
      : state.itr.incomeSources.otherIncome.totalOfAllOtherIncome;
  // itrObj.ITR1_IncomeDeductions.DeductionUs57iia;
  itrObj.ITR1_IncomeDeductions.GrossTotIncome = totalGrossIncome;
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80C = Number(
    section80C.total
  );
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCC =
    Number(user_section80Ccc);
  // itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCDEmployeeOrSE = 0
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCD1B = Number(
    user_section80Ccd1And1B
  );
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCDEmployer =
    Number(user_section80Ccd2);
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80D =
    user_medicalInsurancePremiumSelf +
    user_medicalInsurancePremiumParents +
    user_HealthCheckUpFeesSelf +
    user_HealthCheckUpFeesParents;
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80DD = Number(
    section80DD_80U.section80DD
  );
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80DDB =
    Number(user_section80Ddb);
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80E =
    Number(user_section80E);
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EE =
    Number(user_section80Ee);
  // itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EEA = 0
  // itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EEB = 0
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80G = Number(
    section80G.total
  );
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GG =
    Number(user_section80Gg);
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GGA =
    Number(user_section80Gga);
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GGC =
    Number(user_section80Ggc);
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80U = Number(
    section80DD_80U.section80U
  );
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80TTA = Number(
    state.itr.deductions.section80Deductions.section80tta
      .interestEarnedOnSavingsAccount
  );
  // itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80TTB = 0
  itrObj.ITR1_IncomeDeductions.UsrDeductUndChapVIA.TotalChapVIADeductions =
    Number(totalUser_deduction_2);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80C = Number(
    section80C.allowedTotal
  );
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCC =
    Number(section80Ccc);
  // itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCDEmployeeOrSE = 0
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCD1B =
    Number(section80Ccd1And1B);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCDEmployer =
    Number(section80Ccd2);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80D = Number(
    section80dAllowedTotal
  );
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80DD = Number(
    section80DD_80U.section80DD
  );
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80DDB =
    Number(section80Ddb);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80E = Number(section80E);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EE =
    Number(section80Ee);
  // itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EEA = 0
  // itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EEB = 0
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80G = Number(
    section80G.allowedTotal
  );
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GG =
    Number(section80Gg);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GGA =
    Number(section80Gga);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GGC =
    Number(section80Ggc);
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80U = Number(
    section80DD_80U.section80U
  );
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80TTA = Number(
    state.itr.deductions.section80Deductions.section80tta
      .interestEarnedOnSavingsAccount
  );
  // itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.Section80TTB = 0
  itrObj.ITR1_IncomeDeductions.DeductUndChapVIA.TotalChapVIADeductions =
    totalDeduction;
  itrObj.ITR1_IncomeDeductions.TotalIncome = totalGrossIncome - totalDeduction;

  // tax-calculation -
  itrObj.ITR1_TaxComputation.TotalTaxPayable = Number(
    (tax - 0.4 * tax).toFixed(2)
  );
  itrObj.ITR1_TaxComputation.Rebate87A = rebate;
  // itrObj.ITR1_TaxComputation.TaxPayableOnRebate = 0;
  // itrObj.ITR1_TaxComputation.EducationCess = 0.4;
  itrObj.ITR1_TaxComputation.GrossTaxLiability = Number(
    (tax - rebate).toFixed(2)
  );
  // itrObj.ITR1_TaxComputation.Section89 = 0;
  itrObj.ITR1_TaxComputation.NetTaxLiability = Number(
    (tax - rebate).toFixed(2)
  );
  // itrObj.ITR1_TaxComputation.TotalIntrstPay = 0;

  // tax-paid -
  // itrObj.TaxPaid.TaxesPaid.AdvanceTax =  0
  itrObj.TaxPaid.TaxesPaid.TDS = Number(tds);
  itrObj.TaxPaid.TaxesPaid.TCS = Number(tcs);
  itrObj.TaxPaid.TaxesPaid.SelfAssessmentTax = Number(selftax);
  itrObj.TaxPaid.TaxesPaid.TotalTaxesPaid = Number(totalTaxPaid);
  itrObj.TaxPaid.BalTaxPayable = Number(balanceTaxPayable);

  itrObj.Refund.BankAccountDtls.AddtnlBankDetails =
    state.itr.personalInfo.bankInfo.allOtherBankAccounts;

  itrObj.Schedule80G.TotalDonationsUs80GCash = Number(
    state.itr.deductions.section80Deductions
      .section80GDonationsToCharitableOrganizations.amountOfDonation
      .donationAmountCash
  );
  itrObj.Schedule80G.TotalDonationsUs80GOtherMode = Number(
    state.itr.deductions.section80Deductions
      .section80GDonationsToCharitableOrganizations.amountOfDonation
      .donationAmountOther
  );
  itrObj.Schedule80G.TotalDonationsUs80G =
    Number(
      state.itr.deductions.section80Deductions
        .section80GDonationsToCharitableOrganizations.amountOfDonation
        .donationAmountCash
    ) +
    Number(
      state.itr.deductions.section80Deductions
        .section80GDonationsToCharitableOrganizations.amountOfDonation
        .donationAmountOther
    );
  itrObj.Schedule80G.TotalEligibleDonationsUs80G = Number(
    state.itr.deductions.section80Deductions
      .section80GDonationsToCharitableOrganizations.amountOfDonation
      .totalAllowedDonation
  );
  itrObj.Schedule80D.Sec80DSelfFamSrCtznHealth.HealthInsPremSlfFam = Number(
    medicalInsurancePremiumSelf
  );
  itrObj.Schedule80D.Sec80DSelfFamSrCtznHealth.PrevHlthChckUpSlfFam = Number(
    HealthCheckUpFeesSelf
  );
  itrObj.Schedule80D.Sec80DSelfFamSrCtznHealth.HlthInsPremParents =
    forParents === "Non-Senior Citizen"
      ? Number(medicalInsurancePremiumParents)
      : 0;
  itrObj.Schedule80D.Sec80DSelfFamSrCtznHealth.PrevHlthChckUpParents =
    forParents === "Non-Senior Citizen" ? Number(HealthCheckUpFeesParents) : 0;
  itrObj.Schedule80D.Sec80DSelfFamSrCtznHealth.HlthInsPremParentsSrCtzn =
    forParents === "Senior Citizen"
      ? Number(medicalInsurancePremiumParents)
      : 0;
  itrObj.Schedule80D.Sec80DSelfFamSrCtznHealth.PrevHlthChckUpParentsSrCtzn =
    forParents === "Senior Citizen" ? Number(HealthCheckUpFeesParents) : 0;
  itrObj.Schedule80D.Sec80DSelfFamSrCtznHealth.EligibleAmountOfDedn =
    section80dAllowedTotal;
  itrObj.ScheduleTCS.TotalSchTCS =
    state.itr.taxesPaid.tds.taxCollectedAtSource.totalTaxCollected;

  itrObj.TDSonOthThanSals.TotalTDSonOthThanSals = tds;

  itrObj.Verification.Declaration.AssesseeVerName = assesseeName;
  itrObj.Verification.Declaration.FatherName =
    state.itr.personalInfo.personalInfo.fathersName;
  itrObj.Verification.Declaration.AssesseeVerPAN =
    state.itr.personalInfo.personalInfo.panNumber;
  itrObj.Verification.Place = state.itr.personalInfo.address.city;

  const downloadJSON = () => {
    console.log(itrObj);
    const fileData = JSON.stringify(itrObj);
    const blob = new Blob([fileData], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "ITR.json";
    link.href = url;
    link.click();
  };

    // console.log(state)
    const [taxCalculated, setTaxCalculated] = useState({
        incomeTax: 0,
        surcharge: 0,
        healthAndEducationCess: 0,
        totalTaxLiability: 0,
    });
    function calc_Tax(salary) {
        let taxableValue = 0;

        if (salary <= 250000) {
            taxableValue = 0; // Nil
        } else if (salary <= 500000) {
            taxableValue = (salary - 250000) * 0.05; // 5% for the amount above 250,000
        } else if (salary <= 1000000) {
            taxableValue = (salary - 500000) * 0.2 + 12500; // 20% for the amount above 500,000
        } else {
            taxableValue = (salary - 1000000) * 0.3 + 112500; // 30% for the amount above 1,000,000
        }
        const Surcharge = (value, salary) => {
            let taxableValue = 0;
            if (salary <= 250000) {
                taxableValue = 0.0; // Less than Rs.50 lakh	NIL
            } else if (salary <= 500000) {
                taxableValue = value * 0.05; // Rs.50 lakh – Rs.1crore	10%
            } else if (salary <= 750000) {
                taxableValue = value * 0.1; // Rs.1 crore – Rs.2 crore	15%
            } else if (salary <= 1000000) {
                taxableValue = value * 0.15; // Rs.2 crore – Rs.5 crore	25%
            } else if (salary <= 1250000) {
                taxableValue = value * 0.2; // Rs.2 crore – Rs.5 crore	25%
            } else if (salary <= 1500000) {
                taxableValue = value * 0.25; // Rs.2 crore – Rs.5 crore	25%
            }
             else {
                taxableValue = value * 0.3; // More than Rs.10 crore	37%
            }
            return taxableValue;
        };
        const sCharge = Surcharge(taxableValue, salary);
        const healthAndEducationCess = sCharge * 0.04;
        return {
            incomeTax: taxableValue,
            surcharge: sCharge,
            healthAndEducationCess: healthAndEducationCess,
            totalTaxLiability: taxableValue + sCharge + healthAndEducationCess,
        };
    }
    useEffect(()=>{
        if(itrObj?.ITR1_IncomeDeductions?.GrossTotIncome) {
            setTaxCalculated({...calc_Tax(itrObj?.ITR1_IncomeDeductions?.GrossTotIncome)})
        }
    },[])
    // console.log(taxCalculated)
    // return (
    // <>
    //     <h1 className="mx-auto max-w-6xl p-2 font-semibold text-center" >Summary of your ITR filing.</h1>
    //     <div className="mx-auto max-w-6xl p-2">
    //         <div className="[&>div]:p-2 divide-y-2 border border-gray-400 rounded-md">
    //             <div className="flex justify-between ">
    //                 <div>
    //                     <h4 className="text-md font-medium tracking-tighter">Personal Information</h4>
    //                     <p className="text-sm tracking-tighter text-neutral-700">Includes your, InformationBank and DetailsAddress</p>
    //                 </div>
    //                 <div className="grid grid-rows-2">
    //                     <span>{personalInfo.panNumber}</span>
    //                 </div>
    //             </div>
    //             <div className="flex justify-between ">
    //                 <div>
    //                     <h4 className="text-md font-medium tracking-tighter">Gross Total Income</h4>
    //                     <p className="text-sm tracking-tighter text-neutral-700">Includes your, SalaryHouse, PropertyOther, IncomeBusiness and ProfessionCapital Gain</p>
    //                 </div>
    //                 <div>
    //                     <div>&#x20B9; {itrObj?.ITR1_IncomeDeductions?.GrossTotIncome}</div>
    //                 </div>
    //             </div>
    //             <div className="flex justify-between ">
    //                 <div>
    //                     <h4 className="text-md font-medium tracking-tighter">Deductions</h4>
    //                     <p className="text-sm tracking-tighter text-neutral-700">Includes your,Section 80, DeductionsMore, DeductionsOther, Deduction, </p>
    //                 </div>
    //                 <div>
    //                     <div>&#x20B9;0</div>
    //                 </div>
    //             </div>
    //             {/* <div className="flex justify-between ">
    //                 <div>
    //                     <h4 className="text-md font-medium tracking-tighter">Tax Payable</h4>
    //                     <p className="text-sm tracking-tighter text-neutral-700">Includes your, Gross Total Income, Deductions And Taxable Income</p>
    //                 </div>
    //                 <div>
    //                     <div>&#x20B9;0</div>
    //                 </div>
    //             </div> */}
    //             <div className="flex justify-between ">
    //                 <div>
    //                     <h4 className="text-md font-medium tracking-tighter">Taxes Paid</h4>
    //                     <p className="text-sm tracking-tighter text-neutral-700">TDS, Self Tax Payments</p>
    //                 </div>
    //                 <div>
    //                     <div>&#8377; {itrObj?.TaxPaid?.TaxesPaid.TotalTaxesPaid || ""}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="mx-auto max-w-6xl p-2 space-y-2">
    //         <div className="border border-gray-400 rounded-md p-2">
    //             <h2 className="flex items-center gap-2 p-2">
    //                 <Icon className="bg-blue-600/10 text-blue-600 rounded-md p-1 w-8 h-8" icon="solar:user-circle-bold"/>
    //                 Personal Information
    //             </h2>
    //             <Link href="/dashboard/itr/itr-filling/taxes-paid" className="text-blue-500 text-sm tracking-tighter flex gap-2 items-center justify-end">
    //                 Modify if Required
    //                 <Icon icon="bx:edit"/>
    //             </Link>
    //             <ul 
    //                 className="
    //                 text-sm tracking-tighter p-2 divide-y 
    //                 [&>li]:flex [&>li]:justify-between [&>li]:p-1 
    //                 [&>li>div]:font-medium
                    
    //                 "
    //                 >
    //                 <li>
    //                     <div>Name</div>
    //                     <span>{`${personalInfo?.firstName} ${personalInfo?.middleName} ${personalInfo?.lastName}`}</span>
    //                 </li>
    //                 <li>
    //                     <div>Date of birth</div>
    //                     <span>{new Date(personalInfo?.dob)?.toLocaleDateString("en-GB")}</span>
    //                 </li>
    //                 <li>
    //                     <div>PAN</div>
    //                     <span>{personalInfo?.panNumber}</span>
    //                 </li>
    //                 <li>
    //                     <div>Gender</div>
    //                     <span>{personalInfo?.gender}</span>
    //                 </li>
    //                 <li>
    //                     <div>Assessment Year</div>
    //                     <span>{itrObj?.Form_ITR1.AssessmentYear}</span>
    //                 </li>
    //                 <li>
    //                     <div>Residential Status</div>
    //                     <span>-</span>
    //                 </li>
    //             </ul>
    //         </div>
    //         <div className="border border-gray-400 rounded-md p-2">
    //             <div className="flex items-center gap-2 p-2">
    //                 <Icon className="bg-red-600/10 text-red-600 rounded-md p-1 w-8 h-8" icon="game-icons:pay-money"/>
    //                 <h2>Income Sources</h2>
    //             </div>
    //             <Link href="/dashboard/itr/itr-filling/taxes-paid" className="text-blue-500 text-sm tracking-tighter flex gap-2 items-center justify-end">
    //                 Modify if Required
    //                 <Icon icon="bx:edit"/>
    //             </Link>
    //             <div className="p-2 flex justify-between text-sm tracking-tighter">
    //                 <div className="font-medium">Gross Total Income</div>
    //                 <div>&#8377; {itrObj?.ITR1_IncomeDeductions?.GrossTotIncome}</div>
    //             </div>
    //         </div>
    //         <div className="border border-gray-400 rounded-md p-2">
    //             <div className="flex items-center gap-2 p-2">
    //                 <Icon className="bg-green-600/10 text-green-600 rounded-md p-1 w-8 h-8" icon="solar:wallet-money-line-duotone"/>
    //                 <h2>Tax Savings (Deductions)</h2>
    //             </div>
    //             <Link href="/dashboard/itr/itr-filling/deductions" className="text-blue-500 text-sm tracking-tighter flex gap-2 items-center justify-end">
    //                 Modify if Required
    //                 <Icon icon="bx:edit"/>
    //             </Link>
    //             <div className="text-sm tracking-tighter p-2">
    //                 <ul
    //                 className="
    //                     text-sm tracking-tighter p-2 divide-y 
    //                     [&>li]:flex [&>li]:justify-between [&>li]:p-1 
    //                     [&>li>div]:font-medium
    //                 ">
    //                     <li>
    //                         <div>Section 80C</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80C}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80CCC</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCC}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80CCD(1B)</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCD1B}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80CCD (EmployeeOrSE)</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCDEmployeeOrSE}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80CCD (Employer)</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCDEmployer}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80D</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80D}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80DD</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80DD}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80DDB</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80DDB}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80E</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80E}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80EE</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80EE}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80EEA</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80EEA}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80EEB</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80EEB}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80G</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80G}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80GG</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80GG}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80GGA</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80GGA}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80GGC</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80GGC}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80TTA</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80TTA}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80TTB</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80TTB}</span>
    //                     </li>
    //                     <li>
    //                         <div>Section 80U</div>
    //                         <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80U}</span>
    //                     </li>
    //                 </ul>
    //                 <div className="bg-blue-500/10 rounded-md p-1 flex justify-between">
    //                     <div>Total Deduction</div>
    //                     <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.TotalChapVIADeductions}</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="border border-gray-400 rounded-md p-2">
    //             <div className="flex items-center gap-2 p-2">
    //                 <Icon className="bg-fuchsia-600/10  text-fuchsia-600 rounded-md p-1 w-8 h-8" icon="material-symbols-light:source-notes-rounded"/>
    //                 <h2>Tax Payable</h2>
    //             </div>
    //             <ul className="text-sm tracking-tighter divide-y p-2">
    //                 <li className="p-2 grid grid-flow-col justify-between">
    //                     <span>Total Taxable Income (Gross Total Income - Total Deductions)</span>
    //                     <span>&#8377; {itrObj?.ITR1_IncomeDeductions?.GrossTotIncome}</span>
    //                 </li>
    //                 <li className="p-2 grid grid-flow-col justify-between">
    //                     <span>Income Tax at normal rates</span>
    //                     <span>&#8377; {taxCalculated?.incomeTax}</span>
    //                 </li>
    //                 <li className="p-2 grid grid-flow-col justify-between">
    //                     <span>Surcharge</span>
    //                     <span>&#8377; {taxCalculated?.surcharge}</span>
    //                 </li>
    //                 <li className="p-2 grid grid-flow-col justify-between">
    //                     <span>Health and Education Cess</span>
    //                     <span>&#8377; {taxCalculated?.healthAndEducationCess}</span>
    //                 </li>
    //                 <li className="p-2 grid grid-flow-col justify-between">
    //                     <span>Total Tax Liability</span>
    //                     <span>&#8377; {taxCalculated?.totalTaxLiability}</span>
    //                 </li>
    //             </ul>
    //             <div className="bg-blue-500/10 rounded-md p-1 flex justify-between">
    //                 <div>Total Tax Payable(Total Tax + Total Interest Due)</div>
    //                  &#8377; {itrObj?.ITR1_TaxComputation?.TotalTaxPayable}
    //             </div>
    //         </div>
    //         <div className="border border-gray-400 rounded-md p-2">
    //             <div className="flex items-center gap-2 p-2">
    //                 <Icon className="bg-orange-600/10 text-orange-600 rounded-md p-1 w-8 h-8" icon="material-symbols:paid"/>
    //                 <h2>Tax Paid</h2>
    //             </div>
    //             <Link href="/dashboard/itr/itr-filling/taxes-paid" className="text-blue-500 text-sm tracking-tighter flex gap-2 items-center justify-end">
    //                 Modify if Required
    //                 <Icon icon="bx:edit"/>
    //             </Link>
    //             <div className="p-2 flex justify-between text-sm tracking-tighter">
    //                 <div className="font-medium">Total Tax Paid</div>
    //                 <div>&#8377; {itrObj?.TaxPaid?.TaxesPaid.TotalTaxesPaid}</div>
    //             </div>
    //         </div>

    //         <div className="flex justify-end">
    //             <button onClick={() => {downloadJSON();}} className=" bg-primary px-8 py-3 my-6 text-white rounded-md font-semibold text-sm cursor-pointer col-span-2 mx-auto">
    //                 Download JSON
    //             </button>
    //         </div>
    //     </div>
    // </>
    // );


return (
  <>
    <div className="relative mx-auto w-[92%] max-w-3xl">
      {/* subtle decorative blobs */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-blue-500/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-2xl" />

      {/* <h1 className="p-2 text-center text-base sm:text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
        Summary of your ITR filing.
      </h1> */}

      {/* quick recap */}
      <div className="mx-auto mt-1 rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg">
        <div className="divide-y">
          <div className="flex items-start justify-between p-2">
            <div>
              <h4 className="text-sm font-medium tracking-tight text-blue-400">Personal Information</h4>
              <p className="text-[11px] tracking-tight text-neutral-600">
                Includes your Information, Bank & Address
              </p>
            </div>
            <div className="grid text-right text-xs">
              <span className="font-medium">{personalInfo?.panNumber}</span>
            </div>
          </div>

          <div className="flex items-start justify-between p-2">
            <div>
              <h4 className="text-sm font-medium tracking-tight">Gross Total Income</h4>
              <p className="text-[11px] tracking-tight text-neutral-600">
                Salary, House Property, Other Income, Business/Profession, Capital Gain
              </p>
            </div>
            <div className="text-sm font-semibold">
              ₹ {itrObj?.ITR1_IncomeDeductions?.GrossTotIncome}
            </div>
          </div>

          <div className="flex items-start justify-between p-2">
            <div>
              <h4 className="text-sm font-medium tracking-tight">Deductions</h4>
              <p className="text-[11px] tracking-tight text-neutral-600">Chapter VI-A</p>
            </div>
            <div className="text-sm font-semibold">₹ 0</div>
          </div>

          <div className="flex items-start justify-between p-2">
            <div>
              <h4 className="text-sm font-medium tracking-tight">Taxes Paid</h4>
              <p className="text-[11px] tracking-tight text-neutral-600">TDS & Self-Assessment</p>
            </div>
            <div className="text-sm font-semibold">
              ₹ {itrObj?.TaxPaid?.TaxesPaid?.TotalTaxesPaid || 0}
            </div>
          </div>
        </div>
      </div>

      {/* detail cards */}
      <div className="mx-auto mt-3 space-y-3">
        {/* Personal Info */}
        <div className="rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between p-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-blue-400">
              <Icon className="rounded-md bg-blue-600/10 p-1 w-7 h-7 text-blue-600" icon="solar:user-circle-bold" />
              Personal Information
            </h2>
            <Link
              href="/dashboard/itr/itr-filling/taxes-paid"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:underline"
            >
              Modify if Required <Icon icon="bx:edit" />
            </Link>
          </div>

          <ul
            className="divide-y p-2 text-[12px] tracking-tight
                       [&>li]:flex [&>li]:justify-between [&>li]:py-1 [&>li>div]:font-medium"
          >
            <li>
              <div>Name</div>
              <span>{`${personalInfo?.firstName} ${personalInfo?.middleName} ${personalInfo?.lastName}`}</span>
            </li>
            <li>
              <div>Date of birth</div>
              <span>{new Date(personalInfo?.dob)?.toLocaleDateString("en-GB")}</span>
            </li>
            <li>
              <div>PAN</div>
              <span>{personalInfo?.panNumber}</span>
            </li>
            <li>
              <div>Gender</div>
              <span>{personalInfo?.gender}</span>
            </li>
            <li>
              <div>Assessment Year</div>
              <span>{itrObj?.Form_ITR1?.AssessmentYear}</span>
            </li>
            <li>
              <div>Residential Status</div>
              <span>-</span>
            </li>
          </ul>
        </div>

        {/* Income Sources */}
        <div className="rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Icon className="rounded-md bg-red-600/10 p-1 w-7 h-7 text-red-600" icon="game-icons:pay-money" />
              <h2 className="text-sm font-semibold text-blue-400">Income Sources</h2>
            </div>
            <Link
              href="/dashboard/itr/itr-filling/taxes-paid"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:underline"
            >
              Modify if Required <Icon icon="bx:edit" />
            </Link>
          </div>
          <div className="flex justify-between p-2 text-[12px] tracking-tight">
            <div className="font-medium">Gross Total Income</div>
            <div className="font-semibold">₹ {itrObj?.ITR1_IncomeDeductions?.GrossTotIncome}</div>
          </div>
        </div>

        {/* Deductions */}
        <div className="rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Icon className="rounded-md bg-green-600/10 p-1 w-7 h-7 text-green-600" icon="solar:wallet-money-line-duotone" />
              <h2 className="text-sm font-semibold text-blue-400">Tax Savings (Deductions)</h2>
            </div>
            <Link
              href="/dashboard/itr/itr-filling/deductions"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:underline"
            >
              Modify if Required <Icon icon="bx:edit" />
            </Link>
          </div>

          <div className="p-2">
            <ul
              className="divide-y text-[12px] tracking-tight
                         [&>li]:flex [&>li]:justify-between [&>li]:py-1 [&>li>div]:font-medium"
            >
              <li><div>Section 80C</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80C}</span></li>
              <li><div>Section 80CCC</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCC}</span></li>
              <li><div>Section 80CCD(1B)</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCD1B}</span></li>
              <li><div>Section 80CCD (EmployeeOrSE)</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCDEmployeeOrSE}</span></li>
              <li><div>Section 80CCD (Employer)</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80CCDEmployer}</span></li>
              <li><div>Section 80D</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80D}</span></li>
              <li><div>Section 80DD</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80DD}</span></li>
              <li><div>Section 80DDB</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80DDB}</span></li>
              <li><div>Section 80E</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80E}</span></li>
              <li><div>Section 80EE</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80EE}</span></li>
              <li><div>Section 80EEA</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80EEA}</span></li>
              <li><div>Section 80EEB</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80EEB}</span></li>
              <li><div>Section 80G</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80G}</span></li>
              <li><div>Section 80GG</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80GG}</span></li>
              <li><div>Section 80GGA</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80GGA}</span></li>
              <li><div>Section 80GGC</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80GGC}</span></li>
              <li><div>Section 80TTA</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80TTA}</span></li>
              <li><div>Section 80TTB</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80TTB}</span></li>
              <li><div>Section 80U</div><span>₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.Section80U}</span></li>
            </ul>

            <div className="mt-2 flex items-center justify-between rounded-md bg-blue-500/10 p-2 text-[12px]">
              <div className="font-medium">Total Deduction</div>
              <span className="font-semibold">
                ₹ {itrObj?.ITR1_IncomeDeductions?.DeductUndChapVIA?.TotalChapVIADeductions}
              </span>
            </div>
          </div>
        </div>

        {/* Tax Payable */}
        <div className="rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 p-2">
            <Icon className="rounded-md bg-fuchsia-600/10 p-1 w-7 h-7 text-fuchsia-600" icon="material-symbols-light:source-notes-rounded" />
            <h2 className="text-sm font-semibold text-blue-400">Tax Payable</h2>
          </div>

          <ul className="divide-y p-2 text-[12px] tracking-tight">
            <li className="grid grid-flow-col justify-between py-1">
              <span>Total Taxable Income (GTI − Deductions)</span>
              <span className="font-semibold">₹ {itrObj?.ITR1_IncomeDeductions?.GrossTotIncome}</span>
            </li>
            <li className="grid grid-flow-col justify-between py-1">
              <span>Income Tax at normal rates</span>
              <span className="font-semibold">₹ {taxCalculated?.incomeTax}</span>
            </li>
            <li className="grid grid-flow-col justify-between py-1">
              <span>Surcharge</span>
              <span className="font-semibold">₹ {taxCalculated?.surcharge}</span>
            </li>
            <li className="grid grid-flow-col justify-between py-1">
              <span>Health and Education Cess</span>
              <span className="font-semibold">₹ {taxCalculated?.healthAndEducationCess}</span>
            </li>
            <li className="grid grid-flow-col justify-between py-1">
              <span>Total Tax Liability</span>
              <span className="font-semibold">₹ {taxCalculated?.totalTaxLiability}</span>
            </li>
          </ul>

          <div className="mx-2 mb-2 flex items-center justify-between rounded-md bg-blue-500/10 p-2 text-[12px]">
            <div className="font-medium">Total Tax Payable (Tax + Interest)</div>
            <span className="font-semibold">₹ {itrObj?.ITR1_TaxComputation?.TotalTaxPayable}</span>
          </div>
        </div>

        {/* Tax Paid */}
        <div className="rounded-xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Icon className="rounded-md bg-orange-600/10 p-1 w-7 h-7 text-orange-600" icon="material-symbols:paid" />
              <h2 className="text-sm font-semibold text-blue-400">Tax Paid</h2>
            </div>
            <Link
              href="/dashboard/itr/itr-filling/taxes-paid"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:underline"
            >
              Modify if Required <Icon icon="bx:edit" />
            </Link>
          </div>

          <div className="flex justify-between p-2 text-[12px] tracking-tight">
            <div className="font-medium">Total Tax Paid</div>
            <div className="font-semibold">₹ {itrObj?.TaxPaid?.TaxesPaid?.TotalTaxesPaid}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            onClick={() => { downloadJSON(); }}
            className="my-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2 text-[12px] font-semibold text-white shadow-md shadow-primary/25 transition hover:scale-[1.01] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-[0.99]"
          >
            Download JSON
          </button>
        </div>
      </div>
    </div>
  </>
);



}
