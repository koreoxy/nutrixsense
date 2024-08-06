import React, { useState, useRef, MutableRefObject } from "react";
import { Button } from "@/components/ui/button";
import { CircleX, Info, SquarePlus, Upload } from "lucide-react";
import Link from "next/link";
import { Webcam } from "@/utils/yolov8/webcam";

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
  const inputVideoRef = useRef<HTMLInputElement | null>(null); // video input reference
  const webcam = new Webcam(); // webcam handler

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

  // closing video streaming
  const closeVideo = () => {
    if (videoRef.current) {
      const url = videoRef.current.src;
      videoRef.current.src = ""; // restore video source
      URL.revokeObjectURL(url); // revoke url

      setStreaming(null); // set streaming to null
      if (inputVideoRef.current) {
        inputVideoRef.current.value = ""; // reset input video
      }
      videoRef.current.style.display = "none"; // hide video
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
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
        <div className="p-3 border border-orange-500 rounded-md">
          <div className="flex gap-1 items-center text-orange-700">
            <Info size={20} />
            <h1 className="text-sm">Note</h1>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Jika fitur deteksi nutrisi makanan tidak akurat dengan porsi yang
            Anda inginkan, sebaiknya gunakan fitur check manual untuk memeriksa
            porsi nutrisi makanan Anda.
          </p>
        </div>
      </div>

      {/* Video Handler */}
      {/* <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (streaming === "image") closeImage(); // closing image streaming
          if (e.target.files && e.target.files.length > 0 && videoRef.current) {
            const url = URL.createObjectURL(e.target.files[0]); // create blob url
            videoRef.current.src = url; // set video source
            videoRef.current.addEventListener("ended", closeVideo); // add ended video listener
            videoRef.current.style.display = "block"; // show video
            setStreaming("video"); // set streaming to video
          }
        }}
        ref={inputVideoRef}
      />
      <button
        onClick={() => {
          // if not streaming
          if (streaming === null || streaming === "image")
            inputVideoRef.current?.click();
          // closing video streaming
          else if (streaming === "video") closeVideo();
          else
            alert(
              `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
            ); // if streaming webcam
        }}
      >
        {streaming === "video" ? "Close" : "Open"} Video
      </button> */}

      {/* Webcam Handler */}
      {/* <button
        onClick={() => {
          // if not streaming
          if (streaming === null || streaming === "image") {
            // closing image streaming
            if (streaming === "image") closeImage();
            if (cameraRef.current) {
              webcam.open(cameraRef.current); // open webcam
              cameraRef.current.style.display = "block"; // show camera
              setStreaming("camera"); // set streaming to camera
            }
          }
          // closing video streaming
          else if (streaming === "camera") {
            if (cameraRef.current) {
              webcam.close(cameraRef.current);
              cameraRef.current.style.display = "none";
              setStreaming(null);
            }
          } else
            alert(
              `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
            ); // if streaming video
        }}
      >
        {streaming === "camera" ? "Close" : "Open"} Webcam
      </button> */}
    </div>
  );
};

export default ButtonHandler;
