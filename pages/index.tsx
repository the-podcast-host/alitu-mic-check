import { useReducer } from 'react';
import Layout from '../components/Layout';
import { Heading, Container, Text } from '@chakra-ui/react';
import { reducer, createInitialState } from '../reducers/indexReducer';
import AudioInputSelector from '../components/AudioInputSelector';
import SoundMeter from '../components/SoundMeter';
import Recorder from '../components/Recorder';
import getMediaStream from '../utils/getMediaStream';

const IndexPage = () => {
  const [state, dispatch] = useReducer(
    reducer,
    { selectedAudioInput: null, mediaStream: null, audioURL: null },
    createInitialState,
  );

  async function handleAudioInputSelected(audioInput: MediaDeviceInfo) {
    dispatch({ type: 'selected_audio_input', payload: audioInput });

    if (state.mediaStream) {
      state.mediaStream.getTracks().forEach((track) => track.stop());
    }

    if (audioInput) {
      const mediaStream = await getMediaStream(audioInput.deviceId);
      dispatch({ type: 'set_media_stream', payload: mediaStream });
    }
  }

  function handleRecorderStop(blob: Blob) {
    const audioURL = URL.createObjectURL(blob);
    dispatch({ type: 'create_recording', payload: audioURL });
  }

  return (
    <Layout>
      <Container centerContent maxW="lg">
        <Heading as="h1" size="6xl" paddingTop={16}>
          Mic Check
        </Heading>
        <Text textAlign="center" textStyle="lg" fontWeight="medium">
          Testing one two 🎤 Is this thing on? Let's make sure you're setup to
          sound your best!
        </Text>
      </Container>
      <Container mt="16" maxW="sm">
        <AudioInputSelector
          selected={state.selectedAudioInput}
          onSelect={handleAudioInputSelected}
        />
        <SoundMeter stream={state.mediaStream} />
        <Recorder stream={state.mediaStream} onStop={handleRecorderStop} />
      </Container>
    </Layout>
  );
};

export default IndexPage;
