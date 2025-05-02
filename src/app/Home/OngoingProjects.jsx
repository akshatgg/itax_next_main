import Image from 'next/image';
import { motion } from "framer-motion";

export default function OngoingProjects({ ongoingProjects }) {
  const checkImageLink = (url) => {
    if (url && typeof url === 'string' && url.includes('/')) {
      return url;
    } else {
      return '/images/home/ongoing_projects/upcoming.avif';
    }
  };

  return (
    <div className="max-w-7xl lg:px-8 mx-auto py-20 ">
    {/* Heading */}
    <motion.h3
      className="text-center text-slate-900 text-3xl md:text-4xl font-extrabold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Ongoing Projects
    </motion.h3>

    {/* Projects Grid */}
    <motion.ul
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {ongoingProjects.map((element) => (
        <>
          {element.heading && (
            <motion.li
              key={element.heading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="max-w-xs mx-auto shadow-md border rounded-lg bg-white overflow-hidden transition-transform duration-300"
            >
              {/* Image Section */}
              <div className="h-48 grid place-items-center overflow-hidden">
                <Image
                  className="object-contain"
                  alt="Projects Image"
                  width={250}
                  height={200}
                  src={checkImageLink(element.image)}
                />
              </div>
              {/* Heading Section */}
              <div className="bg-gray-100 flex items-center py-4 px-6">
                <span className="font-semibold text-sm mx-auto text-center text-gray-800">
                  {element.heading}
                </span>
              </div>
            </motion.li>
          )}
        </>
      ))}
    </motion.ul>
  </div>
  );
}
