import Link from 'next/link';
import { H2 } from '@/components/pagesComponents/pageLayout/Headings';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export default function OurServices({ ourServicesCards }) {
  return (
    <div className="mx-auto max-w-7xl lg:px-8">
      <H2 className="text-lg lg:text-[25px] py-4 font-semibold justify-center ">
        Our Services
      </H2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 xl:gap-x-8">
        {/* {ourServicesCards.map((element, i) => (
          <li
            key={`key ${element.name + ' ' + i}`}
            className="shadow-lg rounded-md border border-gray-300 overflow-hidden px-8 py-6 lg:p-2 flex-grow flex-shrink-0"
          >
            <h4 className="rounded-md text-center text-sm py-2   bg-primary  text-white font-semibold">
            {element.heading} 
            </h4>
            <div className="flex flex-col justify-between ">
              {element.items.map((item) => (
                <>
                  {item.label && (
                    <Link
                      key={item.label}
                      className={`flex justify-between gap-4 items-center py-4 px-3  hover:text-blue-600 ${!item.link ? 'pointer-events-none' : ''}`}
                      href={item.link ? item.link : '#'}
                    >
                      <p className="font-semibold text-xs whitespace-nowrap ">
                        {item.label}
                      </p>
                      {!item.link && (
                        <span className="tracking-tighter text-xs bg-blue-100 text-gray-600 rounded-full px-1 italic">
                          Upcoming
                        </span>
                      )}
                    </Link>
                  )}
                </>
              ))}
            </div>
          </li>
        ))} */}
        {ourServicesCards.map((element, i) => (
        <motion.li
          key={`key ${element.name + " " + i}`}
          className="shadow-lg rounded-lg border border-gray-300 overflow-hidden px-12 py-6 lg:p-6 flex-grow flex-shrink-0 transition-transform hover:scale-105  relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ translateY: -5 }}
        >
          {/* <div className='w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center absolute top-[-10%] left-[5%] -z-10 opacity-10'> <div className='w-16 h-16 bg-white rounded-full'></div>
          </div>
          <div className='w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center absolute top-[-10%] left-[-10%] -z-10 opacity-10'> <div className='w-16 h-16 bg-white rounded-full'></div></div>
           */}
          <h4 className=" text-center text-sm py-3 font-bold border-b border-black ">
            {element.heading}
          </h4>
          <div className="flex flex-col justify-between mt-4 space-y-4">
            {element.items.map((item) => (
              <div key={item.label || Math.random()}>
                {item.label && (
                  <Link
                    className={`flex justify-between gap-4 items-center py-3 px-4 hover:text-primary ${
                      !item.link ? "pointer-events-none" : ""
                    }`}
                    href={item.link ? item.link : "#"}
                  >
                    <p className="font-semibold text-xs whitespace-nowrap">
                      {item.label}
                    </p>
                    {!item.link && (
                      <span className="tracking-tighter text-xs bg-blue-100 text-gray-600 rounded-full px-2 py-1 italic">
                        Upcoming
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </motion.li>

        
      ))}


      
      </ul>
    </div>
  );
}
