import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';
import useAudioElement from '../../hooks/useAudioElement';

type PlayerState = {
  playing: boolean;
  audioElement: HTMLAudioElement | null;
  audioPlaying: boolean;
  audioCurrentTime: number;
};

export type PlayerAction =
  | { type: 'set_playing'; payload: boolean }
  | { type: 'set_audio'; payload: HTMLAudioElement | null }
  | { type: 'set_audio_playing'; payload: boolean }
  | { type: 'set_audio_time'; payload: number };

const defaultPlayerState: PlayerState = {
  playing: false,
  audioElement: null,
  audioPlaying: false,
  audioCurrentTime: 0,
};

const defaultDispatch: Dispatch<PlayerAction> = () => {
  console.warn('PlayerContext used outside of PlayerProvider');
};

function createInitialState(
  initialState: PlayerState = defaultPlayerState,
): PlayerState {
  return {
    ...defaultPlayerState,
    ...initialState,
  };
}

function reducer(state: PlayerState, action: PlayerAction) {
  switch (action.type) {
    case 'set_playing':
      return {
        ...state,
        playing: action.payload,
      };
    case 'set_audio':
      return {
        ...state,
        audioElement: action.payload,
      };
    case 'set_audio_playing':
      return {
        ...state,
        playing: action.payload,
        audioPlaying: action.payload,
      };
    case 'set_audio_time':
      return {
        ...state,
        audioCurrentTime: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export const PlayerContext = createContext<PlayerState>(defaultPlayerState);
export const PlayerDispatchContext =
  createContext<Dispatch<PlayerAction>>(defaultDispatch);

interface Props {
  audio: Blob | null;
}

export function PlayerProvider({ audio, children }: PropsWithChildren<Props>) {
  const [state, dispatch] = useReducer(
    reducer,
    defaultPlayerState,
    createInitialState,
  );

  useAudioElement(audio, state.audioElement, state.playing, dispatch);

  return (
    <PlayerContext.Provider value={{ ...state }}>
      <PlayerDispatchContext.Provider value={dispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
}
