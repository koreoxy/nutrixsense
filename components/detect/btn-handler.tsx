import React, { useState, useRef, MutableRefObject } from "react";
import { Button } from "@/components/ui/button";
import { CircleX, SquarePlus, Upload } from "lucide-react";
import Link from "next/link";

interface ButtonHandlerProps {
  imageRef: MutableRefObject<HTMLImageElement | null>;
  cameraRef: MutableRefObject<HTMLVideoElement | null>;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  clearDetections: () => void;
}

const ButtonHandler: React.FC<ButtonHandlerProps> = ({
  imageRef,
  cameraRef,
  videoRef,
  clearDetections,
}) => {
  const [streaming, setStreaming] = useState<string | null>(null); // streaming state
  const inputImageRef = useRef<HTMLInputElement | null>(null); // video input reference
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // closing image
  const closeImage = () => {
    if (imageRef.current) {
      const url = imageRef.current.src;
      imageRef.current.src = "#"; // restore image source
      URL.revokeObjectURL(url); // revoke url

      setStreaming(null); // set streaming to null
      setIsImageUploaded(false); // reset button state
      if (inputImageRef.current) {
        inputImageRef.current.value = ""; // reset input image
      }
      imageRef.current.style.display = "none"; // hide image
      clearDetections();
    }
  };

  return (
    <div className="btn-container flex flex-col gap-2 mt-2">
      {/* Image Handler */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0 && imageRef.current) {
            const url = URL.createObjectURL(e.target.files[0]); // create blob url
            imageRef.current.src = url; // set video source
            imageRef.current.style.display = "block"; // show video
            setStreaming("image"); // set streaming to video
            setIsImageUploaded(true); // change button state
          }
        }}
        ref={inputImageRef}
      />
      <div className="flex gap-2">
        <Button
          onClick={() => {
            // if not streaming
            if (streaming === null) inputImageRef.current?.click();
            // closing image streaming
            else if (streaming === "image") closeImage();
            else
              alert(
                `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
              ); // if streaming video or webcam
          }}
          className={
            isImageUploaded
              ? "bg-red-500 hover:bg-red-800 text-white w-full"
              : "text-white w-full"
          }
        >
          {streaming === "image" ? (
            <>
              <CircleX className="inline-block mr-2" /> Remove Image
            </>
          ) : (
            <>
              <Upload className="inline-block mr-2" /> Upload Image
            </>
          )}
        </Button>
        <Button className="text-white w-full">
          <Link href="/check-manual">
            <SquarePlus className="inline-block mr-2" />
            Check manual
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ButtonHandler;
