import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import useAudioContext from '../../hooks/useAudioContext';

export enum AudioState {
  Stopped,
  Playing,
  Paused,
}

export type PlayerState = {
  audioContext: AudioContext | null;
  audioBuffer: AudioBuffer | null;
  audioState: AudioState;
  playAt: number;
  audioElement: HTMLAudioElement | null;
  audioPlayhead: number;
};

export type PlayerAction =
  | { type: 'set_audio_context'; payload: AudioContext }
  | { type: 'set_audio_buffer'; payload: AudioBuffer }
  | { type: 'play' }
  | { type: 'set_play_at'; payload: number }
  | { type: 'pause' }
  | { type: 'set_audio_playhead'; payload: number }
  | { type: 'stop' };

const defaultPlayerState: PlayerState = {
  audioContext: null,
  audioBuffer: null,
  audioState: AudioState.Stopped,
  playAt: 0,
  audioElement: null,
  audioPlayhead: 0,
};

const defaultDispatch: Dispatch<PlayerAction> = () => {
  console.warn('PlayerContext used outside of PlayerProvider');
};

function createInitialState(initialState: PlayerState = defaultPlayerState): PlayerState {
  return {
    ...defaultPlayerState,
    ...initialState,
  };
}

function reducer(state: PlayerState, action: PlayerAction) {
  switch (action.type) {
    case 'set_audio_context':
      return {
        ...state,
        audioContext: action.payload,
      };
    case 'set_audio_buffer':
      return {
        ...state,
        audioBuffer: action.payload,
        playAt: 0,
        audioPlayhead: 0,
      };
    case 'play':
      return {
        ...state,
        audioState: AudioState.Playing,
      };
    case 'set_play_at': {
      return {
        ...state,
        playAt: action.payload,
      };
    }
    case 'pause':
      return {
        ...state,
        audioState: AudioState.Paused,
      };
    case 'stop':
      return {
        ...state,
        audioState: AudioState.Stopped,
        ...(state.audioState === AudioState.Playing && {
          playAt: 0,
          audioPlayhead: 0,
        }),
      };
    case 'set_audio_playhead':
      return {
        ...state,
        audioPlayhead: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export const PlayerContext = createContext<PlayerState>(defaultPlayerState);
export const PlayerDispatchContext = createContext<Dispatch<PlayerAction>>(defaultDispatch);

interface Props {
  audio: Blob | null;
}

export function PlayerProvider({ audio, children }: PropsWithChildren<Props>) {
  const [state, dispatch] = useReducer(reducer, defaultPlayerState, createInitialState);

  useAudioContext(audio, state, dispatch);

  return (
    <PlayerContext.Provider value={{ ...state }}>
      <PlayerDispatchContext.Provider value={dispatch}>{children}</PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
}
