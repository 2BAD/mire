/**
 * Helper function to parse human-readable sizes
 *
 * @param size - The size string to parse.
 * @returns The parsed size in bytes.
 * @throws {Error} If the size string is invalid or cannot be parsed.
 */
export const parseSize = (size: string): number => {
  const units: Record<string, number> = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024
  }
  const match = size.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/)

  if (!match || match.length < 2) {
    throw new Error('Invalid size format')
  }

  const value = Number.parseFloat(match[1] ?? '')
  const unit = match[2] ?? 'b'

  // @ts-expect-error regex handles this
  return Math.floor(value * units[unit])
}
