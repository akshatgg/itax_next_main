'use client';
import React, { useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import SearchResult_section from '@/components/pagesComponents/pageLayout/SearchResult_section.js';
import Image from 'next/image';
import { formatINRCurrency } from '@/utils/utilityFunctions';
ChartJS.register(ArcElement, Tooltip, Legend);

const RdCal = () => {
  const principalRef = useRef('');
  const rateRef = useRef('');
  const timeperiodRef = useRef('');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState('');
  const [showStat, setShowStat] = useState(false);
  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'Recursive Deposit',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const principle = +principalRef.current.value;
    const rate = +rateRef.current.value;
    const months = +timeperiodRef.current.value;

    console.log(principle, months, rate);

    const interestEarned =
      (principle * ((months * (months + 1)) / 24) * rate) / 100;

    const invested = principle * months;

    const totalValue = invested + interestEarned;

    setInfo({
      interestEarned: interestEarned.toFixed('2'),
      invested: invested.toFixed('2'),
      totalValue: totalValue.toFixed('2'),
    });

    setLoading(false);
    setShowStat(true);
  };
  const handleClear = () => {
    principalRef.current.value = '';
    rateRef.current.value = '';
    timeperiodRef.current.value = '';
    setLoading(false);
    setInfo({});
    setShowStat(false);
  };
  const data = {
    labels: ['Principal', 'Interest Earned'],
    datasets: [
      {
        data: [info.invested, info.interestEarned],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <SearchResult_section title="Recursive Deposit Calculator">
      <li className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 ">
            <div>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Principal
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  className="form-control
                                        block
                                        w-full
                                        px-3    
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                  id="exampleFormControlInput1"
                  placeholder="Principal"
                  ref={principalRef}
                />
                <div className="flex items-center bg-primary text-white  rounded-r px-4">
                  ₹
                </div>
              </div>
            </div>
            <div>
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
                  className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                  id="exampleFormControlInput2"
                  placeholder="Rate Of Interest"
                  ref={rateRef}
                />
                <div className="flex items-center bg-primary text-white  rounded-r px-4">
                  %
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="exampleFormControlInput3"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Months
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                  id="exampleFormControlInput3"
                  placeholder="Months"
                  ref={timeperiodRef}
                />
                <div className="flex items-center bg-primary text-white  rounded-r px-4">
                  M
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
            <button
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
                className="btn-primary "
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
        <li className="lg:col-span-2 space-y-4 bg-gray-200 p-4" ref={pdf_ref}>
          <div className="bg-neutral-50 p-4 ">
            <div className="mx-auto p-4 w-full aspect-square  sm:w-3/4 md:w-[40%]">
              <Pie data={data} />
            </div>
            <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm  mx-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-5 ">
                  Invested
                </h5>
                <h3 className="text-2xl">
                  <span className="text-xl">
                    {formatINRCurrency(info.invested)}
                  </span>
                </h3>
              </div>
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm  mx-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-5 ">
                  Interest Earned
                </h5>
                <h3 className="text-2xl">
                  <span className="text-xl">
                    {formatINRCurrency(info.interestEarned)}
                  </span>
                </h3>
              </div>
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm  mx-4">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-5 ">
                  Total Value
                </h5>
                <h3 className="text-2xl">
                  <span className="text-xl">
                    {formatINRCurrency(info.totalValue)}
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

export default RdCal;
