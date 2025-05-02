export default function SearchResult_section(props) {
  const { title, children } = props;

  return (
    <div className="p-4 space-y-6 min-h-screen">
<div className="bg-white rounded-2xl xl:max-w-7xl mx-auto p-6 flex flex-wrap items-center justify-between">
  <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-4">
    {title}
  </h2>
</div>

      <ul className=" [&>li:nth-child(even)]:max-h-screen [&>li:nth-child(even)]:overflow-y-auto  rounded-xl shadow-md xl:max-w-7xl mx-auto grid justify-center content-center lg:grid-cols-3 gap-4 ">
        {children}
      </ul>
    </div>
  );
}
