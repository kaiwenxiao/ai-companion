"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // when server side render finish(the whole application), this isMounted set true, so now it turn to the client rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // only isMounted is true to guarantee the cloudinary hydration is success
  // meaning this application should be rendering successfully first then we render cloudinary component(which unable to be recognized in server side rendering)

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      {/*going to cloudinary setting -> upload to set uploadPreset*/}
      <CldUploadButton
        onSuccess={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="nb4rozt4"
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="upload"
              src={value || "/placeholder.svg"}
              className="rounded-lg object-cover"
            ></Image>
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
