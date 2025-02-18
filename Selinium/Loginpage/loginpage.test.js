const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Login Page Tests', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function() {
        await driver.get('http://localhost:5173/login');
    });

    after(async function() {
        await driver.quit();
    });

    it('should load login page successfully', async function() {
        const title = await driver.findElement(By.css('h1')).getText();
        assert.strictEqual(title, 'Login');
    });

    it('should show validation error for empty form submission', async function() {
        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();
        // Wait for toast error message
        await driver.wait(until.elementLocated(By.className('sonner-toast')));
    });

    it('should login successfully with valid credentials', async function() {
        // Fill email
        await driver.findElement(By.css('input[name="email"]'))
            .sendKeys('test@example.com');
        
        // Fill password
        await driver.findElement(By.css('input[name="password"]'))
            .sendKeys('password123');
        
        // Select role
        await driver.findElement(By.css('input[value="student"]')).click();
        
        // Submit form
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        // Wait for redirect to home page
        await driver.wait(until.urlIs('http://localhost:5173/'));
    });

    it('should show loading state during form submission', async function() {
        await driver.findElement(By.css('input[name="email"]'))
            .sendKeys('test@example.com');
        await driver.findElement(By.css('input[name="password"]'))
            .sendKeys('password123');
        await driver.findElement(By.css('input[value="student"]')).click();
        
        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();
        
        // Verify loading spinner appears
        await driver.wait(until.elementLocated(By.className('animate-spin')));
    });

    it('should navigate to signup page when clicking signup link', async function() {
        const signupLink = await driver.findElement(By.css('a[href="/signup"]'));
        await signupLink.click();
        await driver.wait(until.urlIs('http://localhost:5173/signup'));
    });
});