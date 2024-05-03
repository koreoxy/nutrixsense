/**
 * Class to handle webcam
 */
export class Webcam {
  /**
   * Open webcam and stream it through video tag.
   * @param {React.MutableRefObject<HTMLVideoElement>} videoRef video tag reference
   * @param {() => void} onLoaded callback function to be called when webcam is open
   */
  open = (
    videoRef: React.MutableRefObject<HTMLVideoElement>,
    onLoaded: () => void
  ): void => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => {
          (window as any).localStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              onLoaded();
            };
          }
        });
    } else {
      alert("Can't open Webcam!");
    }
  };

  /**
   * Close opened webcam.
   * @param {React.MutableRefObject<HTMLVideoElement>} videoRef video tag reference
   */
  close = (videoRef: React.MutableRefObject<HTMLVideoElement>): void => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject = null;
      (window as any).localStream
        .getTracks()
        .forEach((track: MediaStreamTrack) => {
          track.stop();
        });
    } else {
      alert("Please open Webcam first!");
    }
  };
}
