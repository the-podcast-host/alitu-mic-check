import { Dispatch, useEffect, useState } from 'react';
import type { PlayerAction } from '../components/Player/PlayerContext';
const useAudioElement = (
  audio: Blob | null,
  audioElement: HTMLAudioElement | null,
  playing: boolean,
  dispatch: Dispatch<PlayerAction>,
) => {
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (audio) {
      const audioElement = document.createElement('audio');
      audioElement.src = URL.createObjectURL(audio);

      audioElement.onplay = () => {
        const id = setInterval(() => {
          dispatch({
            type: 'set_audio_time',
            payload: audioElement.currentTime,
          });
        }, 33);
        setIntervalID(id);

        dispatch({ type: 'set_audio_playing', payload: true });
      };

      audioElement.onpause = () => {
        clearInterval(intervalID);
        dispatch({ type: 'set_audio_playing', payload: false });
      };

      audioElement.onended = () => {
        clearInterval(intervalID);
        dispatch({ type: 'set_audio_playing', payload: false });
      };

      dispatch({ type: 'set_audio', payload: audioElement });
    } else if (audioElement) {
      dispatch({ type: 'set_audio', payload: null });
    }
  }, [audio, dispatch]);

  useEffect(() => {
    if (!audioElement) return;

    if (playing) {
      // Restart if audio has ended
      if (audioElement.currentTime === audioElement.duration) {
        audioElement.currentTime = 0;
        dispatch({ type: 'set_audio_time', payload: audioElement.currentTime });
      }
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [audioElement, playing, dispatch]);
};

export default useAudioElement;
