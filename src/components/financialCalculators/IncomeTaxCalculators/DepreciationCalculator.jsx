'use client';
import React, { useState, useRef } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Formik, Form, Field, ErrorMessage, formik } from 'formik';
import * as Yup from 'yup';
import { useReactToPrint } from 'react-to-print';
import SearchResult_section from '@/components/pagesComponents/pageLayout/SearchResult_section.js';
import { formatINRCurrency } from '@/utils/utilityFunctions';
import CalculatorsComponent from './CalculatorsComponent.jsx';
import 'chart.js/auto';

const DepreciationCal = () => {
  const [showDepRate, setShowDepRate] = useState('');
  const [showCostOfAsset, setShowCostOfAsset] = useState('');
  const [loading, setLoading] = useState(false);

  const [dataForChart, setDataForChart] = useState([]);

  const pdf_ref = useRef();
  const lineRef = useRef();

  const handleClear = () => {
    setShowDepRate('');
    setShowCostOfAsset('');
    setDataForChart([]);
  };

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: 'Depreciation',
  });
  const chartData = (values) => {
    const numberOfMonths = Number(values.estimatedUsefulLife);
    let currentBaseValue = Number(values.purchasePrice);
    const bal = [currentBaseValue];
    setDataForChart([currentBaseValue]);

    const yearlyDep = getYearlyDep(
      values.purchasePrice,
      values.scrapValue,
      values.estimatedUsefulLife,
    );

    for (let index = 1; index <= numberOfMonths; index++) {
      currentBaseValue = currentBaseValue - yearlyDep;
      bal.push(currentBaseValue);
    }

    setDataForChart(() => bal);
  };

  const getCostOfAsset = (baseValue, soldAmount) => {
    return Number(baseValue) - Number(soldAmount);
  };

  const getDepRate = (baseValue, soldAmount, timeOfUsage) => {
    const yearlyDep = getYearlyDep(baseValue, soldAmount, timeOfUsage);
    const rateOfDep = yearlyDep / Number(baseValue);
    return rateOfDep;
  };

  const getYearlyDep = (baseValue, soldAmount, timeOfUsage) => {
    const costOfAsset_ = getCostOfAsset(baseValue, soldAmount);
    const yearlyDep = costOfAsset_ / Number(timeOfUsage);
    return yearlyDep;
  };

  const handleSubmit = async (values) => {
    //lineRef.current.destroy();
    setLoading(true);
    const depRate = getDepRate(
      values.purchasePrice,
      values.scrapValue,
      values.estimatedUsefulLife,
    );
    const costOfAsset = getCostOfAsset(values.purchasePrice, values.scrapValue);

    setShowDepRate(depRate);
    setShowCostOfAsset(costOfAsset);
    chartData(values);

    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const labels = dataForChart.map((_, i) => `Year ${i}`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Yearly Depreciation Representation',
        data: dataForChart,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const formConfig = {
    fields: [
      {
        name: 'purchasePrice',
        label: 'Purchase Price',
        type: 'number',
        placeholder: 'Enter Purchase Price',
        suffix: '₹',
      },
      {
        name: 'scrapValue',
        label: 'Scrap Value',
        type: 'number',
        placeholder: 'Enter Scrap Value',
        suffix: '₹',
      },
      {
        name: 'estimatedUsefulLife',
        label: 'Estimated Useful Life',
        type: 'number',
        placeholder: 'Enter Useful Life (years)',
        suffix: 'Y',
      },
    ],
    buttons: [
      {
        label: 'Calculate',
        type: 'submit',
        disabled: false,
        className: '',
      },
      {
        label: 'Clear',
        action: () => handleClear(),
        type: 'button',
        disabled: false,
        className: 'bg-red-500 hover:bg-red-600',
      },
    ],
    specialButtons: [
      {
        label: 'Print',
        type: 'button',
        loading: false,
        show: !!showCostOfAsset,
        onClick: () => generatePDF(),
        className: '',
      },
      {
        label: 'Download',
        type: 'button',
        loading: false,
        show: !!showCostOfAsset,
        onClick: () => console.log('Download Clicked'),
        className: 'bg-green-500 hover:bg-green-600',
      },
    ],
  };

  return (
    <Formik
      initialValues={{
        purchasePrice: '',
        scrapValue: '',
        estimatedUsefulLife: '',
      }}
      validationSchema={Yup.object({
        purchasePrice: Yup.number()
          .integer()
          .typeError('Must be a number')
          .required('Enter an amount'),
        scrapValue: Yup.number()
          .integer()
          .typeError('Must be a number')
          .required('Enter an amount'),
        estimatedUsefulLife: Yup.number()
          .integer()
          .typeError('Must be a number')
          .required('Enter an amount'),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {/* <SearchResult_section title="Depreciation Calculator">
        <li className="p-4  ">
          <Form>
            <div className="space-y-4 ">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 ">
                <div>
                  <label
                    htmlFor="purchasePrice"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Purchase Price
                  </label>
                  <div>
                    <div className="flex">
                      <Field
                        type="text"
                        className="block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="purchasePrice"
                        name="purchasePrice"
                        placeholder="Purchase Price"
                      />
                      <div className="flex items-center bg-primary text-white  rounded-r px-4">
                        ₹
                      </div>
                    </div>
                    <ErrorMessage
                      component="span"
                      className="text-red-600"
                      name="purchasePrice"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="scrapValue"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Scrap Value
                  </label>
                  <div>
                    <div className="flex">
                      <Field
                        type="text"
                        className="block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        name="scrapValue"
                        id="scrapValue"
                        placeholder="Scrap Value"
                      />
                      <div className="flex items-center bg-primary text-white  rounded-r px-4">
                        ₹
                      </div>
                    </div>
                    <ErrorMessage
                      component="span"
                      className="text-red-600"
                      name="scrapValue"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="estimatedUsefulLife"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Estimated Useful Life
                  </label>
                  <div>
                    <div className="flex">
                      <Field
                        type="text"
                        className="block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="estimatedUsefulLife"
                        placeholder="Estimated Useful Life"
                        name="estimatedUsefulLife"
                      />
                      <div className="flex items-center bg-primary text-white  rounded-r px-4">
                        Y
                      </div>
                    </div>

                    <ErrorMessage
                      component="span"
                      className="text-red-600"
                      name="estimatedUsefulLife"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                <button
                  disabled={loading}
                  type="submit"
                  className={`btn-primary ${loading ? ' cursor-not-allowed ' : ''}`}
                >
                  {loading ? <span className="spinner"></span> : 'Calculate'}
                </button>
                <button
                  type="reset"
                  onClick={handleClear}
                  className="btn-primary bg-red-500 hover:bg-red-600"
                >
                  Clear
                </button>
                {showCostOfAsset && (
                  <button
                    type="button"
                    className="btn-primary "
                    onClick={generatePDF}
                  >
                    Print
                  </button>
                )}
                {showCostOfAsset && (
                  <button
                    type="button"
                    className="btn-primary bg-green-500 hover:bg-green-600"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          </Form>
          

        </li>
        {showCostOfAsset && !loading && (
          <li className="lg:col-span-2 p-4 " ref={pdf_ref}>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 m-4 border border-gray-200">
                <h5 className="text-gray-900 text-md leading-tight font-medium mb-5">
                  Depreciation Percentage
                </h5>
                <h5
                  className="mx-6 text-xs"
                  style={{ color: showCostOfAsset < 0 ? 'red' : 'green' }}
                >
                  <span className="text-sm">
                    {`${(showDepRate * 100).toLocaleString('en', {
                      maximumFractionDigits: 2,
                    })} %`}
                  </span>
                </h5>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 m-4 border border-gray-200">
                <h5 className="text-gray-900 text-md leading-tight font-medium mb-5">
                  Cost Of Asset
                </h5>
                <h5
                  className="mx-6 text-xs"
                  style={{ color: showCostOfAsset < 0 ? 'red' : 'green' }}
                >
                  <span className="text-sm">
                    {formatINRCurrency(showCostOfAsset)}
                  </span>
                </h5>
              </div>

              <div className=" p-2 w-full md:col-span-2">
                <Chart ref={lineRef} type="line" data={data} />
              </div>
            </div>
          </li>
        )}
      </SearchResult_section> */}
      {/* <SearchResult_section title="Depreciation Calculator">
        <CalculatorsComponent
          formConfig={formConfig}
          handleSubmit={handleSubmit}
        />

        {showCostOfAsset && !loading && (
          <li ref={pdf_ref} >
            <div>
              <div>
                <h5>Depreciation Percentage</h5>
                <h5 style={{ color: showCostOfAsset < 0 ? 'red' : 'green' }}>
                  {`${(showDepRate * 100).toLocaleString('en', {
                    maximumFractionDigits: 2,
                  })} %`}
                </h5>
              </div>

              <div>
                <h5>Cost Of Asset</h5>
                <h5 style={{ color: showCostOfAsset < 0 ? 'red' : 'green' }}>
                  {formatINRCurrency(showCostOfAsset)}
                </h5>
              </div>

              <div>
                <h5>Yearly Depreciation Representation</h5>
                <div>
                  <Chart ref={lineRef} type="line" data={data} />
                </div>
              </div>
            </div>
          </li>
        )}
      </SearchResult_section> */}

      <section className="p-4   ">
        {/* Main Layout: Form on the Left, Content on the Right */}
        <div className="grid grid-cols-10 gap-4 ">
          {/* Left Section: Form (30% Width) */}
          <div className="col-span-10 lg:col-span-3  rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              DepreciationCalculator
            </h3>
            <CalculatorsComponent
              formConfig={formConfig}
              handleSubmit={handleSubmit}
            />
          </div>

          {/* Right Section: Cards and Chart (70% Width) */}
          <div className="col-span-10 lg:col-span-7 grid grid-rows-[auto_1fr] gap-4 ">
            {/* Top Row: Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
              {/* Card 1 */}
              <div className=" rounded-lg p-4 shadow-md flex flex-col justify-center items-center w-full">
                <h5 className="text-sm font-medium text-center">
                  Depreciation Percentage
                </h5>
                <p
                  className={`text-base font-bold mt-2 ${
                    showCostOfAsset < 0 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {`${(showDepRate * 100).toLocaleString('en', {
                    maximumFractionDigits: 2,
                  })} %`}
                </p>
              </div>

              {/* Card 2 */}
              <div className=" rounded-lg p-4 shadow-md flex flex-col justify-center items-center ">
                <h5 className="text-sm font-medium  text-center">
                  Cost Of Asset
                </h5>
                <p
                  className={`text-base font-bold mt-2 ${
                    showCostOfAsset < 0 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {formatINRCurrency(showCostOfAsset)}
                </p>
              </div>
            </div>

            {/* Bottom Row: Chart */}
            <div className=" rounded-lg p-6 shadow-md  ">
              <h5 className="text-base font-medium  mb-4 text-center">
                Yearly Depreciation Representation
              </h5>
              <div className=" ">
                <Chart ref={lineRef} type="line" data={data} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Formik>
  );
};

export default DepreciationCal;
