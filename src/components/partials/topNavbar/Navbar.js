'use client';

import Link from 'next/link.js';
import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import useAuth from '@/hooks/useAuth.js';
import UserInfo from './topNavbarComponents/UserInfo';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { StyledLink, Itag } from '@/app/styles/globalStyles';
import { StoreContext } from '@/store/store-context.js';
import BillShillLink from '@/components/BillShillLink.jsx';
import Image from 'next/image.js';
import userbackAxios from '@/lib/userbackAxios';
import { useRouter,usePathname } from 'next/navigation';
import Loader from '@/components/partials/loading/Loader';


// Menu configurations
const MENUS = {
  ourProducts: [
    {
      url: '/dashboard/itr/itr-filling/upload-form-16',
      menu: 'Easy ITR',
      upcoming: false,
    },
    {
      url: '/ourproducts/library',
      menu: 'Easy E-Library',
      upcoming: false,
    },
  ],

  ourServices: [
    {
      menu: 'Easy GST Links',
      subMenu: [
        { url: '/easyservice/searchbygstin', menu: 'Search by GSTIN' },
        { url: '/easyservice/searchbypan', menu: 'Search by PAN' },
        { url: '/easyservice/trackgstreturn', menu: 'Track GST Return' },
      ],
    },
    {
      menu: 'Easy IncomeTax Links',
      subMenu: [
        { url: '/easyservice/verifypandetails', menu: 'Verify Pan Details' },
        {
          url: '/easyservice/checkpanaadhaarstatus',
          menu: 'Check Pan Aadhaar Status',
        },
        { url: '/easyservice/searchtan', menu: 'Search Tan' },
      ],
    },
    {
      menu: 'Easy Bank Links',
      subMenu: [
        { url: '/easyservice/ifscdetails', menu: 'IFSC Code' },
        { url: '/easyservice/verifybankdetails', menu: 'Verify Bank Account' },
        { url: '/easyservice/upiverify', menu: 'UPI Verification' },
      ],
    },
    {
      menu: 'Easy MCA',
      subMenu: [
        { url: '/easyservice/companydetails', menu: 'Company Details' },
        {
          url: '/easyservice/companydirectordetails',
          menu: 'Company Director Details',
        },
      ],
    },
    {
      menu: 'Easy Aadhaar Links',
      subMenu: [
        {
          url: '/easyservice/aadhaar-verify',
          menu: 'Easy Aadhaar Verification',
          upcoming: false,
        },
        {
          url: '/easyservice/aadhaar-link-status',
          menu: 'Easy Link Aadhaar Status',
          upcoming: false,
        },
      ],
    },
    {
      menu: 'Easy Converter',
      subMenu: [
        { url: '/easyservice/image-to-pdf', menu: 'Image to PDF' },
        { url: '/easyservice/merge-pdf', menu: 'Merge PDF' },
      ],
    },
    {
      menu: 'Post Office',
      subMenu: [
        { url: '/easyservice/pincodeinfo', menu: 'Pincode Information' },
        { url: '/easyservice/pincodebycity', menu: 'Pin by City' },
      ],
    },
  ],

  financialCalculator: [
    {
      menu: 'Bank Calculators',
      subMenu: [
        { url: '/financialcal/sical', menu: 'Simple Interest Calculator' },
        { url: '/financialcal/cical', menu: 'Compound Interest' },
      ],
    },
    {
      menu: 'Income Tax Calculators',
      subMenu: [
        { url: '/financialcal/hracal', menu: 'HRA Calculator' },
        { url: '/financialcal/depCalc', menu: 'Depreciation Calculator' },
        {
          url: '/financialcal/advanceTaxCal',
          menu: 'Advance Tax Calculator (Old-Regime)',
        },
        { url: '/financialcal/taxcalculator/new', menu: 'Tax Calculator' },
        {
          url: '/financialcal/capitalGainCalc',
          menu: 'Capital Gain Calculator',
        },
      ],
    },
    {
      menu: 'GST Calculators',
      subMenu: [{ url: '/financialcal/gstcal', menu: 'GST Calculator' }],
    },
    {
      menu: 'Investment Calculators',
      subMenu: [
        { url: '/financialcal/miscal', menu: 'Post Office MIS' },
        { url: '/financialcal/cagr', menu: 'CAGR Calculator' },
        { url: '/financialcal/rdcal', menu: 'RD Calculator' },
        { url: '/financialcal/fdcal', menu: 'FD Calculator' },
        { url: '/financialcal/lumpsumpcal', menu: 'Lump Sum Calculator' },
        { url: '/financialcal/sipcal', menu: 'SIP Calculator' },
      ],
    },
    {
      menu: 'Loan Calculators',
      subMenu: [
        { url: '/financialcal/businesscal', menu: 'Business Loan Calculator' },
        { url: '/financialcal/carloancal', menu: 'Car Loan Calculator' },
        { url: '/financialcal/loanagainstcal', menu: 'Loan Against Property' },
        { url: '/financialcal/homeloancal', menu: 'Home Loan Calculator' },
        {
          url: '/financialcal/personalloancal',
          menu: 'Personal Loan Calculator',
        },
      ],
    },
    {
      menu: 'Insurance Calculators',
      subMenu: [{ url: '/financialcal/npscal', menu: 'NPS Calculator' }],
    },
  ],
};

