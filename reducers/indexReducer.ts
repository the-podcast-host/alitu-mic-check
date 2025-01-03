type State = {
  selectedAudioInput: MediaDeviceInfo | null;
  mediaStream: MediaStream | null;
  audioURL: string | null;
};

type Action =
  | { type: 'selected_audio_input'; payload: MediaDeviceInfo }
  | { type: 'set_media_stream'; payload: MediaStream }
  | { type: 'create_recording'; payload: string };

export function createInitialState(initialState: State): State {
  return {
    ...initialState,
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selected_audio_input':
      console.log('MediaDevice:', action.payload);
      return {
        ...state,
        selectedAudioInput: action.payload,
      };
    case 'set_media_stream':
      console.log('MediaStream:', action.payload);
      return {
        ...state,
        mediaStream: action.payload,
      };
    case 'create_recording':
      console.log('audioURL:', action.payload);
      return {
        ...state,
        audioURL: action.payload,
      };
    default:
      return state;
  }
}
