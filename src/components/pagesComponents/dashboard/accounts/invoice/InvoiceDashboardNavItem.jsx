
// 'use client';
// import GridContainer from '@/components/pagesComponents/grid/GridContainer';
// import GridItem from '@/components/pagesComponents/grid/GridItem';
// import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
// import { Icon } from '@iconify/react';
// import {invoiceDashboardNavItems,EinvoiceDashboardNavItems} from './staticData';
// import { InputStyles } from '@/app/styles/InputStyles';

// function InvoiceDashboardNavItem({ navCardData, einvoice }) {
//   const navItems = einvoice ? EinvoiceDashboardNavItems : invoiceDashboardNavItems;
//   const dashboardTitle = einvoice ? 'E-Invoice Overview' : 'Invoice Overview';

//   return (
//     <DashSection
//       className="mt-2 pl-4"
//       title={
//         <span
//           className={InputStyles.sectionTitle}
//         >{dashboardTitle}</span>
//       }
//       titleRight={
//         <span
//           className={InputStyles.sectionTitle}
//         >{new Date().getFullYear()}</span>
//       }
//     >
//       <GridContainer className="p-2">
//         {navItems.map((el, key) => (
//           <GridItem
//             key={key}
//             href={`/dashboard/accounts/invoice/${el?.linkTo}`}
//           >
//             <div
//             // className="grid justify-center sm:w-1/2 w-1/5"
//             >
//               <Icon
//                 icon={el?.icon}
//                 className={`rounded-xl sm:h-8 sm:w-8 sm:p-2 h-6 w-6 p-2 ${el?.cssClass}`}
//               />
//             </div>
//             <div className="w-full">
//               {/* Title line */}
//               <p className="text-[8px] sm:text-sm font-medium capitalize break-words">
//                 {el.title} - {navCardData[el.title]?.length ?? 0}
//               </p>
//               {/* For invoice, sale, purchase */}
//               {['invoice', 'sale', 'purchase'].includes(el.title) && (
//                 <p className="font-normal text-[8px] sm:text-xs break-words">
//                   ₹
//                   {(navCardData[el.title] || []).reduce(
//                     (acc, inv) => acc + inv.totalAmount,
//                     0
//                   )}
//                 </p>
//               )}
//               {/* For cash/bank */}
//               {el.title === 'cash/bank' && (
//                 <p className="font-normal text-[8px] sm:text-xs break-words">
//                   ₹
//                   {(navCardData.sale || []).reduce(
//                     (acc, inv) => acc + inv.totalAmount,
//                     0
//                   ) -
//                     (navCardData.purchase || []).reduce(
//                       (acc, inv) => acc + inv.totalAmount,
//                       0
//                     )}
//                 </p>
//               )}
//             </div>
//           </GridItem>
//         ))}
//       </GridContainer>
//     </DashSection>
//   );
// }
// export default InvoiceDashboardNavItem;


'use client';
import GridContainer from '@/components/pagesComponents/grid/GridContainer';
import GridItem from '@/components/pagesComponents/grid/GridItem';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { Icon } from '@iconify/react';
import { invoiceDashboardNavItems, EinvoiceDashboardNavItems } from './staticData';
import { InputStyles } from '@/app/styles/InputStyles';

const formatINR = (num = 0) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num || 0);

