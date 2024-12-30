import { useReducer } from 'react';
import Layout from '../components/Layout';
import { Heading, Container, Text } from '@chakra-ui/react';
import { reducer, createInitialState } from '../reducers/indexReducer';
import AudioInputSelector from '../components/AudioInputSelector';
import SoundMeter from '../components/SoundMeter';

const IndexPage = () => {
  const [state, dispatch] = useReducer(
    reducer,
    { selectedAudioInput: null },
    createInitialState,
  );

  function handleAudioInputSelected(audioInput: MediaDeviceInfo) {
    dispatch({ type: 'selected_audio_input', payload: audioInput });
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
        <SoundMeter deviceId={state.selectedAudioInput?.deviceId} />
      </Container>
    </Layout>
  );
};

export default IndexPage;
