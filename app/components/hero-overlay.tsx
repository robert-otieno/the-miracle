"use client";

import { motion } from "framer-motion";
import ImageUploader from "./image-uploader";

export default function HeroOverlay() {
  return (
    <div className='absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end pb-8 justify-center'>
      <motion.div
        className='text-white px-4 pb-16 text-center'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-tight'>Welcome to Our Wedding Gallery</h1>

        <p className='mt-3 text-base sm:text-lg md:text-xl mb-4'>Captured memories, forever cherished</p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.5 }} viewport={{ once: true }}>
          <ImageUploader />
          <p className='mt-5 text-xs sm:text-sm md:text-base'>Upload your photos to share with us!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
