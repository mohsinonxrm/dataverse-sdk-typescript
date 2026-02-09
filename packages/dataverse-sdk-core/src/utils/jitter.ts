export function withJitter(ms: number): number {
  // +/- 20% jitter
  const factor = 0.8 + Math.random() * 0.4;
  return Math.floor(ms * factor);
}
