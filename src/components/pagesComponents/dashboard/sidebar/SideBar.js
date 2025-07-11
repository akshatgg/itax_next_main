// 'use client';
// import { useState } from 'react';
// import { Icon } from '@iconify/react';
// import SideBarItem from './SidebarItem';

// function SidebarToggle({ isSidebarOpen, handleSidebar }) {
//   return (
//     <div
//       className="
// 			relative
// 			w-full
// 			font-bold
//             pl-5
//             pt-3
//             pb-1
//             shadow-lg
//             px-2 text-3xl
//             text-blue-500
//             hover:text-blue-700
//             duration-200
// 			"
//     >
//       <button onClick={handleSidebar}>
//         <Icon className="rounded-sm" icon="ant-design:menu-unfold-outlined" />
//       </button>
//     </div>
//   );
// }
// export default function SideBar(prop) {
//   const { data, isSidebarOpen, handleSidebar, setIsNavigating } = prop;
//   const [activeItem, setActiveItem] = useState(0);

//   const handleActive = (e) => {
//     if (activeItem == e) {
//       return setActiveItem(null);
//     }
//     setActiveItem(e);
//   };
//   return (
//     <>
//       <div
//         className={`
//                     shadow-sm shadow-blue-500
//                     pb-[50px]
//                     scrollbar-thin
//                     overflow-hidden z-30 fixed top-[3.6rem] bottom-0 bg-neutral-50 text-blue-500 h-full
//                     ${isSidebarOpen ? '-translate-x-[0%] lg:w-64' : 'lg:-translate-x-[0%] -translate-x-full lg:w-16'} w-64 transition-all duration-200`}
//       >
//         <SidebarToggle
//           isSidebarOpen={isSidebarOpen}
//           handleSidebar={handleSidebar}
//         />
//         <nav
//           className={`scrollbar-thin
// 					transition-transform duration-500
// 					overflow-y-auto
// 					overflow-x-hidden
// 					p-2
// 					h-full
// 					w-[16rem]
// 				`}
//         >
//           <ul className="grid gap-3 p-2">
//             {data?.map((item, i) => (
//               <SideBarItem
//                 key={i}
//                 index={i}
//                 {...item}
//                 handleActive={handleActive}
//                 activeItem={activeItem}
//                 setIsNavigating={setIsNavigating}
//               />
//             ))}
//           </ul>
//         </nav>
//       </div>
//       <div
//         onClick={handleSidebar}
//         className={` ${isSidebarOpen ? 'lg:hidden absolute inset-[0_0_0_0] z-20 ' : 'hidden'}`}
//       ></div>
//     </>
//   );
// }

'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import SideBarItem from './SidebarItem';

export default function SideBar({ data, setIsNavigating, isSidebarOpen }) {
  const [activeItem, setActiveItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  

  const handleActive = (e) => {
    if (activeItem === e) return setActiveItem(null);
    setActiveItem(e);
  };

  const sidebarWidth = isHovered ? 'w-64' : 'w-16';

  return (
    <>
      <div
        className={`fixed top-[3.6rem] bottom-0 bg-neutral-50 text-blue-500 h-full z-30
          transition-all duration-300 ease-in-out shadow-sm shadow-blue-500
          overflow-hidden ${sidebarWidth}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Toggle Section (Menu icon) */}
        <div className="relative w-full font-bold pl-5 pt-3 pb-1 shadow-lg px-2 text-3xl text-blue-500 hover:text-blue-700 duration-200">
          <Icon icon="ant-design:menu-unfold-outlined" className="rounded-sm" />
        </div>

        {/* Sidebar Navigation */}
        <nav
          className="scrollbar-thin
 					transition-transform duration-500
 					overflow-y-auto
 					overflow-x-hidden 
 					p-2
 					h-full
					w-[16rem]"
        >
          <ul className="grid gap-3">
            {data?.map((item, i) => (
              <SideBarItem
                key={i}
                index={i}
                {...item}
                handleActive={handleActive}
                activeItem={activeItem}
                setIsNavigating={setIsNavigating}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
