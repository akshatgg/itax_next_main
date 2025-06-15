'use client';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['Sales', 'Purchase'],
//   datasets: [
//     {
//       data: [300, 100],
//       backgroundColor: ['#36A2EB', '#FFCE56'],
//       hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
//     },
//   ],
// };

export default function Sales_Purchase({ invoices = [] }) {
  const salesCount = invoices.filter(inv => inv.type === 'sales').length;
  const purchaseCount = invoices.filter(inv => inv.type === 'purchase').length;

  const chartData = {
    labels: ['Sales', 'Purchase'],
    datasets: [
      {
        data: [salesCount, purchaseCount],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };
  return (
    <DashSection
      className={'col-span-12 xl:col-span-5'}
      title={'Sale & Purchase'}
      titleRight={'current year - 2025'}
    >
      <div className="p-4 grid lg:grid-cols-2">
        <div>
          <p className="text-3xl font-bold text-[#36A2EB]">Sales: {salesCount}</p>
          <p className="text-3xl font-bold text-[#FFCE56]">Purchase: {purchaseCount}</p>
        </div>
        <div className="lg:max-w-4xl w-full">
          <Doughnut data={chartData} />
        </div>
      </div>
    </DashSection>
  );
}
