function getRMS(data: Uint8Array): number {
  const sumOfSquares = data.reduce((acc, val) => {
    const normalized = (val - 128) / 128;
    return acc + normalized * normalized;
  }, 0);

  const rms = Math.sqrt(sumOfSquares / data.length);
  return rms;
}

export default getRMS;