// refined, richer palettes (soft yet punchy; good in light/dark)
const PALETTES = [
  { bg: 'bg-gradient-to-br from-sky-50 to-blue-100 dark:from-slate-900 dark:to-slate-800',    ring: 'ring-sky-300/50 dark:ring-sky-700/40',    chip: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-200 dark:border-sky-800' },
  { bg: 'bg-gradient-to-br from-indigo-50 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/20', ring: 'ring-indigo-300/50 dark:ring-indigo-700/40', chip: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-800' },
  { bg: 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/20',  ring: 'ring-emerald-300/50 dark:ring-emerald-700/40', chip: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800' },
  { bg: 'bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20',  ring: 'ring-amber-300/50 dark:ring-amber-700/40',  chip: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800' },
  { bg: 'bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/20',       ring: 'ring-rose-300/50 dark:ring-rose-700/40',   chip: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-800' },
  { bg: 'bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900/40 dark:to-slate-900/20',     ring: 'ring-slate-300/50 dark:ring-slate-700/40',  chip: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-200 dark:border-slate-800' },
];

function InvoiceDashboardNavItem({ navCardData = {}, einvoice = false }) {
  const navItems = einvoice ? EinvoiceDashboardNavItems : invoiceDashboardNavItems;
  const dashboardTitle = einvoice ? 'E-Invoice Overview' : 'Invoice Overview';
  const currentYear = new Date().getFullYear();

  const sumAmount = (key) =>
    (navCardData[key] || []).reduce((acc, inv) => acc + (inv?.totalAmount || 0), 0);

  const cashBank = sumAmount('sale') - sumAmount('purchase');

  return (
    <DashSection
      className="relative mt-1 px-2 pt-1 pb-3 overflow-hidden"
      title={
        <div className="flex items-center gap-3">
          <span className={`${InputStyles.sectionTitle} leading-4`}>{dashboardTitle}</span>
        </div>
      }
      titleRight={
        <span className={`${InputStyles.sectionTitle}`} title={`${currentYear}`}>
          {currentYear}
        </span>
      }
    >
      <GridContainer className="p-2 gap-3 sm:gap-4">
        {navItems.map((el, key) => {
          const title = el?.title || '';
          const count = navCardData[title]?.length ?? 0;

          let amount = null;
          if (['invoice', 'sale', 'purchase'].includes(title)) amount = sumAmount(title);
          else if (title === 'cash/bank') amount = cashBank;

          const isPositive = (amount ?? 0) >= 0;
          const accent =
            title === 'cash/bank'
              ? (isPositive ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300')
              : 'text-blue-700 dark:text-blue-300';

          const theme = PALETTES[key % PALETTES.length];

          return (
            <GridItem
              key={key}
              href={`/dashboard/accounts/invoice/${el?.linkTo}`}
              aria-label={`${title} – open`}
              title={`Open ${title}`}
              tabIndex={0}
              className={`
                group relative overflow-hidden
                ${theme.bg}
                border border-white/50 dark:border-white/10
                shadow-lg shadow-black/10 dark:shadow-black/30
                rounded-2xl sm:rounded-3xl
                p-4
                transition-[transform,box-shadow,filter] duration-300 ease-out
                will-change-transform transform-gpu
                [perspective:1000px]
                hover:-translate-y-1 hover:scale-[1.015]
                hover:[transform:rotateX(1.25deg)_rotateY(-1.25deg)]
                hover:shadow-2xl hover:shadow-black/15 dark:hover:shadow-black/50
                active:scale-[0.995]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900
              `}
            >
              {/* inner glass + crisp ring */}
              <div
                className={`
                  pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl
                  ring-0 group-hover:ring-2 ${theme.ring}
                  bg-white/10 dark:bg-white/5 backdrop-blur-[2px]
                  transition-all duration-300
                `}
                aria-hidden="true"
              />

              {/* gloss sweep (no extra content added; purely visual) */}
              <span
                className="pointer-events-none absolute -left-24 top-0 h-full w-16 rotate-12 bg-white/40 dark:bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* content */}
              <div className="relative flex items-center gap-3 w-full">
                {/* text area only (no extra parts added) */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] sm:text-sm font-semibold capitalize truncate text-neutral-800 dark:text-neutral-200">
                      {title}
                    </p>
                    <span
                      className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full border ${theme.chip}`}
                    >
                      {count}
                    </span>
                  </div>

                  {amount !== null ? (
                    <p className={`mt-1 text-[10px] sm:text-xs font-semibold ${accent}`}>
                      ₹ {formatINR(amount)}
                    </p>
                  ) : (
                    <p className="mt-1 text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500">—</p>
                  )}
                </div>

                {/* caret (already present, kept as-is) */}
                <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon icon="lucide:chevron-right" className="h-4 w-4 text-blue-600/80 dark:text-blue-300/80" />
                </div>
              </div>

              {/* bottom shine bar, radius matched */}
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-white/30 via-white/70 to-white/30 dark:from-white/10 dark:via-white/40 dark:to-white/10 group-hover:w-full transition-all duration-500 rounded-b-2xl sm:rounded-b-3xl"
                aria-hidden="true"
              />
            </GridItem>
          );
        })}
      </GridContainer>
    </DashSection>
  );
}

export default InvoiceDashboardNavItem;