// Navigation links configuration
const NAV_LINKS = [
  { href: '/blogs', label: 'Blog' },
  { href: '/register-startup/registration', label: 'Register a Startup' },
  { href: '/apis/all_apis', label: 'APIs' },
  { href: '/downloads', label: 'Downloads' },
];

// Icons
const ArrowIcon = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 mr-1"
  >
    <path
      fillRule="evenodd"
      d={
        direction === 'down'
          ? 'M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
          : 'M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
      }
      clipRule="evenodd"
    />
  </svg>
);

// Dropdown menu component
const DropdownMenu = ({ title, items, hasSubMenu = false, onNavigate }) => (
  <li className="mx-2 cursor-pointer text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600 group relative">
    <div className="flex items-center py-5">
      <span className="group-hover:hidden">
        <ArrowIcon direction="down" />
      </span>
      <span className="hidden group-hover:block">
        <ArrowIcon direction="right" />
      </span>
      {title}
    </div>
    <ul className="absolute hidden group-hover:flex flex-col bg-white dark:-bg--clr-neutral-900 shadow-md rounded-md p-3 border">
      {items.map((item, index) =>
        hasSubMenu ? (
          <li
            key={index}
            className="py-3 px-5 w-56 font-bold text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600 group-one relative"
          >
            <span>{item.menu}</span>
            <ul className="absolute hidden left-56 top-0 group-one-hover:flex flex-col bg-white dark:-bg--clr-neutral-900 shadow-md rounded-md border py-3 z-50">
              {item.subMenu.map((subItem) => (
                <button
                  key={subItem.menu}
                  onClick={() => onNavigate(subItem.url)}
                  className="py-3 mx-2 w-56 font-bold text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>{subItem.menu}</span>
                  {subItem.upcoming && (
                    <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">
                      UPCOMING
                    </span>
                  )}
                </button>
              ))}
            </ul>
          </li>
        ) : (
          <button
            key={item.url}
            onClick={() => onNavigate(item.url)}
            className={`py-3 mx-2 w-56 font-bold text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600 flex items-center justify-between ${
              item.upcoming ? 'pointer-events-none' : ''
            }`}
          >
            <span>{item.menu}</span>
            {item.upcoming && (
              <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">
                UPCOMING
              </span>
            )}
          </button>
        ),
      )}
    </ul>
  </li>
);

