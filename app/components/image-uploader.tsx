"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useAuth } from "../auth-provider";
import { useRef, useState } from "react";
import SignInSheet from "./sign-in-sheet";

export default function ImageUploader() {
  const { user } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const uploadRef = useRef<() => void>(null);

  const handleClick = () => {
    if (user) {
      uploadRef.current?.();
    } else {
      setSheetOpen(true);
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <CldUploadWidget signatureEndpoint='/api/sign-image' options={{ folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "Wedding", multiple: false, sources: ["local", "url"] }}>
        {({ open }) => {
          uploadRef.current = open;

          return (
            <Button variant='secondary' onClick={handleClick}>
              {user ? "Upload your wedding photo" : "Sign in to upload your wedding photo"}
              <span className='sr-only'>Upload Photo</span>
            </Button>
          );
        }}
      </CldUploadWidget>

      <SignInSheet open={sheetOpen} onOpenChange={setSheetOpen} onSuccess={() => uploadRef.current} />
    </div>
  );
}
