import * as tf from "@tensorflow/tfjs";
import { renderBoxes } from "./renderBox";
import labels from "./labels.json";

type AnyTensor = tf.Tensor<any>;

const numClass: number = (labels as any).length;

/**
 * Preprocess image / frame before forwarded into the model
 * @param source HTMLVideoElement | HTMLImageElement
 * @param modelWidth Number
 * @param modelHeight Number
 * @returns [input: AnyTensor, xRatio: number, yRatio: number]
 */
const preprocess = (
  source: HTMLVideoElement | HTMLImageElement,
  modelWidth: number,
  modelHeight: number
): [AnyTensor, number, number] => {
  let xRatio: number, yRatio: number; // ratios for boxes

  const input: AnyTensor = tf.tidy(() => {
    const img: AnyTensor = tf.browser.fromPixels(source);

    // padding image to square => [n, m] to [n, n], n > m
    const [h, w] = img.shape.slice(0, 2); // get source width and height
    const maxSize = Math.max(w, h); // get max size
    const imgPadded = img.pad([
      [0, maxSize - h], // padding y [bottom only]
      [0, maxSize - w], // padding x [right only]
      [0, 0],
    ]);

    xRatio = maxSize / w; // update xRatio
    yRatio = maxSize / h; // update yRatio

    return tf.image
      .resizeBilinear(imgPadded, [modelWidth, modelHeight]) // resize frame
      .div(255.0) // normalize
      .expandDims(0); // add batch
  });

  return [input, xRatio, yRatio];
};

/**
 * Function run inference and do detection from source.
 * @param source HTMLImageElement | HTMLVideoElement
 * @param model tf.GraphModel loaded YOLOv8 tensorflow.js model
 * @param canvasRef HTMLCanvasElement canvas reference
 * @param setDetections React.Dispatch<React.SetStateAction<DetectionResult[]>>
 * @param callback VoidFunction function to run after detection process
 */
export const detect = async (
  source: HTMLImageElement | HTMLVideoElement,
  model: tf.GraphModel,
  canvasRef: HTMLCanvasElement,
  setDetections: React.Dispatch<React.SetStateAction<DetectionResult[]>>,
  callback: () => void = () => {}
): Promise<void> => {
  const [modelWidth, modelHeight] = model.inputShape.slice(1, 3); // get model width and height

  tf.engine().startScope(); // start scoping tf engine
  const [input, xRatio, yRatio] = preprocess(source, modelWidth, modelHeight); // preprocess image

  const res = model.net.execute(input); // inference model
  const transRes = res.transpose([0, 2, 1]); // transpose result [b, det, n] => [b, n, det]
  const boxes = tf.tidy(() => {
    const w = transRes.slice([0, 0, 2], [-1, -1, 1]); // get width
    const h = transRes.slice([0, 0, 3], [-1, -1, 1]); // get height
    const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2)); // x1
    const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2)); // y1
    return tf
      .concat(
        [
          y1,
          x1,
          tf.add(y1, h), //y2
          tf.add(x1, w), //x2
        ],
        2
      )
      .squeeze();
  }); // process boxes [y1, x1, y2, x2]

  const [scores, classes] = tf.tidy(() => {
    // class scores
    const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze(0); // #6 only squeeze axis 0 to handle only 1 class models
    return [rawScores.max(1), rawScores.argMax(1)];
  }); // get max scores and classes index

  const nms = await tf.image.nonMaxSuppressionAsync(
    boxes,
    scores,
    500,
    0.45,
    0.2
  ); // NMS to filter boxes

  const boxes_data = boxes.gather(nms, 0).dataSync(); // indexing boxes by nms index
  const scores_data = scores.gather(nms, 0).dataSync(); // indexing scores by nms index
  const classes_data = classes.gather(nms, 0).dataSync(); // indexing classes by nms index

  const detectionResults = Array.from(scores_data).map((score, index) => ({
    className: labels[classes_data[index]],
    score: score,
  }));

  setDetections(detectionResults);

  renderBoxes(canvasRef, boxes_data, scores_data, classes_data, [
    xRatio,
    yRatio,
  ]); // render boxes
  tf.dispose([res, transRes, boxes, scores, classes, nms]); // clear memory

  callback();

  tf.engine().endScope(); // end of scoping
};

/**
 * Function to detect video from every source.
 * @param vidSource HTMLVideoElement video source
 * @param model tf.GraphModel loaded YOLOv8 tensorflow.js model
 * @param canvasRef HTMLCanvasElement canvas reference
 * @param setDetections React.Dispatch<React.SetStateAction<DetectionResult[]>>
 */
export const detectVideo = (
  vidSource: HTMLVideoElement,
  model: tf.GraphModel,
  canvasRef: HTMLCanvasElement,
  setDetections: React.Dispatch<React.SetStateAction<DetectionResult[]>>
): void => {
  /**
   * Function to detect every frame from video
   */
  const detectFrame = async () => {
    if (vidSource.videoWidth === 0 && vidSource.srcObject === null) {
      const ctx = canvasRef.getContext("2d");
      ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas
      return; // handle if source is closed
    }

    detect(vidSource, model, canvasRef, setDetections, () => {
      requestAnimationFrame(detectFrame); // get another frame
    });
  };

  detectFrame(); // initialize to detect every frame
};
