
const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');


const formUrl = pathToFileURL(
    path.resolve(__dirname, '../../test-repo-from/index.html')
).href;

test.describe('Registration Form Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(formUrl);
    });


    test('Verify successful form submission', async ({ page }) => {
        await page.getByLabel('Full Name').fill('Rahul Sharma');
        await page.getByLabel('Email').fill('rahul@example.com');
        await page.getByLabel('Phone Number').fill('9876543210');

        await page.getByLabel('Gender').selectOption('Male');

        await page.getByLabel('Address / Message')
            .fill('Delhi, India');

        await page.getByRole('button', { name: 'Submit' }).click();

        await expect(
            page.getByRole('heading', {
                name: 'Submitted Successfully!'
            })
        ).toBeVisible();

        await expect(page.locator('#submittedInfo'))
            .toContainText('Rahul Sharma');

        await expect(page.locator('#submittedInfo'))
            .toContainText('rahul@example.com');

        await expect(page.locator('#submittedInfo'))
            .toContainText('9876543210');

        await expect(page.locator('#submittedInfo'))
            .toContainText('Male');

        await expect(page.locator('#submittedInfo'))
            .toContainText('Delhi, India');
    });


});
