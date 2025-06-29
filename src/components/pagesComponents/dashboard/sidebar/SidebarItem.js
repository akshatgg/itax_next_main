'use client';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/partials/loading/Loader';
import SubSidebarItem from './SubSidebarItem';
export default function SideBarItem(props) {
  const [subActiveItem, setSubActiveItem] = useState(-1);
  const {
    upcoming,
    title,
    iconName,
    linkTo,
    subMenu,
    subMenuItems,
    handleActive,
    activeItem,
    index,
    setIsNavigating,
    isSidebarOpen,
  } = props;

  const router = useRouter();

  
  const subHandleActive = (e) => {
    if (subActiveItem == e) {
      return setSubActiveItem(null);
    }
    setSubActiveItem(e);
  };

  
  const handleNavigation = async () => {
    if (upcoming || !linkTo) return;
    setIsNavigating(true);
    router.push(linkTo);
  };

  useEffect(() => {
    if (!isSidebarOpen && activeItem === index) {
      handleActive(null);
    }
  }, [isSidebarOpen]);

  if (subMenu) {
    return (
      <li
        className={`grid gap-2 transition-grid-rows duration-300 grid-rows-[0fr_0fr] ${activeItem === index ? 'grid-rows-[0fr_1fr]' : ''}`}
      >
        <button
          onClick={() => handleActive(index)}
          disabled={upcoming}
          className={`${upcoming ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}  flex font-bold capitalize `}
        >
          <span>
            <Icon
              icon={iconName}
              className="w-6 h-6 ml-1 mr-2  bg-blue-500 text-neutral-100 rounded-md p-1"
            />
          </span>
          <span className="ml-6 font-semibold text-left block text-sm">
            {title}
          </span>
          <span className="ml-auto">
            {subMenu ? (
              <Icon
                icon={
                  activeItem === index
                    ? 'ep:arrow-up-bold'
                    : 'ep:arrow-down-bold'
                }
              />
            ) : (
              ''
            )}
          </span>
        </button>
        <div
          className={`overflow-hidden px-2 grid transition-grid-rows duration-300 grid-rows-[0fr_0fr] bg-neutral-100  shadow-[inset_0px_0px_3px_0px_#444] transition-colors text-blue-500 rounded-md`}
        >
          {subMenuItems.map((item, i) => (
            <SubSidebarItem
              key={i}
              index={i}
              {...item}
              subHandleActive={subHandleActive}
              subActiveItem={subActiveItem}
              setIsNavigating={setIsNavigating}
            />
          ))}
        </div>
      </li>
    );
  }
  return (
    <li className="capitalize ">
      <button
        onClick={handleNavigation}
        disabled={upcoming}
        className={`${upcoming ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} flex font-bold`}
      >
        <span>
          <Icon
            icon={iconName}
            className="w-6 h-6 ml-1 mr-2  bg-blue-500 text-neutral-100 rounded-md p-1"
          />
        </span>
        <span className="ml-6 font-semibold text-left block text-sm">
          {title}
        </span>
        <span>
          {subMenu ? (
            <Icon
              icon={
                activeItem === index ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'
              }
            />
          ) : (
            ''
          )}
        </span>
      </button>
    </li>
  );
}
