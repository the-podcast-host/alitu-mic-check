import { Dispatch, useEffect, useRef } from 'react';
import type { PlayerAction } from '../components/Player/PlayerContext';
import getAudioDuration from '../utils/getAudioDuration';

const useAudioElement = (
  audio: Blob | null,
  audioElement: HTMLAudioElement | null,
  playing: boolean,
  dispatch: Dispatch<PlayerAction>,
) => {
  const intervalID = useRef<NodeJS.Timeout>();

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
        intervalID.current = id;

        dispatch({ type: 'set_audio_playing', payload: true });
      };

      audioElement.onpause = () => {
        clearInterval(intervalID.current);
        dispatch({ type: 'set_audio_playing', payload: false });
      };

      audioElement.onended = () => {
        clearInterval(intervalID.current);
        dispatch({ type: 'set_audio_playing', payload: false });
      };

      audioElement.onloadedmetadata = async () => {
        if (!audioElement.duration || audioElement.duration === Infinity) {
          try {
            // Disable playback while calculating duration
            dispatch({ type: 'set_disabled', payload: true });

            const duration = await getAudioDuration(audio);
            dispatch({ type: 'set_audio_duration', payload: duration });
          } finally {
            // Ensure playback is enabled, even without proper duration
            dispatch({ type: 'set_disabled', payload: false });
          }
        } else {
          dispatch({
            type: 'set_audio_duration',
            payload: audioElement.duration,
          });
        }
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
