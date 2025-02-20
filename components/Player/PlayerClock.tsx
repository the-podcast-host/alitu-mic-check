import { useContext, useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { AudioState, PlayerContext } from './PlayerContext';

function formatTime(seconds: number | null): string {
  if (seconds === null || isNaN(seconds) || seconds < 0) return '--:--';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

const PlayerClock = () => {
  const { audioContext, audioState, playAt, audioPlayhead } = useContext(PlayerContext);
  const interval = useRef<NodeJS.Timeout>();
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    if (audioState === AudioState.Playing) {
      interval.current = setInterval(() => {
        if (audioContext?.currentTime) {
          setTime(audioContext.currentTime - playAt + audioPlayhead);
        }
      }, 100);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [audioState, audioContext, playAt, audioPlayhead]);

  return <Box fontSize="sm" fontFeatureSettings="'tnum'">{formatTime(time)}</Box>;
};

export default PlayerClock;
