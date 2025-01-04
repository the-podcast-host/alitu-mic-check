import { useContext } from 'react';
import { defineRecipe, useRecipe, IconButton } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { PlayerContext, PlayerDispatchContext } from './PlayerContext';

const buttonRecipe = defineRecipe({
  base: {
    color: 'purple.500',
    bg: 'gray.200',
    _hover: {
      bg: 'gray.100',
      color: 'purple.400',
      // _hover has higher precedence than _active in Chakra-UI
      _active: { bg: 'gray.300', color: 'purple.600' },
    },
    _active: { bg: 'gray.300', color: 'purple.600' },
  },
});

interface Props {}

const PlayerButton = ({}: Props) => {
  const { playing, audioElement } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatchContext);

  const recipe = useRecipe({ recipe: buttonRecipe });
  const styles = recipe({});

  function handlePlay() {
    audioElement?.play();
    dispatch({ type: 'play' });
  }

  function handlePause() {
    audioElement?.pause();
    dispatch({ type: 'pause' });
  }

  return (
    <IconButton css={styles} onClick={playing ? handlePause : handlePlay}>
      {playing ? <FaPause /> : <FaPlay />}
    </IconButton>
  );
};

export default PlayerButton;
