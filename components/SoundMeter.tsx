import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import useMediaStream from '../hooks/useMediaStream';
import useAnalyserNode from '../hooks/useAnalyserNode';
import getRMS from '../utils/getRMS';

const MIN_DB = -60;

interface Props {
  deviceId?: string;
}

const SoundMeter = ({ deviceId }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIdRef = useRef<number>(0);
  const audioDataRef = useRef<Uint8Array>();

  const mediaStream = useMediaStream(deviceId);
  const analyserNode = useAnalyserNode(mediaStream);

  const draw = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx && analyserNode && audioDataRef.current) {
      const audioData = audioDataRef.current;
      const width = canvas.width;
      const height = canvas.height;

      const rms = getRMS(audioData);
      const dB = 20 * Math.log10(rms);
      const clamped = Math.max(MIN_DB, Math.min(0, dB));

      const percentage = (clamped - MIN_DB) / (0 - MIN_DB);
      const value = Math.round(percentage * width);

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#883DF4';
      ctx.fillRect(0, 0, value, height);

      analyserNode.getByteTimeDomainData(audioDataRef.current);
    }

    frameIdRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    if (containerRef.current && canvasRef.current) {
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current;
    }
  }, []);

  useEffect(() => {
    if (analyserNode) {
      audioDataRef.current = new Uint8Array(analyserNode.fftSize);
      frameIdRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [analyserNode]);

  return (
    <Box my="4" ref={containerRef}>
      <canvas
        height="24"
        style={{ borderRadius: '10px', background: '#E6EBEF' }}
        ref={canvasRef}
      ></canvas>
    </Box>
  );
};

export default SoundMeter;
