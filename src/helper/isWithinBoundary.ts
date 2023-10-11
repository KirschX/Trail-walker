export default function isWithinBoundary(
  value: number,
  min?: number,
  max?: number
): boolean {
  if (min !== undefined && max !== undefined) {
    return value > min && value < max;
  }
  return false;
}
