import { Box } from '@chakra-ui/react';
import { PlayerProvider } from './PlayerContext';
import PlayerButton from './PlayerButton';
import PlayerTransport from './PlayerTransport';

interface Props {
  audio: Blob | null;
}

const Player = ({ audio }: Props) => {
  return (
    <PlayerProvider audio={audio}>
      <Box display="flex" mt={16}>
        <PlayerButton />
        <PlayerTransport />
      </Box>
    </PlayerProvider>
  );
};

export default Player;
