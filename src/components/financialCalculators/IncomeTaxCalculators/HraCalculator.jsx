'use client';
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FaCity, FaRupeeSign, FaPrint, FaFileDownload, FaUndo, FaCalculator } from 'react-icons/fa';
import IncomeTaxComponents from './IncomeTaxComponents';

function App() {
  const [basic, setBasic] = useState('');
  const [hra, setHra] = useState('');
  const [rent, setRent] = useState('');
  const [isMetro, setIsMetro] = useState(false);
  const [da, setDa] = useState('');
  const [otherAllowances, setOtherAllowances] = useState('');
  const [result, setResult] = useState(null);

  const calculateHRA = () => {
    const basicSalary = parseFloat(basic);
    const hraReceived = parseFloat(hra);
    const rentPaid = parseFloat(rent);
    const dearnessAllowance = parseFloat(da);
    const salary = basicSalary + dearnessAllowance;

    const metroAllowance = isMetro ? 0.5 * salary : 0.4 * salary;
    const excessRent = rentPaid - 0.1 * salary;
    const hraExempt = Math.min(hraReceived, metroAllowance, excessRent);

    setResult(hraExempt.toFixed(2));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("HRA Calculation Details", 10, 20);
    doc.setFontSize(12);
    doc.text(`Basic Salary: ₹${basic}`, 10, 35);
    doc.text(`HRA Received: ₹${hra}`, 10, 45);
    doc.text(`Rent Paid: ₹${rent}`, 10, 55);
    doc.text(`DA: ₹${da}`, 10, 65);
    doc.text(`Metro City: ${isMetro ? 'Yes' : 'No'}`, 10, 75);
    doc.text(`HRA Exemption: ₹${result}`, 10, 90);
    doc.save('HRA_Calculation_Result.pdf');
  };

  const clearFields = () => {
    setBasic('');
    setHra('');
    setRent('');
    setIsMetro(false);
    setDa('');
    setOtherAllowances('');
    setResult(null);
  };

  const inputFields = [
    { label: 'Basic Salary', value: basic, onChange: (e) => setBasic(e.target.value) },
    { label: 'HRA Received', value: hra, onChange: (e) => setHra(e.target.value) },
    { label: 'Rent Paid', value: rent, onChange: (e) => setRent(e.target.value) },
    { label: 'Dearness Allowance (DA)', value: da, onChange: (e) => setDa(e.target.value) },
    { label: 'Other Allowances', value: otherAllowances, onChange: (e) => setOtherAllowances(e.target.value) }
  ];

  return (

    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4 ">
    //   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-transform duration-300 hover:shadow-2xl">
    //     <div className="p-8">
    //       <div className="text-center mb-8">
    //         <h1 className="text-4xl font-bold text-blue-800 mb-2 flex items-center justify-center gap-3">
    //           <FaCalculator className="text-purple-600" />
    //           HRA Calculator
    //         </h1>
    //         <p className="text-gray-600 ">Calculate your House Rent Allowance exemption quickly</p>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    //         {/* Input Fields */}
    //         <div className="space-y-5">
    //           <div className="relative">
    //             <label className="block text-sm font-medium text-gray-700 mb-2">
    //               <FaRupeeSign className="inline mr-2 text-green-500" />
    //               Basic Salary
    //             </label>
    //             <input
    //               type="number"
    //               value={basic}
    //               onChange={(e) => setBasic(e.target.value)}
    //               className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
    //               placeholder="Enter basic salary"
    //             />

    //           </div>

    //           <div className="relative">
    //             <label className="block text-sm font-medium text-gray-700 mb-2">
    //               <FaRupeeSign className="inline mr-2 text-orange-500" />
    //               HRA Received
    //             </label>
    //             <input
    //               type="number"
    //               value={hra}
    //               onChange={(e) => setHra(e.target.value)}
    //               className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
    //               placeholder="Enter HRA received"
    //             />
    //           </div>

    //           <div className="relative">
    //             <label className="block text-sm font-medium text-gray-700 mb-2">
    //               <FaRupeeSign className="inline mr-2 text-red-500" />
    //               Rent Paid
    //             </label>
    //             <input
    //               type="number"
    //               value={rent}
    //               onChange={(e) => setRent(e.target.value)}
    //               className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
    //               placeholder="Enter rent paid"
    //             />
    //           </div>
    //         </div>

    //         <div className="space-y-5">
    //           <div className="relative">
    //             <label className="block text-sm font-medium text-gray-700 mb-2">
    //               <FaRupeeSign className="inline mr-2 text-yellow-500" />
    //               Dearness Allowance (DA)
    //             </label>
    //             <input
    //               type="number"
    //               value={da}
    //               onChange={(e) => setDa(e.target.value)}
    //               className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
    //               placeholder="Enter DA amount"
    //             />
    //           </div>

    //           <div className="relative">
    //             <label className="block text-sm font-medium text-gray-700 mb-2">
    //               <FaRupeeSign className="inline mr-2 text-pink-500" />
    //               Other Allowances
    //             </label>
    //             <input
    //               type="number"
    //               value={otherAllowances}
    //               onChange={(e) => setOtherAllowances(e.target.value)}
    //               className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
    //               placeholder="Enter other allowances"
    //             />
    //           </div>

    //           <div className="pt-4">
    //             <label className="flex items-center space-x-3 bg-blue-50 p-4 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
    //               <input
    //                 type="checkbox"
    //                 checked={isMetro}
    //                 onChange={(e) => setIsMetro(e.target.checked)}
    //                 className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
    //               />
    //               <span className="flex items-center">
    //                 <FaCity className="mr-2 text-purple-600" />
    //                 Living in Metro City
    //               </span>
    //             </label>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Result Section */}
    //       {result !== null && (
    //         <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
    //           <div className="text-center">
    //             <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Tax Exempt HRA</p>
    //             <p className="text-4xl font-bold">
    //               ₹{result}
    //             </p>
    //           </div>
    //         </div>
    //       )}

    //       {/* Action Buttons */}
    //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    //         <button
    //           onClick={calculateHRA}
    //           className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
    //         >
    //           <FaCalculator className="text-xl" />
    //           Calculate
    //         </button>
            
    //         <button
    //           onClick={handleDownload}
    //           className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm"
    //         >
    //           <FaFileDownload className="text-lg" />
    //           Download PDF
    //         </button>
            
    //         <button
    //           onClick={clearFields}
    //           className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm"
    //         >
    //           <FaUndo className="text-lg" />
    //           Reset
    //         </button>
    //       </div>
    //     </div>
    //   </div>

                      
    // </div>
    <div>
          <IncomeTaxComponents
             title="HRA Calculator"
             des="Calculate your House Rent Allowance exemption quickly"
             inputs={inputFields}
             isMetro={isMetro}
             setIsMetro={setIsMetro}
             result={result}
             calculateHRA={calculateHRA}
             handleDownload={handleDownload}
             clearFields={clearFields}
      />


    </div>


  );
}

export default App;