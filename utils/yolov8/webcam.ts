/**
 * Class to handle webcam
 */
export class Webcam {
  /**
   * Open webcam and stream it through video tag.
   * @param videoRef - video tag reference
   */
  open = (videoRef: HTMLVideoElement): void => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => {
          videoRef.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
          alert("Can't open Webcam!");
        });
    } else {
      alert("Can't open Webcam!");
    }
  };

  /**
   * Close opened webcam.
   * @param videoRef - video tag reference
   */
  close = (videoRef: HTMLVideoElement): void => {
    const stream = videoRef.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.srcObject = null;
    } else {
      alert("Please open Webcam first!");
    }
  };
}
