function xywh2xyxy(x: number[]): number[] {
  //Convert boxes from [x, y, w, h] to [x1, y1, x2, y2] where xy1=top-left, xy2=bottom-right
  const y: number[] = [];
  y[0] = x[0] - x[2] / 2; //top left x
  y[1] = x[1] - x[3] / 2; //top left y
  y[2] = x[0] + x[2] / 2; //bottom right x
  y[3] = x[1] + x[3] / 2; //bottom right y
  return y;
}

export function non_max_suppression(
  res: number[][],
  conf_thresh: number = 0.5,
  iou_thresh: number = 0.2,
  max_det: number = 300
): number[][] {
  // Initialize an empty list to store the selected boxes
  const selected_detections: number[][] = [];

  for (let i = 0; i < res.length; i++) {
    // Check if the box has sufficient score to be selected
    if (res[i][4] < conf_thresh) {
      continue;
    }

    const box: number[] = res[i].slice(0, 4);
    const cls_detections: number[] = res[i].slice(5);
    const klass: number = cls_detections.reduce(
      (imax, x, i, arr) => (x > arr[imax] ? i : imax),
      0
    );
    const score: number = res[i][klass + 5];

    let object: number[] = xywh2xyxy(box);
    let addBox: boolean = true;

    // Check for overlap with previously selected boxes
    for (let j = 0; j < selected_detections.length; j++) {
      let selectedBox: number[] = xywh2xyxy(selected_detections[j]);

      // Calculate the intersection and union of the two boxes
      let intersectionXmin: number = Math.max(object[0], selectedBox[0]);
      let intersectionYmin: number = Math.max(object[1], selectedBox[1]);
      let intersectionXmax: number = Math.min(object[2], selectedBox[2]);
      let intersectionYmax: number = Math.min(object[3], selectedBox[3]);
      let intersectionWidth: number = Math.max(
        0,
        intersectionXmax - intersectionXmin
      );
      let intersectionHeight: number = Math.max(
        0,
        intersectionYmax - intersectionYmin
      );
      let intersectionArea: number = intersectionWidth * intersectionHeight;
      let boxArea: number = (object[2] - object[0]) * (object[3] - object[1]);
      let selectedBoxArea: number =
        (selectedBox[2] - selectedBox[0]) * (selectedBox[3] - selectedBox[1]);
      let unionArea: number = boxArea + selectedBoxArea - intersectionArea;

      // Calculate the IoU and check if the boxes overlap
      let iou: number = intersectionArea / unionArea;
      if (iou >= iou_thresh) {
        addBox = false;
        break;
      }
    }

    // Add the box to the selected boxes list if it passed the overlap check
    if (addBox) {
      const row: number[] = box.concat(score, klass);
      selected_detections.push(row);
    }
  }

  return selected_detections;
}
