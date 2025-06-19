import Image from 'next/image';

export default function Loader() {
  return (
    <Image
      loading="eager"
      width={75}
      height={75}
      src="/loading.svg"
      alt="Loading..."
    />
  );
}

// export default function Loader() {
//   return (
//     <div className="flex justify-center items-center w-full h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
//     </div>
//   );
// }
