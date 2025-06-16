import { NextRequest, NextResponse } from 'next/server'
import { GET } from '../route'
import { loadLectureSlides } from '@/lib/slide-loader'

// Mock the slide-loader module
jest.mock('@/lib/slide-loader', () => ({
    loadLectureSlides: jest.fn(),
}))

const mockLoadLectureSlides = loadLectureSlides as jest.MockedFunction<typeof loadLectureSlides>

describe('/api/slides/[...params] API Route', () => {
    let request: NextRequest
    let mockContext: { params: Promise<{ params: string[] }> }

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks()

        // Create a mock request
        request = new NextRequest('http://localhost:3000/api/slides/test-course/test-lecture')

        // Create mock context with params
        mockContext = {
            params: Promise.resolve({
                params: ['test-course', 'test-lecture']
            })
        }
    })

    describe('successful requests', () => {
        it('should return slides when valid parameters are provided', async () => {
            // Arrange
            const mockSlides = [
                {
                    id: 'slide-1',
                    lectureId: 'test-lecture',
                    courseId: 'test-course',
                    slideNumber: 1,
                    template: 'cover' as const,
                    title: 'Introduction',
                    content: '<h1>Introduction</h1>',
                    rawContent: '# Introduction',
                    speakerNotes: 'Welcome to the course',
                    header: { template: 'cover' as const, title: 'Introduction' }
                },
                {
                    id: 'slide-2',
                    lectureId: 'test-lecture',
                    courseId: 'test-course',
                    slideNumber: 2,
                    template: 'content' as const,
                    title: 'Overview',
                    content: '<p>Course overview</p>',
                    rawContent: 'Course overview',
                    speakerNotes: 'Explain the course structure',
                    header: { template: 'content' as const, title: 'Overview' }
                }
            ]
            mockLoadLectureSlides.mockResolvedValue(mockSlides)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData.courseId).toBe('test-course')
            expect(responseData.lectureId).toBe('test-lecture')
            expect(responseData.totalSlides).toBe(2)
            expect(responseData.slides).toEqual(mockSlides)
            expect(mockLoadLectureSlides).toHaveBeenCalledWith('test-lecture', 'test-course')
            expect(mockLoadLectureSlides).toHaveBeenCalledTimes(1)
        })

        it('should handle empty slides array', async () => {
            // Arrange
            mockLoadLectureSlides.mockResolvedValue([])

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(404)
            expect(responseData.error).toBe('No slides found for course test-course, lecture test-lecture')
            expect(mockLoadLectureSlides).toHaveBeenCalledWith('test-lecture', 'test-course')
        })

        it('should handle single slide', async () => {
            // Arrange
            const mockSlide = [{
                id: 'slide-1',
                lectureId: 'test-lecture',
                courseId: 'test-course',
                slideNumber: 1,
                template: 'cover' as const,
                title: 'Single Slide',
                content: '<h1>Only slide</h1>',
                rawContent: '# Only slide',
                speakerNotes: 'This is the only slide',
                header: { template: 'cover' as const, title: 'Single Slide' }
            }]
            mockLoadLectureSlides.mockResolvedValue(mockSlide)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData.totalSlides).toBe(1)
            expect(responseData.slides).toEqual(mockSlide)
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
            expect(responseData.error).toBe('Invalid parameters. Expected format: courseId/lectureId')
            expect(mockLoadLectureSlides).not.toHaveBeenCalled()
        })

        it('should return 400 when too many parameters are provided', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course', 'test-lecture', 'extra-param']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Invalid parameters. Expected format: courseId/lectureId')
            expect(mockLoadLectureSlides).not.toHaveBeenCalled()
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
            expect(responseData.error).toBe('Invalid parameters. Expected format: courseId/lectureId')
            expect(mockLoadLectureSlides).not.toHaveBeenCalled()
        })
    })

    describe('missing values', () => {
        it('should return 400 when courseId is empty', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['', 'test-lecture']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Both courseId and lectureId are required')
            expect(mockLoadLectureSlides).not.toHaveBeenCalled()
        })

        it('should return 400 when lectureId is empty', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['test-course', '']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Both courseId and lectureId are required')
            expect(mockLoadLectureSlides).not.toHaveBeenCalled()
        })

        it('should return 400 when both courseId and lectureId are empty', async () => {
            // Arrange
            mockContext.params = Promise.resolve({
                params: ['', '']
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(400)
            expect(responseData.error).toBe('Both courseId and lectureId are required')
            expect(mockLoadLectureSlides).not.toHaveBeenCalled()
        })
    })

    describe('error handling', () => {
        it('should return 500 when loadLectureSlides throws an error', async () => {
            // Arrange
            const mockError = new Error('Failed to load slides from filesystem')
            mockLoadLectureSlides.mockRejectedValue(mockError)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Failed to load slides')
            expect(mockLoadLectureSlides).toHaveBeenCalledWith('test-lecture', 'test-course')
        })

        it('should handle network errors gracefully', async () => {
            // Arrange
            mockLoadLectureSlides.mockRejectedValue(new Error('Network timeout'))

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Failed to load slides')
        })

        it('should handle promise rejection in params', async () => {
            // Arrange
            mockContext.params = Promise.reject(new Error('Invalid params'))

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(500)
            expect(responseData.error).toBe('Failed to load slides')
        })
    })

    describe('edge cases', () => {
        it('should handle special characters in courseId and lectureId', async () => {
            // Arrange
            const courseId = 'test-course-123'
            const lectureId = 'test-lecture-456'
            const mockSlides = [{
                id: 'slide-1',
                lectureId,
                courseId,
                slideNumber: 1,
                template: 'content' as const,
                title: 'Special Characters Test',
                content: '<p>Test content</p>',
                rawContent: 'Test content',
                speakerNotes: 'Test notes',
                header: { template: 'content' as const, title: 'Special Characters Test' }
            }]
            mockLoadLectureSlides.mockResolvedValue(mockSlides)

            mockContext.params = Promise.resolve({
                params: [courseId, lectureId]
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData.courseId).toBe(courseId)
            expect(responseData.lectureId).toBe(lectureId)
            expect(responseData.slides).toEqual(mockSlides)
            expect(mockLoadLectureSlides).toHaveBeenCalledWith(lectureId, courseId)
        })

        it('should handle very long courseId and lectureId', async () => {
            // Arrange
            const longCourseId = 'a'.repeat(100)
            const longLectureId = 'b'.repeat(100)
            const mockSlides = [{
                id: 'slide-1',
                lectureId: longLectureId,
                courseId: longCourseId,
                slideNumber: 1,
                template: 'content' as const,
                title: 'Long IDs Test',
                content: '<p>Test content</p>',
                rawContent: 'Test content',
                speakerNotes: 'Test notes',
                header: { template: 'content' as const, title: 'Long IDs Test' }
            }]
            mockLoadLectureSlides.mockResolvedValue(mockSlides)

            mockContext.params = Promise.resolve({
                params: [longCourseId, longLectureId]
            })

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData.courseId).toBe(longCourseId)
            expect(responseData.lectureId).toBe(longLectureId)
            expect(mockLoadLectureSlides).toHaveBeenCalledWith(longLectureId, longCourseId)
        })

        it('should handle large numbers of slides', async () => {
            // Arrange
            const mockSlides = Array.from({ length: 100 }, (_, i) => ({
                id: `slide-${i + 1}`,
                lectureId: 'test-lecture',
                courseId: 'test-course',
                slideNumber: i + 1,
                template: 'content' as const,
                title: `Slide ${i + 1}`,
                content: `<p>Content for slide ${i + 1}</p>`,
                rawContent: `Content for slide ${i + 1}`,
                speakerNotes: `Notes for slide ${i + 1}`,
                header: { template: 'content' as const, title: `Slide ${i + 1}` }
            }))
            mockLoadLectureSlides.mockResolvedValue(mockSlides)

            // Act
            const response = await GET(request, mockContext)
            const responseData = await response.json()

            // Assert
            expect(response.status).toBe(200)
            expect(responseData.totalSlides).toBe(100)
            expect(responseData.slides).toHaveLength(100)
        })
    })
}) 