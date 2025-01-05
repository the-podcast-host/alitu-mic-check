import { useContext, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { PlayerContext } from './PlayerContext';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '--:--';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

const PlayerClock = () => {
  const { audioElement, audioCurrentTime } = useContext(PlayerContext);

  return (
    <Box fontSize="sm">
      {audioElement ? formatTime(audioCurrentTime) : '--:--'}
    </Box>
  );
};

export default PlayerClock;
