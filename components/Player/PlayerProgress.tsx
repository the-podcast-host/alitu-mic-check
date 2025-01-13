import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { ProgressRoot, ProgressBar } from '../ui/progress';
import { PlayerContext } from './PlayerContext';

const PlayerProgress = () => {
  const { audioDuration, audioCurrentTime } = useContext(PlayerContext);

  return (
    <Box px={3} flex="1">
      <ProgressRoot
        colorPalette="purple"
        borderRadius="l2"
        min={0}
        max={audioDuration || 1}
        value={audioCurrentTime}
      >
        <ProgressBar borderRadius="l2" transitionDuration="33" />
      </ProgressRoot>
    </Box>
  );
};

export default PlayerProgress;
