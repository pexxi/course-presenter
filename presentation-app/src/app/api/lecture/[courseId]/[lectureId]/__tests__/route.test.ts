import { NextRequest, NextResponse } from 'next/server'
import { GET } from '../route'
import { getLectureInfo } from '@/lib/lecture-loader'

// Mock the lecture-loader module
jest.mock('@/lib/lecture-loader', () => ({
    getLectureInfo: jest.fn(),
}))

const mockGetLectureInfo = getLectureInfo as jest.MockedFunction<typeof getLectureInfo>

describe('/api/lecture/[courseId]/[lectureId] API Route', () => {
    let request: NextRequest
    let mockContext: { params: Promise<{ courseId: string; lectureId: string }> }

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks()

        // Create a mock request
        request = new NextRequest('http://localhost:3000/api/lecture/test-course/test-lecture')

        // Create mock context with params
        mockContext = {
            params: Promise.resolve({
                courseId: 'test-course',
                lectureId: 'test-lecture',
            })
        }
    })

    describe('successful requests', () => {
        it('should return lecture info when valid parameters are provided', async () => {
            // Arrange
            const mockLectureInfo = {
                id: 'test-lecture',
                title: 'Test Lecture',
                courseId: 'test-course',
                description: 'A test lecture',
                slides: 5,
                author: 'Test Author',
                duration: '45 minutes'
            }
            mockGetLectureInfo.mockResolvedValue(mockLectureInfo)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData).toEqual(mockLectureInfo)
            expect(mockGetLectureInfo).toHaveBeenCalledWith('test-lecture', 'test-course')
            expect(mockGetLectureInfo).toHaveBeenCalledTimes(1)
        })

        it('should handle lecture info with complex data structure', async () => {
            // Arrange
            const complexLectureInfo = {
                id: 'advanced-lecture',
                title: 'Advanced Topics',
                courseId: 'cs-101',
                description: 'Advanced computer science topics',
                slides: 15,
                author: 'Dr. Smith',
                duration: '60 minutes'
            }
            mockGetLectureInfo.mockResolvedValue(complexLectureInfo)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData).toEqual(complexLectureInfo)
            expect(responseData.slides).toBe(15)
            expect(responseData.author).toBe('Dr. Smith')
        })
    })

    describe('missing parameters', () => {
        it('should return 400 when courseId is missing', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                courseId: '',
                lectureId: 'test-lecture',
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Course ID and Lecture ID are required')
            expect(mockGetLectureInfo).not.toHaveBeenCalled()
        })

        it('should return 400 when lectureId is missing', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                courseId: 'test-course',
                lectureId: '',
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Course ID and Lecture ID are required')
            expect(mockGetLectureInfo).not.toHaveBeenCalled()
        })

        it('should return 400 when both courseId and lectureId are missing', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                courseId: '',
                lectureId: '',
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Course ID and Lecture ID are required')
            expect(mockGetLectureInfo).not.toHaveBeenCalled()
        })
    })

    describe('lecture not found', () => {
        it('should return 404 when lecture does not exist', async () => {
            // Arrange
            mockGetLectureInfo.mockResolvedValue(null)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(404)
            expect(responseData.error).toBe('Lecture not found')
            expect(mockGetLectureInfo).toHaveBeenCalledWith('test-lecture', 'test-course')
        })

        it('should return 404 when lecture info is undefined', async () => {
            // Arrange
            mockGetLectureInfo.mockResolvedValue(undefined as any)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(404)
            expect(responseData.error).toBe('Lecture not found')
        })
    })

    describe('error handling', () => {
        it('should return 500 when getLectureInfo throws an error', async () => {
            // Arrange
            const mockError = new Error('Database connection failed')
            mockGetLectureInfo.mockRejectedValue(mockError)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Internal server error')
            expect(mockGetLectureInfo).toHaveBeenCalledWith('test-lecture', 'test-course')
        })

        it('should handle network errors gracefully', async () => {
            // Arrange
            mockGetLectureInfo.mockRejectedValue(new Error('Network timeout'))

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Internal server error')
        })

        it('should handle promise rejection in params', async () => {
            // Arrange
            mockContext.params = Promise.reject(new Error('Invalid params'))

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Internal server error')
        })
    })

    describe('edge cases', () => {
        it('should handle special characters in courseId and lectureId', async () => {
            // Arrange
            const mockLectureInfo = {
                id: 'test-lecture-123',
                title: 'Test Lecture',
                courseId: 'test-course-456',
                description: 'A test lecture',
                slides: 8,
                author: 'Test Author'
            }
            mockGetLectureInfo.mockResolvedValue(mockLectureInfo)

            mockContext.params = Promise.resolve({
                courseId: 'test-course-456',
                lectureId: 'test-lecture-123',
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData).toEqual(mockLectureInfo)
            expect(mockGetLectureInfo).toHaveBeenCalledWith('test-lecture-123', 'test-course-456')
        })

        it('should handle very long courseId and lectureId', async () => {
            // Arrange
            const longCourseId = 'a'.repeat(100)
            const longLectureId = 'b'.repeat(100)
            const mockLectureInfo = {
                id: longLectureId,
                title: 'Test Lecture',
                courseId: longCourseId,
                description: 'A test lecture',
                slides: 12,
                author: 'Test Author'
            }
            mockGetLectureInfo.mockResolvedValue(mockLectureInfo)

            mockContext.params = Promise.resolve({
                courseId: longCourseId,
                lectureId: longLectureId,
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData).toEqual(mockLectureInfo)
            expect(mockGetLectureInfo).toHaveBeenCalledWith(longLectureId, longCourseId)
        })
    })
}) 