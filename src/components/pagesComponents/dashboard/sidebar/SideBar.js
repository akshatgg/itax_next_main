'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import SideBarItem from './SidebarItem';

export default function SideBar({ data, setIsNavigating, isSidebarOpen, topOffset }) {
  const [activeItem, setActiveItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleActive = (e) => {
    if (activeItem === e) return setActiveItem(null);
    setActiveItem(e);
  };

  const sidebarWidth = isHovered ? 'w-64' : 'w-16';
  const topClass = topOffset ? `top-[${topOffset}]` : "top-[3.6rem]";

  return (

    
    // <>
    //   <div
    //     className={`fixed ${topClass} bottom-0 bg-[#E9F2FF] text-gray-700 h-full z-30
    //       transition-all duration-300 ease-in-out shadow-lg border-r border-gray-200
    //       overflow-hidden ${sidebarWidth}
    //     `}
    //     onMouseEnter={() => setIsHovered(true)}
    //     onMouseLeave={() => setIsHovered(false)}
    //   >
    //     <div className="relative w-full px-4 py-3 border-b border-gray-200">
    //       <Icon 
    //         icon="ant-design:menu-unfold-outlined" 
    //         className="text-xl text-blue-600 hover:text-blue-800 transition-colors duration-200" 
    //       />
    //     </div>

    //     <nav className="h-full overflow-y-auto overflow-x-hidden">
    //       <ul className="py-2">
    //         {data?.map((item, i) => (
    //           <SideBarItem
    //             key={i}
    //             index={i}
    //             {...item}
    //             handleActive={handleActive}
    //             activeItem={activeItem}
    //             setIsNavigating={setIsNavigating}
    //             isSidebarOpen={isHovered}
    //           />
    //         ))}
    //       </ul>
    //     </nav>
    //   </div>
    // </>


    <div
  className={`fixed ${topClass} bottom-0 bg-[#E9F2FF] text-gray-700 h-full z-30
    transition-all duration-300 ease-in-out shadow-lg border-r border-gray-200
    ${sidebarWidth}
  `}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <div className="relative w-full px-4 py-3 border-b border-gray-200">
    <Icon 

      className="text-xl text-blue-600 hover:text-blue-800 transition-colors duration-200" 
    />
  </div>

  <nav className="h-full overflow-y-auto overflow-x-hidden">
    <ul className="py-2">
      {data?.map((item, i) => (
        <SideBarItem
          key={i}
          index={i}
          {...item}
          handleActive={handleActive}
          activeItem={activeItem}
          setIsNavigating={setIsNavigating}
          isSidebarOpen={isHovered}
        />
      ))}
    </ul>
  </nav>
</div>

  );
}

// 'use client';
// import { useEffect, useMemo, useState } from 'react';
// import { Icon } from '@iconify/react';
// import SideBarItem from './SidebarItem';
// export default function SideBar({
//   data = [],
//   topOffset = '3.6rem',
//   defaultOpen = true,
//   onToggle,
// }) {
//   const [open, setOpen] = useState(defaultOpen);
//   const [activeItem, setActiveItem] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);

  
//   // responsive breakpoint
//   useEffect(() => {
//     const update = () => setIsMobile(window.innerWidth < 1024);
//     update();
//     window.addEventListener('resize', update);
//     return () => window.removeEventListener('resize', update);
//   }, []);

//   // close by default on mobile
//   useEffect(() => {
//     if (isMobile) setOpen(false);
//   }, [isMobile]);

//   useEffect(() => {
//     onToggle?.(open);
//   }, [open, onToggle]);

//   const sidebarWidth = useMemo(() => (open ? 'w-64' : 'w-16'), [open]);
//   const topClass = useMemo(() => `top-[${topOffset}]`, [topOffset]);

//   const handleActive = (idx) => {
//     if (activeItem === idx) return setActiveItem(null);
//     setActiveItem(idx);
//   };

//   return (
//     <>
//       {/* Backdrop for mobile */}
//       {isMobile && open && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30 lg:hidden"
//           onClick={() => setOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       <aside
//         className={`fixed ${topClass} bottom-0 z-40
//           bg-[#E9F2FF] text-gray-700 border-r border-gray-200 shadow-lg
//           transition-[width,transform] duration-300 ease-in-out rounded-r-3xl
//           ${sidebarWidth}
//           ${isMobile ? (open ? 'translate-x-0' : '-translate-x-full') : ''}
//         `}
//         role="navigation"
//         aria-label="Main sidebar"
//       >
//         {/* Header with arrow toggle */}
//         <div className="relative px-3 py-2 border-b border-gray-200 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => setOpen((v) => !v)}
//             className="grid h-8 w-8 place-items-center rounded-full bg-white border border-blue-300 hover:border-blue-400 hover:shadow-sm transition"
//             aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
//           >
//             <Icon
//               icon={open ? 'mdi:chevron-left' : 'mdi:chevron-right'}
//               className="text-blue-800 text-xl"
//             />

//           </button>
//             {open && <span className="text-sm font-semibold text-blue-800">Menu</span>}
//                </div>
//         </div>

//         {/* Navigation list */}
//         <nav className="h-full overflow-y-auto overflow-x-hidden">
//           <ul className="py-2">
//             {data?.map((item, i) => (
//               <SideBarItem
//                 key={i}
//                 index={i}
//                 {...item}
//                 handleActive={handleActive}
//                 activeItem={activeItem}
//                 setIsNavigating={setIsNavigating}
//                 isSidebarOpen={open}
//               />
//             ))}
//           </ul>
//         </nav>
//       </aside>
//     </>
//   );
// }


