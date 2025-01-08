import { useContext } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { PlayerContext, PlayerDispatchContext } from './PlayerContext';

interface Props {}

const PlayerButton = ({}: Props) => {
  const { audioPlaying, disabled } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatchContext);

  function handlePlay() {
    dispatch({ type: 'set_playing', payload: true });
  }

  function handlePause() {
    dispatch({ type: 'set_playing', payload: false });
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
      onClick={audioPlaying ? handlePause : handlePlay}
      disabled={disabled}
    >
      {audioPlaying ? <FaPause /> : <FaPlay />}
    </IconButton>
  );
};

export default PlayerButton;
