import { useEffect, useRef, useState } from 'react';

const useMediaRecorder = (stream: MediaStream | null) => {
  const mediaRecorderRef = useRef<MediaRecorder>();
  const [blob, setBlob] = useState<Blob>();

  function start() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
    }
  }

  function stop() {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }

  useEffect(() => {
    if (!stream) return;

    // Prefer opus codec in webm container
    const options = {
      ...(MediaRecorder.isTypeSupported('audio/webm;codecs=opus') && { mimeType: 'audio/webm;codecs=opus'})
    };

    MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
    mediaRecorderRef.current = new MediaRecorder(stream, options);
    const mediaRecorder = mediaRecorderRef.current;
    console.log('MediaRecorder:', mediaRecorder);

    mediaRecorder.onstart = (e) => {
      console.log('MediaRecorder: ', mediaRecorder.state);
    };

    mediaRecorder.onstop = (e) => {
      console.log('MediaRecorder:', mediaRecorder.state);
    };

    mediaRecorder.onerror = (e) => {
      console.error('MediaRecorder:', e.error);
    };

    mediaRecorder.ondataavailable = (e) => {
      console.log('MediaRecorder:', e.data);
      setBlob(e.data);
    };
  }, [stream]);

  return { start, stop, blob };
};

export default useMediaRecorder;
