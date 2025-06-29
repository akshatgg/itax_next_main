// "use client"
// import DashSection from "@/components/pagesComponents/pageLayout/DashSection";
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// import { useState } from "react";
// import { useForm } from "react-hook-form"
// const formClassName = {
//     Label:"text-sm p-1 whitespace-no-wrap",
//     Input:"border border-2 rounded-md px-2 py-1 w-full",
// }
// function CreatePurchase ({invoiceForm}) {
//     const {register} = invoiceForm;
//     return (
//         <DashSection title="Create Purchase" className="mt-4">
//             <ul className="mt-4 gap-4 grid sm:grid-cols-2 lg:grid-cols-4 [&>li]:flex [&>li]:flex-col">
//                 <li>
//                     <label
//                         className={formClassName.Label}
//                         htmlFor="partyName"
//                     >
//                         Party Name
//                     </label>
//                     <input
//                         className={formClassName.Input}
//                         type="text"
//                         id="partyName"
//                         {...register("partyName")}
//                     />
//                 </li>
//                 <li>
//                     <label
//                         className={formClassName.Label}
//                         htmlFor="partyAddress"
//                     >
//                         Party Address
//                     </label>
//                     <input
//                         className={formClassName.Input}
//                         type="text"
//                         id="partyAddress"
//                         {...register("partyAddress")}
//                     />
//                 </li>
//                 <li>
//                     <label
//                         className={formClassName.Label}
//                         htmlFor="invoiceNumber"
//                     >
//                         Invoice Number
//                     </label>
//                     <input
//                         className={formClassName.Input}
//                         type="text"
//                         id="invoiceNumber"
//                         {...register("invoiceNumber")}
//                     />
//                 </li>
//                 <li>
//                     <label
//                         className={formClassName.Label}
//                         htmlFor="invoiceDate"
//                     >
//                         Invoice Date
//                     </label>
//                     <input
//                         className={formClassName.Input}
//                         type="date"
//                         id="invoiceDate"
//                         {...register("invoiceDate")}
//                     />
//                 </li>
//             </ul>
//             <ul className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4 [&>li]:flex [&>li]:flex-col">
//                 <li>
//                     <label
//                         className={formClassName.Label}
//                         htmlFor="phoneNumber"
//                     >
//                         Phone Number
//                     </label>
//                     <input
//                         className={formClassName.Input}
//                         type="text"
//                         id="phoneNumber"
//                         {...register("phoneNumber")}
//                     />
//                 </li>
//                 <li>
//                     <label className={formClassName.Label} htmlFor="GSTIN">
//                         GSTIN
//                     </label>
//                     <input
//                         className={formClassName.Input}
//                         type="text"
//                         id="GSTIN"
//                         {...register("GSTIN")}
//                     />
//                 </li>
//                 <li>
//                     <label className={formClassName.Label} htmlFor="days">
//                         Days
//                     </label>
//                     <input
//                         className={`${formClassName.Input} bg-neutral-600/20`}
//                         disabled
//                         type="text"
//                         id="days"
//                         {...register("days")}
//                     />
//                 </li>
//                 <li>
//                     <label
//                         className={formClassName.Label}
//                         htmlFor="invoiceDate"
//                     >
//                         Invoice Date
//                     </label>
//                     <input
//                         className={formClassName.Input}
//                         type="date"
//                         id="invoiceDate"
//                         {...register("invoiceDate")}
//                     />
//                 </li>
//             </ul>
//         </DashSection>
// 	);
// }
// function AllPurchase() {
//     const purchaseData = {
//         purchaseTitle:[
//             {
//                 title:"SL. NO.",
//             },
//             {
//                 title:"Items",
//             },
//             {
//                 title:"QUANTITY",
//             },
//             {
//                 title:"UNIT",
//             },
//             {
//                 title:"PRICE",
//             },
//             {
//                 title:"RATE (INCL. DISCOUNT)",
//             },
//             {
//                 title:"DISCOUNT",
//             },
//             {
//                 title:"UNIT",
//             },
//         ],
//         purchaseData_body:[
//             // {
//             //     item_name: "value_from_input",
//             //     HSN_code: "value_from_input",
//             //     Price: 123.45,
//             //     gst_percentage: "selected_option_value",
//             //     opening_stock: 50,
//             //     unit: "selected_option_value",
//             // },
//         ]
//     };
// 	return (
//         <DashSection title={"ITEMS ON THE Purchase"} className="mt-4">
//             <div className="my-4 max-h-96 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
//                 <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
//                     <thead className=" sticky -top-0 shadow-md text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
//                         <tr className="border-b-2 dark:border-neutral-900">
//                             {purchaseData.purchaseTitle.map((item,index)=>
//                                 <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap" key={index}>{item.title}</th>
//                                 )}
//                             <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 border-t border-gray-100">
//                         {purchaseData.purchaseData_body.map((item,i) => (
//                             <tr key={i} className="odd:bg-white odd:dark:bg-neutral-900 even:bg-neutral-50 even:dark:bg-neutral-800 border-b dark:border-neutral-700">
//                                 <td className="px-6 py-4 font-semibold text-gray-900">{item.item_name}</td>
//                                 <td className="px-6 py-4">{item.HSN_code}</td>
//                                 <td className="px-6 py-4">{item.Price}</td>
//                                 <td className="px-6 py-4">{item.gst_percentage}</td>
//                                 <td className="px-6 py-4">{item.opening_stock}</td>
//                                 <td className="px-6 py-4">{item.unit}</td>
//                                 <td className="px-6 py-4 flex">
//                                     <Icon icon="bxs:edit" className=" cursor-pointer hover:text-blue-700 text-xl"/>
//                                     <Icon icon="material-symbols:delete" className=" cursor-pointer hover:text-red-700 text-xl"/>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {purchaseData.purchaseData_body.length === 0 ? (
//                 <div>
//                     <Icon className="w-40 h-24 opacity-5 mx-auto" icon="ph:files-light" />
//                     <p className="text-center">No Record Found</p>
//                 </div>
//                 ):""}
//             </div>
//             {purchaseData.purchaseData_body.length === 0 ? (
//             <div className=" flex flex-col items-center gap-4 justify-center mb-2">
//                 <Link href="/">
//                     <button type="button" className="btn-primary">
//                         add Item
//                     </button>
//                 </Link>
//             </div>
//             ):""}
//             <div className="flex justify-between p-4 bg-neutral-300/20 my-4">
//                 <div>Sub Total (₹)</div>
//                 <div>0 (₹)</div>
//                 <div>0 (₹)</div>
//                 <div>0 (₹)</div>
//             </div>
//             <div className=" max-w-xs ml-auto grid grid-cols-2 p-4 bg-neutral-400/20 my-4">
//                 <div>Total Amount</div>
//                 <div>0 ₹</div>
//                 <div>Paid via</div>
//                 <div>Cash</div>
//             </div>
//             <div className="text-end px-4">
//                 <button className="btn-primary" type="submit">create</button>
//             </div>
//         </DashSection>
// 	);
// }
// export default function Purchase() {
//     const currentDate = useState(new Date().toISOString().split('T')[0])

