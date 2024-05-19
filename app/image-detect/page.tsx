"use client";
import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import { non_max_suppression } from "@/utils/non_max_suppression";
import { renderBoxesImage } from "@/utils/renderBoxesImage";
import labels from "@/utils/labels.json";

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

export default function ImageDetect() {
  const [loading, setLoading] = useState<LoadingState>({
    loading: true,
    progress: 0,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [detectedObject, setDetectedObject] = useState<DetectionResult | null>(
    null
  ); // Menyimpan informasi objek yang terdeteksi
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null); // Ref untuk elemen img

  const modelName: string = "yolov7";
  const threshold: number = 0.8;

  const detectFrame = async (
    model: tf.GraphModel,
    image: HTMLImageElement
  ): Promise<void> => {
    const model_dim: number[] = [640, 640];
    tf.engine().startScope();
    const input = tf.tidy(() => {
      const img = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor(model_dim)
        .toFloat()
        .expandDims();
      return img.transpose([0, 3, 1, 2]); // Transpose dimensi untuk sesuaikan dengan model
    });

    await model.executeAsync({ images: input }).then((res) => {
      const detections: DetectionResult = non_max_suppression(
        res.arraySync()[0]
      );
      const boxes: number[][] = shortenedCol(detections, [0, 1, 2, 3]);
      const scores: number[][] = shortenedCol(detections, [4]);
      const class_detect: number[][] = shortenedCol(detections, [5]);

      renderBoxesImage(
        canvasRef,
        threshold,
        boxes,
        scores,
        class_detect,
        labels
      );

      // Menemukan objek dengan akurasi tertinggi
      const highestAccuracyIndex = scores.findIndex(
        (score) => score[0] === Math.max(...scores.map((s) => s[0]))
      );
      setDetectedObject(detections[highestAccuracyIndex]);

      tf.dispose(res);
    });

    tf.engine().endScope();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result;
        setSelectedImage(file);
        setImageSrc(imageSrc as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!selectedImage) {
      setLoading({ loading: false, progress: 0 });
      return;
    }

    tf.loadGraphModel(
      `${window.location.origin}/${modelName}_web_model/model.json`,
      {
        onProgress: (fractions) => {
          setLoading({ loading: true, progress: fractions });
        },
      }
    ).then(async (yolov7) => {
      setLoading({ loading: true, progress: 0 });
      const image = new Image();
      image.src = imageSrc!;
      image.onload = () => {
        setLoading({ loading: false, progress: 1 });
        detectFrame(yolov7, imageRef.current!); // Menggunakan imageRef.current
      };
    });
  }, [selectedImage, imageSrc]);

  return (
    <div className="flex-1 items-start overflow-y-auto flex justify-center my-16 bg-white">
      <div className="flex flex-col justify-center items-center m-5">
        <h2 className="font-bold text-xl">Image Object Detection</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {loading.loading ? (
          <div>{loading.progress === 0 ? "Upload an image" : "Loading..."}</div>
        ) : (
          <p> </p>
        )}

        <div className="mt-[10px] w-full h-full relative">
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Uploaded"
              className="h-full w-full max-w-[640px] max-h-[480px] object-cover"
            />
          )}
          {/* Menggunakan ref={imageRef} */}
          {detectedObject && ( // Tampilkan informasi objek yang terdeteksi jika ada
            <div className="absolute mt-">
              <p>Detected Object:</p>
              <div>
                {/* Menampilkan output dari akurasi paling tinggi */}
                <p>Coordinates: {detectedObject.slice(0, 4).join(", ")}</p>
                <p>Accuracy: {detectedObject[4]}</p>
                <p>Class: {labels[detectedObject[5]]}</p>
              </div>
            </div>
          )}
          <canvas
            width={640}
            height={480}
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
