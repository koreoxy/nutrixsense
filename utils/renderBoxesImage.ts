//============
// export const renderBoxesImage = (
//   canvasRef: React.MutableRefObject<HTMLCanvasElement>,
//   threshold: number,
//   boxes_data: number[][],
//   scores_data: number[],
//   classes_data: number[],
//   labels: string[] // Tambahkan parameter labels
// ): void => {
//   const ctx: CanvasRenderingContext2D | null =
//     canvasRef.current?.getContext("2d");

//   if (!ctx) return;

//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

//   // font configs
//   const font: string = "30px sans-serif";
//   ctx.font = font;
//   ctx.textBaseline = "top";

//   // Sort the boxes based on scores in descending order
//   const sortedBoxes = scores_data
//     .map((score, index) => ({ score, index }))
//     .sort((a, b) => b.score - a.score);

//   // Draw the bounding boxes and labels for the top 5 scores
//   for (let i = 0; i < Math.min(5, sortedBoxes.length); i++) {
//     const scoreIndex = sortedBoxes[i].index;
//     const score = sortedBoxes[i].score;

//     if (score > threshold) {
//       const klass: string = labels[classes_data[scoreIndex]];
//       const scoreStr: string = (score * 100).toFixed(1);

//       let [x1, y1, x2, y2]: number[] = xywh2xyxy(boxes_data[scoreIndex]);

//       const width: number = x2 - x1;
//       const height: number = y2 - y1;

//       // Draw the bounding box.
//       ctx.strokeStyle = "#B033FF";
//       ctx.lineWidth = 2;
//       ctx.strokeRect(x1, y1, width, height);

//       // Draw the label background.
//       ctx.fillStyle = "#B033FF";
//       const textWidth: number = ctx.measureText(
//         klass + " - " + scoreStr + "%"
//       ).width;
//       const textHeight: number = parseInt(font, 10); // base 10
//       ctx.fillRect(
//         x1 - 1,
//         y1 - (textHeight + 10),
//         textWidth + 10,
//         textHeight + 10
//       );

//       // Draw labels
//       ctx.fillStyle = "#ffffff";
//       ctx.fillText(
//         klass + " - " + scoreStr + "%",
//         x1 - 1,
//         y1 - (textHeight + 2)
//       );
//     }
//   }
// };
//================

type Box = [number, number, number, number];

function xywh2xyxy(x: Box): Box {
  //Convert boxes from [x, y, w, h] to [x1, y1, x2, y2] where xy1=top-left, xy2=bottom-right
  const y: Box = [];
  y[0] = x[0] - x[2] / 2; //top left x
  y[1] = x[1] - x[3] / 2; //top left y
  y[2] = x[0] + x[2] / 2; //bottom right x
  y[3] = x[1] + x[3] / 2; //bottom right y
  return y;
}

export const renderBoxesImage = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  threshold: number,
  boxes_data: Box[],
  scores_data: number[],
  classes_data: number[],
  labels: string[]
): void => {
  const ctx = canvasRef.current!.getContext("2d");

  if (!ctx) {
    console.error("Canvas context not available");
    return;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

  // font configs
  const font = "25px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  const sortedBoxes: { score: number; box: Box }[] = [];

  // Combine boxes with their scores
  for (let i = 0; i < scores_data.length; ++i) {
    if (scores_data[i] > threshold) {
      sortedBoxes.push({ score: scores_data[i], box: boxes_data[i] });
    }
  }

  // Sort boxes by score (highest to lowest)
  sortedBoxes.sort((a, b) => b.score - a.score);

  // Limit to top 5 boxes
  const top5Boxes = sortedBoxes.slice(0, 5);

  // Draw the top 5 boxes
  for (const { score, box } of top5Boxes) {
    const klass = labels[classes_data[boxes_data.indexOf(box)]];

    let [x1, y1, x2, y2] = xywh2xyxy(box);

    const width = x2 - x1;
    const height = y2 - y1;

    // Adjust the coordinates to center the stroke box
    x1 -= width / 12;
    y1 -= height / 12;
    x2 -= width / 12;
    y2 -= height / 12;

    // Draw the bounding box.
    ctx.strokeStyle = "#B033FF";
    ctx.lineWidth = 2;
    ctx.strokeRect(x1, y1, width, height);

    // Draw the label background.
    ctx.fillStyle = "#B033FF";
    const textWidth = ctx.measureText(
      klass + " - " + (score * 100).toFixed(1) + "%"
    ).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x1 - 1, y1 - (textHeight + 2), textWidth + 2, textHeight + 2);

    // Draw labels
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      klass + " - " + (score * 100).toFixed(1) + "%",
      x1 - 1,
      y1 - (textHeight + 2)
    );
  }
};
