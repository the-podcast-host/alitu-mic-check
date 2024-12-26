import { useState, useEffect } from 'react';

const useAudioInputs = () => {
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    (async () => {
      if (
        !navigator.mediaDevices.getUserMedia ||
        !navigator.mediaDevices.enumerateDevices
      ) {
        console.error('MediaDevices API is not supported in this browser');
      }

      // Call getuserMedia first to get populated list from enumerateDevices
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaDevices = await navigator.mediaDevices.enumerateDevices();

      setAudioInputs(
        mediaDevices.filter((device) => device.kind === 'audioinput'),
      );
    })();
  }, []);

  return audioInputs;
};

export default useAudioInputs;
