import { useState } from 'react';
import {
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  createListCollection,
  SelectValueChangeDetails,
} from '@chakra-ui/react';
import useAudioInputs from '../hooks/useAudioInputs';

interface ListCollectionItem {
  label: string;
  value: string;
}

const MicSelector = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const audioInputs = useAudioInputs();
  const microphones = createListCollection({
    items: audioInputs.map((audioInput) => ({
      value: audioInput.deviceId,
      label: audioInput.label,
    })),
  });

  function handleMicSelected(e: SelectValueChangeDetails) {
    setSelected(e.value);
  }

  return (
    <SelectRoot
      value={selected}
      onValueChange={handleMicSelected}
      collection={microphones}
    >
      <SelectLabel>Microphone</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Pick your mic" />
      </SelectTrigger>
      <SelectContent>
        {microphones.items.map((mic: ListCollectionItem) => (
          <SelectItem item={mic} key={mic.value}>
            {mic.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default MicSelector;
