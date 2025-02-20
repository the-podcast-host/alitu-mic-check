import { useContext, useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ProgressRoot, ProgressBar } from '../ui/progress';
import { AudioState, PlayerContext } from './PlayerContext';

const PlayerProgress = () => {
  const { audioBuffer, audioContext, audioState, playAt, audioPlayhead } = useContext(PlayerContext);
  const interval = useRef<NodeJS.Timeout>();
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (audioState === AudioState.Playing) {
      interval.current = setInterval(() => {
        if (audioContext?.currentTime) {
          setValue(audioContext.currentTime - playAt + audioPlayhead);
        }
      }, 33);
    } else if (audioState === AudioState.Paused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, [interval, audioContext, audioState, playAt, audioPlayhead]);
  
  return (
    <Box px={3} flex="1">
      <ProgressRoot
        colorPalette="purple"
        borderRadius="l2"
        min={0}
        max={audioBuffer?.duration ?? 1}
        value={value}
      >
        <ProgressBar borderRadius="l2" transitionDuration="fastest"/>
      </ProgressRoot>
    </Box>
  );
};

export default PlayerProgress;
