"use client";

import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";

import HeroOverlay from "./hero-overlay";
import MasonryGallery from "./masonry-gallery";
import { Button } from "@/components/ui/button";

const mapsUrl = encodeURI("https://maps.app.goo.gl/SeKdrAXmcXi4qRGo9");

export default function HomeClient({ images }: { images: { publicId: string; secureUrl: string }[] }) {
  return (
    <main className='relative'>
      <a href={mapsUrl} target='_blank' rel='noopener noreferrer' className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
        <Button variant='outline' className='px-4 py-2 text-sm sm:text-base sm:px-6 sm:py-2 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-200 transition my-4'>
          📍 Get Directions
        </Button>
      </a>
      {/* Background Image */}
      <section className='relative z-10 h-screen w-full overflow-hidden'>
        <CldImage
          src='IMG_4747_zpnuvf'
          fill
          alt='Wedding Hero'
          className='object-cover z-0'
          // sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw'
          priority
        />

        {/* Overlay Content */}
        <HeroOverlay />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className='absolute bottom-6 left-1/2 -translate-x-1/2 z-20'
        >
          <svg className='w-8 h-8 text-white animate-pulse' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
          </svg>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <MasonryGallery images={images} />
    </main>
  );
}
