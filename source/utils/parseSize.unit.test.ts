import { describe, expect, it } from 'vitest'
import { parseSize } from './parseSize.ts' // Adjust the import path as needed

describe('parseSize', () => {
  it('should parse bytes correctly', () => {
    expect.assertions(3)

    expect(parseSize('100b')).toBe(100)
    expect(parseSize('100B')).toBe(100)
    expect(parseSize('100')).toBe(100)
  })

  it('should parse kilobytes correctly', () => {
    expect.assertions(3)

    expect(parseSize('1kb')).toBe(1024)
    expect(parseSize('1KB')).toBe(1024)
    expect(parseSize('1.5kb')).toBe(1536)
  })

  it('should parse megabytes correctly', () => {
    expect.assertions(3)

    expect(parseSize('1mb')).toBe(1048576)
    expect(parseSize('1MB')).toBe(1048576)
    expect(parseSize('2.5mb')).toBe(2621440)
  })

  it('should parse gigabytes correctly', () => {
    expect.assertions(3)

    expect(parseSize('1gb')).toBe(1073741824)
    expect(parseSize('1GB')).toBe(1073741824)
    expect(parseSize('0.5gb')).toBe(536870912)
  })

  it('should handle whitespace', () => {
    expect.assertions(3)

    expect(parseSize('100 b')).toBe(100)
    expect(parseSize('1 kb')).toBe(1024)
    expect(parseSize('1   MB')).toBe(1048576)
  })

  it('should throw an error for invalid size format', () => {
    expect.assertions(3)

    expect(() => parseSize('100x')).toThrow('Invalid size format')
    expect(() => parseSize('kb')).toThrow('Invalid size format')
    expect(() => parseSize('')).toThrow('Invalid size format')
  })

  it('should round down to nearest integer', () => {
    expect.assertions(2)

    expect(parseSize('1.7b')).toBe(1)
    expect(parseSize('2.8kb')).toBe(2867)
  })
})
