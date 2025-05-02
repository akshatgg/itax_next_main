import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import Button, { BTN_SIZES } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';

export default function Hero({ pageData }) {
  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: 'easeInOut' },
    },
  };
  return (
    // <div className="mx-auto max-w-7xl grid lg:grid-cols-2 items-center gap-y-8 my-28 relative  ">
    //   <div className="lg:order-2 mx-auto rounded-full w-96 h-96  bg-blue-600 relative ">
    //     {/* <Video src="/ITR.mp4" /> */}
    //     <Image
    //       src="/Hero-ITR.gif"
    //       loading="eager"
    //       width={500}
    //       height={700}
    //       alt="ITR"
    //       className='rounded absolute top-[0] animate-slide-down rounded-tl-full'
    //     />
    //   </div>
    //   <div className="lg:w-full lg:pl-16 lg:mx-0 mt-5 lg:mt-0 text-center lg:text-left">
    //     <h1 className="text-lg lg:text-[32px] font-bold text-slate-800 leading-snug">
    //       <Typewriter
    //         options={{
    //           strings: [`${pageData.upper.mainHeading}`],
    //           autoStart: true,
    //           loop: true,
    //           changeDeleteSpeed: 3,
    //         }}
    //       />
    //     </h1>
    //     <p className="font-semibold text-slate-800 mt-3">
    //       {pageData.upper.subHeading}
    //     </p>

    //     <Button
    //       className={`my-4 font-medium ${BTN_SIZES['xl-1']} py-[10px]`}
    //       onClick={() =>
    //         router.push('/dashboard/itr/itr-filling/upload-form-16')
    //       }
    //     >
    //       {pageData.upper.button}
    //     </Button>
    //   </div>

    // </div>
    <div className="mx-auto max-w-7xl grid lg:grid-cols-2 items-center gap-y-8 my-12 relative overflow-hidden">
      {/* Image Section with Animation */}
      <motion.div
  className="
    absolute 
    w-[40vw] 
    h-[40vw] 
    rotate-[-45deg] 
    bg-blue-900 
    mx-auto 
    top-[-26%] 
    left-[65%] 
    
    rounded-tr-full
    lg:order-2
  "
  initial="hidden"
  animate="visible"
></motion.div>


      <motion.div
        className="lg:order-2 mx-auto rounded-full w-[26vw] h-[26vw] bg-blue-600 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <motion.img
          src="/Hero-ITR.gif"
          alt="ITR"
          className="absolute top-[10%] left-0  object-cover rounded-full"
        />
      </motion.div>

      {/* Text Section with Animation */}
      <motion.div
        className="lg:w-full lg:pl-16 lg:mx-0 mt-5 lg:mt-0 text-center lg:text-left"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-lg lg:text-[32px] font-bold text-slate-800 leading-snug"
          variants={childVariants}
        >
          {pageData.upper.mainHeading}
        </motion.h1>
        <motion.p
          className="font-semibold text-slate-800 mt-3 text-sm"
          variants={childVariants}
        >
          {pageData.upper.subHeading}
        </motion.p>
        <motion.button
          className="my-4 font-medium px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
          onClick={() =>
            router.push('/dashboard/itr/itr-filling/upload-form-16')
          }
          variants={childVariants}
          whileHover={{
            scale: 1.1,
            boxShadow: '0px 0px 10px rgba(59, 130, 246, 0.8)',
          }}
        >
          {pageData.upper.button}
        </motion.button>
      </motion.div>
    </div>
  );
}
