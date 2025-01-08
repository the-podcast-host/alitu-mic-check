async function getAudioDuration(blob: Blob): Promise<number> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result;

      if (!(arrayBuffer instanceof ArrayBuffer)) {
        resolve(0);
      }

      if (!AudioContext) {
        throw new Error('AudioContext is not supported in this browser.');
      }

      const audioContext = new AudioContext();

      try {
        const audioBuffer = await audioContext.decodeAudioData(
          arrayBuffer as ArrayBuffer,
        );

        resolve(audioBuffer.duration);
      } catch (error) {
        console.error('Error decoding audio data', error);
        reject(0);
      }
    };

    reader.readAsArrayBuffer(blob);
  });
}

export default getAudioDuration;
