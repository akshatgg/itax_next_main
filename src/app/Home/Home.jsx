'use client';
import Chatbot from '@/components/chatbot/index.jsx';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { _ } from 'ag-grid-community';
import Marquee from 'react-fast-marquee';
import Card from '../styles/cardStyles';
import { HoveringNavCard } from '@/app/styles/navcardStyle';
import Link from 'next/link';
import Image from 'next/image';
import OngoingProjects from './OngoingProjects';
import { FaHome, FaInfoCircle, FaCogs, FaPhone } from 'react-icons/fa';
import { BACKEND_URL, token, c } from './staticData';
import Hero from './Hero';
import OurServices from './OurServices';
import { Icon } from '@iconify/react';
import userbackAxios from '@/lib/userbackAxios';

function Home() {
  const [pageData, setPageData] = useState();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState({});
  const [visitors, setVisitors] = useState(0);
  const refs = useRef({});
  const cardRefs = useRef({});
  const containerRef = useRef();
  const currentRef = useRef();
  const activeNav = useRef(null);

  const handleScroll = () => {
    const y = window.scrollY;

    Object.entries(cardRefs.current).forEach(([name, card]) => {
      const navEl = refs.current[name];

      if (
        y >= containerRef.current?.offsetTop + card?.offsetTop &&
        currentRef.current !== navEl
      ) {
        navEl.classList.add('border-primary');
        currentRef.current?.classList.remove('border-primary');

        currentRef.current = navEl;
      }
    });
  };

  const checkImageLink = (url) => {
    if (url && typeof url === 'string' && url.includes('/')) {
      return url;
    } else {
      return '/images/home/ongoing_projects/upcoming.avif';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    try {
      setLoading(true);
      const asynFunction = async () => {
        const homeResponse = await userbackAxios.get(`${BACKEND_URL}/cms/homescreen`);
        if (homeResponse.data.success) {
          const data = homeResponse.data.data.home;
          setPageData(data);
          if (data && data.navcards) {
            setSections(data.navcards.map((element) => element.name));
          }
        }
        setLoading(false);
      };
      const countVisitors = async () => {
        const res = await fetch(`${BACKEND_URL}/visitorCount/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (res.ok) {
          const data = await res.json();
          setVisitors(data.count);
        }
      };
      countVisitors();
      asynFunction();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getCmsStats = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/cms/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data && data?.data) {
          setAllUsers(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCmsStats();
  }, []);

  // Icon mapping (based on your pageData keys)
  const iconMap = {
    Home: <FaHome className="text-blue-700 text-2xl" />,
    About: <FaInfoCircle className="text-blue-700 text-2xl" />,
    Services: <FaCogs className="text-blue-700 text-2xl" />,
    Contact: <FaPhone className="text-blue-700 text-2xl" />,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      {loading ? (
        <div className="fixed h-screen w-screen bg-white flex items-center justify-center">
          <Image
            loading="eager"
            width={100}
            height={100}
            src="/loading.svg"
            alt="loading..."
            style={{ width: '100px' }}
          />
        </div>
      ) : (
        <div className="max-w-screen-2xl p-5 mx-auto">
          <Hero pageData={pageData} />

          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <OurServices ourServicesCards={pageData?.cards || []} />

          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <div className="max-w-7xl lg:px-12 mx-auto" ref={containerRef}>
            <div id="servicesNav">
              {/* <ul
                className="my-12 px-3 py-3 text-sm mx-auto gap-2 flex flex-row overflow-hidden border md:rounded-lg shadow-sm rounded-md "
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                }}
              >
                {pageData.navcards
                  ? pageData.navcards.map((element) => {
                      return (
                        <>
                          {element.name && (
                            <HoveringNavCard
                              ref={(el) => (refs.current[element.name] = el)}
                              key={element.name}
                              id={'nav' + element.name}
                              onClick={() => {
                                const scrollDiv = document.getElementById(
                                  element.name,
                                );
                                scrollDiv.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center',
                                  inline: 'center',
                                });
                                activeNav.current = scrollDiv;
                              }}
                              className="flex   text-slate-900 items-center justify-center w-4/6 font-semibold text-center cursor-pointer transition-transform-all transform transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:shadow-md rounded-full"
                            >
                              {element.name}
                            </HoveringNavCard>
                          )}
                        </>
                      );
                    })
                  : null}
              </ul> */}

              <ul className="my-10 mx-auto py-6 flex flex-wrap justify-between px-10 gap-6 bg-white shadow-sm border border-gray-200 rounded-lg">
                {pageData.navcards
                  ? pageData.navcards.map((element) => (
                      <li
                        ref={(el) => (refs.current[element.name] = el)}
                        key={element.name}
                        id={'nav' + element.name}
                        onClick={() => {
                          const scrollDiv = document.getElementById(
                            element.name,
                          );
                          scrollDiv.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'center',
                          });
                          activeNav.current = scrollDiv;
                        }}
                        className="relative flex flex-col text-xs w-36 items-center justify-center px-6 py-2 font-medium text-center bg-gray-50 rounded-lg cursor-pointer hover:shadow-lg hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                      >
                        {/* Icon */}
                        <div className=" absolute top-[-20%] ">
                          {iconMap[element.name] || (
                            <FaInfoCircle className="text-blue-700 text-2xl" />
                          )}
                        </div>
                        {/* Title */}
                        <span className="relative z-10 text-gray-800 py-2">
                          {element.name}
                        </span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div id="servicesSection" className="max-w-6xl mx-auto relative">
              {pageData.navcards
                ? pageData.navcards.map((element) => {
                    return (
                      <>
                        {element.name && element.link && (
                          <div
                            ref={(el) => (cardRefs.current[element.name] = el)}
                            key={element.name}
                            className="relative"
                            id={element.name}
                          >
                            <h4 className="text-slate-800 text-lg lg:text-[32px] font-semibold text-center flex-wrap my-8">
                              {element.name}
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10">
                              {/* {element.cards.map((items) => (
                                <>
                                  {items.heading && items.content && (
                                    <li
                                      key={items.heading}
                                      className="flex flex-col justify-between h-52 hover:translate-y-1 transition-all max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden border w-full"
                                    >
                                      <div className="flex items-center px-5 text-sm  py-2 bg-primary text-white font-semibold rounded-t-lg">
                                        <span className="pl-2">
                                          {items.heading}
                                        </span>
                                      </div>
                                      <p className=" max-h-[100px] overflow-hidden line-clamp-4 text-xs px-5 font-medium text-justify">
                                        <p className="bg-blue-100 rounded-full w-10 p-2 text-center mb-2 mt-2 ">
                                          <Icon
                                            icon="carbon:document"
                                            width={20}
                                            className="ml-1 "
                                          />
                                        </p>
                                        {items.content}
                                      </p>
                                      <div className="flex justify-end bg-zinc-100 px-5 gap-5 items-center">
                                        <Link
                                          href={element.link || ''}
                                          target="_blank"
                                          className=" py-5 text-xs link hover:text-primary"
                                        >
                                          <p className="flex flex-row items-center gap-1">
                                            Continue{' '}
                                            <Icon icon="tabler:arrow-right" />
                                          </p>
                                        </Link>
                                        <Link
                                          href={element.readMoreLink || ''}
                                          className="py-2 link hover:text-primary"
                                        >
                                          Read More..
                                        </Link>
                                      </div>
                                    </li>
                                  )}
                                </>
                              ))} */}

                              {element.cards.map((items) => (
                                <>
                                  {items.heading && items.content && (
                                    <li
                                      key={items.heading}
                                      className="flex flex-col justify-between h-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 max-w-sm mx-auto"
                                    >
                                      {/* Card Header */}
                                      <div className="flex items-center px-5 py-3  text-black border-b font-semibold rounded-t-xl">
                                        <span className="text-sm">
                                          {items.heading}
                                        </span>
                                      </div>

                                      {/* Card Content */}
                                      <div className="p-5 flex flex-col items-center text-center">
                                        {/* Icon Badge */}
                                        <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                          <Icon
                                            icon="carbon:document"
                                            width={24}
                                            className="text-blue-700"
                                          />
                                        </div>
                                        {/* Content Text */}
                                        <p className="text-xs py-6 text-gray-600 font-medium line-clamp-4">
                                          {items.content}
                                        </p>
                                      </div>

                                      {/* Card Footer */}
                                      <div className="flex justify-between items-center bg-gray-50 px-5 py-4 border-t border-gray-200">
                                        <Link
                                          href={element.link || ''}
                                          target="_blank"
                                          className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                                        >
                                          Continue
                                          <Icon
                                            icon="tabler:arrow-right"
                                            width={16}
                                          />
                                        </Link>
                                        <Link
                                          href={element.readMoreLink || ''}
                                          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                                        >
                                          Read More..
                                        </Link>
                                      </div>
                                    </li>
                                  )}
                                </>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <div className="max-w-7xl lg:px-8 mx-auto flex md:flex-row flex-col justify-between items-center overflow-hidden">
            <div className="sm:w-1/2 order-2 md:order-1 flex flex-col items-center justify-center">
              <h4 className="font-black text-xl md:text-2xl text-slate-600">
                Choose your right policy
              </h4>
              <h4 className="font-black text-sm md:text-3xl lg:text-justify text-slate-800 leading-snug pt-4 ">
                Protecting your future,
                <br /> One policy at a time.
              </h4>
              <div className="mt-4">
                <Link
                  href="/dashboard/easy-investment/insurance"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="sm:w-1/2 order-1 md:order-2 overflow-hidden relative">
              <div className="w-[50vw] h-[50vw] absolute rotate-[45deg] top-[-50%] -z-10  bg-blue-700"></div>

              <Image
                src="https://img.freepik.com/free-vector/father-shaking-hands-with-insurance-agent_74855-4412.jpg"
                alt="logo"
                width={400}
                height={250}
                className="mx-auto"
              />
            </div>
          </div>

          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <div className="mx-auto max-w-6xl flex md:flex-row flex-col items-center overflow-hidden py-16 px-6  ">
            <motion.div
              className="md:mr-auto relative overflow-hidden"
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 60, duration: 1 }}
            >
              {/* Decorative Gradient Shapes */}
              <motion.div
                className="absolute -top-12 -left-16 w-[35vw] h-[35vw] lg:w-[25vw] lg:h-[25vw] bg-gradient-to-r from-blue-500 to-blue-700 opacity-80 rounded-full mix-blend-multiply z-[-1]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-12 -right-16 w-[25vw] h-[25vw] lg:w-[20vw] lg:h-[20vw]  bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 rounded-full mix-blend-multiply z-[-1]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50, duration: 1 }}
              >
                <Image
                  src="/images/home/phoneApp.jpg"
                  alt="ItaxEasy App"
                  width={500}
                  height={300}
                  className="rounded-xl shadow-xl"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="mx-5 md:mx-0 mt-10 md:mt-0 text-center md:text-left md:ml-auto max-w-lg"
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50, duration: 1 }}
            >
              <motion.h4
                className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                File Your ITR
              </motion.h4>
              <motion.h4
                className="text-4xl md:text-5xl font-extrabold text-blue-600 leading-tight pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                In Just One Go!
              </motion.h4>
              <motion.p
                className="text-lg md:text-xl font-medium text-slate-700 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Download the{' '}
                <span className="font-bold text-blue-600">ItaxEasy App</span>{' '}
                for a seamless and hassle-free tax experience.
              </motion.p>

              <motion.a
                href="#"
                className="mt-8 inline-flex items-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Image
                  src="/icons/home/google-play-badge.png"
                  alt="Google Play Badge"
                  width={150}
                  height={50}
                  className="mr-4"
                />
                Download Now
              </motion.a>
            </motion.div>
          </div>

          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <div className="max-w-7xl lg:px-8 mx-auto sm:gap-6 grid md:grid-cols-2 place-items-center py-16 px-6 ">
            <motion.div
              className="relative overflow-hidden"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50, duration: 1 }}
            >
              <Image
                width={500}
                height={500}
                className="rounded-xl shadow-xl"
                src="/images/home/income-text.png"
                alt="Income tax picture"
              />
            </motion.div>

            {/* Text Content Section */}
            <motion.div
              className="grid gap-6"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50, duration: 1 }}
            >
              {/* Heading */}
              <motion.h4
                className="font-extrabold text-1xl md:text-4xl text-slate-800 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Income Tax
              </motion.h4>

              {/* Paragraph Content */}
              <motion.div
                className="font-medium mt-3 text-base md:text-lg text-justify grid gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-sm">
                  <strong className="text-gray-600">
                    Determine Your Taxable Income:
                  </strong>{' '}
                  Your taxable income encompasses the money you earn in a given
                  year from all sources. Subtract any eligible deductions or
                  exemptions to arrive at this crucial figure. Various types of
                  income fall under the taxable category, including wages,
                  salaries, and investment returns.
                </p>
                <p className="text-sm">
                  <strong className="text-gray-600">
                    Calculate Your Tax Liability:
                  </strong>{' '}
                  Armed with your taxable income, employ a tax calculator or
                  refer to a tax table to gauge the amount you owe. The precise
                  tax owed hinges on factors such as your income level and
                  filing status (single, married filing jointly, etc.).
                  Understanding these steps is pivotal in navigating the
                  intricacies of the income tax system.
                </p>
              </motion.div>

              {/* Call-to-Action Button */}
              <motion.div
                className="flex justify-center md:justify-start items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Link
                  href="/blogs"
                  className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Read More
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <OngoingProjects ongoingProjects={pageData?.ongoingPro} />

          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <div className="max-w-7xl lg:px-8 mx-auto py-16">
            {/* Section Heading */}
            <motion.h3
              className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Corporate Partners
            </motion.h3>

            {/* Marquee Section */}
            <Marquee
              gradientWidth={50}
              speed={40}
              pauseOnHover={true}
              className="mt-12"
            >
              <div className="mx-auto py-12 mb-20">
                {/* Grid Layout for Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {pageData?.corporatePro.map((element, i) => (
                    <motion.div
                      key={element.heading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col hover:shadow-lg hover:shadow-primary w-60 shadow-md rounded-xl mx-8 items-center overflow-hidden border bg-white transition-transform duration-300"
                    >
                      {/* Partner Logo */}
                      <div className="flex items-center py-6 h-full min-h-48">
                        <Image
                          width={200}
                          height={100}
                          alt="partners-logo"
                          src={checkImageLink(element.image)}
                          className="object-contain"
                        />
                      </div>
                      {/* Partner Name */}
                      <div className="bg-gray-100 w-full flex items-center px-5">
                        <span className="font-semibold text-sm mx-auto text-center py-3 text-gray-800">
                          {element.heading}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Marquee>
          </div>

          <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />

          <div className="max-w-7xl lg:px-8 mx-auto py-16">
      {/* Heading */}
      <motion.h3
        className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        User Insights
      </motion.h3>

      {/* Cards */}
      <div className="flex flex-wrap gap-10 my-16 mx-auto justify-center sm:justify-between">
        {/* Card 1 */}
        <motion.div
          className="w-64 h-44 shadow-lg rounded-lg p-5 flex flex-col items-center justify-center bg-white border transition-shadow duration-300"
          style={{ borderTop: "4px solid rgb(0, 85, 212)" }}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <h4 className="text-3xl font-extrabold text-slate-800">{`${visitors || 0}+`}</h4>
          <p className="mt-2 text-center text-base font-medium text-gray-700">
            Total Visitors
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="w-64 h-44 shadow-lg rounded-lg p-5 flex flex-col items-center justify-center bg-white border transition-shadow duration-300"
          style={{ borderTop: "4px solid rgb(0, 85, 212)" }}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <h4 className="text-3xl font-extrabold text-slate-800">{`${allUsers.totalUsers || 0}+`}</h4>
          <p className="mt-2 text-center text-base font-medium text-gray-700">
            Total Active Users
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="w-64 h-44 shadow-lg rounded-lg p-5 flex flex-col items-center justify-center bg-white border transition-shadow duration-300"
          style={{ borderTop: "4px solid rgb(0, 85, 212)" }}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <h4 className="text-3xl font-extrabold text-slate-800">{`${allUsers.totalPhoneNumbers || 0}+`}</h4>
          <p className="mt-2 text-center text-base font-medium text-gray-700">
            Total Phone Contacts
          </p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className="w-64 h-44 shadow-lg rounded-lg p-5 flex flex-col items-center justify-center bg-white border transition-shadow duration-300"
          style={{ borderTop: "4px solid rgb(0, 85, 212)" }}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <h4 className="text-3xl font-extrabold text-slate-800">{`${allUsers.totalEmails || 0}+`}</h4>
          <p className="mt-2 text-center text-base font-medium text-gray-700">
            Total Mailing Addresses
          </p>
        </motion.div>
      </div>
    </div>
    <Chatbot />
        </div>
      )}
    </>
  );
}

export default Home;
