'use client';
import { Icon } from '@iconify/react';
import GridItem from '@/components/pagesComponents/grid/GridItem';
import { useState, useEffect } from 'react';
import userbackAxios from '@/lib/userbackAxios';

const initialDashBoardData = [
  {
    upcoming: true,
    title: 'Users',
    overview: '0',
    time: '10% + since yesterday ',
    linkTo: 'all-users',
    iconName: 'material-symbols:account-circle-outline',
    cssClass:
      'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-green-100 dark:bg-green-500',
  },
  {
    upcoming: false,
    title: 'Admin',
    overview: '0',
    time: '1% + since yesterday ',
    linkTo: 'all-admin',
    iconName: 'entypo:user',
    cssClass:
      'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
  },
  // {
  //   upcoming: false,
  //   title: "File ITR",
  //   overview: "2503",
  //   time: "10% + since yesterday ",
  //   linkTo: "applications",
  //   iconName: "pepicons-print:file",
  //   cssClass:
  //     "p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500",
  // },
  // {
  //   upcoming: false,
  //   title: "Fill GSTR",
  //   overview: "2503",
  //   time: "10% + since yesterday ",
  //   linkTo: "applications",
  //   iconName: "bytesize:file",
  //   cssClass:
  //     "p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500",
  // },
  // {
  //   upcoming: true,
  //   title: "Insurance",
  //   overview: "2503",
  //   time: "10% + since yesterday ",
  //   linkTo: "insureance",
  //   iconName: "streamline:insurance-hand-solid",
  //   cssClass:
  //     "p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500",
  // },
  // {
  //   upcoming: false,
  //   title: "Accounts",
  //   overview: "2503",
  //   time: "10% + since yesterday ",
  //   linkTo: "applications",
  //   iconName: "material-symbols:account-balance",
  //   cssClass:
  //     "p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500",
  // },
  {
    upcoming: false,
    title: 'Invoice',
    overview: '2503',
    time: '10% + since yesterday ',
    linkTo: 'accounts/invoice',
    iconName: 'mdi:invoice-add',
    cssClass:
      'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
  },
  // {
  //   upcoming: false,
  //   title: "Finance",
  //   overview: "2503",
  //   time: "10% + since yesterday ",
  //   linkTo: "applications",
  //   iconName: "mdi:finance",
  //   cssClass:
  //     "p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500",
  // },
  {
    upcoming: false,
    title: 'Transactions',
    overview: '2503',
    time: '10% + since yesterday ',
    linkTo: 'transactions',
    iconName: 'bitcoin-icons:transactions-filled',
    cssClass:
      'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
  },
  // {
  //   upcoming: false,
  //   title: "Report",
  //   overview: "2503",
  //   time: "10% + since yesterday ",
  //   linkTo: "applications",
  //   iconName: "tabler:report",
  //   cssClass:
  //     "p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500",
  // },
  // {
  //   upcoming: false,
  //   title: "Bill Payment",
  //   overview: "2503",
  //   time: "10% + since yesterday ",
  //   linkTo: "applications",
  //   iconName: "streamline:payment-cash-out-3",
  //   cssClass:
  //     "p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500",
  // },
];

export default function CardOverview(props) {
  const { className, setIsNavigating } = props;
  const [dashboardData, setDashboardData] = useState(initialDashBoardData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResp, adminResp, transactionResp, invoiceResp] =
          await Promise.all([
            userbackAxios.get('/user/get-all-users'),
            userbackAxios.get('/user/get-all-admins'),
            userbackAxios.get('/apis/get-all-subscriptions'),
            userbackAxios.get('/invoice/invoices'),
          ]);

        console.log(`invoice is`, invoiceResp);
        const totalUsers = userResp.data.data.totalusers;
        const totalAdmins = adminResp.data.data.length;
        const totalTransactions = transactionResp.data.subscriptions.length;
        const totalInvoice = invoiceResp.data.invoices.length;

        setDashboardData((prev) =>
          prev.map((item) => {
            if (item.title === 'Users') {
              return { ...item, overview: totalUsers.toString() };
            } else if (item.title === 'Admin') {
              return { ...item, overview: totalAdmins.toString() };
            } else if (item.title === 'Transactions') {
              return { ...item, overview: totalTransactions.toString() };
            } else if (item.title === 'Invoice') {
              return { ...item, overview: totalInvoice.toString() };
            }
            return item;
          }),
        );
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${className} mx-auto mt-2 p-4 `}>
      <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))]">
        {' '}
        {/* 280px */}
        {dashboardData.map((el, key) => (
          <div
            key={key}
            onClick={() => {
              setIsNavigating?.(true);
              window.location.href = `/dashboard/${el.linkTo}`;
            }}
            className="cursor-pointer"
          >
            <GridItem href="#" /* use dummy href if GridItem requires it */>
              <div>
                <Icon
                  icon={el.iconName}
                  className={` rounded-xl sm:h-16 sm:w-16 sm:p-3 h-14 w-14 p-3 ${el.cssClass}`}
                />
              </div>
              <div className="w-full">
                <div className="flex flex-wrap justify-between">
                  <span>{el.title}</span>
                  <span>{el.overview}</span>
                </div>
              </div>
            </GridItem>
          </div>
        ))}
      </ul>
    </div>
  );
}
