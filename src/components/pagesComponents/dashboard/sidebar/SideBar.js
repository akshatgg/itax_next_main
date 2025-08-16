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
    <>
      <div
        className={`fixed ${topClass} bottom-0 bg-[#E9F2FF] text-gray-700 h-full z-30
          transition-all duration-300 ease-in-out shadow-lg border-r border-gray-200
          overflow-hidden ${sidebarWidth}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Toggle Section */}
        <div className="relative w-full px-4 py-3 border-b border-gray-200">
          <Icon 
            icon="ant-design:menu-unfold-outlined" 
            className="text-xl text-blue-600 hover:text-blue-800 transition-colors duration-200" 
          />
        </div>

        {/* Sidebar Navigation */}
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
    </>
  );
}
