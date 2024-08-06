// "use client";

// import React, { useState, useEffect, useRef, MutableRefObject } from "react";
// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
// import Loader from "@/components/detect/loader";
// import ButtonHandler from "@/components/detect/btn-handler";
// import { detect, detectVideo } from "@/utils/yolov8/detect";
// import { Navbar } from "@/components/navbar";
// import { MenuBar } from "@/components/menu-bar";

// import DetectionResults from "@/components/detect/detection-result";

// interface LoadingState {
//   loading: boolean;
//   progress: number;
// }

// interface ModelState {
//   net: tf.GraphModel | null;
//   inputShape: number[];
// }

// interface DetectionResult {
//   className: string;
//   score: number;
// }

// const ImageDetect: React.FC = () => {
//   const clearDetections = () => {
//     setDetections([]); // Mengosongkan state detections
//   };

//   const [loading, setLoading] = useState<LoadingState>({
//     loading: true,
//     progress: 0,
//   });
//   const [model, setModel] = useState<ModelState>({
//     net: null,
//     inputShape: [1, 0, 0, 3],
//   });
//   const [detections, setDetections] = useState<DetectionResult[]>([]);

//   // references
//   const imageRef = useRef<HTMLImageElement>(null);
//   const cameraRef = useRef<HTMLVideoElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // model configs
//   const modelName = "yolov8n";

//   useEffect(() => {
//     tf.ready().then(async () => {
//       const yolov8 = await tf.loadGraphModel(
//         `${window.location.origin}/${modelName}_web_model/model.json`,
//         {
//           onProgress: (fractions: number) => {
//             setLoading({ loading: true, progress: fractions });
//           },
//         }
//       );

//       // warming up model
//       const dummyInput = tf.ones(yolov8.inputs[0].shape as tf.Shape);
//       const warmupResults = yolov8.execute(dummyInput);

//       setLoading({ loading: false, progress: 1 });
//       setModel({
//         net: yolov8,
//         inputShape: yolov8.inputs[0].shape as number[],
//       });

//       tf.dispose([warmupResults, dummyInput]);
//     });
//   }, []);

//   return (
//     <>
//       <Navbar title="Image Detect" />
//       <div className="flex flex-col overflow-y-auto mb-16 bg-white dark:bg-background h-full">
//         <div>
//           {loading.loading ? (
//             <Loader>
//               Loading model... {(loading.progress * 100).toFixed(2)}%
//             </Loader>
//           ) : (
//             <>
//               <div className="p-4">
//                 <div className="text-center mb-2">
//                   <h1 className="font-bold text-lg">📷 Detect Your Food</h1>
//                 </div>

//                 <div className="content">
//                   <img
//                     src="#"
//                     ref={imageRef}
//                     onLoad={() =>
//                       detect(
//                         imageRef.current as HTMLImageElement,
//                         model,
//                         canvasRef.current as HTMLCanvasElement,
//                         setDetections
//                       )
//                     }
//                   />
//                   <video
//                     autoPlay
//                     muted
//                     ref={cameraRef}
//                     onPlay={() =>
//                       detectVideo(
//                         cameraRef.current as HTMLVideoElement,
//                         model,
//                         canvasRef.current as HTMLCanvasElement,
//                         setDetections
//                       )
//                     }
//                   />
//                   <video
//                     autoPlay
//                     muted
//                     ref={videoRef}
//                     onPlay={() =>
//                       detectVideo(
//                         videoRef.current as HTMLVideoElement,
//                         model,
//                         canvasRef.current as HTMLCanvasElement,
//                         setDetections
//                       )
//                     }
//                   />
//                   <canvas
//                     width={model.inputShape[1]}
//                     height={model.inputShape[2]}
//                     ref={canvasRef}
//                   />
//                 </div>

//                 <ButtonHandler
//                   imageRef={imageRef as MutableRefObject<HTMLImageElement>}
//                   cameraRef={cameraRef as MutableRefObject<HTMLVideoElement>}
//                   videoRef={videoRef as MutableRefObject<HTMLVideoElement>}
//                   clearDetections={clearDetections}
//                 />
//               </div>

//               <DetectionResults detections={detections} />
//             </>
//           )}
//         </div>
//       </div>
//       <MenuBar />
//     </>
//   );
// };

// export default ImageDetect;

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
                  <h1 className="font-bold text-lg">📷 Deteksi Makanan Kamu</h1>
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
