const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
    })
  
    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    test('Login with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('Kirsti')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Kirsti logged-in')).toBeVisible()
    })

    test('Login fails with false credentials', async ({ page }) => {
        await page.getByRole('textbox').first().fill('Kirsti')
        await page.getByRole('textbox').last().fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Kirsti logged-in')).toBeVisible()
    })
})