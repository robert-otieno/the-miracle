// Version 1
// "use client";

// import { CldImage } from "next-cloudinary";
// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function HeroSlideshow({ images }: { images: { publicId: string; secureUrl: string }[] }) {
//   const slides = images.slice(0, 5);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (slides.length <= 1) return;
//     const interval = setInterval(() => {
//       setIndex((i) => (i + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   if (!slides.length) return null;

//   const current = slides[index];

//   return (
//     <AnimatePresence mode='wait'>
//       <motion.div
//         key={current.publicId}
//         className='absolute inset-0'
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <CldImage
//           src={current.publicId}
//           fill
//           alt='Wedding Hero'
//           className='object-cover'
//           priority
//         />
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// Version 2
"use client";

import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSlideshow({ publicIds }: { publicIds: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (publicIds.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % publicIds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [publicIds]);

  const MotionImage = motion(CldImage);

  return (
    <div className='absolute inset-0'>
      <AnimatePresence mode='wait'>
        <MotionImage
          key={publicIds[index]}
          src={publicIds[index]}
          alt='Wedding Hero'
          fill
          className='object-cover'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          priority
        />
      </AnimatePresence>
    </div>
  );
}
