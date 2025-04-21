const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Kirsti',
                username: 'Kirsti',
                password: 'salainen'
            }
        })

        await page.goto('http://localhost:5173')     
    })   
  
    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('Kirsti')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Kirsti logged-in')).toBeVisible()
        })

        test('Login fails with false credentials', async ({ page }) => {
            await page.getByTestId('username').fill('Kalle')
            await page.getByTestId('password').fill('salain')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })

    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('Kirsti')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
        })
      
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByTestId('title').fill('a blog created by playwright')
            await page.getByTestId('author').fill('Kirsti')
            await page.getByTestId('url').fill('https://playwright.dev/')
            await page.getByTestId('likes').fill('10')
            await page.getByRole('button', { name: 'add' }).click()
            await expect(page.getByText('a blog created by playwright')).toBeVisible()
        })

        test('blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByTestId('title').fill('another blog')
            await page.getByTestId('author').fill('Kirsti')
            await page.getByTestId('url').fill('https://playwright.dev/another')
            await page.getByTestId('likes').fill('12')
            await page.getByRole('button', { name: 'add' }).click()

            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('13')).toBeVisible()
        })
    })
})