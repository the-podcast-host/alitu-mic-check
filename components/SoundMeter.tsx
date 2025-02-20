import { useCallback, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import useAnalyserNode from '../hooks/useAnalyserNode';
import getRMS from '../utils/getRMS';

const MIN_DB = -60;
const SMOOTHING_FACTOR = 0.2;

interface Props {
  stream: MediaStream | null;
}

const SoundMeter = ({ stream }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIdRef = useRef<number>(0);
  const audioDataRef = useRef<Uint8Array>();
  const prevValueRef = useRef(0);

  const analyserNode = useAnalyserNode(stream);

  const draw = useCallback(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const prevValue = prevValueRef.current;

    if (ctx && analyserNode && audioDataRef.current) {
      const audioData = audioDataRef.current;
      const width = canvas.width;
      const height = canvas.height;

      const rms = getRMS(audioData);
      const dB = 20 * Math.log10(rms);
      const clamped = Math.max(MIN_DB, Math.min(0, dB));

      const percentage = (clamped - MIN_DB) / (0 - MIN_DB);
      const currentValue = Math.round(percentage * width);

      const value = prevValue + (currentValue - prevValue) * SMOOTHING_FACTOR;
      prevValueRef.current = value;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#883DF4';
      ctx.fillRect(0, 0, value, height);

      analyserNode.getByteTimeDomainData(audioDataRef.current);
    }

    frameIdRef.current = requestAnimationFrame(draw);
  }, [analyserNode]);

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
  }, [analyserNode, draw]);

  return (
    <Box
      my="4"
      ref={containerRef}
      css={{ '--border-radius': 'radii.lg', '--background': 'colors.gray.200' }}
    >
      <canvas
        height="24"
        style={{
          borderRadius: 'var(--border-radius)',
          background: 'var(--background)',
        }}
        ref={canvasRef}
      ></canvas>
    </Box>
  );
};

export default SoundMeter;
