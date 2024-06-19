import React, { useState, useRef, MutableRefObject } from "react";
import { Webcam } from "@/utils/yolov8/webcam";
import { Button } from "@/components/ui/button";

interface ButtonHandlerProps {
  imageRef: MutableRefObject<HTMLImageElement | null>;
  cameraRef: MutableRefObject<HTMLVideoElement | null>;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}

const ButtonHandler: React.FC<ButtonHandlerProps> = ({
  imageRef,
  cameraRef,
  videoRef,
}) => {
  const [streaming, setStreaming] = useState<string | null>(null); // streaming state
  const inputImageRef = useRef<HTMLInputElement | null>(null); // video input reference
  const inputVideoRef = useRef<HTMLInputElement | null>(null); // video input reference
  const webcam = new Webcam(); // webcam handler

  // closing image
  const closeImage = () => {
    if (imageRef.current) {
      const url = imageRef.current.src;
      imageRef.current.src = "#"; // restore image source
      URL.revokeObjectURL(url); // revoke url

      setStreaming(null); // set streaming to null
      if (inputImageRef.current) {
        inputImageRef.current.value = ""; // reset input image
      }
      imageRef.current.style.display = "none"; // hide image
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
          }
        }}
        ref={inputImageRef}
      />
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
      >
        {streaming === "image" ? "Close" : "Open"} Image
      </Button>

      {/* Video Handler */}
      <input
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
      <Button
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
      </Button>

      {/* Webcam Handler */}
      <Button
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
      </Button>
    </div>
  );
};

export default ButtonHandler;
