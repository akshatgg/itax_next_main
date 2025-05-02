'use client';

import { useState,useRef } from 'react';
// import { motion } from 'framer-motion';
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Link from 'next/link';
import {
  depreciation,
  incomeTax,
  interestIndraVikas,
  interestOnKVP,
  gold,
  form16,
  savingCertificate1,
  // savingCertificate2,
  inflation,
  countryCode,
} from '@/components/icons';

export default function DownloadIndex() {
  const [section, setSection] = useState('Download');
  const [renderDownloadList, setRenderDownloadList] = useState(list);

  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY / height) - 0.5) * -15; // Adjust rotation sensitivity
    const rotateY = ((mouseX / width) - 0.5) * 15;

    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };


  return (
    // <div className="">
    //   <div className="pb-10 p-8 max-w-7xl   mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
    //     {renderDownloadList.map((element) =>
    //       element.downloadlist.map((element, index) => (
    //         <Link
    //           key={index}
    //           href={`/downloads/${element.label
    //             .replace(/ /g, '')
    //             .toLowerCase()}`}
    //           className="flex flex-col items-center py-8 px-3  hover:shadow-lg hover:shadow-primary shadow-md rounded-lg mx-8 md:mx-0 relative overflow-hidden"
    //         >
    //           <span className="object-contain h-11 w-11 fill-zinc-600">
    //             <div className='w-11 h-11  bg-zinc-200 rounded-full overflow-hidden p-2'>{element.icon}</div>
    //           </span>
    //           <p className=" text-center text-sm font-semibold text-gray-800 py-2">{element.label}</p>
    //           <p className="text-xs text-center font-semibold text-gray-700 py-2 ">{element.description}</p>

    //         </Link>
    //       )),
    //     )}

    //   </div>
    // </div>
   

  //   <div className="bg-gray-50 py-10">
  //   {/* Responsive Grid */}
  //   <div className="p-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  //     {renderDownloadList.map((group) =>
  //       group.downloadlist.map((item, index) => (
  //         <motion.div
  //           key={index}
  //           whileHover={{ scale: 1.05 }}
  //           whileTap={{ scale: 0.95 }}
  //           className="relative group flex flex-col items-center p-6 bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden"
  //         >
  //           {/* Decorative Circle (Top-Left Corner) */}
  //           <div className="absolute w-20 h-20 bg-blue-500 opacity-10 rounded-full -top-10 -left-10 group-hover:opacity-20 transition-opacity"></div>

  //           {/* Icon */}
  //           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow">
  //             {item.icon}
  //           </div>

  //           {/* Label */}
  //           <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
  //             {item.label}
  //           </p>

          

  //           {/* Description */}
  //           <p className="text-sm text-center text-gray-500 mb-6">
  //             {item.description}
  //           </p>


  //           {/* Decorative Circle (Bottom-Right Corner) */}
  //           <div className="absolute w-32 h-32 bg-blue-500 opacity-10 rounded-full -bottom-10 -right-10 group-hover:opacity-20 transition-opacity"></div>
  //         </motion.div>
  //       ))
  //     )}
  //   </div>
  // </div>

//   <div className="w-full py-12 px-4 bg-gradient-to-b from-gray-100 to-gray-200">
//   <div className="pb-10 px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//     {renderDownloadList.map((group) =>
//       group.downloadlist.map((item, index) => (
//         <motion.div
//           key={index}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className="relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
//         >
//           {/* Decorative Circle (Top-Left) */}
//           <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500 rounded-full opacity-70 blur-2xl"></div>

//           <Link
//             href={`/downloads/${item.label.replace(/ /g, '').toLowerCase()}`}
//             className="flex flex-col items-center py-8 px-6 relative z-10"
//           >
//             {/* Icon */}
//             <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md mb-4">
//               <div className="w-8 h-8 text-white">{item.icon}</div>
//             </div>

//             {/* Label */}
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//               className="text-lg font-semibold text-gray-800 text-center mb-2"
//             >
//               {item.label}
//             </motion.p>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.2 }}
//               className="text-sm text-gray-700 text-center"
//             >
//               {item.description}
//             </motion.p>
//           </Link>

//           {/* Decorative Circle (Bottom-Right) */}
//           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-70 blur-2xl"></div>
//         </motion.div>
//       ))
//     )}
//   </div>
// </div>

    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-80 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6"
    >
      {/* Content of the card */}
      <div
        style={{
          transform: "translateZ(40px)",
        }}
        className="relative z-10 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-2">3D Card</h2>
        <p className="text-sm text-white/80">Hover to see the magic!</p>
      </div>

      {/* Decorative background */}
      <div
        style={{
          transform: "translateZ(30px)",
        }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-pink-500 blur-xl opacity-30 rounded-2xl"
      ></div>
    </motion.div>


  );
}

const list = [
  {
    downloadlist: [
      // {
      //     link: '/',
      //     label: 'Pan Corection',
      //     description:
      //         'Downlaod Blank Form Or Click Here.',
      // },
      {
        link: '/',
        icon: form16,
        label: 'Form 16',
        description: 'Downlaod Blank Form16 From Here.',
      },
      {
        link: '/downloadlist/gold&silverrate',
        icon: gold,
        label: 'Gold & Silver Rate ',
        description: 'Find Your Gold Rate And Downaload It.',
      },
      // {
      //     link: '/',
      //     label: 'Bussiness Codec For ITR Forms ',
      //     description:
      //         'Know Your Bussiness Code Before Filling ITR',
      // },
      {
        link: '/',
        label: 'New Cost Inflation Index',
        icon: inflation,
        description: 'The Cost Inflation Index For FY 2023-24',
      },
      {
        link: '/',
        icon: inflation,
        label: 'Cost Inflation Index',
        description: 'The Cost Inflation Index For FY 2023-24',
      },
      {
        link: '/',
        icon: incomeTax,
        label: 'Status wise Income Tax Code and PAN Code',
        description:
          'Applicants for PAN are required to provide the AO code in their application.',
      },
      {
        link: '/',
        icon: savingCertificate1,
        label:
          'Interest Accrued on National Saving Certificates (VIIIth Issue)',
        description: 'VIII are that it has no limit ',
      },
      {
        link: '/',
        icon: interestIndraVikas,
        label: 'Interest Accrued on Indira Vikas Patras (IVP)',
        description: 'interest accrued on IVPs at the rate of 13.43% per annum',
      },
      {
        link: '/',
        icon: interestOnKVP,
        label: 'Interest Accrued on National Saving Certificates (IXth Issue)',
        description: 'The NSC interest rate in 2021 and 2022 currently 6.8% ',
      },
      {
        link: '/',
        icon: depreciation,
        label: 'Depreciation Table',
        description: 'Depreciation allowance as percentage of WDV ',
      },
      {
        link: '/',
        icon: interestOnKVP,
        label: 'Interest On  KVP',
        description: 'Kisan Vikas Patra is a small savings instrument ',
      },
      {
        link: '/',
        icon: countryCode,
        label: 'Country Code',
        description: 'To File ITR Select Country Code. ',
      },
      // {
      //     link: '/',
      //     label: 'Tax Calculator',
      //     description:
      //         'calculate your tax liability for The assessment year. ',
      // },
    ],
  },
];

const calculatorIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zM64 224c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zm32 64c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zM160 320c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zM288 192c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zM256 320c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zm32 64c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32z" />
  </svg>
);



const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};