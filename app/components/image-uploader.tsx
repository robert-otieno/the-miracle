"use client";

import { CldUploadWidget } from "next-cloudinary";
// import { useState } from "react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ImageUploader() {
  // const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className='flex flex-col items-center gap-4'>
      <CldUploadWidget
        signatureEndpoint='/api/sign-image'
        options={{ folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "Wedding", multiple: false, sources: ["local", "url"] }}
        // onUploadAdded={(result) => {
        //   if (result && typeof result.info === "object" && result.info !== null && "secure_url" in result.info) {
        //     setImageUrl((result.info as { secure_url: string }).secure_url);
        //   }
        // }}
      >
        {({ open }) => {
          return (
            <Button variant='secondary' onClick={() => open()}>
              Upload your wedding photo
              <span className='sr-only'>Upload Photo</span>
            </Button>
          );
        }}
      </CldUploadWidget>

      {/* {imageUrl && (
        <div className='relative w-80 h-60'>
          <Image src={imageUrl} alt='Uploaded wedding photo' fill className='rounded-md object-cover' />
        </div>
      )} */}
    </div>
  );
}
