const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')
const { createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Kirsti',
                username: 'Kirsti',
                password: 'salainen'
            },    
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
            await loginWith(page, 'Kirsti', 'salainen')
            await expect(page.getByText('Kirsti logged-in')).toBeVisible()
        })

        test('Login fails with false credentials', async ({ page }) => {
            await loginWith(page, 'Kalle', 'suolainen')
            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })

    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'Kirsti', 'salainen')
        })
      
        test('a new blog created', async ({ page }) => {
            createBlog(page, 'one more blog', 'Kirsti', 'https://playwright.dev/', '10')
            //await expect(page.getByText('a blog created by playwright')).toBeVisible()
            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('one more blog by Kirsti added')
        })
        test('blog can be deleted', async ({ page }) => {
            const otherBlogTitle = await page.getByText('one more blog')
            const otherBlogElement = await otherBlogTitle.locator('..')
              
            await otherBlogElement.getByRole('button', { name: 'view' }).click()
            //await otherBlogElement.getByRole('button', { name: 'remove' }).click()

            page.once('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm')
                await dialog.accept()
            })

            await otherBlogElement.getByRole('button', { name: 'remove' }).click()

            await expect(page.getByText('one more blog')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'Kirsti', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            createBlog(page, 'a blog created by playwright', 'Kirsti', 'https://playwright.dev/', '10')
            //await expect(page.getByText('a blog created by playwright')).toBeVisible()
            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('a blog created by playwright by Kirsti added')
        })

        test('blog can be liked', async ({ page }) => {
            createBlog(page, 'another blog', 'Kirsti', 'https://playwright.dev/', '12')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('13')).toBeVisible()
        })
       
    })
})