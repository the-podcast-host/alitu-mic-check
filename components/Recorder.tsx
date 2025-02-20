import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { FaCircle, FaSquare } from 'react-icons/fa6';
import { Button } from './ui/button';
import useMediaRecorder from '../hooks/useMediaRecorder';

/**
 * Props interface for the Recorder component.
 * @interface Props
 * @property {MediaStream | null} stream
 * @property {function} onStop Callback must be memoized in the parent component. to prevent render loop.
 */
interface Props {
  stream: MediaStream | null;
  onStop: (blob: Blob) => void;
}

const Recorder = ({ stream, onStop }: Props) => {
  const [recording, setRecording] = useState<boolean>(false);
  const mediaRecorder = useMediaRecorder(stream);

  function handleStartRecording() {
    setRecording(true);
    mediaRecorder.start();
  }

  function handleStopRecording() {
    setRecording(false);
    mediaRecorder.stop();
  }

  useEffect(() => {
    if (mediaRecorder.blob) {
      onStop(mediaRecorder.blob);
    }
  }, [mediaRecorder.blob, onStop]);

  return (
    <Box>
      <Button
        size="lg"
        width="100%"
        colorPalette="red"
        disabled={!stream}
        onClick={recording ? handleStopRecording : handleStartRecording}
      >
        {recording ? <FaSquare /> : <FaCircle />}
        {recording ? 'Stop recording' : 'Start recording'}
      </Button>
    </Box>
  );
};

export default Recorder;
