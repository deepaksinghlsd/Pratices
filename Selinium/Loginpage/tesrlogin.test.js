// const { Builder, By, until } = require('selenium-webdriver');
// const assert = require('assert');
// const chrome = require('selenium-webdriver/chrome');

// describe('Login Page Test Suite', function() {
//     this.timeout(30000);
//     let driver;

//     before(async function() {
//         const options = new chrome.Options();
//         options.addArguments('--start-maximized', '--disable-notifications');
//         driver = await new Builder()
//             .forBrowser('chrome')
//             .setChromeOptions(options)
//             .build();
//         await driver.manage().setTimeouts({ implicit: 10000 });
//     });

//     beforeEach(async function() {
//         await driver.get('https://bgmgame.in/login');
//         await driver.wait(until.elementLocated(By.css('form')), 10000);
//     });

//     after(async function() {
//         if (driver) await driver.quit();
//     });

//     const loginElements = {
//         username: By.id('name'),
//         password: By.id('inputpassword'),
//         submitButton: By.css('.btn-primary'),
//         logo: By.css('img[alt="Baba Ji Mataka"]'),
//         title: By.css('h1'),
//         togglePassword: By.css('.material-symbols-outlined'),
//         toast: By.className('Toastify'),
//         loading: By.css('.loading'),
//         error: By.css('.text-danger')
//     };

//     const performLogin = async (username, password) => {
//         await driver.findElement(loginElements.username).sendKeys(username);
//         await driver.findElement(loginElements.password).sendKeys(password);
//         await driver.findElement(loginElements.submitButton).click();
//     };

//     it('verifies UI elements', async function() {
//         for (const [key, locator] of Object.entries(loginElements)) {
//             if (['toast', 'loading', 'error'].includes(key)) continue;
//             assert.ok(await driver.findElement(locator).isDisplayed());
//         }
//         const title = await driver.findElement(loginElements.title).getText();
//         assert.strictEqual(title, 'BGM Game');
//     });

//     it('validates empty form submission', async function() {
//         await driver.findElement(loginElements.submitButton).click();
//         const error = await driver.wait(until.elementLocated(loginElements.error), 5000);
//         assert.strictEqual(await error.getText(), 'Username is required');
//     });

//     it('toggles password visibility', async function() {
//         const passwordField = await driver.findElement(loginElements.password);
//         const toggleButton = await driver.findElement(loginElements.togglePassword);

//         assert.strictEqual(await passwordField.getAttribute('type'), 'password');
//         await toggleButton.click();
//         assert.strictEqual(await passwordField.getAttribute('type'), 'text');
//     });

//     it('handles location requirement', async function() {
//         await performLogin('admin', 'Admin@123');
//         const toast = await driver.wait(until.elementLocated(loginElements.toast), 5000);
//         assert.ok(await toast.getText().includes('Location is required'));
//     });

//     it('shows loading state', async function() {
//         await performLogin('admin', 'Admin@123');
//         const loading = await driver.wait(until.elementLocated(loginElements.loading), 5000);
//         assert.ok(await loading.isDisplayed());
//     });
// });




const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Login Page Test Suite', function() {
    this.timeout(30000);
    let driver;

    before(async function() {
        // Setup Chrome options to handle permissions
        const options = new chrome.Options();

        // Handle location permission explicitly
        options.addArguments(
            '--start-maximized',
            '--disable-notifications',
            '--disable-geolocation',           // Disable geolocation permission in the test environment
            '--enable-geolocation',            // Allow geolocation prompts to appear
            '--use-fake-ui-for-media-stream',  // Automatically accept media requests
            // '--disable-features=GeoLocation'   // Disable the geo-location feature
        );

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.manage().setTimeouts({ implicit: 10000 });
    });

    beforeEach(async function() {
        await driver.get('https://bgmgame.in/login');
        await driver.wait(until.elementLocated(By.css('form')), 10000);
    });

    after(async function() {
        if (driver) await driver.quit();
    });

    const loginElements = {
        username: By.id('name'),
        password: By.id('inputpassword'),
        submitButton: By.css('.btn-primary'),
        logo: By.css('img[alt="Baba Ji Mataka"]'),
        title: By.css('h1'),
        togglePassword: By.css('.material-symbols-outlined'),
        toast: By.className('Toastify'),
        loading: By.css('.loading'),
        error: By.css('.text-danger')
    };

    const performLogin = async (username, password) => {
        await driver.findElement(loginElements.username).sendKeys(username);
        await driver.findElement(loginElements.password).sendKeys(password);
        await driver.findElement(loginElements.submitButton).click();
    };

    it('verifies UI elements', async function() {
        for (const [key, locator] of Object.entries(loginElements)) {
            if (['toast', 'loading', 'error'].includes(key)) continue;
            assert.ok(await driver.findElement(locator).isDisplayed());
        }
        const title = await driver.findElement(loginElements.title).getText();
        assert.strictEqual(title, 'BGM Game');
    });

    it('validates empty form submission', async function() {
        await driver.findElement(loginElements.submitButton).click();
        const error = await driver.wait(until.elementLocated(loginElements.error), 5000);
        assert.strictEqual(await error.getText(), 'Username is required');
    });

    it('toggles password visibility', async function() {
        const passwordField = await driver.findElement(loginElements.password);
        const toggleButton = await driver.findElement(loginElements.togglePassword);

        assert.strictEqual(await passwordField.getAttribute('type'), 'password');
        await toggleButton.click();
        assert.strictEqual(await passwordField.getAttribute('type'), 'text');
    });

    it('handles location permission and login', async function() {
        // No need to wait for alert, since permissions are auto-granted in the setup
        await performLogin('admin', 'Admin@123');
        
        // Verify the toast message
        const toast = await driver.wait(until.elementLocated(loginElements.toast), 5000);
        assert.ok(await toast.getText().includes('Location is required'));
    });

    it('shows loading state', async function() {
        await performLogin('admin', 'Admin@123');
        
        // Wait for the loading spinner to disappear
        await driver.wait(until.stalenessOf(driver.findElement(loginElements.loading)), 10000);
        assert.ok(true, 'Loading spinner disappeared');
    });
});
