'use client';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Icon } from '@iconify/react';

// Components
import Chatbot from '@/components/chatbot/index.jsx';
import Hero from './Hero';
import OurServices from './OurServices';
import OngoingProjects from './OngoingProjects';
import { HoveringNavCard } from '@/app/styles/navcardStyle';
import Card from '../styles/cardStyles';

// Config
import { BACKEND_URL, token } from './staticData';
import userbackAxios from '@/lib/userbackAxios';

// Constants
const SCROLL_OFFSET = 100;
const DEFAULT_IMAGE = '/images/home/ongoing_projects/upcoming.avif';

const SectionDivider = () => (
  <div className="w-20 mx-auto h-0 border-t-[6px] border-primary border-dotted my-20" />
);

function Home() {
  // State
  const [pageData, setPageData] = useState({
    navcards: [],
    cards: [],
    ongoingPro: [],
    corporatePro: []
  });
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState({
    totalUsers: 0,
    totalPhoneNumbers: 0,
    totalEmails: 0
  });
  const [visitors, setVisitors] = useState(0);
  const [error, setError] = useState(null);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  // Refs
  const refs = useRef({});
  const cardRefs = useRef({});
  const containerRef = useRef();
  const currentRef = useRef();
  const activeNav = useRef(null);

  // Image validation helper
  const checkImageLink = useCallback((url) => {
    if (url && typeof url === 'string' && url.includes('/')) {
      return url;
    }
    return DEFAULT_IMAGE;
  }, []);

  // Derived data
  const sections = useMemo(() => {
    return pageData.navcards?.map(element => element.name) || [];
  }, [pageData.navcards]);

  // Handlers
  const handleScroll = useCallback(() => {
    const y = window.scrollY;

    // Toggle scroll to top button visibility
    setIsScrollButtonVisible(y > 300);

    // Handle navigation highlighting
    Object.entries(cardRefs.current).forEach(([name, card]) => {
      if (!card) return;
      
      const navEl = refs.current[name];
      if (!navEl) return;

      if (
        y >= (containerRef.current?.offsetTop || 0) + card.offsetTop - SCROLL_OFFSET &&
        currentRef.current !== navEl
      ) {
        navEl.classList.add('border-primary');
        currentRef.current?.classList.remove('border-primary');
        currentRef.current = navEl;
      }
    });
  }, []);

  const scrollToSection = useCallback((sectionName) => {
    const scrollDiv = document.getElementById(sectionName);
    if (scrollDiv) {
      scrollDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
      activeNav.current = scrollDiv;
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Data fetching
  const fetchPageData = useCallback(async () => {
    try {
      setLoading(true);
      const homeResponse = await userbackAxios.get(`${BACKEND_URL}/cms/homescreen`);
      if (homeResponse.data.success) {
        setPageData(homeResponse.data.data.home || {});
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error fetching home data:', err);
    }
  }, []);

  const fetchVisitorCount = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/visitorCount/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        const data = await res.json();
        setVisitors(data.count || 0);
      }
    } catch (err) {
      console.error('Error fetching visitor count:', err);
    }
  }, []);

  const fetchCmsStats = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/cms/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data?.data) {
        setAllUsers(data.data);
      }
    } catch (err) {
      console.error('Error fetching CMS stats:', err);
    }
  }, []);

  // Effects
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    Promise.all([
      fetchPageData(),
      fetchVisitorCount(),
      fetchCmsStats()
    ]);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPageData, fetchVisitorCount, fetchCmsStats, handleScroll]);

  // Loading state
  if (loading) {
    return (
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
    );
  }

  return (
    <>
      <Head>
        <title>ITax Easy - Home</title>
        <meta name="description" content="File your ITR easily with ITax Easy" />
        <meta name="keywords" content="tax, ITR, filing, income tax" />
      </Head>
      
      <div className="max-w-screen-2xl p-5 mx-auto">
        <Hero pageData={pageData} />

        <SectionDivider />

        <OurServices ourServicesCards={pageData?.cards || []} />

        <SectionDivider />

        {/* Navigation Section */}
        <div className="max-w-7xl lg:px-12 mx-auto" ref={containerRef}>
          {pageData.navcards && pageData.navcards.length > 0 && (
            <div id="servicesNav">
              <ul className="my-12 px-3 py-3 text-sm mx-auto gap-2 flex flex-row overflow-hidden border md:rounded-lg shadow-sm rounded-md">
                {pageData.navcards.map((element) => (
                  element.name && (
                    <HoveringNavCard
                      ref={(el) => (refs.current[element.name] = el)}
                      key={element.name}
                      id={'nav' + element.name}
                      onClick={() => scrollToSection(element.name)}
                      className="flex text-slate-900 items-center justify-center w-4/6 font-semibold text-center cursor-pointer transition-transform-all transform transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:shadow-md rounded-full"
                    >
                      {element.name}
                    </HoveringNavCard>
                  )
                ))}
              </ul>
            </div>
          )}

          {/* Cards Section */}
          <div id="servicesSection" className="max-w-6xl mx-auto relative">
            {pageData.navcards?.map((element) => (
              element.name && element.link && (
                <div
                  ref={(el) => (cardRefs.current[element.name] = el)}
                  key={element.name}
                  className="relative"
                  id={element.name}
                >
                  <h4 className="text-slate-800 text-lg lg:text-[32px] font-semibold text-center flex-wrap my-8">
                    {element.name}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {element.cards?.map((item) => (
                      item.heading && item.content && (
                        <li
                          key={item.heading}
                          className="flex flex-col justify-between h-52 hover:translate-y-1 transition-all max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden border w-full"
                        >
                          <div className="flex items-center px-5 text-sm py-2 bg-primary text-white font-semibold rounded-t-lg">
                            <span className="pl-2">{item.heading}</span>
                          </div>
                          <p className="max-h-[100px] overflow-hidden line-clamp-4 text-xs px-5 font-medium text-justify">
                            <span className="bg-blue-100 rounded-full w-10 p-2 text-center inline-block mb-2 mt-2">
                              <Icon icon="carbon:document" width={20} className="ml-1" />
                            </span>
                            {item.content}
                          </p>
                          <div className="flex justify-end bg-zinc-100 px-5 gap-5 items-center">
                            <Link
                              href={element.link || ''}
                              target="_blank"
                              className="py-5 text-xs link hover:text-primary"
                            >
                              <p className="flex flex-row items-center gap-1">
                                Continue <Icon icon="tabler:arrow-right" />
                              </p>
                            </Link>
                          </div>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </div>

        <SectionDivider />

        {/* Insurance Section */}
        <div className="max-w-7xl lg:px-8 mx-auto flex md:flex-row flex-col justify-between items-center overflow-hidden">
          <div className="sm:w-1/2 order-2 md:order-1 flex flex-col items-center justify-center">
            <h4 className="font-black text-sm md:text-2xl text-slate-600">
              Choose your right policy
            </h4>
            <h4 className="font-black text-xl md:text-3xl lg:text-justify text-slate-800 leading-snug pt-4">
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
          <div className="sm:w-1/2 order-1 md:order-2">
            <Image
              src="https://img.freepik.com/free-vector/father-shaking-hands-with-insurance-agent_74855-4412.jpg"
              alt="insurance"
              width={400}
              height={250}
              className="mx-auto"
            />
          </div>
        </div>

        <SectionDivider />

        {/* App Promotion Section */}
        <div className="mx-auto max-w-4xl flex md:flex-row flex-col items-center overflow-hidden">
          <div className="md:mr-auto">
            <Image
              src="/images/home/phoneApp.jpg"
              alt="mobile app"
              width={350}
              height={200}
            />
          </div>
          <div className="mx-5 md:mx-0 mt-8 md:mt-0 text-center md:text-left md:ml-auto">
            <h4 className="font-black text-2xl md:text-4xl text-slate-800 leading-snug text-center">
              Visit here
            </h4>
            <h4 className="font-black text-2xl md:text-4xl text-slate-800 leading-snug text-center pt-4">
              File Your ITR In One Go
            </h4>
            <p className="font-semibold text-slate-900 mt-3 text-sm md:text-base text-center">
              Download ItaxEasy App For Better Tax Experience
            </p>
            <a href="#" className="mt-2 flex items-center flex-col">
              <Image
                src="/icons/home/google-play-badge.png"
                alt="google-play-badge"
                width={130}
                height={40}
              />
              <p className="font-semibold text-slate-900 mt-3 text-sm md:text-base text-center">
                Being Serviced
              </p>
            </a>
          </div>
        </div>

        <SectionDivider />

        {/* Income Tax Section */}
        <div className="max-w-7xl lg:px-8 mx-auto sm:gap-6 grid md:grid-cols-2 place-items-center">
          <Image
            width={500}
            className="rounded-lg"
            src="/images/home/income-text.png"
            height={500}
            alt="Income tax picture"
          />

          <div className="grid gap-4">
            <h4 className="font-black text-2xl md:text-4xl text-slate-800 leading-snug">
              Income Tax
            </h4>
            <div className="font-medium mt-3 text-sm md:text-base text-justify grid grid-cols-1 gap-4">
              <p>
                <strong className="text-gray-600">
                  Determine Your Taxable Income:
                </strong>{' '}
                Your taxable income encompasses the money you earn in a given
                year from all sources. Subtract any eligible deductions or
                exemptions to arrive at this crucial figure. Various types of
                income fall under the taxable category, including wages,
                salaries, and investment returns.
              </p>
              <p>
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
            </div>

            <div className="flex justify-center items-center">
              <Link href="/blogs" className="btn-primary">
                Read more
              </Link>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Projects Section */}
        <OngoingProjects ongoingProjects={pageData?.ongoingPro} />

        <SectionDivider />

        {/* Corporate Partners Section */}
        <div className="max-w-7xl lg:px-8 mx-auto">
          <h3 className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold">
            Corporate Partners
          </h3>
          <div className="mx-auto py-12 mb-20 overflow-x-auto">
            <div className="flex gap-8 mt-8 min-w-max px-4 animate-marquee">
              {pageData?.corporatePro?.map((element) => (
                <div
                  key={element.heading}
                  className="flex flex-col hover:shadow-lg hover:shadow-primary w-60 shadow-md rounded-lg items-center overflow-hidden border"
                >
                  <div className="flex items-center justify-center py-5 h-48 w-full">
                    <Image
                      width={200}
                      height={100}
                      alt="partners-logo"
                      src={checkImageLink(element.image)}
                    />
                  </div>
                  <div className="bg-zinc-100 w-full flex items-center px-5">
                    <span className="font-semibold text-sm mx-auto text-center py-3">
                      {element.heading}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* User Stats Section */}
        <div className="max-w-7xl lg:px-8 mx-auto">
          <h3 className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold">
            User Insights
          </h3>
          <div className="flex flex-wrap gap-10 my-16 mx-auto justify-center sm:justify-between">
            <Card text={`${visitors || 0}+`} color="rgb(0, 85, 212)">
              Total Visitors
            </Card>
            <Card
              text={`${allUsers.totalUsers || 0}+`}
              color="rgb(0, 85, 212)"
            >
              Total Active User
            </Card>
            <Card
              text={`${allUsers.totalPhoneNumbers || 0}+`}
              color="rgb(0, 85, 212)"
            >
              Total Phone Contacts
            </Card>
            <Card
              text={`${allUsers.totalEmails || 0}+`}
              color="rgb(0, 85, 212)"
            >
              Total Mailing Addresses
            </Card>
          </div>
        </div>

        {/* Chatbot */}
        <Chatbot />

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg border border-red-200 my-4">
            Something went wrong: {error}
          </div>
        )}

        {/* Scroll To Top Button */}
        {isScrollButtonVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 bg-primary text-white p-3 rounded-full shadow-lg transition-all hover:bg-primary-dark"
            aria-label="Scroll to top"
          >
            <Icon icon="mdi:arrow-up" />
          </button>
        )}
      </div>
    </>
  );
}

// CSS for Custom Marquee Animation
const styles = {
  '@keyframes marquee': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' }
  },
  '.animate-marquee': {
    animation: 'marquee 30s linear infinite',
    '&:hover': {
      animationPlayState: 'paused'
    }
  }
};

export default Home;