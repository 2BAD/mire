import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { parseSize } from '../utils/parseSize.ts'

const MAX_DELAY = 5000
const memoryLeaks: unknown[] = []

/**
 *
 * @param ms
 */
export const delayResponse = async (ms: number): Promise<string> => {
  const delay = ms || Math.trunc(Math.random() * MAX_DELAY)
  await new Promise((resolve) => setTimeout(resolve, delay))
  return `Response delayed by ${delay} ms\n`
}

/**
 *
 * @param n
 */
export const computeFibonacci = (n: number): string => {
  /**
   *
   * @param num
   */
  const fibonacci = (num: number): number => {
    if (num <= 1) return num
    return fibonacci(num - 1) + fibonacci(num - 2)
  }

  const result = fibonacci(n)
  return `Fibonacci(${n}) = ${result}\n`
}

/**
 *
 * @param duration
 * @param maxLoad
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
    await new Promise((resolve) => setTimeout(resolve, sleepTime))

    totalLoad += targetLoad
    cycles++
  }

  const averageLoad = totalLoad / cycles
  return `Random CPU load simulated for ${duration} ms. Average load: ${averageLoad.toFixed(2)}%\n`
}

/**
 *
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
 *
 * @param size
 * @param count
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
 *
 * @param size
 */
export const allocateMemory = (size: string): string => {
  const allocSize = parseSize(size)
  const buffer = Buffer.alloc(allocSize)
  buffer.write('Memory allocated', 0)
  return `Allocated ${allocSize} bytes of memory\n`
}

/**
 *
 * @param size
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
 *
 * @param size
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
 *
 * @param url
 */
export const simulateNetworkRequest = async (url: string): Promise<string> => {
  const start = Date.now()
  const response = await fetch(url)
  await response.text()
  const duration = Date.now() - start

  return `Fetched ${url} in ${duration} ms\n`
}
