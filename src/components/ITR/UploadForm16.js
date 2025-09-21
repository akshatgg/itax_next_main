/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  NameSection,
  UploadBox,
  Image,
  ProgressBox,
  ProgressBar,
} from "@/app/styles/UploadFileStyles";
import Dropzone from "react-dropzone";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";

const UploadForm16 = () => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [form16Processed, setForm16Processed] = useState(() => {
    // Check localStorage for existing Form 16 data
    if (typeof window !== 'undefined') {
      const savedForm16 = localStorage.getItem('form16ProcessedData');
      return savedForm16 ? true : false;
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState(true);
  const [image, setImage] = useState([{}]);
  const [pdf, setPdf] = useState([]);
  const [fileType, setFileType] = useState("");
  const [form16Json, setForm16Json] = useState(() => {
    // Load Form 16 data from localStorage on component mount
    if (typeof window !== 'undefined') {
      const savedForm16 = localStorage.getItem('form16ProcessedData');
      return savedForm16 ? JSON.parse(savedForm16) : null;
    }
    return null;
  });

  const [_, dispatch] = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      alert("Please select a Form 16 file to upload");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      const file = files[0];

      formData.append("file", file);

      const res = await fetch(`http://localhost:9000/api/parse_form16`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status} - ${res.statusText}`);
      }

      const form16Obj = await res.json();

      if (!form16Obj || (!form16Obj.part_a && !form16Obj.part_b)) {
        throw new Error("Invalid response format from Form 16 parsing API");
      }

      setForm16Processed(true);
      setForm16Json({ ...form16Obj });

      // Save Form 16 data to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('form16ProcessedData', JSON.stringify(form16Obj));
      }

      setIsLoading(false);
      setData();
    } catch (err) {
      setIsLoading(false);
      console.error("Error parsing Form 16:", err);

      let errorMessage = "Failed to parse Form 16. ";
      if (err.message.includes("Failed to fetch")) {
        errorMessage += "Please ensure the parsing service is running on localhost:9000.";
      } else if (err.message.includes("status: 500")) {
        errorMessage += "Server error occurred while processing the PDF.";
      } else if (err.message.includes("Invalid response format")) {
        errorMessage += "The uploaded file could not be processed correctly.";
      } else {
        errorMessage += err.message;
      }

      alert(errorMessage);
    }
  };

  useEffect(() => {
    const setData = () => {
      const partA = form16Json?.part_a;
      const partB = form16Json?.part_b;
      const salaryDetails = partB?.details_of_salary_paid_and_any_other_income_and_tax_deducted;
      const grossSalary = salaryDetails?.gross_salary;
      const exemptions = salaryDetails?.less_allowances_to_the_extent_exempt_under_section_10;
      const deductions = salaryDetails?.deductions_under_chapter_vi_a;
      const section16Deductions = salaryDetails?.less_deductions_under_section_16;
      const otherIncome = salaryDetails?.add_any_other_income_reported_by_the_employee_under_as_per_section_192_2b;
      const tdsQuarterly = partA?.summary_of_amount_paid_or_credited_and_tax_deducted;

      // Helper function to safely parse numbers from Form 16 data
      const safeParseFloat = (value) => {
        if (value === undefined || value === null || value === "") return undefined;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? undefined : parsed;
      };

      // Helper function to check if field exists and has value in Form 16
      const hasFormData = (value) => {
        return value !== undefined && value !== null && value !== "" && !isNaN(parseFloat(value));
      };

      // Build form data object dynamically - ensure required structure for components
      const formData = {
        // Always provide basic structure that components expect
        employerStatus: {
          employerType: "",
          centerGovEmployee: false,
        },
        salaryAsPerSection17_1: {
          salary: undefined,
          pensioner: false,
        }
      };

      // Basic employer information - only if available
      if (partA?.name_and_address_of_the_employer_or_specified_bank) {
        formData.nameOfEmployer = partA.name_and_address_of_the_employer_or_specified_bank;
      }

      // Salary components under Section 17 - only if present in Form 16
      if (hasFormData(grossSalary?.salary_as_per_provisions_contained_in_section_17_1?.[0])) {
        formData.salaryAsPerSection17_1.salary = safeParseFloat(grossSalary.salary_as_per_provisions_contained_in_section_17_1[0]);
      }

      if (hasFormData(grossSalary?.value_of_perquisites_under_section_17_2?.[0])) {
        formData.valueOfPerquisitesUnderSection17_2 = safeParseFloat(grossSalary.value_of_perquisites_under_section_17_2[0]);
      }

      if (hasFormData(grossSalary?.profits_in_lieu_of_salary_under_section_17_3?.[0])) {
        formData.profitsInLieuOfSalaryUnderSection17_3 = safeParseFloat(grossSalary.profits_in_lieu_of_salary_under_section_17_3[0]);
      }

      if (hasFormData(grossSalary?.total)) {
        formData.grossSalary = safeParseFloat(grossSalary.total);
      }

      // Exemptions under Section 10 - only if present
      if (hasFormData(exemptions?.total_amount_of_exemption_claimed_under_section_10?.[1])) {
        formData.exemptAllowancesUnderSection_10 = safeParseFloat(exemptions.total_amount_of_exemption_claimed_under_section_10[1]);
      }

      if (hasFormData(exemptions?.house_rent_allowance_under_section_10_13A?.[0])) {
        formData.houseRentAllowance = safeParseFloat(exemptions.house_rent_allowance_under_section_10_13A[0]);
      }

      if (hasFormData(exemptions?.travel_concession_or_assistance_under_section_10_5?.[0])) {
        formData.leaveTravelConcessionAssistance = safeParseFloat(exemptions.travel_concession_or_assistance_under_section_10_5[0]);
      }

      if (hasFormData(exemptions?.death_cum_retirement_gratuity_under_section_10_10?.[0])) {
        formData.gratuity = safeParseFloat(exemptions.death_cum_retirement_gratuity_under_section_10_10[0]);
      }

      if (hasFormData(exemptions?.commuted_value_of_pension_under_section_10_10A?.[0])) {
        formData.pension = safeParseFloat(exemptions.commuted_value_of_pension_under_section_10_10A[0]);
      }

      if (hasFormData(exemptions?.cash_equivalent_of_leave_salary_encashment_under_section_10_10AA?.[0])) {
        formData.leaveEncashmentOnRetirement = safeParseFloat(exemptions.cash_equivalent_of_leave_salary_encashment_under_section_10_10AA[0]);
      }

      // Net salary and income - only if available
      if (hasFormData(salaryDetails?.total_amount_of_salary_received_from_current_employer_1d_2h?.[1])) {
        formData.netSalary = safeParseFloat(salaryDetails.total_amount_of_salary_received_from_current_employer_1d_2h[1]);
      }

      if (hasFormData(salaryDetails?.gross_total_income?.[1])) {
        formData.totalIncome = safeParseFloat(salaryDetails.gross_total_income[1]);
      }

      // Deductions under Section 16 - only if present
      if (hasFormData(section16Deductions?.standard_deduction_under_section_16_ia?.[0])) {
        formData.standardDeduction = safeParseFloat(section16Deductions.standard_deduction_under_section_16_ia[0]);
      }

      if (hasFormData(section16Deductions?.entertainment_allowance_under_section_16_ii?.[0])) {
        formData.entertainmentAllowanceUnderSection16ii = safeParseFloat(section16Deductions.entertainment_allowance_under_section_16_ii[0]);
      }

      if (hasFormData(section16Deductions?.tax_on_employment_under_section_16_iii?.[0])) {
        formData.professionalTaxUnderSection16iii = safeParseFloat(section16Deductions.tax_on_employment_under_section_16_iii[0]);
      }

      if (hasFormData(salaryDetails?.total_amount_of_deductions_under_section_16?.[1])) {
        formData.totalDeductionsUnderSection16 = safeParseFloat(salaryDetails.total_amount_of_deductions_under_section_16[1]);
      }

      // Income chargeable under head salaries - only if available
      if (hasFormData(salaryDetails?.income_chargeable_under_the_head_salaries?.[1])) {
        formData.incomeChargeableUnderSalaries = safeParseFloat(salaryDetails.income_chargeable_under_the_head_salaries[1]);
      }

      // Other income sources - only if present
      const otherIncomeDetails = {};
      if (hasFormData(otherIncome?.income_or_admissible_loss_from_house_property_reported_by_employee_offered_for_tds?.[0])) {
        otherIncomeDetails.housePropertyIncome = safeParseFloat(otherIncome.income_or_admissible_loss_from_house_property_reported_by_employee_offered_for_tds[0]);
      }
      if (hasFormData(otherIncome?.income_under_the_head_other_sources_offered_for_tds?.[0])) {
        otherIncomeDetails.otherSourcesIncome = safeParseFloat(otherIncome.income_under_the_head_other_sources_offered_for_tds[0]);
      }
      if (hasFormData(salaryDetails?.total_amount_of_other_income_reported_by_the_employee?.[1])) {
        otherIncomeDetails.totalOtherIncome = safeParseFloat(salaryDetails.total_amount_of_other_income_reported_by_the_employee[1]);
      }
      if (Object.keys(otherIncomeDetails).length > 0) {
        formData.otherIncomeDetails = otherIncomeDetails;
      }

      // Chapter VI-A deductions - only include sections that have data
      const deductionsVIA = {};

      // Section 80C family
      if (hasFormData(deductions?.deduction_in_respect_of_life_insurance_premia_pf_etc_under_section_80c?.deductible_amount)) {
        deductionsVIA.section80C = {
          grossAmount: safeParseFloat(deductions.deduction_in_respect_of_life_insurance_premia_pf_etc_under_section_80c.gross_amount),
          deductibleAmount: safeParseFloat(deductions.deduction_in_respect_of_life_insurance_premia_pf_etc_under_section_80c.deductible_amount)
        };
      }

      if (hasFormData(deductions?.deduction_in_respect_of_contribution_to_certain_pension_funds_under_section_80ccc?.deductible_amount)) {
        deductionsVIA.section80CCC = {
          grossAmount: safeParseFloat(deductions.deduction_in_respect_of_contribution_to_certain_pension_funds_under_section_80ccc.gross_amount),
          deductibleAmount: safeParseFloat(deductions.deduction_in_respect_of_contribution_to_certain_pension_funds_under_section_80ccc.deductible_amount)
        };
      }

      if (hasFormData(deductions?.deduction_in_respect_of_contribution_by_taxpayer_to_pensionscheme_under_section_80ccd_1?.deductible_amount)) {
        deductionsVIA.section80CCD_1 = {
          grossAmount: safeParseFloat(deductions.deduction_in_respect_of_contribution_by_taxpayer_to_pensionscheme_under_section_80ccd_1.gross_amount),
          deductibleAmount: safeParseFloat(deductions.deduction_in_respect_of_contribution_by_taxpayer_to_pensionscheme_under_section_80ccd_1.deductible_amount)
        };
      }

      if (hasFormData(deductions?.total_deduction_under_section_80c_80ccc_and_80ccd_1?.deductible_amount)) {
        deductionsVIA.totalSection80C_CCC_CCD1 = {
          grossAmount: safeParseFloat(deductions.total_deduction_under_section_80c_80ccc_and_80ccd_1.gross_amount),
          deductibleAmount: safeParseFloat(deductions.total_deduction_under_section_80c_80ccc_and_80ccd_1.deductible_amount)
        };
      }

      if (hasFormData(deductions?.deductions_in_respect_of_amount_paid_or_deposited_to_notified_pension_scheme_under_section_80ccd_1b?.deductible_amount)) {
        deductionsVIA.section80CCD_1B = {
          grossAmount: safeParseFloat(deductions.deductions_in_respect_of_amount_paid_or_deposited_to_notified_pension_scheme_under_section_80ccd_1b.gross_amount),
          deductibleAmount: safeParseFloat(deductions.deductions_in_respect_of_amount_paid_or_deposited_to_notified_pension_scheme_under_section_80ccd_1b.deductible_amount)
        };
      }

      if (hasFormData(deductions?.deduction_in_respect_of_contribution_by_employer_to_pension_scheme_under_section_80ccd_2?.deductible_amount)) {
        deductionsVIA.section80CCD_2 = {
          grossAmount: safeParseFloat(deductions.deduction_in_respect_of_contribution_by_employer_to_pension_scheme_under_section_80ccd_2.gross_amount),
          deductibleAmount: safeParseFloat(deductions.deduction_in_respect_of_contribution_by_employer_to_pension_scheme_under_section_80ccd_2.deductible_amount)
        };
      }

      if (hasFormData(deductions?.deduction_in_respect_of_health_insurance_premia_under_section_80d?.deductible_amount)) {
        deductionsVIA.section80D = {
          grossAmount: safeParseFloat(deductions.deduction_in_respect_of_health_insurance_premia_under_section_80d.gross_amount),
          deductibleAmount: safeParseFloat(deductions.deduction_in_respect_of_health_insurance_premia_under_section_80d.deductible_amount)
        };
      }

      if (hasFormData(deductions?.deduction_in_respect_of_interest_on_loan_taken_for_higher_education_under_section_80e?.deductible_amount)) {
        deductionsVIA.section80E = {
          grossAmount: safeParseFloat(deductions.deduction_in_respect_of_interest_on_loan_taken_for_higher_education_under_section_80e.gross_amount),
          deductibleAmount: safeParseFloat(deductions.deduction_in_respect_of_interest_on_loan_taken_for_higher_education_under_section_80e.deductible_amount)
        };
      }

      if (hasFormData(deductions?.total_deduction_in_respect_of_donations_to_certain_funds_charitable_institutions_etc_under_section_80g?.deductible_amount)) {
        deductionsVIA.section80G = {
          grossAmount: safeParseFloat(deductions.total_deduction_in_respect_of_donations_to_certain_funds_charitable_institutions_etc_under_section_80g.gross_amount),
          qualifyingAmount: safeParseFloat(deductions.total_deduction_in_respect_of_donations_to_certain_funds_charitable_institutions_etc_under_section_80g.qualifying_amount),
          deductibleAmount: safeParseFloat(deductions.total_deduction_in_respect_of_donations_to_certain_funds_charitable_institutions_etc_under_section_80g.deductible_amount)
        };
      }

      if (hasFormData(deductions?.deduction_in_respect_of_interest_on_deposits_in_savings_account_under_section_80tta?.deductible_amount)) {
        deductionsVIA.section80TTA = {
          grossAmount: safeParseFloat(deductions.deduction_in_respect_of_interest_on_deposits_in_savings_account_under_section_80tta.gross_amount),
          qualifyingAmount: safeParseFloat(deductions.deduction_in_respect_of_interest_on_deposits_in_savings_account_under_section_80tta.qualifying_amount),
          deductibleAmount: safeParseFloat(deductions.deduction_in_respect_of_interest_on_deposits_in_savings_account_under_section_80tta.deductible_amount)
        };
      }

      if (hasFormData(deductions?.total_amount_deductible_under_any_other_provisions_of_chapter_vi_a?.deductible_amount)) {
        deductionsVIA.otherDeductions = {
          grossAmount: safeParseFloat(deductions.total_amount_deductible_under_any_other_provisions_of_chapter_vi_a.gross_amount),
          qualifyingAmount: safeParseFloat(deductions.total_amount_deductible_under_any_other_provisions_of_chapter_vi_a.qualifying_amount),
          deductibleAmount: safeParseFloat(deductions.total_amount_deductible_under_any_other_provisions_of_chapter_vi_a.deductible_amount)
        };
      }

      if (hasFormData(salaryDetails?.aggregate_of_deductible_amount_under_chapter_vi_A)) {
        deductionsVIA.totalDeductions = safeParseFloat(salaryDetails.aggregate_of_deductible_amount_under_chapter_vi_A);
      }

      if (Object.keys(deductionsVIA).length > 0) {
        formData.deductionsUnderChapterVIA = deductionsVIA;
      }

      // Tax computation details - only if available
      const taxDetails = {};
      if (hasFormData(salaryDetails?.total_taxable_income)) {
        taxDetails.taxableIncome = safeParseFloat(salaryDetails.total_taxable_income);
      }
      if (hasFormData(salaryDetails?.tax_on_total_income)) {
        taxDetails.taxOnTotalIncome = safeParseFloat(salaryDetails.tax_on_total_income);
      }
      if (hasFormData(salaryDetails?.rebate_under_section_87a_if_applicable)) {
        taxDetails.rebateUnderSection87A = safeParseFloat(salaryDetails.rebate_under_section_87a_if_applicable);
      }
      if (hasFormData(salaryDetails?.less_relief_under_section_89)) {
        taxDetails.reliefUnderSection89 = safeParseFloat(salaryDetails.less_relief_under_section_89);
      }
      if (hasFormData(salaryDetails?.surcharge_wherever_applicable)) {
        taxDetails.surcharge = safeParseFloat(salaryDetails.surcharge_wherever_applicable);
      }
      if (hasFormData(salaryDetails?.health_and_education_cess)) {
        taxDetails.healthAndEducationCess = safeParseFloat(salaryDetails.health_and_education_cess);
      }
      if (hasFormData(salaryDetails?.tax_payable)) {
        taxDetails.totalTaxAndCess = safeParseFloat(salaryDetails.tax_payable);
      }
      if (hasFormData(salaryDetails?.net_tax_payable)) {
        taxDetails.netTaxPayable = safeParseFloat(salaryDetails.net_tax_payable);
      }
      if (salaryDetails?.whether_opting_for_taxation_us_115bac) {
        taxDetails.taxRegime = salaryDetails.whether_opting_for_taxation_us_115bac === "Yes" ? "new" : "old";
      }
      if (Object.keys(taxDetails).length > 0) {
        formData.taxDetails = taxDetails;
      }

      // TDS details - only if available
      const tdsDetails = {};
      if (hasFormData(partA?.summary_of_amount_paid_or_credited_and_tax_deducted?.total?.total_amt_of_tax_deducted)) {
        tdsDetails.totalTaxDeducted = safeParseFloat(partA.summary_of_amount_paid_or_credited_and_tax_deducted.total.total_amt_of_tax_deducted);
      }
      if (hasFormData(partA?.summary_of_amount_paid_or_credited_and_tax_deducted?.total?.total_amt_paid_or_credited)) {
        tdsDetails.totalAmountPaid = safeParseFloat(partA.summary_of_amount_paid_or_credited_and_tax_deducted.total.total_amt_paid_or_credited);
      }
      if (hasFormData(partA?.summary_of_amount_paid_or_credited_and_tax_deducted?.total?.total_amt_of_tax_deposited_or_remitted)) {
        tdsDetails.totalTaxDeposited = safeParseFloat(partA.summary_of_amount_paid_or_credited_and_tax_deducted.total.total_amt_of_tax_deposited_or_remitted);
      }

      // Quarterly TDS - only if data exists
      const quarterlyTDS = {};
      ['q1', 'q2', 'q3', 'q4'].forEach(quarter => {
        const qData = tdsQuarterly?.[quarter];
        if (qData && (hasFormData(qData.amt_of_tax_deducted) || qData.recieit_number)) {
          quarterlyTDS[quarter] = {
            ...(qData.recieit_number && { receiptNumber: qData.recieit_number }),
            ...(hasFormData(qData.amt_paid_or_credited) && { amountPaid: safeParseFloat(qData.amt_paid_or_credited) }),
            ...(hasFormData(qData.amt_of_tax_deducted) && { taxDeducted: safeParseFloat(qData.amt_of_tax_deducted) }),
            ...(hasFormData(qData.amt_of_tax_deposited_or_remitted) && { taxDeposited: safeParseFloat(qData.amt_of_tax_deposited_or_remitted) })
          };
        }
      });
      if (Object.keys(quarterlyTDS).length > 0) {
        tdsDetails.quarterlyTDS = quarterlyTDS;
      }

      // Challan details - only if available
      const challanDetails = partA?.section_2_tax_deducted_and_deposited_through_challan?.filter(item => item.serial_num);
      if (challanDetails && challanDetails.length > 0) {
        tdsDetails.challanDetails = challanDetails;
      }

      if (Object.keys(tdsDetails).length > 0) {
        formData.tdsDetails = tdsDetails;
      }

      // Employee details - only if available
      const employeeDetails = {};
      if (partA?.pan_of_the_employee_or_specified_senior_citizen) {
        employeeDetails.panOfEmployee = partA.pan_of_the_employee_or_specified_senior_citizen;
      }
      if (partA?.name_and_address_of_the_employee_or_specified_senior_citizen) {
        employeeDetails.nameOfEmployee = partA.name_and_address_of_the_employee_or_specified_senior_citizen.split('\n')?.[0];
        employeeDetails.addressOfEmployee = partA.name_and_address_of_the_employee_or_specified_senior_citizen;
      }
      if (partA?.pan_of_the_deductor) {
        employeeDetails.employerPAN = partA.pan_of_the_deductor;
      }
      if (partA?.tan_of_the_deductor) {
        employeeDetails.employerTAN = partA.tan_of_the_deductor;
      }
      if (partA?.name_and_address_of_the_employer_or_specified_bank) {
        employeeDetails.nameOfEmployer = partA.name_and_address_of_the_employer_or_specified_bank.split('\n')?.[0];
        employeeDetails.addressOfEmployer = partA.name_and_address_of_the_employer_or_specified_bank;
      }
      if (partA?.assesment_year) {
        employeeDetails.assessmentYear = partA.assesment_year;
      }
      if (partA?.period_with_the_employer_from && partA?.period_with_the_employer_to) {
        employeeDetails.financialYear = `${partA.period_with_the_employer_from} to ${partA.period_with_the_employer_to}`;
        employeeDetails.periodFrom = partA.period_with_the_employer_from;
        employeeDetails.periodTo = partA.period_with_the_employer_to;
      }
      if (partA?.certificate_num) {
        employeeDetails.certificateNumber = partA.certificate_num;
      }
      if (partA?.last_updated) {
        employeeDetails.lastUpdated = partA.last_updated;
      }
      if (partA?.employee_ref_num_or_ppo_num_provided_by_employer) {
        employeeDetails.employeeRefNumber = partA.employee_ref_num_or_ppo_num_provided_by_employer;
      }
      if (partA?.cit_tds) {
        employeeDetails.citTdsDetails = partA.cit_tds;
      }
      if (Object.keys(employeeDetails).length > 0) {
        formData.employeeDetails = employeeDetails;
      }

      // Other employers - only if data exists
      const otherEmployers = {};
      if (hasFormData(grossSalary?.reported_total_amount_of_salary_received_from_other_employers?.[1])) {
        otherEmployers.totalSalaryFromOthers = safeParseFloat(grossSalary.reported_total_amount_of_salary_received_from_other_employers[1]);
      }
      if (hasFormData(exemptions?.total_amount_of_exemption_claimed_under_section_10?.[0])) {
        otherEmployers.exemptionsFromOthers = safeParseFloat(exemptions.total_amount_of_exemption_claimed_under_section_10[0]);
      }
      if (Object.keys(otherEmployers).length > 0) {
        formData.otherEmployers = otherEmployers;
      }

      // Form 16 metadata - only if available
      const form16Metadata = {};
      if (partA?.certificate_num) {
        form16Metadata.certificateNumber = partA.certificate_num;
      }
      if (partA?.last_updated) {
        form16Metadata.lastUpdated = partA.last_updated;
      }
      const verificationDetails = {};
      if (partB?.verification?.full_name) {
        verificationDetails.verifierName = partB.verification.full_name;
      }
      if (partB?.verification?.designation) {
        verificationDetails.designation = partB.verification.designation;
      }
      if (partB?.verification?.place) {
        verificationDetails.place = partB.verification.place;
      }
      if (partB?.verification?.date) {
        verificationDetails.date = partB.verification.date;
      }
      if (partB?.verification?.verification_text) {
        verificationDetails.verificationText = partB.verification.verification_text;
      }
      if (Object.keys(verificationDetails).length > 0) {
        form16Metadata.verificationDetails = verificationDetails;
      }
      if (Object.keys(form16Metadata).length > 0) {
        formData.form16Metadata = form16Metadata;
      }

      // Always dispatch form data structure to prevent component errors
      dispatch({
        type: Actions.FORM_16_IMPORT,
        payload: {
          formData
        },
      });
    };

    if (form16Json) {
      setData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form16Json]);

  const removeFileHandler = () => {
    setFileType("");
    setFileName([]);
    setFiles([]);
    setImage([]);
    setPdf([]);
    setIsLoadingPDF(true);
    setForm16Processed(false);
    setForm16Json(null);

    // Clear Form 16 data from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('form16ProcessedData');
    }

    return;
  };

  const handleFile = (e) => {
    if (e[0].type === "image/jpeg" || "image/jpg" || "image/png") {
      setFileType("image");
      image[0] = { url: "", loading: true };
      setImage([...image]);
    }
    if (e[0].type === "application/pdf") {
      setFileType("pdf");
      pdf[0] = { url: "", loading: true };
      setPdf([...pdf]);
    }

    setTimeout(() => {
      const file = e[0];
      fileName[0] = file?.name;
      setFileName([...fileName]);
      if (!file) {
        return;
      }
      files[0] = file;
      setFiles([...files]);
      if (file.type === "application/pdf") {
        pdf[0] = { url: URL.createObjectURL(file), loading: false };
        setIsLoadingPDF(false);
      }
      if (file.type === "image/jpeg" || "image/jpg" || "image/png") {
        image[0] = { url: URL.createObjectURL(file), loading: false };
        console.log("image");
        setImage([...image]);
      }
    }, 2000);
    return;
  };

  const downloadJson = (form16Json) => {
    const data = JSON.stringify(form16Json);
    const blob = new Blob([data], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "FORM_16.json";
    link.href = url;
    link.click();
  };

  return (
    <div className="md:px-8">
      {!form16Processed ? (
        <div 
        // className="flex flex-col md:px-16 px-2 md:flex-row [&>div]:w-full [&>form]:w-full"
        className="flex flex-col container mx-auto px-2 lg:flex-row [&>div]:w-full [&>form]:w-full"
        >
          <form className="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-semibold text-center py-5 border-b">
                Upload Form 16
              </h2>
              <Card>
                <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="absolute w-full h-full flex justify-center items-center"
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps()}
                        accept=".pdf, .jpeg, .jpg, .png "
                      />
                    </div>
                  )}
                </Dropzone>

                <UploadBox className="pointer-events-none">
                  {image[0]?.loading || pdf[0]?.loading ? (
                    <>
                      <ProgressBox>Uploading</ProgressBox>
                      <ProgressBar />
                    </>
                  ) : (
                    <>
                      <MdCloudUpload color="#0055d4" size={40} />
                      <p>Browse files to Upload</p>
                    </>
                  )}
                </UploadBox>
                <NameSection>
                  <div className="flex items-center gap-2">
                    <AiFillFileImage color="#fff" />
                    {fileName && fileName[0] ? fileName[0] : "No File selected"}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => removeFileHandler(e)}
                    disabled={isLoading}
                  >
                    <MdDelete color="#fff" />
                  </button>
                </NameSection>
              </Card>
              <button
                type="submit"
                disabled={isLoadingPDF}
                className="inline-block mx-auto bg-primary px-8 py-2 text-white rounded-md font-semibold cursor-pointer disabled:opacity-25"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-center flex-col gap-3 md:px-8 items-center">
            {fileType === "image" && (
              <div className="max-w-sm text-center">
                <h3 className="text-2xl font-semibold text-slate-900 py-6">Preview</h3>
                {/* <Image src={image[0].url} alt="Uploaded File" /> */}
                <img src={image[0].url} alt="Uploaded File"  />
              </div>
            )}

            {fileType === "pdf" && (
              // <div>
              //   {/* <ReactPDF file={{ url: pdf[0].url }} /> */}
              //   {/* {pdf[0].url} */}
              //   {/* <iframe src={pdf[0].url} frameborder="0" height="500px" width="100%"></iframe> */}
              // </div>
            <div className=" flex-shrink-0 w-full text-center">
              <h3 className="text-2xl font-semibold text-slate-900 py-6">Preview</h3>
              <iframe src={image[0]?.url}frameborder="0" height="500px" width="100%"></iframe> 
            </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-2/3 mx-auto px-12 pt-12 [&>div]:mb-9 shadow-slate-300 shadow-xl">
          <div className="flex font-bold justify-between text-sm gap-4 text-center">
            <span>
              PAN of Employee:{" "}
              <span className="font-normal">
                {form16Json?.part_a?.pan_of_the_employee_or_specified_senior_citizen}
              </span>
            </span>
            <span>
              Assessment Year:{" "}
              <span className="font-normal">
                {form16Json?.part_a?.assesment_year}
              </span>
            </span>
          </div>
          {(() => {
            // Helper function to safely get and format values
            const getFormattedValue = (value) => {
              const num = parseFloat(value);
              return (!isNaN(num) && num !== 0) ? `₹${num.toLocaleString()}` : null;
            };

            const hasValue = (value) => {
              const num = parseFloat(value);
              return !isNaN(num) && num !== 0;
            };

            // Get data from Form 16
            const partA = form16Json?.part_a;
            const partB = form16Json?.part_b;
            const salaryDetails = partB?.details_of_salary_paid_and_any_other_income_and_tax_deducted;
            const grossSalary = salaryDetails?.gross_salary;
            // const exemptions = salaryDetails?.less_allowances_to_the_extent_exempt_under_section_10;
            const deductions = salaryDetails?.deductions_under_chapter_vi_a;
            const section16 = salaryDetails?.less_deductions_under_section_16;
            const tdsTotal = partA?.summary_of_amount_paid_or_credited_and_tax_deducted?.total;

            return (
              <>
                <div className="text-center text-xl font-bold mb-6">
                  Form 16 Summary - Auto-Populated Data
                </div>

                {/* Employee & Employer Details - Only show if data exists */}
                {(partA?.name_and_address_of_the_employee_or_specified_senior_citizen || partA?.pan_of_the_employee_or_specified_senior_citizen || partA?.name_and_address_of_the_employer_or_specified_bank || partA?.pan_of_the_deductor || partA?.tan_of_the_deductor || partA?.assesment_year) && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-lg mb-3">Employee & Employer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {partA?.name_and_address_of_the_employee_or_specified_senior_citizen && (
                        <div><strong>Employee Name:</strong> {partA.name_and_address_of_the_employee_or_specified_senior_citizen.split('\n')?.[0]}</div>
                      )}
                      {partA?.pan_of_the_employee_or_specified_senior_citizen && (
                        <div><strong>Employee PAN:</strong> {partA.pan_of_the_employee_or_specified_senior_citizen}</div>
                      )}
                      {partA?.name_and_address_of_the_employer_or_specified_bank && (
                        <div><strong>Employer:</strong> {partA.name_and_address_of_the_employer_or_specified_bank.split('\n')?.[0]}</div>
                      )}
                      {partA?.pan_of_the_deductor && (
                        <div><strong>Employer PAN:</strong> {partA.pan_of_the_deductor}</div>
                      )}
                      {partA?.tan_of_the_deductor && (
                        <div><strong>TAN:</strong> {partA.tan_of_the_deductor}</div>
                      )}
                      {partA?.assesment_year && (
                        <div><strong>Assessment Year:</strong> {partA.assesment_year}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Income Details - Only show income that has values */}
                {(hasValue(grossSalary?.salary_as_per_provisions_contained_in_section_17_1?.[0]) || hasValue(grossSalary?.value_of_perquisites_under_section_17_2?.[0]) || hasValue(grossSalary?.total) || hasValue(salaryDetails?.total_amount_of_other_income_reported_by_the_employee?.[1]) || hasValue(salaryDetails?.gross_total_income?.[1])) && (
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-lg mb-3">Income Details</h3>
                    <div className="[&>div]:flex [&>div]:justify-between [&>div]:p-2 [&>div]:border-b">
                      {hasValue(grossSalary?.salary_as_per_provisions_contained_in_section_17_1?.[0]) && (
                        <div>
                          <span>Salary as per Section 17(1)</span>
                          <span className="font-semibold">{getFormattedValue(grossSalary.salary_as_per_provisions_contained_in_section_17_1[0])}</span>
                        </div>
                      )}
                      {hasValue(grossSalary?.value_of_perquisites_under_section_17_2?.[0]) && (
                        <div>
                          <span>Value of Perquisites</span>
                          <span className="font-semibold">{getFormattedValue(grossSalary.value_of_perquisites_under_section_17_2[0])}</span>
                        </div>
                      )}
                      {hasValue(grossSalary?.profits_in_lieu_of_salary_under_section_17_3?.[0]) && (
                        <div>
                          <span>Profits in lieu of Salary</span>
                          <span className="font-semibold">{getFormattedValue(grossSalary.profits_in_lieu_of_salary_under_section_17_3[0])}</span>
                        </div>
                      )}
                      {hasValue(grossSalary?.total) && (
                        <div>
                          <span>Gross Salary</span>
                          <span className="font-semibold">{getFormattedValue(grossSalary.total)}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.total_amount_of_other_income_reported_by_the_employee?.[1]) && (
                        <div>
                          <span>Other Income (House Property + Other Sources)</span>
                          <span className="font-semibold">{getFormattedValue(salaryDetails.total_amount_of_other_income_reported_by_the_employee[1])}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.gross_total_income?.[1]) && (
                        <div className="bg-green-100">
                          <span className="font-bold">Gross Total Income</span>
                          <span className="font-bold">{getFormattedValue(salaryDetails.gross_total_income[1])}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Deductions - Only show deductions that have values */}
                {(hasValue(section16?.standard_deduction_under_section_16_ia?.[0]) || hasValue(deductions?.deduction_in_respect_of_life_insurance_premia_pf_etc_under_section_80c?.deductible_amount) || hasValue(deductions?.deduction_in_respect_of_health_insurance_premia_under_section_80d?.deductible_amount) || hasValue(deductions?.total_deduction_in_respect_of_donations_to_certain_funds_charitable_institutions_etc_under_section_80g?.deductible_amount) || hasValue(salaryDetails?.aggregate_of_deductible_amount_under_chapter_vi_A)) && (
                  <div className="bg-orange-50 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-lg mb-3">Deductions</h3>
                    <div className="[&>div]:flex [&>div]:justify-between [&>div]:p-2 [&>div]:border-b">
                      {hasValue(section16?.standard_deduction_under_section_16_ia?.[0]) && (
                        <div>
                          <span>Standard Deduction (Section 16)</span>
                          <span className="font-semibold">{getFormattedValue(section16.standard_deduction_under_section_16_ia[0])}</span>
                        </div>
                      )}
                      {hasValue(deductions?.deduction_in_respect_of_life_insurance_premia_pf_etc_under_section_80c?.deductible_amount) && (
                        <div>
                          <span>Section 80C (LIC, PF, etc.)</span>
                          <span className="font-semibold">{getFormattedValue(deductions.deduction_in_respect_of_life_insurance_premia_pf_etc_under_section_80c.deductible_amount)}</span>
                        </div>
                      )}
                      {hasValue(deductions?.deduction_in_respect_of_health_insurance_premia_under_section_80d?.deductible_amount) && (
                        <div>
                          <span>Section 80D (Health Insurance)</span>
                          <span className="font-semibold">{getFormattedValue(deductions.deduction_in_respect_of_health_insurance_premia_under_section_80d.deductible_amount)}</span>
                        </div>
                      )}
                      {hasValue(deductions?.total_deduction_in_respect_of_donations_to_certain_funds_charitable_institutions_etc_under_section_80g?.deductible_amount) && (
                        <div>
                          <span>Section 80G (Donations)</span>
                          <span className="font-semibold">{getFormattedValue(deductions.total_deduction_in_respect_of_donations_to_certain_funds_charitable_institutions_etc_under_section_80g.deductible_amount)}</span>
                        </div>
                      )}
                      {hasValue(deductions?.deduction_in_respect_of_interest_on_loan_taken_for_higher_education_under_section_80e?.deductible_amount) && (
                        <div>
                          <span>Section 80E (Education Loan Interest)</span>
                          <span className="font-semibold">{getFormattedValue(deductions.deduction_in_respect_of_interest_on_loan_taken_for_higher_education_under_section_80e.deductible_amount)}</span>
                        </div>
                      )}
                      {hasValue(deductions?.deduction_in_respect_of_interest_on_deposits_in_savings_account_under_section_80tta?.deductible_amount) && (
                        <div>
                          <span>Section 80TTA (Savings Interest)</span>
                          <span className="font-semibold">{getFormattedValue(deductions.deduction_in_respect_of_interest_on_deposits_in_savings_account_under_section_80tta.deductible_amount)}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.aggregate_of_deductible_amount_under_chapter_vi_A) && (
                        <div className="bg-orange-100">
                          <span className="font-bold">Total Deductions (Chapter VI-A)</span>
                          <span className="font-bold">{getFormattedValue(salaryDetails.aggregate_of_deductible_amount_under_chapter_vi_A)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tax Computation - Only show tax details that have values */}
                {(hasValue(salaryDetails?.total_taxable_income) || hasValue(salaryDetails?.tax_on_total_income) || hasValue(salaryDetails?.rebate_under_section_87a_if_applicable) || hasValue(salaryDetails?.surcharge_wherever_applicable) || hasValue(salaryDetails?.health_and_education_cess) || hasValue(salaryDetails?.net_tax_payable)) && (
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-lg mb-3">Tax Computation</h3>
                    <div className="[&>div]:flex [&>div]:justify-between [&>div]:p-2 [&>div]:border-b">
                      {hasValue(salaryDetails?.total_taxable_income) && (
                        <div className="bg-yellow-100">
                          <span className="font-bold">Taxable Income</span>
                          <span className="font-bold">{getFormattedValue(salaryDetails.total_taxable_income)}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.tax_on_total_income) && (
                        <div>
                          <span>Tax on Total Income</span>
                          <span className="font-semibold">{getFormattedValue(salaryDetails.tax_on_total_income)}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.rebate_under_section_87a_if_applicable) && (
                        <div>
                          <span>Rebate under Section 87A</span>
                          <span className="font-semibold">{getFormattedValue(salaryDetails.rebate_under_section_87a_if_applicable)}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.surcharge_wherever_applicable) && (
                        <div>
                          <span>Surcharge</span>
                          <span className="font-semibold">{getFormattedValue(salaryDetails.surcharge_wherever_applicable)}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.health_and_education_cess) && (
                        <div>
                          <span>Health & Education Cess</span>
                          <span className="font-semibold">{getFormattedValue(salaryDetails.health_and_education_cess)}</span>
                        </div>
                      )}
                      {hasValue(salaryDetails?.net_tax_payable) && (
                        <div className="bg-red-100">
                          <span className="font-bold">Net Tax Payable</span>
                          <span className="font-bold">{getFormattedValue(salaryDetails.net_tax_payable)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TDS Summary - Only show if TDS data exists */}
                {(hasValue(tdsTotal?.total_amt_paid_or_credited) || hasValue(tdsTotal?.total_amt_of_tax_deducted) || hasValue(tdsTotal?.total_amt_of_tax_deposited_or_remitted)) && (
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-lg mb-3">TDS Summary</h3>
                    <div className="[&>div]:flex [&>div]:justify-between [&>div]:p-2 [&>div]:border-b">
                      {hasValue(tdsTotal?.total_amt_paid_or_credited) && (
                        <div>
                          <span>Total Amount Paid/Credited</span>
                          <span className="font-semibold">{getFormattedValue(tdsTotal.total_amt_paid_or_credited)}</span>
                        </div>
                      )}
                      {hasValue(tdsTotal?.total_amt_of_tax_deducted) && (
                        <div className="bg-purple-100">
                          <span className="font-bold">Total Tax Deducted (TDS)</span>
                          <span className="font-bold">{getFormattedValue(tdsTotal.total_amt_of_tax_deducted)}</span>
                        </div>
                      )}
                      {hasValue(tdsTotal?.total_amt_of_tax_deposited_or_remitted) && (
                        <div>
                          <span>Total Tax Deposited</span>
                          <span className="font-semibold">{getFormattedValue(tdsTotal.total_amt_of_tax_deposited_or_remitted)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tax Refund/Payable - Only show if both tax payable and TDS data exist */}
                {(hasValue(salaryDetails?.net_tax_payable) && hasValue(tdsTotal?.total_amt_of_tax_deducted)) && (
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-lg mb-3">Final Tax Position</h3>
                    <div className="text-center">
                      {(() => {
                        const taxPayable = parseFloat(salaryDetails.net_tax_payable);
                        const tdsDeducted = parseFloat(tdsTotal.total_amt_of_tax_deducted);
                        const difference = tdsDeducted - taxPayable;

                        if (difference > 0) {
                          return (
                            <div className="text-green-600">
                              <span className="text-2xl font-bold">Refund Due: ₹{difference.toLocaleString()}</span>
                            </div>
                          );
                        } else if (difference < 0) {
                          return (
                            <div className="text-red-600">
                              <span className="text-2xl font-bold">Tax Payable: ₹{Math.abs(difference).toLocaleString()}</span>
                            </div>
                          );
                        } else {
                          return (
                            <div className="text-blue-600">
                              <span className="text-2xl font-bold">No Tax Payable/Refund</span>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
          <div className="flex justify-center gap-3 py-3 flex-wrap">
            <button
              onClick={() => downloadJson(form16Json)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer transition-colors"
            >
              Download Complete Form 16 Data (JSON)
            </button>
            <button
              onClick={() => {
                // Create a button for user to provide Form 16 PDF
                const link = document.createElement('a');
                link.href = `data:text/plain;charset=utf-8,${encodeURIComponent('Please provide your Form 16 PDF file for processing.\n\nUpload your Form 16 PDF using the upload section above to automatically extract and populate all tax-related information including:\n\n• Salary details\n• Deductions under various sections\n• Tax computations\n• TDS details\n• Employer information\n\nThe system will automatically fill all relevant fields in your tax return.')}`;
                link.download = 'How_to_provide_Form16_PDF.txt';
                link.click();
              }}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer transition-colors"
            >
              📄 Provide Form 16 PDF Instructions
            </button>
            <button
              onClick={() => {
                // Show detailed breakdown
                const detailedData = {
                  employeeDetails: form16Json?.part_a,
                  salaryDetails: form16Json?.part_b?.details_of_salary_paid_and_any_other_income_and_tax_deducted,
                  tdsBreakdown: form16Json?.part_a?.summary_of_amount_paid_or_credited_and_tax_deducted,
                  challanDetails: form16Json?.part_a?.section_2_tax_deducted_and_deposited_through_challan,
                };

                console.log('Detailed Form 16 Breakdown:', detailedData);
                alert('Detailed Form 16 data has been logged to console. Check developer tools (F12) -> Console tab');
              }}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer transition-colors"
            >
              🔍 View Detailed Breakdown
            </button>
            <button
              onClick={removeFileHandler}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer transition-colors"
            >
              🗑️ Clear Form 16 Data & Upload New
            </button>
          </div>

          {/* Enhanced notice about data persistence */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    <strong>✅ Form 16 Data Successfully Processed:</strong> All your tax information has been automatically extracted and saved. This data will persist across browser sessions and tab switches until you explicitly upload a new Form 16.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>💾 Data Persistence:</strong> Your Form 16 data is safely stored and will remain available even if you:
                  </p>
                  <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Switch to other tabs in the application</li>
                    <li>Close and reopen your browser</li>
                    <li>Navigate to different sections of the tax return</li>
                  </ul>
                  <p className="mt-2 text-sm text-blue-700">
                    <strong>Note:</strong> This data will only be cleared when you click &ldquo;🗑️ Clear Form 16 Data &amp; Upload New&rdquo; button.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm16;