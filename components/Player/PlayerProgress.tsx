import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { ProgressRoot, ProgressBar } from '../ui/progress';
import { PlayerContext } from './PlayerContext';

const PlayerProgress = () => {
  const { audioElement, audioCurrentTime } = useContext(PlayerContext);

  return (
    <Box px={3} flex="1">
      <ProgressRoot
        colorPalette="purple"
        borderRadius="l2"
        min={0}
        max={audioElement?.duration || 1}
        value={audioCurrentTime}
      >
        <ProgressBar borderRadius="l2" />
      </ProgressRoot>
    </Box>
  );
};

export default PlayerProgress;
