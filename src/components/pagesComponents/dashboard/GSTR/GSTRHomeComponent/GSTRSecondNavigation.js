// import React from 'react';
// import CustomButton from './CustomButton';
// import CustomText from './CustomText';

// // Unified Component
// const MyComponent = () => {
//   return (
//     <div className="flex flex-col gap-2 mt-4 p-2">
//       {/* Header */}
//       <div className="flex justify-between items-center gap-4">
//         <div className="flex gap-1 items-center">
//           <CustomButton
//             variant="primary"
//             className="w-52 "
//             linkTo="/dashboard/easy-gst-return/permanent-information"
//           >
//             Permanent Information
//           </CustomButton>
//           <CustomButton variant="primary" className="w-52">
//             Registration Details
//           </CustomButton>
//         </div>
//         <div className="flex items-center text-sm font-medium text-blue-700">
//           <CustomText text="Registered GSTIN: 23DNNPS1910Q1ZG" variant="info">
//             {' '}
//             Registered GSTIN: 23DNNPS1910Q1ZG
//           </CustomText>
//         </div>
//         <div className="flex gap-2 items-center">
//           <label
//             htmlFor="periodSelect"
//             className="text-black text-sm font-medium"
//           >
//             <CustomText text="Period:" variant="dashboard">
//               Period
//             </CustomText>
//           </label>
//           <div className="flex items-center px-3 py-2 border-2 border-stone-300 bg-white rounded-md">
//             <select
//               id="periodSelect"
//               className="bg-transparent border-none text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
//             >
//               <option>April</option>
//               <option>May</option>
//               <option>June</option>
//               <option>July</option>
//               <option>August</option>
//               <option>September</option>
//               <option>October</option>
//               <option>November</option>
//               <option>December</option>
//               <option>January</option>
//               <option>February</option>
//               <option>March</option>
//             </select>
//           </div>
//           <CustomText text="F.Y:" variant="dashboard">
//             F.Y:
//           </CustomText>
//           <div className="flex items-center px-3 py-2 border-2 border-stone-300 bg-white rounded-md">
//             <select className="bg-transparent border-none text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
//               <option>2024-2025</option>
//               <option>2023-2024</option>
//               <option>2022-2023</option>
//               <option>2021-2022</option>
//               <option>2020-2021</option>
//               <option>2019-2020</option>
//               <option>2018-2019</option>
//               <option>2017-2018</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex justify-between items-center gap-4 mt-2">
//         <div className="flex gap-1">
//           <CustomButton variant="primary" className="w-52">
//             Master Table
//           </CustomButton>
//           <CustomButton variant="primary" className="w-52">
//             Import Excel/Telly Data
//           </CustomButton>
//         </div>
//         <div className="flex-grow text-center">
//           <CustomText
//             text="GSTR -3B filing is pending | GSTR - 1 filing is pending"
//             variant="info"
//             className="text-red-500"
//           >
//             GSTR -3B filing is pending | GSTR - 1 filing is pending
//           </CustomText>
//         </div>
//         <div className="flex gap-1">
//           <CustomButton variant="primary" className="w-52">
//             Check return status
//           </CustomButton>
//           <CustomButton variant="primary" className="w-52">
//             Login Details
//           </CustomButton>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MyComponent;




import StatusPill from "../StatusPill";
const GSTRSecondNavigation = () => {

  // Dummy data
  const data = {
    statuses: {
      gstr1Pending: false,
      gstr3bPending: true,
      gstr9Pending: false,
    },
    rows: [
      { code: 1, label: "Supply A", igst: 1000, cgst: 500, sgst: 500, cess: 0 },
      { code: 2, label: "Supply B", igst: 2000, cgst: 1000, sgst: 1000, cess: 0 },
    ],
    ledger: {
      balance: 5000,
      liability: 2000,
      cash: 1000,
      credit: 2000,
    },
  };
  return (
    <section section className="my-2 rounded-xl border bg-slate-100 p-2 text-sm" >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-2">
        <StatusPill label={`GSTR-1 is ${data.statuses.gstr1Pending ? "pending" : "up to date"}`} dot={data.statuses.gstr1Pending} />
        <StatusPill label={`GSTR-3B is ${data.statuses.gstr3bPending ? "pending" : "up to date"}`} dot={data.statuses.gstr3bPending} />
        <StatusPill label={`GSTR-9 is ${data.statuses.gstr9Pending ? "pending" : "up to date"}`} dot={data.statuses.gstr9Pending} />
        <StatusPill label="EasyInvoice" />
      </div>
    </section >

  )
}

export default GSTRSecondNavigation
