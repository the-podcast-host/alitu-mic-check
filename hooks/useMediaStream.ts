import { useEffect, useState } from 'react';

const useMediaStream = (deviceId?: string) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();

  useEffect(() => {
    (async () => {
      if (!deviceId) return;

      if (!navigator.mediaDevices.getUserMedia) {
        throw new Error('MediaDevices API not supported in this browser');
      }

      const supportedConstraints =
        navigator.mediaDevices.getSupportedConstraints();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId,
          noiseSuppression: supportedConstraints.noiseSuppression,
        },
      });
      console.log('MediaStream:', stream);
      setMediaStream(stream);

      return () => {
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
      }
    })();
  }, [deviceId]);

  return mediaStream;
};

export default useMediaStream;