//     const invoiceForm = useForm({
//         defaultValues:{
//             partyName:"",
//             partyAddress:"",
//             invoiceNumber:"",
//             invoiceDate: currentDate,
//             phoneNumber:"",
//             GSTIN:"",
//             days:"",
//             invoiceDate:currentDate,
//         }
//     })
//     const {handleSubmit} = invoiceForm
//     const onCreateInvoice=(formData)=>{
//         console.log(formData)
//     }
//     return (
//         <form className="w-full" onSubmit={handleSubmit(onCreateInvoice)}>
//             <CreatePurchase invoiceForm={invoiceForm}/>
//             <AllPurchase />
//         </form>
// 	);
// }

'use client';
const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { Icon } from '@iconify/react';
import { IoMdDownload } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import ExcelJS from 'exceljs';
const tableData = {
  'Party Name': 'partyName',
  Date: 'createdAt',
  'GST Number': 'gstNumber',
  'Invoice No.': 'invoiceNumber',
  Amount: 'totalAmount',
  Status: 'status',
};

export default function Purchase(props) {
  const router = useRouter();
  const { salesInvoices, loading, error } = props;
  // const [invoiceFiltered, setInvoiceFiltered] = useState();

  // const [query, setQuery] = useState("");
  // const handleSearch = (e)=>{
  //     setQuery(e.target.value)
  //     if(e.target.value === "") {
  //         setInvoiceFiltered(salesInvoices)
  //     }
  //     setInvoiceFiltered(salesInvoices.filter((invoice)=>{
  //         return invoice.invoiceNumber.includes(e.target.value)
  //     }))
  // }

  // console.log(salesInvoices);
  // Excel Export
  const giveMaxWidth = (column) => {
    let maxWidth = column.length;
    salesInvoices.forEach((element) => {
      console.log(element);
      if (element[column].length > maxWidth) {
        maxWidth = element[column].length;
      }
    });
    return maxWidth;
  };
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('MySheet1');

    // add header columns
    worksheet.columns = Object.keys(tableData).map((col) => {
      return {
        header: col,
        key: tableData[col],
        width: giveMaxWidth(tableData[col]) + 2,
      };
    });

    // add data to file
    salesInvoices.forEach((invoice) => {
      worksheet.addRow(invoice);
    });
    // adding styles
    worksheet.getRow(1).height = 40;
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCCCCC' }, // Grey background color
      };
      cell.alignment = { vertical: 'center' }; // Center text
    });
    worksheet.getRow(1).alignment = { vertical: 'middle' };

    // ADDING A STYLED BANNER
    // Header data
    const bannerData = [
      {
        text: 'Itax Easy Sales report',
        fontSize: 25,
        fontItalic: false,
        fontUnderline: false,
        fontBold: true,
        textColor: 'bfdbfe',
        backgroundColor: '1d4ed8',
        height: 90,
        row: 1,
      },
      {
        text: 'Visit Facebook',
        fontSize: 16,
        fontUnderline: true,
        fontBold: false,
        textColor: 'FF67e8f9',
        backgroundColor: 'FFFFFFFF',
        height: 25,
        row: 2,
        fontItalic: true,
        isImage: true,
        hyperlink: 'http://www.facebook.com/itaxeasydotcom',
        hyperlinkText: 'Visit our Facebook page',
      },
      {
        text: 'Visit twitter',
        fontSize: 16,
        fontUnderline: true,
        fontBold: false,
        fontItalic: true,
        textColor: 'FF67e8f9',
        backgroundColor: 'FFFFFFFF',
        height: 25,
        row: 3,
        hyperlink: 'https://twitter.com/itaxeasy',
        hyperlinkText: 'Visit our X page',
      },
    ];

    const numColumnsToSpan = worksheet.columns.length;
    bannerData.forEach((data) => {
      worksheet.insertRow(data.row, []);
      worksheet.mergeCells(data.row, 1, data.row, numColumnsToSpan);
      worksheet.getRow(data.row).getCell(1).alignment = {
        horizontal: 'center',
        vertical: 'middle',
      };
      worksheet.getRow(data.row).height = data.height;
      const cell = worksheet.getRow(data.row).getCell(1);
      cell.value =
        data.hyperlink === undefined
          ? data.text
          : {
              text: data.text,
              hyperlink: data.hyperlink,
              tooltip: data.hyperlinkText,
            };
      cell.font = {
        size: data.fontSize,
        bold: data.fontBold,
        color: { argb: data.textColor },
        italic: data.fontItalic,
        underline: data.fontUnderline,
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: data.backgroundColor },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Generate Excel buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create Blob object and trigger download
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'userData.xlsx';
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  if (loading) {
    return (
      <div className="grid place-content-center min-h-[calc(100vh-5rem)]">
        <h1>loading</h1>
      </div>
    );
  }
  if (error?.isError) {
    return (
      <div className="grid place-content-center min-h-[calc(100vh-5rem)]">
        <h1>{error?.response?.data?.message}</h1>
      </div>
    );
  }

  return (
    <DashSection
      title={'Purchase Invoice'}
      titleRight={
        <div className=" flex flex-row items-center gap-4 justify-center mb-2">
          {/* <Link
            href="/dashboard/accounts/invoice/sales/create"
            className="inline-block px-4 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-[transform,_colors] duration-300"
          >
            create
          </Link> */}

          <Button
            onClick={() =>
              router.push('/dashboard/accounts/invoice/sales/create')
            }
            size={'sm'}
            className={'m-2'}
          >
            Create Invoice
          </Button>

          <Button
            onClick={handleExport}
            size={'sm'}
            className={'m-2 flex items-center gap-1 justify-center hover:scale-105 transition-[transform,_colors] duration-300'}
          >
            <IoMdDownload />
            <span>Excel</span>
          </Button>
        </div>
      }
      className="py-0"
    >
      {/* <div>
                    <label htmlFor="search">Search</label>
                    <input
                        type="search"
                        id="search"
                        className="input"
                        value={query}
                        onChange={handleSearch}
                    />
                    <button>Search</button>
                </div> */}
      <div className="h-[calc(100vh-190px)] sm:h-[calc(100vh-220px)] overflow-y-auto p-2 border border-t-2">
        {salesInvoices?.length === 0 ? (
          <div className="grid place-content-center h-full">
            <Icon
              className="w-40 h-24 opacity-5 mx-auto"
              icon="ph:files-light"
            />
            <p className="text-center">No Record Found</p>
          </div>
        ) : (
          // <ul className="p-2 gap-2 grid sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
          //     {salesInvoices?.map((invoice) => (
          //         <li key={invoice?.id}>
          //             <Link
          //                 href={`/dashboard/accounts/invoice/sales/sale?id=${invoice?.id}`}
          //                 className="text-sm p-2 rounded-md grid sm:grid-cols-2 gap-4 shadow-md shadow-blue-500 hover:shadow-blue-600 outline outline-1 hover:outline-2 outline-blue-500"
          //             >
          //                 <div>
          //                     <div className="flex gap-2">
          //                         <div className="label font-semibold">
          //                             Party Name:
          //                         </div>
          //                         <div className="tracking-tighter text-gray-800 font-medium">
          //                             Jitendra Yadav
          //                         </div>
          //                     </div>
          //                     <div className="flex gap-2">
          //                         <div className="label font-semibold">
          //                             GST Number
          //                         </div>
          //                         <div className="tracking-tighter text-gray-800 font-medium">
          //                             {invoice?.gstNumber}a
          //                         </div>
          //                     </div>
          //                 </div>
          //                 <div>
          //                     <div className="flex gap-2">
          //                         <div className="label font-semibold">
          //                             Date
          //                         </div>
          //                         <div className="tracking-tighter text-gray-800 font-medium">
          //                             {formatDate(invoice?.createdAt)}
          //                         </div>
          //                     </div>
          //                     <div className="flex gap-2">
          //                         <div className="label font-semibold">
          //                             Invoice No.
          //                         </div>
          //                         <div className="tracking-tighter text-gray-800 font-medium">
          //                             {invoice?.invoiceNumber}
          //                         </div>
          //                     </div>
          //                 </div>
          //                 <div className="sm:col-span-2 sm:flex justify-between">
          //                     <div className="flex gap-2">
          //                         <div className="label font-semibold">
          //                             Amount-
          //                         </div>
          //                         <div className="tracking-tighter text-gray-800 font-medium">
          //                             ₹${invoice?.totalAmount}
          //                         </div>
          //                     </div>
          //                     <div className="flex gap-2">
          //                         <div className="label font-semibold">
          //                             Status{" "}
          //                         </div>
          //                         <div className="text-orange-500 ">
          //                             {invoice?.status}
          //                         </div>
          //                     </div>
          //                 </div>
          //             </Link>
          //         </li>
          //     ))}
          // </ul>
          <div className=" w-full overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse text-nowrap ">
              <thead className="text-left">
                <tr>
                  {Object.keys(tableData).map((column) => {
                    return (
                      <th className="border-b px-4 py-3" key={column}>
                        {column}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-left">
                {salesInvoices &&
                  salesInvoices.map((invoice, index) => {
                    return (
                      <tr
                        key={invoice?.id}
                        className={index % 2 !== 0 ? 'bg-blue-100' : ''}
                      >
                        {Object.keys(tableData).map((column) => {
                          return (
                            <td
                              className={`px-4 py-3 ${column === 'Status' ? 'text-orange-500' : ''}`}
                              key={invoice[tableData[column]]}
                            >
                              {column === 'Date'
                                ? formatDate(invoice[tableData[column]])
                                : invoice[tableData[column]]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashSection>
  );
}
