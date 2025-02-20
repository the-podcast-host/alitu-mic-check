import { Dispatch, useEffect, useRef } from 'react';
import { AudioState, PlayerState, PlayerAction } from '../components/Player/PlayerContext';

const useAudioContext = (
  audio: Blob | null,
  { audioState, audioBuffer, playAt, audioPlayhead }: PlayerState,
  dispatch: Dispatch<PlayerAction>,
) => {
  const audioContext = useRef<AudioContext>();
  const source = useRef<AudioBufferSourceNode>();

  useEffect(() => {
    if (!AudioContext) {
      throw new Error('AudioContext is not supported in this browser.');
    }

    audioContext.current = new AudioContext();
    dispatch({ type: 'set_audio_context', payload: audioContext.current });
  }, [dispatch]);

  useEffect(() => {
    if (!audio || !audioContext.current) return;

    (async () => {
      const reader = new FileReader();

      reader.onload = async event => {
        const arrayBuffer = event.target?.result;

        if (!(arrayBuffer instanceof ArrayBuffer)) {
          throw new Error('Error reading audio data');
        }

        const audioBuffer = await audioContext.current?.decodeAudioData(arrayBuffer);

        if (audioBuffer) {
          dispatch({ type: 'set_audio_buffer', payload: audioBuffer });
        }
      };

      reader.readAsArrayBuffer(audio);
    })();
  }, [audio, dispatch]);

  useEffect(() => {
    if (!audioContext.current) return;

    switch (audioState) {
      case AudioState.Playing:
        if (!audioBuffer) return;
        source.current = audioContext.current.createBufferSource();
        source.current.buffer = audioBuffer;

        source.current.onended = () => {
          dispatch({ type: 'stop' });
        };

        source.current.connect(audioContext.current.destination);
        source.current.start(0, audioPlayhead);
        dispatch({
          type: 'set_play_at',
          payload: audioContext.current.currentTime,
        });
        break;
      case AudioState.Paused:
        source.current?.stop();
        dispatch({
          type: 'set_audio_playhead',
          payload: audioContext.current.currentTime - playAt + audioPlayhead,
        });
        break;
    }
  }, [audioState]);
};

export default useAudioContext;
