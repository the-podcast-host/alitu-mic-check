import { Box } from '@chakra-ui/react';
import PlayerProgress from './PlayerProgress';
import PlayerClock from './PlayerClock';

const PlayerTransport = () => {
  return (
    <Box
      display="flex"
      flex="1"
      ml={4}
      p={2}
      bg="gray.200"
      borderRadius="lg"
      alignItems="center"
    >
      <PlayerProgress />
      <PlayerClock />
    </Box>
  );
};

export default PlayerTransport;
