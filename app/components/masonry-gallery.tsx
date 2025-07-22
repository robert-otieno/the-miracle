"use client";

import { CldImage } from "next-cloudinary";
import Masonry from "react-masonry-css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const breakpointColumnsObj = {
  default: 5,
  1100: 2,
  700: 1,
};

export default function MasonryGallery({ images }: { images: { publicId: string; secureUrl: string }[] }) {
  return (
    <section id='gallery' className='relative z-20 bg-white px-4 py-12 max-w-7xl mx-auto'>
      <PhotoProvider>
        <Masonry breakpointCols={breakpointColumnsObj} className='flex w-auto gap-4' columnClassName='bg-clip-padding'>
          {images.map((img, i) => (
            <PhotoView key={i} src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${img.publicId}`}>
              <CldImage src={img.publicId} alt={`Gallery image ${i}`} width={600} height={400} className='rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' />
            </PhotoView>
          ))}
        </Masonry>
      </PhotoProvider>
    </section>
  );
}
