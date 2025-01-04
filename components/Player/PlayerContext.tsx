import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react';

type PlayerState = {
  playing: boolean;
  audioElement: HTMLAudioElement | null;
};

type PlayerAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'set_audio'; payload: HTMLAudioElement | null };

const defaultPlayerState: PlayerState = {
  playing: false,
  audioElement: null,
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
    case 'play':
      return {
        ...state,
        playing: true,
      };
    case 'pause':
      return {
        ...state,
        playing: false,
      };
    case 'set_audio':
      return {
        ...state,
        audioElement: action.payload,
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

  useEffect(() => {
    if (audio) {
      const audioElement = document.createElement('audio');
      audioElement.src = URL.createObjectURL(audio);
      dispatch({ type: 'set_audio', payload: audioElement });
    } else if (state.audioElement) {
      dispatch({ type: 'set_audio', payload: null });
    }
  }, [audio]);

  return (
    <PlayerContext.Provider value={{ ...state }}>
      <PlayerDispatchContext.Provider value={dispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
}
