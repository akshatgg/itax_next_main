
export default function DashSection(props) {
  const { title = "", titleRight = "", className = "", children = "" } = props;

  return (
    <section
     className={`shadow-sm border border-gray-200/60 rounded-xl bg-white mt-2 mx-auto md:w-[calc(100%-3rem)] w-[calc(100%-1rem)] ${className}`}
     >
      <div className="capitalize flex justify-between flex-wrap items-center">
        <h2 
        // className="border-l-4 border-l-primary pl-3 text-neutral-700 text-2xl font-medium"
        >
          {title}
        </h2>
        {titleRight && (
          <div className="text-neutral-500 font-semibold">{titleRight}</div>
        )}
      </div>
      <div className="p-2">{children}</div>
    </section>
  );
}
