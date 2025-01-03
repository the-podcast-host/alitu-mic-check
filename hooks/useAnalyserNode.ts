import { useEffect, useState } from 'react';

const useAnalyserNode = (mediaStream?: MediaStream | null) => {
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode>();

  useEffect(() => {
    if (!AudioContext) {
      throw new Error('AudioContext is not supported in this browser.');
    }

    setAudioContext(new AudioContext());
  }, []);

  useEffect(() => {
    if (!audioContext || !mediaStream) return;
    const analyser = audioContext?.createAnalyser();
    const streamSource = audioContext?.createMediaStreamSource(mediaStream);

    streamSource?.connect(analyser);

    setAnalyserNode(analyser);
  }, [audioContext, mediaStream]);

  return analyserNode;
};

export default useAnalyserNode;
