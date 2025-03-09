export default function ITRSteps({ steps, active, setSection }) {
    return (
        <div className="relative max-w-4xl w-full  mx-auto mb-10">
            <ol className=" text-sm font-medium text-center text-gray-500 border-b border-gray-200  dark:border-gray-400">
                {steps.map((item, index) => (
                    <li
                        key={item+index}
                        onClick={() => {
                            setSection(item);
                        }}
                        className={`inline-block p-4 border-transparent rounded-t-lg hover:text-neutral-500  hover:border-gray-300 dark:hover:text-gray-300 border-b-2 cursor-pointer mx-2
                            ${item === active ? 'border-b-primary' : 'border-white'}
                        `}
                    >
                        {item}
                    </li>
                ))}
            </ol>
        </div>
    );
}
