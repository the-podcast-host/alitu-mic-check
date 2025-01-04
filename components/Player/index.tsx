import { Box } from '@chakra-ui/react';
import { PlayerProvider } from './PlayerContext';
import PlayerButton from './PlayerButton';

interface Props {
  audio: Blob | null;
}

const Player = ({ audio }: Props) => {
  return (
    <PlayerProvider audio={audio}>
      <Box mt={16}>
        <PlayerButton />
      </Box>
    </PlayerProvider>
  );
};

export default Player;
