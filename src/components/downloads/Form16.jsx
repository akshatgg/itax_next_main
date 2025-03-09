'use client';

import { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useFieldArray, useForm } from 'react-hook-form';
import { IoIosAddCircle } from 'react-icons/io';
import { IoRemoveCircleSharp } from 'react-icons/io5';

const Form16 = () => {
  // const [showHeader, setShowHeader] = useState(true);
  const [totalTaxDeposits, setTotalTaxDeposits] = useState(0); //FOR TAX DEPOSIT Challan
  const [totalTaxDepositsBook, setTotalTaxDepositsBook] = useState(0); //FOR TAX DEPOSIT Book
  // useEffect(() => {
  //   // Hide the header after the initial render
  //   setShowHeader(false);
  // }, []);
  const [pageNumber, setPageNumber] = useState(1); // Initialize with page 1

  // Function to handle printing
  const handlePrint = () => {
    // Update page number when printing
    setPageNumber(1);
    window.print();
  };
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,

    documentTitle: 'Form 16 Itaxeasy',
  });

  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      partACertificateNo: '',
      partALastUpdatedOn: '',
      partANameAndAddressOfTheEmployer: '',
      partANameAndAddressOfTheEmployee: '',
      partAPanOfTheDeductor: '',
      partATanOfTheDeductor: '',
      partAPanOfTheEmployeeOrSpecifiedSeniorCitizen: '',
      partAEmployeeReferenceNoProvidedOrPensionPaymentOrderNoProvidedByTheEmployer:
        '',
      partACitTds: '',
      partAAssessmentYear: '',
      partAPeriodWithTheEmployer: {
        from: '',
        to: '',
      },
      partBCertificateNo: '',
      partBLastUpdatedOn: '',
      partBNameAndAddressOfTheEmployer: '',
      partBNameAndAddressOfTheEmployee: '',
      partBPanOfTheDeductor: '',
      partBTanOfTheDeductor: '',
      partBPanOfTheEmployeeOrSpecifiedSeniorCitizen: '',
      partBEmployeeReferenceNoProvidedOrPensionPaymentOrderNoProvidedByTheEmployer:
        '',
      partBCitTds: '',
      partBAssessmentYear: '',
      partBPeriodWithTheEmployer: {
        from: '',
        to: '',
      },
      data: [
        //II-DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH CHALLAN
        {
          siNo: '',
          taxDeposited: '',
          bsrCodeOfTheBankBranch: '',
          dateOnWhichTaxDeposited: '',
          challanSerialNumber: '',
          statusOfMatchingWithOltas: '',
        },
      ],
      data2: [
        //I. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH BOOK ADJUSTMENT
        {
          siNo: '',
          taxDeposited: '',
          receiptNoForm24G: '',
          ddoSerialNo: '',
          dateOfTransferVoucher: '',
          statusOfMatchingWithForm24G: '',
        },
      ],
      quarter: ['Q1', 'Q2', 'Q3', 'Q4'],
      receiptNumber: ['QUOXNNMG', 'QUPEOKMA', 'QUSEUATG', 'QUWXXFYA'],
      amountPaidCredited: [1790258.36, 1005624.06, 1308129.03, 1608550.76],
      amountTaxDeducted: [468246.0, 222677.0, 315976.0, 532988.0],
      amountTaxDeposited: [468246.0, 222677.0, 315976.0, 532988.0],
      //part-B
      grossSalary: [
        //1.Gross Salary
        { a: [{ amount1: '500.00', amount2: '' }] },
        { b: [{ amount1: '500.00', amount2: '' }] },
        { c: [{ amount1: '500.00', amount2: '' }] },
        { e: [{ amount1: '100.00', amount2: '0.00' }] },
      ],
      lessAllowancesUndersection10: [
        //2.Less: Allowances to the extent exempt under section 10
        { a: [{ amount1: '14900.00', amount2: '' }] },
        { b: [{ amount1: '0.00', amount2: '' }] },
        { c: [{ amount1: '0.00', amount2: '' }] },
        { d: [{ amount1: '0.00', amount2: '' }] },
        { e: [{ amount1: '0.00', amount2: '' }] },
        { f: [{ amount1: '0.00', amount2: '' }] },
      ],
      lessDeductionsUndersection16: [
        //3.Less: Deductions under section 16
        { a: [{ amount1: '50000.00', amount2: '' }] },
        { b: [{ amount1: '0.00', amount2: '' }] },
        { c: [{ amount1: '3300.00', amount2: '' }] },
      ],
      incomeReportedUnderSection192: [
        //7.Add: Any other income reported by the employee under as per section 192 (2B)
        { a: [{ amount1: '0.00', amount2: '' }] },
        { b: [{ amount1: '15119.00', amount2: '' }] },
        //Deductions under Chapter VI-A
      ],
      deductionsUnderChapterVIA: [
        //10. Deductions under Chapter VI-A
        { a: [{ grossAmount: '150000.00', deductibleAmount: '150000.00' }] },
        { b: [{ grossAmount: '0.00', deductibleAmount: '0.00' }] },
        { c: [{ grossAmount: '0.00', deductibleAmount: '0.00' }] },
        { d: [{ grossAmount: '', deductibleAmount: '' }] },
        { e: [{ grossAmount: '50000.00', deductibleAmount: '50000.00' }] },
        { f: [{ grossAmount: '282809.00', deductibleAmount: '282809.00' }] },
        { g: [{ grossAmount: '0.00', deductibleAmount: '0.00' }] },
        { h: [{ grossAmount: '0.00', deductibleAmount: '0.00' }] },
        {
          i: [
            {
              grossAmount: '0.00',
              qualifyingAmount: '0.00',
              deductibleAmount: '0.00',
            },
          ],
        },
        {
          j: [
            {
              grossAmount: '0.00',
              qualifyingAmount: '0.00',
              deductibleAmount: '0.00',
            },
          ],
        },
        { k: [{ amount: '' }] },
        {
          l: [
            {
              grossAmount: '0.00',
              qualifyingAmount: '0.00',
              deductibleAmount: '0.00',
            },
          ],
        },
      ],
      brSection10: [
        {
          //part-B break up under section10
          siNo: '1',
          particulars: '0.00',
          grossAmount: '0.00',
          qualifyingAmount: '0.00',
          deductibleAmount: '0.00',
        },
      ],
      brChapterVIA: [
        //Break up for Chapter VI A
        {
          siNo: '1',
          particulars: '0.00',
          grossAmount: '0.00',
          qualifyingAmount: '0.00',
          deducAFullName: '',
          partAFathtibleAmount: '0.00',
        },
      ], //Name and Place details Part A and B...
      placePartA: '',
      datePartA: '',
      signaturePartA: '',
      designationPartA: '',
      fullNamePartA: '',
      place1PartB: '',
      date1PartB: '',
      signature1PartB: '',
      fullName1PartB: '',
      place2PartB: '',
      date2PartB: '',
      signature2PartB: '',
      fullName2PartB: '',
      //Verification part A
      namePartA: '',
      fatherNamePartA: '',
      designationVerificationPartA: '',
      deductedRsPartA: '',
      deductedRsInwordsPartA: '',
      depositedRsPartA: '',
      depositedRsInwordsPartA: '',
      //Verification part B
      namePartB: '',
      fatherNamePartB: '',
      designationPartB: '',
    },
  });

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const { fields, append, remove } = useFieldArray({
    name: 'data',
    control,
  });
  const {
    fields: data2Fields,
    append: appenddata2,
    remove: removedata2,
  } = useFieldArray({
    control,
    name: 'data2',
  });
  const {
    fields: brSection10Fields,
    append: appendbrSection10,
    remove: removebrSection10,
  } = useFieldArray({
    control,
    name: 'brSection10',
  });
  const {
    fields: brChapterVIAFields,
    append: appendbrChapterVIA,
    remove: removebrChapterVIA,
  } = useFieldArray({
    control,
    name: 'brChapterVIA',
  });

  //calculate total for tax-deposit in Challan
  const calculateTotal = () => {
    let total = 0;
    fields.forEach((field, index) => {
      const taxDeposited = parseFloat(
        watch(`data[${index}].taxDeposited`) || 0,
      );
      total += taxDeposited;
    });
    setTotalTaxDeposits(total);
  };

  //calculate total for tax-deposit in Book
  const calculateTotal2 = () => {
    let total = 0;
    data2Fields.forEach((field, index) => {
      const taxDeposited = parseFloat(
        watch(`data2[${index}].taxDeposited`) || 0,
      );
      total += taxDeposited;
    });
    setTotalTaxDepositsBook(total);
  };

  // Calculate totals for summary data
  const summaryData = watch();

  const totals = {
    quarter: 'Total (Rs.)',
    receiptNumber: '',
    amountPaidCredited: summaryData.amountPaidCredited.reduce(
      (total, value) => total + parseFloat(value || 0),
      0,
    ),
    amountTaxDeducted: summaryData.amountTaxDeducted.reduce(
      (total, value) => total + parseFloat(value || 0),
      0,
    ),
    amountTaxDeposited: summaryData.amountTaxDeposited.reduce(
      (total, value) => total + parseFloat(value || 0),
      0,
    ),
  };
  //Calculate for part-B

  const grossSalary1 = parseFloat(
    getValues('grossSalary[0].a[0].amount1') || 0,
  ); //1a
  const grossSalary2 = parseFloat(
    getValues('grossSalary[1].b[0].amount1') || 0,
  ); //1b
  const grossSalary3 = parseFloat(
    getValues('grossSalary[2].c[0].amount1') || 0,
  ); //1c
  const grossSalary4 = parseFloat(
    getValues('grossSalary[3].e[0].amount1') || 0,
  ); //1e
  const totalGrossSalary = (grossSalary1 + grossSalary2 + grossSalary3).toFixed(
    2,
  ); // 1(d)

  const allowance1 = parseFloat(
    getValues('lessAllowancesUndersection10[0].a[0].amount1') || 0,
  ); //2a
  const allowance2 = parseFloat(
    getValues('lessAllowancesUndersection10[1].b[0].amount1') || 0,
  ); //2b
  const allowance3 = parseFloat(
    getValues('lessAllowancesUndersection10[2].c[0].amount1') || 0,
  ); //2c
  const allowance4 = parseFloat(
    getValues('lessAllowancesUndersection10[3].d[0].amount1') || 0,
  ); //2d
  const allowance5 = parseFloat(
    getValues('lessAllowancesUndersection10[4].e[0].amount1') || 0,
  ); //2e
  const allowance6 = parseFloat(
    getValues('lessAllowancesUndersection10[5].f[0].amount1') || 0,
  ); //2f
  const totalAllowances = (
    allowance1 +
    allowance2 +
    allowance3 +
    allowance4 +
    allowance5 +
    allowance6
  ).toFixed(2); //2(g)
  const totalExemption = (
    allowance1 +
    allowance2 +
    allowance3 +
    allowance4 +
    allowance5 +
    parseFloat(totalAllowances)
  ).toFixed(2); //2(h) - [2(a)+2(b)+2(c)+2(d)+2(e)+2(g)]

  const totalSalaryCurrentEmployer = (
    parseFloat(totalGrossSalary) - parseFloat(totalExemption)
  ).toFixed(2); //[1(d)-2(h)]  (3)

  const deduction1 = parseFloat(
    getValues('lessDeductionsUndersection16[0].a[0].amount1') || 0,
  ); //4a
  const deduction2 = parseFloat(
    getValues('lessDeductionsUndersection16[1].b[0].amount1') || 0,
  ); //4b
  const deduction3 = parseFloat(
    getValues('lessDeductionsUndersection16[2].c[0].amount1') || 0,
  ); //4c

  const totalDeductions = (deduction1 + deduction2 + deduction3).toFixed(2); //5 -[4(a)+4(b)+4(c)]

  const incomeChargeableHeadSalaries = (
    parseFloat(totalSalaryCurrentEmployer) +
    grossSalary4 -
    parseFloat(totalDeductions)
  ).toFixed(2); // 6  - [(3+1(e)-5]

  const incomeReported1 = parseFloat(
    getValues('incomeReportedUnderSection192[0].a[0].amount1') || 0,
  ); //7a
  const incomeReported2 = parseFloat(
    getValues('incomeReportedUnderSection192[1].b[0].amount1') || 0,
  ); //7b
  const totalIncomeReported = (incomeReported1 + incomeReported2).toFixed(2); //8

  const grossTotalIncome = (
    parseFloat(incomeChargeableHeadSalaries) + parseFloat(totalIncomeReported)
  ).toFixed(2); //9

  //10.deductionsUnderChapterVIA

  const deductionsGrossAmountA = parseFloat(
    getValues('deductionsUnderChapterVIA[0].a[0].grossAmount') || 0,
  ); //10a GrossAmount
  const deductionsGrossAmountB = parseFloat(
    getValues('deductionsUnderChapterVIA[1].b[0].grossAmount') || 0,
  ); //10b GrossAmount
  const deductionsGrossAmountC = parseFloat(
    getValues('deductionsUnderChapterVIA[2].c[0].grossAmount') || 0,
  ); //10c GrossAmount
  const totalDeductionsGrossAmountABC = (
    deductionsGrossAmountA +
    deductionsGrossAmountB +
    deductionsGrossAmountC
  ).toFixed(2); //10d Total of 10a+b+c gross amount

  const deductionsDeductibleAmountA = parseFloat(
    getValues('deductionsUnderChapterVIA[0].a[0].deductibleAmount') || 0,
  ); //10a DeductibleAmount
  const deductionsDeductibleAmountB = parseFloat(
    getValues('deductionsUnderChapterVIA[1].b[0].deductibleAmount') || 0,
  ); //10b DeductibleAmount
  const deductionsDeductibleAmountC = parseFloat(
    getValues('deductionsUnderChapterVIA[2].c[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const deductionsDeductibleAmountE = parseFloat(
    getValues('deductionsUnderChapterVIA[4].e[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const deductionsDeductibleAmountF = parseFloat(
    getValues('deductionsUnderChapterVIA[5].f[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const deductionsDeductibleAmountG = parseFloat(
    getValues('deductionsUnderChapterVIA[6].g[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const deductionsDeductibleAmountH = parseFloat(
    getValues('deductionsUnderChapterVIA[7].h[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const deductionsDeductibleAmountI = parseFloat(
    getValues('deductionsUnderChapterVIA[8].i[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const deductionsDeductibleAmountJ = parseFloat(
    getValues('deductionsUnderChapterVIA[9].j[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const deductionsDeductibleAmountL = parseFloat(
    getValues('deductionsUnderChapterVIA[10].l[0].deductibleAmount') || 0,
  ); //10c DeductibleAmount
  const totalDeductionsDeductibleAmountABC = (
    deductionsDeductibleAmountA +
    deductionsDeductibleAmountB +
    deductionsDeductibleAmountC
  ).toFixed(2); //10d Total of 10a+b+c deductible amount
  const aggregateOfDeductibleAmount = (
    parseFloat(totalDeductionsDeductibleAmountABC) +
    deductionsDeductibleAmountE +
    deductionsDeductibleAmountF +
    deductionsDeductibleAmountG +
    deductionsDeductibleAmountH +
    deductionsDeductibleAmountI +
    deductionsDeductibleAmountJ +
    deductionsDeductibleAmountL
  ).toFixed(2); //11

  const totalTaxableIncome = (
    parseFloat(grossTotalIncome) - parseFloat(aggregateOfDeductibleAmount)
  ).toFixed(2); //12  (9-11)

  return (
    <>
      <button
        onClick={generatePDF}
        className="bg-blue-200 border rounded-md p-2 m-2 font-bold cursor-pointer hover:bg-blue-300"
      >
        Print
      </button>
      <div
        className="px-2 sm:px-2  max-w-full overflow-auto mt-2 break-after-column "
        ref={componentPDF}
        // onSubmit={handleSubmit(onSubmit)}
      >
        <table className="print-table">
          <thead className="text-center border border-neutral-900 border-collapse  print-header-first ">
            <tr className=" border border-neutral-900 border-collapse  ">
              <th className=" border border-neutral-900 border-collapse">
                <h5>FORM NO. 16</h5>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className=" border border-neutral-900 border-collapse text-gray-900 text-xs">
              <td>
                <h6>[See rule 31(1)(a)]</h6>
              </td>
            </tr>
            <tr className=" border border-neutral-900 text-gray-900 text-lg font-bold">
              <td>
                <h6>PART A</h6>
              </td>
            </tr>
            <tr className="px-2 py-2 border border-neutral-900 border-collapse text-sm text-gray-900 font-bold">
              <td>
                Certificate under section 203 of the Inc ome-tax Act, 1961 for
                tax deducted at source on salary paid to an employee under
                section 192 or pension/interest income of specified senior
                citizen under section 194P
              </td>
            </tr>
            <tr className=" border border-neutral-900 border-collapse grid  grid-cols-2">
              <td className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 text-left ">
                Certificate No.
                <input
                  {...register('partACertificateNo')}
                  className="ml-2 outline-none text-neutral-500 font-medium"
                />
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse text-left">
                Last updated on
                <input
                  {...register('partALastUpdatedOn')}
                  className="min-w-fit outline-none  ml-2 text-neutral-500 font-medium"
                />
              </td>
            </tr>

            <tr className=" border-collapse border border-neutral-600 grid grid-cols-2">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse">
                Name and address of the Employer/Specified Bank
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse">
                Name and address of the Employee/Specified senior citizen
              </td>
            </tr>

            <tr className=" border-collapse border border-neutral-600  grid grid-cols-2 grid-rows-1">
              <td className="text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-1">
                <textarea
                  {...register('partANameAndAddressOfTheEmployer')}
                  className="text-neutral-500 font-medium w-full h-28 resize-none px-2 py-4  outline-none no-border text-justify"
                  contentEditable={true}
                />
              </td>
              <td className="   text-sm font-medium text-neutral-500 border-collapse border border-neutral-600">
                <textarea
                  {...register('partANameAndAddressOfTheEmployee')}
                  className="text-neutral-500 font-medium w-full h-28 resize-none px-2 py-4 text-justify outline-none no-border"
                  contentEditable={true}
                />
              </td>
            </tr>

            <tr className=" border-collapse grid grid-cols-4">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600">
                PAN of the Deductor
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600">
                TAN of the Deductor
              </td>

              <td className="px-2 py-4  text-sm  font-bold text-gray-900 border border-neutral-600 ">
                PAN of the Employee/Specified senior citizen
              </td>
              <td className="px-2 py-4  text-sm font-bold text-justify text-gray-950 border border-neutral-600 tracking-tight ">
                Employee Reference No. provided by the Employer/Pension Payment
                order no. provided by the Employer (If available)
              </td>
            </tr>

            <tr className=" border-collapse grid grid-cols-4">
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600">
                <input
                  {...register('partAPanOfTheDeductor')}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600">
                <input
                  {...register('partATanOfTheDeductor')}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500  border border-neutral-600">
                <input
                  {...register('partAPanOfTheEmployeeOrSpecifiedSeniorCitizen')}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500  border border-neutral-600">
                <input
                  {...register(
                    'partAEmployeeReferenceNoProvidedOrPensionPaymentOrderNoProvidedByTheEmployer',
                  )}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-4">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2">
                CIT (TDS)
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600">
                Assessment Year
              </td>
              <td className="px-2 py-4  text-sm  font-bold text-gray-900 border border-neutral-600">
                Period with the Employer
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-8 ">
              <td className="  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-4">
                <textarea
                  {...register('partACitTds')}
                  className="focus:outline-none no-border w-full  text-neutral-500  px-2 py-4   h-28 resize-none text-justify outline-none "
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-2">
                <input
                  {...register('partAAssessmentYear')}
                  className="  w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
              <td className=" py-4 text-sm  font-bold text-gray-900 border border-neutral-600 col-span-1">
                From
                <input
                  {...register('partAPeriodWithTheEmployer.from')}
                  className=" mx-2 w-3/4 outline-none  text-neutral-500 font-medium  text-center"
                />
              </td>
              <td className=" py-4  text-sm  font-bold text-gray-900 border border-neutral-600 col-span-1">
                To{' '}
                <input
                  {...register('partAPeriodWithTheEmployer.to')}
                  className=" w-4/5 mx-2 outline-none text-neutral-500 font-medium  text-center py-4"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-1">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600">
                Summary of amount paid/credited and tax deducted at source
                thereon in respect of the employee
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-5">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 pt-5">
                Quarter(s)
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 text-justify">
                Receipt Numbers of original quarterly statements of TDS under
                sub-section (3) of Section 200
              </td>
              <td className="px-2 py-4  text-sm  font-bold text-gray-900 border border-neutral-600">
                Amount paid/credited
              </td>
              <td className="px-2 py-4  text-sm font-bold  text-gray-950 border border-neutral-600 ">
                Amount of tax deducted(Rs.)
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-950 border border-neutral-600 text-justify">
                Amount of tax deposited / remitted Amount paid/credited (Rs.)
              </td>
            </tr>

            {['Q1', 'Q2', 'Q3', 'Q4', 'Q5'].map((quarter, index) => (
              <tr key={index} className=" border-collapse grid grid-cols-5">
                <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600">
                  <input
                    className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left   "
                    type="text"
                    {...register(`quarter[${index}]`)}
                    defaultValue={quarter}
                  />
                </td>
                <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600">
                  <input
                    className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left "
                    type="text"
                    {...register(`receiptNumber[${index}]`)}
                    defaultValue={`QUOXNNMG${index + 1}`}
                  />
                </td>
                <td className="px-2 py-2  text-sm  font-medium text-neutral-500 border border-neutral-600">
                  <input
                    className="focus:outline-none no-border w-full  text-neutral-500 font-medium  left"
                    type="number"
                    {...register(`amountPaidCredited[${index}]`)}
                    defaultValue={1790258.36}
                  />
                </td>
                <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 ">
                  <input
                    className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                    type="number"
                    {...register(`amountTaxDeducted[${index}]`)}
                    defaultValue={468246.0}
                  />
                </td>
                <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-500 ">
                  <input
                    className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                    type="number"
                    {...register(`amountTaxDeposited[${index}]`)}
                    defaultValue={468246.0}
                  />
                </td>
              </tr>
            ))}

            <tr className=" border-collapse grid grid-cols-5">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 text-left">
                {totals.quarter}
              </td>
              <td className="px-2 py-2  text-sm font-bold border border-neutral-600"></td>

              <td className="px-2 py-2  text-sm  font-bold text-gray-900 border border-neutral-600 text-left">
                <input
                  type="number"
                  value={totals.amountPaidCredited.toFixed(2)}
                  className="outline-none w-full"
                />
              </td>
              <td className="px-2 py-2  text-sm font-bold  text-gray-950 border border-neutral-600 text-left">
                <input
                  type="number"
                  value={totals.amountTaxDeducted.toFixed(2)}
                  className="outline-none w-full"
                />
              </td>
              <td className="px-2 py-2  text-sm font-bold  text-gray-950 border border-neutral-600 text-center ">
                <input
                  type="number"
                  value={totals.amountTaxDeposited.toFixed(2)}
                  className="outline-none w-full"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-1 ">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600">
                I. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL
                GOVERNMENT ACCOU NT THROUGH BOOK ADJUSTMENT
                <p className="text-xs text-neutral-500">
                  (The deductor to provide payment wise details of tax deducted
                  and deposited with respect to the deductee)
                </p>
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 grid-rows-2">
              <td className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600  col-span-1 row-span-2 ">
                Sl. No
              </td>
              <td className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 border-collapse row-span-2 col-span-3 text-center">
                Tax Deposited in respect of the deductee (Rs.)
              </td>
              <td className="px-2 py-3 text-sm font-bold text-gray-900 border border-neutral-600 border-collapse  col-span-8 ">
                Book Identification Number (BIN)
              </td>
              <td className="px-2 py-1 text-sm font-bold text-gray-900 border border-neutral-600 border-collapse  col-start-5 col-span-2 tracking-tighter">
                Receipt Numbers of Form No. 24G
              </td>
              <td className=" text-sm font-bold text-gray-900 border border-neutral-600 border-collapse   col-span-2 tracking-tighter">
                DDO serial number in Form no.24G
              </td>
              <td className=" text-sm font-bold text-gray-900 border border-neutral-600 border-collapse  col-span-2 tracking-tighter">
                Date of transfer voucher (dd/mm/yyyy)
              </td>
              <td className=" text-sm font-bold text-gray-900 border border-neutral-600 border-collapse  col-span-2 tracking-tighter">
                Status of matching with Form no. 24G
              </td>
            </tr>
            {/* *****data2***** */}
            {data2Fields.map((fieldd, index) => {
              const isLastRow = index === data2Fields.length - 1;
              const isFirstRow = index === 0;
              return (
                <tr
                  className="border border-neutral-600 border-collapse   grid grid-cols-12"
                  key={fieldd.id}
                >
                  <td className="px-2 py-2  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-1">
                    <input
                      {...register(`data2.${index}.siNo`)}
                      className="focus:outline-none  w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-3">
                    <input
                      {...register(`data2[${index}].taxDeposited`, {
                        required: true,
                      })}
                      onBlur={calculateTotal2}
                      className="focus:outline-none text-left w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm  font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-2">
                    <input
                      {...register(`data2.${index}.receiptNoForm24G`, {
                        required: true,
                      })}
                      className="focus:outline-none w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-2">
                    <input
                      {...register(`data2.${index}.ddoSerialNo`, {
                        required: true,
                      })}
                      className="focus:outline-none w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-500 col-span-2">
                    <input
                      {...register(`data2.${index}.dateOfTransferVoucher`, {
                        required: true,
                        pattern: /^\d+$/,
                      })}
                      className="focus:outline-none w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium  text-neutral-500 border border-neutral-500 col-span-2 flex justify-between">
                    <input
                      {...register(
                        `data2.${index}.statusOfMatchingWithForm24G`,
                      )}
                      className=" focus:outline-none text-left no-border w-full"
                    />
                    <span className="flex">
                      {isLastRow && (
                        <IoIosAddCircle
                          onClick={() => {
                            appenddata2();
                          }}
                        />
                      )}
                      {!isFirstRow && (
                        <IoRemoveCircleSharp
                          onClick={() => {
                            removedata2(index);
                          }}
                        />
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}

            {/* *****data2***** */}
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                Total (Rs.)
              </td>
              <td
                className="px-2 py-2  text-sm font-bold text-gray-900
               border border-neutral-600 col-span-3 text-left"
              >
                <input
                  type="number"
                  value={totalTaxDepositsBook.toFixed(2)}
                  className="outline-none w-full"
                />
              </td>

              <td className="px-2 py-2  text-sm  font-bold  border border-neutral-600 col-start-5 col-span-8">
                <input type="number" className="outline-none w-full" />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-1 ">
              <td className=" px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600">
                II. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL
                GOVERNMENT ACCOUNT THROUGH CHALLAN
                <p className="text-xs text-neutral-500">
                  (The deductor to provide payment wise details of tax deducted
                  and deposited with respect to the deductee)
                </p>
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 grid-rows-2">
              <td className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600  col-span-1 row-span-2">
                Sl. No
              </td>
              <td className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600  row-span-2 col-span-3 text-center">
                Tax Deposited in respect of the deductee (Rs.)
              </td>
              <td className="px-2 py-4 text-sm font-bold text-gray-900 border border-neutral-600 col-span-8">
                Challan Identification Number (CIN)
              </td>
              <td className="px-2 py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-start-5 col-span-2 tracking-tighter">
                BSR Code of the Bank Branch
              </td>
              <td className=" py-2 text-sm font-bold text-gray-900 border border-neutral-600  col-span-2">
                Date on which Tax deposited (dd/mm/yyyy)
              </td>
              <td className=" py-2 text-sm font-bold text-gray-900 border border-neutral-600  col-span-2 ">
                Challan Serial Number
              </td>
              <td className=" py-2 text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 tracking-tighter">
                Status of matching with OLTAS*
              </td>
            </tr>

            {fields.map((field, index) => {
              const isLastRow = index === fields.length - 1;
              const isFirstRow = index === 0;
              return (
                <tr
                  className=" border-collapse grid grid-cols-12"
                  key={field.id}
                >
                  <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-1">
                    <input
                      {...register(`data.${index}.siNo`)}
                      className="focus:outline-none no-border w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium  text-left text-neutral-500 border border-neutral-600 col-span-3">
                    <input
                      type="number"
                      {...register(`data[${index}].taxDeposited`, {
                        required: true,
                        pattern: /^\d+(\.\d{2})?$/,
                      })}
                      onBlur={calculateTotal}
                      className="focus:outline-none text-left w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm  font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-2">
                    <input
                      {...register(`data.${index}.bsrCodeOfTheBankBranch`, {
                        required: true,
                        pattern: /^\d+$/,
                      })}
                      className="focus:outline-none w-full"
                    />
                    {errors?.data &&
                      errors.data[index]?.bsrCodeOfTheBankBranch && (
                        <span>BSR Code must be a number</span>
                      )}
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 border-collapse col-span-2">
                    <input
                      type="number"
                      {...register(`data.${index}.dateOnWhichTaxDeposited`, {
                        required: true,
                      })}
                      className="focus:outline-none w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-500 border-collapse col-span-2">
                    <input
                      type="number"
                      {...register(`data.${index}.challanSerialNumber`, {
                        required: true,
                        pattern: /^\d+$/,
                      })}
                      className="focus:outline-none w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium  text-neutral-500 border border-neutral-500 col-span-2 flex justify-between">
                    <input
                      {...register(`data.${index}.statusOfMatchingWithOltas`)}
                      className=" focus:outline-none text-left no-border w-full"
                    />
                    <span className="flex">
                      {isLastRow && (
                        <IoIosAddCircle
                          onClick={() => {
                            append();
                          }}
                        />
                      )}
                      {!isFirstRow && (
                        <IoRemoveCircleSharp
                          onClick={() => {
                            remove(index);
                          }}
                        />
                      )}
                    </span>
                  </td>
                </tr>

                // {!isFirstRow && (  {/* Render remove button if not first row */}
                //           <span className="">
                //             <IoRemoveCircleSharp
                //               onClick={() => {
                //                 remove(index);
                //               }}
                //             />
                //           </span>
                //         )}
              );
            })}

            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1">
                Total (Rs.)
              </td>
              <td
                className="px-2 py-2  text-sm font-bold text-gray-900
               border border-neutral-600 col-span-3 text-left"
              >
                {' '}
                {totalTaxDeposits.toFixed(2)}
              </td>
              <td className="px-2 py-2  text-sm  font-bold  border border-neutral-600 col-start-5 col-span-8"></td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-1">
              <td className="px-2 py-4 text-md font-extrabold text-gray-900 border border-neutral-600 col-span-1">
                Verification
              </td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-1">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse col-span-1 text-justify leading-6">
                I,{' '}
                <input
                  type="text"
                  {...register('namePartA')}
                  className="border-collapse border-b-2 -border--clr-neutral-900 -ml-5 w-1/3 text-start outline-none text-neutral-500 font-medium"
                />
                ,son/daughter of
                <input
                  type="text"
                  {...register('fatherNamePartA')}
                  className="border-b-2 -border--clr-neutral-900 outline-none w-1/3 text-neutral-500 font-medium ml-4"
                />
                working in the capacity of{' '}
                <span>
                  <input
                    type="text"
                    {...register('designationVerificationPartA  ')}
                    className="border-b-2 -border--clr-neutral-900 outline-none w-1/3 text-neutral-500 font-medium"
                  />
                </span>
                (designation) do hereby certify that a sum of Rs.{' '}
                <input
                  type="text"
                  {...register('deductedRsPartA')}
                  className="border-b-2 -border--clr-neutral-900 outline-none w-1/4 text-neutral-500 font-medium"
                />
                [Rs.{' '}
                <input
                  type="text"
                  {...register('deductedRsInwordsPartA')}
                  className=" border-b-2 -border--clr-neutral-900 outline-none w-2/4 text-neutral-500 font-medium"
                />
                (in words)] has been deducted and a sum of Rs.
                <input
                  type="text"
                  {...register('depositedRsPartA')}
                  className="border-b-2 -border--clr-neutral-900 outline-none w-auto text-neutral-500 font-medium"
                />{' '}
                [Rs.{' '}
                <input
                  type="text"
                  {...register('depositedRsInwordsPartA')}
                  className="border-b-2 -border--clr-neutral-900 outline-none w-2/4 text-neutral-500 font-medium"
                />
                ] has been deposited to the credit of the Central Government. I
                further certify that the information given above is true,
                complete and correct and is based on the books of account,
                documents, TDS statements, TDS deposited and other available
                records.
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 grid-rows-2 h-20">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                Place
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-3 text-left">
                <input
                  {...register('placePartA')}
                  className="border-none focus:outline-none  text-left w-full"
                />
              </td>
              <td className="px-2 py-8  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-8 row-span-2 text-left">
                (Signature of person responsible for deduction of Tax)
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse col-span-1 text-left">
                Date
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-3 text-left col-start-2 col-end-5">
                <input
                  {...register('datePartA')}
                  className="border-none focus:outline-none text-left w-full"
                />
              </td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-12 ">
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 border-collapse col-span-4 text-left">
                <span className="text-gray-900 font-bold">Designation: </span>
                <input
                  {...register('designationPartA')}
                  className="  text-left w-3/4 -pl-40 outline-none "
                />
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-8 text-left">
                <span className="text-gray-900 font-bold">Full Name:</span>{' '}
                <input
                  {...register('fullNamePartA')}
                  className="  text-left w-3/4 outline-none"
                />
              </td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-12 text-left">
              <td className=" py-4 border-collapse border border-neutral-600 text-sm font-medium text-neutral-500  col-span-12 break-inside-avoid-column">
                <p className="font-bold  text-gray-900 "> Notes:</p>
                1. Part B (Annexure) of the certificate in Form No.16 shall be
                issued by the employer.
                <br />
                2. If an assessee is employed under one employer during the
                year, Part &apos;A&apos; of the certificate in Form No.16 issued
                for the quarter ending on 31st March of the financial year shall
                contain the details of tax deducted and deposited for all the
                quarters of the financial year. <br />
                3. If an assessee is employed under more than one employer
                during the year, each of the employers shall issue Part A of the
                certificate in Form No.16 pertaining to the period for which
                such assessee was employed with each of the employers. Part B
                (Annexure) of the certificate in Form No. 16 may be issued by
                each of the employers or the last employer at the option of the
                assessee. <br />
                4. To update PAN details in Income Tax Department database,
                apply for &apos;PAN change request&apos; through NSDL or UTITSL.
              </td>
            </tr>
            <tr className="border-x-0 grid grid-cols-12 text-left">
              <td className=" py-4  text-sm  font-bold  text-gray-900 underline col-span-12">
                Legend used in Form 16
              </td>
            </tr>

            <tr className="px-2  grid grid-cols-12 text-left">
              <td className="   text-sm  font-bold  text-gray-900 col-span-12">
                * Status of matching with OLTAS
              </td>
            </tr>

            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1">
                Legend
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2">
                Description
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-9">
                Definition
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12  ">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                U
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-2 text-left">
                Unmatched
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-9 text-left">
                Deductors have not deposited taxes or have furnished incorrect
                particulars of tax payment. Final credit will be reflected only
                when payment details in bank match with details of deposit in
                TDS / TCS statement
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12  ">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                P
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-2 text-left">
                Provisional
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-9 text-left">
                Provisional tax credit is effected only for TDS / TCS Statements
                filed by Government deductors. &quot;P &quot; status will be
                changed to Final (F) on verification of payment details
                submitted by Pay and Accounts Officer (PAO)
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12  ">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                F
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-2 text-left">
                Final
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-9 text-left">
                In case of non-government deductors, payment details of TDS /
                TCS deposited in bank by deductor have matched with the payment
                details mentioned in the TDS / TCS statement filed by the
                deductors. In case of government deductors, details of TDS / TCS
                booked in Government account have been verified by Pay &
                Accounts Officer (PAO)
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12  ">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                O
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-2 text-left">
                Overbooked
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-9 text-left">
                Payment details of TDS / TCS deposited in bank by deductor have
                matched with details mentioned in the TDS / TCS statement but
                the amount is over claimed in the statement. Final (F) credit
                will be reflected only when deductor reduces claimed amount in
                the statement or makes new payment for excess amount claimed in
                the statement
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
            </tr>
          </tfoot>
        </table>

        {/* ------------------------------------PART-B---------------------------------------- */}

        <table className=" mt-96 print-table">
          <thead className=" text-center border border-neutral-900 mt-5">
            <tr className=" border border-neutral-900">
              <th>
                <h5>FORM NO. 16</h5>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className=" border border-neutral-900 text-gray-900 text-lg font-bold">
              <td>
                <h6>PART B</h6>
              </td>
            </tr>
            <tr className="px-2 py-2 border border-neutral-900 text-sm text-gray-900 font-bold">
              <td>
                Certificate under section 203 of the Income-tax Act, 1961 for
                tax deducted at source on salary paid to an employee under
                section 192 or pension/interest income of specified senior
                citizen under section 194P
              </td>
            </tr>
            <tr className=" border border-neutral-900 border-collapse grid  grid-cols-2">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 text-left">
                Certificate No.
                {/* <span
                  className="mx-5 text-neutral-500 font-medium"
                  {...register('certificateNo')}
                >
                  {getValues().certificateNo}
                </span> */}
                <input
                  {...register('partBCertificateNo')}
                  className="focus:outline-none no-border w-64 mx-2 text-neutral-500 font-medium"
                />
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 text-left">
                Last updated on
                <input
                  {...register('partBLastUpdatedOn')}
                  className="focus:outline-none no-border w-64 mx-2 text-neutral-500 font-medium"
                />
              </td>
            </tr>

            <tr className=" border-collapse border border-neutral-600 grid grid-cols-2">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse">
                Name and address of the Employer/Specified Bank
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse">
                Name and address of the Employee/Specified senior citizen
              </td>
            </tr>

            <tr className=" border-collapse border border-neutral-600 grid grid-cols-2">
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600 border-collapse">
                <textarea
                  {...register('partBNameAndAddressOfTheEmployer')}
                  className="text-neutral-500 font-medium w-full h-28 resize-none px-2 py-2 text-justify outline-none no-border"
                  contentEditable={true}
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500  border border-neutral-600 border-collapse">
                <textarea
                  {...register('partBNameAndAddressOfTheEmployee')}
                  className="text-neutral-500 font-medium w-full h-28 resize-none px-2 py-2 text-justify outline-none no-border"
                  contentEditable={true}
                />
              </td>
            </tr>

            <tr className=" border-collapse border border-neutral-600 grid grid-cols-12">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse col-span-4">
                PAN of the Deductor
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse col-span-4">
                TAN of the Deductor
              </td>

              <td className="px-2 py-4  text-sm  font-bold text-gray-900 border border-neutral-600 col-span-4">
                PAN of the Employee/Specified senior citizen
              </td>
            </tr>

            <tr className=" border-collapse border border-neutral-600 grid grid-cols-12">
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-4">
                <input
                  {...register('partBPanOfTheDeductor')}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-4">
                <input
                  {...register('partBTanOfTheDeductor')}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500  border-collapse border border-neutral-600 col-span-4">
                <input
                  {...register('partBPanOfTheEmployeeOrSpecifiedSeniorCitizen')}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-4">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border-collapse border border-neutral-600 col-span-2">
                CIT (TDS)
              </td>
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border-collapse border border-neutral-600">
                Assessment Year
              </td>
              <td className="px-2 py-4  text-sm  font-bold text-gray-900 border-collapse border border-neutral-600">
                Period with the Employer
              </td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-8 ">
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-4">
                <textarea
                  {...register('partBCitTds')}
                  className="text-neutral-500 font-medium w-full h-28 resize-none px-2 py-2 text-justify outline-none no-border"
                />
              </td>
              <td className="px-2 py-4  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-2">
                <input
                  {...register('partBAssessmentYear')}
                  className="focus:outline-none no-border w-full  text-neutral-500 font-medium  text-left px-2 py-4 "
                />
              </td>
              <td className=" py-4 text-sm  font-bold text-gray-900 border border-neutral-600 col-span-1">
                From{' '}
                <input
                  {...register('partBPeriodWithTheEmployer.from')}
                  className="mx-2 w-3/4 outline-none text-neutral-500 font-medium  text-center py-4 "
                />
              </td>
              <td className=" py-4  text-sm  font-bold text-gray-900 border border-neutral-600 col-span-1">
                To{' '}
                <input
                  {...register('partBPeriodWithTheEmployer.to')}
                  className=" w-4/5 mx-2 outline-none text-neutral-500 font-medium  text-center py-4"
                />
              </td>
            </tr>
            <tr className="  border-collapse border border-neutral-600 grid grid-cols-1">
              <td className="px-2 py-4  text-sm font-bold text-gray-900  text-right">
                Annexure-I
              </td>
            </tr>
            <tr className=" border-collapse  border border-neutral-600 grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-12 text-left">
                Details of Salary Paid and any other income and tax deducted
              </td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-8 text-left">
                Whether opting for taxation u/s 115BAC
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-4 ">
                No
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                1.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Gross Salary
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center">
                Rs.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center">
                Rs.
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (a)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Salary as per provisions contained in section 17(1)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('grossSalary[0].a[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right">
                <input
                  {...register('grossSalary[0].a[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (b)
              </td>
              <td className=" px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Value of perquisites under section 17(2) (as per Form No. 12BA,
                wherever applicable)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('grossSalary[1].b[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right">
                <input
                  {...register('grossSalary[1].b[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (c)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Profits in lieu of salary under section 17(3) (as per Form No.
                12BA, wherever applicable)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right">
                <input
                  {...register('grossSalary[2].c[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right">
                <input
                  {...register('grossSalary[2].c[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (d)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-9 text-left">
                Total
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  type="number"
                  className="w-full outline-none"
                  value={(
                    parseFloat(getValues('grossSalary[0].a[0].amount1') || 0) +
                    parseFloat(getValues('grossSalary[1].b[0].amount1') || 0) +
                    parseFloat(getValues('grossSalary[2].c[0].amount1') || 0)
                  ).toFixed(2)}
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (e)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Reported total amount of salary received from other employer(s)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('grossSalary[3].e[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right">
                <input
                  {...register('grossSalary[3].e[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                2.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-11 text-left">
                Less: Allowances to the extent exempt under section 10
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (a)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Travel concession or assistance under section 10(5)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[0].a[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[0].a[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (b)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Death-cum-retirement gratuity under section 10(10)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[1].b[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[1].b[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (c)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Commuted value of pension under section 10(10A)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[2].c[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[2].c[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (d)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Cash equivalent of leave salary encashment under section 10
                (10AA)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[3].d[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[3].d[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (e)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                House rent allowance under section 10(13A)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[4].e[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[4].e[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (f)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Amount of any other exemption under section 10
                <span className="font-extrabold">
                  [Note: Break-up to be filled and signed by employer in the
                  table provide at the bottom of this form]
                </span>
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[5].f[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessAllowancesUndersection10[5].f[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (g)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Total amount of any other exemption under section 10
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  type="number"
                  value={totalAllowances}
                  className="outline-none"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-right"></td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (h)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Total amount of exemption claimed under section 10
                [2(a)+2(b)+2(c)+2(d)+2(e)+2(g)]
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-right">
                <input type="number" className="outline-none w-full" />
              </td>

              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  type="number"
                  value={totalExemption}
                  className="outline-none w-full"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                3.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Total amount of salary received from current employer
                [1(d)-2(h)]
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-right">
                <input type="number" className="outline-none w-full" />
              </td>

              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  type="number"
                  className="w-full outline-none"
                  value={totalSalaryCurrentEmployer}
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                4.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-11 text-left">
                Less: Deductions under section 16
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (a)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Standard deduction under section 16(ia)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessDeductionsUndersection16[0].a[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessDeductionsUndersection16[0].a[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (b)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Entertainment allowance under section 16(ii)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessDeductionsUndersection16[1].b[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessDeductionsUndersection16[1].b[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (c)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Tax on employment under section 16(iii)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessDeductionsUndersection16[2].c[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('lessDeductionsUndersection16[2].c[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                5.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Total amount of deductions under section 16 [4(a)+4(b)+4(c)]
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input type="number" className="outline-none w-full" />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  type="number"
                  className="w-full outline-none"
                  value={totalDeductions}
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                6 .
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Income chargeable under the head &quot;Salaries &quot;
                [(3+1(e)-5]
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-right">
                <input type="number" className="outline-none w-full" />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  type="number"
                  className="w-full outline-none"
                  value={incomeChargeableHeadSalaries}
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                7.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-11 text-left">
                Add: Any other income reported by the employee under as per
                section 192 (2B)
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (a)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Income (or admissible loss) from house property reported by
                employee offered for TDS
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('incomeReportedUnderSection192[0].a[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('incomeReportedUnderSection192[0].a[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (b)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Income under the head Other Sources offered for TDS
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('incomeReportedUnderSection192[1].b[0].amount1')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('incomeReportedUnderSection192[1].b[0].amount2')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                8.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Total amount of other income reported by the employee
                [7(a)+7(b)]
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input type="number" className="outline-none w-full" />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  value={totalIncomeReported}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                9.
              </td>
              <td className="px-2 py-2  text-sm font-extrabold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Gross total income (6+8)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input type="number" className="outline-none w-full" />
              </td>
              <td className="px-2 py-2  text-sm font-extrabold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  value={grossTotalIncome}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                10.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deductions under Chapter VI-A
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center">
                Gross Amount
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center">
                Deductible Amount
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (a)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deduction in respect of life insurance premia, contributions to
                provident fund etc. under section 80C
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[0].a[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[0].a[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (b)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deduction in respect of contribution to certain pension funds
                under section 80CCC
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[1].b[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[1].b[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (c)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deduction in respect of contribution by taxpayer to pension
                scheme under section 80CCD (1)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[2].c[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[2].c[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (d)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Total deduction under section 80C, 80CCC and 80CCD(1)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right">
                <input
                  {...register('deductionsUnderChapterVIA[3].d[0].grossAmount')}
                  value={totalDeductionsGrossAmountABC}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[3].d[0].deductibleAmount',
                  )}
                  value={totalDeductionsDeductibleAmountABC}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (e)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deductions in respect of amount paid/deposited to notified
                pension scheme under section 80CCD (1B)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-right">
                <input
                  {...register('deductionsUnderChapterVIA[4].e[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[4].e[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (f)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deduction in respect of contribution by Employer to pension
                scheme under section 80CCD (2)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[5].f[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[5].f[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (g)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deduction in respect of health insurance premia under section
                80D
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[6].g[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[6].g[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (h)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-7 text-left">
                Deduction in respect of interest on loan taken for higher
                education under section 80E
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[7].h[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[7].h[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-center"></td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center">
                Gross Amount
              </td>

              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center">
                Qualifying Amount
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-2 text-center">
                Deductible Amount
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (i)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Total Deduction in respect of donations to certain funds,
                charitable institutions, etc. under section 80G
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[8].i[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border-collapse border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[8].i[0].qualifyingAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[8].i[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (j)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Deduction in respect of interest on deposits in savings account
                under section 80TTA
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[9].j[0].grossAmount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[9].j[0].qualifyingAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[9].j[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (k)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Amount Deductible under any other provision (s) of Chapter VI-A
                [Note: Break-up to be filled and signed by employer in the table
                provide at the bottom of this form]
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-6 text-left">
                <input
                  {...register('deductionsUnderChapterVIA[10].k[0].amount')}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                (l)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Total of amount deductible under any other provision(s) of
                Chapter VI-A
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[11].l[0].grossAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[11].l[0].qualifyingAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-2 text-left">
                <input
                  {...register(
                    'deductionsUnderChapterVIA[11].l[0].deductibleAmount',
                  )}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                11.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5  text-justify">
                Aggregate of deductible amount under Chapter VI-A
                [10(d)+10(e)+10(f)+10(g)+10(h)+10(i)+10(j)+10(l)]
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-neutral-500 border border-neutral-600 col-span-6 text-left">
                <input
                  value={aggregateOfDeductibleAmount}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                12.
              </td>
              <td className="px-2 py-2  text-sm font-extrabold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Total taxable income (9-11)
              </td>
              <td className="px-2 py-2  text-sm font-extrabold text-gray-900 border border-neutral-600 col-span-6 text-left">
                <input
                  value={totalTaxableIncome}
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                13.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Tax on total income
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right">
                <input
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                14.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Rebate under section 87A, if applicable
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right">
                <input
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>

            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                15.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Surcharge, wherever applicable
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right">
                <input
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>

            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                16
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Health and education cess
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right">
                <input
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                17.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Tax payable (13+15+16-14)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right">
                <input
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                18.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Less: Relief under section 89 (attach details)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right">
                <input
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12">
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-1 text-center">
                19.
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-5 text-left">
                Net tax payable (17-18)
              </td>
              <td className="px-2 py-2  text-sm font-semibold text-gray-900 border border-neutral-600 col-span-6 text-right">
                <input
                  type="number"
                  className="w-full outline-none text-left"
                />
              </td>
            </tr>
            <tr className=" border-collapse border border-neutral-600 grid grid-cols-1">
              <td className="px-2 py-2  text-md font-bold text-gray-900 border border-neutral-600 col-span-1">
                Verification
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-1">
              <td className="px-2 py-4  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-justify leading-6">
                I,
                <input
                  {...register('namePartB')}
                  className=" text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3  ml-2"
                />
                , son/daughter of{' '}
                <input
                  {...register('fatherNamePartB')}
                  className=" text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3"
                />
                .Working in the capacity of{' '}
                <input
                  {...register('designationPartB')}
                  className=" text-left border-b-2 -border--clr-neutral-900 outline-none w-1/3"
                />
                (Designation) do hereby certify that the information given above
                is true, complete and correct and is based on the books of
                account, documents, TDS statements, and other available records.
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 ">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                Place
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-5 text-left">
                <input
                  {...register('place1PartB')}
                  className="border-none focus:outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-6 text-left">
                (Signature of person responsible for deduction of Tax)
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 ">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                Date
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-5 text-left">
                <input
                  {...register('date1PartB')}
                  className="border-none focus:outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left">
                Full Name:
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-4 text-left">
                <input
                  {...register('fullName1PartB')}
                  className="border-none focus:outline-none text-left "
                />
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 ">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-12 text-left">
                2. (f) Break up for ‘Amount of any other exemption under section
                10’ to be filled in the table below
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 ">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-center">
                Sl. No.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-5">
                Particular of Amount for any other exemption under section 10
                Rs.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 ">
                Gross Amount Rs.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left">
                Qualifying Amount Rs.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left">
                Deductible Amount Rs.
              </td>
            </tr>
            {/***************Breakup Under Section 10******************/}
            {brSection10Fields.map((item, index) => {
              const isLastRow = index === brSection10Fields.length - 1;
              const isFirstRow = index === 0;
              return (
                <tr
                  className=" border-collapse grid grid-cols-12"
                  key={item.id}
                >
                  <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-1">
                    <input
                      {...register(`brSection10.${index}.siNo`)}
                      className="outline-none no-border w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-5">
                    <input
                      {...register(`brSection10[${index}].particulars`)}
                      className="outline-none text-left w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm  font-medium text-neutral-500 border border-neutral-600 col-span-2">
                    <input
                      {...register(`brSection10.${index}.grossAmount`)}
                      className="outline-none text-left w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-2">
                    <input
                      {...register(`brSection10.${index}.qualifyingAmount`)}
                      className="outline-none text-left w-full"
                    />
                  </td>

                  <td className="px-2 py-2  text-sm font-medium  text-neutral-500 border border-neutral-500 col-span-2 flex justify-between">
                    <input
                      {...register(`brSection10.${index}.deductibleAmount`)}
                      className=" focus:outline-none text-left w-full"
                    />

                    <span className="flex">
                      {isLastRow && (
                        <IoIosAddCircle
                          onClick={() => {
                            appendbrSection10();
                          }}
                        />
                      )}
                      {!isFirstRow && (
                        <IoRemoveCircleSharp
                          onClick={() => {
                            removebrSection10(index);
                          }}
                        />
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}

            <tr className=" border-collapse grid grid-cols-12 h-10">
              <td className="px-2 py-2  text-sm font-bold text-gray-900  col-span-1 center"></td>
            </tr>

            <tr className=" border-collapse grid grid-cols-12 ">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-12 text-left">
                10(k). Break up for ‘Amount deductible under any other
                provision(s) of Chapter VIA ‘to be filled in the table below
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 ">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-center">
                Sl. No.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-5">
                Particular of Amount deductible under any other provision(s) of
                Chapter VIA Rs.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 ">
                Gross Amount Rs.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left">
                Qualifying Amount Rs.
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-2 text-left">
                Deductible Amount Rs.
              </td>
            </tr>
            {/* ************breakup Chapter VI A***************** */}
            {brChapterVIAFields.map((item, index) => {
              const isLastRow = index === brChapterVIAFields.length - 1;
              const isFirstRow = index === 0;
              return (
                <tr
                  className=" border-collapse grid grid-cols-12"
                  key={item.id}
                >
                  <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-1">
                    <input
                      {...register(`brChapterVIA.${index}.siNo`)}
                      className="outline-none no-border w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-5">
                    <input
                      {...register(`brChapterVIA[${index}].particulars`)}
                      className="outline-none text-left w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm  font-medium text-neutral-500 border border-neutral-600 col-span-2">
                    <input
                      {...register(`brChapterVIA.${index}.grossAmount`)}
                      className="outline-none text-left w-full"
                    />
                  </td>
                  <td className="px-2 py-2  text-sm font-medium text-left text-neutral-500 border border-neutral-600 col-span-2">
                    <input
                      {...register(`brChapterVIA.${index}.qualifyingAmount`)}
                      className="outline-none text-left w-full"
                    />
                  </td>

                  <td className="px-2 py-2  text-sm font-medium  text-neutral-500 border border-neutral-500 col-span-2 flex justify-between">
                    <input
                      {...register(`brChapterVIA.${index}.deductibleAmount`)}
                      className=" focus:outline-none text-left w-full"
                    />

                    <span className="flex">
                      {isLastRow && (
                        <IoIosAddCircle
                          onClick={() => {
                            appendbrChapterVIA();
                          }}
                        />
                      )}
                      {!isFirstRow && (
                        <IoRemoveCircleSharp
                          onClick={() => {
                            removebrChapterVIA(index);
                          }}
                        />
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}

            <tr className=" border-collapse grid grid-cols-12 h-10">
              <td className="px-2 py-2  text-sm font-bold text-gray-900  col-span-1 text-left"></td>
            </tr>

            <tr className=" border-collapse grid grid-cols-12 border border-neutral-600 text-left">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 col-span-1 text-left">
                Place
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-5 text-left">
                <input
                  {...register('place2PartB')}
                  className="border-none focus:outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 col-span-6 text-left">
                (Signature of person responsible for deduction of Tax)
              </td>
            </tr>
            <tr className=" border-collapse grid grid-cols-12 border border-neutral-600 text-left">
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse col-span-1 text-left">
                Date
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border border-neutral-600 border-collapse col-span-5">
                <input
                  {...register('date2PartB')}
                  className=" focus:outline-none text-left"
                />
              </td>
              <td className="px-2 py-2  text-sm font-bold text-gray-900 border border-neutral-600 border-collapse col-span-2 ">
                Full Name:
              </td>
              <td className="px-2 py-2  text-sm font-medium text-neutral-500 border-collapse border border-neutral-600 col-span-4 text-left">
                <input
                  {...register('fullName2PartB')}
                  className=" outline-none text-left"
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Form16;
