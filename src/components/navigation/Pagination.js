'use client';
import { Icon } from '@iconify/react';

export default function Pagination(props) {
  const { currentPage, setCurrentPage, totalPages } = props;
  const handlePrevious = () => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage >= totalPages) {
      return;
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    // <nav className={`${props.className}`} aria-label="orders page navigation">
    //   <ul className="inline-flex gap-1 -space-x-px text-sm">
    //     <li onClick={handlePrevious}>
    //       <button className="h-[38px] p-3 text-primary border-2 mx-1 border-primary/50 grid place-content-center">
    //         <Icon icon="ooui:next-rtl" />
    //       </button>
    //     </li>
    //     <li>
    //       <div
    //         aria-current="page"
    //         className="h-[38px] bg-primary text-neutral-50 outline outline-2 -outline-offset-2 outline-primary/20 w-8 grid place-content-center "
    //       >
    //         {currentPage}
    //       </div>
    //     </li>
    //     <li className={`${currentPage < totalPages ? '' : 'hidden'}`}>
    //       <div
    //         aria-current="page"
    //         className="h-[38px] outline outline-2 -outline-offset-2 outline-primary/20 w-8 grid place-content-center "
    //       >
    //         {currentPage + 1}
    //       </div>
    //     </li>
    //     <li className={`${currentPage + 1 < totalPages ? '' : 'hidden'}`}>
    //       <div
    //         aria-current="page"
    //         className="h-[38px] outline outline-2 -outline-offset-2 outline-primary/20 w-8 grid place-content-center "
    //       >
    //         {currentPage + 2}
    //       </div>
    //     </li>
    //     <li className={`${currentPage + 2 < totalPages ? '' : 'hidden'}`}>
    //       <div
    //         aria-current="page"
    //         className="h-[38px] outline outline-2 -outline-offset-2 outline-primary/20 w-8 grid place-content-center "
    //       >
    //         {currentPage + 3}
    //       </div>
    //     </li>

    //     <li onClick={handleNext}>
    //       <button className="h-[38px] p-2 text-primary border-2 mx-1 border-primary/50 grid place-content-center">
    //         <Icon icon="ooui:next-ltr" />
    //       </button>
    //     </li>
    //   </ul>
    // </nav>
<nav className={`${props.className}`} aria-label="orders page navigation">
  <ul className="inline-flex items-center gap-2 text-sm">
    {/* Previous */}
    <li onClick={handlePrevious}>
      <button
        className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/40 bg-white text-primary shadow-sm hover:bg-primary hover:text-white hover:scale-105 transition duration-200"
        title="Previous"
      >
        <Icon icon="mdi:chevron-left" width={22} height={22} />
      </button>
    </li>

    {/* Current Page */}
    <li>
      <div
        aria-current="page"
        className="h-10 w-10 rounded-full bg-primary text-white font-medium flex items-center justify-center shadow-md"
      >
        {currentPage}
      </div>
    </li>

    <li className={`${currentPage < totalPages ? "" : "hidden"}`}>
      <div className="h-10 w-10 rounded-full bg-white text-primary font-medium border border-primary/20 flex items-center justify-center hover:bg-primary/10">
        {currentPage + 1}
      </div>
    </li>
    <li className={`${currentPage + 1 < totalPages ? "" : "hidden"}`}>
      <div className="h-10 w-10 rounded-full bg-white text-primary font-medium border border-primary/20 flex items-center justify-center hover:bg-primary/10">
        {currentPage + 2}
      </div>
    </li>
    <li className={`${currentPage + 2 < totalPages ? "" : "hidden"}`}>
      <div className="h-10 w-10 rounded-full bg-white text-primary font-medium border border-primary/20 flex items-center justify-center hover:bg-primary/10">
        {currentPage + 3}
      </div>
    </li>

    <li onClick={handleNext}>
      <button
        className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/40 bg-white text-primary shadow-sm hover:bg-primary hover:text-white hover:scale-105 transition duration-200"
        title="Next"
      >
        <Icon icon="mdi:chevron-right" width={22} height={22} />
      </button>
    </li>
  </ul>
</nav>


  );
}
