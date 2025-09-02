// 'use client';

// import DashSection from '@/components/pagesComponents/pageLayout/DashSection';

// function OverviewDashboard({ invoiceOverview }) {
//   return (
//     <DashSection
//       className="mt-4"
//       title={'Overview'}
//       titleRight={new Date().getFullYear()}
//     >
//       <ul className="grid p-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 [&>li]:p-2 [&>li]:border-l-4">
//         <li>
//           <h2>Total Invoices</h2>
//           <p className="text-lg font-medium">
//             {invoiceOverview?.totalInvoices}
//           </p>
//         </li>
//         <li>
//           <h2>Unpaid Invoices</h2>
//           <p className="text-lg font-medium">
//             {invoiceOverview?.unpaidInvoices}{' '}
//           </p>
//         </li>
//         <li>
//           <h2>Over Due</h2>
//           <p className="text-lg font-medium">
//             {invoiceOverview?.overDue} &#8377;
//           </p>
//         </li>
//         <li>
//           <h2>Upcoming Payouts</h2>
//           <p className="text-lg font-medium">
//             {invoiceOverview?.upcomingPayouts} &#8377;
//           </p>
//         </li>
//       </ul>
//     </DashSection>
//   );
// }

// export default OverviewDashboard;


'use client';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { InputStyles } from '@/app/styles/InputStyles';

function OverviewDashboard({ invoiceOverview }) {
  const stats = [
    {
      title: 'Total Invoices',
      value: invoiceOverview?.totalInvoices,
      color: InputStyles.overviewColors.total,
    },
    {
      title: 'Unpaid Invoices',
      value: invoiceOverview?.unpaidInvoices,
      color: InputStyles.overviewColors.unpaid,
    },
    {
      title: 'Over Due',
      value: `₹${invoiceOverview?.overDue || 0}`,
      color: InputStyles.overviewColors.overdue,
    },
    {
      title: 'Upcoming Payouts',
      value: `₹${invoiceOverview?.upcomingPayouts || 0}`,
      color: InputStyles.overviewColors.upcoming,
    },
  ];
  
  return (
    <DashSection
      className="mt-2 px-4"
      title={<span className={InputStyles.sectionTitle}>Overview</span>}
      titleRight={<span className={InputStyles.sectionTitleRight}>{new Date().getFullYear()}</span>}
    >
      <ul className="grid gap-4 p-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <li
            key={idx}
            className={`${InputStyles.overviewCard} ${stat.color}`}
          >
            <h2 className={InputStyles.statTitle}>{stat.title}</h2>
            <p className={InputStyles.statValue}>{stat.value}</p>
          </li>
        ))}
      </ul>
    </DashSection>
  );
}

export default OverviewDashboard;
