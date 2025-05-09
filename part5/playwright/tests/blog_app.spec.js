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
        
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Katja',
                username: 'Katja',
                password: 'viikuna'
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
        test('blog can be deleted by the creator', async ({ page }) => {
            createBlog(page, 'one more blog', 'Kirsti', 'https://playwright.dev/', '22')
            const otherBlogTitle = await page.getByText('one more blog')
            const otherBlogElement = await otherBlogTitle.locator('..')
              
            await otherBlogElement.getByRole('button', { name: 'view' }).click()
            //await otherBlogElement.getByRole('button', { name: 'remove' }).click()

            page.once('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm')
                await dialog.accept()
            })

            await otherBlogElement.getByRole('button', { name: 'remove' }).click()

            // there is also success message visible after creating a blog, so I defined deletion
            // style for the successful deleter notification
            const deleteDiv = await page.locator('.deletion')
            await expect(deleteDiv).toContainText('Blog one more blog was deleted')
        })
        test('a blog can not be deleted by another user', async ({ page }) => {

            // creating a blog by user Kirsti and then logging out
            createBlog(page, 'blog again', 'Kirsti', 'https://playwright.dev/', '12')
            await page.waitForTimeout(1000);
            await page.getByRole('button', { name: 'logout' }).click()

            // logging in as user Katja and chceking if the remove button is not visible
            await loginWith(page, 'Katja', 'viikuna')
            await page.getByText('Katja logged-in').waitFor()
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

        })
        test('blogs are ordered according to likes', async ({ page }) => {
            await createBlog(page, 'blog one', 'Kirsti', 'https://playwright.dev/', '12')
            await createBlog(page, 'blog two', 'Kirsti', 'https://playwright.dev/', '2')
            await createBlog(page, 'blog three', 'Kirsti', 'https://playwright.dev/', '3')
            await createBlog(page, 'blog four', 'Kirsti', 'https://playwright.dev/', '6')

            const viewButtons = await page.getByRole('button', { name: 'view' }).all()
            for (const button of viewButtons) {
                await button.click()
            }
        
            // fetching all likes
            const likeElements = await page.getByTestId('number_of_likes').all()
            const likes = []
            for (const likeEl of likeElements) {
                const text = await likeEl.textContent()
                likes.push(Number(text))
            }
        
            const sortedLikes = [...likes].sort((a, b) => b - a)
            expect(likes).toEqual(sortedLikes)
        })
    })
        
})