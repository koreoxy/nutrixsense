"use client";

import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "@/components/detect/loader";
import ButtonHandler from "@/components/detect/btn-handler";
import { detect, detectVideo } from "@/utils/yolov8/detect.js";
import { Navbar } from "@/components/navbar";
import { MenuBar } from "@/components/menu-bar";

import DetectionResults from "@/components/detect/detection-result";

const ImageDetect = () => {
  const clearDetections = () => {
    setDetections([]); // Mengosongkan state detections
  };

  const [loading, setLoading] = useState({
    loading: true,
    progress: 0,
  });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [detections, setDetections] = useState([]);

  // references
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "yolov8n";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.origin}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions });
          },
        }
      );

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      });

      tf.dispose([warmupResults, dummyInput]);
    });
  }, []);

  return (
    <>
      <Navbar title="Image Detect" />
      <div className="flex flex-col overflow-y-auto mb-16 bg-white dark:bg-background h-full">
        <div>
          {loading.loading ? (
            <Loader>
              Loading model... {(loading.progress * 100).toFixed(2)}%
            </Loader>
          ) : (
            <>
              <div className="p-4">
                <div className="text-center mb-2">
                  <h1 className="font-bold text-lg">📷 Detect Your Food
                  </h1>
                </div>

                <div className="content">
                  <img
                    src="#"
                    ref={imageRef}
                    onLoad={() =>
                      detect(
                        imageRef.current,
                        model,
                        canvasRef.current,
                        setDetections
                      )
                    }
                  />
                  <video
                    autoPlay
                    muted
                    ref={cameraRef}
                    onPlay={() =>
                      detectVideo(
                        cameraRef.current,
                        model,
                        canvasRef.current,
                        setDetections
                      )
                    }
                  />
                  <video
                    autoPlay
                    muted
                    ref={videoRef}
                    onPlay={() =>
                      detectVideo(
                        videoRef.current,
                        model,
                        canvasRef.current,
                        setDetections
                      )
                    }
                  />
                  <canvas
                    width={model.inputShape[1]}
                    height={model.inputShape[2]}
                    ref={canvasRef}
                  />
                </div>

                <ButtonHandler
                  imageRef={imageRef}
                  cameraRef={cameraRef}
                  videoRef={videoRef}
                  clearDetections={clearDetections}
                />
              </div>

              <DetectionResults detections={detections} />
            </>
          )}
        </div>
      </div>
      <MenuBar />
    </>
  );
};

export default ImageDetect;
