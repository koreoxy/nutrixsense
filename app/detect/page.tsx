"use client";

import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import { Webcam } from "@/utils/webcam";
import { renderBoxes } from "@/utils/renderBoxes";
import { non_max_suppression } from "@/utils/non_max_suppression";

type LoadingState = {
  loading: boolean;
  progress: number;
};

type DetectionResult = [number, number, number, number, number, number][];

function shortenedCol(
  arrayofarray: number[][],
  indexlist: number[]
): number[][] {
  return arrayofarray.map(function (array) {
    return indexlist.map(function (idx) {
      return array[idx];
    });
  });
}

export default function DetectPage() {
  const [loading, setLoading] = useState<LoadingState>({
    loading: true,
    progress: 0,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcam = new Webcam();
  // configs
  const modelName: string = "yolov7";
  const threshold: number = 0.8;

  const detectFrame = async (model: tf.GraphModel): Promise<void> => {
    const model_dim: number[] = [640, 640];
    tf.engine().startScope();
    const input = tf.tidy(() => {
      const img = tf.image
        .resizeBilinear(tf.browser.fromPixels(videoRef.current!), model_dim)
        .div(255.0)
        .transpose([2, 0, 1])
        .expandDims(0);
      return img;
    });

    await model.executeAsync(input).then((res) => {
      const detections: DetectionResult = non_max_suppression(
        res.arraySync()[0]
      );
      const boxes: number[][] = shortenedCol(detections, [0, 1, 2, 3]);
      const scores: number[][] = shortenedCol(detections, [4]);
      const class_detect: number[][] = shortenedCol(detections, [5]);

      renderBoxes(canvasRef, threshold, boxes, scores, class_detect);
      tf.dispose(res);
    });

    requestAnimationFrame(() => detectFrame(model)); // get another frame
    tf.engine().endScope();
  };

  useEffect(() => {
    tf.loadGraphModel(
      `${window.location.origin}/${modelName}_web_model/model.json`,
      {
        onProgress: (fractions) => {
          setLoading({ loading: true, progress: fractions });
        },
      }
    ).then(async (yolov7) => {
      // Warmup the model before using real data.
      const dummyInput: tf.Tensor = tf.ones(yolov7.inputs[0].shape);
      await yolov7.executeAsync(dummyInput).then((warmupResult) => {
        tf.dispose(warmupResult);
        tf.dispose(dummyInput);

        setLoading({ loading: false, progress: 1 });
        webcam.open(videoRef, () => detectFrame(yolov7));
      });
    });
  }, []);

  // console.warn = () => {};

  return (
    <div className="App">
      <h2>Object Detection Using YOLOv7 & Tensorflow.js</h2>
      {loading.loading ? <div>loading..</div> : <p> </p>}

      <div className="content">
        <video autoPlay playsInline muted ref={videoRef} id="frame" />
        <canvas width={640} height={640} ref={canvasRef} />
      </div>
    </div>
  );
}
