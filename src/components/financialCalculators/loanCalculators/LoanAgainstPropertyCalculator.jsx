'use client';
import React, { useContext, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import uuid from 'react-uuid';
import { RiFileDownloadFill } from 'react-icons/ri';
import { StoreContext } from '../../../store/store-context';
import { PDF_DOC, PDF_DOC1 } from '../../../store/actions';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import SearchResult_section from '@/components/pagesComponents/pageLayout/SearchResult_section.js';
import Image from 'next/image';
import { formatINRCurrency } from '@/utils/utilityFunctions';

ChartJS.register(ArcElement, Tooltip, Legend);

const LoanAgainstProperty = () => {
  const loanamountlRef = useRef('');
  const roiRef = useRef('');
  const loanTenureRef = useRef('');
  const [showdata, setShowData] = useState('');
  const [showTableMonthData, setShowTableMonthData] = useState([]);
  const [showStat, setShowStat] = useState(false);
  const [loading, setLoading] = useState('');
  const [showgraph, setshowgraph] = useState(false);
  // const [state, dispatch] = useContext(StoreContext);

  const handleClear = () => {
    loanamountlRef.current.value = '';
    roiRef.current.value = '';
    loanTenureRef.current.value = '';
    setShowData('');
    setShowTableMonthData([]);
    setShowStat(false);
  };

  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'Loan Against Property',
  });

  const navigate = useRouter();

  function calculateMonthlyEmiPayment(loanAmount, rate, loanTenure, emi) {
    const monthlyCalculation = [];
    let totalLoanAmount = loanAmount;

    for (let i = 0; i < loanTenure * 12; i++) {
      const towardsInterest = (totalLoanAmount * rate) / (100 * 12);
      const towardsLoan = emi - towardsInterest;
      totalLoanAmount -= towardsLoan;

      monthlyCalculation.push({
        month: i + 1,
        emi: Math.round(emi),
        towards_loan: Math.round(emi - towardsInterest),
        towards_interest: Math.round(towardsInterest),
        outstanding_loan: Math.round(totalLoanAmount),
      });
    }

    return monthlyCalculation;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let rate = +roiRef.current.value / (100 * 12);
    let loanTenure = +loanTenureRef.current.value * 12;
    let loanAmount = +loanamountlRef.current.value;
    const emi =
      (loanAmount * rate * Math.pow(1 + rate, loanTenure)) /
      (Math.pow(1 + rate, loanTenure) - 1);
    const totalAmount = emi * loanTenure;
    const monthlyPayment = calculateMonthlyEmiPayment(
      loanAmount,
      rate,
      loanTenure,
      emi,
    );
    const resultEmi = Math.round(emi);
    const resultLoanAmount = loanAmount;
    const resultTotalInterest = Math.round(totalAmount - loanAmount);
    const resultTotalAmount = Math.round(totalAmount);
    const resultMonthlyPayment = monthlyPayment;
    const result = {
      emi: resultEmi,
      loanAmount: resultLoanAmount,
      totalInterest: resultTotalInterest,
      totalAmount: resultTotalAmount,
      monthlyPayment: resultMonthlyPayment,
    };
    let total = +result.totalAmount;
    const emiF = +result.emi;

    let openingBalance = +loanamountlRef.current.value;
    const loopArray = Array(+loanTenureRef.current.value * 12);
    const MonthData = [];

    for (let i = 0; i < loopArray.length; i++) {
      let interest = Math.floor(
        openingBalance * (+roiRef.current.value / 100 / 12),
      );
      let principal =
        emiF - Math.floor(openingBalance * (+roiRef.current.value / 100 / 12));
      let closingBalance = openingBalance - principal;
      MonthData.push({
        srNo: i + 1,
        openingBalance: openingBalance,
        payment: emiF,
        interest: interest,
        principal: Math.ceil(principal),
        remainingLoan:
          closingBalance > 0 && i + 1 != loopArray.length ? closingBalance : 0,
      });
      openingBalance = closingBalance;
    }
    setShowData(result);
    setShowTableMonthData(MonthData);
    setShowStat(true);
    setLoading(false);
  };

  const data = {
    labels: ['Loan Amount', 'EMI', 'Total Interest'],
    datasets: [
      {
        data: [showdata.loanAmount, showdata.emi, showdata.totalInterest],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <SearchResult_section title="Loan Against Property Calculator">
      <li className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 ">
            <div className="mb-3 xl:w-75 mx-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Loan Amount
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Loan Amount"
                  ref={loanamountlRef}
                />
                <div className="flex items-center bg-primary text-white rounded-r px-4">
                  ₹
                </div>
              </div>
            </div>

            <div className="mb-3 xl:w-75 mx-2">
              <label
                htmlFor="exampleFormControlInput2"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Rate Of Interest (P.A.)
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Rate Of Interest"
                  ref={roiRef}
                />
                <div className="flex items-center bg-primary text-white rounded-r px-4">
                  %
                </div>
              </div>
            </div>

            <div className="mb-3 xl:w-75 mx-2">
              <label
                htmlFor="exampleFormControlInput3"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Time Period (In Years)
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput3"
                  placeholder="Time Period"
                  ref={loanTenureRef}
                />
                <div className="flex items-center bg-primary text-white rounded-r px-4">
                  Y
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`btn-primary ${loading ? ' cursor-not-allowed ' : ''}`}
            >
              {loading ? <span className="spinner"></span> : 'Calculate'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn-primary bg-red-500 hover:bg-red-600"
            >
              Clear
            </button>
            {showStat && (
              <button
                type="button"
                className="btn-primary"
                onClick={generatePDF}
              >
                Print
              </button>
            )}
            {showStat && (
              <button
                type="button"
                className="btn-primary bg-green-500 hover:bg-green-600"
              >
                Download
              </button>
            )}
          </div>
        </form>
      </li>

      {showStat && (
        <li className="lg:col-span-2 bg-gray-200 p-4" ref={pdf_ref}>
          <div className="p-6 overflow-hidden bg-neutral-50">
            <div className="text-right mb-2">
              <button
                onClick={() => setshowgraph(!showgraph)}
                className="btn-primary mb-2 text-sm px-3"
              >
                {showgraph ? "Show Graph" : "Show Table"}
              </button>
            </div>

            {!showgraph && (
              <>
                <h2 className="text-center text-2xl font-semibold text-primary mb-2">
                  Graph Analysis
                </h2>
                <div className="p-4 mx-auto w-full sm:w-3/4 md:w-1/2 lg:w-[40%] aspect-square">
                  <Pie data={data} />
                </div>
              </>
            )}

            {showgraph && (
              <>
                <h2 className="text-center text-xl font-semibold text-primary mb-4">
                  Monthly Calculation
                </h2>
                <div className="overflow-x-auto w-[95%] mx-auto">
                  <table className="border border-gray-300">
                    <colgroup>
                      <col className="w-300" />
                      <col className="w-300" />
                      <col />
                    </colgroup>
                    <thead className="border-b">
                      <tr>
                        <th className="text-gray-900 px-6 py-4 border-r border-b border-gray-300 bg-primary dark:text-white text-sm">
                          Month
                        </th>
                        <th className="text-gray-900 px-6 py-4 border-r border-b border-gray-300 bg-primary dark:text-white text-sm">
                          Opening Balance
                        </th>
                        <th className="text-gray-900 px-6 py-4 border-r border-b border-gray-300 bg-primary dark:text-white text-sm">
                          EMI
                        </th>
                        <th className="text-gray-900 px-6 py-4 border-r border-b border-gray-300 bg-primary dark:text-white text-sm">
                          Interest
                        </th>
                        <th className="text-gray-900 px-6 py-4 border-r border-b border-gray-300 bg-primary dark:text-white text-sm">
                          Principal Repaid
                        </th>
                        <th className="text-gray-900 px-6 py-4 border-b border-gray-300 bg-primary dark:text-white text-sm">
                          Closing Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {showTableMonthData.map((currdata) => (
                        <tr className="border-b" key={uuid()}>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 border-r border-gray-300 whitespace-nowrap">
                            {currdata.srNo}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 border-r border-gray-300 whitespace-nowrap">
                            {formatINRCurrency(currdata.openingBalance)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 border-r border-gray-300 whitespace-nowrap">
                            {formatINRCurrency(currdata.payment)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 border-r border-gray-300 whitespace-nowrap">
                            {formatINRCurrency(currdata.interest)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 border-r border-gray-300 whitespace-nowrap">
                            {formatINRCurrency(currdata.principal)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 border-r border-gray-300 whitespace-nowrap">
                            {formatINRCurrency(currdata.remainingLoan)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-2">
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-5">
                  EMI
                </h5>
                <h3 className="text-2xl">
                  <span className="text-xl">
                    {formatINRCurrency(showdata.emi)}
                  </span>
                </h3>
              </div>
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-5">
                  Total Interest
                </h5>
                <h3 className="text-2xl">
                  <span className="text-xl">
                    {formatINRCurrency(showdata.totalInterest)}
                  </span>
                </h3>
              </div>
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-5">
                  Total Amount
                </h5>
                <h3 className="text-2xl">
                  <span className="text-xl">
                    {formatINRCurrency(showdata.totalAmount)}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </li>
      )}
    </SearchResult_section>
  );
};

export default LoanAgainstProperty;