/**
 * Simple test to validate API route testing setup
 */

import { getLectureInfo } from '@/lib/lecture-loader'

// Mock the lecture-loader module
jest.mock('@/lib/lecture-loader', () => ({
    getLectureInfo: jest.fn(),
}))

const mockGetLectureInfo = getLectureInfo as jest.MockedFunction<typeof getLectureInfo>

describe('Simple API Route Test', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should be able to mock dependencies', () => {
        // Arrange
        const mockLectureInfo = {
            id: 'test-lecture',
            title: 'Test Lecture',
            courseId: 'test-course',
            description: 'A test lecture',
            slides: 5,
            author: 'Test Author'
        }
        mockGetLectureInfo.mockResolvedValue(mockLectureInfo)

        // Act & Assert
        expect(mockGetLectureInfo).toBeDefined()
        expect(typeof mockGetLectureInfo).toBe('function')
    })

    it('should be able to test async functions', async () => {
        // Arrange
        const expectedResult = { success: true }
        mockGetLectureInfo.mockResolvedValue(expectedResult as any)

        // Act
        const result = await mockGetLectureInfo('test', 'test')

        // Assert
        expect(result).toEqual(expectedResult)
        expect(mockGetLectureInfo).toHaveBeenCalledWith('test', 'test')
    })
}) 