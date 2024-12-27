type State = {
  selectedAudioInput: MediaDeviceInfo | null;
};

type Action = { type: 'selected_audio_input'; payload: MediaDeviceInfo };

export function createInitialState(initialState: State): State {
  return {
    ...initialState,
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selected_audio_input':
      return {
        ...state,
        selectedAudioInput: action.payload,
      };
    default:
      return state;
  }
}
