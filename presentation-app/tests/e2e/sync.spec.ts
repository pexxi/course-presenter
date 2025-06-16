import { test, expect } from '@playwright/test';

test.describe('Slide Synchronization', () => {
  test('should sync slides between SpeakerView and PresentationView', async ({ browser }) => {
    // Create two browser contexts (tabs)
    const context = await browser.newContext();
    const speakerPage = await context.newPage();
    const presentationPage = await context.newPage();
    
    try {
      // Open SpeakerView
      await speakerPage.goto('/speaker/test-course/test-lecture');
      await expect(speakerPage.locator('.slide-content')).toBeVisible();
      
      // Wait for slides to load
      await expect(speakerPage.getByText('Slide 1')).toBeVisible();
      
      // Open PresentationView
      await presentationPage.goto('/present/test-course/test-lecture');
      await expect(presentationPage.locator('.slide-content')).toBeVisible();
      
      // Both views should be on slide 1 initially
      await expect(speakerPage.locator('.slide-number')).toContainText('1 / 3');
      await expect(presentationPage.locator('.slide-number')).toContainText('1 / 3');
      
      // Navigate to next slide in SpeakerView
      await speakerPage.click('button[aria-label="Next slide"]');
      
      // PresentationView should update to match
      await expect(presentationPage.locator('.slide-number')).toContainText('2 / 3');
      
      // Navigate to next slide in SpeakerView again
      await speakerPage.click('button[aria-label="Next slide"]');
      
      // PresentationView should update to match
      await expect(presentationPage.locator('.slide-number')).toContainText('3 / 3');
      
      // Navigation in PresentationView should not affect SpeakerView
      await presentationPage.click('button[aria-label="Previous slide"]');
      await expect(speakerPage.locator('.slide-number')).toContainText('3 / 3');
      
    } finally {
      await context.close();
    }
  });

  test('should handle reconnection', async ({ page }) => {
    // Open SpeakerView
    await page.goto('/speaker/test-course/test-lecture');
    await expect(page.locator('.slide-content')).toBeVisible();
    
    // Navigate to second slide
    await page.click('button[aria-label="Next slide"]');
    await expect(page.locator('.slide-number')).toContainText('2 / 3');
    
    // Simulate network offline
    await page.context().setOffline(true);
    await expect(page.locator('.connection-status')).toContainText('Disconnected');
    
    // Navigation should still work offline
    await page.click('button[aria-label="Next slide"]');
    await expect(page.locator('.slide-number')).toContainText('3 / 3');
    
    // Simulate network back online
    await page.context().setOffline(false);
    await expect(page.locator('.connection-status')).toContainText('Connected');
  });
});
