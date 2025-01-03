async function getMediaStream(deviceId: string): Promise<MediaStream> {
  if (!navigator.mediaDevices.getUserMedia) {
    throw new Error('MediaDevices API not support in this browser.');
  }

  const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId,
      noiseSuppression: supportedConstraints.noiseSuppression,
    },
  });

  return mediaStream;
}

export default getMediaStream;
