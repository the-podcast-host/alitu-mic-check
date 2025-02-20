import { createListCollection, SelectValueChangeDetails } from '@chakra-ui/react';
import {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from './ui/select';
import useAudioInputs from '../hooks/useAudioInputs';

interface Props {
  selected: MediaDeviceInfo | null;
  onSelect: (selected: MediaDeviceInfo) => void;
}

interface ListCollectionItem {
  label: string;
  value: string;
}

const AudioInputSelector = ({ selected, onSelect }: Props) => {
  const audioInputs = useAudioInputs();
  const selectedAudioInput = audioInputs.find(
    audioInput => audioInput.deviceId === selected?.deviceId,
  );

  const audioInputsListCollection = createListCollection({
    items: audioInputs.map(audioInput => ({
      value: audioInput.deviceId,
      label: audioInput.label,
    })),
  });

  function handleAudioInputSelected(e: SelectValueChangeDetails) {
    const [selectedDeviceId] = e.value;
    const selectedAudioInput = audioInputs.find(
      audioInput => audioInput.deviceId === selectedDeviceId,
    );

    if (selectedAudioInput) {
      onSelect(selectedAudioInput);
    }
  }

  return (
    <SelectRoot
      value={[selectedAudioInput?.deviceId || '']}
      onValueChange={handleAudioInputSelected}
      collection={audioInputsListCollection}
    >
      <SelectLabel color="text" fontWeight="semibold">
        Microphone
      </SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Pick your mic" />
      </SelectTrigger>
      <SelectContent>
        {audioInputsListCollection.items.map((mic: ListCollectionItem) => (
          <SelectItem item={mic} key={mic.value}>
            {mic.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default AudioInputSelector;
