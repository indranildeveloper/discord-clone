"use client";

import { FC } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { FileUploadProps } from "@/interface/components/FileUploadProps";

const FileUpload: FC<FileUploadProps> = ({ endpoint, value, onChange }) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} alt="Upload" className="rounded-full" fill />
        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
