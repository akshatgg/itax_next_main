'use client';

// import { Icon } from "@iconify/react";
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// function ListItem(props) {
//     // const handleCurrentTab=(tab)=>{
//     //     if (tab===currentTab) {
//     //         setCurrentTab(0)
//     //         return
//     //     }
//     //     return setCurrentTab(tab)
//     // }
//     const {currentTab,handleCurrentTab,children,title} = props

//     return (
//         <li className={`grid ${currentTab === 1 ? "grid-rows-[auto,1fr]" : "grid-rows-[auto,0fr]"} transition-[grid-template-rows] duration-300`} >
//             <div
//                 className="cursor-pointer border-2  p-2 flex justify-between items-center text-sm"
//                 onClick={() => handleCurrentTab(1)}
//             >
//                 <span>{title}</span>
//                 {/* <span className="grid place-content-center text-xl"> */}
//                     <Icon

//                         icon={currentTab === 1 ? "fa-solid:sort-down" : "icon-park-solid:left-one"}
//                     />
//                 {/* </span> */}
//             </div>
//             <div className="overflow-hidden">{children}</div>
//         </li>
//     );
// }
export default function Page() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [error, setError] = useState(null);
  const formClassNames = {
    label: 'block mb-2 text-sm font-medium text-gray-950/90 dark:text-white',
    input:
      'bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    button:
      'w-full text-center mt-4 focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 ',
    gridUL: 'grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4',
    formSectionTitle:
      'text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300',
  };
  return (
    <section className="p-4 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit()}>
        <ul className="grid grid-cols-12 gap-4">
          <li className="md:col-span-6 col-span-12">
            <label htmlFor="itemName" className={formClassNames.label}>
              Account Name
            </label>
            <input
              type="text"
              id="itemName"
              className={formClassNames.input}
              placeholder="Account Name"
              {...register('accountName', {
                required: 'Item name is required',
              })}
            />
            {errors.itemName && (
              <p className=" text-xs text-red-500 italic">
                {errors.itemName.message}
              </p>
            )}
          </li>
          <li className="md:col-span-6 col-span-12">
            <label htmlFor="hsnCode" className={formClassNames.label}>
              Date
            </label>
            <input
              type="date"
              id="hsnCode"
              className={formClassNames.input}
              placeholder="date"
              {...register('date', {
                required: 'HSN is required',
              })}
            />
          </li>
          {errors.hsnCode && (
            <p className=" text-xs text-red-500 italic">
              {errors.hsnCode.message}
            </p>
          )}
          <li className="md:col-span-6 col-span-12">
            <label htmlFor="hsnCode" className={formClassNames.label}>
              Debit balance
            </label>
            <input
              type="text"
              id="hsnCode"
              className={formClassNames.input}
              placeholder="date"
              {...register('date', {
                required: 'HSN is required',
              })}
            />
          </li>

          <li className="md:col-span-6 col-span-12">
            <label htmlFor="cgst" className={formClassNames.label}>
              Credit balance
            </label>
            <input
              type="number"
              id="cgst"
              className={formClassNames.input}
              placeholder="0.00"
              {...register('cgst', {
                required: 'CGST is required',
              })}
            />
            {errors.cgst && (
              <p className=" text-xs text-red-500 italic">
                {errors.cgst.message}
              </p>
            )}
          </li>

          <li className="md:col-span-6 col-span-12">
            <div className="flex justify-between md:justify-start items-center">
              <button
                type="submit"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
              >
                Create
              </button>
            </div>
          </li>
        </ul>
      </form>
    </section>
  );
}
