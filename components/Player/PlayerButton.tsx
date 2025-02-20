import { useContext } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { AudioState, PlayerContext, PlayerDispatchContext } from './PlayerContext';

interface Props {}

const PlayerButton = ({}: Props) => {
  const { audioState } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatchContext);

  const isPlaying = audioState === AudioState.Playing;

  function handlePlay() {
    dispatch({ type: 'play' });
  }

  function handlePause() {
    dispatch({ type: 'pause' });
  }

  return (
    <IconButton
      color="purple.500"
      bg="gray.200"
      borderRadius="lg"
      _hover={{
        bg: 'gray.100',
        color: 'purple.400',
        _active: { bg: 'gray.300', color: 'purple.600' },
      }}
      // _hover has higher precedence than _active in Chakra-UI
      _active={{ bg: 'gray.300', color: 'purple.600' }}
      onClick={isPlaying ? handlePause : handlePlay}
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
    </IconButton>
  );
};

export default PlayerButton;
