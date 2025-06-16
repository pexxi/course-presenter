import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { GET } from '../route'
import { getImageContentType, isValidImageFile } from '@/utils/image-helpers'

// Mock the file system module
jest.mock('node:fs', () => ({
    existsSync: jest.fn(),
    statSync: jest.fn(),
    readFileSync: jest.fn(),
}))

// Mock the image helpers
jest.mock('@/utils/image-helpers', () => ({
    getImageContentType: jest.fn(),
    isValidImageFile: jest.fn(),
}))

const mockFs = {
    existsSync: fs.existsSync as jest.MockedFunction<typeof fs.existsSync>,
    statSync: fs.statSync as jest.MockedFunction<typeof fs.statSync>,
    readFileSync: fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>,
}

const mockGetImageContentType = getImageContentType as jest.MockedFunction<typeof getImageContentType>
const mockIsValidImageFile = isValidImageFile as jest.MockedFunction<typeof isValidImageFile>

describe('/api/images/[...params] API Route', () => {
    let request: NextRequest
    let mockContext: { params: Promise<{ params: string[] }> }

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks()

        // Create a mock request
        request = new NextRequest('http://localhost:3000/api/images/test-course/test-lecture/image.png')

        // Create mock context with params
        mockContext = {
            params: Promise.resolve({
                params: ['test-course', 'test-lecture', 'image.png']
            })
        }

        // Default mock implementations
        mockIsValidImageFile.mockReturnValue(true)
        mockGetImageContentType.mockReturnValue('image/png')
        mockFs.existsSync.mockReturnValue(true)
        mockFs.statSync.mockReturnValue({
            isFile: () => true,
        } as any)
        mockFs.readFileSync.mockReturnValue(Buffer.from('fake-image-data'))
    })

    describe('successful requests', () => {
        it('should return image when valid parameters and file exist', async () => {
            // Act
            const response = await GET(request, mockContext)

            // Assert
            expect(response.status).toBe(200)
            expect(response.headers.get('Content-Type')).toBe('image/png')
            expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable')
            expect(response.headers.get('Content-Length')).toBe('15') // length of 'fake-image-data'

            // Verify mocks were called correctly
            expect(mockIsValidImageFile).toHaveBeenCalledWith('image.png')
            expect(mockFs.existsSync).toHaveBeenCalledWith(
                path.join(process.cwd(), 'courses', 'test-course', 'test-lecture', 'image.png')
            )
            expect(mockFs.statSync).toHaveBeenCalledWith(
                path.join(process.cwd(), 'courses', 'test-course', 'test-lecture', 'image.png')
            )
            expect(mockGetImageContentType).toHaveBeenCalledWith('image.png')
            expect(mockFs.readFileSync).toHaveBeenCalledWith(
                path.join(process.cwd(), 'courses', 'test-course', 'test-lecture', 'image.png')
            )
        })

        it('should handle different image types', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['course1', 'lecture1', 'photo.jpg']
            })
            mockGetImageContentType.mockReturnValue('image/jpeg')

            // Act
            const response = await GET(request, mockContext)

            // Assert
            expect(response.status).toBe(200)
            expect(response.headers.get('Content-Type')).toBe('image/jpeg')
            expect(mockGetImageContentType).toHaveBeenCalledWith('photo.jpg')
        })

        it('should handle large image files', async () => {
            // Arrange
            const largeImageBuffer = Buffer.alloc(1024 * 1024) // 1MB buffer
            mockFs.readFileSync.mockReturnValue(largeImageBuffer)

            // Act
            const response = await GET(request, mockContext)

            // Assert
            expect(response.status).toBe(200)
            expect(response.headers.get('Content-Length')).toBe(largeImageBuffer.length.toString())
        })
    })

    describe('invalid parameters', () => {
        it('should return 400 when insufficient parameters are provided (only courseId)', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Invalid parameters. Expected format: courseId/lectureId/filename')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })

        it('should return 400 when insufficient parameters are provided (missing filename)', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course', 'test-lecture']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Invalid parameters. Expected format: courseId/lectureId/filename')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })

        it('should return 400 when too many parameters are provided', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course', 'test-lecture', 'image.png', 'extra']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Invalid parameters. Expected format: courseId/lectureId/filename')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })

        it('should return 400 when no parameters are provided', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: []
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Invalid parameters. Expected format: courseId/lectureId/filename')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })
    })

    describe('missing values', () => {
        it('should return 400 when courseId is empty', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['', 'test-lecture', 'image.png']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('courseId, lectureId, and filename are required')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })

        it('should return 400 when lectureId is empty', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course', '', 'image.png']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('courseId, lectureId, and filename are required')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })

        it('should return 400 when filename is empty', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course', 'test-lecture', '']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('courseId, lectureId, and filename are required')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })
    })

    describe('invalid image files', () => {
        it('should return 400 when file is not a valid image', async () => {
            // Arrange
            mockIsValidImageFile.mockReturnValue(false)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Invalid image file: image.png')
            expect(mockIsValidImageFile).toHaveBeenCalledWith('image.png')
            expect(mockFs.existsSync).not.toHaveBeenCalled()
        })

        it('should return 400 when trying to access non-image file', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course', 'test-lecture', 'document.txt']
            })
            mockIsValidImageFile.mockReturnValue(false)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Invalid image file: document.txt')
            expect(mockIsValidImageFile).toHaveBeenCalledWith('document.txt')
        })
    })

    describe('file not found', () => {
        it('should return 404 when image file does not exist', async () => {
            // Arrange
            mockFs.existsSync.mockReturnValue(false)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(404)
            expect(responseData.error).toBe('Image not found: image.png')
            expect(mockFs.existsSync).toHaveBeenCalledWith(
                path.join(process.cwd(), 'courses', 'test-course', 'test-lecture', 'image.png')
            )
            expect(mockFs.statSync).not.toHaveBeenCalled()
        })
    })

    describe('file system errors', () => {
        it('should return 400 when path is a directory, not a file', async () => {
            // Arrange
            mockFs.statSync.mockReturnValue({
                isFile: () => false,
            } as any)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('image.png is not a file')
            expect(mockFs.statSync).toHaveBeenCalled()
            expect(mockFs.readFileSync).not.toHaveBeenCalled()
        })

        it('should return 500 when file system operations fail', async () => {
            // Arrange
            mockFs.existsSync.mockImplementation(() => {
                throw new Error('File system error')
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Failed to serve image')
        })

        it('should return 500 when reading file fails', async () => {
            // Arrange
            mockFs.readFileSync.mockImplementation(() => {
                throw new Error('Cannot read file')
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Failed to serve image')
        })

        it('should handle promise rejection in params', async () => {
            // Arrange
            mockContext.params = Promise.reject(new Error('Invalid params'))

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Failed to serve image')
        })
    })

    describe('edge cases', () => {
        it('should handle special characters in filenames', async () => {
            // Arrange
            const filename = 'image-with-spaces and special_chars.png'
            mockContext.params = Promise.resolve({
                params: ['test-course', 'test-lecture', filename]
            })

            // Act
            const response = await GET(request, mockContext)

            // Assert
            expect(response.status).toBe(200)
            expect(mockIsValidImageFile).toHaveBeenCalledWith(filename)
        })

        it('should handle very long filenames', async () => {
            // Arrange
            const longFilename = 'a'.repeat(200) + '.png'
            mockContext.params = Promise.resolve({
                params: ['test-course', 'test-lecture', longFilename]
            })

            // Act
            const response = await GET(request, mockContext)

            // Assert
            expect(response.status).toBe(200)
            expect(mockIsValidImageFile).toHaveBeenCalledWith(longFilename)
        })

        it('should handle different image extensions', async () => {
            // Arrange
            const testCases = [
                { filename: 'test.jpg', contentType: 'image/jpeg' },
                { filename: 'test.gif', contentType: 'image/gif' },
                { filename: 'test.webp', contentType: 'image/webp' },
                { filename: 'test.svg', contentType: 'image/svg+xml' },
            ]

            for (const testCase of testCases) {
                // Reset mocks for each test case
                jest.clearAllMocks()
                mockIsValidImageFile.mockReturnValue(true)
                mockGetImageContentType.mockReturnValue(testCase.contentType)
                mockFs.existsSync.mockReturnValue(true)
                mockFs.statSync.mockReturnValue({ isFile: () => true } as any)
                mockFs.readFileSync.mockReturnValue(Buffer.from('fake-image-data'))

                mockContext.params = Promise.resolve({
                    params: ['test-course', 'test-lecture', testCase.filename]
                })

                // Act
                const response = await GET(request, mockContext)

                // Assert
                expect(response.status).toBe(200)
                expect(response.headers.get('Content-Type')).toBe(testCase.contentType)
                expect(mockGetImageContentType).toHaveBeenCalledWith(testCase.filename)
            }
        })

        it('should handle empty image files', async () => {
            // Arrange
            mockFs.readFileSync.mockReturnValue(Buffer.alloc(0))

            // Act
            const response = await GET(request, mockContext)

            // Assert
            expect(response.status).toBe(200)
            expect(response.headers.get('Content-Length')).toBe('0')
        })
    })
}) 