'use client';

import gstStateCodes from '@/utils/gstStateCodes';
// import { Icon } from '@iconify/react';
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

  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isError, setIsError] = useState(null);
  //   const [error, setError] = useState(null);

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
    <section className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit()}>
        <ul className="grid grid-cols-12 gap-4">
          <li className="md:col-span-6 col-span-12">
            <label htmlFor="itemName" className={formClassNames.label}>
              Party name
            </label>
            <input
              type="text"
              id="itemName"
              className={formClassNames.input}
              placeholder="Party name"
              {...register('itemName', {
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
            <label htmlFor="unit" className={formClassNames.label}>
              Unit
            </label>
            <select
              id="unit"
              className={formClassNames.input}
              {...register('unit', {
                required: 'Unit is required',
              })}
            >
              <option value="pieces">Pieces</option>
              <option value="box">Box</option>
              <option value="dozen">Dozen</option>
              <option value="kg">Kilogram (Kg)</option>
              <option value="meter">Meter (M)</option>
              <option value="liter">Liter (L)</option>
            </select>
            {errors.unit && (
              <p className=" text-xs text-red-500 italic">
                {errors.unit.message}
              </p>
            )}
          </li>
          <li className="md:col-span-6 col-span-12">
            <label htmlFor="itemName" className={formClassNames.label}>
              Contact Person
            </label>
            <input
              type="text"
              id="itemName"
              className={formClassNames.input}
              placeholder="Contact Person"
              {...register('itemName', {
                required: 'Item name is required',
              })}
            />
            {errors.itemName && (
              <p className=" text-xs text-red-500 italic">
                {errors.itemName.message}
              </p>
            )}
          </li>

          <li className="col-span-12">
            <label htmlFor="Description" className={formClassNames.label}>
              Address
            </label>
            <textarea
              id="Description"
              className={formClassNames.input}
              rows="3"
              placeholder="Address"
              {...register('description', {
                required: 'Description is required',
              })}
            ></textarea>
            {errors.description && (
              <p className=" text-xs text-red-500 italic">
                {errors.description.message}
              </p>
            )}
          </li>
          <li className="md:col-span-4 col-span-12">
            <label htmlFor="unit" className={formClassNames.label}>
              Country
            </label>
            <select
              id="unit"
              className={formClassNames.input}
              {...register('unit', {
                required: 'Unit is required',
              })}
            >
              <option value="pieces">india</option>
            </select>
            {errors.unit && (
              <p className=" text-xs text-red-500 italic">
                {errors.unit.message}
              </p>
            )}
          </li>
          <li className="md:col-span-4 col-span-12">
            <label htmlFor="itemName" className={formClassNames.label}>
              City
            </label>
            <input
              type="text"
              id="itemName"
              className={formClassNames.input}
              placeholder="city"
              {...register('itemName', {
                required: 'Item name is required',
              })}
            />
            {errors.itemName && (
              <p className=" text-xs text-red-500 italic">
                {errors.itemName.message}
              </p>
            )}
          </li>
          <li className="md:col-span-4 col-span-12">
            <label htmlFor="itemName" className={formClassNames.label}>
              State Of Supply
            </label>
            <select
              className={formClassNames.input}
              id="stateOfSupply"
              {...register('stateOfSupply', {
                required: 'Item name is required',
              })}
              defaultValue={'same state'}
            >
              <option value="same state" className="text-sm">
                Same State
              </option>
              {gstStateCodes.map((state, index) => (
                <option className="text-sm" key={index} value={state.state}>
                  {state.code}:{state.state}
                </option>
              ))}
            </select>
          </li>
          <li className="md:col-span-6 col-span-12">
            <label htmlFor="itemName" className={formClassNames.label}>
              Phone
            </label>
            <input
              type="text"
              id="itemName"
              className={formClassNames.input}
              placeholder="Phone"
              {...register('itemName', {
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
            <label htmlFor="itemName" className={formClassNames.label}>
              Email
            </label>
            <input
              type="text"
              id="itemName"
              className={formClassNames.input}
              placeholder="email"
              {...register('itemName', {
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
            <label htmlFor="itemName" className={formClassNames.label}>
              GSTIN
            </label>
            <input
              type="text"
              id="itemName"
              className={formClassNames.input}
              placeholder="GSTIN"
              {...register('itemName', {
                required: 'Item name is required',
              })}
            />
            {errors.itemName && (
              <p className=" text-xs text-red-500 italic">
                {errors.itemName.message}
              </p>
            )}
          </li>
          <br />

          <li className="md:col-span-6 col-span-12">
            <div className="flex justify-between md:justify-start items-center">
              <button
                type="submit"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
              >
                Submit
              </button>
            </div>
          </li>
        </ul>
      </form>
    </section>
  );
}
