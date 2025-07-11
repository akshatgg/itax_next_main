'use client';
import CardOverview from './items/CardOverview';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Loader from '@/components/partials/loading/Loader.js';
import { usePathname } from 'next/navigation';

import axios from 'axios';
import Financial_Details from './items/Financial_Details';
import userAxios from '@/lib/userAxios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const tableClassName = {
  headTH:
    'ps-2 py-3 text-left text-xs font-medium  tracking-wider  border border-slate-600 ',
};
export default function SuperAdmin_Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(4);
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const getAuthToken = async () => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
  };

  const fetchRecentTransactions = async () => {
    try {
      setIsLoading(true);
      const token = await getAuthToken();
      if (!token) throw new Error('Auth token missing');

      const response = await axios.get(
        `${BASE_URL}/apis/get-all-subscriptions?limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response;
      console.log('Fetched recent transactions:', data);

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch transactions.');
      }

      //No Records Found
      if (
        Array.isArray(data.subscriptions) &&
        data.subscriptions.length === 0
      ) {
        setTransactions([]);
        return;
      }

      if (Array.isArray(data.subscriptions)) {
        const parsed = data.subscriptions.map((txn) => ({
          transactionLabel: txn.user?.email
            ? `Payment from ${txn.user.email}`
            : 'Payment',
          dateTime: new Date(txn.createdAt).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          amount: txn.amountForServices,
          status: txn.status,
          id: txn.txnid,
        }));

        setTransactions(parsed);
      } else {
        setTransactions([]);
        setIsError(true);
      }
    } catch (err) {
      console.error('Failed to fetch recent transactions:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const resp = await userAxios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/get-all-users?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setTotalPages(resp.data.data.page);
        setUsers(resp.data.data.users);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="px-4 grid gap-8">
      {isNavigating && (
        <div className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <DashSection title={'Overview'}>
        <CardOverview setIsNavigating={setIsNavigating} className="col-span-12 xl:col-span-7" />
      </DashSection>
      <DashSection
        title={'Recent Users'}
        titleRight={
          <Link href={'/dashboard/all-users'}>
            <button className="btn-primary">View All</button>
          </Link>
        }
      >
        <div className=" mt-2 max-h-96 shadow overflow-y-auto  border-b border-gray-200 sm:rounded-lg">
          <table className=" divide-gray-200 ">
            <thead className="text-left bg-blue-500 text-neutral-50 ">
              <tr>
                <th scope="col" className={tableClassName.headTH}>
                  First Name
                </th>

                <th scope="col" className={tableClassName.headTH}>
                  Email
                </th>
                <th scope="col" className={tableClassName.headTH}>
                  Mobile No.
                </th>

                <th scope="col" className={tableClassName.headTH}>
                  Pan No.
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white divide-y divide-gray-200 ">
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={`${user?.firstName || 'empty'} ${user?.lastName || 'empty'}`}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={user?.email || 'empty'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>

                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={user?.phone || 'empty'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>

                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={user?.pan || 'empty'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length <= 0 ? (
            <div className="py-4 flex flex-col items-center gap-4 justify-center mb-2 max-w-6xl mx-auto">
              {isLoading ? (
                'loading'
              ) : isError ? (
                'error'
              ) : (
                <>
                  <div>
                    <Icon
                      className="w-40 h-24 opacity-5 mx-auto"
                      icon="ph:files-light"
                    />
                    <p className="text-center">No Record Found</p>
                  </div>
                  <Link href={'link to create user'}>
                    <button
                      type="button"
                      className="capitalize flex items-center focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  "
                    >
                      create user
                    </button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </DashSection>

      {/* <DashSection
        title={'Financial Details'}
        titleRight={'current year - 2025'}
      >
        <div className=" grid grid-cols-2">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs   bg-blue-500 text-neutral-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="border border-slate-600 text-left p-3"
                  >
                    Transaction
                  </th>
                  <th
                    scope="col"
                    className="border border-slate-600 text-left p-3"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="border border-slate-600 text-left p-3"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="border border-slate-600 text-left p-3"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <thead class="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
              <tbody>
                <tr>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Loan By Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Loan By Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      Cancelled
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Loan By Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Loan By Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      Cancelled
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Loan By Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Loan By Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      Cancelled
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Financial_Details
            title={'Loan , Payment ,Working Capital '}
            className="col-span-1"
          />
        </div>
      </DashSection> */}
      {/* <DashSection
        title={'Recent Transactions'}
        titleRight={'current year - 2025'}
      >
        <div className="p-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs border border-slate-600 bg-blue-500 text-neutral-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-3 border border-slate-600">
                    Transaction
                  </th>
                  <th scope="col" className="p-3 border border-slate-600">
                    Date & Time
                  </th>
                  <th scope="col" className="p-3 border border-slate-600">
                    Amount
                  </th>
                  <th scope="col" className="p-3 border border-slate-600">
                    Status
                  </th>
                </tr>
              </thead> */}
      {/* <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'  Payment from Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </th>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'  Payment to client'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </th>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      Cancelled
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'  Payment from Sadhguru Finance'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </th>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'Apr 23, 2023'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={'25000'}
                      class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody> */}
      {/* <tbody className='bg-white divide-y divide-gray-200'> 
              {isLoading ? (<tr>
                  <td colSpan={4} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : isError || transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-red-500">
                    No transactions found.
                  </td>
                </tr>):(
                  transactions.map((txn, index) => (
                    <tr
                      key={index}
                      className=""
                    >
                      <td className="border border-slate-600">
                        <input
                          type="text"
                          value={txn.transactionLabel}
                          readOnly
                          class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </td>
                      <td className="border border-slate-600">
                        <input
                          type="text"
                          value={txn.dateTime}
                          readOnly
                          class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </td>
                      <td className="border border-slate-600 p-2">
                        <input
                          type="text"
                          value={`₹${txn.amount}`}
                          readOnly
                          class="block w-full p-2 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </td>
                      <td className="border border-slate-600 p-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            txn.status === 'success'
                              ? 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'
                              : txn.status === 'failure'
                              ? 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}
                        >
                          {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DashSection> */}

      <DashSection
        title={'Recent Transactions'}
        titleRight={
          <Link href={'/dashboard/transactions'}>
            <button className="btn-primary">View All</button>
          </Link>
        }
      >
        <div className=" mt-2 max-h-96 shadow overflow-y-auto  border-b border-gray-200 sm:rounded-lg">
          <table className=" divide-gray-200 ">
            <thead className="text-left bg-blue-500 text-neutral-50 ">
              <tr>
                <th scope="col" className={tableClassName.headTH}>
                  Transaction
                </th>

                <th scope="col" className={tableClassName.headTH}>
                  Transaction_Id
                </th>

                <th scope="col" className={tableClassName.headTH}>
                  Date & Time
                </th>
                <th scope="col" className={tableClassName.headTH}>
                  Amount
                </th>

                <th scope="col" className={tableClassName.headTH}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white divide-y divide-gray-200 ">
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={txn.transactionLabel}
                      class="block w-full p-3 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>
                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={txn.id}
                      class="block w-full p-3 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>

                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={txn.dateTime}
                      class="block w-full p-3 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>

                  <td className="border border-slate-600">
                    <input
                      type="text"
                      id="small-input"
                      value={`₹${txn.amount}`}
                      class="block w-full p-3 text-gray-900 border border-gray-300  bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </td>

                  <td className="border border-slate-600 p-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        txn.status === 'success'
                          ? 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'
                          : txn.status === 'failure'
                            ? 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}
                    >
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length <= 0 ? (
            <div className="py-4 flex flex-col items-center gap-4 justify-center mb-2 max-w-6xl mx-auto">
              {isLoading ? (
                'loading'
              ) : isError ? (
                'error'
              ) : (
                <>
                  <div>
                    <Icon
                      className="w-40 h-24 opacity-5 mx-auto"
                      icon="ph:files-light"
                    />
                    <p className="text-center">No Record Found</p>
                  </div>
                  {/* <Link href={'link to create user'}>
                    <button
                      type="button"
                      className="capitalize flex items-center focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  "
                    >
                      create user
                    </button>
                  </Link> */}
                </>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </DashSection>
    </div>
  );
}
