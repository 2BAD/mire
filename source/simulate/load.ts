import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { parseSize } from '../utils/parseSize.ts'

const MAX_DELAY = 5000
const memoryLeaks: unknown[] = []

/**
 * Simulates a delayed response.
 *
 * @param ms - The delay in milliseconds. If not provided, a random delay up to MAX_DELAY will be used.
 * @returns A promise that resolves to a string describing the delay.
 */
export const delayResponse = async (ms: number): Promise<string> => {
  const delay = ms || Math.trunc(Math.random() * MAX_DELAY)
  await new Promise((resolve) => setTimeout(resolve, delay))
  return `Response delayed by ${delay} ms\n`
}

/**
 * Computes the Fibonacci number for a given input.
 *
 * @param n - The index of the Fibonacci number to compute.
 * @returns A string describing the computed Fibonacci number.
 */
export const computeFibonacci = (n: number): string => {
  // eslint-disable-next-line jsdoc/require-jsdoc
  const fibonacci = (num: number): number => {
    if (num <= 1) return num
    return fibonacci(num - 1) + fibonacci(num - 2)
  }

  const result = fibonacci(n)
  return `Fibonacci(${n}) = ${result}\n`
}

/**
 * Simulates CPU load for a specified duration and maximum load.
 *
 * @param duration - The duration of the simulation in milliseconds.
 * @param maxLoad - The maximum CPU load to simulate (percentage).
 * @returns A promise that resolves to a string describing the average CPU load.
 */
export const simulateCPULoad = async (duration: number, maxLoad: number): Promise<string> => {
  const start = Date.now()
  let totalLoad = 0
  let cycles = 0

  while (Date.now() - start < duration) {
    const cycleStart = Date.now()
    const targetLoad = Math.random() * maxLoad

    while (Date.now() - cycleStart < 100) {
      for (let i = 0; i < 10000; i++) {
        Math.sqrt(i)
      }
    }

    const elapsed = Date.now() - cycleStart
    const sleepTime = Math.max(0, 100 * (1 - targetLoad / 100) - (elapsed % 100))
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    await new Promise((resolve) => setTimeout(resolve, sleepTime))

    totalLoad += targetLoad
    cycles++
  }

  const averageLoad = totalLoad / cycles
  return `Random CPU load simulated for ${duration} ms. Average load: ${averageLoad.toFixed(2)}%\n`
}

/**
 * Retrieves the current memory usage of the process.
 *
 * @returns An object containing memory usage statistics in MB.
 */
export const getMemoryUsage = (): Record<string, string> => {
  const used = process.memoryUsage()
  return {
    rss: `${Math.round((used.rss / 1024 / 1024) * 100) / 100} MB`,
    heapTotal: `${Math.round((used.heapTotal / 1024 / 1024) * 100) / 100} MB`,
    heapUsed: `${Math.round((used.heapUsed / 1024 / 1024) * 100) / 100} MB`,
    external: `${Math.round((used.external / 1024 / 1024) * 100) / 100} MB`,
    arrayBuffers: `${Math.round((used.arrayBuffers / 1024 / 1024) * 100) / 100} MB`
  }
}

/**
 * Creates a specified number of memory leaks of a given size.
 *
 * @param size - The size of each memory leak (e.g., '1MB', '500KB').
 * @param count - The number of memory leaks to create.
 * @returns A string describing the created memory leaks.
 */
export const createMemoryLeak = (size: string, count: number): string => {
  const leakSize = parseSize(size)
  for (let i = 0; i < count; i++) {
    const leak = Buffer.alloc(leakSize)
    memoryLeaks.push(leak)
  }
  return `Created ${count} memory leak(s) of size ${leakSize} bytes each\n`
}

/**
 * Allocates a specified amount of memory.
 *
 * @param size - The amount of memory to allocate (e.g., '1MB', '500KB').
 * @returns A string describing the allocated memory.
 */
export const allocateMemory = (size: string): string => {
  const allocSize = parseSize(size)
  const buffer = Buffer.alloc(allocSize)
  buffer.write('Memory allocated', 0)
  return `Allocated ${allocSize} bytes of memory\n`
}

/**
 * Simulates a file read operation of a specified size.
 *
 * @param size - The size of the file to read (e.g., '1MB', '500KB').
 * @returns A promise that resolves to a string describing the read operation.
 */
export const simulateFileRead = async (size: string): Promise<string> => {
  const readSize = parseSize(size)
  const filePath = path.join(os.tmpdir(), 'temp_read_file.txt')

  await fs.writeFile(filePath, Buffer.alloc(readSize).fill('A'))

  const start = Date.now()
  await fs.readFile(filePath)
  const duration = Date.now() - start

  await fs.unlink(filePath)

  return `Read ${readSize} bytes in ${duration} ms\n`
}

/**
 * Simulates a file write operation of a specified size.
 *
 * @param size - The size of the file to write (e.g., '1MB', '500KB').
 * @returns A promise that resolves to a string describing the write operation.
 */
export const simulateFileWrite = async (size: string): Promise<string> => {
  const writeSize = parseSize(size)
  const filePath = path.join(os.tmpdir(), 'temp_write_file.txt')

  const start = Date.now()
  await fs.writeFile(filePath, Buffer.alloc(writeSize).fill('A'))
  const duration = Date.now() - start

  await fs.unlink(filePath)

  return `Wrote ${writeSize} bytes in ${duration} ms\n`
}

/**
 * Simulates a network request to a specified URL.
 *
 * @param url - The URL to fetch.
 * @returns A promise that resolves to a string describing the network request.
 */
export const simulateNetworkRequest = async (url: string): Promise<string> => {
  const start = Date.now()
  const response = await fetch(url)
  await response.text()
  const duration = Date.now() - start

  return `Fetched ${url} in ${duration} ms\n`
}
