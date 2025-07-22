"use client";

import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";

import HeroOverlay from "./hero-overlay";
import Link from "next/link";
import MasonryGallery from "./masonry-gallery";

export default function HomeClient({ images }: { images: { publicId: string; secureUrl: string }[] }) {
  return (
    <main className='relative'>
      {/* Background Image */}
      <section className='relative z-10 h-screen w-full overflow-hidden'>
        <CldImage
          src="IMG_4747_zpnuvf"
          fill
          gravity="auto"
          alt='Wedding Hero'
          className='object-cover z-0'
          // sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw'
          priority
        />

        {/* Overlay Content */}
        <HeroOverlay />

        {/* Scroll Indicator */}
        <Link href='#gallery' scroll={false}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 z-20'
          >
            <svg className='w-6 h-6 text-white animate-pulse' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
            </svg>
          </motion.div>
        </Link>
      </section>

      {/* Gallery Section */}
      <MasonryGallery images={images} />
    </main>
  );
}