// Mobile menu item component
const MobileMenuItem = ({ item, onLinkClick, type, toggleDisplay, onNavigate }) => {
  if (type === 'simple') {
    return (
      <li>
        <button
          key={item.href}
          onClick={() => onNavigate(item.href)}
          className="flex py-2 text-sm font-bold text-slate-800 dark:-text--clr-neutral-100">
            {item.label}  
          </button>
      </li>
    );
  }

  if (type === 'products') {
    return (
      <li className="my-1">
        <span
          onClick={() => toggleDisplay('ourProductsSubMenu')}
          className="flex py-2 text-sm font-bold text-slate-800 dark:-text--clr-neutral-100"
        >
          <ArrowIcon direction="right" />
          Our Products
        </span>
        <ul id="ourProductsSubMenu" className="hidden flex-col">
          {item.map((element, index) =>
            element.type === 'billshill' ? (
              <BillShillLink
                key={element.menu}
                href={'/'}
                text={element.menu}
                className="py-2 pl-8 w-full font-semibold text-sm text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600 flex items-center justify-between"
              />
            ) : (
              <button
                key={element.menu}
                onClick={() => onNavigate(element.url)}
                className="py-2 pl-8 w-full font-semibold text-sm text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600 flex items-center justify-between"
              >
                <span>{element.menu}</span>
                {element.upcoming && (
                  <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">
                    UPCOMING
                  </span>
                )}
              </button>
            ),
          )}
        </ul>
      </li>
    );
  }

  return (
    <li>
      <span
        onClick={() => toggleDisplay(item.id)}
        className="flex py-2 text-sm font-bold text-slate-800 dark:-text--clr-neutral-100"
      >
        <ArrowIcon direction="right" />
        {item.title}
      </span>
      <ul id={item.id} className="hidden flex-col">
        {item.items.map((element) => (
          <li
            onClick={() => toggleDisplay(element.menu)}
            key={element.menu}
            className="py-2 pl-5 w-full font-semibold text-sm text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600"
          >
            <span className="flex">
              <ArrowIcon direction="right" />
              {element.menu}
            </span>
            <ul id={element.menu} className="hidden flex-col my-1">
              {element.subMenu.map((subElement) => (
                <button
                  key={subElement.menu}
                  onClick={() => onNavigate(subElement.url)}
                  className="py-2 pl-8 w-full font-semibold text-sm text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>{subElement.menu}</span>
                  {subElement.upcoming && (
                    <span className="text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">
                      UPCOMING
                    </span>
                  )}
                </button>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
};

// Helper function for toggling display
const toggleDisplay = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.classList.contains('hidden')
      ? element.classList.replace('hidden', 'flex')
      : element.classList.replace('flex', 'hidden');
  }
};

export default function Navbar({ className = '' }) {
  const { token, currentUser } = useAuth();
  const [hamburger, setHamburger] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [state] = useContext(StoreContext);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = useCallback(
    (path) => {
      setIsNavigating(true);
      router.push(path);
    },
    [router],
  );

  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const fetchCartData = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);

      const [serviceResponse, startupResponse] = await Promise.all([
        userbackAxios.get('/cart/'),
        userbackAxios.get('/cartStartup/'),
      ]);

      const serviceCount = serviceResponse.data?.services?.length || 0;
      const startupCount = startupResponse.data?.itemCount || 0;
      const totalCount = serviceCount + startupCount;

      setCartCount(totalCount);

      console.log('Service items:', serviceCount);
      console.log('Startup items:', startupCount);
      console.log('Total cart items:', totalCount);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData, state.cartUpdateCount]);

  const handleMobileMenuClick = useCallback(() => {
    setHamburger(false);
  }, []);

  const mobileMenuItems = useMemo(
    () => [
      { type: 'products', item: MENUS.ourProducts },
      {
        type: 'dropdown',
        item: {
          id: 'ourServicesMenu',
          title: 'Easy Services',
          items: MENUS.ourServices,
        },
      },
      {
        type: 'dropdown',
        item: {
          id: 'financialCalculatorMenu',
          title: 'Financial Calculators',
          items: MENUS.financialCalculator,
        },
      },
      ...NAV_LINKS.map((link) => ({ type: 'simple', item: link })),
    ],
    [],
  );

  return (
    <div
      className={`sticky top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 transition-[padding] duration-200 ${className}`}
    >
      {isNavigating && (
        <div className="fixed inset-0 bg-white/60 flex justify-center items-center z-50">
          <div className="flex h-[70vh] justify-center items-center">
            <Loader />
          </div>
        </div>
      )}
      <nav className="max-w-7xl m-auto text-xs sticky top-0 min-h-10 z-50 py-1 px-5 flex items-center flex-wrap">
        {/* Logo */}
        <div>
          <Link
            href="/"
            className="flex flex-shrink-0 justify-between items-center mx-auto"
          >
            <Image
              width={56}
              height={56}
              src="/logo.svg"
              alt="logo"
              className="object-contain w-14"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="h-12 ml-auto hidden lg:flex items-center justify-between font-bold text-xs">
          <DropdownMenu title="Our Products" items={MENUS.ourProducts} onNavigate={handleNavigation}/>
          <DropdownMenu
            title="Easy Services"
            items={MENUS.ourServices}
            hasSubMenu onNavigate={handleNavigation}
          />
          <DropdownMenu
            title="Financial Calculators"
            items={MENUS.financialCalculator}
            hasSubMenu onNavigate={handleNavigation}
          />

          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              onClick={() => handleNavigation(link.href)}
              className="mx-2 cursor-pointer text-slate-700 dark:-text--clr-neutral-100 hover:text-blue-600"
            >
              {link.label}
            </li>
          ))}
        </ul>

        {/* User Actions */}
        <div className="flex ml-auto">
          {token && currentUser ? (
            <div className="flex mx-3 md:mx-0">
              <StyledLink
                href="/cart"
                className="flex justify-center items-center bg-primary w-[45px] h-[45px] mx-3 text-white rounded-full font-semibold"
              >
                <Itag>{cartCount}</Itag>
                <MdOutlineLocalGroceryStore size={24} />
                <sup className="absolute top-2.5 right-2">{cartCount}</sup>
              </StyledLink>
              <UserInfo />
            </div>
          ) : (
            // <Link href="/login" className="btn-primary">
            //   Login
            // </Link>
            <button onClick={() => handleNavigation('/login')} className="btn-primary">
              Login
            </button>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="lg:hidden w-8 h-8"
          onClick={() => setHamburger(!hamburger)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </nav>

      {/* Mobile Menu */}
      {hamburger && (
        <div className="lg:hidden fixed top-15 left-0 w-full bg-black/50 min-h-screen h-full z-40 overflow-y-scroll">
          <ul className="flex flex-col w-full bg-white dark:-bg--clr-neutral-900 shadow-md rounded-b-2xl px-5 pt-2 pb-5 mb-40">
            {mobileMenuItems.map((menuItem, index) => (
              <MobileMenuItem
                key={index}
                {...menuItem}
                onLinkClick={handleMobileMenuClick}
                toggleDisplay={toggleDisplay}
                onNavigate={handleNavigation}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
