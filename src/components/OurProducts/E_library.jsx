"use client";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const E_library = () => {
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData]=useState([]);
  const [searchkey,setSearchkey]=useState(null);
  const [currdata, setCurrData] = useState([]);
  const [show, setShow] = useState(false);
  const showtype = (id) => {
    const crrid = data.filter((item) => item.id == id);
    setCurrData(crrid);
    setShow(!show);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/library/getAll`, 
      )
      .then(function (response) {
        setData(response.data.allLibrary);
        setFilteredData(response.data.allLibrary);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const filterRef=useRef();
  const conponentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "E_Library Itax Easy",
  });

  function handleSearch()
  {
    const searchTerm = filterRef.current.value.trim();
    if(!searchTerm) return
    setSearchkey(searchTerm);
    // console.log(searchTerm)
    const newFilteredData= data.filter((row)=>{ return Object.values(row).some((value)=>{return value?.toString().toLowerCase().includes(searchTerm)})})
    // console.log(newFilteredData)
    setFilteredData(newFilteredData)
  }
  function handleResetSearch()
  {
    setFilteredData(data)
    filterRef.current.value=''
    setSearchkey(null)
  }

  return (
    <>
      <div className="m-10">
        <div className="flex justify-between">
        <h1 className=" text-center text-3xl heading-5">E-Library</h1>
        {/* Search Bar */}
        <div className="flex gap-3 transition-all duration-300 items-center">
          <input
            type="text"
            ref={filterRef}
            placeholder="Search"
            className="border-2 border-gray-300 rounded-md px-2 py-1"
          />
          <button onClick={handleSearch} className="btn-primary bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
          {searchkey&&<button onClick={handleResetSearch} className=" btn-primary bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out"
         
          >
            Reset
          </button>}
        </div>
        </div>
         <div className="w-full overflow-auto ">
         <table className="table table-auto border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-blue-300 text-sm text-left">
              <th className="border border-gray-300 p-2 ">Id</th>
              <th className="border border-gray-300 p-2 ">Pan</th>
              <th className="border border-gray-300 p-2 ">Section</th>
              <th className="border border-gray-300 p-2 ">Sub Section</th>
              <th className="border border-gray-300 p-2 ">Subject</th>
              <th className="border border-gray-300 p-2 ">Ao Order</th>
              <th className="border border-gray-300 p-2 ">Itat No</th>
              <th className="border border-gray-300 p-2 ">Rsa No</th>
              <th className="border border-gray-300 p-2 ">Bench</th>
              <th className="border border-gray-300 p-2 ">Appeal No</th>
              <th className="border border-gray-300 p-2 ">Appellant</th>
              <th className="border border-gray-300 p-2 ">View</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((element) => {
              return (
                <React.Fragment key={element.id}>
                  <tr
                    key={element.id}
                    className="h-10 hover:bg-gray-50 text-left"
                  >
                    <td className="border border-gray-300 p-2">{element.id}</td>
                    <td className="border border-gray-300 p-2">
                      {element.pan}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.section}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.sub_section}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.subject}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.ao_order}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.itat_no}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.rsa_no}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.bench}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.appeal_no}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {element.appellant}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        type="button"
                        className="px-3 py-2  text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-[transform,_colors] duration-300 text-xs font-medium text-center inline-flex items-center   rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => showtype(element.id)}
                      >
                        <Icon icon="carbon:view-filled" />
                        View
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
         </div>
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex={-1}
          aria-hidden="true"
          className={
            show === true
              ? "  overflow-y-auto backdrop-blur-sm bg-black/30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
              : "hidden  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          }
        >
          <div className="relative m-auto  p-4 ">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600">
                <button type="button" onClick={generatePDF} className="btn-primary">
                  Download
                </button>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="static-modal"
                  onClick={showtype}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close </span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-2 space-y-4" ref={conponentPDF}>
                {currdata.map((element) => {
                  return (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <table className="table text-left border-collapse border border-gray-300 ">
                          <tbody>
                            <tr>
                              <th className="border border-gray-300  ">Id</th>
                              <td className="border border-gray-300 p-2">
                                {element.id}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">Pan</th>

                              <td className="border border-gray-300 p-2">
                                {element.pan}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Section
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.section}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Sub Section
                              </th>
                              <td className="border border-gray-300 p-2">
                                {element.sub_section}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Subject
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.subject}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Ao Order
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.ao_order}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Itat No
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.itat_no}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  py-2">
                                Rsa No
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.rsa_no}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Bench
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.bench}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="table text-left border-collapse border border-gray-300 ">
                          <tbody>
                            <tr>
                              <th className="border border-gray-300  ">
                                Appeal No
                              </th>
                              <td className="border border-gray-300 p-2">
                                {element.appeal_no}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Appellant
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.appellant}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Respondent
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.respondent}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Appeal Type
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.appeal_type}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Appeal Filed By
                              </th>
                              <td className="border border-gray-300 p-2">
                                {element.appeal_filed_by}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Order Result
                              </th>

                              <td className="border border-gray-300 p-2">
                                {element.order_result}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Tribunal Order Date
                              </th>
                              <td className="border border-gray-300 p-2">
                                {element.tribunal_order_date}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Assessment Year
                              </th>
                              <td className="border border-gray-300 p-2">
                                {element.assessment_year}
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-gray-300  ">
                                Download
                              </th>
                              <td className="border border-gray-300 p-2">
                                {element.download}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mx-20">
                        <h1 className="heading-6 text-center">Lesson</h1>
                        <hr className="border-gray-200 dark:border-white"></hr>

                        <p className="text-justify">{element.conclusion}</p>
                        <h1 className="heading-6 text-center">Judgment</h1>
                        <hr className="border-gray-200 dark:border-white"></hr>

                        <p className="text-justify">{element.judgment}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default E_library;
